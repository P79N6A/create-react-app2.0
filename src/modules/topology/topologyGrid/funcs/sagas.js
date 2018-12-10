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
    TOPOLOGY_REQUEST,
    TOPOLOGY_EXPORT_TOPOLOGY_DATA,
    TOPOLOGY_GET_SYSCONFIG_DEVICE_TYPE,
    TOPOLOGY_GET_SYSCONFIG_DEVICE_SCHEMA,
    TOPOLOGY_GET_SYSCONFIG_DEVICE_TYPE_SCHEMA
} from "./actionTypes";
import * as actions from "./actions";
import { actions as msg } from "modules/messageCenter";
import {
    getTopologyData,
    exportTopologyData,
    getSysconfigDeviceType,
    getSysconfigDeviceSchema,
    getSysconfigDeviceTypeSchema
} from "api/topology";
import { formatDeviceSchema, formatDeviceTypeSchema } from "./formatSchema";

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

function* exportTopologyDataFunc(obj) {
    try {
        const result = yield call(exportTopologyData);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                let arrayData = result.arrayData;
                yield put(actions.exportTopologyDataSuccess(obj.identify, arrayData));
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

// get sysconfig device schema func
function* getSysconfigDeviceSchemaFunc(obj) {
    try {
        const result = yield call(getSysconfigDeviceSchema, obj.siteName);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                let configs = result.configs;
                let { deviceSchema, devicePropertySchema } = formatDeviceSchema(configs);
                yield put(
                    actions.getSysconfigDeviceSchemaSuccess(
                        obj.identify,
                        deviceSchema,
                        devicePropertySchema,
                        obj.schemaType
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

function* getTopologyListSaga() {
    yield takeEvery(TOPOLOGY_REQUEST, getTopoData);
}

function* exportTopologyDataSaga() {
    yield takeEvery(TOPOLOGY_EXPORT_TOPOLOGY_DATA, exportTopologyDataFunc);
}

// get sysconfig device type sage
function* getSysconfigDeviceTypeSaga() {
    yield takeEvery(TOPOLOGY_GET_SYSCONFIG_DEVICE_TYPE, getSysconfigDeviceTypeFunc);
}

//get sysconfig device schema sage
function* getSysconfigDeviceSchemaSaga() {
    yield takeEvery(TOPOLOGY_GET_SYSCONFIG_DEVICE_SCHEMA, getSysconfigDeviceSchemaFunc);
}

//get sysconfig device type schema sage
function* getSysconfigDeviceTypeSchemaSaga() {
    yield takeEvery(TOPOLOGY_GET_SYSCONFIG_DEVICE_TYPE_SCHEMA, getSysconfigDeviceTypeSchemaFunc);
}

export default function* root() {
    yield [
        fork(getTopologyListSaga),
        fork(exportTopologyDataSaga),
        fork(getSysconfigDeviceTypeSaga),
        fork(getSysconfigDeviceSchemaSaga),
        fork(getSysconfigDeviceTypeSchemaSaga)
    ];
}
