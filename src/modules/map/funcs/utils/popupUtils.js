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

import _ from "lodash";

export const setPopupInner = (data) => {
    if (!_.isArray(data)){
        throw new Error(`${data} is not an array`);
    }
    let result = "";
    for (const value of data) {
        let innerData = [];
        if (!_.isObject(value)) {
            throw new Error(`${data} should contain array the ${value} is not an array`);
        }
        for (const key in value) {
            innerData.push({
                key,
                value: value[key]
            });
        }
        let resultDataDetail = "";
        for (const innerItem of innerData) {
            resultDataDetail += `<div class="popup_item">
            <span class="key">${innerItem.key}:</span>
            <span class="value">${innerItem.value}</span>
         </div>`;
        }
        const classOfBar = getBarClass(value.severity);
        result += `<div class="popup_item_wrapper">
                        <div
                            class="${classOfBar} ${String(value.severity) !== "undefined" ? "item_bar" : ""}"
                        ></div>
                        <div class="item_wrapper">
                            ${resultDataDetail}
                        </div>
                    </div>`;
    }
    return `
            <div class="ol-popup">
                <div class="popup_content">
                    ${result}
                </div>
            </div>
          `;
};

function getBarClass (severity) {
    if (severity) {
        return (severity + "").toLowerCase();
    } else {
        return "";
    }
}