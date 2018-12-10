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
 * Modified by SongCheng on 02/08/2018
 */
import _ from "lodash";

export const filterCondition = (items, newtime) => {
    let predicate = {};
    let predicates = [];

    // let difaultTime = {
    //     field: "capevent.sentdatetime",
    //     operator: "GT",
    //     value: newtime
    // };
    // let isTime = false;

    items.forEach((items, index) => {
        predicate = {
            field: "capevent." + items.field,
            operator: items.option,
            value: items.inpValue
        };

        const arr = {
            IN: {
                field: "capevent." + items.field,
                operator: items.option,
                values: items.inpValue
            },
            parameters: {
                field: "capevent.capinfo.parameters." + items.inpName,
                valuetype: items.valType,
                operator: items.option,
                value: items.inpValue
            },
            sentdatetime: {
                operator: "AND",
                predicates: [
                    { field: "capevent.sentdatetime", operator: "GT", value: items.startDate },
                    { field: "capevent.sentdatetime", operator: "LT", value: items.endDate }
                ]
            },
            severity: {
                field: "capevent." + items.field,
                operator: items.option,
                value: items.severityNum
            }
        };
        if ("IN" === items.option) {
            predicate = arr[items.option];
        } else {
            predicate = arr[items.field] || predicate;
        }
        // if ("sentdatetime" === items.field) {
        //     isTime = true;
        // }

        predicates.push(predicate);
    });

    // if (!isTime) {
    //     predicates.push(difaultTime);
    // }

    let newItems = _.groupBy(predicates, "field");
    let lastArr = [];
    for (var i in newItems) {
        if (newItems[i].length === 1) {
            lastArr.push(newItems[i][0]);
        } else {
            lastArr.push({
                operator: "OR",
                predicates: newItems[i]
            });
        }
    }

    predicate = {
        operator: "AND",
        predicates: lastArr
    };

    return predicate;
};
