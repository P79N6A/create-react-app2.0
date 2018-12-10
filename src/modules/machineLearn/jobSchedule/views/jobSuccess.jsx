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
import "../styles/style.less";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Button } from "modules/common";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import { setHandleBack, setAddOpenDrawer, setReflashJobSchedule } from "../funcs/actions";
import { REDUCER_NAME } from "../funcs/constants";

const styles = theme => ({
    container: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center"
    },
    button: {
        marginRight: theme.spacing.unit
    },
    mergeButton: {
        position: "fixed",
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 4
    },
    title: {
        marginLeft: theme.spacing.unit * 4,
        textAlign: "center"
    }
});

class JobSuccess extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeStep: this.props.activeStep
        };
    }

    handleBack = () => {
        let activeStep = this.state.activeStep - 1;
        this.props.onSetHandleBack(activeStep);
    };

    handleSave = () => {
        let { activeStep } = this.state;
        let { pagination } = this.props;
        this.props.onsetAddOpenDrawer(false, activeStep);
        //refresh data processing
        this.props.onSetReflashJobSchedule(1, pagination.rowsPerpage, pagination.orderBy, pagination.order);
    };

    render() {
        const { classes, refreshDrawerSuccesss, createResult } = this.props;
        return (
            <div className={classes.container}>
                {!refreshDrawerSuccesss ? (
                    <div className={classes.title}>
                        <Typography>Model verification in progress. This may take a few minutes</Typography>

                        <div className="progress-drawer">
                            <CircularProgress color="secondary" />
                        </div>
                    </div>
                ) : null}

                {refreshDrawerSuccesss === true ? (
                    createResult ? (
                        <div className={classes.title}>
                            <Typography variant="h5">Success</Typography>
                            <Typography>Model verification completed.</Typography>
                        </div>
                    ) : (
                        <div className={classes.title}>
                            <Typography variant="h5">Error</Typography>
                            <Typography>
                                For singleton mode, there is task running, only one running task can exist in system,
                                please cancel old one, then trigger a new one. Data source selected does not match
                                Model’s expected input. Please return to the previous page to rectify the error, or
                                contact your administrator for help.
                            </Typography>
                        </div>
                    )
                ) : null}

                <div className={classes.mergeButton}>
                    <Button
                        disabled={refreshDrawerSuccesss === true ? createResult : true}
                        className={classes.button}
                        onClick={this.handleBack}
                    >
                        Back
                    </Button>

                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={this.handleSave}
                        className={classes.button}
                        disabled={!createResult}
                    >
                        Save
                    </Button>
                </div>
            </div>
        );
    }
}

JobSuccess.propTypes = {
    classes: PropTypes.object.isRequired
};

JobSuccess.defaultProps = {
    createResult: false,
    refreshDrawerSuccesss: false
};

const mapStateToProps = (state, ownProps) => {
    if (state[REDUCER_NAME] && state[REDUCER_NAME].machineLearn) {
        return {
            activeStep: state[REDUCER_NAME].machineLearn.activeStep,
            refreshDrawerSuccesss: state[REDUCER_NAME].machineLearn.refreshDrawerSuccesss,
            createResult: state[REDUCER_NAME].machineLearn.createResult,
            pagination: state[REDUCER_NAME].machineLearn.pagination
        };
    }
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onSetHandleBack: activeStep => {
            dispatch(setHandleBack(activeStep, props.identify));
        },
        onsetAddOpenDrawer: (open, activeStep) => {
            dispatch(setAddOpenDrawer(open, activeStep, props.identify));
        },
        onSetReflashJobSchedule: (page, rowsPerpage, orderBy, order) => {
            dispatch(setReflashJobSchedule(page, rowsPerpage, orderBy, order, props.identify));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(JobSuccess));
