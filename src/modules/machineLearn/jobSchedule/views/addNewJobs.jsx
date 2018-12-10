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

import CreateJobs from "./createJobs";
import { connect } from "react-redux";
import { setAddOpenDrawer, setReflashJobSchedule } from "../funcs/actions";
import { REDUCER_NAME } from "../funcs/constants";

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
        height: `calc(${listHeight}% - 130px)`
    }
});

class AddNewJobs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeStep: 0
        };
    }

    toggleDrawer = open => () => {
        let { activeStep } = this.state;
        let currentActiveStep = this.props.activeStep;
        let { pagination } = this.props;
        this.props.onsetAddOpenDrawer(open, activeStep);
        if(currentActiveStep === 4) {
            this.props.onSetReflashJobSchedule(1, pagination.rowsPerpage, pagination.orderBy, pagination.order);
        }
    };

    render() {
        const { classes, anchor, ...other } = this.props;
        return (
            <Drawer
                anchor={anchor}
                open={this.props.showFloatTab}
                variant="persistent"
            >
                <div className={classes.floatTabContainer}>
                    <CardHeader
                        action={
                            <Tooltip title="Close">
                                <IconButton aria-label="Close" onClick={this.toggleDrawer(false)}>
                                    <Icon>clear</Icon>
                                </IconButton>
                            </Tooltip>
                        }
                        title="Add Jobs"
                    />
                    <div className={classes.root}>
                        <CreateJobs {...other} />
                    </div>
                </div>
            </Drawer>
        );
    }
}

AddNewJobs.propTypes = {
    classes: PropTypes.object.isRequired,
    showFloatTab: PropTypes.bool
};

AddNewJobs.defaultProps = {
    showFloatTab: false,
    defaultTab: 0,
    anchor: "right"
};

const mapStateToProps = (state, ownProps) => {
    if (state[REDUCER_NAME].machineLearn) {
        return {
            showFloatTab: state[REDUCER_NAME].machineLearn.isAddOpenDrawer,
            activeStep: state[REDUCER_NAME].machineLearn.activeStep,
            pagination: state[REDUCER_NAME].machineLearn.pagination,
        };
    }
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onsetAddOpenDrawer: (open, activeStep) => {
            dispatch(setAddOpenDrawer(open, activeStep, props.identify));
        },
        onSetReflashJobSchedule: (page, rowsPerPage, orderBy, order) => {
            dispatch(setReflashJobSchedule(page, rowsPerPage, orderBy, order, props.identify));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(AddNewJobs));
