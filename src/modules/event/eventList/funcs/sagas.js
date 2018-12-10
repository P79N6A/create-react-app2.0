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
 * Created by SongCheng on 20/05/2018.
 */
import { put, call, takeLatest, fork, takeEvery } from "redux-saga/effects";
import {
    EVENT_REQUEST_ITEMSSEARCH,
    EVENT_GETDETAIL_REQUEST,
    EXPORT_EVENT_DATA_REQUEST,
    EVENT_STREAM_REQUEST,
    EVENT_PARAMETERS_REQUEST
} from "./actionTypes";
import * as actions from "./actions";
import { actions as msg } from "modules/messageCenter";
import { getSearchItemsData, getDetaildata, exportEventData, getStreamDataApi, callParametersApi } from "api/event";
const moduleName = "Event";

function* searchItemsData(obj) {
    try {
        const result = yield call(getSearchItemsData, obj);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                let pagination = result.pagination;
                let arrayData = result.events;
                yield put(actions.getDataRequestSuccess(arrayData, pagination, obj.identify));
            } else {
                yield put(actions.getDataRequestFailed(obj.identify));
                yield put(msg.error(result.status.message, moduleName));
            }
        } else {
            yield put(msg.error(result.status.message || "unkown error!", moduleName));
        }
        // console.log("result", result);
    } catch (e) {
        yield put(msg.error(e.message, moduleName));
    }
}
function* detaildata(obj) {
    try {
        const result = yield call(getDetaildata, obj.id);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                let arrayData = result.events;
                yield put(actions.getDetailRequestSuccess(arrayData, obj.identify));
            } else {
                yield put(msg.error(result.status.message, moduleName));
            }
        } else {
            yield put(msg.error(result.status.message || "unkown error!", moduleName));
        }
        // console.log("result", result);
    } catch (e) {
        yield put(msg.error(e.message, moduleName));
    }
}

function* callExportEventData(obj) {
    try {
        const result = yield call(exportEventData, obj);
        yield put(actions.exportEventDataSuccess(obj.identify, result));
    } catch (e) {
        console.log("events export failed");
        // yield put(actions.exportEventDataFailure(identify));
        yield put(msg.error(e.message, moduleName));
    }
}

function* getStreamData(obj) {
    try {
        const result = yield call(getStreamDataApi, obj);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                let arrayData = result.events;
                yield put(actions.getStreamDataRequestSuccess(arrayData, obj.identify));
            } else {
                yield put(actions.getDataRequestFailed(obj.identify));
                yield put(msg.error(result.status.message, moduleName));
            }
        } else {
            yield put(msg.error(result.status.message || "unkown error!", moduleName));
        }
        // console.log("result", result);
    } catch (e) {
        yield put(msg.error(e.message, moduleName));
    }
}

function* callParameters(obj) {
    try {
        const result = yield call(callParametersApi, obj.value);
        yield put(actions.getParametersSuccess(result.parameters, obj.identify));
        // console.log("result", result);
    } catch (e) {
        yield put(msg.error(e.message, moduleName));
    }
}

function* getEventListSaga() {
    yield takeLatest(EVENT_STREAM_REQUEST, getStreamData);
    yield takeEvery(EVENT_REQUEST_ITEMSSEARCH, searchItemsData);
    yield takeLatest(EVENT_GETDETAIL_REQUEST, detaildata);
    yield takeEvery(EXPORT_EVENT_DATA_REQUEST, callExportEventData);
    yield takeLatest(EVENT_PARAMETERS_REQUEST, callParameters);
}

export default function* root() {
    yield [fork(getEventListSaga)];
}
