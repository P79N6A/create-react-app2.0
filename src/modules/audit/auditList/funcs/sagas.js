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
 * Created by SongCheng on 31/08/2018.
 */
import { put, call, takeLatest, fork } from "redux-saga/effects";
import { AUDIT_REQUEST_ITEMSSEARCH, AUDIT_GETDETAIL_REQUEST, AUDIT_GETREQUESTCONTENT } from "./actionTypes";
import * as actions from "./actions";
import { actions as msg } from "modules/messageCenter";
import { getSearchItemsData, getDetaildata, getRequestContent } from "api/audit";

function* searchItemsData(obj) {
    try {
        const result = yield call(getSearchItemsData, obj);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                let pagination = result.pagination;
                let arrayData = result.audits;
                yield put(actions.getDataRequestSuccess(arrayData, pagination, obj.identify));
            } else {
                yield put(actions.getDataRequestFailed(obj.identify));
                throw new Error(result.status.message);
            }
        } else {
            throw new Error("unkown error!");
        }
        console.log("result", result);
    } catch (e) {
        yield put(msg.error(e.message));
    }
}

function* detaildata(obj) {
    try {
        const result = yield call(getDetaildata, obj.id);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                let arrayData = result.audits;
                yield put(actions.getDetailRequestSuccess(arrayData, obj.identify));
            } else {
                throw new Error(result.status.message);
            }
        } else {
            throw new Error("unkown error!");
        }
        console.log("result", result);
    } catch (e) {
        yield put(msg.error(e.message));
    }
}

function* requestContent(obj) {
    try {
        const result = yield call(getRequestContent, obj.id);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                let contentBody = result.audits[0].contentbody;
                yield put(actions.getRequestContentSuccess(contentBody, obj.identify));
            } else {
                throw new Error(result.status.message);
            }
        } else {
            throw new Error("unkown error!");
        }
        console.log("result", result);
    } catch (e) {
        yield put(msg.error(e.message));
    }
}

function* getAuditListSaga() {
    yield takeLatest(AUDIT_REQUEST_ITEMSSEARCH, searchItemsData);
    yield takeLatest(AUDIT_GETDETAIL_REQUEST, detaildata);
    yield takeLatest(AUDIT_GETREQUESTCONTENT, requestContent);
}

export default function* root() {
    yield [fork(getAuditListSaga)];
}
