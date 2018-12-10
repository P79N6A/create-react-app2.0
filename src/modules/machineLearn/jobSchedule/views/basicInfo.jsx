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
import classNames from "classnames";
import FormControl from "@material-ui/core/FormControl";
import { Input, InputLabel, Select, Chip, Button } from "modules/common";
import FormHelperText from "@material-ui/core/FormHelperText";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";

import { connect } from "react-redux";
import { setRequestDeviceName, setDeviceValue, setRequestDeviceValue, setBasicInfo } from "../funcs/actions";
import { REDUCER_NAME } from "../funcs/constants";
//import CircularProgress from "@material-ui/core/CircularProgress";
import { ISC_ACCOUNT_INFO } from "commons/constants/const";

const sitename =
    sessionStorage.getItem(ISC_ACCOUNT_INFO) && JSON.parse(sessionStorage.getItem(ISC_ACCOUNT_INFO)).displayname;

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 550
        }
    }
};

const styles = theme => ({
    formControl: {
        marginLeft: theme.spacing.unit * 4,
        marginBottom: 16,
        width: "94%"
    },
    textError: {
        color: "#f44336"
    },
    button: {
        marginRight: theme.spacing.unit
    },
    // Veritify: {
    //     marginRight: theme.spacing.unit * 37
    // },
    mergeButton: {
        position: "fixed",
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 4
    },
    chips: {
        display: "flex",
        flexWrap: "wrap"
    },
    chip: {
        margin: theme.spacing.unit / 4
    }
});

class BasicInfo extends React.Component {
    constructor(props) {
        super(props);
        let { basicInfo } = this.props;
        let flag = Boolean(Object.keys(basicInfo).length);
        this.state = {
            name: flag ? basicInfo.name : "",
            nameFlag: false,
            description: flag ? basicInfo.description : "",
            deviceName: flag ? basicInfo.deviceName : "",
            deviceTypeValue: flag ? basicInfo.deviceTypeValue : [],
            chooseModel: flag ? basicInfo.chooseModel : "",
            jobType: flag ? basicInfo.jobType : [],
            //Verify: flag ? basicInfo.Verify : false,
            activeStep: 0
        };
    }

    componentWillMount = () => {
        this.props.onSetRequestDeviceName(sitename);
    };

    componentDidUpdate = prevProps => {
        let { basicInfo } = this.props;
        if (prevProps.isAddOpenDrawer !== this.props.isAddOpenDrawer) {
            let flag = Boolean(Object.keys(this.props.basicInfo).length);
            this.setState({
                name: flag ? basicInfo.name : "",
                description: flag ? basicInfo.description : "",
                deviceName: flag ? basicInfo.deviceName : "",
                deviceTypeValue: flag ? basicInfo.deviceTypeValue : [],
                chooseModel: flag ? basicInfo.chooseModel : "",
                jobType: flag ? basicInfo.jobType : [],
                //Verify: flag ? basicInfo.Verify : false
            });
        }
    };

    handleDeviceValueDelete = data => () => {
        this.setState(state => {
            const deviceTypeValue = this.state.deviceTypeValue;
            const chipToDelete = deviceTypeValue.indexOf(data);
            deviceTypeValue.splice(chipToDelete, 1);
            return { deviceTypeValue };
        });
    };

    handleChange = name => event => {
        let value = event.target.value;
        if (name === "deviceTypeValue") {
            this.setState({
                deviceTypeValue: value
            });
        }  else {
            if (name === "name") {
                this.setState({
                    [name]: value
                });

                let flag = `${name}Flag`;
                let reg = /[a-zA-Z]{2,50}/;
                if (value && reg.test(value)) {
                    this.setState({ [flag]: false });
                } else {
                    this.setState({ [flag]: true });
                }
            } else {
                this.setState({
                    [name]: value
                });

                let flag = `${name}Flag`;
                let reg = /[\w]{2,50}/;
                if (value && reg.test(value)) {
                    this.setState({ [flag]: false });
                } else {
                    this.setState({ [flag]: true });
                }
            }
        }
    };

