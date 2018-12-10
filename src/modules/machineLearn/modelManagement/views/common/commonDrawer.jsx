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
 * Created by HuLin on 03/08/2018.
 */

import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import { Drawer } from "modules/common";
import CardHeader from "@material-ui/core/CardHeader";
import Icon from "@material-ui/core/Icon";
import Tooltip from "@material-ui/core/Tooltip";
import { connect } from "react-redux";
import { setOpenDrawer } from "../../funcs/actions";
import { REDUCER_NAME } from "../../funcs/constants";

import ModelDetails from "./modelDetails";

const listHeight = 100;
const styles = theme => ({
    floatTabContainer: {
        width: "100%",
        height: "100%",
        overFlow: "hidden"
    },
    root: {
        width: "100%",
        backgroundColor: theme.palette.background.paper,
        position: "relative",
        height: `calc(${listHeight}% - 130px)`
    }
});

class CommonDrawer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    toggleDrawer = () => {
        this.props.onSetOpenDrawer(false);
    };

    render() {
        const { classes, identify, anchor, ...other } = this.props;
        return (
            <Drawer
                anchor={ anchor }
                open={this.props.isOpenDrawer}
                variant="persistent"
            >
                <div className={classes.floatTabContainer}>
                    <CardHeader
                        action={
                            <Tooltip title="Close">
                                <IconButton onClick={this.toggleDrawer}>
                                    <Icon>clear</Icon>
                                </IconButton>
                            </Tooltip>
                        }
                        title={
                            identify === "compute"
                                ? "Compute Overview"
                                : identify === "model"
                                    ? "Model Overview"
                                    : identify === "images"
                                        ? "Images Overview"
                                        : identify === "deployments"
                                            ? "Deployments Overview"
                                            : identify === "activities"
                                                ? "Activities Overview"
                                                : null
                        }
                    />
                    <div className={ classes.root }>
                        {
                            identify === "model" ? (
                                <ModelDetails {...other} />
                            ) : null
                        }
                    </div>
                </div>
            </Drawer>
        );
    }
}

CommonDrawer.propTypes = {
    classes: PropTypes.object.isRequired
};

CommonDrawer.defaultProps = {
    defaultTab: 0,
    anchor: "right",
    isOpenDrawer: false
};

const mapStateToProps = (state, ownProps) => {
    if (state[REDUCER_NAME]) {
        return {
            isOpenDrawer: state[REDUCER_NAME].isOpenDrawer
        };
    }
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onSetOpenDrawer: open => {
            dispatch(setOpenDrawer(open, props.identify));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(CommonDrawer));
