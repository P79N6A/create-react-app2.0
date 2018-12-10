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

// get alarm group check value
export const getAlarmTypeParameter = (type) => {
    switch(type) {
        case "Alarm Type":
            return "capalarm.alarmtype";
        case "Alarm Severity":
            return "capevent.severity";
        case "Alarm State":
            return "capalarm.state";
        default:
            return "";
    }
};

// handle data for alarm severity
export const handleDataForSeverity = (selctOptions) => {
    return selctOptions.filter(filterItem => filterItem["capevent.severity"] !== "null").map(
        item => {
            const data = item["capevent.severity"];
            switch(data) {
                case "1":
                    return "critical";
                case "2":
                    return "major";
                case "3":
                    return "minor";
                case "4":
                    return "info";
                case "5":
                    return "unknown";
                default:
                    return data;
            }
        }
    );
}; 

// get choosed count for severity
export const getChoosedCountForSeverity = (sumArr, targetArr) => {
    const data = [];
    sumArr.forEach(item => {
        for (const val of targetArr) {
            if ((item["capevent.severity"] === "1" ? "critical":
                item["capevent.severity"] === "2" ? "major" :
                    item["capevent.severity"] === "3" ? "minor":
                        item["capevent.severity"] === "4" ? "info": 
                            item["capevent.severity"] === "5" ? "unknown": 
                                item["capevent.severity"]) === val
            ) {
                data.push(item);
            }
        }
    });
    return data;
};

// get data for severity by severity get the value
export const getValueBySeverity = (arr) => {
    return arr.map(
        item =>
            item === "critical" ? "1":
                item=== "major" ? "2" :
                    item === "minor" ? "3":
                        item === "info" ? "4":
                            item === "unknown" ? "5":
                                item
    );
};
