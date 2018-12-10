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
 * Created by HuLin on 03/08/2018.
 */
import { put, call, takeLatest, fork } from "redux-saga/effects";
import {
    SETEXPORTPARAMS,
    REQUESTNAME,
    SETDEFAULTDATA,
    GETSEARCHDATE,
    SETDOWNLOAD,
    SETREFLUSH,
    SETNOSELECT
} from "./actionTypes";
import * as actions from "./actions";
import {
    requestExportParams,
    getDisplayName,
    requestDefaultData,
    requestSearch,
    getTableVal,
    downloadTaskId,
    reflush
} from "api/dataSearch";
import { actions as msg } from "modules/messageCenter";
import { I18n } from "react-i18nify";
const moduleName = "Data Export";

function* getExportParam() {
    try {
        const result = yield call(requestExportParams);
        if (result && result.status) {
            if (result.status.code === "0000000000") {
                yield put(actions.getExportParams(result.result));
            } else {
                throw new Error(result.status.message);
            }
        } else {
            throw new Error(I18n.t("dataExport.sagasError.getExportParam"));
        }
    } catch (e) {
        yield put(msg.error(e.message, moduleName));
    }
}

function* getDisplayVal(arr) {
    try {
        const result = yield call(getDisplayName, arr.arr.sitename);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                yield put(actions.configNames(result));
            } else {
                throw new Error(result.status.message);
            }
        } else {
            throw new Error(I18n.t("dataExport.sagasError.getDisplayVal"));
        }
    } catch (e) {
        yield put(msg.error(e.message, moduleName));
    }
}

function* getDefaultTableData(obj) {
    try {
        const resultDefaultData = yield call(requestDefaultData, obj.obj.page, obj.obj.rowSize);
        if (resultDefaultData.status.code === "0000000000") {
            yield put(actions.getDefaultTableData(resultDefaultData.result));
        } else {
            yield put(msg.error(resultDefaultData.status.message, moduleName));
            throw new Error(I18n.t("dataExport.sagasError.getDefaultTableData"));
        }
    } catch (e) {
        yield put(msg.error(e.message, moduleName));
    }
}

function* getDataSearch(obj) {
    try {
        const result = yield call(
            requestSearch,
            obj.obj.exportId,
            obj.obj.taskName,
            obj.obj.taskDes,
            obj.obj.selectVal,
            obj.obj.startTime,
            obj.obj.endTime
        );
        if (result && result.status) {
            if (result.status.code === "0000000000") {
                const status = yield call(getTableVal, result.result.taskId);
                if (status.status.code === "0000000000") {
                    yield put(msg.success(I18n.t("dataExport.exportSuccess"), moduleName));
                    yield put(
                        actions.getReflush(
                            result.result.taskId,
                            JSON.parse(status.result.jobMessage).state,
                            result.result.jobStatus
                        )
                    );
                    const resultDefaultData = yield call(requestDefaultData, obj.obj.page, obj.obj.rowSize);
                    if (resultDefaultData.status.code === "0000000000") {
                        yield put(actions.getDefaultTableData(resultDefaultData.result));
                    } else {
                        yield put(msg.error(resultDefaultData.status.message, moduleName));
                    }
                }
            } else {
                yield put(msg.error(result.status.message, moduleName));
            }
        } else {
            throw new Error(I18n.t("dataExport.sagasError.getDataSearch"));
        }
    } catch (e) {
        yield put(msg.error(e.message, moduleName));
    }
}

function* downloadTask(taskId) {
    try {
        const resultDefaultData = yield call(downloadTaskId, taskId.taskId);
        if (resultDefaultData && resultDefaultData.status) {
            if (resultDefaultData.status.code === "0000000000") {
                yield put(
                    actions.getDownloadUrl(resultDefaultData.result["jobResult"], resultDefaultData.result.taskId)
                );
            } else {
                yield put(msg.error(resultDefaultData.status.message, moduleName));
            }
        }else {
            throw new Error(I18n.t("dataExport.sagasError.downloadTask"));
        }
    } catch (e) {
        yield put(msg.error(e.message, moduleName));
    }
}

function* reflushTable(obj) {
    try {
        const result = yield call(reflush, obj.obj);
        if (result.status.code === "0000000000") {
            yield put(actions.getReflush(obj.obj, JSON.parse(result.result.jobMessage).state, result.result.jobStatus));
        } else {
            yield put(msg.error(result.status.message, moduleName));
            throw new Error("unkown error!");
        }
    } catch (e) {
        yield put(msg.error(e.message, moduleName));
    }
}

function* noSelect(obj) {
    try {
        if (obj.name === "config") {
            yield put(msg.error(I18n.t("dataExport.noSelectConfig"), moduleName));
        } else if (obj.name === "time") {
            yield put(msg.error(I18n.t("dataExport.noSelectRange"), moduleName));
        } else {
            yield put(msg.error(I18n.t("dataExport.sameExportData"), moduleName));
        }
    } catch (e) {
        yield put(msg.error(e.message, moduleName));
    }
}

function* getExportParams() {
    yield takeLatest(SETEXPORTPARAMS, getExportParam);
}

function* getDisplayVals() {
    yield takeLatest(REQUESTNAME, getDisplayVal);
}

function* getDefaultTableDatas() {
    yield takeLatest(SETDEFAULTDATA, getDefaultTableData);
}

function* getDataSearchs() {
    yield takeLatest(GETSEARCHDATE, getDataSearch);
}

function* downloadTasks() {
    yield takeLatest(SETDOWNLOAD, downloadTask);
}

function* reflushTables() {
    yield takeLatest(SETREFLUSH, reflushTable);
}

function* noSelects() {
    yield takeLatest(SETNOSELECT, noSelect);
}

export default function* root() {
    yield [
        fork(getExportParams),
        fork(getDisplayVals),
        fork(getDefaultTableDatas),
        fork(getDataSearchs),
        fork(downloadTasks),
        fork(reflushTables),
        fork(noSelects)
    ];
}
