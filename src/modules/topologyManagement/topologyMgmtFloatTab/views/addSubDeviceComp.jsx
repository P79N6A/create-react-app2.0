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
import "../styles/style.less";
import { connect } from "react-redux";
import CardContent from "@material-ui/core/Card";
import { withStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import { StepLabel } from "modules/common";
import Button from "@material-ui/core/Button";
import AddDeviceStepperCont from "./addDeviceStepperCont";
import { addNewDevice, changeAvtiveStep } from "../funcs/actions";
import { REDUCER_NAME as topoFloatTabReducer } from "../funcs/constants";
import { reducerName as topoReducerName } from "modules/topologyManagement/topologyMgmtGrid";
import _ from "lodash";

const styles = theme => ({
    root: { backgroundColor: theme.palette.background.paper },
    button: {
        color: theme.palette.secondary.main,
        margin: "0px " + theme.spacing.unit + "px"
    },
    footer: {
        margin: theme.spacing.unit * 0.5 + "px " + theme.spacing.unit + "px",
        textAlign: "right"
    }
});

class AddDeviceComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeStep: this.props.activeStep,
            shouldNext: this.props.shouldNext
        };
        this.validateCheck = [];
    }
    componentDidMount() {}

    componentWillReceiveProps(nextProps) {
        if (this.props.showFloatTab !== nextProps.showFloatTab && nextProps.showFloatTab) {
            this.setState(
                Object.assign(this.state, {
                    shouldNext: true
                })
            );
        }
        // go to next step
        if (this.props.activeStep !== nextProps.activeStep) {
            let sysconfigDeviceSchema = nextProps.sysconfigDeviceSchema;
            let sysconfigDevicePropertySchema = nextProps.sysconfigDevicePropertySchema;
            let allKeys = {};
            _.forEach(sysconfigDeviceSchema, schema => {
                for (let key in schema) {
                    allKeys[key] = "";
                }
            });
            _.forEach(sysconfigDevicePropertySchema, schema => {
                for (let key in schema) {
                    allKeys[key] = "";
                }
            });
            this.setState(
                Object.assign(
                    this.state,
                    {
                        activeStep: nextProps.activeStep,
                        shouldNext: nextProps.activeStep ? true : false
                    },
                    allKeys
                )
            );
        }
        // able go to next step when select device type
        if (this.props.selectDevicetype !== nextProps.selectDevicetype && nextProps.selectDevicetype) {
            this.setState(
                Object.assign(this.state, {
                    shouldNext: false
                })
            );
        }
        // close float tab when add device success
        if (this.props.addDeviceSuccess !== nextProps.addDeviceSuccess && nextProps.addDeviceSuccess) {
            this.props.handleFloatTabClose();
        }
    }

    liveSearchSelectFunc(schemaKey, iotId) {
        this.setState(
            Object.assign(this.state, {
                [schemaKey]: iotId
            })
        );
        this.checkValidate();
    }

    inputSelectChangedFunc(schemaKey, value, validateFlag) {
        this.setState(
            Object.assign(this.state, {
                [schemaKey]: value
            })
        );

        if (!validateFlag) {
            let validateCheck = this.validateCheck.slice(0);
            let findFlag = false;
            for (let i = 0; i < validateCheck.length; i++) {
                if (validateCheck[i].indexOf(schemaKey) !== -1) {
                    findFlag = true;
                }
            }
            if (!findFlag) {
                this.validateCheck.push(schemaKey);
            }
        } else {
            let validateCheck = this.validateCheck.slice(0);
            for (let i = 0; i < validateCheck.length; i++) {
                if (validateCheck[i].indexOf(schemaKey) !== -1) {
                    this.validateCheck.splice(i, 1);
                }
            }
        }

        this.checkValidate();
    }

    handleLocationChangedFunc(schemaKey, locationId) {
        this.setState(
            Object.assign(this.state, {
                [schemaKey]: locationId
            })
        );
        this.checkValidate();
    }

    checkValidate() {
        if (this.props.sysconfigDeviceSchema) {
            let sysconfigDeviceSchema = this.props.sysconfigDeviceSchema;
            let sysconfigDevicePropertySchema = this.props.sysconfigDevicePropertySchema;
            let allRequiredKeys = [];
            _.forEach(sysconfigDeviceSchema, schema => {
                for (let key in schema) {
                    if (schema[key].mandatory) {
                        allRequiredKeys.push(key);
                    }
                }
            });
            _.forEach(sysconfigDevicePropertySchema, schema => {
                for (let key in schema) {
                    if (schema[key].mandatory) {
                        allRequiredKeys.push(key);
                    }
                }
            });

            let isValidate = true;
            _.forEach(allRequiredKeys, key => {
                if (!this.state[key]) {
                    isValidate = false;
                }
            });

            if (isValidate && !this.validateCheck.length) {
                this.setState(
                    Object.assign(this.state, {
                        shouldNext: !isValidate
                    })
                );
            } else {
                this.setState(
                    Object.assign(this.state, {
                        shouldNext: true
                    })
                );
            }
        }
    }

    handleStepperNext = () => {
        const { activeStep } = this.state;

        if (activeStep === this.props.steps.length - 1) {
            let sysconfigDevicePropertySchema = this.props.sysconfigDevicePropertySchema;
            let properties = {};
            _.forEach(sysconfigDevicePropertySchema, schema => {
                for (let key in schema) {
                    properties[key] = this.state[key];
                }
            });
            console.log(this.state.devicemgmttype, this.state.realworldresintsystname, this.state.realworldresintname);
            this.props.addNewDevice(
                this.props.identify,
                this.props.devicetypeId,
                this.state.devicename,
                this.state.devicedisplayname,
                this.state.deviceapplication,
                this.state.devicelocation,
                properties
            );
            this.setState(
                Object.assign(this.state, {
                    shouldNext: true
                })
            );
        } else {
            this.props.changeAvtiveStep(this.props.identify, this.state.activeStep + 1);
        }
    };

    handleStepperBack = () => {
        const { activeStep } = this.state;
        this.props.changeAvtiveStep(this.props.identify, activeStep - 1);
    };

    isStepOptional = step => {
        return step === 1;
    };

    render() {
        const { activeStep, shouldNext } = this.state;
        const { classes, steps } = this.props;
        return (
            <CardContent className="topo-add-device">
                <div className="topo-stepper">
                    <Stepper activeStep={activeStep}>
                        {steps.map((label, index) => {
                            const props = {};
                            const labelProps = {};
                            if (this.isStepOptional(index)) {
                                labelProps.optional = null;
                            }
                            return (
                                <Step key={label} {...props}>
                                    <StepLabel className={classes.StepLabel} {...labelProps}>
                                        {label}
                                    </StepLabel>
                                </Step>
                            );
                        })}
                    </Stepper>
                    <AddDeviceStepperCont
                        identify={this.props.identify}
                        activeStep={activeStep}
                        showFloatTab={this.props.showFloatTab}
                        liveSearchSelectFunc={this.liveSearchSelectFunc.bind(this)}
                        inputSelectChangedFunc={this.inputSelectChangedFunc.bind(this)}
                        handleLocationChangedFunc={this.handleLocationChangedFunc.bind(this)}
                        handleFloatTabClose={this.props.handleFloatTabClose} 
                    />
                    <div className="stepper-footer">
                        <Button
                            variant="contained"
                            onClick={this.handleStepperNext.bind(this)}
                            disabled={shouldNext}
                            color="secondary"
                        >
                            {activeStep === steps.length - 1 ? "Finish" : "Next"}
                        </Button>
                        <Button
                            disabled={activeStep === 0}
                            onClick={this.handleStepperBack.bind(this)}
                            className={classes.button}
                        >
                            Back
                        </Button>
                    </div>
                </div>
            </CardContent>
        );
    }
}

