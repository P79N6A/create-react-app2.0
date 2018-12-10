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
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
// import TopoTab from "./topoTab";
import { setTopoFloatTab, initTopoFloatTab, setFloatTabTitle, getTopologySchema } from "../funcs/actions";
import { reducerName as topoReducerName } from "modules/application/applicationGrid";
import { REDUCER_NAME as topoFloatTabReducer } from "../funcs/constants";
import { reducerName as appTreeReducer } from "modules/application/topologyTree";
import FloatTabHeader from "./floatTabHeader";
import AddApplicationComp from "./application-add";
import EditApplicationComp from "./application-edit";
import ViewApplicationComp from "./application-view";
import ViewDeviceComp from "./application-viewDevice";
import { ISC_ACCOUNT_INFO } from "commons/constants/const";
import _ from "lodash";

const drawerWidth = 400;
const styles = theme => ({
    paper: {
        position: "absolute",
        width: drawerWidth,
        height: "100%",
        transform: `translate(${drawerWidth}px, 0px)`,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    }
});

class FloatTabCont extends React.Component {
    siteName = sessionStorage.getItem(ISC_ACCOUNT_INFO) && JSON.parse(sessionStorage.getItem(ISC_ACCOUNT_INFO)).displayname;

    init(props) {
        const { identify, applicationSchema, deviceSchema, getTopologySchema, floatTabType } = props;
        const deviceTypeSchema = props["device-typesSchema"];
        let currentTitle = floatTabType === "view" ? "Overview" : floatTabType === "add" ? "Add" : "Edit";
        props.setFloatTabTitle(identify, currentTitle);
        !applicationSchema && getTopologySchema(props.identify, this.siteName, "application");
        !deviceSchema && getTopologySchema(props.identify, this.siteName, "device");
        !deviceTypeSchema && getTopologySchema(props.identify, this.siteName, "device-types");
        // this.props.getSysconfigBasicType(this.props.identify, this.siteName, "basicTypes");
    }

    componentDidMount() {
        this.identify = this.props.identify;
        this.props.initTopoFloatTab(this.identify);
        this.init(this.props);
    }

    componentWillReceiveProps(nextProps) {
        let deviceId = nextProps.selectDeviceId;
        let resourcePath = nextProps.selectResourcePath;
        this.props.setTopoFloatTab(deviceId, resourcePath, nextProps.defaultTab, this.props.identify);
        this.init(nextProps);
    }

    shouldComponentUpdate(nextProps, nextState) {
        const { showFloatTab, selectApplicationId, selectedData } = nextProps;
        if (
            _.isEqual(showFloatTab, this.props.showFloatTab) &&
            _.isEqual(selectApplicationId, this.props.selectApplicationId) &&
            _.isEqual(selectedData, this.props.selectedData)
        ) {
            return false;
        } else {
            return true;
        }
    }

    render() {
        const { floatTabType, selectedData, anchor, selectResourcePath } = this.props;
        const appList = ["application", "address"];
        return (
            <Drawer
                // variant="persistent"
                // anchor={anchor}
                // open={this.props.showFloatTab}
                // classes={{
                //     paper: classes.paper
                // }}
                variant="persistent"
                anchor={anchor}
                open={this.props.showFloatTab}
            >
                <div className="floatTab-container">
                    <FloatTabHeader
                        identify={this.props.identify}
                        handleFloatTabClose={this.props.handleFloatTabClose}
                    />
                    {/* <TopoTab {...this.props} /> */}
                    {floatTabType === "add" && (
                        <AddApplicationComp
                            selectedData={selectedData}
                            identify={this.props.identify}
                            showFloatTab={this.props.showFloatTab}
                            handleFloatTabClose={this.props.handleFloatTabClose}
                        />
                    )}
                    {floatTabType === "edit" && (
                        <EditApplicationComp
                            applicationType={selectResourcePath}
                            selectApplicationId={this.props.selectApplicationId}
                            identify={this.props.identify}
                            showFloatTab={this.props.showFloatTab}
                            handleFloatTabClose={this.props.handleFloatTabClose}
                        />
                    )}
                    {floatTabType === "view" &&
                        appList.indexOf(selectResourcePath) > -1 && (
                            <ViewApplicationComp
                                selectApplicationId={this.props.selectApplicationId}
                                applicationType={selectResourcePath}
                                identify={this.props.identify}
                                showFloatTab={this.props.showFloatTab}
                                handleFloatTabClose={this.props.handleFloatTabClose}
                            />
                        )}
                    {floatTabType === "view" &&
                        selectResourcePath === "device" && (
                            <ViewDeviceComp
                                selectDeviceId={this.props.selectApplicationId}
                                applicationType={selectResourcePath}
                                identify={this.props.identify}
                                showFloatTab={this.props.showFloatTab}
                                handleFloatTabClose={this.props.handleFloatTabClose}
                            />
                        )}
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
    anchor: "right"
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
        selectApplicationId: filterProps(state, identify, topoReducerName, "selectApplicationId"),
        floatTabType: filterProps(state, identify, topoReducerName, "floatTabType"),
        selectResourcePath: filterProps(state, identify, topoReducerName, "selectResourcePath"),
        selectDeviceName: filterProps(state, identify, topoReducerName, "selectDeviceName"),
        applicationSchema: filterProps(state, identify, topoFloatTabReducer, "applicationSchema"),
        deviceSchema: filterProps(state, identify, topoFloatTabReducer, "deviceSchema"),
        selectedData: filterProps(state, identify, appTreeReducer, "selectedNode")
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
        getTopologySchema: (identify, siteName, schemaType) => {
            dispatch(getTopologySchema(identify, siteName, schemaType));
        }
        // getDeviceSchema: (identify, siteName, schemaType) => {
        //     dispatch(getDeviceSchema(identify, siteName, schemaType));
        // }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(FloatTabCont));
