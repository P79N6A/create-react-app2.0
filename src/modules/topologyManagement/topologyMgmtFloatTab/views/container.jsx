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
import "../styles/style.less";
import { Drawer } from "modules/common";
import { connect } from "react-redux";
import {
    setTopoFloatTab,
    initTopoFloatTab,
    setFloatTabTitle,
    getDeviceTypeSchema,
    getSysconfigBasicType,
    getTopologySchema
} from "../funcs/actions";
import { reducerName as topoReducerName } from "modules/topologyManagement/topologyMgmtGrid";
import FloatTabHeader from "./floatTabHeader";
import { REDUCER_NAME as topoFloatTabReducer } from "../funcs/constants";
import AddDeviceComp from "./addDeviceComp";
import AddDeviceTypeComp from "./addDeviceTypeComp";
import OverviewDeviceComp from "./viewDeviceComp";
import OverviewDevicetypeComp from "./viewDeviceTypeComp";
import EditDeviceComp from "./editDeviceComp";
import EditDeviceTypeComp from "./editDeviceTypeComp";
// import AddSubDeviceComp from "./addSubDeviceComp";
import { ISC_ACCOUNT_INFO } from "commons/constants/const";
import EditDevicePropertyComp from "./editDevicePropertyComp";

const titleConfig = {
    view: [{ title: "Device Overview" }, { title: "Device Type Overview" }],
    subDevice: [{ title: "Add sub device" }],
    add: [{ title: "Add new Device" }, { title: "Add new Device Type" }],
    edit: [{ title: "Edit Device" }, { title: "Edit Device Type" }],
    property: [{ title: "Edit Device Property" }]
};

class FloatTabCont extends React.Component {
    constructor(props) {
        super(props);
        this.siteName =
            sessionStorage.getItem(ISC_ACCOUNT_INFO) &&
            JSON.parse(sessionStorage.getItem(ISC_ACCOUNT_INFO)).displayname;
    }

    componentDidMount() {
        this.identify = this.props.identify;
        this.props.initTopoFloatTab(this.identify);
        const { applicationSchema, getTopologySchema } = this.props;
        !applicationSchema && getTopologySchema(this.props.identify, this.siteName, "application");
    }

