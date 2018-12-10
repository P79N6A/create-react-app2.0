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
import { connect } from "react-redux";
import "../styles/style.less";
import TopologyCont from "./topologyCont";
import { view as FloatTab } from "modules/topologyManagement/topologyMgmtFloatTab";
import { initAllRedux, closeFloatTab, storeColumnsAndFilters, autoRefreshInit, openFloatTab } from "../funcs/actions";
import Card from "@material-ui/core/Card";
import { view as TopoEnhanceFilter } from "modules/topologyManagement/topologyMgmtEnhanceFilter";
import { reducerName as topoReducerName } from "modules/topologyManagement/topologyMgmtGrid";
import _ from "lodash";
class Topology extends React.Component {
    constructor(props) {
        super(props);
        this.state = { filterConfig: this.props.filterConfig, selectAppId: "" };
    }

    componentWillMount() {
        let selectApplication = this.props.currentApplicationInfo;
        let selectAppRespath = (selectApplication && selectApplication["address.resourcePath"]) || "";
        let selectAppId = selectApplication && selectApplication["address.iotTopologyId"];
        let filterConfig = this.props.filterConfig;
        _.forEach(filterConfig, filter => {
            if (filter.filterName === "Application ID") {
                filter.defaultValue = selectAppRespath;
            }
        });
        this.setState({
            filterConfig: filterConfig,
            selectAppId: selectAppId,
            selectAppRespath: selectAppRespath
        });
        this.props.initAllRedux(this.props.identify, selectApplication, 0);
        this.props.closeFloatTab(this.props.identify);
        this.props.storeColumnsAndFilters(this.props.identify, this.props.columnConfig, this.props.filterConfig);
        this.props.autoRefreshInit(this.props.identify);
    }

    componentWillReceiveProps(nextProps) {}

    handleFloatTabClose() {
        this.props.closeFloatTab(this.props.identify);
    }

    topoMgmtAdd(identify) {
        this.props.openFloatTab(identify, "add");
    }

    render() {
        return (
            <div className="topologyMgmt-container" id={this.props.identify}>
                <Card className="topology-cont">
                    <TopoEnhanceFilter
                        identify={this.props.identify}
                        title={this.props.title}
                        subTitle={this.props.subTitle}
                        filterConfig={this.state.filterConfig}
                        topoDisplayType={this.props.topoDisplayType}
                        refreshTopologySuccess={this.props.refreshTopologySuccess}
                        topoMgmtAdd={this.topoMgmtAdd.bind(this)}
                        selectAppRespath={this.state.selectAppRespath}
                    />
                    <TopologyCont
                        identify={this.props.identify}
                        topoDisplayType={this.props.topoDisplayType}
                        columnConfig={this.props.columnConfig}
                        multipleSelect={this.props.multipleSelect}
                        pageLimit={this.props.pageLimit}
                        orderDisplayName={this.props.orderDisplayName}
                        orderDirection={this.props.orderDirection}
                        refreshTopologySuccess={this.props.refreshTopologySuccess}
                    />
                </Card>
                <FloatTab
                    identify={this.props.identify}
                    tabTypes={this.props.tabTypes}
                    handleFloatTabClose={this.handleFloatTabClose.bind(this)}
                    selectAppId={this.state.selectAppId}
                    selectAppRespath={this.state.selectAppRespath}
                />
            </div>
        );
    }
}

Topology.propTypes = {
    identify: PropTypes.string,
    columnConfig: PropTypes.array
};

Topology.defaultProps = {
    title: "Device Provisioning",
    subTitle: "",
    identify: "topology",
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
            columnName: "Application ID / Address ID",
            defaultSelect: true
        },
        {
            columnName: "Parent Device",
            defaultSelect: true
        },
        {
            columnName: "System Resource ID",
            defaultSelect: false
        },
        {
            columnName: "Action",
            defaultSelect: true
        }
    ],
    filterConfig: [
        {
            filterName: "searchByPathandName",
            defaultValue: ""
        },
        {
            filterName: "Status",
            defaultValue: []
        },
        {
            filterName: "Device Type",
            defaultValue: []
        },
        {
            filterName: "Application ID",
            defaultValue: ""
        }
    ],
    topoDisplayType: "List",
    multipleSelect: true,
    orderBy: "physical.name",
    orderDirection: "asc"
};

const filterProps = (state, identify, reducerName, props) => {
    if (state[reducerName] && state[reducerName][identify]) {
        return state[reducerName][identify][props];
    }
};

const mapStateToProps = (state, ownProps) => {
    let identify = ownProps.identify;
    return {
        title: filterProps(state, identify, topoReducerName, "title"),
        subTitle: filterProps(state, identify, topoReducerName, "subTitle"),
        refreshTopologySuccess: filterProps(state, identify, topoReducerName, "refreshTopologySuccess")
    };
};

const mapDispatchToProps = dispatch => {
    return {
        initAllRedux: (identify, selectApplication, checkedTab) => {
            dispatch(initAllRedux(identify, selectApplication, checkedTab));
        },
        closeFloatTab: identify => {
            dispatch(closeFloatTab(identify));
        },
        storeColumnsAndFilters: (identify, columnConfig, filterConfig) => {
            dispatch(storeColumnsAndFilters(identify, columnConfig, filterConfig));
        },
        autoRefreshInit: (identify, timer) => {
            dispatch(autoRefreshInit(identify, timer));
        },
        openFloatTab: (identify, floatTabType) => {
            dispatch(openFloatTab(identify, floatTabType));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Topology);
