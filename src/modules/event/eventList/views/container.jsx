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
import PropTypes from "prop-types";
import EventTable from "./eventTable";
import EventCard from "./eventCard";
import { view as EventDetail } from "modules/event/eventDetail";
import { view as EventSearch } from "modules/event/eventSearch";

import { connect } from "react-redux";
import { REDUCER_NAME } from "../funcs/constants";

import {
    changeTopoDisplayType,
    getStreamRequest,
    getDrawerToggle,
    saveSearchTime,
    getItemsRequest,
    getDetailRequest,
    saveSortersArr,
    saveRowsPerPage,
    saveItemsData,
    saveSortResult,
    ccmsAction
} from "../funcs/actions";
import { Refresh, Export } from "./functions";
import moment from "moment";
import _ from "lodash";
import { handleDataForRequest } from "modules/event/eventSearch/funcs/filter";

import { Drawer } from "modules/common";
import { CardHeader } from "modules/common";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";

class Event extends Component {
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
            itemsData: _.cloneDeep(this.props.defaultFilterData) || []
        };
    }

    componentDidMount = () => {
        this.props.handleInit(this.props);
    };

    componentWillReceiveProps = nextProps => {
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
            parametersData = []
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
            parametersData
        });
    };

    //uninstall components
    componentWillUnmount = () => {
        this.props.handlDrawerToggle(false, "right", []);
    };

    handleTime = () => {
        let newTime = moment()
            .toISOString()
            .replace("Z", "+0000");
        this.props.handlSearchTime(newTime);
        return newTime;
    };

    //search by filter items
    getItemsSearch = (pageNo, pageLimit, itemsData) => {
        let newItemsData = itemsData.concat(_.cloneDeep(this.props.defaultFilterData));
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
            return item;
        });
        let orderByNew = orderBy === "sentdatetime" ? "timestamp" : orderBy;
        let newData = _.orderBy(original, orderByNew, order);
        
        return newData;
    };

    DrawerToggle = (status, direction, id, isActive) => {
        this.props.handlDrawerToggle(status, direction, isActive);
        if (status) {
            this.props.handlEventDetail(id);
        }
    };

    handleRowsPerPage = (pageNo, pageLimit) => {
        this.props.handleRowsPerPage(pageNo, pageLimit);
    };

    //handle stream request
    handleStreamRequest = () => {
        let applicationid = this.props.currentApplicationInfo ? this.props.currentApplicationInfo["address.name"] : "";
        let arr = handleDataForRequest([]);
        let predicate = {
            operator: "AND",
            predicates: arr
        };
        this.props.handleStream(1, 200, predicate, applicationid);
    };

    handlResponseData = (arrayData, dateStyle) => {
        let opts = [];
        for (let i = 0; i < arrayData.length; i++) {
            let time = moment(arrayData[i]["sentdatetime"]).format(dateStyle);
            let timestamp = moment(arrayData[i]["sentdatetime"]).unix();
            let opt = {
                timestamp: timestamp,
                severityNum: arrayData[i]["severity"],
                severity: this.props.severityKey[arrayData[i]["severity"]],
                sentdatetime: time,
                eventtype:
                    arrayData[i].infos && arrayData[i].infos.length > 0
                        ? arrayData[i].infos[0].eventtype
                        : arrayData[i]["eventtype"],
                source: arrayData[i]["source"],
                note: arrayData[i]["note"],
                id: arrayData[i]["id"]
            };
            opts.push(opt);
        }
        return opts;
    };

    handleDrawerClose = () => {
        this.props.handlDrawerToggle(false, "right", []);
    };

    render() {
        let { identify, sorterData, defaultFilterData } = this.props;
        let { currentTime } = this.state;
        let identifyData = this.props[identify];
        const showItemsNew = identifyData && identifyData.showItems;
        const anchorNew = identifyData && identifyData.anchor;
        const detailData = identifyData && identifyData.detailData;
        const topoDisplayType = identifyData && identifyData.topoDisplayType;
        const applicationid = this.props.currentApplicationInfo
            ? this.props.currentApplicationInfo["address.name"]
            : "";
        return (
            <div className="eventContainer">
                <Refresh identify={identify} {...this.props} handleStreamRequest={this.handleStreamRequest} />
                <Export identify={identify} {...this.props} applicationid={applicationid} />
                <div className="eventBox">
                    <EventSearch
                        {...this.props}
                        preState={this.state}
                        currentTime={currentTime}
                        getItemsSearch={this.getItemsSearch.bind(this)}
                        ccmsFilterDataList={defaultFilterData}
                    />
                    {topoDisplayType === "Search" ? (
                        <EventTable
                            {...this.props}
                            DrawerToggle={this.DrawerToggle.bind(this)}
                            getItemsSearch={this.getItemsSearch.bind(this)}
                            handleSortData={this.handleSortData.bind(this)}
                            handleRowsPerPage={this.handleRowsPerPage.bind(this)}
                            preState={this.state}
                        />
                    ) : (
                        <EventCard
                            {...this.props}
                            DrawerToggle={this.DrawerToggle.bind(this)}
                            handleStreamRequest={this.handleStreamRequest.bind(this)}
                            preState={this.state}
                        />
                    )}
                </div>

                <Drawer className="eventDetail" variant="persistent" anchor={anchorNew} open={showItemsNew}>
                    <CardHeader
                        action={
                            <IconButton onClick={this.handleDrawerClose}>
                                <Icon>clear</Icon>
                            </IconButton>
                        }
                        title="Event Detail"
                    />
                    <EventDetail
                        {...this.props}
                        detail={detailData}
                        sorterData={sorterData}
                        currentTime={currentTime}
                        DrawerToggle={this.DrawerToggle}
                    />
                </Drawer>
            </div>
        );
    }
}

Event.propTypes = {
    title: PropTypes.string,
    pageNo: PropTypes.number,
    pageLimit: PropTypes.number
};

Event.defaultProps = {
    severityKey: {
        "1": "critical",
        "2": "major",
        "3": "minor",
        "4": "info",
        "5": "clear",
        "6": "reading",
        "7": "unknown"
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
    tabTypes: ["General", "Detail"],
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
    defaultFilterData: []
};

const mapStateToProps = (state, ownProps) => {
    return state[REDUCER_NAME] || {};
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        changeTopoDisplayType: topoDisplayType => {
            dispatch(changeTopoDisplayType(topoDisplayType, props.identify));
        },
        handleStream: (pageNo, pageLimit, predicate, applicationid) => {
            dispatch(getStreamRequest(pageNo, pageLimit, predicate, applicationid, props.identify));
        },
        handlItemsData: arr => {
            dispatch(saveItemsData(arr, props.identify));
        },
        handlDrawerToggle: (status, direction, isActive) => {
            dispatch(getDrawerToggle(status, direction, isActive, props.identify));
        },
        handlSearchTime: time => {
            dispatch(saveSearchTime(time, props.identify));
        },
        handleSearchItems: (paginator, items, applicationid) => {
            dispatch(getItemsRequest(paginator, items, applicationid, props.identify));
        },
        handlEventDetail: id => {
            dispatch(getDetailRequest(id, props.identify));
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
)(Event);
