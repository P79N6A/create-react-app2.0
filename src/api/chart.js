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
 * Created by Kai Di on 25/05/2018.
 */
import Fetch from "commons/utils/fetch";
import getUrl from "commons/utils/urlHelper";
import _ from "lodash";

/**
 *
 *
 * @param {string} type
 * @param {array} iotIds
 * @param {array} times
 * @param {array} readings
 * @param {string} aggregation
 * @param {string} interval
 * @param {string} grouping
 * @returns
 */
function getEventAlarmPredicate(type, appName, iotIds, times, readings, aggregation, interval, grouping) {
    times = times || [];
    readings = readings || [];
    iotIds = _.isArray(iotIds) ? _.map(iotIds, item => item.value || item.key) : [iotIds.value];
    let keyList = "";
    let timePredicate = times.map((item, i) => ({
        field: "capevent.sentdatetime",
        operator: i ? "LT" : "GT",
        value: item
    }));
    let idPredicate = {
        field: "capevent.parameters.deviceid",
        operator: "IN",
        values: iotIds
    };
    idPredicate = iotIds && iotIds.length ? idPredicate : undefined;
    readings.forEach(item => {
        const k = "capevent.parameters." + item;
        keyList = keyList ? keyList + "," + k : k;
    });
    let predicates = {
        predicates: idPredicate ? [idPredicate].concat(timePredicate) : timePredicate,
        operator: "AND"
    };
    let postdata = {
        type: type,
        format: "filter",
        grouping: grouping ? [grouping] : undefined,
        applicationid: appName,
        sortorders: [
            {
                sortfield: "capevent.sentdatetime",
                ascending: true
            }
        ],
        predicate: idPredicate || timePredicate.length ? predicates : undefined
    };
    postdata.extension = aggregation
        ? "aggregation#" + aggregation + "(" + (aggregation === "COUNT" ? "" : keyList) + ")"
        : undefined;
    postdata.containfullweek = !!(interval && interval.indexOf("week") > -1);
    postdata.extension =
        aggregation && interval ? postdata.extension + "#INTERVAL(" + interval + ")" : postdata.extension;
    return postdata;
}
/**
 *
 *
 * @export
 * @param {array} iotIds
 * @returns
 */
export async function getTopology(appName, iotIds) {
    if (_.isEmpty(iotIds)) {
        return;
    }
    let urls = await getUrl();
    const outputsList = ["address", "location", "devicemodel", "physical", "property"];
    // iotIds = iotIds || [];
    iotIds = _.isArray(iotIds) ? _.map(iotIds, item => item.value || item.key) : [iotIds.value];
    let iotList = iotIds.map(item => ({ field: "physical.iotTopologyId", operator: "LIKE", value: item }));
    let post = {
        format: "recordset",
        outputs: outputsList,
        predicate: {
            predicates: iotList.length ? iotList : [iotList],
            operator: "OR"
        },
        resources: outputsList,
        type: "graphs"
    };
    return Fetch.post(urls.topologySearchResource, post);
}

export async function getDeviceModelProperty(deviceModelIds) {
    if (_.isEmpty(deviceModelIds)) {
        return;
    }
    let urls = await getUrl();
    let post = {
        "devicemodel.iotTopologyId": deviceModelIds,
        dataType: ["double", "integer"]
    };
    return Fetch.post(urls.topologyDeviceModelProperty, post);
}
/**
 *
 *
 * @export
 * @param {array} resourcelist
 * @returns
 */
export async function getTopologyStatic(resourcelist, applicationName) {
    let urls = await getUrl();
    let postdata = {
        format: "aggregation",
        status: resourcelist === "Device" ? "true" : "false",
        selection: {
            resourcelist: [resourcelist]
        },
        application: applicationName
    };
    return Fetch.post(urls.topologyStatistic, postdata);
}
/**
 *
 *
 * @export
 * @param {array} iotIds
 * @param {array} times
 * @param {array} readings
 * @param {string} aggregation
 * @param {string} interval
 * @param {string} grouping
 * @returns
 */
export async function getAlarm(appName, iotIds, times, readings, aggregation, interval, grouping) {
    let urls = await getUrl();
    let postdata = getEventAlarmPredicate("alarms", appName, iotIds, times, readings, aggregation, interval, grouping);
    return Fetch.post(urls.alarmSearch, postdata);
}

/**
 *
 *
 * @export
 * @param {array} iotIds
 * @param {array} times
 * @param {array} readings
 * @param {string} aggregation
 * @param {string} interval
 * @param {string} grouping
 * @returns
 */
export async function getEvent(appName, iotIds, times, readings, aggregation, interval, grouping) {
    let urls = await getUrl();
    let postdata = getEventAlarmPredicate("events", appName, iotIds, times, readings, aggregation, interval, grouping);
    return Fetch.post(urls.eventSearch, postdata);
}

export async function getServiceList(sitename) {
    let urls = await getUrl();
    // let postdata={};
    return Fetch.get(urls.kpiService + sitename);
}

export async function getKpiPreview(type, format, kpiQuery, sitename) {
    let urls = await getUrl();
    let postdata = {
        Type: type,
        format: format,
        kpiQuery: kpiQuery
    };
    return Fetch.post(urls.kpiPreview + sitename, postdata);
}

export async function getKpiService(kpiName, sitename) {
    let urls = await getUrl();
    let postdata = { target_tenant: sitename };
    return Fetch.post(urls.service + sitename + "/" + kpiName, postdata);
}

/**
 *
 *
 * @export
 * @param {array} columninfos
 * @param {array} iotIds
 * @param {array} times
 * @param {array} readings
 * @param {string} aggregation
 * @param {string} interval
 * @param {string} grouping
 * @returns
 */
export async function exportEventData(appName, columninfos, iotIds, times, readings) {
    let urls = await getUrl();
    let filter = getEventAlarmPredicate("events", appName, iotIds, times, readings);
    let postdata = {
        fileinfo: {
            filename: "event",
            timezone: -8,
            format: "excel",
            columninfos
        },
        filter
    };
    return Fetch.postText(urls.exportEvents, postdata);
}

/**
 *
 *
 * @export
 * @param {array} columninfos
 * @param {array} iotIds
 * @param {array} times
 * @param {array} readings
 * @param {string} aggregation
 * @param {string} interval
 * @param {string} grouping
 * @returns
 */
export async function exportAlarmData(appName, columninfos, iotIds, times, readings) {
    let urls = await getUrl();
    let filter = getEventAlarmPredicate("alarms", appName, iotIds, times, readings);
    let postdata = {
        fileinfo: {
            filename: "alarm",
            timezone: -8,
            format: "excel",
            columninfos
        },
        filter
    };
    return Fetch.postText(urls.exportAlarms, postdata);
}
