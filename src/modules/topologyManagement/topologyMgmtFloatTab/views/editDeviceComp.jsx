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
import {
    formatDeviceSchemaValueForView,
    formatDevicePropertySchemaValueForView,
    formatDevicePropertyValueForEdit
} from "../funcs/renderSchema";
import { connect } from "react-redux";
import { reducerName as topoReducerName } from "modules/topologyManagement/topologyMgmtGrid";
import { REDUCER_NAME as topoFloatTabReducer } from "../funcs/constants";
import { getDeviceDetail, editDeviceDetail, sendDeviceCommand } from "../funcs/actions";
import EditDeviceDetail from "./editDeviceDetail";
import Button from "@material-ui/core/Button";
import jp from "jsonpath";
import _ from "lodash";
import { formatIconPath } from "modules/topologyManagement/topologyMgmtFloatTab/funcs/iconsNew";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import CardContent from "@material-ui/core/Card";
import AppBar from "@material-ui/core/AppBar";
import { withStyles } from "@material-ui/core/styles";
import EditDevicePropertyComp from "./editDevicePropertyComp";

const styles = theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary
    }
});

class EditDeviceComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = { currentTab: 0, tabs: [{ tabDisName: "Device Info" }, { tabDisName: "Properties" }] };
        this.didDetailChanged = false;
        this.validateCheck = [];
    }
    componentDidMount() {
        this.componentWillReceiveProps(this.props);
        this.props.getDeviceDetail(this.props.selectDeviceId, this.props.identify);
    }

    componentWillReceiveProps(nextProps) {
        // get current selected device detail
        if (this.props.selectDeviceId !== nextProps.selectDeviceId && nextProps.selectDeviceId) {
            this.props.getDeviceDetail(nextProps.selectDeviceId, this.props.identify);
            this.setState({});
        }
        if (this.props.showFloatTab !== nextProps.showFloatTab && nextProps.showFloatTab && nextProps.selectDeviceId) {
            this.props.getDeviceDetail(nextProps.selectDeviceId, this.props.identify);
            this.setState({ currentTab: 0 });
        }

        if (
            nextProps.deviceData &&
            nextProps.sysconfigDeviceSchema &&
            nextProps.sysconfigDevicePropertySchema &&
            nextProps.showFloatTab
        ) {
            let { formatValues, initValue } = formatDeviceSchemaValueForView(
                nextProps.sysconfigDeviceSchema,
                nextProps.deviceData
            );
            let { formatPropertyValues, initPropertyValue } = formatDevicePropertySchemaValueForView(
                nextProps.sysconfigDevicePropertySchema,
                nextProps.deviceData
            );
            let { propertyValues, propertyInitValue } = formatDevicePropertyValueForEdit(
                nextProps.sysconfigDeviceTypes,
                nextProps.deviceData
            );
            console.log("devicetypes: ", propertyValues, "devicedata: ", nextProps.deviceData);
            let deviceProperty = nextProps.deviceData.properties;
            let sysconfigDeviceTypeSchema = nextProps.sysconfigDeviceTypeSchema;
            let devicePropertySchema = sysconfigDeviceTypeSchema.deviceproperty;
            let properties = [];
            for (let propertyKey in deviceProperty) {
                let findKey = false;
                let currentSchema = "";
                let property = {};
                for (let i = 0; i < devicePropertySchema.length; i++) {
                    let schema = devicePropertySchema[i];
                    for (let schemaKey in schema) {
                        if (schemaKey === propertyKey) {
                            findKey = true;
                            currentSchema = schema[schemaKey];
                        }
                    }
                }
                if (findKey) {
                    property["displayname"] = currentSchema.displayname;
                    property["value"] = deviceProperty[propertyKey];
                } else {
                    property["displayname"] = propertyKey;
                    property["value"] = deviceProperty[propertyKey];
                }
                properties.push(property);
            }
            let checkChangedObj = {};
            for (let i = 0; i < formatValues.length; i++) {
                let value = formatValues[i];
                checkChangedObj[value.currentKey] = value.defaultValue;
            }
            for (let j = 0; j < formatPropertyValues.length; j++) {
                let value = formatPropertyValues[j];
                checkChangedObj[value.currentKey] = value.defaultValue;
            }
            this.didDetailChanged = false;
            let locationName = nextProps.deviceData["location.name"];
            let addressName = nextProps.deviceData["address.name"];
            let addressId = nextProps.deviceData["address.iotTopologyId"];
            let locationData =
                nextProps.deviceData["location.geometry"] && JSON.parse(nextProps.deviceData["location.geometry"]);
            let coordinates = locationData ? jp.query(locationData, "$..coordinates")[0] : [];
            this.setState(
                Object.assign(
                    this.state,
                    {
                        formatValues: formatValues,
                        properties: properties,
                        initValue: initValue,
                        formatPropertyValues: formatPropertyValues,
                        initPropertyValue: initPropertyValue,
                        checkChangedObj: checkChangedObj,
                        locationName: locationName,
                        addressId: addressId,
                        addressName: addressName,
                        coordinates: coordinates,
                        basicTypeValues: propertyValues,
                        propertyInitValue: propertyInitValue
                    },
                    initValue,
                    initPropertyValue,
                    checkChangedObj,
                    propertyInitValue
                )
            );
        }
    }

    handleButtonClick(type) {
        if (type === "save" && !this.state.currentTab) {
            let initValue = this.state.initValue;
            let initPropertyValue = this.state.initPropertyValue;
            let sysconfigDevicePropertySchema = this.props.sysconfigDevicePropertySchema;
            let checkChangedObj = this.state.checkChangedObj;

            let devicedisplayname = {};
            let locationObj = { add: [], remove: [] };
            let deviceapplication = { add: [], remove: [] };
            if (initValue.devicedisplayname !== checkChangedObj.devicedisplayname) {
                devicedisplayname["physical.displayName"] = initValue.devicedisplayname;
            }
            if (initValue.devicelocationid !== checkChangedObj.devicelocation) {
                locationObj.add.push(initValue.devicelocationid);
                locationObj.remove.push(checkChangedObj.devicelocation);
            } else {
                locationObj = checkChangedObj.devicelocation;
            }
            if (initValue.deviceapplicationid !== checkChangedObj.deviceapplication) {
                deviceapplication.add.push(initValue.deviceapplicationid);
                deviceapplication.remove.push(checkChangedObj.deviceapplication);
            } else {
                deviceapplication = checkChangedObj.deviceapplication;
            }
            let properties = {};
            _.forEach(sysconfigDevicePropertySchema, schema => {
                for (let key in schema) {
                    if (initPropertyValue.hasOwnProperty(key) && initPropertyValue[key] !== checkChangedObj[key]) {
                        properties[key] = initPropertyValue[key];
                    }
                }
            });
            this.props.editDeviceDetail(
                this.props.identify,
                this.props.deviceData["physical.iotTopologyId"],
                devicedisplayname,
                this.props.deviceData["devicemodel.iotTopologyId"],
                deviceapplication,
                locationObj,
                properties
            );
        }
        if (type === "save" && this.state.currentTab) {
            let deviceId = this.props.deviceData["physical.iotTopologyId"];
            let propertyInitValue = this.state.propertyInitValue;
            let changedValue = {};
            for (let key in propertyInitValue) {
                if (propertyInitValue[key] !== this.state[key]) {
                    changedValue[key] = propertyInitValue[key];
                }
            }
            this.props.sendDeviceCommand(this.props.identify, deviceId, changedValue);
        }
        this.props.handleFloatTabClose(this.props.identify);
    }

    liveSearchSelectFunc(schemaKey, iotId) {
        let key = schemaKey + "id";
        let initValue = this.state.initValue;
        let initPropertyValue = this.state.initPropertyValue;
        initValue[key] = iotId;
        initPropertyValue[key] = iotId;
        this.setState(
            Object.assign(this.state, {
                [key]: iotId,
                [schemaKey]: iotId,
                initValue: initValue,
                initPropertyValue: initPropertyValue
            })
        );
        this.checkDetailChanged();
    }

    handleLocationChangedFunc(schemaKey, locationId) {
        let key = schemaKey + "id";
        let initValue = this.state.initValue;
        let initPropertyValue = this.state.initPropertyValue;
        initValue[key] = locationId;
        initPropertyValue[key] = locationId;
        this.setState(
            Object.assign(this.state, {
                [key]: locationId,
                [schemaKey]: locationId,
                initValue: initValue,
                initPropertyValue: initPropertyValue
            })
        );
        this.checkDetailChanged();
    }

    propertyInputSelectChangedFunc(schemaKey, value) {
        let propertyInitValue = this.state.propertyInitValue;
        propertyInitValue[schemaKey] = value;
        this.setState(
            Object.assign(this.state, {
                propertyInitValue: propertyInitValue
            })
        );
        this.checkPropertyChanged();
    }

    checkPropertyChanged() {
        let propertyInitValue = this.state.propertyInitValue;
        let isChanged = false;
        for (let key in propertyInitValue) {
            if (propertyInitValue[key] !== this.state[key]) {
                isChanged = true;
            }
        }
        this.didDetailChanged = isChanged ? true : false;
    }

    inputSelectChangedFunc(schemaKey, value, validateFlag) {
        let initValue = this.state.initValue;
        let initPropertyValue = this.state.initPropertyValue;
        initValue[schemaKey] = value;
        initPropertyValue[schemaKey] = value;
        this.setState(
            Object.assign(this.state, {
                [schemaKey]: value,
                initValue: initValue,
                initPropertyValue: initPropertyValue
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

        this.checkDetailChanged();
    }

    checkDetailChanged() {
        let checkChangedObj = this.state.checkChangedObj;
        let didDetailChanged = false;
        let allRequiredKeys = [];
        let sysconfigDeviceSchema = this.props.sysconfigDeviceSchema;
        let sysconfigDevicePropertySchema = this.props.sysconfigDevicePropertySchema;

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

        for (let key in checkChangedObj) {
            let configKey = key;
            if (configKey === "devicelocation") {
                configKey += "id";
            } else if (configKey === "deviceapplication") {
                configKey += "id";
            }
            if (this.state[configKey] !== checkChangedObj[key]) {
                didDetailChanged = true;
            }
        }

        this.didDetailChanged = isValidate && didDetailChanged && !this.validateCheck.length ? true : false;
    }

    tabPaneClick(event, checkedTab) {
        this.setState({
            currentTab: checkedTab
        });
        this.didDetailChanged = false;
        if (!checkedTab) {
            this.checkDetailChanged();
        } else {
            this.checkPropertyChanged();
        }
    }

    render() {
        const {
            formatValues,
            addressId,
            addressName,
            initValue,
            locationName,
            coordinates,
            formatPropertyValues,
            initPropertyValue,
            basicTypeValues,
            propertyInitValue
        } = this.state;
        const { classes, selectDeviceIcon } = this.props;
        let currentUri = formatIconPath("iconInMap", selectDeviceIcon);
        return (
            <div className="float-tab-cont" style={{ padding: "16px 0 0", height: "calc(100% - 72px)" }}>
                <AppBar position="static" className={classes.root}>
                    <Tabs
                        value={this.state.currentTab}
                        onChange={this.tabPaneClick.bind(this)}
                        indicatorColor="secondary"
                        textColor="secondary"
                        scrollable
                        scrollButtons="auto"
                    >
                        {this.state.tabs.map((item, index) => {
                            return <Tab style={{ minWidth: "100px" }} key={index} label={item.tabDisName} />;
                        })}
                    </Tabs>
                </AppBar>
                <CardContent
                    className="detail-cont"
                    style={{ height: "calc(100% - 120px)", overflowY: "auto", boxShadow: "none" }}
                >
                    {this.state.currentTab === 0 && formatValues ? (
                        <div className="edit-device-detail">
                            {formatValues && (
                                <EditDeviceDetail
                                    identify={this.props.identify}
                                    formatValues={formatValues}
                                    liveSearchSelectFunc={this.liveSearchSelectFunc.bind(this)}
                                    inputSelectChangedFunc={this.inputSelectChangedFunc.bind(this)}
                                    handleLocationChangedFunc={this.handleLocationChangedFunc.bind(this)}
                                    initValue={initValue}
                                    locationName={locationName}
                                    addressName={addressName}
                                    addressId={addressId}
                                    coordinates={coordinates}
                                    showFloatTab={this.props.showFloatTab}
                                    selectAppId={this.props.selectAppId}
                                    selectAppRespath={this.props.selectAppRespath}
                                    deviceIcon={currentUri && currentUri.uri}
                                    hasParentDevice={this.props.hasParentDevice}
                                />
                            )}
                            {formatPropertyValues && (
                                <EditDeviceDetail
                                    identify={this.props.identify}
                                    formatValues={formatPropertyValues}
                                    liveSearchSelectFunc={this.liveSearchSelectFunc.bind(this)}
                                    inputSelectChangedFunc={this.inputSelectChangedFunc.bind(this)}
                                    handleLocationChangedFunc={this.handleLocationChangedFunc.bind(this)}
                                    initValue={initPropertyValue}
                                    locationName={locationName}
                                    addressName={addressName}
                                    addressId={addressId}
                                    coordinates={coordinates}
                                    showFloatTab={this.props.showFloatTab}
                                    selectAppId={this.props.selectAppId}
                                    selectAppRespath={this.props.selectAppRespath}
                                    deviceIcon={currentUri && currentUri.uri}
                                    hasParentDevice={this.props.hasParentDevice}
                                />
                            )}
                        </div>
                    ) : null}
                    {this.state.currentTab === 1 ? (
                        <EditDevicePropertyComp
                            showFloatTab={this.props.showFloatTab}
                            propertyInputSelectChangedFunc={this.propertyInputSelectChangedFunc.bind(this)}
                            basicTypeValues={basicTypeValues}
                            propertyInitValue={propertyInitValue}
                        />
                    ) : null}
                </CardContent>
                <div className="add-device-type-footer">
                    <Button
                        variant="contained"
                        onClick={this.handleButtonClick.bind(this, "save")}
                        color="secondary"
                        disabled={!this.didDetailChanged}
                    >
                        Save
                    </Button>
                    <Button onClick={this.handleButtonClick.bind(this, "cancel")}>Cancel</Button>
                </div>
            </div>
        );
    }
}

EditDeviceComp.propTypes = {};

EditDeviceComp.defaultProps = {};

const filterProps = (state, identify, reducerName, props) => {
    if (state[reducerName] && state[reducerName][identify]) {
        return state[reducerName][identify][props];
    }
};

const mapStateToProps = (state, ownProps) => {
    let identify = ownProps.identify;
    return {
        selectDeviceId: filterProps(state, identify, topoReducerName, "selectDeviceId"),
        deviceData: filterProps(state, identify, topoFloatTabReducer, "deviceData"),
        sysconfigDeviceTypes: filterProps(state, identify, topoReducerName, "sysconfigDeviceTypes"),
        sysconfigDeviceSchema: filterProps(state, identify, topoReducerName, "sysconfigDeviceSchema"),
        sysconfigDeviceTypeSchema: filterProps(state, identify, topoReducerName, "sysconfigDeviceTypeSchema"),
        sysconfigDevicePropertySchema: filterProps(state, identify, topoReducerName, "sysconfigDevicePropertySchema"),
        hasParentDevice: filterProps(state, identify, topoReducerName, "hasParentDevice")
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getDeviceDetail: (deviceId, identify) => {
            dispatch(getDeviceDetail(deviceId, identify));
        },
        editDeviceDetail: (
            identify,
            deviceId,
            deviceDisplayName,
            devicetypeId,
            deviceapplication,
            locationObj,
            properties
        ) => {
            dispatch(
                editDeviceDetail(
                    identify,
                    deviceId,
                    deviceDisplayName,
                    devicetypeId,
                    deviceapplication,
                    locationObj,
                    properties
                )
            );
        },
        sendDeviceCommand: (identify, deviceId, changedValue) => {
            dispatch(sendDeviceCommand(identify, deviceId, changedValue));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(EditDeviceComp));
