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
 * Created by KaiDi on 25/05/2018.
 */

import { put, call, takeEvery, fork } from "redux-saga/effects";
import { SAVE_KPI_REQUEST, KPI_PREVIEW_REQUEST, KPI_GET_DBLIST_REQUEST, GET_KPI_LIST_REQUEST } from "./actionTypes";
import * as actions from "./actions";
import { actions as msg } from "modules/messageCenter";
import { getPreview, getDbList, getServiceList, saveService } from "api/kpiBuilder";

function* callSaveKpi({ identify, serviceId, modifiedby, type, format, queryScript }) {
    try {
        const result = yield call(saveService, serviceId, modifiedby, type, format, queryScript);
        if (result && result.status && result.status.code === "00000000") {
            let message = "Save Kpi Successful.";
            yield put(actions.saveKpiSuccess(identify, message));
        } else {
            throw new Error(result.status.message);
        }
    } catch (e) {
        console.log("kpi save failed.");
        // let message = "Save Kpi Failed.";
        yield put(actions.saveKpiFailure(identify, e.message));
        yield put(msg.error(e.message));
    }
}

function* callPreview({ identify, dbtype, format, queryScript }) {
    try {
        const result = yield call(getPreview, dbtype, format, queryScript);
        if (result && result.recordset) {
            let recordset = result.recordset;
            let data = {};
            result.recordset.forEach((item, i) => {
                Object.keys(item).forEach(value => {
                    data[value] = data[value] || [];
                    data[value][i] = item[value];
                });
            });
            let keyList = Object.keys(data);
            yield put(actions.getPreviewSuccess(identify, recordset, keyList));
        } else {
            throw new Error("something wrong!");
        }
    } catch (e) {
        console.log("kpi query failed.");
        yield put(actions.getPreviewFailure(identify));
        yield put(msg.error(e.message));
    }
}

function* callKpiList({ identify }) {
    try {
        const result = yield call(getServiceList);
        if (result && result.status && result.status.code === "00000000") {
            let serviceList = result.configs;
            yield put(actions.getServiceListSuccess(identify, serviceList));
        } else {
            throw new Error("something wrong!");
        }
    } catch (e) {
        console.log("kpi query failed.");
        yield put(actions.getServiceListFailure(identify));
        yield put(msg.error(e.message));
    }
}

function* callDbConfig({ identify }) {
    try {
        const result = yield call(getDbList);
        if (result && result.status && result.status.code === "00000000") {
            let dbList = result.configs;
            yield put(actions.getDblistSuccess(identify, dbList));
        } else {
            throw new Error("something wrong!");
        }
    } catch (e) {
        console.log("get dbconfig list failed.");
        yield put(actions.getDblistFailure(identify));
        yield put(msg.error(e.message));
    }
}

function* previewSaga() {
    yield takeEvery(KPI_PREVIEW_REQUEST, callPreview);
}

function* dbConfigSaga() {
    yield takeEvery(KPI_GET_DBLIST_REQUEST, callDbConfig);
}

function* kpiListSaga() {
    yield takeEvery(GET_KPI_LIST_REQUEST, callKpiList);
}
function* saveKpiSaga() {
    yield takeEvery(SAVE_KPI_REQUEST, callSaveKpi);
}

export default function* root() {
    yield [fork(previewSaga), fork(dbConfigSaga), fork(kpiListSaga), fork(saveKpiSaga)];
}
