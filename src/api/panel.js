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
 * Created by Wangrui on 25/05/2018.
 */

import Fetch from "commons/utils/fetch";
import getUrl from "commons/utils/urlHelper";
import { APPLICATION_INFO_KEY } from "commons/constants/const";

// handle time arr to parameters
function handlTime (timeArr){
    if (Object.prototype.toString.call(timeArr) !== "[object Array]") {
        throw new Error(`${timeArr}is not array`);
    } else {
        return timeArr.length === 2 ? timeArr.map((item, i) => (
            {
                "field": "capevent.sentdatetime",
                "operator": i ? "LT" : "GT",
                "value": item,
            }
        )) : [{
            "field": "capevent.sentdatetime",
            "operator": "GT",
            "value": timeArr[0],
        }];
    }
}
/**
 *
 *
 * @export
 * @param {array} timeArr [startTime, endTime]
 * @param {string} type group type
 * @returns
 */
export async function alarmList(timeArr, type = "") {
    // capalarm.alarmtype capalarm.state capevent.severity
    let groupingData = type ? {
        "grouping":  [type],
    } : {};
    let postData = {
        "type": "alarms",
        "format": "filter",
        "applicationid": JSON.parse(sessionStorage.getItem(APPLICATION_INFO_KEY))["address.name"],
        "extension": "aggregation#COUNT()",
        "predicate": {
            "operator": "AND",
            "predicates": handlTime(timeArr),
        }
    };

    let urls = await getUrl();
    return Fetch.post(urls.alarmSearch, Object.assign({}, postData, groupingData));
};

/**
 *
 *
 * @export
 * @param {array} timeArr [statrtTime, endTime]
 * @param {string} type grouping type
 * @returns
 */
export async function eventList(timeArr, type) {
    let groupingData = type ? {
        "grouping":  [type],
    } : {};
    let postData = {
        "type": "events",
        "format": "filter",
        "applicationid": JSON.parse(sessionStorage.getItem(APPLICATION_INFO_KEY))["address.name"],
        "extension": "aggregation#COUNT()",
        "predicate": {
            "operator": "AND",
            "predicates": handlTime(timeArr),
        }
    };

    let urls = await getUrl();
    return Fetch.post(urls.eventSearch, Object.assign({}, postData, groupingData));
};
/**
 *
 *
 * @export
 * @param {array} iotId [all kinds of ids]
 * @param {array} timeArr [startTime, endTime]
 * @param {string} aggregation aggregation conditions
 * @param {string} parameters aggregation parameters
 * @returns
 */
export async function deviceReadingList(iotId, timeArr, aggregation, parameters="") {
    let iotIdArray = [];
    if (iotId.length) {
        iotIdArray = [{
            "field": "capevent.senderid",
            "operator": "IN",
            "values": iotId,
        }];
    } else {
        iotIdArray = [];
    };
    let aggregations = {
        "extension": `aggregation#${aggregation}(${aggregation === "COUNT" ? "" : parameters})`,
    };
    let postData = {
        "type": "events",
        "format": "filter",
        "predicate": {
            "operator": "AND",
            "predicates": handlTime(timeArr).concat(iotIdArray),
        }
    };

    let urls = await getUrl();
    return Fetch.post(urls.eventSearch, Object.assign({}, postData, aggregations));
};

/**
 *
 *
 * @export
 * @returns
 * @param deviceModelIds
 */
export async function topologyList(deviceModelIds) {
    let urls = await getUrl();
    let post = {
        "devicemodel.iotTopologyId": deviceModelIds,
        dataType: ["double", "integer"]
    };
    return Fetch.post(urls.topologyDeviceModelProperty, post);
};

/**
 *
 *
 * @export
 * @returns
 *
 * @param iotIds
 */
export async function topologyProperty(iotIds) {
    let urls = await getUrl();
    let postData = {
        format: "recordset",
        outputs: ["address", "location", "logical", "physical", "property"],
        predicate: {
            predicates: iotIds.map((item) => {
                return {
                    field: "physical.iotTopologyId",
                    operator: "LIKE",
                    value: item
                };
            }),
            operator: "OR"
        },
        resources: ["address", "location", "logical", "physical", "property"],
        type: "graphs"
    };
    return Fetch.post(urls.topologySearchResource, postData);
}
/**
 *
 *
 * @export
 * @param {string} deviceType
 * @returns
 *
 * deviceType devicetype/device
 * status true/false
 */
export async function deviceList(deviceType) {
    let urls = await getUrl();
    let postdata = {
        "format":   "aggregation",
        "status":   `${deviceType === "Device"}`,
        "application": JSON.parse(sessionStorage.getItem(APPLICATION_INFO_KEY))["address.name"],
        "selection": {
            "resourcelist": [deviceType]
        }
    };
    return Fetch.post(urls.topologyStatistic, postdata);
};

// export alarm data to excel
export async function exportAlarmData(filterData, pagesize) {
    let urls = await getUrl();
    let postdata = {
        fileinfo: {
            filename: "alarm",
            timezone: -8,
            format: "excel",
            columninfos: [
                {
                    jsonpath: "$.severity",
                    fieldname: "severity",
                    displayName: "severity"
                },
                {
                    jsonpath: "$.owner",
                    fieldname: "owner",
                    displayName: "Owner"
                },
                {
                    jsonpath: "$.sentdatetime",
                    fieldname: "sentdatetime",
                    displayName: "Sentdate Time",
                    dateformat: "yyyy-MM-dd HH:mm:ss"
                },
                {
                    jsonpath: "$.alarmtype",
                    fieldname: "alarmtype",
                    displayName: "Alarm Type"
                },
                {
                    jsonpath: "$.source",
                    fieldname: "source",
                    displayName: "Source"
                },
                {
                    jsonpath: "",
                    fieldname: "parameters",
                    displayName: "parameters"
                },
                {
                    jsonpath: "$.note",
                    fieldname: "note",
                    displayName: "Note"
                }
            ]
        },
        filter: {
            format: "filter",
            type: "alarms",
            ...filterData
        }
    };
    return Fetch.postText(urls.exportAlarms, postdata);
}

// export event data to excel
export async function exportEventData(filterData, pagesize) {
    let urls = await getUrl();
    let postdata = {
        fileinfo: {
            filename: "event",
            timezone: -8,
            format: "excel",
            columninfos: [
                {
                    jsonpath: "$.sentdatetime",
                    fieldname: "sentdatetime",
                    displayName: "Sentdate Time",
                    dateformat: "yyyy-MM-dd HH:mm:ss"
                },
                {
                    jsonpath: "$.eventtype",
                    fieldname: "eventtype",
                    displayName: "Alarm Type"
                },
                {
                    jsonpath: "$.source",
                    fieldname: "source",
                    displayName: "Source"
                },
                {
                    jsonpath: "",
                    fieldname: "parameters",
                    displayName: "parameters"
                },
                {
                    jsonpath: "$.note",
                    fieldname: "note",
                    displayName: "Note"
                }
            ]
        },
        filter: {
            format: "filter",
            type: "events",
            ...filterData
        }
    };
    return Fetch.postText(urls.exportEvents, postdata);
}
