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
 * Created by xulu on 25/05/2018.
 */
import { put, call, takeEvery, fork } from "redux-saga/effects";
import {
    TOPOLOGYMGMT_REQUEST,
    TOPOLOGYMGMT_TYPE_REQUEST,
    TOPOLOGYMGMT_DELETE_DEVICE,
    TOPOLOGYMGMT_DELETE_DEVICE_TYPE,
    TOPOLOGYMGMT_DELETE_SYSCONFIG_DEVICE_TYPE,
    TOPOLOGYMGMT_GET_SYSCONFIG_DEVICE_TYPE,
    TOPOLOGYMGMT_GET_SYSCONFIG_DEVICE_SCHEMA,
    TOPOLOGYMGMT_GET_SYSCONFIG_DEVICE_TYPE_SCHEMA,
    TOPOLOGYMGMT_GET_SYSCONFIG_BASIC_TYPE,
    TOPOLOGYMGMT_GET_SYSCONFIG_INTEGRATION_SYSTEM
} from "./actionTypes";
import * as actions from "./actions";
import { actions as msg } from "modules/messageCenter";
import {
    getTopologyData,
    getTopoDeviceType,
    deleteDeviceData,
    deleteDeviceTypeData,
    deleteSysconfigDeviceType,
    getSysconfigDeviceType,
    getSysconfigDeviceSchema,
    getSysconfigDeviceTypeSchema,
    getSysconfigBasictype,
    getSysconfigIntegrationSystems
} from "api/topology";
import { formatDeviceSchema, formatDeviceTypeSchema, formatIntegrationSystemsSchema } from "./formatSchema";
import { formatBasictypeSchema } from "../../topologyMgmtFloatTab/funcs/renderSchema";

