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
import { Input, InputLabel, Button } from "modules/common";
import FormHelperText from "@material-ui/core/FormHelperText";
import { connect } from "react-redux";
import { setOther, setHandleBack, setCreateJob } from "../funcs/actions";
import { REDUCER_NAME } from "../funcs/constants";
//import CircularProgress from "@material-ui/core/CircularProgress";
const accountId = JSON.parse(sessionStorage.getItem("ISC-CURRENT-USER")).accountid || {};

const styles = theme => ({
    formControl: {
        marginLeft: theme.spacing.unit * 4,
        marginBottom: 16,
        width: "94%"
    },
    formSelect: {
        position: "relative",
        marginLeft: theme.spacing.unit * 4,
        marginTop: 0,
        maxWidth: 600,
        width: "94%"
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

class Other extends React.Component {
    constructor(props) {
        super(props);
        let flag = Boolean(Object.keys(this.props.other).length);
        let { other } = this.props;
        this.state = {
            configFilePath: flag ? other.configFilePath : "/home/uhdp/spark/spark-config/",
            configFilePathFlag: false,
            fileSystemUrl: flag ? other.fileSystemUrl : "hdfs://hdpmaster01:9000/",
            fileSystemUrlFlag: false,
            activeStep: this.props.activeStep,
            Verify: false
        };
    }

    componentDidUpdate = prevProps => {
        if (prevProps.isAddOpenDrawer !== this.props.isAddOpenDrawer) {
            let flag = Boolean(Object.keys(this.props.basicInfo).length);
            let { other } = this.props;
            this.setState({
                configFilePath: flag ? other.configFilePath : "/home/uhdp/spark/spark-config/",
                fileSystemUrl: flag ? other.fileSystemUrl : "hdfs://hdpmaster01:9000/"
            });
        }
    };

    handleChange = name => event => {
        let value = event.target.value;
        if (name === "configFilePath") {
            this.setState({ [name]: value });
            let flag = `${name}Flag`;
            let reg = /^\/[0-9a-zA-Z/-]{5,50}\/$/;

            if (value && reg.test(value)) {
                this.setState({ [flag]: false });
            } else {
                this.setState({ [flag]: true });
            }
        } else if (name === "fileSystemUrl") {
            this.setState({ [name]: value });
            let flag = `${name}Flag`;
            let reg = /^[a-zA-Z]{2,6}:\/\/[\w]{2,50}:[0-9]{2,6}\/$/;

            if (value && reg.test(value)) {
                this.setState({ [flag]: false });
            } else {
                this.setState({ [flag]: true });
            }
        }
    };

    handleBack = () => {
        let activeStep = this.state.activeStep - 1;
        this.props.onSetHandleBack(activeStep);
    };

    handleNext = () => {
        let { configFilePath, fileSystemUrl } = this.state;
        //let { basicInfo, sourceMessage, output, engineInfo } = this.props;
        let { basicInfo, sourceMessage, engineInfo, modelPredictionDesOut } = this.props;
        let activeStep = this.state.activeStep + 1;
        this.props.onSetOther(configFilePath, fileSystemUrl, activeStep);
        //create job
        this.props.onSetCreateJob(
            basicInfo.name,
            basicInfo.description,
            basicInfo.deviceName.split(",")[1],
            basicInfo.deviceTypeValue,
            basicInfo.jobType,
            basicInfo.appid,
            sourceMessage.deviceType,
            sourceMessage.modelAPIInput,
            sourceMessage.modelId,
            modelPredictionDesOut.swaggerJson,
            engineInfo.driverCores,
            engineInfo.driverMemory,
            engineInfo.engineType,
            engineInfo.engineUrl,
            engineInfo.executorCores,
            engineInfo.executorMemory,
            configFilePath,
            fileSystemUrl,
            accountId,
            modelPredictionDesOut.deviceTypeModelName,
            modelPredictionDesOut.venderName,
            modelPredictionDesOut.predictionDeviceId,
            modelPredictionDesOut.mlOutputStructure
        );
    };

    render() {
        const { classes } = this.props;
        const { configFilePath, configFilePathFlag, fileSystemUrl, fileSystemUrlFlag, activeStep } = this.state;
        //let VerifyJudge = Boolean(!configFilePath || configFilePathFlag || !fileSystemUrl || fileSystemUrlFlag);
        return (
            <div>
                <FormControl className={classes.formControl}>
                    <InputLabel>Config File Path</InputLabel>
                    <Input
                        type="text"
                        value={configFilePath}
                        error={configFilePathFlag}
                        onChange={this.handleChange("configFilePath")}
                        style={{ width: "95%" }}
                    />
                    {configFilePathFlag ? (
                        <FormHelperText className={classes.textError}>
                            example /home/uhdp/spark/spark-config/
                        </FormHelperText>
                    ) : null}
                </FormControl>

                <FormControl className={classes.formControl}>
                    <InputLabel>FileS ystem Url</InputLabel>
                    <Input
                        type="text"
                        value={fileSystemUrl}
                        error={fileSystemUrlFlag}
                        onChange={this.handleChange("fileSystemUrl")}
                        style={{ width: "95%" }}
                    />
                    {fileSystemUrlFlag ? (
                        <FormHelperText className={classes.textError}>example hdfs://hdpmaster01:9000/</FormHelperText>
                    ) : null}
                </FormControl>

                {/* {!refreshSuccess || Verify ? (
                    <div className="progress-drawer">
                        <CircularProgress color="secondary" />
                    </div>
                ) : null} */}
                <div className={classes.mergeButton}>
                    {/* <Button
                        variant="contained"
                        disabled={VerifyJudge || Verify}
                        className={classes.Veritify}
                        color="secondary"
                        onClick={this.handleVerify}
                    >
                        Verify
                    </Button> */}
                    <Button disabled={!activeStep === 4} className={classes.button} onClick={this.handleBack}>
                        Back
                    </Button>

                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={this.handleNext}
                        className={classes.button}
                        disabled={!configFilePath || configFilePathFlag || !fileSystemUrl || fileSystemUrlFlag}
                    >
                        Finish
                    </Button>
                </div>
            </div>
        );
    }
}

Other.propTypes = {
    classes: PropTypes.object.isRequired
};

Other.defaultProps = {
    other: {}
};

const mapStateToProps = (state, ownProps) => {
    if (state[REDUCER_NAME] && state[REDUCER_NAME].machineLearn) {
        return {
            activeStep: state[REDUCER_NAME].machineLearn.activeStep,
            other: state[REDUCER_NAME].machineLearn.other,
            basicInfo: state[REDUCER_NAME].machineLearn.basicInfo,
            sourceMessage: state[REDUCER_NAME].machineLearn.sourceMessage,
            output: state[REDUCER_NAME].machineLearn.output,
            engineInfo: state[REDUCER_NAME].machineLearn.engineInfo,
            modelInputOutputParameters: state[REDUCER_NAME].machineLearn.modelInputOutputParameters,
            modelPredictionDesOut: state[REDUCER_NAME].machineLearn.modelPredictionDesOut
        };
    }
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onSetOther: (configFilePath, fileSystemUrl, activeStep) => {
            dispatch(setOther(configFilePath, fileSystemUrl, activeStep, props.identify));
        },
        onSetHandleBack: activeStep => {
            dispatch(setHandleBack(activeStep, props.identify));
        },
        onSetCreateJob: (
            name,
            description,
            deviceName,
            deviceTypeValue,
            jobType,
            appid,
            inputDeviceType,
            modelAPIInput,
            modelId,
            swaggerJson,
            driverCores,
            driverMemory,
            engineType,
            engineUrl,
            executorCores,
            executorMemory,
            configFilePath,
            fileSystemUrl,
            accountId,
            deviceTypeModelName,
            venderName,
            predictionDeviceId,
            mlOutputStructure
        ) => {
            dispatch(
                setCreateJob(
                    name,
                    description,
                    deviceName,
                    deviceTypeValue,
                    jobType,
                    appid,
                    inputDeviceType,
                    modelAPIInput,
                    modelId,
                    swaggerJson,
                    driverCores,
                    driverMemory,
                    engineType,
                    engineUrl,
                    executorCores,
                    executorMemory,
                    configFilePath,
                    fileSystemUrl,
                    accountId,
                    deviceTypeModelName,
                    venderName,
                    predictionDeviceId,
                    mlOutputStructure,
                    "machineLearn"
                )
            );
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(Other));
