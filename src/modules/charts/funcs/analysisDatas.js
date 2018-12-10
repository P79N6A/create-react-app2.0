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
 * Created by KaiDi on 25/05/2018.
 */

import _ from "lodash";
import jp from "jsonpath";
import math from "mathjs";
import { countName, severityMapping } from "./constants";

function mappingDev(groupList, iotIds) {
    let result = groupList;
    if (_.isArray(groupList)) {
        result = _.filter(_.isArray(iotIds) ? iotIds : [iotIds], id => {
            return _.includes(groupList, id.value);
        });
    } else if (_.isString(groupList)) {
        let flt = _.filter(iotIds, m => {
            return m.value === groupList;
        });
        result = _.head(flt) ? _.head(flt).label : groupList;
    }
    return result;
}

function getCustomizeData(value1, value2, operation) {
    let value;
    value1 = math.bignumber(value1);
    value2 = math.bignumber(value2);
    switch (operation) {
        case "+":
            value = math.add(value1, value2);
            break;
        case "-":
            value = math.subtract(value1, value2);
            break;
        case "×":
            value = math.multiply(value1, value2);
            break;
        case "÷":
            value = math.divide(value1, value2);
            break;
        default:
            value = "-";
    }
    return value === "-" ? "-" : math.format(value);
}

/**
 *
 *
 * @param {array} data
 * @param {array} property
 * @param {string} iotId
 * @returns
 */
function getAggData(data, property, iotIds) {
    let result = { data: {}, xList: [] };
    iotIds = _.isPlainObject(iotIds) ? [iotIds] : iotIds;
    result.xList = _.map(data, n => n["statdatetime"] || n["sentdatetime"]);
    _.forEach(data, (item, i) => {
        _.forEach(iotIds, id => {
            result.data[id.label] = result.data[id.label] || {};
            _.forEach(property, pro => {
                const name = pro.displayName,
                    key = "capevent.parameters." + name;
                // const units = pro.units ? "(" + pro.units + ")" : "";
                // const proLabel = name.length > 30 ? name.split("_").slice(-1) + units : name + units;
                const proLabel = name.length > 30 ? name.split("_").slice(-1) : name;
                result.data[id.label][proLabel] = result.data[id.label][proLabel] || [];
                let flag = false;
                _.forEach(item.result, group => {
                    const iot = group["capevent.parameters.deviceid"] || group["capevent.deviceid"];
                    if (iot ? iot === id.label || iot === id.value : true) {
                        let value = group[key];
                        result.data[id.label][proLabel].push(value);
                        flag = true;
                    }
                });
                !flag && result.data[id.label][proLabel].push("-");
            });
        });
    });
    return result;
}
/**
 *
 *
 * @param {array} data
 * @param {string} interval
 * @param {string} group
 * @returns
 */
function getCountData(type, data, interval, group, iotIds) {
    let result = {
        data: {},
        xList: [],
        keyList: []
    };
    const countLabel = countName[type] || countName.default;
    result.xList = interval ? _.map(data, n => n["statdatetime"] || n["sentdatetime"]) : [];
    let groupList = [...new Set(_.flatMapDeep(jp.query(data, "$[*].result[*]['" + group + "']")))];
    groupList = _.includes(group, "deviceid") ? mappingDev(groupList, iotIds) : groupList;
    const severityFlag = group ? group.indexOf("severity") : -1;
    _.forEach(groupList, item => {
        let itemName = _.isString(item) ? item : item.label;
        itemName = itemName && severityFlag > -1 ? severityMapping[itemName] : itemName;
        const itemValue = _.isString(item) ? item : item.value;
        result.data[itemName] = result.data[itemName] || {};
        _.forEach(result.xList, time => {
            const values = jp.query(
                data,
                "$[?(@.sentdatetime=='" + time + "'||@.statdatetime=='" + time + "')].result"
            );
            result.data[itemName][countLabel.value] = result.data[itemName][countLabel.value] || [];
            let flag = false;
            _.forEach(values, val => {
                _.filter(val, o => o[group] === itemValue).forEach(count => {
                    result.data[itemName][countLabel.value].push(count.count);
                    flag = true;
                });
            });
            !flag && result.data[itemName][countLabel.value].push("-");
        });
    });
    if (!groupList.length) {
        _.forEach(data, item => {
            const grpName = _.includes(group, "deviceid") ? mappingDev(item[group], iotIds) : item[group];
            // const grpName = item[group];
            const value =
                grpName || grpName === null
                    ? severityFlag > -1 && severityMapping[grpName]
                        ? severityMapping[grpName]
                        : grpName
                    : "All";
            result.data[value] = result.data[value] || {};
            result.data[value][countLabel.value] = result.data[value][countLabel.value] || [];
            const count = item.count || (item.result && item.result[0] ? item.result[0].count : "-");
            result.data[value][countLabel.value].push(count);
        });
    }
    result.keyList = [{ displayName: countLabel.value }];
    return result;
}
/**
 *
 *
 * @param {array} data
 * @param {array} property
 * @returns
 */
