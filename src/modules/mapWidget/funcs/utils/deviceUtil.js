/*
* =========================================================================
*  Copyright (C)2018 NCS Pte. Ltd. All Rights Reserved
*
*  This software is confidentifyential and proprietary to NCS Pte. Ltd. You shall
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
 * Created by Deng Xiaolong on 28/05/2018.
 */

import { map_ } from "modules/map";
import { formatIconPath } from "modules/topologyManagement";
import jp from "jsonpath";

// device judge the location data status
export const deviceJudgementLocation = (areas) => {
    return areas && areas.features && areas.features[0] &&
        areas.features[0].geometry && areas.features[0].geometry.coordinates;
};

// get the device icon from system config
export const getIconFromSysConfig = (data) => {
    const obj = {};
    data.forEach((item) => {
        const jpResult = jp.query(JSON.parse(item.configvals[0].configval), "$..additionalProperty.icon");
        if (jpResult.length) {
            obj[item.configname] = jpResult[0] || "default";
        }
    });
    return obj;
};

// handle the device data to get the location data for map
export const handleDevicesForLocation = (dataArr = [], sysConfig) => {
    if (Object.prototype.toString.call(dataArr) !== "[object Array]") {
        throw new Error(`${dataArr} is not an array`);
    }
    const dataObj = {};
    dataArr.forEach(item => {
        const locationGeometry = item["location.geometry"];
        if (locationGeometry && deviceJudgementLocation(JSON.parse(locationGeometry))) {
            const center = JSON.parse(locationGeometry).features[0].geometry.coordinates;
            dataObj[center.join(",")] = {
                label: dataArr.filter(itemIn => {
                    const locationGeometryIn = itemIn["location.geometry"];
                    if (locationGeometryIn && deviceJudgementLocation(JSON.parse(locationGeometryIn))) {
                        return center.join(",") ===
                            JSON.parse(locationGeometryIn).features[0].geometry.coordinates.join(",");
                    }
                    return "";
                }).map(itemMap => {
                    if (itemMap) {
                        return itemMap["physical.displayName"];
                    }
                    return "";
                }).join(","),
                information: dataArr.filter(itemIn => {
                    const locationGeometryIn = itemIn["location.geometry"];
                    if (locationGeometryIn && deviceJudgementLocation(JSON.parse(locationGeometryIn))) {
                        return center.join(",") ===
                            JSON.parse(locationGeometryIn).features[0].geometry.coordinates.join(",");
                    }
                    return "";
                }).map(itemMap => {
                    if (itemMap) {
                        const creationDateTime = itemMap["physical.creationDateTime"];
                        const lastUpdDateTime = itemMap["physical.lastUpdDateTime"];
                        return {
                            Icon: formatIconPath("iconInMap", getIconFromSysConfig(sysConfig)[item["devicemodel.iotTopologyId"]]).title ||
                                formatIconPath("iconInMap", "default").title,
                            DeviceModel: itemMap["devicemodel.name"] || "-",
                            DisplayName: itemMap["physical.displayName"] || "-",
                            Format: itemMap["physical.format"] || "-",
                            IotTopologyId: itemMap["physical.iotTopologyId"] || "-",
                            Name: itemMap["physical.name"] || "-",
                            NodeId: itemMap["physical.nodeId"] || "-",
                            ResourcePath: itemMap["physical.resourcePath"] || "-",
                            CreateDateTime: creationDateTime ? map_.handleDate(creationDateTime) : "-",
                            LastUpdateDateTime: lastUpdDateTime ? map_.handleDate(lastUpdDateTime) : "-"
                        };
                    }
                    return "";
                }),
                id: center.join(","),
                center,
                type: item["devicemodel.name"],
                deviceIcon: formatIconPath("iconInMap", getIconFromSysConfig(sysConfig)[item["devicemodel.iotTopologyId"]]) ||
                    formatIconPath("iconInMap", "default"),
                deviceIconColor: "red"
            };
        }
    });
    return Object.values(dataObj);
};

// handle data to get all devices type data
export const getDevicesTypeForLocation = (dataArr = []) => {
    if (Object.prototype.toString.call(dataArr) !== "[object Array]") {
        throw new Error(`${dataArr} is not an array`);
    }
    const deviceTypeData = [];
    dataArr.forEach(item => {
        const locationGeometry = item["location.geometry"];
        if (locationGeometry && deviceJudgementLocation(JSON.parse(locationGeometry))) {
            if (item["devicemodel.name"]) {
                deviceTypeData.push(item["devicemodel.name"]);
            }
        }
    });
    return deviceTypeData;
};
