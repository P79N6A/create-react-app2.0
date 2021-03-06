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
import { REDUCER_NAME as topoFloatTabReducer } from "../funcs/constants";
import { getDeviceDetail, setFloatTabTitle, storeDeviceLocation } from "../funcs/actions";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import DetailFilter from "./detailFilter";
import { loopSearchDeviceData } from "../funcs/floatTabDataFunc";
import jp from "jsonpath";
import { reducerName as topoReducerName } from "modules/topology/topologyGrid";
import { reducerName as topoFloatTabReducerName } from "modules/topology/topologyFloatTab";
import _ from "lodash";
import * as msg from "commons/utils/messageBus";
import store from "commons/store";
import { formatDeviceSchemaValueForView } from "../funcs/renderSchema";
import IconButton from "@material-ui/core/IconButton";
import LocationIcon from "@material-ui/icons/LocationOn";
import Tooltip from "@material-ui/core/Tooltip";
import { withStyles } from "@material-ui/core/styles";
import { formatIconPath } from "modules/topologyManagement/topologyMgmtFloatTab/funcs/iconsNew";

const coordinatesPath = "$..coordinates";

const styles = Theme => ({
    headerBG: {
        backgroundColor: Theme.palette.primary.light
    }
});

class DeviceDetailList extends React.Component {
    componentWillReceiveProps(nextProps) {
        if (nextProps.index !== parseInt(nextProps.currentTab, 10) || nextProps.getDetailSuccess) {
            return;
        }
        this.searchDeviceDetail(nextProps);
    }

    componentDidMount() {
        this.searchDeviceDetail(this.props);
        store.dispatch(msg.subscribe("deviceLocInMap", "ISC_MSG_BUS", "deviceLocInMap"));
    }

    searchDeviceDetail(props) {
        let deviceId = props.selectDeviceId;
        if (!deviceId) {
            return;
        }
        this.props.setFloatTabTitle(props.identify, "Device Detail");
        this.props.getDeviceDetail(deviceId, this.props.identify);
    }

    handleShowLocationFunc() {
        let deviceData = this.props.deviceData;
        let sysconfigDevicetypes = this.props.sysconfigDevicetypes;
        const path = "$..configvals[*].configval";
        const iconPath = "$..additionalProperty.icon";
        let icon = "";

        _.forEach(sysconfigDevicetypes, devicetype => {
            if (devicetype.configname === deviceData["devicemodel.iotTopologyId"]) {
                icon = jp.query(JSON.parse(jp.query(devicetype, path)[0]), iconPath)[0];
            }
        });
        let imgPath = formatIconPath("iconInMap", icon);
        let locateData = {
            deviceName: deviceData["location.displayName"],
            coordinates: deviceData["location.geometry"]
                ? jp.query(JSON.parse(deviceData["location.geometry"]), coordinatesPath)[0]
                : [],
            icon: "",
            iconImg: "saticImg",
            imgPath: imgPath && imgPath.uri,
            identify: this.props.identify,
            reducerName: topoFloatTabReducerName,
            nodeName: "deviceLocation"
        };
        this.props.storeDeviceLocation(this.props.identify, locateData);
        this.props.showDeviceLocationInMap(locateData);
    }