function getDetailData(data, property, customizeReading) {
    let result = {
        data: {},
        xList: []
    };
    result.xList = _.map(data, n => n["statdatetime"] || n["sentdatetime"]);
    _.forEach(data, (item, i) => {
        const id = item.source;
        result.data[id] = result.data[id] || {};
        let currentTime = item.statdatetime || item.sentdatetime;
        _.forEach(property, pro => {
            const name = pro.displayName;
            // const units = pro.units ? "(" + pro.units + ")" : "";
            // const proLabel = name.length > 30 ? name.split("_").slice(-1) + units : name + units;
            const proLabel = name.length > 30 ? name.split("_").slice(-1) : name;
            result.data[id][proLabel] = result.data[id][proLabel] || _.map(result.xList, () => "-");
            const value = item.parameters && item.parameters[name] ? item.parameters[name] : "-";
            const index = result.xList.indexOf(currentTime);
            result.data[id][proLabel][index] = value;
        });
        _.forEach(customizeReading, reading => {
            const name = reading.name;
            result.data[id][name] = result.data[id][name] || _.map(result.xList, () => "-");
            const para = item.parameters || {},
                value1 = para[reading.readings[0]] || 0,
                value2 = para[reading.readings[1]] || 0,
                value = getCustomizeData(value1, value2, reading.operation),
                index = result.xList.indexOf(currentTime);
            result.data[id][name][index] = value;
        });
    });
    return result;
}
/**
 *
 *
 * @param {array} data
 * @param {array} property
 * @param {string} group
 * @returns
 */
function getEvtAggWithoutInterval(data, property, group, iotIds) {
    let result = {
        data: {},
        xList: []
    };
    let groupList = group ? _.map(data, group) : ["All"];
    // groupList = groupList.length ? groupList : ["All"];
    groupList = _.includes(group, "deviceid") ? mappingDev(groupList, iotIds) : groupList;
    _(groupList).forEach(item => {
        const itemName = _.isString(item) ? item : item.label;
        const itemValue = _.isString(item) ? item : item.value;
        result.data[itemName] = result.data[itemName] || {};
        _(property).forEach(pro => {
            const name = pro.displayName,
                // const units = pro.units ? "(" + pro.units + ")" : "";
                key = "capevent.parameters." + name,
                // const proLabel = name.length > 30 ? name.split("_").slice(-1) + units : name + units;
                proLabel = name.length > 30 ? name.split("_").slice(-1) : name;
            result.data[itemName][proLabel] = result.data[itemName][proLabel] || [];
            let value = itemName !== "All" ? _.filter(data, [group, itemValue])[0] : data[0];
            result.data[itemName][proLabel].push(value && value[key] ? value[key] : "-");
        });
    });
    // result.keyList = groupList;
    return result;
}
/**
 *
 *
 * @param {array} data
 * @param {array} property
 * @returns
 */
function getPropertyData({ data, property, iotIds }) {
    let result = {
        data: {}
    };
    property = property || [];
    for (let id in data) {
        let obj = {};
        const item = data[id];
        const grpName = mappingDev(id, iotIds);
        if (item && _.isPlainObject(item)) {
            _.forEach(property, pro => {
                if (_.some(item, (i, key) => key === pro.displayName)) {
                    const value = item[pro.displayName];
                    // const units = pro.units ? "(" + pro.units + ")" : "";
                    let label = pro.displayName;
                    // label = label.length > 30 ? label.split("_").slice(-1) + units : label + units;
                    label = label.length > 30 ? label.split("_").slice(-1) : label;
                    obj[label] = obj[label] ? obj[label] : [];
                    obj[label].push(value);
                }
            });
        }
        result.data[grpName] = obj;
    }
    return result;
}
/**
 *
 *
 * @param {array} data
 * @param {string} resourceList
 * @returns
 */
function getDeviceCount(type, data, resourceList) {
    if (!resourceList) {
        return;
    }
    const countLabel = countName[type] || countName.default;
    resourceList = resourceList.toLowerCase();
    let result = {
        data: { [countLabel.value]: {} },
        keyList: []
    };
    let array = data[resourceList] && data[resourceList].aggregation;
    _.forEach(array, item => {
        const name = item.resource === "all" ? item.sensorstatus : item.resource,
            nameObject = { displayName: name };
        result.keyList.push(nameObject);
        result.data[countLabel.value][name] = result.data[countLabel.value][name] || [];
        result.data[countLabel.value][name].push(item.count);
    });
    return result;
}

export { getAggData, getCountData, getDetailData, getPropertyData, getEvtAggWithoutInterval, getDeviceCount };
