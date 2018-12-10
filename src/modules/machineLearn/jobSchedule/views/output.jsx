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
import FormControl from "@material-ui/core/FormControl";
import { InputLabel, Button, Input } from "modules/common";
import { connect } from "react-redux";
import { setOutput, setHandleBack } from "../funcs/actions";
import { REDUCER_NAME } from "../funcs/constants";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = theme => ({
    container: {
        display: "flex",
        flexWrap: "wrap",
        width: "100%"
    },
    formControl: {
        marginLeft: theme.spacing.unit * 4,
        width: "44%",
        marginBottom: 16,
        display: "inline-block"
    },
    textError: {
        color: "#f44336"
    },
    button: {
        marginRight: theme.spacing.unit
    },
    mergeButton: {
        position: "fixed",
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 4
    },
    Veritify: {
        marginRight: theme.spacing.unit * 37
    }
});
let deviceTypeValue = [];
class Output extends React.Component {
    constructor(props) {
        super(props);
        let { output } = this.props;
        let flag = Boolean(Object.keys(output).length);
        this.state = {
            deviceType: flag ? output.deviceType : [],
            modelAPIOutput: flag ? output.modelAPIOutput : [],
            activeStep: this.props.activeStep,
            Verify: false
        };
    }

    componentDidUpdate = prevProps => {
        if (prevProps.isAddOpenDrawer !== this.props.isAddOpenDrawer) {
            let flag = Boolean(Object.keys(this.props.basicInfo).length);
            let { output } = this.props;
            this.setState({
                deviceType: flag ? output.deviceType : [],
                modelAPIOutput: flag ? output.modelAPIOutput : []
            });
        }
    };

    // handleChange = name => event => {
    //     let value = event.target.value;
    //     this.setState({ [name]: value });

    //     let flag = `${name}Flag`;

    //     let reg = /[\w]{4,50}/;
    //     if (value && reg.test(value)) {
    //         this.setState({ [flag]: false });
    //     } else {
    //         this.setState({ [flag]: true });
    //     }
    // };

    handleNext = () => {
        let modelAPIOutput = this.props.modelInputOutputParameters["output1"];
        let activeStep = this.state.activeStep + 1;
        if(modelAPIOutput.length > deviceTypeValue.length) {
            modelAPIOutput.splice(deviceTypeValue.length);
        }
        this.props.onSetOutput(modelAPIOutput, deviceTypeValue, activeStep);
    };

    handleBack = () => {
        let activeStep = this.state.activeStep - 1;
        this.props.onSetHandleBack(activeStep);
    };

    handleVerify = () => {
        this.setState({
            Verify: true
        });
    };

    render() {
        const { classes, refreshSuccess, modelInputOutputParameters, deviceNameTypeValue } = this.props;
        const { deviceType, modelAPIOutput, activeStep, Verify } = this.state;
        let VerifyJudge = Boolean(Boolean(modelAPIOutput.length === 0) || Boolean(deviceType.length === 0));
        let configTypeValuename = "";
        return (
            <div className={classes.container}>
                {!refreshSuccess ? (
                    <div className="progress-drawer">
                        <CircularProgress color="secondary" />
                    </div>
                ) : (
                    deviceNameTypeValue &&
                    deviceNameTypeValue.map(items => {
                        configTypeValuename = items.configvalname;
                        return (
                            items &&
                            items.configval &&
                            JSON.parse(items.configval)[configTypeValuename] &&
                            JSON.parse(items.configval)[configTypeValuename].basicTypeInstances.map((item, index) => {
                                deviceTypeValue = JSON.parse(items.configval)[configTypeValuename].basicTypeInstances;
                                return (
                                    <div
                                        key={index}
                                        style={{
                                            width: "100%",
                                            height: "100%"
                                        }}
                                    >
                                        <FormControl className={classes.formControl}>
                                            <InputLabel>Device Type Parameters</InputLabel>
                                            <Input
                                                type="text"
                                                value={Object.keys(item)[0]}
                                                readOnly
                                                style={{ width: "95%" }}
                                            />
                                        </FormControl>

                                        {modelInputOutputParameters &&
                                            modelInputOutputParameters["output1"] &&
                                            modelInputOutputParameters["output1"].map((outputItem, outputIndex) =>
                                                outputIndex === index ? (
                                                    <FormControl className={classes.formControl}>
                                                        <InputLabel>Model API Output</InputLabel>
                                                        <Input
                                                            key={outputIndex}
                                                            type="text"
                                                            value={outputItem}
                                                            readOnly
                                                            style={{ width: "95%" }}
                                                        />
                                                    </FormControl>
                                                ) : null
                                            )}
                                    </div>
                                );
                            })
                        );
                    })
                )}
                <div className={classes.mergeButton}>
                    <Button
                        variant="contained"
                        disabled={VerifyJudge || Verify}
                        className={classes.Veritify}
                        color="secondary"
                        onClick={this.handleVerify}
                    >
                        Verify
                    </Button>
                    <Button disabled={!activeStep === 2} className={classes.button} onClick={this.handleBack}>
                        Back
                    </Button>

                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={this.handleNext}
                        className={classes.button}
                        disabled={false}
                    >
                        next
                    </Button>
                </div>
            </div>
        );
    }
}

Output.propTypes = {
    classes: PropTypes.object.isRequired
};

Output.defaultProps = {
    output: {},
    refreshSuccess: false,
    modelInputOutputParameters: {},
    deviceNameTypeValue: []
};

const mapStateToProps = (state, ownProps) => {
    if (state[REDUCER_NAME] && state[REDUCER_NAME].machineLearn) {
        return {
            activeStep: state[REDUCER_NAME].machineLearn.activeStep,
            output: state[REDUCER_NAME].machineLearn.output,
            refreshSuccess: state[REDUCER_NAME].machineLearn.refreshSuccess,
            deviceNameTypeValue: state[REDUCER_NAME].machineLearn.deviceTypeValue || [],
            modelInputOutputParameters: state[REDUCER_NAME].machineLearn.modelInputOutputParameters || {}
        };
    }
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onSetOutput: (modelAPIOutput, deviceType, activeStep) => {
            dispatch(setOutput(modelAPIOutput, deviceType, activeStep, props.identify));
        },
        onSetHandleBack: activeStep => {
            dispatch(setHandleBack(activeStep, props.identify));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(Output));
