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
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { connect } from "react-redux";
import { openFloatTab } from "../funcs/actions";
import TopologyConfig from "../../topologyConfig";
import Typography from "@material-ui/core/Typography";
import jp from "jsonpath";

class TopologyCard extends React.Component {
    renderSeverityColor(sensorStatus) {
        let sensorStatusConfig = TopologyConfig.sensorStatus;
        let statusColor = "";
        let status = sensorStatus[0];
        if (!status) {
            status = "Unknown Error";
        }
        for (let i = 0; i < sensorStatusConfig.length; i++) {
            if (sensorStatusConfig[i].statusDisplayName === status) {
                statusColor = sensorStatusConfig[i].statusColor;
            }
        }
        return (
            <div
                className="sensor-status"
                title={status}
                style={{
                    backgroundColor: statusColor
                }}
            />
        );
    }

    renderDeviceProperty(data) {
        let deviceTypeConfig = TopologyConfig.DeviceTypeConfig;
        let currentDeviceType = null;
        for (let key in deviceTypeConfig) {
            if (key === data["devicetype.displayName"]) {
                currentDeviceType = deviceTypeConfig[key];
            }
        }
        if (!currentDeviceType) {
            return;
        }
        let displayKeys = currentDeviceType.key;
        let show = "";
        for (let i = 0; i < displayKeys.length; i++) {
            let value = "";
            if (displayKeys[i]["keyJSONPath"]) {
                value = jp.query(data, displayKeys[i]["keyJSONPath"]);
            }
            if (displayKeys[i]["unitJSONPath"]) {
                value += jp.query(data, displayKeys[i]["unitJSONPath"]);
            }
            if (value && i < displayKeys.length - 1) {
                value += " / ";
            }
            if (value) {
                show += value;
            }
        }
        return show;
    }

    cardClick(data) {
        let deviceId = data["physical.iotTopologyId"];
        let resourcePath = data["physical.resourcePath"];
        // let geo = JSON.parse(record.Geo).features[0].geometry.coordinates;
        let geo = null;
        let selectDeviceName = data["physical.displayName"];
        this.props.openFloatTab(deviceId, resourcePath, geo, selectDeviceName, this.props.identify);
    }

    render() {
        let { data } = this.props;
        let cardViewDataMapping = TopologyConfig.cardViewDataMapping;
        return (
            <div className="topology-card-wrap">
                <Card onClick={this.cardClick.bind(this, data)} className="topology-card">
                    <CardContent style={{ padding: 0 }}>
                        {this.renderSeverityColor(jp.query(data, cardViewDataMapping.sensorStatus["jsonpath"]))}
                        <Typography variant="subtitle1" gutterBottom style={{ paddingTop: "24px" }}>
                            {jp.query(data, cardViewDataMapping.deviceTypeName["jsonpath"])}
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            {jp.query(data, cardViewDataMapping.deviceDisplayName["jsonpath"])}
                        </Typography>
                        <Typography variant="p" gutterBottom>
                            {this.renderDeviceProperty(data)}
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        openFloatTab: (deviceId, resourcePath, geo, deviceName, identify) => {
            dispatch(openFloatTab(deviceId, resourcePath, geo, deviceName, identify));
        }
    };
};

export default connect(
    null,
    mapDispatchToProps
)(TopologyCard);
