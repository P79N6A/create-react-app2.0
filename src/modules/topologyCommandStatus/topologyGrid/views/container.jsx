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
// import { view as FloatTab } from "../../topologyFloatTab";
import {
    ccmsControl,
    closeFloatTab,
    storeColumnsAndFilters,
    changeTopoDisplayType,
    autoRefreshInit
} from "../funcs/actions";
import Card from "@material-ui/core/Card";
import { view as TopoEnhanceFilter } from "../../topologyEnhanceFilter";
import { REDUCER_NAME as topoReducerName } from "../funcs/constants";
import ExportComps from "./exportComps";
import _ from "lodash";

class Topology extends React.Component {
    componentWillMount() {
        let selectApplication = this.props.currentApplicationInfo;
        let selectAppRespath = (selectApplication && selectApplication["address.resourcePath"]) || "";
        let selectAppId = selectApplication && selectApplication["address.iotTopologyId"];
        let filterConfig = this.props.filterConfig;
        // _.forEach(filterConfig, filter => {
        //     if (filter.filterName === "Application ID") {
        //         filter.defaultValue = selectAppRespath;
        //     }
        // });
        // this.setState({
        //     filterConfig: filterConfig,
        //     selectAppId: selectAppId,
        //     selectAppRespath: selectAppRespath
        // });
        this.props.closeFloatTab(this.props.identify);
        this.props.storeColumnsAndFilters(this.props.identify, this.props.columnConfig, _.cloneDeep(filterConfig));
        this.props.autoRefreshInit(this.props.identify);
    }

    componentWillReceiveProps(nextProps) {
        this.props.ccmsControl(this.props.identify);
    }

    handleFloatTabClose() {
        this.props.closeFloatTab(this.props.identify);
    }

    changeTopoDisplayType(identify, topoDisplayType, widgetTitle) {
        this.props.changeTopoDisplayType(identify, topoDisplayType, widgetTitle);
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
                        changeTopoDisplayType={this.changeTopoDisplayType.bind(this)}
                        // selectAppRespath={this.state.selectAppRespath}
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
                {/* <FloatTab
                    identify={this.props.identify}
                    tabTypes={this.props.tabTypes}
                    handleFloatTabClose={this.handleFloatTabClose.bind(this)}
                />
                <ExportComps identify={this.props.identify} /> */}
            </div>
        );
    }
}

Topology.propTypes = {
    identify: PropTypes.string,
    columnConfig: PropTypes.array
};

Topology.defaultProps = {
    title: "Command Status List",
    subTitle: "",
    identify: "topoCommandStatus",
    columnConfig: [
        {
            columnName: "Device Name",
            defaultSelect: true
        },
        {
            columnName: "Message Type",
            defaultSelect: true
        },
        {
            columnName: "Sendtime",
            defaultSelect: true
        },
        {
            columnName: "MsgStatusDesc",
            defaultSelect: true
        },
        {
            columnName: "RecTime",
            defaultSelect: false
        },
        {
            columnName: "RecDesc",
            defaultSelect: false
        }
    ],
    tabTypes: ["detail", "alarm", "event"],
    filterConfig: [
        {
            filterName: "MessageType",
            defaultValue: "UpdateProperties"
        }
    ],
    topoDisplayType: "List",
    multipleSelect: true,
    orderBy: "cntrlMsgRequest.deviceId",
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
            filterProps(state, identify, topoReducerName, "refreshTopologySuccess") || ownProps.refreshTopologySuccess,
        columnConfig: filterProps(state, identify, topoReducerName, "columnConfig")
    };
};

const mapDispatchToProps = dispatch => {
    return {
        ccmsControl: (identify, columnConfig, filterConfig) => {
            dispatch(ccmsControl(identify, columnConfig, filterConfig));
        },
        closeFloatTab: identify => {
            dispatch(closeFloatTab(identify));
        },
        storeColumnsAndFilters: (identify, columnConfig, filterConfig) => {
            dispatch(storeColumnsAndFilters(identify, columnConfig, filterConfig));
        },
        changeTopoDisplayType: (identify, topoDisplayType, widgetTitle) => {
            dispatch(changeTopoDisplayType(identify, topoDisplayType, widgetTitle));
        },
        autoRefreshInit: (identify, timer) => {
            dispatch(autoRefreshInit(identify, timer));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Topology);
