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
    SETREQUESTDEVICENAME,
    SETMODELPREDICTIONDESOUT,
    SETDEVICEVALUE,
    SETCREATEJOB,
    SETRELASHJOBSCHEDULE,
    SETJOBSCHEDULEHEAD,
    SETMACHINEDELETE,
    SETMACHINEJOBSTATUS,
    SETCHOOSEMODELVALUE,
    SETMODELINPUTOUTPUTPARAMETERS,
    SETDATAPROCESSINFO
} from "./actionTypes";
import * as actions from "./actions";
import {
    getRequestDeviceName,
    getRequestDeviceTypeValue,
    createJob,
    searchJobSchedule,
    machineGetTableHead,
    machineDelete,
    machineUpdateJobStatus,
    machineGetModelParameters,
    machineGetDataProcessInfo
} from "api/machineLearn";
import {
    machineManagementModelInfo
} from "api/modelManagement";

import { modelManagementSearch } from "api/modelManagement";
import { actions as msg } from "modules/messageCenter";
//import { I18n } from "react-i18nify";
const moduleName = "MACHINA LEARNING";

function* requestDeviceName(obj) {
    try {
        const result = yield call(getRequestDeviceName, obj.sitename);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                yield put(actions.getRequestDeviceName(result.configs, obj.identify));
            }
        }
    } catch (e) {
        yield put(msg.error(e.message, moduleName));
    }
}

function* requestDeviceTypeName(obj) {
    try {
        const result = yield call(getRequestDeviceTypeValue, obj.sitename, obj.deviceValue);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                yield put(actions.getDeviceValue(result.config.configvals, obj.identify));
            }
        }
    } catch (e) {
        yield put(msg.error(e.message, moduleName));
    }
}
//set modelPredictionDesOut
function* requestModelPredictionDesOut(obj) {
    try {
        const result = yield call(machineManagementModelInfo, obj.modelId);
        if (result && result.status) {
            if (result.status.code === "0000000000") {
                yield put(actions.getModelPredictionDesOut(result.result.predictionDeviceTypeName, result.result.vendor, result.result.predictionDeviceId, result.result.mlOutputStructure, result.result.swaggerJson, obj.identify));
            }
        }
    } catch (e) {
        yield put(msg.error(e.message, moduleName));
    }
}

//get model input output parameter
function* requestModelInputOutputParameters(obj) {
    try {
        const result = yield call(machineGetModelParameters, obj.modelId);
        if (result && result.status) {
            if (result.status.code === "0000000000") {
                yield put(actions.getModelInputOutputParameters(result.result, obj.identify));
            }
        }
    } catch (e) {
        yield put(msg.error(e.message, moduleName));
    }
}

//get data process info
function* requestDataProcessInfo(obj) {
    try {
        const result = yield call(machineGetDataProcessInfo, obj.taskId);
        if (result && result.status) {
            if (result.status.code === "0000000000") {
                yield put(actions.getDataProcessInfo(result.result, obj.identify));
            }
        }
    } catch (e) {
        yield put(msg.error(e.message, moduleName));
    }
}

function* requestCreateJob(obj) {
    try {
        console.log(obj);
        const result = yield call(
            createJob,
            obj.name,
            obj.description,
            obj.deviceName,
            obj.deviceTypeValue,
            obj.jobType,
            obj.appid,
            obj.inputDeviceType,
            obj.modelAPIInput,
            obj.modelId,
            obj.swaggerJson,
            obj.driverCores,
            obj.driverMemory,
            obj.engineType,
            obj.engineUrl,
            obj.executorCores,
            obj.executorMemory,
            obj.configFilePath,
            obj.fileSystemUrl,
            obj.accountId,
            obj.deviceTypeModelName,
            obj.venderName,
            obj.predictionDeviceId,
            obj.mlOutputStructure
        );
        if (result && result.status) {
            if (result.status.code === "0000000000") {
                yield put(actions.getJudgeSuccess(true, obj.identify));
                yield put(msg.success("Job Create Success", moduleName));
            } else {
                yield put(actions.getJudgeSuccess(false, obj.identify));
                yield put(msg.error(result.status.message, moduleName));
            }
        }
    } catch (e) {
        yield put(msg.error(e.message, moduleName));
    }
}

