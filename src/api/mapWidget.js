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
 * Created by DengXiaoLong on 25/06/2018.
 */

import fetch from "commons/utils/fetch";
import getUrl from "commons/utils/urlHelper";
import { APPLICATION_INFO_KEY, ISC_ACCOUNT_INFO } from "commons/constants/const";

// handle time arr to parameters
function handlTime(timeArr) {
    if (Object.prototype.toString.call([]) !== "[object Array]") {
        throw new Error(`${timeArr} is not array`);
    } else {
        return timeArr.map((item, i) => ({
            "field": "capevent.sentdatetime",
            "operator": i ? "LT" : "GT",
            "value": item,
        }));
    }
}

/**
 *
 *
 * @export
 * @param {array} timeArr [startTime, endTime]
 * @param conditions
 * @returns
 */
// map alarm locations
export async function mapGetAlarm(timeArr, conditions = []) {
    let postData = {
        "type": "alarms",
        "format": "filter",
        "applicationid": JSON.parse(sessionStorage.getItem(APPLICATION_INFO_KEY))["address.name"],
        "predicate": {
            "operator": "AND",
            "predicates": handlTime(timeArr).concat(conditions),
        },
        "paginator": {
            "pageno": conditions.length ? 1 : 99999999,
            "limit": 1000
        }
    };
    const urls = await getUrl();
    return fetch.post(urls.alarmSearch, postData);
}

/**
 *
 *
 * @export
 * @param {string} value
 * @returns
 */
// map get address
export async function mapGetAddress(value) {
    const postData = {
        "format": "recordset",
        "outputs": ["address"],
        "resources": ["address"],
        "type": "graphs",
        "predicate": {
            "operator": "AND",
            "predicates": [
                {
                    "field": "address.displayName",
                    "operator": "LIKE",
                    "value": value
                },
                {
                    "field": "address.resourcePath",
                    "operator": "LIKE",
                    "value": JSON.parse(sessionStorage.getItem(APPLICATION_INFO_KEY))["address.name"]
                }
            ]
        },
        "paginator": { "pageno": "1", "limit": 60 },
        "orderby": "address.displayName asc"
    };

    const urls = await getUrl();
    return fetch.post(urls.topologySearchResource, postData);
}

/**
 *
 *
 * @export
 * @param {array} ids
 * @returns
 */
// map get info by address topology ids
export async function mapGetInfoByAddress(ids) {
    let iotTopologyIds = [];
    if (ids.length) {
        iotTopologyIds = ids.map(item => (
            {
                "field": "address.resourcePath",
                "operator": "LIKE",
                "value": item
            }
        ));
    } else {
        iotTopologyIds = [];
    }
    const postData = {
        "format": "recordset",
        "outputs": [
            "location.geometry",
            "physical",
            "physical.iotTopologyId",
            "devicemodel.name",
            "devicemodel.iotTopologyId",
            // "address.displayName",
            // "address.iotTopologyId",
            // "physical",
            // "property",
        ],
        "resources": [
            "physical",
            "logical",
            "location",
            "devicetype",
            "address",
            "property"
        ],
        "type": "graphs",
        "predicate": {
            "predicates": iotTopologyIds,
            "operator": "OR"
        },
        "orderby": "physical.displayName asc"
    };
    const urls = await getUrl();
    return fetch.post(urls.topologySearchResource, postData);
}

// get system config device types
export async function getSysconfigDeviceType() {
    let urls = await getUrl();
    return fetch.get(
        `${urls.sysconfigs}?sitename=${JSON.parse(sessionStorage.getItem(ISC_ACCOUNT_INFO)).displayname}&modulename=topology&submodulename=device-types&pageno=1&limit=1000`
    );
}

/**
 *
 *
 * @export
 * @param {string} type group type
 * @returns
 */
export async function alarmTypeData(type) {
    // capalarm.alarmtype capalarm.state capevent.severity
    let groupingData = type ? {
        "grouping":  [type],
    } : {};
    let postData = {
        "type": "alarms",
        "format": "filter",
        "extension": "aggregation#COUNT()",
        "sortorders": [{
            "sortfield": "capevent.sentdatetime",
            "ascending": true
        }]
    };

    let urls = await getUrl();
    return fetch.post(urls.alarmSearch, Object.assign({}, postData, groupingData));
}
