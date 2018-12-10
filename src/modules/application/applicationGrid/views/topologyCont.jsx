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
import { getAddressFromLayerRequest } from "../funcs/actions";
// import { wsMapping } from "modules/application/applicationGrid/funcs/constants";
import { reducerName as topoReducerName } from "modules/application/applicationGrid";
import { reducerName as topoFilterReducerName } from "modules/application/applicationEnhanceFilter";
import { REDUCER_NAME as topoFloatTabReducer } from "modules/application/applicationFloatTab/funcs/constants";
import { reducerName as appTreeReducer } from "modules/application/topologyTree";
import { USER_KEY } from "commons/constants/const";
import TopologyGrid from "./topologyGrid";

import _ from "lodash";

class TopologyCont extends React.Component {
    constructor(props) {
        super(props);
        this.roles = sessionStorage.getItem(USER_KEY) && JSON.parse(sessionStorage.getItem(USER_KEY)).roles;
        this.timer = {};
        this.state = {
            columnConfig: this.props.columnConfig
        };
    }

    searchTopoFunc(pageNo, pageLimit) {
        if (this.props.isPending) {
            return;
        }
        const { identify, selectedData, orderDirection, orderBy, predicates, orderDisplayName } = this.props,
            { id } = selectedData || {},
            currentOrderBy = `${orderBy} ${orderDirection}`,
            resourcetype = ["device", "address"];
        this.props.getAddressFromLayer(
            identify,
            predicates,
            pageLimit,
            pageNo,
            id,
            resourcetype,
            currentOrderBy,
            orderDisplayName,
            orderDirection
        );
    }

    // wsMsg(nextProps) {}

    componentWillReceiveProps(nextProps) {
        if (_.isEqual(nextProps, this.props)) {
            return;
        }
        const { identify, selectedData, orderDirection, orderBy, pageNo, pageLimit, predicates } = nextProps,
            { needRefreshTopology, refreshTopology, orderDisplayName } = nextProps,
            { id } = selectedData || {},
            resourcetype = ["device", "address"],
            currentOrderBy = `${orderBy} ${orderDirection}`;
        if (
            !_.isEqual(nextProps.selectedData, this.props.selectedData) ||
            (this.props.refreshTopology !== refreshTopology && refreshTopology) ||
            this.props.orderBy !== orderBy ||
            this.props.orderDirection !== orderDirection ||
            (this.props.needRefreshTopology !== needRefreshTopology && needRefreshTopology)
        ) {
            this.props.getAddressFromLayer(
                identify,
                predicates,
                pageLimit,
                pageNo,
                id,
                resourcetype,
                currentOrderBy,
                orderDisplayName,
                orderDirection
            );
        }

        if (this.props.currentCheckColumns !== nextProps.currentCheckColumns) {
            this.setState({
                columnConfig: JSON.parse(nextProps.currentCheckColumns)
            });
        }
        let { refreshCount } = nextProps;
        // !_.isEqual(wsMessage, this.props.wsMessage) && this.wsMsg(nextProps);
        !_.isEqual(refreshCount, this.props.refreshCount) && this.refreshData(nextProps);
    }

    refreshData({ identify }) {
        // const { selectedData } = this.props;
        // const { id, resourcetype } = selectedData || {};
        const { selectedData, orderDirection, orderBy, pageNo, pageLimit, predicates, orderDisplayName } = this.props,
            { id } = selectedData || {},
            resourcetype = ["device", "address"],
            currentOrderBy = `${orderBy} ${orderDirection}`;
        clearTimeout(this.timer[identify]);
        this.timer[identify] = setTimeout(() => {
            this.props.getAddressFromLayer(
                this.props.identify,
                predicates,
                pageLimit,
                pageNo,
                id,
                resourcetype,
                currentOrderBy,
                orderDisplayName,
                orderDirection
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
            (this.props.needRefreshTopology !== nextProps.needRefreshTopology && nextProps.needRefreshTopology) ||
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
                        selectedData={this.props.selectedData}
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
    orderDisplayName: "Name",
    orderBy: "name",
    orderDirection: "asc",
    columnConfig: [
        {
            columnName: "DisplayName",
            defaultSelect: true
        },
        {
            columnName: "Name",
            defaultSelect: true
        },
        {
            columnName: "Node",
            defaultSelect: true
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
        refreshTopology: filterProps(state, identify, topoReducerName, "refreshTopology"),
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
        refreshCount: filterProps(state, identify, topoReducerName, "refreshCount"),
        needRefreshTopology: filterProps(state, identify, topoFloatTabReducer, "needRefreshTopology"),
        selectedData: filterProps(state, identify, appTreeReducer, "selectedNode")
        // columnConfig: filterProps(state, identify, topoReducerName, "columnConfig")
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAddressFromLayer: (
            identify,
            predicates,
            pageLimit,
            pageNo,
            iotId,
            resourcetype,
            sortConfig,
            orderDisplayName,
            orderDirection
        ) => {
            dispatch(
                getAddressFromLayerRequest(
                    identify,
                    predicates,
                    pageLimit,
                    pageNo,
                    iotId,
                    resourcetype,
                    sortConfig,
                    orderDisplayName,
                    orderDirection
                )
            );
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TopologyCont);
