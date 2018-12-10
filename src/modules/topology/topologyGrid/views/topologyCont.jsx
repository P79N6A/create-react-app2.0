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
 * Created by xulu on 25/05/2018.
 */
import React from "react";
import PropTypes from "prop-types";
import CardContent from "@material-ui/core/Card";
import "../styles/style.less";
import TopologyList from "./topologyList";
import { connect } from "react-redux";
import {
    topologyRequest,
    getSysconfigDeviceTypes,
    getSysconfigDeviceSchema,
    getSysconfigDeviceTypeSchema
} from "../funcs/actions";
import { wsMapping } from "modules/topology/topologyGrid/funcs/constants";
import { reducerName as topoReducerName } from "modules/topology/topologyGrid";
import { reducerName as topoFilterReducerName } from "modules/topology/topologyEnhanceFilter";
import TopologyGrid from "./topologyGrid";
import _ from "lodash";
import { ISC_ACCOUNT_INFO } from "commons/constants/const";

class TopologyCont extends React.Component {
    constructor(props) {
        super(props);
        this.timer = {};
        this.state = {
            columnConfig: this.props.columnConfig
        };
        this.siteName =
            sessionStorage.getItem(ISC_ACCOUNT_INFO) &&
            JSON.parse(sessionStorage.getItem(ISC_ACCOUNT_INFO)).displayname;
        if (!this.props.isPending) {
            let currentOrderBy = `${this.props.orderBy} ${this.props.orderDirection}`;
            this.props.searchTopoData(
                this.props.pageNo,
                this.props.pageLimit,
                this.props.identify,
                this.props.predicates,
                currentOrderBy,
                this.props.orderDisplayName,
                this.props.orderDirection
            );
        }
    }

    componentWillMount() {
        this.props.getSysconfigDeviceTypes(this.props.identify, this.siteName, "sysconfigDeviceTypes");
        this.props.getSysconfigDeviceSchema(this.props.identify, this.siteName, "sysconfigDeviceSchema");
        this.props.getSysconfigDeviceTypeSchema(this.props.identify, this.siteName, "sysconfigDeviceTypeSchema");
    }

    searchTopoFunc(pageNo, pageLimit) {
        if (this.props.isPending) {
            return;
        }
        let currentOrderBy = `${this.props.orderBy} ${this.props.orderDirection}`;
        this.props.searchTopoData(
            pageNo,
            pageLimit,
            this.props.identify,
            this.props.predicates,
            currentOrderBy,
            this.props.orderDisplayName,
            this.props.orderDirection
        );
    }

    wsMsg(nextProps) {
        let { wsMessage } = nextProps;
        if (wsMessage && wsMessage["header-category"] === wsMapping["propertyUpdate"]) {
            let currentOrderBy = `${this.props.orderBy} ${this.props.orderDirection}`;
            this.props.searchTopoData(
                this.props.pageNo,
                this.props.pageLimit,
                this.props.identify,
                this.props.predicates,
                currentOrderBy,
                this.props.orderDisplayName,
                this.props.orderDirection
            );
        }
    }

    componentWillReceiveProps(nextProps) {
        if (_.isEqual(nextProps, this.props)) {
            return;
        }
        if (
            this.props.pageNo !== nextProps.pageNo ||
            this.props.pageLimit !== nextProps.pageLimit ||
            JSON.stringify(this.props.predicates) !== JSON.stringify(nextProps.predicates) ||
            this.props.orderBy !== nextProps.orderBy ||
            this.props.orderDirection !== nextProps.orderDirection ||
            (this.props.refreshTopology !== nextProps.refreshTopology && nextProps.refreshTopology) ||
            this.props.topoDisplayType !== nextProps.topoDisplayType
        ) {
            let currentOrderBy = `${nextProps.orderBy} ${nextProps.orderDirection}`;
            this.props.searchTopoData(
                nextProps.pageNo,
                nextProps.pageLimit,
                this.props.identify,
                nextProps.predicates,
                currentOrderBy,
                nextProps.orderDisplayName,
                nextProps.orderDirection
            );
        }

        if (this.props.currentCheckColumns !== nextProps.currentCheckColumns) {
            this.setState({
                columnConfig: JSON.parse(nextProps.currentCheckColumns)
            });
        }
        let { wsMessage, refreshCount } = nextProps;
        !_.isEqual(wsMessage, this.props.wsMessage) && this.wsMsg(nextProps);
        !_.isEqual(refreshCount, this.props.refreshCount) && this.refreshData(nextProps);
    }

    refreshData({ identify }) {
        clearTimeout(this.timer[identify]);
        this.timer[identify] = setTimeout(() => {
            let currentOrderBy = `${this.props.orderBy} ${this.props.orderDirection}`;
            this.props.searchTopoData(
                this.props.pageNo,
                this.props.pageLimit,
                this.props.identify,
                this.props.predicates,
                currentOrderBy,
                this.props.orderDisplayName,
                this.props.orderDirection
            );
        }, 2000);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (
            this.props.pageNo !== nextProps.pageNo ||
            this.props.pageLimit !== nextProps.pageLimit ||
            this.props.predicates !== nextProps.predicates ||
            this.props.datas !== nextProps.datas ||
            this.props.currentCheckColumns !== nextProps.currentCheckColumns ||
            this.props.orderBy !== nextProps.orderBy ||
            this.props.orderDirection !== nextProps.orderDirection ||
            (this.props.refreshTopology !== nextProps.refreshTopology && nextProps.refreshTopology) ||
            this.props.topoDisplayType !== nextProps.topoDisplayType
        ) {
            return true;
        } else {
            return false;
        }
    }

