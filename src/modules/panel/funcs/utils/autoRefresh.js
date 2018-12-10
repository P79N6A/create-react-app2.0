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
import { c_ } from "modules/mapAndPanelCommon";
export const wsConstKey = "header-category";

// compare whether the target date between the another date
export const isDateMatch = (timeArr, targetDate, mode) => {
    if ("realTime" === mode) {
        return true;
    } else if ("dateTime" === mode) {
        const timeStart = new Date(timeArr[0]).getTime();
        const timeEnd = new Date(timeArr[1]).getTime();
        const timeTarget = new Date(targetDate).getTime();
        return timeTarget >= timeStart && timeTarget <= timeEnd;
    }
};

// compare whether another condition is equal to the websocket message
export const isConditionMatch = (itemData, wsMessage) => {
    if ("Alarm Panel" === itemData.type) {
        if ("All" === itemData.parameters.alarmType) {
            return true;
        } else if ("Alarm Type" === itemData.parameters.alarmType) {
            return !!itemData.parameters.choosedFilters.includes(wsMessage.data.alarmtype);
        } else if ("Alarm Severity" === itemData.parameters.alarmType) {
            return !!handleSeverityToNum(itemData.parameters.choosedFilters).includes(wsMessage.data.severity);
        } else if ("Alarm State" === itemData.parameters.alarmType) {
            return !!itemData.parameters.choosedFilters.includes(wsMessage.data.state);
        }
    } else if ("Event Panel" === itemData.type) {
        if ("All" === itemData.parameters.eventType) {
            return true;
        } else {
            return !!itemData.parameters.choosedFilters.includes(wsMessage.data.eventtype);
        }
    }
};

// handle the severity from word to number string
function handleSeverityToNum(severity) {
    return severity.map(item => item === "critical" ? "1" :
        item === "major" ? "2" :
            item === "minor" ? "3" :
                item === "info" ? "4" :
                    item === "unknown" ? "5" : item
    );
}

// device reading condition handle
export const isDeviceReadingRefresh = (data, wsMessage) => {
    if (data.editer === "edited" && wsMessage && c_.JS(wsMessage) !== "{}") {
        // data.parameters.deviceid
        if (wsMessage[wsConstKey] && wsMessage[wsConstKey].toLowerCase().indexOf("event") !== -1) {
            if (wsMessage.data && wsMessage.data.parameters && wsMessage.data.parameters.deviceid) {
                return true;
            }
        }
    }
    return false;
};

// device condition handle
export const isDeviceRefresh = (wsMessage) => {
    return wsMessage && wsMessage.data && wsMessage.data.eventtype && (wsMessage.data.eventtype.toLowerCase().indexOf("create_device") !== -1 || wsMessage.data.eventtype.toLowerCase().indexOf("delete_device") !== -1);
};
