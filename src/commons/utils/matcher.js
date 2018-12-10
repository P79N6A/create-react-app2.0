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
 * Created by WPLEI on 25/05/2018.
 */
import _ from "lodash";

const Matcher = function() {
    this.configBuffer = {};
};

Matcher.prototype.flattn = function(source) {
    let path = "";
    let flattnObj = {};
    const toString = Object.prototype.toString;
    function flattn(json, p) {
        const type = toString.call(json);
        if (type === "[object Array]") {
            if (json.length === 0) {
                flattnObj[p] = [];
            }
            for (const inner of json) {
                const i = json.indexOf(inner);
                flattn(inner, !!p ? p + `.[${i}]` : `[${i}]`);
            }
        } else if (type === "[object Object]") {
            if (Object.keys(json).length === 0) {
                flattnObj[p] = {};
            }
            for (const key in json) {
                if (json.hasOwnProperty(key)) {
                    const element = json[key];
                    flattn(element, !!p ? p + `.${key}` : `${key}`);
                }
            }
        } else {
            flattnObj[p] = json;
        }
    }

    flattn(source, path);

    return flattnObj;
};

Matcher.prototype.unflattn = flattenObj => {
    let normal = {};

    return normal;
};

Matcher.prototype.match = (obj, config) => {
    const invalidPath = [];
    const USERINFO = JSON.parse(sessionStorage.getItem("ISC-CURRENT-USER") || "{}");
    const { permissions = [] } = USERINFO;
    for (let path in obj) {
        if (path.indexOf("material-key") !== -1 && !permissions.includes(obj[path])) {
            invalidPath.push(path);
        }
    }
    invalidPath.forEach((path, i) => {
        config = _.omit(config, path.replace(".material-key", ""));
    });
    // console.log(invalidPath, config);

    return config;
};

const matcher = new Matcher();

export default matcher;
