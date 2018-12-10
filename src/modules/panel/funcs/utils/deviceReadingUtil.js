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

function sum(arr) {
    let result = 0;
    arr.forEach(item => {
        result += Number(item);
    });
    return result.toFixed(2).toFixed(2);
};

function max(arr) {
    if (arr.length) {
        return arr.map(
            (item) => Number(item)
        ).sort(
            (a, b) => (b - a)
        )[0].toFixed(2);
    } else {
        return 0;
    }
};

function min(arr) {
    return arr.map(
        (item) => Number(item)
    ).sort(
        (a, b) => (a - b)
    )[0].toFixed(2);
};

function avg(arr) {
    let result = 0;
    arr.forEach(item => {
        result += Number(item);
    });
    return (result / (arr.length)).toFixed(2);
};
export const calcMultipleCount = (arr, target) => {
    switch (target) {
        case "COUNT":
            return arr.length + "";
        case "SUM":
            return sum(arr);
        case "MAX":
            return max(arr);
        case "MIN":
            return min(arr);
        case "AVG":
            return avg(arr);
        default:
            return 0;
    }
};
export const getCommonData = (targetData) => {
    let arrs = [];
    targetData.forEach(item => {
        arrs.push(Object.keys(item));
    });
    let arr = arrs.shift();
    for (let i = arrs.length; i--;) {
        const p = {
                "boolean": {},
                "number": {},
                "string": {}
            },
            obj = [];
        arr = arr.concat(arrs[i]).filter((x) => {
            const t = typeof x;
            return !((t in p) ? !p[t][x] && (p[t][x] = 1) : obj.indexOf(x) < 0 && obj.push(x));
        });
        if (!arr.length) return [];
    }
    return arr.map(item => {
        return {
            [item]: targetData[0][item]
        };
    });
};