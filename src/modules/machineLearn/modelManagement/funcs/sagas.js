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
    SETREFRESHMODEL,
    SETDEVICEBASICTYPE,
    SETDELETEMODEL,
    SETMODELINFO,
    SETCREATEMODEL,
    SETUPDATEMODEL,
    SETCOMMONDISPLAYINFO
} from "./actionTypes";
import * as actions from "./actions";
import {
    modelManagementSearch,
    machineManagementModelDelete,
    machineManagementModelInfo,
    machineManagementModelCreate,
    machineManagementModelUpdate,
    addNewDeviceType,
    addSysconfigDeviceType,
    deviceBasicType
} from "api/modelManagement";
import { actions as msg } from "modules/messageCenter";
//import { I18n } from "react-i18nify";
const moduleName = "MANAGEMENT";

//refresh model
function* requestRefreshModelTable(obj) {
    try {
        const result = yield call(modelManagementSearch, obj.page, obj.rowsPerpage, obj.orderBy, obj.order);
        if (result && result.status) {
            if (result.status.code === "0000000000") {
                yield put(actions.getReFreshModel(result.result.modelSchedule, result.result.pagination, obj.identify));
            }
        }
    } catch (e) {
        yield put(msg.error(e.message, moduleName));
    }
}

//get device basic type
function* requestDeviceBasicType(obj) {
    try {
        const result = yield call(deviceBasicType, obj.sitename);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                yield put(actions.getDeviceBasicType(result.configs, obj.identify));
            }
        }
    } catch (e) {
        yield put(msg.error(e.message, moduleName));
    }
}

//delete model
function* requestDeleteModel(obj) {
    try {
        const result = yield call(machineManagementModelDelete, obj.modelId);
        if (result && result.status) {
            if (result.status.code === "0000000000") {
                yield put(msg.success("Delete Model Success", moduleName));
            }
        }
    } catch (e) {
        yield put(msg.error(e.message, moduleName));
    }
}

//get commonId display info
function* requestCommonDisplayInfo(obj) {
    try {
        const result = yield call(machineManagementModelInfo, obj.commonId);
        if (result && result.status) {
            if (result.status.code === "0000000000") {
                yield put(actions.getCommonDisplayInfo(result.result, obj.identify));
            }
        }
    } catch (e) {
        yield put(msg.error(e.message, moduleName));
    }
}

//get model Info
function* requestModelInfo(obj) {
    try {
        const result = yield call(machineManagementModelInfo, obj.modelId);
        if (result && result.status) {
            if (result.status.code === "0000000000") {
                yield put(actions.getModelInfo(result.result, obj.identify));
            }
        }
    } catch (e) {
        yield put(msg.error(e.message, moduleName));
    }
}

//create model
function* requestCreateModel(obj) {
    try {
        console.log(obj);
        const resultIot = yield call(addNewDeviceType, "Prediction-"+obj.modelName+"-"+obj.deviceTypeName, "Prediction-"+obj.modelName+"-"+obj.deviceTypeName);
        if (resultIot && resultIot.status && resultIot.status.code === "00000000") {
            const relustSysconfig = yield call(
                addSysconfigDeviceType,
                resultIot.mapData["devicemodel.iotTopologyId"],
                "Prediction-"+obj.modelName+"-"+obj.deviceTypeName,
                obj.additionalProperty,
                obj.basicTypeInstances,
                obj.deviceProperty,
                obj.sitename,
                obj.userid
            );
            if (relustSysconfig && relustSysconfig.status && relustSysconfig.status.code === "00000000") {
                let predictionDeviceId = resultIot.mapData["devicemodel.iotTopologyId"];
                const result = yield call(
                    machineManagementModelCreate,
                    obj.modelName,
                    "Prediction-"+obj.modelName+"-"+obj.deviceTypeName,
                    obj.venderName,
                    obj.description,
                    obj.modelType,
                    obj.fileSwagger,
                    obj.outputParameters,
                    predictionDeviceId,
                    obj.appid
                );
                if (result && result.status) {
                    if (result.status.code === "0000000000") {
                        yield put(msg.success("Create Device Type and Device Type Success", moduleName));
                    }
                }
            } else {
                yield put(msg.error(relustSysconfig.status.message, moduleName));
            }
        } else {
            yield put(msg.error(resultIot.status.message, moduleName));
        }
    } catch (e) {
        yield put(msg.error(e.message, moduleName));
    }
}

//update model
function* requestUpdateModel(obj) {
    try {
        const result = yield call(
            machineManagementModelUpdate,
            obj.modelId,
            obj.modelName,
            obj.description,
            obj.modelType,
            obj.fileSwagger
        );
        if (result && result.status) {
            if (result.status.code === "0000000000") {
                yield put(msg.success("Update Model Success", moduleName));
            }
        }
    } catch (e) {
        yield put(msg.error(e.message, moduleName));
    }
}

function* setRequestRefreshModelTable() {
    yield takeLatest(SETREFRESHMODEL, requestRefreshModelTable);
}

function* setRequestDeviceBasicType() {
    yield takeLatest(SETDEVICEBASICTYPE, requestDeviceBasicType);
}

function* setRequestDeleteModel() {
    yield takeLatest(SETDELETEMODEL, requestDeleteModel);
}

function* setRequestCommonDisplayInfo() {
    yield takeLatest(SETCOMMONDISPLAYINFO, requestCommonDisplayInfo);
}

function* setRequestModelInfo() {
    yield takeLatest(SETMODELINFO, requestModelInfo);
}

function* setRequestCreateModel() {
    yield takeLatest(SETCREATEMODEL, requestCreateModel);
}

function* setRequestUpdateModel() {
    yield takeLatest(SETUPDATEMODEL, requestUpdateModel);
}

export default function* root() {
    yield [
        fork(setRequestRefreshModelTable),
        fork(setRequestDeleteModel),
        fork(setRequestDeviceBasicType),
        fork(setRequestModelInfo),
        fork(setRequestCreateModel),
        fork(setRequestUpdateModel),
        fork(setRequestCommonDisplayInfo)
    ];
}
