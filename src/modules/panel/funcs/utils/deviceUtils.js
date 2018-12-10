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

// get choosed count
export const getDeviceChoosedCount = (sumArr, targetArr, device) => {
    const data = [];
    sumArr.forEach(item => {
        for (const val of targetArr) {
            if ("Device" !== device && item.resource === val) {
                data.push(item);
            } else if(item.sensorstatus === val) {
                data.push(item);
            }
        }
    });
    return data;
};

// calc the multiple count 
export const calcDeviceMultipleCount = (e) => {
    let result = 0;
    const temp = e.map(item => {
        return item.count;
    });
    temp.forEach(item => {
        result += Number(item);
    });
    return result;
};

// get the filter data by device type of device status
export const getDataForFilter = (data, type) => {
    switch(type) {
        case "All":
            return [];
        case "Device":
            const result = data.filter(filterItem => filterItem.sensorstatus).map(item => item.sensorstatus);
            return [...new Set(result)];
        default:
            return data.map(item => item.resource);
    }
};

// device clac sum
export const deviceCalcSum = (data) => {
    let result = 0;
    if (Array.isArray(data)) {
        const tempData = data.filter(filterItem => filterItem.count !== "undefined");
        if (tempData.length) {
            tempData.forEach(eachItem => {
                result += Number(eachItem.count);
            });
        }
    }
    return result;
};

// handle device for request
export const handleDeviceForServer = (deviceType) => {
    switch (deviceType) {
        case "Device Status":
            return "Device";
        case "Device Type":
            return "Model";
        case "Application/Address":
            return "Address";
        default:
            return "All";
    }
};