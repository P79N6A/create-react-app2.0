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
import TopoTab from "./topoTab";
import { setTopoFloatTab, initTopoFloatTab } from "../funcs/actions";
import { reducerName as topoGraphReducerName } from "modules/topologyTreeAndGraph/topologyGraph";
import { reducerName as topoTreeGraphReducerName } from "modules/topologyTreeAndGraph/topologyCont";
import FloatTabHeader from "./floatTabHeader";

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
    componentDidMount() {
        this.identify = this.props.identify;
        this.props.initTopoFloatTab(this.identify);
    }
    componentWillReceiveProps(nextProps) {
        let deviceId = nextProps.selectDeviceId;
        let resourcePath = nextProps.selectResourcePath;
        this.props.setTopoFloatTab(deviceId, resourcePath, nextProps.defaultTab, this.props.identify);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (
            this.props.showFloatTab !== nextProps.showFloatTab ||
            this.props.selectDeviceId !== nextProps.selectDeviceId
        ) {
            return true;
        } else {
            return false;
        }
    }

    render() {
        const { classes } = this.props;
        let { anchor } = this.props;

        return (
            <Drawer
                variant="persistent"
                anchor={anchor}
                open={this.props.showFloatTab}
                classes={{
                    paper: classes.paper
                }}
            >
                <div className="floatTab-container">
                    <FloatTabHeader
                        identify={this.props.identify}
                        handleFloatTabClose={this.props.handleFloatTabClose}
                    />
                    <TopoTab {...this.props} />
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
        showFloatTab: filterProps(state, identify, topoTreeGraphReducerName, "showFloatTab"),
        selectDeviceId: filterProps(state, identify, topoGraphReducerName, "selectDeviceId"),
        selectResourcePath: filterProps(state, identify, topoGraphReducerName, "selectResourcePath"),
        selectDeviceName: filterProps(state, identify, topoGraphReducerName, "selectDeviceName")
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setTopoFloatTab: (deviceId, resourcePath, defaultTab, identify) => {
            dispatch(setTopoFloatTab(deviceId, resourcePath, defaultTab, identify));
        },
        initTopoFloatTab: identify => {
            dispatch(initTopoFloatTab(identify));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(FloatTabCont));
