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
import { InputLabel, Button, Select, Input } from "modules/common";
import MenuItem from "@material-ui/core/MenuItem";

import { connect } from "react-redux";
import { setSourceMessage, setHandleBack, setModelInputOutputParameters, setModelPredictionDesOut } from "../funcs/actions";
import { REDUCER_NAME } from "../funcs/constants";
import CircularProgress from "@material-ui/core/CircularProgress";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP
        }
    }
};

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
class SourceMessage extends React.Component {
    constructor(props) {
        super(props);
        let { sourceMessage } = this.props;
        let flag = Boolean(Object.keys(sourceMessage).length);
        this.state = {
            modelAPIInput: flag ? sourceMessage.modelAPIInput : [],
            deviceType: flag ? sourceMessage.deviceType : [],
            deviceTypeParameters: [],
            activeStep: this.props.activeStep,
            deviceTypeValueDefault: [],
            Verify: false
        };
    }

    componentDidUpdate = prevProps => {
        if (prevProps.isAddOpenDrawer !== this.props.isAddOpenDrawer) {
            let flag = Boolean(Object.keys(this.props.sourceMessage).length);
            let { sourceMessage } = this.props;
            this.setState({
                modelAPIInput: flag ? sourceMessage.modelAPIInput : [],
                deviceType: flag ? sourceMessage.deviceType : []
            });
        }
    };

    componentDidMount() {
        const { chooseModelId, deviceTypeValue } = this.props;

        this.props.onSetModelInputOutputParameters(chooseModelId);

        let deviceTypeInputValue = [];
        for (let i = 0; i < deviceTypeValue.length; i++) {
            deviceTypeInputValue.push(deviceTypeValue[i].split("-")[0]);
        }

        this.setState({
            deviceTypeParameters: deviceTypeInputValue
        });
    }

    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(this.props.sourceMessage) === "{}" && nextProps.modelInputOutputParameters && JSON.stringify(nextProps.modelInputOutputParameters) !== "{}") {
            let modelAPIInput = nextProps.modelInputOutputParameters["input1"];
            let deviceTypeArray = this.state.deviceType;
            for (let i = 0; i < modelAPIInput.length; i++) {
                deviceTypeArray[i] = {};
            }
            this.setState({
                modelAPIInput,
                deviceType: deviceTypeArray
            });
        }

        if(JSON.stringify(this.props.basicInfo) !== "{}" && nextProps.basicInfo && nextProps.basicInfo.deviceTypeValue) {
            this.setState({
                deviceTypeValueDefault: nextProps.basicInfo.deviceTypeValue
            });
        }
    }

    handleBack = () => {
        let activeStep = this.state.activeStep - 1;
        this.props.onSetHandleBack(activeStep);
    };

    handleChange = name => event => {
        let value = event.target.value;
        let deviceTypeArray = this.state.deviceType;
        let deviceTypeValueNumber = name.split("-")[1];
        for (let i = 0; i < deviceTypeArray.length; i++) {
            if (deviceTypeValueNumber === i.toString()) {
                deviceTypeArray.splice(i, 1, { [name]: value });
            }
        }
        this.setState({ [name]: value, deviceType: deviceTypeArray });
    };

    handleNext = () => {
        let { modelAPIInput, deviceType } = this.state;
        const { chooseModelId } = this.props;
        let activeStep = this.state.activeStep + 1;
        this.props.onSetSourceMessage(modelAPIInput, deviceType, chooseModelId, activeStep);

        //get modelId correspond information
        this.props.onSetModelPredictionDesOut(chooseModelId);
    };

    render() {
        const { classes, activeStep, modelInputOutputParameters, refreshSuccess, sourceMessage } = this.props;
        const { deviceTypeParameters, deviceType } = this.state;
        let pass = false;
        let deviceTypeIndex = "";
        return (
            <div className={classes.container}>
                {!refreshSuccess ? (
                    <div className="progress-drawer">
                        <CircularProgress color="secondary" />
                    </div>
                ) : (
                    modelInputOutputParameters &&
                    modelInputOutputParameters["input1"] &&
                    modelInputOutputParameters["input1"].map((items, indexs) => {
                        deviceTypeIndex = "deviceType-" + indexs;
                        if (this.state[deviceTypeIndex]) {
                            pass = true;
                        }
                        return (
                            <div
                                key={indexs}
                                style={{
                                    width: "100%",
                                    height: "100%"
                                }}
                            >
                                <FormControl className={classes.formControl}>
                                    <InputLabel>Model API Input</InputLabel>
                                    <Input type="text" value={items} readOnly style={{ width: "95%" }} />
                                </FormControl>

                                <FormControl className={classes.formControl}>
                                    <InputLabel
                                        style={{
                                            width: "95%"
                                        }}
                                    >
                                        {/* Device Type Parameters */}
                                    </InputLabel>
                                    <Select
                                        value={
                                            deviceType[indexs] === undefined ||
                                            JSON.stringify(deviceType[indexs]) === "{}"
                                                ? this.state[deviceTypeIndex]
                                                : deviceType[indexs][deviceTypeIndex]
                                        }
                                        onChange={this.handleChange("deviceType-" + indexs)}
                                        displayEmpty
                                        name={"deviceType-" + indexs}
                                        MenuProps={MenuProps}
                                        style={{
                                            width: "95%"
                                        }}
                                    >
                                        {deviceTypeParameters &&
                                            deviceTypeParameters.map((item, index) => {
                                                return (
                                                    <MenuItem value={item} key={index}>
                                                        {item}
                                                    </MenuItem>
                                                );
                                            })}
                                    </Select>
                                </FormControl>
                            </div>
                        );
                    })
                )}
                <div className={classes.mergeButton}>
                    
                    <Button disabled={!activeStep === 1} className={classes.button} onClick={this.handleBack}>
                        Back
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={this.handleNext}
                        className={classes.button}
                        disabled={
                            JSON.stringify(sourceMessage) === "{}"
                                ? !pass || !Boolean(this.state[deviceTypeIndex])
                                : false
                        }
                    >
                        next
                    </Button>
                </div>
            </div>
        );
    }
}

