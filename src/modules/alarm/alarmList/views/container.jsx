/*
 * =========================================================================
 *  Copyright (C)2018 NCS Pte. Ltd. All Rights Reserved
 *
 *  This software is confidential and proprietary to NCS Pte. Ltd. You shall
 *  use this software only in accordance with the terms of the license
 *  agreement you entered into with NCS.  No aspect or part or all of this
 *  software may be reproduced, modified or disclosed without full and
 *  direct written authorisation from NCS.
 *
 *  NCS SUPPLIES THIS SOFTWARE ON AN "AS IS" BASIS. NCS MAKES NO
 *  REPRESENTATIONS OR WARRANTIES, EITHER EXPRESSLY OR IMPLIEDLY, ABOUT THE
 *  SUITABILITY OR NON-INFRINGEMENT OF THE SOFTWARE. NCS SHALL NOT BE LIABLE
 *  FOR ANY LOSSES OR DAMAGES SUFFERED BY LICENSEE AS A RESULT OF USING,
 *  MODIFYING OR DISTRIBUTING THIS SOFTWARE OR ITS DERIVATIVES.
 *
 *  =========================================================================
 */
/**
 * Created by SongCheng on 20/05/2018.
 */
import React, { Component } from "react";
import AlarmTable from "./alarmTable";
import AlarmCard from "./alarmCard";
import { view as AlarmDetail } from "modules/alarm/alarmDetail";
import { view as AlarmSearch } from "modules/alarm/alarmSearch";
import "../styles/style.less";
import { connect } from "react-redux";
import { REDUCER_NAME } from "../funcs/constants";
import {
    getStreamRequest,
    getDrawerToggle,
    getDetailRequest,
    saveSearchTime,
    getItemsRequest,
    saveSortersArr,
    saveRowsPerPage,
    saveItemsData,
    saveSortResult,
    ccmsAction
} from "../funcs/actions";
import { Refresh, Export } from "./functions";
import moment from "moment";
import _ from "lodash";
import { handleDataForRequest } from "modules/alarm/alarmSearch/funcs/filter";
import { checkAssociationClass, checkAssClass } from "modules/alarm/alarmDetail/funcs/checkClass";
import { Drawer } from "modules/common";
// import LinearProgress from "@material-ui/core/LinearProgress";
// import CircularProgress from "@material-ui/core/CircularProgress";
import { CardHeader } from "modules/common";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";

