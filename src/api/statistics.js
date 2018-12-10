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

import fetch from "commons/utils/fetch";
import getUrl from "commons/utils/urlHelper";
/**
 *
 *
 * @export
 * @param {array} times
 * @param {string} type
 * @returns
 */
export async function alarmList(times, type = "", appid = "") {
    // capalarm.alarmtype capalarm.state capevent.severity
    const APPINFO = JSON.parse(sessionStorage.getItem("ISC-APPLICATION-INFO") || "{}");
    const id = (APPINFO && APPINFO["address.name"]) || "";
    let groupingData = type
        ? {
              grouping: [type]
          }
        : {};
    let postData = {
        type: "alarms",
        format: "filter",
        applicationid: appid || id,
        extension: "aggregation#COUNT()",
        sortorders: [
            {
                sortfield: "capevent.sentdatetime",
                ascending: true
            }
        ]
    };

    let urls = await getUrl();
    return fetch.post(urls.alarmSearch, Object.assign({}, postData, groupingData));
}
/**
 *
 *
 * @export
 * @param {string} deviceType
 * @returns
 */
export async function deviceList(deviceType = "device", appid) {
    let urls = await getUrl();
    let postdata = {
        format: "aggregation",
        status: "false",
        application: appid,
        selection: {
            resourcelist: [deviceType]
        }
    };
    return fetch.post(urls.topologyStatistic, postdata);
}
