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
 * @fileOverview Here need the description for this file
 * @module isc8601Generator
 * @author Kai Di
 * @exports {
 *  getTimeString,
 * }
 * @parameter
 * isoString:
 *          a. ISC::{}.
 *          b. Today(HH:mm:ss).
 *          c. ISC8601::(P[n]Y[n]M[n]DT[n]H[n]M[n]S).
 *      For example:
 *          1."ISC::{Today()}" represents current time.
 *          2."ISC::{Today(00:00:00)}" represents 00:00:00 of today.
 *          3."P3Y6M4DT12H30M5S" represents a duration of "3 years, 6 months, 4 days, 12 hours, 30 minutes, and 5 seconds."
 *          4."ISC::{Today() + ISO8601::(P1D)}" represents a day later from now.
 *          5."ISC::{Today(03:00:00){} - ISO8601::(P10DT3H)}" represents 10 days and 3 hours before from 3:00:00 of today.'
 */

import moment from "moment";
const format = "YYYY-MM-DDTHH:mm:ss.SSSZZ";

function getTimeString(isoString) {
    let regAll = /isc::\{(.*?)\}$/gi;
    let r = regAll.exec(isoString);
    if (r) {
        let value = convertTime(r[1].replace(/\s*/g, ""));
        isoString = getTimeString(isoString.replace(r[0], value));
    }
    return isoString;
}

function convertTime(str) {
    if (!str || typeof str !== "string") {
        return;
    }
    let duration, startTime;
    const nowFormat = /Today\((.*?|)\)/i;
    const secondPraFormat = /\)\((.*?|)\)/i;
    const add8601 = /\+iso8601::\((.*?)\)/gi;
    const minus8601 = /\-iso8601::\((.*?)\)/gi;
    const symbol = /[+-]/g;
    const s = symbol.exec(str);
    const n = nowFormat.exec(str);
    const setExct = secondPraFormat.exec(str);
    const setJson = setExct && setExct[1] ? JSON.parse(setExct[1]) : undefined;
    if (!n && !s) {
        console.log("format time error in:" + str);
        return;
    }
    startTime = n && n[1] ? moment(n[1], "hh:mm:ss") : moment();
    startTime = setExct && setJson ? startTime.set(setJson).utc() : startTime.utc();
    duration = addMomentList(add8601, str, duration, "add");
    duration = addMomentList(minus8601, str, duration, "minus");
    if (moment.isDuration(duration)) {
        startTime.add(duration);
    }
    return startTime.format(format);
}
function addMomentList(reg, value, duration, action) {
    let r,
        list = [];
    while ((r = reg.exec(value)) !== null) {
        list.push(r[1]);
    }
    list.forEach(function(m) {
        m = action === "minus" ? "-" + m : m;
        let d = moment.duration(m);
        if (moment.isDuration(d)) {
            if (moment.isDuration(duration)) {
                duration.add(d);
            } else {
                duration = d;
            }
        }
    });
    return duration;
}

export default getTimeString;