class Alarm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            totalItems: 0,
            page: 0,
            rowsPerPage: this.props.pageLimit || 10,
            data: [],
            currentTime: null,
            sorterData: [],
            order: "desc",
            orderBy: "sentdatetime",
            itemsData: _.cloneDeep(this.props.filterDataList) || [],
            anchor2: "right",
            open2: false,
            editState: false
        };
    }

    //Page data initialization
    componentDidMount = () => {
        this.props.handleInit(this.props);
    };

    componentWillReceiveProps(nextProps) {
        let identifyVal = nextProps.identify;
        let ccmsProps = Object.assign({}, nextProps, nextProps[identifyVal]);
        let {
            arrayData = [],
            pagination = {},
            currentTime,
            dateStyle,
            sorterData,
            itemsData,
            orderBy,
            order,
            loading,
            loading2,
            streamingData = [],
            isActive = [],
            columns = [],
            parametersData = [],
            detailData
        } = ccmsProps;

        arrayData = this.sortListData(arrayData, orderBy, order);
        streamingData = this.sortListData(streamingData, "sentdatetime", "desc");

        let searchData = this.handlResponseData(arrayData, dateStyle);
        let streamData = this.handlResponseData(streamingData, dateStyle);

        this.setState({
            currentTime,
            data: searchData,
            page: pagination.currentpage || 0,
            rowsPerPage: pagination.limit || 10,
            totalItems: pagination.totalrecords || 0,
            itemsData,
            sorterData,
            orderBy,
            order,
            loading,
            loading2,
            streamingData: streamData,
            isActive,
            columns,
            parametersData: parametersData,
            detailData
        });
    }

    //uninstall components
    componentWillUnmount = () => {
        this.handleDrawerClose();
    };

    //the current time
    handleTime = () => {
        let newTime = moment()
            .toISOString()
            .replace("Z", "+0000");
        this.props.handlSearchTime(newTime);
        return newTime;
    };

    //save sort data
    handleSortData = (orderBy, order, sortersArr) => {
        let identify = this.props.identify;
        let identifyVal = this.props[identify];
        let original = identifyVal.arrayData;
        let newData = this.sortListData(original, orderBy, order);

        this.props.handleSortResult(newData);
        this.props.handleSortersArr(orderBy, order, sortersArr);
    };
    // handle sort result
    sortListData = (original, orderBy, order) => {
        original.map(item => {
            item.timestamp = moment(item.sentdatetime).valueOf();
            item.class = checkAssClass(checkAssociationClass(item));
            return item;
        });
        let orderByNew = orderBy === "sentdatetime" ? "timestamp" : orderBy;
        let newData = _.orderBy(original, orderByNew, order);

        return newData;
    };

    //show detail
    DrawerToggle = (status, direction, detailData, isActive) => {
        this.setState(
            {
                editState: false
            },
            () => {
                this.props.handlDrawerToggle(status, direction, isActive);
            }
        );

        this.props.handlAlarmDetail(detailData.id);
    };

    //search by filter items
    getItemsSearch = (pageNo, pageLimit, itemsData) => {
        let newItemsData = itemsData.concat(_.cloneDeep(this.props.filterDataList));
        let arr = handleDataForRequest(newItemsData);
        let paginator = {
            pageno: pageNo,
            limit: pageLimit
        };
        let predicate = {
            operator: "AND",
            predicates: arr
        };
        let applicationid = this.props.currentApplicationInfo ? this.props.currentApplicationInfo["address.name"] : "";
        this.props.handleRowsPerPage(pageNo, pageLimit);
        this.props.handlItemsData(itemsData);
        this.props.handleSearchItems(paginator, predicate, applicationid);
    };

    //handle RowsPerPage
    handleRowsPerPage = (pageNo, pageLimit) => {
        this.props.handleRowsPerPage(pageNo, pageLimit);
    };

    //handle stream request
    handleStreamRequest = () => {
        let applicationid = this.props.currentApplicationInfo ? this.props.currentApplicationInfo["address.name"] : "";
        this.props.handleStream(1, 200, applicationid);
    };

    //check coordinate
    checkArea = infos => {
        return (
            infos &&
            infos[0] &&
            infos[0].areas &&
            infos[0].areas[0] &&
            infos[0].areas[0].features &&
            infos[0].areas[0].features[0] &&
            infos[0].areas[0].features[0].geometry &&
            infos[0].areas[0].features[0].geometry.coordinates
        );
    };

    //encapsulate data
    handlResponseData = (arrayData, dateStyle) => {
        let opts = [];
        for (let i = 0; i < arrayData.length; i++) {
            let time = moment(arrayData[i]["sentdatetime"]).format(dateStyle);
            let timestamp = moment(arrayData[i]["sentdatetime"]).unix();
            let area = this.checkArea(arrayData[i].infos) ? this.checkArea(arrayData[i].infos) : null;
            let type = checkAssociationClass(arrayData[i]);
            let opt = {
                timestamp: timestamp,
                coordinates: area,
                severityNum: arrayData[i]["severity"],
                severity: this.props.severityKey[arrayData[i]["severity"]],
                sentdatetime: time,
                alarmtype: arrayData[i]["alarmtype"],
                source: arrayData[i]["source"],
                note: arrayData[i]["note"],
                classKey: type,
                class: checkAssClass(type),
                owner: arrayData[i]["owner"] ? arrayData[i]["owner"] : "-",
                state: arrayData[i]["state"],
                id: arrayData[i]["id"]
            };
            opts.push(opt);
        }
        return opts;
    };

    //toggle edit view
    editToggle = (status, direction, detailData, isActive) => {
        this.setState(
            {
                editState: true
            },
            () => {
                this.props.handlDrawerToggle(status, direction, isActive);
            }
        );
        // this.props.handlDrawerToggle(status, direction, isActive);
        if (status) {
            this.props.handlAlarmDetail(detailData.id);
        }
    };

    handleDrawerClose = () => {
        // this.DrawerToggle(false, "right", []);
        this.props.handlDrawerToggle(false, "right", []);
    };

    render() {
        let { identify, filterDataList } = this.props;
        let { currentTime } = this.state;
        const identifyData = this.props[identify];
        const topoDisplayType = identifyData && identifyData.topoDisplayType;
        const showItemsNew = identifyData && identifyData.showItems;
        const anchorNew = identifyData && identifyData.anchor;
        const detailData = identifyData && identifyData.detailData;
        const applicationid = this.props.currentApplicationInfo
            ? this.props.currentApplicationInfo["address.name"]
            : "";
        return (
            <div className="alarmContainer">
                <Refresh identify={identify} {...this.props} handleStreamRequest={this.handleStreamRequest} />
                <Export identify={identify} {...this.props} applicationid={applicationid} />
                <div className="alarmBox">
                    <AlarmSearch
                        {...this.props}
                        preState={this.state}
                        currentTime={currentTime}
                        getItemsSearch={this.getItemsSearch.bind(this)}
                        ccmsFilterDataList={filterDataList}
                    />
                    {topoDisplayType === "Search" ? (
                        <AlarmTable
                            {...this.props}
                            DrawerToggle={this.DrawerToggle.bind(this)}
                            getItemsSearch={this.getItemsSearch.bind(this)}
                            handleSortData={this.handleSortData.bind(this)}
                            preState={this.state}
                            editToggle={this.editToggle.bind(this)}
                        />
                    ) : (
                        <AlarmCard
                            {...this.props}
                            DrawerToggle={this.DrawerToggle.bind(this)}
                            handleStreamRequest={this.handleStreamRequest}
                            preState={this.state}
                            editToggle={this.editToggle.bind(this)}
                        />
                    )}
                </div>

                <Drawer className="alarmDetail" variant="persistent" anchor={anchorNew} open={showItemsNew}>
                    <CardHeader
                        action={
                            <IconButton onClick={this.handleDrawerClose}>
                                <Icon>clear</Icon>
                            </IconButton>
                        }
                        title="Alarm Overview"
                    />
                    <AlarmDetail
                        identify={this.props.identify}
                        detailData={detailData}
                        DrawerToggle={this.DrawerToggle.bind(this)}
                        editState={this.state.editState}
                        handleDrawerClose={this.handleDrawerClose}
                        applicationid={applicationid}
                    />
                </Drawer>
            </div>
        );
    }
}