function* requestJobScheduleTable(obj) {
    try {
        const result = yield call(searchJobSchedule, obj.page, obj.rowsPerpage, obj.orderBy, obj.order);
        if (result && result.status) {
            if (result.status.code === "0000000000") {
                yield put(
                    actions.getJobScheduleTable(result.result.JobSchedule, result.result.pagination, obj.identify)
                );
            }
        }
    } catch (e) {
        yield put(msg.error(e.message, moduleName));
    }
}

//get model table info
function* requestModelTable(obj) {
    try {
        const result = yield call(modelManagementSearch, obj.page, obj.rowsPerpage, obj.orderBy, obj.order);
        if (result && result.status) {
            if (result.status.code === "0000000000") {
                yield put(
                    actions.getChooseModelValue(result.result.modelSchedule, obj.identify)
                );
            }
        }
    } catch (e) {
        yield put(msg.error(e.message, moduleName));
    }
}

function* requestJobScheduleHead(obj) {
    try {
        const result = yield call(machineGetTableHead, obj.flag);
        if (result && result.status) {
            if (result.status.code === "0000000000") {
                if (obj.flag) {
                    yield put(actions.getJobScheduleHead(result.result.column, {}, obj.identify));
                } else {
                    yield put(actions.getJobScheduleHead({}, result.result.column, obj.identify));
                }
            }
        }
    } catch (e) {
        yield put(msg.error(e.message, moduleName));
    }
}

function* requestDeleteSchedule(obj) {
    try {
        const result = yield call(machineDelete, obj.taskId);
        if (result && result.status) {
            if (result.status.code === "0000000000") {
                yield put(msg.success("Delete Success", moduleName));
            }
        }
    } catch (e) {
        yield put(msg.error(e.message, moduleName));
    }
}

function* requestUpdateJobStatus(obj) {
    try {
        const result = yield call(machineUpdateJobStatus, obj.taskId);
        if (result && result.status) {
            if (result.status.code === "0000000000") {
                yield put(msg.success("Close Machine Success", moduleName));
            }
        }
    } catch (e) {
        yield put(msg.error(e.message, moduleName));
    }
}

function* setRequestDeviceName() {
    yield takeLatest(SETREQUESTDEVICENAME, requestDeviceName);
}

function* setRequestModelPredictionDesOut() {
    yield takeLatest(SETMODELPREDICTIONDESOUT, requestModelPredictionDesOut);
}


function* setRequestDeviceTypeName() {
    yield takeLatest(SETDEVICEVALUE, requestDeviceTypeName);
}

function* setRequestDataProcessInfo() {
    yield takeLatest(SETDATAPROCESSINFO, requestDataProcessInfo);
}


function* setRequestModelInputOutputParameters() {
    yield takeLatest(SETMODELINPUTOUTPUTPARAMETERS, requestModelInputOutputParameters);
}

function* setRequestCreateJob() {
    yield takeLatest(SETCREATEJOB, requestCreateJob);
}

function* setRequestJobScheduleTable() {
    yield takeLatest(SETRELASHJOBSCHEDULE, requestJobScheduleTable);
}

function* setRequestModelTable() {
    yield takeLatest(SETCHOOSEMODELVALUE, requestModelTable);
}

function* setRequestJobScheduleHead() {
    yield takeLatest(SETJOBSCHEDULEHEAD, requestJobScheduleHead);
}

function* setRequestDeleteSchedule() {
    yield takeLatest(SETMACHINEDELETE, requestDeleteSchedule);
}

function* setRequestUpdateJobStatus() {
    yield takeLatest(SETMACHINEJOBSTATUS, requestUpdateJobStatus);
}

export default function* root() {
    yield [
        fork(setRequestDeviceName),
        fork(setRequestModelPredictionDesOut),
        fork(setRequestDeviceTypeName),
        fork(setRequestDataProcessInfo),
        fork(setRequestModelInputOutputParameters),
        fork(setRequestCreateJob),
        fork(setRequestJobScheduleTable),
        fork(setRequestModelTable),
        fork(setRequestJobScheduleHead),
        fork(setRequestDeleteSchedule),
        fork(setRequestUpdateJobStatus)
    ];
}