    handleSelectChange(event) {
        let value = event.target.value;
        let deviceNameValueID = value.split(",")[1];
        this.setState(
            {
                deviceName: value,
                deviceTypeValue: []
            },
            () => {
                //get devicetype value
                this.props.onSetDeviceValue(sitename, deviceNameValueID);
            }
        );
    }

    handleNext = () => {
        let { name, description, deviceName, deviceTypeValue, jobType, chooseModel } = this.state;
        let activeStep = this.state.activeStep + 1;
        const { currentApplicationInfo: app } = this.props;
        const appid = app && app["address.iotTopologyId"];
        this.props.onSetBasicInfo(
            name,
            description,
            deviceName,
            deviceTypeValue,
            jobType,
            chooseModel,
            appid,
            activeStep
        );
    };

    handleVerify = () => {
        this.setState({
            Verify: true
        });
    };

    render() {
        const { classes, deviceType, deviceNameTypeValue, modelTableInfo } = this.props;
        const {
            name,
            nameFlag,
            description,
            deviceName,
            deviceTypeValue,
            chooseModel,
            jobType
        } = this.state;

        let configTypeValuename = "";
        return (
            <div>
                <FormControl className={classes.formControl}>
                    <InputLabel>Name</InputLabel>
                    <Input
                        type="text"
                        error={nameFlag}
                        value={name}
                        onChange={this.handleChange("name")}
                        style={{ width: "95%" }}
                    />
                    {nameFlag ? (
                        <FormHelperText className={classes.textError}>Please enter English letter </FormHelperText>
                    ) : null}
                </FormControl>

                <FormControl className={classes.formControl}>
                    <InputLabel>Description</InputLabel>
                    <Input
                        type="text"
                        value={description}
                        onChange={this.handleChange("description")}
                        style={{ width: "95%" }}
                    />
                </FormControl>

                <FormControl className={classes.formControl}>
                    <InputLabel>Select Device Type</InputLabel>
                    <Select
                        value={deviceName}
                        onChange={this.handleSelectChange.bind(this)}
                        name="deviceName"
                        MenuProps={MenuProps}
                        style={{ width: "95%" }}
                    >
                        {deviceType &&
                            deviceType.map(items => {
                                return (
                                    items &&
                                    items.configvals.map(item => {
                                        return item.configvalname.indexOf("Prediction") > -1 ? null : (
                                            <MenuItem
                                                key={item.configvalname}
                                                value={item.configvalname + "," + items.configname}
                                            >
                                                <ListItemText primary={item.configvalname} />
                                            </MenuItem>
                                        );
                                    })
                                );
                            })}
                    </Select>
                </FormControl>

                {Boolean(deviceName.length === 0) ? null : (
                    <FormControl className={classNames(classes.formControl)}>
                        <InputLabel htmlFor="select-multiple-chip">Select Type Value</InputLabel>
                        <Select
                            multiple
                            variant="standard"
                            value={deviceTypeValue}
                            onChange={this.handleChange("deviceTypeValue")}
                            input={<Input id="select-multiple-chip" />}
                            style={{ width: "95%" }}
                            renderValue={selected => (
                                <div className={classes.chips}>
                                    {selected.map(value => (
                                        <Chip
                                            key={value}
                                            label={value}
                                            className={classes.chip}
                                            onDelete={this.handleDeviceValueDelete(value)}
                                        />
                                    ))}
                                </div>
                            )}
                            MenuProps={MenuProps}
                        >
                            {deviceNameTypeValue &&
                                deviceNameTypeValue.map(items => {
                                    configTypeValuename = items.configvalname;
                                    return (
                                        items &&
                                        items.configval &&
                                        JSON.parse(items.configval)[configTypeValuename] &&
                                        JSON.parse(items.configval)[configTypeValuename].basicTypeInstances.map(
                                            (item, index) => {
                                                return (
                                                    <MenuItem
                                                        key={index}
                                                        value={
                                                            Object.keys(item)[0] + "-" + item[Object.keys(item)[0]].type
                                                        }
                                                    >
                                                        <Checkbox
                                                            checked={
                                                                deviceTypeValue.indexOf(
                                                                    Object.keys(item)[0] +
                                                                        "-" +
                                                                        item[Object.keys(item)[0]].type
                                                                ) > -1
                                                            }
                                                        />
                                                        <ListItemText primary={Object.keys(item)[0]} />
                                                    </MenuItem>
                                                );
                                            }
                                        )
                                    );
                                })}
                        </Select>
                    </FormControl>
                )}

                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="select-multiple">Job Type</InputLabel>
                    <Select
                        value={jobType}
                        onChange={this.handleChange("jobType")}
                        input={<Input id="select-multiple" />}
                        MenuProps={MenuProps}
                        style={{ width: "95%" }}
                    >
                        <MenuItem value="STREAM">STREAM</MenuItem>
                        <MenuItem value="BATCH">BATCH</MenuItem>
                    </Select>
                </FormControl>

                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="select-model-chip">Choose Model</InputLabel>
                    <Select
                        value={chooseModel}
                        onChange={this.handleChange("chooseModel")}
                        input={<Input id="select-model-chip" />}
                        MenuProps={MenuProps}
                        style={{ width: "95%" }}
                        id="selectChooseModel"
                    >
                        {modelTableInfo &&
                            modelTableInfo.map((item, index) => {
                                return <MenuItem key={index} value={item.modelId}>{item.modelName}</MenuItem>;
                            })}
                    </Select>
                </FormControl>

                <div className={classes.mergeButton}>
                    <Button disabled={true} className={classes.button}>
                        Back
                    </Button>

                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={this.handleNext}
                        className={classes.button}
                        disabled={
                            !name ||
                            nameFlag ||
                            !Boolean(deviceTypeValue.length) ||
                            !Boolean(deviceName.length) ||
                            !Boolean(jobType.length) ||
                            !Boolean(chooseModel.length) 
                        }
                    >
                        next
                    </Button>
                </div>
            </div>
        );
    }
}

