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
import { reducerName as topoReducerName } from "modules/topologyManagement/topologyMgmtGrid";
import { REDUCER_NAME as topoFloatTabReducer } from "../funcs/constants";
import { formatDeviceSchemaValueForView } from "../funcs/renderSchema";
import { getDeviceDetail } from "../funcs/actions";
import ViewDeviceDetial from "./viewDeviceDetail";
import PropertyDetail from "./propertyDetail";
import jp from "jsonpath";
// import { MapApplication } from "modules/map";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import CardContent from "@material-ui/core/Card";
import AppBar from "@material-ui/core/AppBar";
import { withStyles } from "@material-ui/core/styles";
import { formatIconPath } from "modules/topologyManagement/topologyMgmtFloatTab/funcs/iconsNew";
const styles = theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary
    }
});

class ViewDeviceComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabs: [{ tabDisName: "Device Info" }, { tabDisName: "Properties" }],
            currentTab: 0,
            anchor: "right"
        };
    }
    componentDidMount() {
        this.componentWillReceiveProps(this.props);
        this.props.getDeviceDetail(this.props.selectDeviceId, this.props.identify);
    }

    componentWillReceiveProps(nextProps) {
        // get current selected device detail
        if (this.props.selectDeviceId !== nextProps.selectDeviceId && nextProps.selectDeviceId) {
            this.props.getDeviceDetail(nextProps.selectDeviceId, this.props.identify);
        }

        if (nextProps.sysconfigDeviceSchema && nextProps.deviceData) {
            let { formatValues } = formatDeviceSchemaValueForView(
                nextProps.sysconfigDeviceSchema,
                nextProps.deviceData,
                "view"
            );
            let coordinates = jp.query(JSON.parse(nextProps.deviceData["location.geometry"]), "$..coordinates")[0];
            let locationName = nextProps.deviceData["location.displayName"];
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
            this.setState(
                Object.assign(this.state, {
                    formatValues: formatValues,
                    properties: properties,
                    coordinates: coordinates,
                    locationName: locationName
                })
            );
        }
    }

    tabPaneClick(event, checkedTab) {
        this.setState({
            currentTab: checkedTab
        });
    }

    render() {
        const { formatValues, properties, coordinates, locationName } = this.state;
        const { classes, selectDeviceIcon } = this.props;
        let currentUri = formatIconPath("iconInMap", selectDeviceIcon);
        const dataSource = [
            {
                center: coordinates,
                id: coordinates && `${coordinates[0]},${coordinates[1]}`,
                lable: locationName,
                icon: "",
                iconImg: "saticImg",
                imgPath: currentUri && currentUri.uri
            }
        ];
        return (
            <div className="float-tab-cont" style={{ padding: "16px 0 0", height: "calc(100% - 72px)" }}>
                <div style={{ height: "100%" }}>
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
                    <CardContent className="detail-cont" style={{ height: "calc(100% - 48px)", overflowY: "auto" }}>
                        {this.state.currentTab === 0 && formatValues ? (
                            <ViewDeviceDetial
                                formatValues={formatValues}
                                coordinates={coordinates}
                                locationName={locationName}
                                dataSource={dataSource}
                            />
                        ) : null}
                        {this.state.currentTab === 1 && properties ? <PropertyDetail properties={properties} /> : null}
                    </CardContent>
                    {/* {formatValues && (
                        <ViewDeviceDetial
                            formatValues={formatValues}
                            coordinates={coordinates}
                            locationName={locationName}
                        />
                    )}
                    {coordinates && (
                        <div style={{ height: "250px", padding: "0 24px" }}>
                            <MapApplication
                                identify={this.props.mapIdentify}
                                dataSource={dataSource}
                                zoom={12}
                                center={coordinates}
                                needToolBar={false}
                            />
                        </div>
                    )} */}
                    {/* {properties && <PropertyDetail properties={properties} />} */}
                </div>
            </div>
        );
    }
}

ViewDeviceComp.propTypes = {};

ViewDeviceComp.defaultProps = {
    mapIdentify: "map-identify",
    currentTab: 0
};

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
        sysconfigDeviceSchema: filterProps(state, identify, topoReducerName, "sysconfigDeviceSchema"),
        sysconfigDeviceTypeSchema: filterProps(state, identify, topoReducerName, "sysconfigDeviceTypeSchema")
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getDeviceDetail: (deviceId, identify) => {
            dispatch(getDeviceDetail(deviceId, identify));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(ViewDeviceComp));
