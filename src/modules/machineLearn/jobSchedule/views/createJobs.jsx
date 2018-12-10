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
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import { StepLabel } from "modules/common";

import BasicInfo from "./basicInfo.jsx";
import SourceMessage from "./sourceMessage";
//import Output from "./output";
import EngineInfo from "./engineInfo";
import Other from "./other";
import JobSuccess from "./jobSuccess";

import { connect } from "react-redux";
import { REDUCER_NAME } from "../funcs/constants";

const listHeight = 100;
const styles = theme => ({
    root: {
        width: "100%",
        height: "100%"
    },
    instructions: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit
    },
    wrap: {
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "auto",
        maxHeight: `calc(${listHeight}% - 120px)`
    }
});

function getSteps() {
    return ["Basic Info", "Input", "Engine Info", "Other"];
}

class CreateJobs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { classes, activeStep, ...other } = this.props;
        const steps = getSteps();

        return (
            <div className={classes.root}>
                <Stepper activeStep={activeStep} nonLinear alternativeLabel>
                    {steps.map(label => {
                        const props = {};
                        const labelProps = {};
                        return (
                            <Step key={label} {...props}>
                                <StepLabel {...labelProps}>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>

                <div className={classes.wrap}>
                    {activeStep === 0 ? (
                        <BasicInfo {...other} />
                    ) : activeStep === 1 ? (
                        <SourceMessage {...other} />
                    ) : activeStep === 2 ? (
                        <EngineInfo {...other} />
                    ) : activeStep === 3 ? (
                        <Other {...other} />
                    ) : (
                        <JobSuccess {...other} />
                    )}
                </div>
            </div>
        );
    }
}

CreateJobs.propTypes = {
    classes: PropTypes.object
};

CreateJobs.defaultProps = {
    activeStep: 0
};

const mapStateToProps = (state, ownProps) => {
    if (state[REDUCER_NAME] && state[REDUCER_NAME].machineLearn) {
        return {
            activeStep: state[REDUCER_NAME].machineLearn.activeStep
        };
    }
};

export default connect(
    mapStateToProps,
    null
)(withStyles(styles)(CreateJobs));
