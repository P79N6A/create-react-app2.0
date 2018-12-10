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
 * Created by Krishalee on 16/11/18.
 */
import { put, call, takeLatest, fork } from "redux-saga/effects";
import * as actionTypes from "./actionTypes";
import * as actions from "./actions";
import * as fileApi from "api/file";
import * as importExportApi from "api/deviceImportExport";
import { actions as msg } from "modules/messageCenter";

function* getConfigsfromsyaconfig(data) {
    try {
        const result = yield call(fileApi.getConfigsFromSysconfig, data);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                // let data = {
                //     "configs": result.configs[0].configvals.configval,
                //     // "pagination": result.pagination
                // };
                console.log("test ", result);
                yield put(actions.getConfigSuccess(result.configs[0].configvals.configval));
            } else {
                throw new Error(result.status.message);
            }
        } else {
            throw new Error("unkown error!");
        }
    } catch (e) {
        yield put(msg.error(e.message));
    }
}

function* getFileHistoryfromapi(postData) {
    try {
        const result = yield call(importExportApi.fileHistory, postData);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                let data = {
                    files: result.arrayData,
                    pagination: result.pagination
                };
                yield put(actions.getFileHistorySuccess(data));
            } else {
                throw new Error(result.status.message);
            }
        } else {
            throw new Error("unkown error!");
        }
    } catch (e) {
        yield put(msg.error(e.message));
    }
}

function* deviceImport(obj) {
    try {
        const result = yield call(importExportApi.deviceImport, obj.file, obj.uploadtype);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                console.log("file upload success", result);
                yield put(msg.success(result.mapData.status));
                yield put(actions.deviceImportSuccess(result.mapData));
            } else {
                yield put(actions.deviceImportFail(result));
                console.log("file upload fail");
                throw new Error(result.status.message);
            }
        } else {
            console.log("unkown error");
            throw new Error("unkown error!");
        }
    } catch (e) {
        console.log("message ", e.message);
        yield put(msg.error(e.message));
    }
}

function* topoimport() {
    yield takeLatest(actionTypes.TOPOIMPORT_CONFIGS_FROM_SYSCONFIG, getConfigsfromsyaconfig);
    yield takeLatest(actionTypes.TOPOIMPORT_GET_FILE_HISTORY, getFileHistoryfromapi);
    yield takeLatest(actionTypes.TOPOIMPORT_BULK_DEVICE_IMPORT, deviceImport);
}

export default function* root() {
    yield [fork(topoimport)];
}
