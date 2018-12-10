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

import getTimeString from "commons/utils/isc8601Generator";
import moment from "moment";

export const debounce = (func, delay) => {
    let timer = null;
    return (...args) => {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
};

// let the parameter array to string connect with ,
export const getParametersString = (arr) => {
    let temp = [];
    arr.forEach(item => {
        temp.push(`capevent.parameters.${item}`);
    });
    return temp.join(",");
};

// get device filter list
export const getDeviceFilterList = (data, type) => {
    // console.log(data, type);
    return data[type].aggregation;
};

// get choosed count
export const getChoosedCount = (sumArr, targetArr) => {
    const data = [];
    sumArr.forEach(item => {
        for (const val of targetArr) {
            if ((item["capevent.severity"] ||
                    item["capalarm.alarmtype"] ||
                    item["capalarm.state"] ||
                    item["capevent.eventtype"]) === val) {
                data.push(item);
            }
        }
    });
    return data;
};

// handle data for select
export const handleDataForSelect = (selctOptions) => {
    return selctOptions.map(
        item =>
            item["capevent.severity"] ||
        item["capalarm.alarmtype"] ||
        item["capalarm.state"] ||
        item["capevent.eventtype"]
    );
};

// calc the multiple count 
export const calcMultipleCount = (e) => {
    let result = 0;
    const temp = e.map(item => {
        return item.count;
    });
    temp.forEach(item => {
        result += Number(item);
    });
    return result;
};

// handle date for server
function handleDate(mode, timeArr) {
    let result = {};
    switch(mode) {
        case "realTime":
            result = {
                "field": "capevent.sentdatetime",
                "operator": "GT",
                "value": getTimeString(timeArr[0])
            };
            break;
        case "dateTime":
            result = {
                "predicates": [
                    ...timeArr.map((item, index) => ({
                        "field": "capevent.sentdatetime",
                        "operator": index ? "LT" : "GT",
                        "value": item
                    }))
                ],
                "operator": "AND"
            };
            break;
        default:
            result = {};
            break;
    }
    return result;
};

// handle severity form number to word
function handeSeverity(data){
    return data.map(item => ({
        item,
        severity:
        item === "critical" ? "1":
            item=== "major" ? "2" :
                item === "minor" ? "3":
                    item === "info" ? "4" : 
                        item === "unknown" ? "5" : item
    }));
};

// get the final data for server
function handleData(type, filters){
    let result = {};
    const { length } = filters;
    switch(type) {
        case "Event Type":
            if(length === 1) {
                result = {
                    "field": "capevent.eventtype",
                    "operator": "EQ",
                    "value": filters[0]
                };
            } else {
                result = {
                    "predicates": [...filters.map(item => (
                        {
                            "field": "capevent.eventtype",
                            "operator": "EQ",
                            "value": item
                        }
                    ))],
                    "operator": "OR"
                };
            }
            break;
        case "Alarm Type":
            if(length === 1) {
                result = {
                    "field": "capalarm.alarmtype",
                    "operator": "EQ",
                    "value": filters[0]
                };
            } else {
                result = {
                    "predicates": [...filters.map(item => (
                        {
                            "field": "capalarm.alarmtype",
                            "operator": "EQ",
                            "value": item
                        }
                    ))],
                    "operator": "OR"
                };
            }
            break;
        case "Alarm State":
            if(length === 1) {
                result = {
                    "field": "capalarm.state",
                    "operator": "EQ",
                    "value": filters[0]
                };
            } else {
                result = {
                    "predicates": [...filters.map(item => (
                        {
                            "field": "capalarm.state",
                            "operator": "EQ",
                            "value": item
                        }
                    ))],
                    "operator": "OR"
                };
            }
            break;
        case "Alarm Severity":
            if(length === 1) {
                result = {
                    "predicates": [{
                        "field": "capevent.severity",
                        "operator": "EQ",
                        "value": handeSeverity(filters)[0].item
                    }, {
                        "field": "capevent.severity",
                        "operator": "EQ",
                        "value": handeSeverity(filters)[0].severity
                    }],
                    "operator": "OR"
                };
            } else {
                result = {
                    "predicates": [
                        ...handeSeverity(filters).map(item => (
                            {
                                "field": "capevent.severity",
                                "operator": "EQ",
                                "value": item.item
                            }
                        )),
                        ...handeSeverity(filters).map(item => (
                            {
                                "field": "capevent.severity",
                                "operator": "EQ",
                                "value": item.severity
                            }
                        ))
                    ],
                    "operator": "OR"
                };
            }
            break;
        default:
            result = {};
            break;
    }
    return result;
};

// ["All", "Alarm Type", "Alarm Severity", "Alarm State"]
export const handleDataForPanelExport = (type, mode, timeArr, filters) => {
    let result = {};
    if ("All" === type) {
        if ("realTime" === mode) {
            result = {
                predicate: handleDate(mode, timeArr)
            };
        } else {
            result = {
                "predicate": {
                    "predicates": [
                        handleDate(mode, timeArr)
                    ],
                    "operator": "AND"
                }
            };
        }
    } else {
        result = {
            "predicate": {
                "predicates": [
                    handleData(type, filters),
                    handleDate(mode, timeArr)
                ],
                "operator": "AND"
            }
        };
    }
    return result; 
};

// handle date time from one type to another type
function handleDateTime(mode, time) {
    if (time) {
        switch(mode) {
            case "realTime":
                return `${extractIsotime(time)}`;
            case "dateTime":
                return `${moment(time[0]).format("DD-MMM-YYYY HH:mm:ss")} - ${moment(time[1]).format("DD-MMM-YYYY HH:mm:ss")}`;
            default:
                return "";
        }
    } else {
        return "";
    }
};

// handle number of date to words
function extractIsotime(isoString) {
    const reg = /iso8601::\(P(.*?)\)/gi;
    let time = reg.exec(isoString);
    if (!time || !time[1]) {
        return;
    }
    let length = time[1].length;
    let number = time[1].replace(/[^0-9]/gi, "");
    let t = time[1].indexOf("T") > -1 ? "T" : "";
    return `Last ${Number(number)} ${handleUnit(time[1][length - 1] + t)}`;
};

// handle panel view date unit for show
function handleUnit(unit) {
    switch(unit) {
        case "MT":
            return "Minutes";
        case "HT":
            return "Hours";
        case "D":
            return "Days";
        case "M":
            return " Months";
        default:
            return "";
    }
};

// handle parameter for alarm
function parameterOneAlarm (type, filters) {
    switch(type) {
        case "All":
            return type;
        default:
            return `${type}${(filters && filters.length) ? ": " : ""}${filters.join(",")}`;
    }
}

// handle the parameters for panel view show
export const handleParameters = (type, parameters) => {
    if (JSON.stringify(parameters) !== "{}") {
        switch(type) {
            case "Alarm Panel":
                return {
                    parameter1: parameterOneAlarm(parameters.alarmType, parameters.choosedFilters),
                    parameter2: handleDateTime(parameters.mode, parameters.timeArr),
                };
            case "Device Panel":
                return {
                    parameter1: parameters.choosedType || "",
                    parameter2: parameters.choosedFilters.join(","),
                };
            case "Event Panel":
                return {
                    parameter1: parameterOneAlarm(parameters.eventType, parameters.choosedFilters),
                    parameter2: handleDateTime(parameters.mode, parameters.timeArr),
                };
            case "Device Reading Panel":
                const { iotTopologyIds, choosedParameters, aggregation } = parameters;
                return {
                    parameter1: iotTopologyIds ? (iotTopologyIds.map(item => item.label).join(",") || "") : "",
                    parameter2: choosedParameters ? `${choosedParameters || ""}(${aggregation || ""})` : "",
                };
            default:
                return {};
        }
    } else {
        return {
            parameter1: "",
            parameter2: "",
            parameter3: ""
        };
    }
};

// get the panel data from the whole main object
export const handleProps = (data) => {
    let result = [];
    const temp = Object.keys(data);
    temp.filter((filterItem) => /^panel_/.test(filterItem)).forEach(item => {
        result.push(data[item]);
    });
    return result;
};

// handle the props to the target panel
export const handleTargetPanelProps = (data, target) => {
    return handleProps(data).filter(item => item.type === target);
};

export const interval = (func, a, t) => {
    const w = a === "30 seconds" ? 30 * 1000: (a === "60 seconds") ? 60 * 1000: 90 * 1000;
    const inter = () => {
        if (typeof t === "undefined" || t++ > 0) {
            setTimeout(inter, w);
            try {
                func.call(null);
            } catch (e) {
                t = 0;
                throw e.toString();
            }
        }
    };
    setTimeout(inter, w);
};

export const durationTimer = (durationTime) => {
    return durationTime === "30 seconds" ? 30 * 1000: (durationTime === "60 seconds") ? 60 * 1000 : 90 * 1000;
    // return 30;
};
