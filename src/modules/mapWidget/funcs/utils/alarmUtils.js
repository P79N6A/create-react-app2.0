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

const result = {
    type: [],
    severity: [],
    state: []
};
const getAlarmParameters = (type, arr) => {
    switch (type) {
        case "type":
            result.type = arr;
            return result;
        case "severity":
            result.severity = arr;
            return result;
        case "state":
            result.state = arr;
            return result;
        default:
            return {};
    }
};

function handleSeverity(severity) {
    switch (severity) {
        case "Critical":
            return "1";
        case "Major":
            return "2";
        case "Minor":
            return "3";
        case "info":
            return "4";
        default:
            return "5";
    }
}
// const data  = {
//     severity:["Critical", "Major", "Minor","info"], // 1 2 3 4
//     state:["unowned", "owned", "resolved", "cancelled", "closed"],
//     type:["end with", "equals", "in", "start with", "like"]
// };

const type = result => {
    const typeData = result.type.map(item => {
        return {
            field: "capalarm.alarmtype",
            operator: "EQ",
            value: item
        };
    });
    const operator =
        typeData.length > 1 ? {
            operator: "OR"
        } : {};
    const tempData = typeData.length === 0 ? {} : (typeData.length === 1) ? typeData[0] : {
        predicates: typeData
    };
    const data = Object.assign({}, tempData, operator);
    return JSON.stringify(data) === "{}" ? [] : data;
};

const severity = result => {
    const severityData = result.severity.map(item => ({
        field: "capevent.severity",
        operator: "EQ",
        value: handleSeverity(item)
    }));
    const operator =
        severityData.length > 1 ? {
            operator: "OR"
        } : {};
    const tempData = severityData.length === 0 ? {} : (severityData.length === 1) ? severityData[0] : {
        predicates: severityData
    };
    const data = Object.assign({}, tempData, operator);
    return JSON.stringify(data) === "{}" ? [] : data;
};

const state = result => {
    const stateData = result.state.map(item => ({
        field: "capalarm.state",
        operator: "EQ",
        value: item
    }));
    const operator =
        stateData.length > 1 ? {
            operator: "OR"
        } : {};
    const tempData = stateData.length === 0 ? {} : (stateData.length === 1) ? stateData[0] : {
        predicates: stateData
    };
    const data = Object.assign({}, tempData, operator);
    return JSON.stringify(data) === "{}" ? [] : data;
};

let finallyTempData = {};

function finallyHandledData() {
    return Object.values(finallyTempData).filter((item) => {
        return (
            Object.prototype.toString.call(item) !== "[object Array]" || item.length
        );
    });
}
export const finallyData = (typeAlarm, arr) => {
    const result = getAlarmParameters(typeAlarm, arr);
    switch (typeAlarm) {
        case "type":
            finallyTempData["type"] = type(result);
            return finallyHandledData();
        case "severity":
            finallyTempData["severity"] = severity(result);
            return finallyHandledData();
        case "state":
            finallyTempData["state"] = state(result);
            return finallyHandledData();
        default:
            return "";
    }
};

export const choosedData = () => result;

// get alarm group check value
export const getAlarmTypeParameter = (type) => {
    switch(type) {
        case "Alarm Type":
            return "capalarm.alarmtype";
        case "Alarm Severity":
            return "capevent.severity";
        case "Alarm State":
            return "capalarm.state";
        default:
            return "";
    }
};

// handle data for alarm data select
export const handleTypeState = (selctOptions) => {
    return selctOptions.map(
        item =>
            item["capalarm.alarmtype"] || item["capalarm.state"]
    );
};
// handle data for alarm severity
export const handleDataForSeverity = (selctOptions) => {
    return selctOptions.filter(itemFilter => (
        itemFilter["capevent.severity"] !== "null" && itemFilter["capevent.severity"] !== "minor"
    )).map(
        item => {
            const severity = item["capevent.severity"];
            return handleSeverityToStirng(severity);
        });
};
function handleSeverityToStirng(severity) {
    switch(severity) {
        case "1":
            return "Critical";
        case "2":
            return "Major";
        case "3":
            return "Minor";
        case "4":
            return "info";
        default:
            return "unknown";
    }
}
// alarm get the location data
function alarmJudgmentLocation(infos) {
    return infos && infos[0] && infos[0].areas && infos[0].areas[0] && infos[0].areas[0].features && infos[0].areas[0].features[0] &&
    infos[0].areas[0].features[0].geometry && infos[0].areas[0].features[0].geometry.coordinates; 
}

export const handleAlarmsForLocation = (data = []) => {
    let tempData = {};
    if (Object.prototype.toString.call(data) !== "[object Array]") {
        throw new Error(`${data} is not an array`);
    }
    data.forEach(item => {
        const infos = item.infos;
        if (infos && alarmJudgmentLocation(infos)) {
            const center = item.infos[0].areas[0].features[0].geometry.coordinates;
            const itemData = center.join(",");
            tempData[center.join(",")] = {
                label: [...new Set(data.filter(itemFilter => {
                    if (itemFilter.infos && alarmJudgmentLocation(itemFilter.infos)) {
                        const filterData = itemFilter.infos[0].areas[0].features[0].geometry.coordinates.join(",");
                        return itemData === filterData;
                    }
                    return "";
                }).map(itemMap => {
                    return itemMap.alarmtype;
                }))].join(","),
                information: data.filter(itemFilter => {
                    if (itemFilter.infos && alarmJudgmentLocation(itemFilter.infos)) {
                        const filterData = itemFilter.infos[0].areas[0].features[0].geometry.coordinates.join(",");
                        return itemData === filterData;
                    }
                    return "";
                }).map(itemMap => {
                    return {
                        eventtype: itemMap.eventtype === "null" ? "-" : itemMap.eventtype,
                        note: itemMap.note || "-",
                        sentdatetime: itemMap.sentdatetime ? map_.handleDate(itemMap.sentdatetime) : "-",
                        severity: handleSeverityToStirng(itemMap.severity),
                        source: itemMap.source || "-"
                    };
                }),
                id: center.join(","),
                center,
                key: JSON.stringify(center),
                infos: item.alarmtype
            };
        }
    });
    return Object.values(tempData);
};