    componentWillReceiveProps(nextProps) {
        let deviceId = nextProps.selectDeviceId;
        let resourcePath = nextProps.selectResourcePath;
        this.props.setTopoFloatTab(deviceId, resourcePath, nextProps.defaultTab, this.props.identify);
        let currentTitle =
            titleConfig[nextProps.floatTabType] &&
            titleConfig[nextProps.floatTabType][nextProps.checkedTab] &&
            titleConfig[nextProps.floatTabType][nextProps.checkedTab].title;
        this.props.setFloatTabTitle(nextProps.identify, currentTitle);
        this.shouldEdit = false;
        if (this.props.editRowDataIotId !== nextProps.editRowDataIotId) {
            this.shouldEdit = true;
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (
            this.props.showFloatTab !== nextProps.showFloatTab ||
            this.props.selectDeviceId !== nextProps.selectDeviceId ||
            this.props.floatTabType !== nextProps.floatTabType
        ) {
            return true;
        } else {
            return false;
        }
    }

    render() {
        const { checkedTab, floatTabType, showFloatTab } = this.props;
        let { anchor } = this.props;
        return (
            <Drawer variant="persistent" anchor={anchor} open={showFloatTab}>
                <div className="floatTab-container">
                    <FloatTabHeader
                        identify={this.props.identify}
                        handleFloatTabClose={this.props.handleFloatTabClose}
                    />
                    {floatTabType === "edit" && !checkedTab ? (
                        <EditDeviceComp
                            identify={this.props.identify}
                            showFloatTab={this.props.showFloatTab}
                            floatTabType={this.props.floatTabType}
                            handleFloatTabClose={this.props.handleFloatTabClose}
                            selectDeviceIcon={this.props.selectDeviceIcon}
                            selectAppId={this.props.selectAppId}
                            selectAppRespath={this.props.selectAppRespath}
                        />
                    ) : null}
                    {floatTabType === "edit" && checkedTab ? (
                        <EditDeviceTypeComp
                            identify={this.props.identify}
                            showFloatTab={this.props.showFloatTab}
                            handleFloatTabClose={this.props.handleFloatTabClose}
                        />
                    ) : null}
                    {floatTabType === "view" && !checkedTab ? (
                        <OverviewDeviceComp
                            identify={this.props.identify}
                            showFloatTab={this.props.showFloatTab}
                            selectDeviceIcon={this.props.selectDeviceIcon}
                        />
                    ) : null}
                    {floatTabType === "view" && checkedTab ? (
                        <OverviewDevicetypeComp identify={this.props.identify} showFloatTab={this.props.showFloatTab} />
                    ) : null}
                    {floatTabType === "add" && !checkedTab ? (
                        <AddDeviceComp
                            identify={this.props.identify}
                            showFloatTab={this.props.showFloatTab}
                            handleFloatTabClose={this.props.handleFloatTabClose}
                            selectAppId={this.props.selectAppId}
                            selectAppRespath={this.props.selectAppRespath}
                        />
                    ) : null}
                    {floatTabType === "add" && checkedTab ? (
                        <AddDeviceTypeComp
                            identify={this.props.identify}
                            showFloatTab={this.props.showFloatTab}
                            handleFloatTabClose={this.props.handleFloatTabClose}
                        />
                    ) : null}
                    {floatTabType === "subDevice" && !checkedTab ? (
                        <AddDeviceComp
                            identify={this.props.identify}
                            showFloatTab={this.props.showFloatTab}
                            handleFloatTabClose={this.props.handleFloatTabClose}
                            selectDeviceName={this.props.selectDeviceName}
                            selectDeviceId={this.props.selectDeviceId}
                            selectAddressIotId={this.props.selectAddressIotId}
                            selectAddressName={this.props.selectAddressName}
                        />
                    ) : null}
                    {floatTabType === "property" && !checkedTab ? (
                        <EditDevicePropertyComp
                            identify={this.props.identify}
                            showFloatTab={this.props.showFloatTab}
                            handleFloatTabClose={this.props.handleFloatTabClose}
                            selectDeviceName={this.props.selectDeviceName}
                            selectDeviceId={this.props.selectDeviceId}
                            selectAddressIotId={this.props.selectAddressIotId}
                            selectAddressName={this.props.selectAddressName}
                        />
                    ) : null}
                </div>
            </Drawer>
        );
    }
}

FloatTabCont.propTypes = {
    showFloatTab: PropTypes.bool
};

FloatTabCont.defaultProps = {
    showFloatTab: false,
    defaultTab: 0,
    anchor: "right",
    floatTabType: "add",
    checkedTab: 0
};

const filterProps = (state, identify, reducerName, props) => {
    if (state[reducerName] && state[reducerName][identify]) {
        return state[reducerName][identify][props];
    }
};

const mapStateToProps = (state, ownProps) => {
    let identify = ownProps.identify;
    return {
        showFloatTab: filterProps(state, identify, topoReducerName, "showFloatTab"),
        selectDeviceId: filterProps(state, identify, topoReducerName, "selectDeviceId"),
        selectResourcePath: filterProps(state, identify, topoReducerName, "selectResourcePath"),
        selectDeviceName: filterProps(state, identify, topoReducerName, "selectDeviceName"),
        selectAddressIotId: filterProps(state, identify, topoReducerName, "selectAddressIotId"),
        selectAddressName: filterProps(state, identify, topoReducerName, "selectAddressName"),
        selectDeviceIcon: filterProps(state, identify, topoReducerName, "selectDeviceIcon"),
        floatTabType: filterProps(state, identify, topoReducerName, "floatTabType"),
        checkedTab: filterProps(state, identify, topoReducerName, "currentTab"),
        deviceTypeSchema: filterProps(state, identify, topoFloatTabReducer, "deviceTypeSchema"),
        basicTypes: filterProps(state, identify, topoFloatTabReducer, "basicTypes"),
        editRowDataIotId: filterProps(state, identify, topoReducerName, "editRowDataIotId"),
        applicationSchema: filterProps(state, identify, topoFloatTabReducer, "applicationSchema")
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setTopoFloatTab: (deviceId, resourcePath, defaultTab, identify) => {
            dispatch(setTopoFloatTab(deviceId, resourcePath, defaultTab, identify));
        },
        initTopoFloatTab: identify => {
            dispatch(initTopoFloatTab(identify));
        },
        setFloatTabTitle: (identify, title) => {
            dispatch(setFloatTabTitle(identify, title));
        },
        getDeviceTypeSchema: (identify, siteName, schemaType) => {
            dispatch(getDeviceTypeSchema(identify, siteName, schemaType));
        },
        getSysconfigBasicType: (identify, siteName, schemaType) => {
            dispatch(getSysconfigBasicType(identify, siteName, schemaType));
        },
        getTopologySchema: (identify, siteName, schemaType) => {
            dispatch(getTopologySchema(identify, siteName, schemaType));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FloatTabCont);
