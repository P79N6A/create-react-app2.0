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

import {
    ISC_ACCOUNT_INFO
} from "commons/constants/const";
import moment from "moment";
import { FullScreenButton } from "modules/ccms/components";
import React from "react";
import L from "leaflet";
import _ from "lodash";
import "./material-icon-label";
import { setPopupInner } from "./popupUtils";

import { defaultMapData } from "./data";

const hereMapConfig = {
    app_id: "fLbvA2IaVkNEBMyJVqTM",
    app_code: "VDhnCa4K3LMw5ores84YYw"
};

// get country center coordinate buy country name and country data
function getCenter(country, countryData) {
    for (const value of countryData) {
        if (value.countryName === country) {
            return value.center;
        }
    }
}

// judge if the full screen button is needed
export const fullScreen = (props, editer = "editing") => {
    return editer === "editedd" ? [<FullScreenButton {...props} />] : null;
};

// get default map config from settings.json
export const getMapConfig = () => {
    let mapConfig = {};
    let accountLocation = {};
    const accountData = JSON.parse(sessionStorage.getItem(ISC_ACCOUNT_INFO));
    const settingData = defaultMapData;

    if (accountData.location && /^{/.test(accountData.location) && _.isObject(JSON.parse(accountData.location))) {
        const locationData = JSON.parse(accountData.location);
        const { center, zoom, layer } = locationData;
        if (center && center.length) {
            accountLocation.center = center;
        } else {
            accountLocation.center = getCenter(settingData.country, settingData.countryData);
        }
        if (zoom) {
            accountLocation.zoom = zoom;
        } else {
            accountLocation.zoom = settingData.zoom;
        }
        if (layer) {
            accountLocation.layer = layer;
        } else {
            accountLocation.layer = settingData.layer;
        }
    } else {
        const {
            country,
            countryData,
            zoom,
            layer
        } = settingData;
        accountLocation.zoom = zoom;
        accountLocation.center = getCenter(country, countryData);
        accountLocation.layer = layer;
    }

    if (settingData && settingData.country) {
        const {
            country,
            countryData,
            layerList
        } = settingData;
        mapConfig = {
            zoom: accountLocation.zoom,
            layerConfig: hereMapConfig,
            center: accountLocation.center,
            layer: accountLocation.layer,
            layerList,
            country,
            countryData
        };
    }
    return mapConfig;
};

export const getCountryList = (data = getMapConfig()) => {
    let result = [];
    data.countryData.forEach(item => {
        result.push(item.countryName);
    });
    return result;
};

export const getDefaultCenter = (data = getMapConfig()) => {
    return getCenter(data.country, data.countryData);
};

export const calacCenter = (country, data = getMapConfig()) => {
    return getCenter(country, data.countryData);
};

/**
 * @export
 * @param {array} center
 * @returns
 */
// handle the coordinate style from our system for the leaflet map
export const handleCoordinate = (center) => {
    if (!Array.isArray(center)) {
        throw new Error(`${center} is not an array`);
    } else {
        if (center.length >= 2) {
            return {
                lat: center[1],
                lng: center[0]
            };
        } else {
            return {
                lat: 0,
                lng: 0
            };
        }
    }
};

/**
 * @export
 * @returns
 * @param {string} label
 */
// label util to handle the label name too long
const labelHandle = (label) => {
    if (label && label.length) {
        return label.length > 24 ? `${label.substring(0, 24)}...` : label;
    } else {
        return "";
    }
};

/**
 * @export
 * @returns
 * @param {string} icon
 * @param {string} markerColor
 * @param {string} label
 * @param {string} iconImg
 * @param {string} imgPath
 * @param {string} title
 */
// add the customized icon and image icon in the map
export const addMarker = (icon, markerColor, label, iconImg, imgPath, title = "") => {
    return {
        icon: L.MaterialIconWithLabel.icon(
            {
                icon: icon || "place",
                markerColor: markerColor || "red",
                label: labelHandle(label),
                iconImg: iconImg || "saticImg",
                imageUrl: imgPath || "",
                title
            }
        )
    };
};

/**
 * @export
 * @returns
 * @param {string} date
 */
// handle date type
export const handleDate = (date) => {
    return moment(date).format("HH:mm:ss DD-MMM-YYYY");
};

const map_ = {
    getMapConfig,
    handleCoordinate,
    addMarker,
    setPopupInner,
    handleDate,
    fullScreen,
};

export { map_ };