    renderDeviceData() {
        let deviceData = JSON.parse(JSON.stringify(this.props.deviceData).slice(0));
        if (!deviceData) {
            return;
        }
        // let configMapping = ConfigMapping.slice(0);
        // let prepareData = prepareDetailData(deviceData, configMapping);

        let { formatValues } = formatDeviceSchemaValueForView(this.props.sysconfigDeviceSchema, deviceData, "view");
        let deviceProperty = this.props.deviceData.properties;
        let sysconfigDeviceTypeSchema = this.props.sysconfigDeviceTypeSchema;
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

        let deviceDataCopy = [];
        let propertyCopy = [];
        let detailSearchWord = this.props.detailSearchWord && this.props.detailSearchWord.slice(0);

        if (detailSearchWord) {
            loopSearchDeviceData(formatValues, detailSearchWord.toLowerCase(), deviceDataCopy);
            loopSearchDeviceData(properties, detailSearchWord.toLowerCase(), propertyCopy);
            formatValues = deviceDataCopy;
            properties = propertyCopy;
        }

        const { classes } = this.props;
        return (
            <div>
                <ul style={{ padding: 0 }}>
                    <ListSubheader className={classes.headerBG}>Device Info</ListSubheader>
                    {formatValues &&
                        formatValues.map((config, index) => {
                            let locate = false;
                            if (config.displayname === "Location") {
                                locate = true;
                            }
                            return (
                                <ListItem button key={index}>
                                    <ListItemText
                                        primary={<span className="topology-pre">{config["defaultValue"] || ""}</span>}
                                        secondary={<span className="topology-pre">{config.displayname}</span>}
                                        title={config["defaultValue"] || ""}
                                        style={{ wordBreak: "break-all", userSelect: "text" }}
                                    />
                                    {locate ? (
                                        <Tooltip title="Location">
                                            <IconButton
                                                aria-label="Location"
                                                onClick={this.handleShowLocationFunc.bind(this)}
                                            >
                                                <LocationIcon />
                                            </IconButton>
                                        </Tooltip>
                                    ) : null}
                                </ListItem>
                            );
                        })}
                </ul>
                <ul style={{ padding: 0 }}>
                    <ListSubheader className={classes.headerBG}>Property</ListSubheader>
                    {properties &&
                        properties.map((config, index) => {
                            let keyValue = config.displayname;
                            return (
                                <ListItem button key={index}>
                                    <ListItemText
                                        primary={config["value"] || ""}
                                        secondary={keyValue}
                                        title={config["value"] || ""}
                                        style={{ wordBreak: "break-all" }}
                                    />
                                </ListItem>
                            );
                        })}
                </ul>
            </div>
        );
    }

    render() {
        return (
            <div className="detail-expand-card">
                <ListItem>
                    <DetailFilter identify={this.props.identify} />
                </ListItem>
                <div className="detail-cont-list">
                    {/* <CardWithTitle title={this.props.selectDeviceName} style={{ height: "auto" }} /> */}
                    <List subheader={<li />}>
                        <li>{this.props.deviceData && this.props.sysconfigDeviceSchema && this.renderDeviceData()}</li>
                    </List>
                </div>
            </div>
        );
    }
}

const filterProps = (state, identify, reducerName, props) => {
    if (state[reducerName] && state[reducerName][identify]) {
        return state[reducerName][identify][props];
    }
};

const mapStateToProps = (state, ownProps) => {
    let identify = ownProps.identify;
    return {
        deviceData: filterProps(state, identify, topoFloatTabReducer, "deviceData"),
        getDetailSuccess: filterProps(state, identify, topoFloatTabReducer, "getDetailSuccess"),
        detailSearchWord: filterProps(state, identify, topoFloatTabReducer, "detailSearchWord"),
        sysconfigDevicetypes: filterProps(state, identify, topoReducerName, "sysconfigDeviceTypes"),
        sysconfigDeviceSchema: filterProps(state, identify, topoReducerName, "sysconfigDeviceSchema"),
        sysconfigDeviceTypeSchema: filterProps(state, identify, topoReducerName, "sysconfigDeviceTypeSchema")
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getDeviceDetail: (deviceId, identify) => {
            dispatch(getDeviceDetail(deviceId, identify));
        },
        setFloatTabTitle: (identify, title) => {
            dispatch(setFloatTabTitle(identify, title));
        },
        storeDeviceLocation: (identify, locateData) => {
            dispatch(storeDeviceLocation(identify, locateData));
        },
        showDeviceLocationInMap: locateData => {
            dispatch(msg.publish("deviceLocInMap", "ISC_MSG_BUS", [{ locateData: locateData }], "deviceLocInMap"));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(DeviceDetailList));
