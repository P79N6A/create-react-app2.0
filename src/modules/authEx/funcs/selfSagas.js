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
import { takeLatest, fork } from "redux-saga/effects";
import { LOGIN_ALL_PROPERTY_HANDLER } from "./actionTypes";
import { SETTINGS_KEY } from "commons/constants/const";

function replaceAllProperties(properties) {
    let result = JSON.parse(localStorage.getItem(SETTINGS_KEY));
    result.settings = properties.property;
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(result));
}

function* receiveAllProperties() {
    yield takeLatest(LOGIN_ALL_PROPERTY_HANDLER, replaceAllProperties);
}

export default function* root() {
    yield [fork(receiveAllProperties)];
}
