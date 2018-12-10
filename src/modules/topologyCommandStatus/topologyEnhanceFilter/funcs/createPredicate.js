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
 * Created by xulu on 25/05/2018.
 */
import FilterConfig from "../filterConfig";

function CreatedPredicate(searchWord, propsFilterConfigType, propsFilterArr, init) {
    let filter = {
        filterConfigType: propsFilterConfigType,
        value: searchWord
    };
    let filterArr = propsFilterArr || [];
    let isThisFilterExist = false;
    for (let i = 0; i < filterArr.length; i++) {
        if (filterArr[i].filterConfigType === propsFilterConfigType) {
            filterArr.splice(i, 1);
            isThisFilterExist = true;
        }
    }
    if ((!isThisFilterExist && !init) || searchWord.length) {
        filterArr.push(filter);
    }
    let predicate = checkPredicate(filterArr);

    return { predicate, filterArr };
}

function checkPredicate(filterArr, predicate) {
    let predicateObj = {
        predicates: [],
        operator: ""
    };
    for (let j = 0; j < filterArr.length; j++) {
        let config = FilterConfig.filterConfigs[filterArr[j].filterConfigType];
        let predicateArr = [];
        let totalPredicate = {};
        for (let i = 0; i < config.searchField.length; i++) {
            let predicate = {};
            if (typeof filterArr[j].value === "string") {
                predicate = {
                    field: config.searchField[i],
                    operator: config.operator[i],
                    value: filterArr[j].value
                };
            } else {
                predicate = {
                    field: config.searchField[i],
                    operator: config.operator[i],
                    values: filterArr[j].value
                };
            }
            predicateArr.push(predicate);
        }
        if (filterArr[j].filterConfigType === "searchByPathandName") {
            totalPredicate = [
                {
                    operator: "OR",
                    predicates: predicateArr
                }
            ];
        } else {
            totalPredicate = predicateArr;
        }
        predicateObj.predicates = predicateObj.predicates.concat(totalPredicate);
    }
    if (filterArr.length) {
        predicateObj.operator = "AND";
    } else {
        predicateObj = null;
    }

    return predicateObj;
}

export { CreatedPredicate, checkPredicate };
