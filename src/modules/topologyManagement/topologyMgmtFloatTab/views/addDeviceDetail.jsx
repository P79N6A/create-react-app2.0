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
import { withStyles } from "@material-ui/core/styles";
// import { reducerName as topoReducerName } from "modules/topologyManagement/topologyMgmtGrid";
import ListItem from "@material-ui/core/ListItem";
// import LiveSearchSelect from "./liveSearchSelect";
import AddLocationComp from "./addLocationComp";
import { TextField, InputLabel, Select } from "modules/common";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import Tooltip from "@material-ui/core/Tooltip";
import _ from "lodash";
import Button from "@material-ui/core/Button";
import TopoTreeDialog from "./topoTreeDialog";

const styles = theme => ({
    paper: {},
    root: { backgroundColor: theme.palette.background.paper }
});

class AddDeviceDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openAppTreeDialog: false,
            selectDeviceId: this.props.selectDeviceId,
            selectAddressName: this.props.selectAddressName,
            selectAddressIotId: this.props.selectAddressIotId,
            addSubDevice: this.props.selectAddressIotId ? true : false
        };
        if (this.state.addSubDevice) {
            this.setState({ deviceapplication: this.props.selectAddressName });
            this.props.liveSearchSelectFunc("deviceapplication", this.props.selectAddressIotId);
            this.props.addParentDeviceIdFunc(this.props.selectDeviceId);
        }
    }

    handleInputSelectChanged(configKey, valueregex, mandatory, error, event, openAppTreeDialog) {
        let value = event.target && event.target.value;
        this.setState(
            Object.assign(this.state, {
                [configKey]: value
            })
        );
        if (configKey === "deviceapplication") {
            this.setState(
                Object.assign(this.state, {
                    openAppTreeDialog: openAppTreeDialog
                })
            );
        }
        let validateFlag = true;
        if (valueregex && value) {
            let reg = new RegExp("^[" + valueregex + "]+$");
            validateFlag = reg.test(value);
            this.setState(
                Object.assign(this.state, {
                    [`${configKey}validate`]: !validateFlag,
                    [`${configKey}helperText`]: error || `Support ${valueregex}`
                })
            );
        }
        if (!value) {
            this.setState(
                Object.assign(this.state, {
                    [`${configKey}validate`]: false
                })
            );
        }
        this.props.inputSelectChangedFunc(configKey, value, validateFlag);
    }

    handleInputBlur(schemaKey, event) {
        console.log("Blru: ", schemaKey);
        if (schemaKey === "devicename" && !this.state.devicedisplayname) {
            let sysconfigDeviceSchema = this.props.sysconfigDeviceSchema;
            _.forEach(sysconfigDeviceSchema, schema => {
                for (let key in schema) {
                    if (key === "devicedisplayname") {
                        let config = schema[key];
                        if (event.target.value) {
                            this.handleInputSelectChanged(
                                key,
                                config.valueregex,
                                config.mandatory,
                                config.valueerror,
                                event
                            );
                        }
                    }
                }
            });
        }
    }

    handleApplicationDialog() {
        this.setState({
            openAppTreeDialog: true
        });
    }

    handleCloseAppTreeDialog(schemaKey, selectAppId, selectAppName) {
        this.setState({ openAppTreeDialog: false });
        if (schemaKey) {
            this.setState({ [schemaKey]: selectAppName });
            this.props.liveSearchSelectFunc(schemaKey, selectAppId);
        }
    }

    render() {
        const { sysconfigDeviceSchema, sysconfigDevicePropertySchema } = this.props;
        const { addSubDevice, selectAddressName } = this.state;
        return (
            <div className="edit-device-info" style={{ height: "100%", overflowY: "auto", overflowX: "hidden" }}>
                <div>
                    {sysconfigDeviceSchema &&
                        sysconfigDeviceSchema.map((schema, index) => {
                            let schemaKey = "";
                            for (let key in schema) {
                                schemaKey = key;
                            }
                            let config = schema[schemaKey];
                            let comp = config.comp;
                            if (!comp) {
                                return null;
                            }
                            return (
                                <ListItem key={index} style={{ paddingLeft: 0, paddingRight: 0 }}>
                                    {config.comp === "input" && (
                                        <Tooltip title={config.default || ""}>
                                            <TextField
                                                label={config["displayname"]}
                                                value={this.state[schemaKey] || ""}
                                                onChange={this.handleInputSelectChanged.bind(
                                                    this,
                                                    schemaKey,
                                                    config.valueregex,
                                                    config.mandatory,
                                                    config.valueerror
                                                )}
                                                onBlur={this.handleInputBlur.bind(this, schemaKey)}
                                                fullWidth
                                                multiline={config.multiline}
                                                required={config.mandatory}
                                                inputProps={{ maxLength: config.size }}
                                                error={this.state[`${schemaKey}validate`]}
                                                helperText={
                                                    this.state[`${schemaKey}validate`]
                                                        ? this.state[`${schemaKey}helperText`]
                                                        : ""
                                                }
                                            />
                                        </Tooltip>
                                    )}
                                    {config.comp === "singleselect" && (
                                        <Tooltip title={config.default || ""}>
                                            <FormControl required={config.mandatory} style={{ width: "100%" }}>
                                                <InputLabel htmlFor="select-multiple-checkbox">
                                                    {config.displayname}
                                                </InputLabel>
                                                <Select
                                                    value={this.state[schemaKey] || ""}
                                                    onChange={this.handleInputSelectChanged.bind(
                                                        this,
                                                        schemaKey,
                                                        config.valueregex,
                                                        config.mandatory,
                                                        config.valueerror
                                                    )}
                                                >
                                                    {config.listArr &&
                                                        config.listArr.map((list, index) => {
                                                            return (
                                                                <MenuItem key={index} value={list}>
                                                                    <ListItemText primary={list} />
                                                                </MenuItem>
                                                            );
                                                        })}
                                                </Select>
                                            </FormControl>
                                        </Tooltip>
                                    )}
                                    {config.comp === "liveSearchSelect" && schemaKey === "deviceapplication" && (
                                        // <LiveSearchSelect
                                        //     identify={this.props.identify}
                                        //     schemaKey={schemaKey}
                                        //     schema={config}
                                        //     liveSearchSelectFunc={this.props.liveSearchSelectFunc}
                                        // />
                                        <div style={{ paddingLeft: 0, paddingRight: 0, width: "100%" }}>
                                            <Tooltip title={config.default || ""}>
                                                <FormControl style={{ width: addSubDevice ? "100%" : "80%" }}>
                                                    <TextField
                                                        label={config["displayname"]}
                                                        value={
                                                            addSubDevice
                                                                ? selectAddressName
                                                                : this.state[schemaKey] || ""
                                                        }
                                                        fullWidth
                                                        multiline={config.multiline}
                                                        required={config.mandatory}
                                                        inputProps={{ maxLength: config.size }}
                                                        disabled={true}
                                                    />
                                                </FormControl>
                                            </Tooltip>
                                            <FormControl
                                                style={{
                                                    width: addSubDevice ? "0%" : "15%",
                                                    marginLeft: "5%",
                                                    display: addSubDevice ? "none" : "inline-block"
                                                }}
                                            >
                                                <Button onClick={this.handleApplicationDialog.bind(this)}>
                                                    Select
                                                </Button>
                                                <TopoTreeDialog
                                                    identify={this.props.identify}
                                                    open={this.state.openAppTreeDialog}
                                                    onClose={this.handleCloseAppTreeDialog.bind(this)}
                                                    schemaKey={schemaKey}
                                                    showFloatTab={this.props.showFloatTab}
                                                    handleFloatTabClose={this.props.handleFloatTabClose}
                                                    selectAppId={this.props.selectAppId}
                                                    selectAppRespath={this.props.selectAppRespath}
                                                />
                                            </FormControl>
                                        </div>
                                    )}
                                    {config.comp === "liveSearchSelect" && schemaKey === "devicelocation" && (
                                        <AddLocationComp
                                            identify={this.props.identify}
                                            schemaKey={schemaKey}
                                            schema={config}
                                            handleLocationChangedFunc={this.props.handleLocationChangedFunc}
                                            deviceName={this.state.devicename}
                                        />
                                    )}
                                </ListItem>
                            );
                        })}
                    {sysconfigDevicePropertySchema &&
                        sysconfigDevicePropertySchema.map((schema, index) => {
                            let schemaKey = "";
                            for (let key in schema) {
                                schemaKey = key;
                            }
                            let config = schema[schemaKey];
                            return (
                                <ListItem key={index} style={{ paddingLeft: 0, paddingRight: 0 }}>
                                    {config.comp === "input" && (
                                        <Tooltip title={config.default || ""}>
                                            <TextField
                                                label={config["displayname"]}
                                                value={this.state[schemaKey]}
                                                onChange={this.handleInputSelectChanged.bind(
                                                    this,
                                                    schemaKey,
                                                    config.valueregex,
                                                    config.mandatory,
                                                    config.valueerror
                                                )}
                                                fullWidth
                                                multiline={config.multiline}
                                                required={config.mandatory}
                                                inputProps={{ maxLength: config.size }}
                                                error={this.state[`${schemaKey}validate`]}
                                                helperText={
                                                    this.state[`${schemaKey}validate`]
                                                        ? this.state[`${schemaKey}helperText`]
                                                        : ""
                                                }
                                            />
                                        </Tooltip>
                                    )}
                                    {config.comp === "singleselect" && (
                                        <Tooltip title={config.default || ""}>
                                            <FormControl required={config.mandatory} style={{ width: "100%" }}>
                                                <InputLabel htmlFor="select-multiple-checkbox">
                                                    {config.displayname}
                                                </InputLabel>
                                                <Select
                                                    value={this.state[schemaKey] || ""}
                                                    onChange={this.handleInputSelectChanged.bind(
                                                        this,
                                                        schemaKey,
                                                        config.valueregex,
                                                        config.mandatory,
                                                        config.valueerror
                                                    )}
                                                >
                                                    {config.listArr &&
                                                        config.listArr.map((list, index) => {
                                                            return (
                                                                <MenuItem key={index} value={list}>
                                                                    <ListItemText primary={list} />
                                                                </MenuItem>
                                                            );
                                                        })}
                                                </Select>
                                            </FormControl>
                                        </Tooltip>
                                    )}
                                </ListItem>
                            );
                        })}
                </div>
            </div>
        );
    }
}

AddDeviceDetail.propTypes = {};

AddDeviceDetail.defaultProps = {};

export default withStyles(styles)(AddDeviceDetail);