AddDeviceComp.propTypes = {};

AddDeviceComp.defaultProps = {
    steps: ["Select Device Type", "Enter Device Information"],
    activeStep: 0,
    shouldNext: true
};

const filterProps = (state, identify, reducerName, props) => {
    if (state[reducerName] && state[reducerName][identify]) {
        return state[reducerName][identify][props];
    }
};

const mapStateToProps = (state, ownProps) => {
    let identify = ownProps.identify;
    return {
        selectDevicetype: filterProps(state, identify, topoFloatTabReducer, "selectDevicetype"),
        devicetypeId: filterProps(state, identify, topoFloatTabReducer, "devicetypeId"),
        addDeviceSuccess: filterProps(state, identify, topoFloatTabReducer, "addDeviceSuccess"),
        activeStep: filterProps(state, identify, topoFloatTabReducer, "activeStep"),
        sysconfigDevicetypeDetail: filterProps(state, identify, topoFloatTabReducer, "sysconfigDevicetypeDetail"),
        sysconfigDeviceSchema: filterProps(state, identify, topoReducerName, "sysconfigDeviceSchema"),
        sysconfigDevicePropertySchema: filterProps(state, identify, topoReducerName, "sysconfigDevicePropertySchema")
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeAvtiveStep: (identify, activeStep) => {
            dispatch(changeAvtiveStep(identify, activeStep));
        },
        addNewDevice: (
            identify,
            devicetypeId,
            deviceName,
            deviceDisplayName,
            deviceAddressId,
            deviceLocationId,
            properties
        ) => {
            dispatch(
                addNewDevice(
                    identify,
                    devicetypeId,
                    deviceName,
                    deviceDisplayName,
                    deviceAddressId,
                    deviceLocationId,
                    properties
                )
            );
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(AddDeviceComp));