Alarm.defaultProps = {
    severityKey: {
        "1": "critical",
        "2": "major",
        "3": "minor",
        "4": "info",
        "5": "unknown"
    },
    optionType: [
        {
            value: "EQ",
            name: "equals"
        },
        {
            value: "IN",
            name: "in"
        },
        {
            value: "LIKE",
            name: "like"
        },
        {
            value: "START_WITH",
            name: "start with"
        },
        {
            value: "END_WITH",
            name: "end with"
        }
    ],
    pageSize: [10, 20, 50, 100, 200],
    ascDesc: [
        {
            displayName: "A-Z",
            sortName: "asc"
        },
        {
            displayName: "Z-A",
            sortName: "desc"
        }
    ],
    pageLimit: 10,
    pageNo: 1,
    filterDataList: []
};

const mapStateToProps = (state, ownProps) => {
    return state[REDUCER_NAME] || {};
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        handleStream: (pageNo, pageLimit, applicationid) => {
            dispatch(getStreamRequest(pageNo, pageLimit, applicationid, props.identify));
        },
        handlItemsData: arr => {
            dispatch(saveItemsData(arr, props.identify));
        },
        handlDrawerToggle: (status, direction, isActive) => {
            dispatch(getDrawerToggle(status, direction, isActive, props.identify));
        },
        handlAlarmDetail: id => {
            dispatch(getDetailRequest(id, props.identify));
        },
        handlSearchTime: time => {
            dispatch(saveSearchTime(time, props.identify));
        },
        handleSearchItems: (paginator, items, applicationid) => {
            dispatch(getItemsRequest(paginator, items, applicationid, props.identify));
        },
        handleSortersArr: (orderBy, order, sortersArr) => {
            dispatch(saveSortersArr(orderBy, order, sortersArr, props.identify));
        },
        handleRowsPerPage: (pageNo, pageLimit) => {
            dispatch(saveRowsPerPage(pageNo, pageLimit, props.identify));
        },
        handleSortResult: arr => {
            dispatch(saveSortResult(arr, props.identify));
        },
        handleInit: obj => {
            dispatch(ccmsAction(obj, props.identify));
        }
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Alarm);
