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
import jp from "jsonpath";

function prepareDetailData(deviceData, configMapping) {
    let data = deviceData;
    let configs = configMapping;
    let prepareData = {};
    for (let i = 0; i < configs.length; i++) {
        let title = configs[i].expandTitle;
        let keyObject = configs[i].keyFormatToDisplay;
        if (!prepareData[title]) {
            prepareData[title] = {};
        }
        if (configs[i].displayAllKey) {
            prepareData[title] = jp.query(data, configs[i]["jsonpath"])[0];
        }
        for (let key in keyObject) {
            if (data.hasOwnProperty(key)) {
                prepareData[title][key] = data[key];
            }
        }
    }
    if (!deviceData.properties) {
        delete prepareData["Property"];
    }
    return prepareData;
}

function loopSearchDeviceData(dataObject, word, copyObject, parentKey) {
    let searchWord = word;
    for (var key in dataObject) {
        if (dataObject.hasOwnProperty(key)) {
            if (dataObject[key] instanceof Object) {
                if (key && !copyObject[key]) {
                    copyObject[key] = {};
                }
                loopSearchDeviceData(dataObject[key], searchWord, copyObject, key);
            } else if (
                key.toLowerCase().indexOf(searchWord) !== -1 ||
                dataObject[key].toLowerCase().indexOf(searchWord) !== -1
            ) {
                if (parentKey && !copyObject[parentKey]) {
                    copyObject[parentKey] = {};
                } else if (parentKey && copyObject[parentKey]) {
                    copyObject[parentKey][key] = dataObject[key];
                } else {
                    copyObject[key] = dataObject[key];
                }
            }
        }
    }
}

export { prepareDetailData, loopSearchDeviceData };
