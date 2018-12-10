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

import { handleCoordinate } from "modules/mapAndPanelCommon/funcs/utils";
import L from "leaflet";
let marker = null;

function handleMapMessage (basicMapMessage) {
    if (basicMapMessage && "{}" !== JSON.stringify(basicMapMessage)) {
        if ("ISC_MSG_BUS" === basicMapMessage["header-category"]) {
            if (basicMapMessage.data && "deviceLocInMap" === basicMapMessage.data.topic) {
                if (basicMapMessage.data.data) {
                    return basicMapMessage.data.data.map(item => item.locateData);
                    // return basicMapMessage.data.data[0].locateData;
                }
            }
        } else {
            return null;
        }
    }
};


function getReducerName (data) {
    if (handleMapMessage(data)) {
        const basicMapMessage = handleMapMessage(data);
        if (basicMapMessage[0] && basicMapMessage[0].identify && basicMapMessage[0].reducerName ) {
            const { reducerName } = basicMapMessage[0];
            return reducerName;
        }
    } else {
        return null;
    }
};

export const handleBasicMapMessage = (data, storeData) => {
    const reducerName = getReducerName(data);
    let props = null;
    if (reducerName) {
        if (storeData && storeData[reducerName]) {
            props = storeData[reducerName];
            if (handleMapMessage(data)) {
                const basicMapMessage = handleMapMessage(data);
                if (basicMapMessage[0] && basicMapMessage[0].identify && basicMapMessage[0].nodeName ) {
                    const { nodeName, identify } = basicMapMessage[0];
                    if (props[identify]) {
                        if (Array.isArray(props[identify][nodeName])) {
                            return props[identify][nodeName];
                        } else {
                            return [props[identify][nodeName]];
                        }
                    }
                    return null;
                }
            } else {
                return null;
            }
        } else {
            return null;
        }
    } else {
        return null;
    }
};

export const formatCoordinate = (layer) => {
    const defaultData = {format: "point", geometrytype: 1};
    if (typeof layer.getLatLng === "function") {
        const locationArray = layer.getLatLng();
        const x = locationArray.lng;
        const y = locationArray.lat;
        const radius = layer.getRadius();
        return {
            radius,
            centerpoint: [Object.assign({}, {x, y}, defaultData)]
        };
    } else if (typeof layer.getLatLngs === "function") {
        const locationArray = layer.getLatLngs()[0];
        let polygonArray = [];
        let midArray = {};
        for(let i =0; i < locationArray.length; i++){
            const x = locationArray[i].lng;
            const y = locationArray[i].lat;
            midArray.x = x;
            midArray.y = y;
            polygonArray.push(Object.assign({}, midArray, defaultData));
            midArray = {};
        }
        return {
            boundingbox: {
                format: "polygon",
                geometrytype: 2,
                points: polygonArray
            }
        };
    } else {
        return [];
    }
};

export const removerMarker = (data) => {
    if (!marker) {
        const label = data.deviceName;
        marker = L.marker(handleCoordinate(data.coordinates),
            {icon: L.MaterialIconWithLabel.icon(
                {icon: data.icon || "place", markerColor: "red", label}
            )});
    }
    return marker;
};