SourceMessage.propTypes = {
    classes: PropTypes.object.isRequired
};

SourceMessage.defaultProps = {
    basicInfo: {},
    sourceMessage: {},
    refreshSuccess: false,
    modelInputOutputParameters: {}
};

const mapStateToProps = (state, ownProps) => {
    if (state[REDUCER_NAME] && state[REDUCER_NAME].machineLearn) {
        return {
            activeStep: state[REDUCER_NAME].machineLearn.activeStep,
            refreshSuccess: state[REDUCER_NAME].machineLearn.refreshSuccess,
            basicInfo: state[REDUCER_NAME].machineLearn.basicInfo || {},
            sourceMessage: state[REDUCER_NAME].machineLearn.sourceMessage || {},
            chooseModelId: state[REDUCER_NAME].machineLearn.basicInfo.chooseModel,
            deviceTypeValue: state[REDUCER_NAME].machineLearn.basicInfo.deviceTypeValue,
            modelInputOutputParameters: state[REDUCER_NAME].machineLearn.modelInputOutputParameters || {}
        };
    }
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onSetSourceMessage: (modelAPIInput, deviceType, chooseModelId, activeStep) => {
            dispatch(setSourceMessage(modelAPIInput, deviceType, chooseModelId, activeStep, props.identify));
        },
        onSetModelInputOutputParameters: modelId => {
            dispatch(setModelInputOutputParameters(modelId, props.identify));
        },
        onSetModelPredictionDesOut: modelId => {
            dispatch(setModelPredictionDesOut(modelId, props.identify));
        },
        onSetHandleBack: activeStep => {
            dispatch(setHandleBack(activeStep, props.identify));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(SourceMessage));
