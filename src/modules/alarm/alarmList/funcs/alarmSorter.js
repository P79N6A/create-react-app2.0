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
 * Created by SongCheng on 20/05/2018
 */
const forAlarmArr = ["owner", "state", "removed", "associations", "devicetype", "alarmtype"];

let tempObj = {};

export const getSorterType = columnKey => {
    return forAlarmArr.find(value => value === columnKey) ? `capalarm.${columnKey}` : `capevent.${columnKey}`;
};

export const arrRemoveRepeat = (arr, columnKey) => {
    for (const value of arr) {
        tempObj[columnKey] = value;
    }
    return Object.values(tempObj);
};

export const letArrEmpty = () => {
    tempObj = {};
};