    render() {
        return (
            <CardContent className="topology-lists">
                {this.props.topoDisplayType === "List" ? (
                    <TopologyList
                        identify={this.props.identify}
                        columnConfig={this.state.columnConfig}
                        datas={this.props.datas}
                        pagination={this.props.pagination}
                        searchTopoFunc={this.searchTopoFunc.bind(this)}
                        multipleSelect={this.props.multipleSelect}
                    />
                ) : null}
                {this.props.topoDisplayType === "Table" ? (
                    <TopologyGrid
                        identify={this.props.identify}
                        columnConfig={this.state.columnConfig}
                        datas={this.props.datas}
                        pagination={this.props.pagination}
                        searchTopoFunc={this.searchTopoFunc.bind(this)}
                        multipleSelect={this.props.multipleSelect}
                    />
                ) : null}
            </CardContent>
        );
    }
}

TopologyCont.propTypes = {
    pageNo: PropTypes.number.isRequired,
    pageLimit: PropTypes.number.isRequired,
    topoDisplayType: PropTypes.string.isRequired,
    datas: PropTypes.array.isRequired,
    pagination: PropTypes.object.isRequired,
    columnConfig: PropTypes.array
};

TopologyCont.defaultProps = {
    pageNo: 1,
    pageLimit: 10,
    datas: [],
    pagination: {
        totalrecords: 0,
        limit: 10,
        currentpage: 1
    },
    topoDisplayType: "List",
    multipleSelect: true,
    orderDisplayName: "Device ID",
    orderBy: "physical.name",
    orderDirection: "asc",
    columnConfig: [
        {
            columnName: "Icon",
            defaultSelect: true
        },
        {
            columnName: "Device Name",
            defaultSelect: true
        },
        {
            columnName: "Real World Resource Name",
            defaultSelect: false
        },
        {
            columnName: "Device Type Name",
            defaultSelect: true
        },
        {
            columnName: "Status",
            defaultSelect: true
        },
        {
            columnName: "Application ID",
            defaultSelect: true
        },
        {
            columnName: "System Resource ID",
            defaultSelect: false
        }
    ]
};

const filterProps = (state, identify, reducerName, props) => {
    if (state[reducerName] && state[reducerName][identify]) {
        return state[reducerName][identify][props];
    }
};

const mapStateToProps = (state, ownProps) => {
    let identify = ownProps.identify;
    return {
        predicates: filterProps(state, identify, topoFilterReducerName, "predicate"),
        currentCheckColumns: filterProps(state, identify, topoFilterReducerName, "currentCheckColumns"),
        refreshTopology: filterProps(state, identify, topoFilterReducerName, "refreshTopology"),
        datas: filterProps(state, identify, topoReducerName, "arrayData"),
        pagination: filterProps(state, identify, topoReducerName, "pagination"),
        isPending: filterProps(state, identify, topoReducerName, "isPending"),
        pageLimit: filterProps(state, identify, topoReducerName, "pageLimit") || ownProps.pageLimit,
        orderBy: filterProps(state, identify, topoReducerName, "orderBy") || ownProps.orderBy,
        orderDirection: filterProps(state, identify, topoReducerName, "orderDirection") || ownProps.orderDirection,
        orderDisplayName:
            filterProps(state, identify, topoReducerName, "orderDisplayName") || ownProps.orderDisplayName,
        topoDisplayType: filterProps(state, identify, topoReducerName, "topoDisplayType") || ownProps.topoDisplayType,
        wsMessage: state[topoReducerName] && state[topoReducerName].wsMessage,
        refreshCount: filterProps(state, identify, topoReducerName, "refreshCount")
        // columnConfig: filterProps(state, identify, topoReducerName, "columnConfig")
    };
};

const mapDispatchToProps = dispatch => {
    return {
        searchTopoData: (pageNo, pageLimit, identify, predicate, sortConfig, orderDisplayName, orderDirection) => {
            dispatch(
                topologyRequest(pageNo, pageLimit, identify, predicate, sortConfig, orderDisplayName, orderDirection)
            );
        },
        getSysconfigDeviceTypes: (identify, siteName, dataType) => {
            dispatch(getSysconfigDeviceTypes(identify, siteName, dataType));
        },
        getSysconfigDeviceSchema: (identify, siteName, schemaType) => {
            dispatch(getSysconfigDeviceSchema(identify, siteName, schemaType));
        },
        getSysconfigDeviceTypeSchema: (identify, siteName, schemaType) => {
            dispatch(getSysconfigDeviceTypeSchema(identify, siteName, schemaType));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TopologyCont);
