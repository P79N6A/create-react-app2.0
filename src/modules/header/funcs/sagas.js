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
 * Created by Jia Luo on 27/07/2018.
 */
import { put, call, takeLatest, fork } from "redux-saga/effects";
import * as actionTypes from "./actionTypes";
import * as actions from "./actions";
import * as message from "modules/messageCenter/funcs/actions";

import { getFile } from "api/security";

function* getAvatorData({ mediaFileId }) {
    try {
        const result = yield call(getFile, mediaFileId);
        if (result && result.length) {
            yield put(actions.getUserHeaderSuccess(result));
        } else {
            yield put(message.error("UNKOW ERROR!"));
            throw new Error(result.status.message || "UNKOW ERROR!");
        }
    } catch (e) {
        console.log(e);
    }
}

function* getLogoData({ mediaFileId }) {
    try {
        const result = yield call(getFile, mediaFileId);
        if (result && !result.code && result.length) {
            const urlCreator = window.URL || window.webkitURL;
            let logopic = result && result[0] ? urlCreator.createObjectURL(result[0]) : undefined;
            yield put(actions.getLogoSuccess(logopic));
        } else {
            yield put(actions.getLogoSuccess(""));
            yield put(message.error("UNKOW ERROR!"));
            throw new Error(result.status.message || "UNKOW ERROR!");
        }
    } catch (e) {
        console.log(e);
    }
}

function* getAvatorDataSaga() {
    yield takeLatest(actionTypes.BASE_HEADER_USER_GET_AVATOR_REQUEST, getAvatorData);
}
function* getLogoDataSaga() {
    yield takeLatest(actionTypes.BASE_HEADER_USER_GET_LOGO_REQUEST, getLogoData);
}
export default function* root() {
    yield [fork(getAvatorDataSaga), fork(getLogoDataSaga)];
}
