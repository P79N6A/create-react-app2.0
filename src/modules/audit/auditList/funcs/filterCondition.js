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

    items.forEach((items, index) => {
        let defaultField = "capevent.";

        if (
            items.field === "alarmtype" ||
            items.field === "associations" ||
            items.field === "forcedby" ||
            items.field === "owner" ||
            items.field === "state"
        ) {
            defaultField = "capalarm.";
        } else if (items.field === "eventtype" || items.field === "parameters") {
            defaultField = "capevent.capinfo.";
        }

        predicate = {
            field: defaultField + items.field,
            operator: items.option,
            value: items.inpValue
        };

        if (items.option === "IN") {
            predicate = {
                field: defaultField + items.field,
                operator: items.option,
                values: items.inpValue
            };
        }

        if (items.field === "sentdatetime") {
            predicate = {
                operator: "AND",
                predicates: [
                    { field: "capevent.sentdatetime", operator: "GT", value: items.startDate },
                    { field: "capevent.sentdatetime", operator: "LT", value: items.endDate }
                ]
            };
        }

        if (items.field === "parameters") {
            predicate = {
                field: "capevent.capinfo.parameters." + items.inpName,
                valuetype: items.valType,
                operator: items.option,
                value: items.inpValue
            };
        }

        if (items.field === "severity" || items.field === "state") {
            predicate = {
                field: defaultField + items.field,
                operator: items.option,
                value: items.severityNum
            };
        }
        predicates.push(predicate);
    });

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
