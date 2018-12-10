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

import _ from "lodash";

const projectImgs = {
    iconInTopology: [
        {
            uri: require("modules/topologyManagement/topologyMgmtFloatTab/images/default_status_offline.png"),
            title: "default",
            alt: "default"
        },
        {
            uri: require("modules/topologyManagement/topologyMgmtFloatTab/images/electric_submeter_status_offline.png"),
            title: "electric_submeter",
            alt: "electric_submeter"
        },
        {
            uri: require("modules/topologyManagement/topologyMgmtFloatTab/images/environment_sensor_status_offline.png"),
            title: "environment_sensor",
            alt: "environment_sensor"
        },
        {
            uri: require("modules/topologyManagement/topologyMgmtFloatTab/images/inverter_status_offline.png"),
            title: "inverter",
            alt: "inverter"
        },
        {
            uri: require("modules/topologyManagement/topologyMgmtFloatTab/images/IOT_claritasCamera_status_offline.png"),
            title: "IOT_claritasCamera",
            alt: "IOT_claritasCamera"
        },
        {
            uri: require("modules/topologyManagement/topologyMgmtFloatTab/images/IOT_tempHumid_sensor_status_offline.png"),
            title: "IOT_tempHumid_sensor",
            alt: "IOT_tempHumid_sensor"
        },
        {
            uri: require("modules/topologyManagement/topologyMgmtFloatTab/images/IOT_tempPressure_status_offline.png"),
            title: "IOT_tempPressure",
            alt: "IOT_tempPressure"
        },
        {
            uri: require("modules/topologyManagement/topologyMgmtFloatTab/images/irradiance_status_offline.png"),
            title: "irradiance",
            alt: "irradiance"
        },
        {
            uri: require("modules/topologyManagement/topologyMgmtFloatTab/images/lift_status_offline.png"),
            title: "lift",
            alt: "lift"
        },
        {
            uri: require("modules/topologyManagement/topologyMgmtFloatTab/images/pwaste_collection_status_offline.png"),
            title: "pwaste_collection",
            alt: "pwaste_collection"
        },
        {
            uri: require("modules/topologyManagement/topologyMgmtFloatTab/images/smartlock_status_offline.png"),
            title: "smartlock",
            alt: "smartlock"
        },
        {
            uri: require("modules/topologyManagement/topologyMgmtFloatTab/images/structure_status_offline.png"),
            title: "structure",
            alt: "structure"
        },
        {
            uri: require("modules/topologyManagement/topologyMgmtFloatTab/images/temp_status_offline.png"),
            title: "temp",
            alt: "temp"
        },
        {
            uri: require("modules/topologyManagement/topologyMgmtFloatTab/images/waterpump_status_offline.png"),
            title: "waterpump",
            alt: "waterpump"
        },
        {
            uri: require("modules/topologyManagement/topologyMgmtFloatTab/images/water_submeter_status_offline.png"),
            title: "water_submeter",
            alt: "water_submeter"
        }
    ],
    iconInMap: [
        {
            uri: require("modules/topologyManagement/topologyMgmtFloatTab/images/default_location_status_offline.png"),
            title: "default",
            alt: "default"
        },
        {
            uri: require("modules/topologyManagement/topologyMgmtFloatTab/images/electric_submeter_location_status_offline.png"),
            title: "electric_submeter",
            alt: "electric_submeter"
        },
        {
            uri: require("modules/topologyManagement/topologyMgmtFloatTab/images/environment_sensor_location_status_offline.png"),
            title: "environment_sensor",
            alt: "environment_sensor"
        },
        {
            uri: require("modules/topologyManagement/topologyMgmtFloatTab/images/inverter_location_status_offline.png"),
            title: "inverter",
            alt: "inverter"
        },
        {
            uri: require("modules/topologyManagement/topologyMgmtFloatTab/images/IOT_claritasCamera_location_status_offline.png"),
            title: "IOT_claritasCamera",
            alt: "IOT_claritasCamera"
        },
        {
            uri: require("modules/topologyManagement/topologyMgmtFloatTab/images/IOT_tempHumid_sensor_location_status_offline.png"),
            title: "IOT_tempHumid_sensor",
            alt: "IOT_tempHumid_sensor"
        },
        {
            uri: require("modules/topologyManagement/topologyMgmtFloatTab/images/IOT_tempPressure_location_status_offline.png"),
            title: "IOT_tempPressure",
            alt: "IOT_tempPressure"
        },
        {
            uri: require("modules/topologyManagement/topologyMgmtFloatTab/images/irradiance_location_status_offline.png"),
            title: "irradiance",
            alt: "irradiance"
        },
        {
            uri: require("modules/topologyManagement/topologyMgmtFloatTab/images/lift_location_status_offline.png"),
            title: "lift",
            alt: "lift"
        },
        {
            uri: require("modules/topologyManagement/topologyMgmtFloatTab/images/pwaste_collection_location_status_offline.png"),
            title: "pwaste_collection",
            alt: "pwaste_collection"
        },
        {
            uri: require("modules/topologyManagement/topologyMgmtFloatTab/images/smartlock_location_status_offline.png"),
            title: "smartlock",
            alt: "smartlock"
        },
        {
            uri: require("modules/topologyManagement/topologyMgmtFloatTab/images/structure_location_status_offline.png"),
            title: "structure",
            alt: "structure"
        },
        {
            uri: require("modules/topologyManagement/topologyMgmtFloatTab/images/temp_location_status_offline.png"),
            title: "temp",
            alt: "temp"
        },
        {
            uri: require("modules/topologyManagement/topologyMgmtFloatTab/images/waterpump_location_status_offline.png"),
            title: "waterpump",
            alt: "waterpump"
        },
        {
            uri: require("modules/topologyManagement/topologyMgmtFloatTab/images/water_submeter_location_status_offline.png"),
            title: "water_submeter",
            alt: "water_submeter"
        }
    ]
};

// const formatIconPath = (iconType, status) => {
//     if (iconType) {
//         return `modules/topologyManagement/topologyMgmtFloatTab/images/${iconType}_status_${status.toLowerCase()}.png`;
//     } else {
//         let iconPath = [];
//         _.forEach(iconTypes, type => {
//             let path = `modules/topologyManagement/topologyMgmtFloatTab/images/${type}_status_offline.png`;
//             iconPath.push(path);
//         });
//         return iconPath;
//     }
// };

const formatIconPath = (iconType, iconName) => {
    let currentUri = null;
    let imgsArray = projectImgs[iconType] || [];
    _.forEach(imgsArray, icon => {
        if (icon.title === iconName) {
            currentUri = icon;
        }
    });
    return currentUri;
};

const allIconPath = () => {
    return projectImgs["iconInTopology"] || [];
};

export { formatIconPath, allIconPath };