BasicInfo.propTypes = {
    classes: PropTypes.object.isRequired
};

BasicInfo.defaultProps = {
    basicInfo: {}
};

const mapStateToProps = (state, ownProps) => {
    if (state[REDUCER_NAME] && state[REDUCER_NAME].machineLearn) {
        return {
            deviceType: state[REDUCER_NAME].machineLearn.deviceType,
            basicInfo: state[REDUCER_NAME].machineLearn.basicInfo || {},
            isAddOpenDrawer: state[REDUCER_NAME].machineLearn.isAddOpenDrawer,
            deviceNameTypeValue: state[REDUCER_NAME].machineLearn.deviceTypeValue || [],
            modelTableInfo: state[REDUCER_NAME].machineLearn.modelTableInfo || []
        };
    }
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onSetRequestDeviceName: sitename => {
            dispatch(setRequestDeviceName(sitename, props.identify));
        },
        onSetRequestDeviceValue: value => {
            dispatch(setRequestDeviceValue(value, props.identify));
        },
        onSetBasicInfo: (name, description, deviceName, deviceTypeValue, jobType, chooseModel, appid, activeStep) => {
            dispatch(
                setBasicInfo(
                    name,
                    description,
                    deviceName,
                    deviceTypeValue,
                    jobType,
                    chooseModel,
                    appid,
                    activeStep,
                    props.identify
                )
            );
        },
        onSetDeviceValue: (sitename, deviceValue) => {
            dispatch(setDeviceValue(sitename, deviceValue, props.identify));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(BasicInfo));
