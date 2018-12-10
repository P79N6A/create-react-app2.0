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
import { Input, InputLabel, Select, Button } from "modules/common";
import FormHelperText from "@material-ui/core/FormHelperText";
import MenuItem from "@material-ui/core/MenuItem";

import { connect } from "react-redux";
import { setEngineInfo, setHandleBack } from "../funcs/actions";
import { REDUCER_NAME } from "../funcs/constants";
//import CircularProgress from "@material-ui/core/CircularProgress";

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
        flexWrap: "wrap"
    },
    form: {
        width: "100%"
    },
    formControl: {
        marginLeft: theme.spacing.unit * 4,
        marginBottom: 16,
        width: "94%"
    },
    textError: {
        color: "#f44336"
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

class EngineInfo extends React.Component {
    constructor(props) {
        super(props);
        let flag = Boolean(Object.keys(this.props.engineInfo).length);
        let { engineInfo } = this.props;
        this.state = {
            driverCores: flag ? engineInfo.driverCores : "",
            driverCoresFlag: false,
            driverMemory: flag ? engineInfo.driverMemory : "2g",
            driverMemoryFlag: false,
            engineType: flag ? engineInfo.engineType : [],
            engineUrl: flag ? engineInfo.engineUrl : "http://hdpmaster01:8998/batches",
            engineUrlFlag: false,
            executorCores: flag ? engineInfo.executorCores : "",
            executorCoresFlag: false,
            executorMemory: flag ? engineInfo.executorMemory : "2g",
            executorMemoryFlag: false,
            activeStep: this.props.activeStep,
            Verify: false
        };
    }

    componentDidUpdate = prevProps => {
        if (prevProps.isAddOpenDrawer !== this.props.isAddOpenDrawer) {
            let flag = Boolean(Object.keys(this.props.engineInfo).length);
            let { engineInfo } = this.props;
            this.setState({
                driverCores: flag ? engineInfo.driverCores : "",
                driverMemory: flag ? engineInfo.driverMemory : "",
                engineType: flag ? engineInfo.engineType : [],
                engineUrl: flag ? engineInfo.engineUrl : "",
                executorCores: flag ? engineInfo.executorCores : "",
                executorMemory: flag ? engineInfo.executorMemory : ""
            });
        }
    };

    handleChange = name => event => {
        let value = event.target.value;
        if (name === "driverCores" || name === "executorCores") {
            this.setState({ [name]: value });
            let flag = `${name}Flag`;
            let reg = /^[1-9]{1}$/;
            if (value && reg.test(value)) {
                this.setState({ [flag]: false });
            } else {
                this.setState({ [flag]: true });
            }
        } else {
            this.setState({ [name]: value });
            let flag = `${name}Flag`;
            let reg = /[\w]{2,50}/;
            if (value && reg.test(value)) {
                this.setState({ [flag]: false });
            } else {
                this.setState({ [flag]: true });
            }
        }
    };

    handleNext = () => {
        let { driverCores, driverMemory, engineType, engineUrl, executorCores, executorMemory } = this.state;
        let activeStep = this.state.activeStep + 1;

        this.props.onSetEngineInfo(
            driverCores,
            driverMemory,
            engineType,
            engineUrl,
            executorCores,
            executorMemory,
            activeStep
        );
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
        const { classes } = this.props;
        const {
            driverCores,
            driverCoresFlag,
            driverMemory,
            driverMemoryFlag,
            engineType,
            engineUrl,
            engineUrlFlag,
            executorCores,
            executorCoresFlag,
            executorMemory,
            executorMemoryFlag,
            //Verify
        } = this.state;
        // let VerifyJudge = Boolean(
        //     !driverCores ||
        //         driverCoresFlag ||
        //         !driverMemory ||
        //         driverMemoryFlag ||
        //         Boolean(engineType.length === 0) ||
        //         !engineUrl ||
        //         engineUrlFlag ||
        //         !executorCores ||
        //         executorCoresFlag ||
        //         !executorMemory ||
        //         executorMemoryFlag
        // );
        return (
            <div className={classes.container}>
                <form className={classes.form} noValidate autoComplete="off">
                    <FormControl className={classes.formControl}>
                        <InputLabel>Driver Cores</InputLabel>
                        <Input
                            type="text"
                            error={driverCoresFlag}
                            value={driverCores}
                            onChange={this.handleChange("driverCores")}
                            style={{ width: "95%" }}
                        />
                        {driverCoresFlag ? (
                            <FormHelperText className={classes.textError}>Please enter numbers 1-9</FormHelperText>
                        ) : null}
                    </FormControl>

                    <FormControl className={classes.formControl}>
                        <InputLabel>Driver Memory</InputLabel>
                        <Input
                            type="text"
                            value={driverMemory}
                            error={driverMemoryFlag}
                            onChange={this.handleChange("driverMemory")}
                            style={{ width: "95%" }}
                        />
                        {driverMemoryFlag ? (
                            <FormHelperText className={classes.textError}>
                                Please enter parameter,export 2g
                            </FormHelperText>
                        ) : null}
                    </FormControl>

                    <FormControl className={classes.formControl}>
                        <InputLabel>Engine Type</InputLabel>
                        <Select
                            value={engineType}
                            onChange={this.handleChange("engineType")}
                            displayEmpty
                            MenuProps={MenuProps}
                            style={{ width: "95%" }}
                        >
                            <MenuItem value="SPARK">SPARK</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl className={classes.formControl}>
                        <InputLabel>Engine Url</InputLabel>
                        <Input
                            type="text"
                            value={engineUrl}
                            error={engineUrlFlag}
                            onChange={this.handleChange("engineUrl")}
                            style={{ width: "95%" }}
                        />
                        {engineUrlFlag ? (
                            <FormHelperText className={classes.textError}>
                                please url parameter http://hdpmaster01:8998/batches
                            </FormHelperText>
                        ) : null}
                    </FormControl>

                    <FormControl className={classes.formControl}>
                        <InputLabel>Executor Cores</InputLabel>
                        <Input
                            type="text"
                            value={executorCores}
                            error={executorCoresFlag}
                            onChange={this.handleChange("executorCores")}
                            style={{ width: "95%" }}
                        />
                        {executorCoresFlag ? (
                            <FormHelperText className={classes.textError}>Please enter numbers 1 - 9</FormHelperText>
                        ) : null}
                    </FormControl>

                    <FormControl className={classes.formControl}>
                        <InputLabel>Executor Memory</InputLabel>
                        <Input
                            type="text"
                            value={executorMemory}
                            error={executorMemoryFlag}
                            onChange={this.handleChange("executorMemory")}
                            style={{ width: "95%" }}
                        />
                        {executorMemoryFlag ? (
                            <FormHelperText className={classes.textError}>
                                Please enter parameter, export 2g
                            </FormHelperText>
                        ) : null}
                    </FormControl>
                </form>
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
                    <Button disabled={false} className={classes.button} onClick={this.handleBack}>
                        Back
                    </Button>

                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={this.handleNext}
                        className={classes.button}
                        disabled={
                            !driverCores ||
                            driverCoresFlag ||
                            !driverMemory ||
                            driverMemoryFlag ||
                            Boolean(engineType.length === 0) ||
                            !engineUrl ||
                            engineUrlFlag ||
                            !executorCores ||
                            executorCoresFlag ||
                            !executorMemory ||
                            executorMemoryFlag
                        }
                    >
                        next
                    </Button>
                </div>
            </div>
        );
    }
}

EngineInfo.propTypes = {
    classes: PropTypes.object.isRequired
};

EngineInfo.defaultProps = {
    engineInfo: {}
};

const mapStateToProps = (state, ownProps) => {
    if (state[REDUCER_NAME] && state[REDUCER_NAME].machineLearn) {
        return {
            activeStep: state[REDUCER_NAME].machineLearn.activeStep,
            engineInfo: state[REDUCER_NAME].machineLearn.engineInfo
        };
    }
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onSetEngineInfo: (
            driverCores,
            driverMemory,
            engineType,
            engineUrl,
            executorCores,
            executorMemory,
            activeStep
        ) => {
            dispatch(
                setEngineInfo(
                    driverCores,
                    driverMemory,
                    engineType,
                    engineUrl,
                    executorCores,
                    executorMemory,
                    activeStep,
                    props.identify
                )
            );
        },
        onSetHandleBack: activeStep => {
            dispatch(setHandleBack(activeStep, props.identify));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(EngineInfo));
