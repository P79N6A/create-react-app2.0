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
import { view as FloatTab } from "modules/application/applicationFloatTab";
import {
    ccmsControl,
    closeFloatTab,
    storeColumnsAndFilters,
    autoRefreshInit,
    openFloatTab,
    initApplicationGrid
} from "../funcs/actions";
import Card from "@material-ui/core/Card";
import { view as TopoEnhanceFilter } from "modules/application/applicationEnhanceFilter";
import { reducerName as topoReducerName } from "modules/application/applicationGrid";
// import ExportComps from "./exportComps";

class Topology extends React.Component {
    componentWillMount() {
        this.props.init(this.props.identify,this.props.orderBy);
        this.props.storeColumnsAndFilters(this.props.identify, this.props.columnConfig, this.props.filterConfig);
        // this.props.autoRefreshInit(this.props.identify);
    }

    componentWillReceiveProps(nextProps) {
        this.props.ccmsControl(this.props.identify);
    }

    handleFloatTabClose() {
        this.props.closeFloatTab(this.props.identify);
    }

    topoMgmtAdd(identify) {
        this.props.openFloatTab(identify, "add");
    }

    render() {
        return (
            <div className="topology-container">
                <Card className="topology-cont">
                    <TopoEnhanceFilter
                        identify={this.props.identify}
                        title={this.props.title}
                        subTitle={this.props.subTitle}
                        filterConfig={this.props.filterConfig}
                        topoDisplayType={this.props.topoDisplayType}
                        refreshTopologySuccess={this.props.refreshTopologySuccess}
                        topoMgmtAdd={this.topoMgmtAdd.bind(this)}
                    />
                    <TopologyCont
                        identify={this.props.identify}
                        topoDisplayType={this.props.topoDisplayType}
                        columnConfig={this.props.columnConfig}
                        multipleSelect={this.props.multipleSelect}
                        pageLimit={this.props.pageLimit}
                        orderDisplayName={this.props.orderDisplayName}
                        orderDirection={this.props.orderDirection}
                    />
                </Card>
                <FloatTab
                    identify={this.props.identify}
                    tabTypes={this.props.tabTypes}
                    handleFloatTabClose={this.handleFloatTabClose.bind(this)}
                />
                {/* <ExportComps identify={this.props.identify} /> */}
            </div>
        );
    }
}

Topology.propTypes = {
    identify: PropTypes.string,
    columnConfig: PropTypes.array
};

Topology.defaultProps = {
    title: "Application List",
    subTitle: "",
    identify: "applicationtest",
    columnConfig: [
        {
            columnName: "Name",
            defaultSelect: true
        },
        {
            columnName: "DisplayName",
            defaultSelect: true
        },
        {
            columnName: "Node Type",
            defaultSelect: true
        },
        {
            columnName: "Action",
            defaultSelect: true
        }
    ],
    tabTypes: ["detail", "alarm", "event"],
    filterConfig: [
        {
            filterName: "Status",
            defaultValue: []
        },
        {
            filterName: "DeviceType",
            defaultValue: []
        },
        // {
        //     filterName: "IotTopologyId",
        //     defaultValue: ""
        // },
        {
            filterName: "Location",
            defaultValue: ""
        }
    ],
    topoDisplayType: "List",
    multipleSelect: true,
    orderBy: "name",
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
        title: filterProps(state, identify, topoReducerName, "title") || ownProps.title,
        subTitle: filterProps(state, identify, topoReducerName, "subTitle") || ownProps.subTitle,
        refreshTopologySuccess:
            filterProps(state, identify, topoReducerName, "refreshTopologySuccess") || ownProps.refreshTopologySuccess
    };
};

const mapDispatchToProps = dispatch => {
    return {
        init: (identify, orderBy) => {
            dispatch(initApplicationGrid(identify, orderBy));
        },
        ccmsControl: (identify, columnConfig, filterConfig) => {
            dispatch(ccmsControl(identify, columnConfig, filterConfig));
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
