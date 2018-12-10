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
 * Created by SongCheng on 31/08/2018.
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { theme } from "modules/theme";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { REDUCER_NAME } from "../funcs/constants";
import moment from "moment";
import {
    getItemsRequest,
    saveSortersArr,
    saveRowsPerPage,
    getDrawerToggle,
    getDetailRequest,
    getRequestContent
} from "../funcs/actions";

import AuditList from "./auditList";
import { view as AuditSearch } from "modules/audit/auditSearch";
import { view as AuditDetail } from "modules/audit/auditDetail";
import _ from "lodash";

const styles = {
    paper: {
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary
    }
};

class Audit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            totalItems: 0,
            page: 0,
            rowsPerPage: 10,
            data: [],
            currentTime: null,
            sorterData: [],
            order: "desc",
            orderBy: "requesttime",
            itemsData: null,
            defaultSortData: [
                {
                    ascending: false,
                    sortfield: "requesttime"
                }
            ]
        };
    }
    componentDidMount = () => {
        let paginator = {
            pageno: this.props.pageNo + 1,
            limit: this.props.pageLimit
        };
        this.props.handleSearchItems(paginator, this.props.sorterData);
    };

    // uninstall components
    componentWillUnmount = () => {
        this.DrawerToggle(false, "right", []);
    };

    componentWillReceiveProps(nextProps) {
        console.log("nextProps:::::::::::::", nextProps);
        let identifyVal = nextProps.identify;
        let arrayData = (nextProps[identifyVal] && nextProps[identifyVal].arrayData) || [];
        let pagination = (nextProps[identifyVal] && nextProps[identifyVal].pagination) || [];
        let dateStyle = nextProps[identifyVal] && nextProps[identifyVal].dateStyle;
        let sorterData = (nextProps[identifyVal] && nextProps[identifyVal].sorterData) || this.state.sorterData;
        let order = (nextProps[identifyVal] && nextProps[identifyVal].order) || this.state.order;
        let orderBy = (nextProps[identifyVal] && nextProps[identifyVal].orderBy) || this.state.orderBy;
        let loading = nextProps[identifyVal] && nextProps[identifyVal].loading;
        let isActive = (nextProps[identifyVal] && nextProps[identifyVal].isActive) || [];
        let columns = nextProps[identifyVal] && nextProps[identifyVal].columns;
        let listData = this.handlResponseData(arrayData, dateStyle);
        let itemsData = nextProps[identifyVal] && nextProps[identifyVal].itemsData;

        if (this.props[identifyVal] && this.props[identifyVal].pageLimit !== nextProps[identifyVal].pageLimit) {
            let paginator = {
                pageno: nextProps[identifyVal].pageNo + 1 || 1,
                limit: nextProps[identifyVal].pageLimit
            };
            this.props.handleSortersArr("requesttime", "desc", this.state.defaultSortData);
            if (itemsData) {
                this.props.handleSearchItems(paginator, sorterData, itemsData);
            } else {
                this.props.handleSearchItems(paginator, sorterData);
            }
        }

        this.setState({
            data: listData,
            page: pagination.currentpage || this.state.page,
            rowsPerPage: pagination.limit || this.state.rowsPerPage,
            totalItems: pagination.totalrecords || this.state.totalItems,
            sorterData: sorterData,
            orderBy: orderBy,
            order: order,
            loading: loading,
            isActive: isActive,
            columns: columns
        });
    }

    //handle response data
    handlResponseData = (arrayData, dateStyle) => {
        let opts = [];
        for (let i = 0; i < arrayData.length; i++) {
            let time = moment(arrayData[i]["requesttime"]).format(dateStyle);
            let timestamp = moment(arrayData[i]["requesttime"]).unix();
            let opt = {
                timestamp: timestamp,
                category: arrayData[i]["category"],
                userid: arrayData[i]["actorid"],
                requestmethod: arrayData[i]["requestmethod"],
                requesttarget: arrayData[i]["requesttarget"],
                clienthost: arrayData[i]["requesttrigger"],
                requesttime: time,
                id: arrayData[i]["id"]
            };
            opts.push(opt);
        }
        return opts;
    };

    //save sort data and rearrangement
    handleSortData = (orderBy, order, sortersArr) => {
        let identify = this.props.identify;
        let identifyVal = this.props[identify];
        let original = identifyVal.arrayData;

        original.map(item => {
            item.timestamp = moment(item.requesttime).unix();
            return item;
        });

        let orderByNew = this.checkOrderBy(orderBy);
        let newData = _.orderBy(original, orderByNew, order);

        this.props.handleSortersArr(orderBy, order, sortersArr, newData);
    };
    //change order filed
    checkOrderBy = val => {
        switch (val) {
            case "requesttime":
                return "timestamp";
            case "clienthost":
                return "requesttrigger";
            case "userid":
                return "actorid";
            default:
                return val;
        }
    };

    //search request
    getItemsSearch = (pageNo, pageLimit, sorterData, itemsData) => {
        let defaultSortData = this.state.defaultSortData;
        let paginator = {
            pageno: pageNo,
            limit: pageLimit
        };
        this.props.handleSortersArr("requesttime", "desc", defaultSortData);

        if (itemsData) {
            this.props.handleSearchItems(paginator, defaultSortData, itemsData);
        } else {
            this.props.handleSearchItems(paginator, defaultSortData);
        }
    };

    //handle RowsPerPage
    handleRowsPerPage = (pageNo, pageLimit) => {
        this.props.handleRowsPerPage(pageNo, pageLimit);
    };

    //open detail
    DrawerToggle = (status, direction, id, isActive) => {
        this.props.handleDrawerToggle(status, direction, isActive);
        if (status) {
            this.props.handleDetail(id);
        }
    };

    //requestContent
    requestContent = id => {
        this.props.handleRequestContent(id);
    };

    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <div className="auditContainer" style={styles.paper}>
                    <div className="auditBox">
                        <AuditSearch
                            {...this.props}
                            // sorterData={sorterData}
                            // currentTime={currentTime}
                            itemsData={this.state.itemsData}
                            getItemsSearch={this.getItemsSearch.bind(this)}
                        />
                        <AuditList
                            {...this.props}
                            DrawerToggle={this.DrawerToggle.bind(this)}
                            getItemsSearch={this.getItemsSearch.bind(this)}
                            handleSortData={this.handleSortData.bind(this)}
                            preState={this.state}
                        />
                    </div>
                    <AuditDetail
                        {...this.props}
                        DrawerToggle={this.DrawerToggle.bind(this)}
                        requestContent={this.requestContent.bind(this)}
                    />
                </div>
            </MuiThemeProvider>
        );
    }
}

Audit.propTypes = {
    title: PropTypes.string,
    pageNo: PropTypes.number,
    pageLimit: PropTypes.number
};

Audit.defaultProps = {};

const mapStateToProps = (state, ownProps) => {
    return state[REDUCER_NAME] || {};
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        handleSearchItems: (paginator, sorterData, items) => {
            dispatch(getItemsRequest(paginator, sorterData, items, props.identify));
        },
        handleSortersArr: (orderBy, order, sortersArr, newData) => {
            dispatch(saveSortersArr(orderBy, order, sortersArr, newData, props.identify));
        },
        handleRowsPerPage: (pageNo, pageLimit) => {
            dispatch(saveRowsPerPage(pageNo, pageLimit, props.identify));
        },
        handleDrawerToggle: (status, direction, isActive) => {
            dispatch(getDrawerToggle(status, direction, isActive, props.identify));
        },
        handleDetail: id => {
            dispatch(getDetailRequest(id, props.identify));
        },
        handleRequestContent: id => {
            dispatch(getRequestContent(id, props.identify));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(Audit));
