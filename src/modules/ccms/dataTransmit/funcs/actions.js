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
 * Created by wplei on 25/05/18.
 */

import * as actionTypes from "./actionType";

/**
 * transmit the datas from widgets
 * @param {String} topic --> property key
 * @param {any} datas --> property
 */
export const transmit = (topic, datas) => {
    return {
        type: actionTypes.CCMS_DATA_TRANSMIT,
        topic,
        datas
    };
};
/**
 * remove widget datas in redux
 * @param {String} topic --> property key
 */
export const destory = topic => {
    return {
        type: actionTypes.CCMS_DATA_DELETE,
        topic: topic
    };
};
