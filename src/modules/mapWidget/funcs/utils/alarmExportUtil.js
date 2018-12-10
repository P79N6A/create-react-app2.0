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

function handleType(data) {
    let result = {};
    const { length } = data;
    if (1 === length) {
        result = {
            field: "capalarm.alarmtype",
            operator: "EQ",
            value: data[0]
        };
    } else {
        result = {
            predicates: [
                ...data.map(item => ({
                    field: "capalarm.alarmtype",
                    operator: "EQ",
                    value: item
                }))
            ],
            operator: "OR"
        };
    }
    return result;
};

function handleState(data) {
    let result = {};
    const { length } = data;
    if (1 === length) {
        result = {
            field: "capalarm.state",
            operator: "EQ",
            value: data[0]
        };
    } else {
        result = {
            predicates: [
                ...data.map(item => ({
                    field: "capalarm.state",
                    operator: "EQ",
                    value: item
                }))
            ],
            operator: "OR"
        };
    }
    return result;
};

function handeSeverityPrev(data){
    return data.map(item => ({
        item: item.toLowerCase(),
        severity:
        item === "Critical" ? "1":
            item=== "Major" ? "2" :
                item === "Minor" ? "3":
                    item === "info" ? "4": item
    }));
};

function handleSeverity(data) {
    let result = {};
    const { length } = data;
    if(length === 1) {
        result = {
            "predicates": [{
                "field": "capevent.severity",
                "operator": "EQ",
                "value": handeSeverityPrev(data)[0].item
            }, {
                "field": "capevent.severity",
                "operator": "EQ",
                "value": handeSeverityPrev(data)[0].severity
            }],
            "operator": "OR"
        };
    } else {
        result = {
            "predicates": [
                ...handeSeverityPrev(data).map(item => (
                    {
                        "field": "capevent.severity",
                        "operator": "EQ",
                        "value": item.item
                    }
                )),
                ...handeSeverityPrev(data).map(item => (
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
    return result;
};

export const handleDataForExport = (choosedData, timeArr) => {
    let result = {};
    if ("{}" === JSON.stringify(choosedData)) {
        result = {
            predicate: {
                field: "capevent.sentdatetime",
                operator: "GT",
                value: getTimeString(timeArr[0])
            }
        };
    } else {
        const { type, state, severity } = choosedData;
        let typeData = null;
        let stateData = null;
        let severityData = null;
        let arr = [];
        if (type.length) {
            typeData = handleType(type);
        }
        if (state.length) {
            stateData = handleState(state);
        }
        if (severity.length) {
            severityData = handleSeverity(severity);
        }
        arr = [
            typeData,
            stateData,
            severityData
        ].filter(item => item !== null);
        result = {
            "predicate": {
                "predicates": arr,
                "operator": "AND"
            },
        };
    }
    return result;
};