function* getTopoData(obj) {
    try {
        const result = yield call(getTopologyData, obj.pageLimit, obj.pageNo, obj.predicate, obj.sortConfig);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                let pagination = result.pagination;
                let arrayData = result.arrayData;
                yield put(
                    actions.getTopoDataSuccess(
                        pagination,
                        arrayData,
                        obj.identify,
                        obj.predicate,
                        obj.sortConfig,
                        obj.orderDisplayName,
                        obj.orderDirection
                    )
                );
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

function* getTopoTypeData(obj) {
    try {
        const result = yield call(getTopoDeviceType, obj.pageLimit, obj.pageNo, obj.predicate, obj.sortConfig);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                let pagination = result.pagination;
                let arrayData = result.arrayData;
                yield put(
                    actions.getTopoTypeDataSuccess(
                        pagination,
                        arrayData,
                        obj.identify,
                        obj.predicate,
                        obj.sortConfig,
                        obj.orderDisplayName,
                        obj.orderDirection
                    )
                );
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

function* deleteDeviceFunc(obj) {
    try {
        const result = yield call(deleteDeviceData, obj.iotId);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                yield put(actions.deleteDeviceSuccess(obj.identify));
                yield put(msg.success(result.status.message));
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

function* deleteDeviceTypeFunc(obj) {
    try {
        const result = yield call(deleteDeviceTypeData, obj.iotId);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                yield put(actions.deleteDeviceTypeSuccess(obj.identify));
                yield put(actions.deleteSysconfigDeviceType(obj.identify, obj.iotId, obj.siteName));
                yield put(msg.success(result.status.message));
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

function* deleteSysconfigDeviceTypeFunc(obj) {
    try {
        const result = yield call(deleteSysconfigDeviceType, obj.deviceytypeId, obj.siteName);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                console.log("delete sysconfig devicetype success");
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

// get sysconfig device types func
function* getSysconfigDeviceTypeFunc(obj) {
    try {
        const result = yield call(getSysconfigDeviceType, obj.siteName);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                let deviceTypesData = result.configs;
                // let formatDeviceTypesData = formatDeviceTypesData(deviceTypesData);
                yield put(actions.getSysconfigDeviceTypeSuccess(obj.identify, deviceTypesData, obj.dataType));
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

// get sysconfig basic types func
function* getSysconfigBasictypeFunc(obj) {
    try {
        const result = yield call(getSysconfigBasictype, obj.siteName);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                let configs = result.configs;
                let basictypes = formatBasictypeSchema(configs);
                yield put(actions.getSysconfigBasicTypeSuccess(obj.identify, obj.schemaType, basictypes));
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

// get sysconfig device schema func
function* getSysconfigDeviceSchemaFunc(obj) {
    try {
        const result = yield call(getSysconfigDeviceSchema, obj.siteName);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                let configs = result.configs;
                let { deviceSchema, devicePropertySchema } = formatDeviceSchema(configs);
                yield put(actions.getSysconfigDeviceSchemaSuccess(obj.identify, deviceSchema, devicePropertySchema, obj.schemaType));
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

// get sysconfig device type schema
function* getSysconfigDeviceTypeSchemaFunc(obj) {
    try {
        const result = yield call(getSysconfigDeviceTypeSchema, obj.siteName);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                let configs = result.config;
                let devicetypeSchema = formatDeviceTypeSchema(configs);
                yield put(actions.getSysconfigDeviceTypeSchemaSuccess(obj.identify, obj.schemaType, devicetypeSchema));
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

// get sysconfig integration systems
function* getSysconfigIntegrationSystemsFunc(obj) {
    try {
        const result = yield call(getSysconfigIntegrationSystems, obj.siteName);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                let configs = result.configs;
                let integrationSystemsSchema = formatIntegrationSystemsSchema(configs);
                console.log("integrationSystemsSchema: ", integrationSystemsSchema);
                yield put(
                    actions.getSysconfigIntegrationSystemsSuccess(
                        obj.identify,
                        obj.schemaType,
                        integrationSystemsSchema
                    )
                );
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

function* getTopologyListSaga() {
    yield takeEvery(TOPOLOGYMGMT_REQUEST, getTopoData);
}

function* getTopologyTypeListSaga() {
    yield takeEvery(TOPOLOGYMGMT_TYPE_REQUEST, getTopoTypeData);
}

function* deleteDeviceSaga() {
    yield takeEvery(TOPOLOGYMGMT_DELETE_DEVICE, deleteDeviceFunc);
}

function* deleteDeviceTypeSaga() {
    yield takeEvery(TOPOLOGYMGMT_DELETE_DEVICE_TYPE, deleteDeviceTypeFunc);
}

function* deleteSysconfigDeviceTypeSaga() {
    yield takeEvery(TOPOLOGYMGMT_DELETE_SYSCONFIG_DEVICE_TYPE, deleteSysconfigDeviceTypeFunc);
}

// get sysconfig device type sage
function* getSysconfigDeviceTypeSaga() {
    yield takeEvery(TOPOLOGYMGMT_GET_SYSCONFIG_DEVICE_TYPE, getSysconfigDeviceTypeFunc);
}

// get sysconfig basic type saga
function* getSysconfigBasictypeSaga() {
    yield takeEvery(TOPOLOGYMGMT_GET_SYSCONFIG_BASIC_TYPE, getSysconfigBasictypeFunc);
}

//get sysconfig device schema sage
function* getSysconfigDeviceSchemaSaga() {
    yield takeEvery(TOPOLOGYMGMT_GET_SYSCONFIG_DEVICE_SCHEMA, getSysconfigDeviceSchemaFunc);
}

//get sysconfig device type schema sage
function* getSysconfigDeviceTypeSchemaSaga() {
    yield takeEvery(TOPOLOGYMGMT_GET_SYSCONFIG_DEVICE_TYPE_SCHEMA, getSysconfigDeviceTypeSchemaFunc);
}

//get sysconfig device type schema sage
function* getSysconfigIntegrationSystemsSaga() {
    yield takeEvery(TOPOLOGYMGMT_GET_SYSCONFIG_INTEGRATION_SYSTEM, getSysconfigIntegrationSystemsFunc);
}

export default function* root() {
    yield [
        fork(getTopologyListSaga),
        fork(getTopologyTypeListSaga),
        fork(deleteDeviceSaga),
        fork(deleteDeviceTypeSaga),
        fork(deleteSysconfigDeviceTypeSaga),
        fork(getSysconfigDeviceTypeSaga),
        fork(getSysconfigDeviceSchemaSaga),
        fork(getSysconfigDeviceTypeSchemaSaga),
        fork(getSysconfigBasictypeSaga),
        fork(getSysconfigIntegrationSystemsSaga)
    ];
}
