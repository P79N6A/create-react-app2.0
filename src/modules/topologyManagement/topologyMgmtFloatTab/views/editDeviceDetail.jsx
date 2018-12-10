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
import ListItem from "@material-ui/core/ListItem";
import { TextField, InputLabel, Select } from "modules/common";
// import LiveSearchSelect from "./liveSearchSelect";
import AddLocationComp from "./addLocationComp";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import TopoTreeDialog from "./topoTreeDialog";

class EditDeviceDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = { initValue: this.props.initValue, openAppTreeDialog: false, addressName: this.props.addressName };
    }
    componentDidMount() {
        this.setState(Object.assign(this.state, this.props.initValue));
    }

    componentWillReceiveProps(nextProps) {
        // init value
        if (
            JSON.stringify(this.props.formatValues) !== JSON.stringify(nextProps.formatValues) ||
            JSON.stringify(this.props.initValue) !== JSON.stringify(nextProps.initValue) ||
            (this.props.showFloatTab !== nextProps.showFloatTab && nextProps.showFloatTab)
        ) {
            this.setState(Object.assign(this.state, nextProps.initValue));
        }

        if (
            this.props.addressName !== nextProps.addressName ||
            (this.props.showFloatTab !== nextProps.showFloatTab && nextProps.showFloatTab)
        ) {
            this.setState({
                addressName: nextProps.addressName
            });
        }
    }

    handleInputSelectChanged(configKey, valueregex, mandatory, error, event) {
        this.setState(
            Object.assign(this.state, {
                [configKey]: event.target.value,
                initValue: Object.assign(this.state.initValue, {
                    [configKey]: event.target.value
                })
            })
        );
        let validateFlag = true;
        if (valueregex && event.target.value) {
            let reg = new RegExp("^[" + valueregex + "]+$");
            validateFlag = reg.test(event.target.value);
            this.setState(
                Object.assign(this.state, {
                    [`${configKey}validate`]: !validateFlag,
                    [`${configKey}helperText`]: error || `Support ${valueregex}`
                })
            );
        }
        if (!event.target.value) {
            this.setState(
                Object.assign(this.state, {
                    [`${configKey}validate`]: false
                })
            );
        }
        // this.props.inputSelectChangedFunc(configKey, event.target.value);
        this.props.inputSelectChangedFunc(configKey, event.target.value, validateFlag);
    }

    handleApplicationDialog() {
        this.setState({
            openAppTreeDialog: true
        });
    }

    handleCloseAppTreeDialog(schemaKey, selectAppId, selectAppName) {
        if (schemaKey) {
            this.setState(
                Object.assign(this.state, {
                    addressName: selectAppName,
                    [schemaKey]: selectAppName,
                    initValue: Object.assign(this.state.initValue, {
                        [schemaKey]: selectAppName
                    }),
                    openAppTreeDialog: false
                })
            );
        } else {
            this.setState({
                openAppTreeDialog: false
            });
        }

        this.props.liveSearchSelectFunc(schemaKey, selectAppId);
    }

    render() {
        const { formatValues, locationName, coordinates, deviceIcon, hasParentDevice } = this.props;
        const { addressName } = this.state;
        return (
            <div>
                {formatValues &&
                    formatValues.map((config, index) => {
                        let operations = config.operations;
                        let writable = false;
                        if (operations === "RW" || operations === "W") {
                            writable = true;
                        }
                        let comp = config.comp;
                        if (!comp) {
                            return null;
                        }
                        return (
                            <ListItem style={{ paddingLeft: 0, paddingRight: 0 }} key={index}>
                                {config.comp === "input" && (
                                    <Tooltip title={(writable && config.default) || ""}>
                                        <TextField
                                            label={config["displayname"]}
                                            value={this.state[config.currentKey] || ""}
                                            onChange={this.handleInputSelectChanged.bind(
                                                this,
                                                config.currentKey,
                                                config.valueregex,
                                                config.mandatory,
                                                config.valueerror
                                            )}
                                            fullWidth
                                            multiline={config.multiline}
                                            required={config.mandatory}
                                            // inputProps={{ maxLength: config.size }}
                                            error={this.state[`${config.currentKey}validate`]}
                                            helperText={
                                                this.state[`${config.currentKey}validate`]
                                                    ? this.state[`${config.currentKey}helperText`]
                                                    : ""
                                            }
                                            InputProps={{
                                                readOnly: !writable
                                            }}
                                            disabled={!writable}
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
                                                value={this.state[config.currentKey] || ""}
                                                onChange={this.handleInputSelectChanged.bind(
                                                    this,
                                                    config.currentKey,
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
                                {config.comp === "liveSearchSelect" && config.currentKey === "deviceapplication" && (
                                    // <LiveSearchSelect
                                    //     identify={this.props.identify}
                                    //     schemaKey={config.currentKey}
                                    //     schema={config}
                                    //     locationId={addressId}
                                    //     locationName={addressName}
                                    //     showFloatTab={showFloatTab}
                                    //     liveSearchSelectFunc={this.props.liveSearchSelectFunc}
                                    // />
                                    <div style={{ paddingLeft: 0, paddingRight: 0, width: "100%" }}>
                                        <FormControl style={{ width: hasParentDevice ? "100%" : "80%" }}>
                                            <TextField
                                                label={config["displayname"]}
                                                value={addressName}
                                                fullWidth
                                                multiline={config.multiline}
                                                required={config.mandatory}
                                                inputProps={{ maxLength: config.size }}
                                                disabled={true}
                                            />
                                        </FormControl>
                                        <FormControl
                                            style={{
                                                width: hasParentDevice ? "0%" : "15%",
                                                marginLeft: "5%",
                                                display: hasParentDevice ? "none" : "inline-block"
                                            }}
                                        >
                                            <Button onClick={this.handleApplicationDialog.bind(this)}>Select</Button>
                                            <TopoTreeDialog
                                                identify={this.props.identify}
                                                showFloatTab={this.props.showFloatTab}
                                                open={this.state.openAppTreeDialog}
                                                onClose={this.handleCloseAppTreeDialog.bind(this)}
                                                schemaKey={config.currentKey}
                                                needDefaultSelect={false}
                                                selectAppName={addressName}
                                                selectAppId={this.props.selectAppId}
                                                selectAppRespath={this.props.selectAppRespath}
                                            />
                                        </FormControl>
                                    </div>
                                )}
                                {config.comp === "liveSearchSelect" && config.currentKey === "devicelocation" && (
                                    <AddLocationComp
                                        identify={this.props.identify}
                                        schemaKey={config.currentKey}
                                        schema={config}
                                        coordinates={coordinates}
                                        locationName={locationName}
                                        deviceIcon={deviceIcon}
                                        initSaveBtn={true}
                                        handleLocationChangedFunc={this.props.handleLocationChangedFunc}
                                    />
                                )}
                            </ListItem>
                        );
                    })}
            </div>
        );
    }
}

EditDeviceDetail.propTypes = {};

EditDeviceDetail.defaultProps = {};

export default EditDeviceDetail;
