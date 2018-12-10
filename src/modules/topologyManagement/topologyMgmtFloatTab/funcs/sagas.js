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
import * as actionTypes from "./actionTypes";
import * as actions from "./actions";
import { actions as msg } from "modules/messageCenter";
import {
    getTopologyDetail,
    getTopologyAlarm,
    getTopologyEvent,
    getTopoDeviceType,
    searchTopoAddress,
    addNewDevice,
    getDeviceSchema,
    getDeviceTypeSchema,
    addNewDeviceType,
    addSysconfigDeviceType,
    getSysconfigBasictype,
    getDeviceTypeDetail,
    getSysconfigDeviceTypeDetail,
    searchTopoLocation,
    updateDevicetypeProperty,
    editDeviceDetail,
    addLocation,
    editDeviceType,
    editSysconfigDeviceType,
    sendDeviceCommandFetch
} from "api/topology";
import { upload } from "api/security";
import { getTopologySchema, addNewAddress } from "api/application";
import { formatDevicetypeSchema, formatBasictypeSchema, formatApplicationSchema } from "./renderSchema";

function* getTopoDetail(obj) {
    try {
        const result = yield call(getTopologyDetail, obj.deviceId);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                let arrayData = result.arrayData && result.arrayData[0];
                yield put(actions.getTopoDetailSuccess(arrayData, obj.identify));
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

function* getTopoAlarm(obj) {
    try {
        const result = yield call(getTopologyAlarm, obj.iotId, obj.pageNo, obj.pageLimit, obj.orderOpt);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                let alarms = result.alarms;
                let alarmPagination = result.pagination;
                yield put(actions.getTopoAlarmsSuccess(alarms, alarmPagination, obj.identify, obj.orderOpt));
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

function* getTopoEvent(obj) {
    try {
        const result = yield call(getTopologyEvent, obj.iotId, obj.pageNo, obj.pageLimit, obj.currentOrder);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                let events = result.events;
                let eventPagination = result.pagination;
                yield put(actions.getTopoEventsSuccess(events, eventPagination, obj.identify, obj.orderOpt));
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

function* searchTopoTypeFunc(obj) {
    try {
        const result = yield call(getTopoDeviceType);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                let arrayData = result.arrayData;
                yield put(actions.getTopoTypeDataSuccess(obj.identify, arrayData));
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

function* searchTopoAddressFunc(obj) {
    try {
        const result = yield call(searchTopoAddress, obj.address, obj.limit, obj.pageno);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                const arrayData = result.arrayData;
                const pagination = result.pagination;
                yield put(actions.searchAddressSuccess(obj.identify, arrayData, pagination, obj.clearLiveSearch));
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

function* searchTopoLocationFunc(obj) {
    try {
        const result = yield call(searchTopoLocation, obj.location, obj.limit, obj.pageno);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                let arrayData = result.arrayData;
                const pagination = result.pagination;
                yield put(actions.topoSearchLocationSuccess(obj.identify, arrayData, pagination, obj.clearLiveSearch));
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

function* addDeviceFunc(obj) {
    try {
        const result = yield call(
            addNewDevice,
            obj.devicetypeId,
            obj.deviceName,
            obj.deviceDisplayName,
            obj.deviceAddressId,
            obj.deviceLocationId,
            obj.parentDeviceId,
            obj.properties
        );
        if (result && result.status) {
            if (result.status.code === "00000000") {
                let deviceId = result.mapData["physical.iotTopologyId"];
                if (obj.properties["deviceid"]) {
                    obj.properties["deviceid"] = deviceId;
                }
                yield put(actions.addNewDeviceSuccess(obj.identify));
                yield put(msg.success(result.status.message));
                // if (obj.properties) {
                //     yield put(actions.addNewDevicetypeProperty(obj.identify, deviceId, {}, obj.properties));
                // }
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

function* addDeviceTypeFunc(obj) {
    try {
        const result = yield call(
            addNewDeviceType,
            obj.defaultvalues.devicetypedisplayname,
            obj.defaultvalues.devicetypename
        );
        if (result && result.status) {
            if (result.status.code === "00000000") {
                let devicetypeId = result.mapData["devicemodel.iotTopologyId"];
                yield put(actions.addNewDevicetypeSuccess(obj.identify));
                yield put(
                    actions.addNewDevicetypeToSysconfig(
                        obj.identify,
                        devicetypeId,
                        obj.defaultvalues,
                        obj.basicTypeInstances,
                        obj.additionalProperty,
                        obj.deviceProperty,
                        obj.siteName,
                        obj.userid
                    )
                );
                // yield put(actions.addNewDevicetypeProperty(obj.identify, devicetypeId, obj.propertyFromat));
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

function* addSysconfigDeviceTypeFunc(obj) {
    try {
        const result = yield call(
            addSysconfigDeviceType,
            obj.devicetypeId,
            obj.defaultvalues,
            obj.additionalProperty,
            obj.basicTypeInstances,
            obj.deviceProperty,
            obj.siteName,
            obj.userid
        );
        if (result && result.status) {
            if (result.status.code === "00000000") {
                yield put(actions.addNewDevicetypeToSysconfigSuccess(obj.identify));
            } else {
                yield put(actions.deleteDevicetype(obj.identify, obj.devicetypeId));
                throw new Error(result.status.message);
            }
        } else {
            yield put(actions.deleteDevicetype(obj.identify, obj.devicetypeId));
            throw new Error("unkown error!");
        }
    } catch (e) {
        yield put(msg.error(e.message));
    }
}

function* editDeviceTypeFunc(obj) {
    try {
        const result = yield call(
            editDeviceType,
            obj.selectDeviceId,
            obj.defaultvalues.devicetypedisplayname,
            obj.defaultvalues.devicetypename
        );
        if (result && result.status) {
            if (result.status.code === "00000000") {
                let devicetypeId = result.mapData["devicemodel.iotTopologyId"];
                // yield put(actions.editDevicetypeSuccess(obj.identify));
                yield put(
                    actions.editDevicetypeToSysconfig(
                        obj.identify,
                        devicetypeId,
                        obj.defaultvalues,
                        obj.basicTypeInstances,
                        obj.additionalProperty,
                        obj.deviceProperty,
                        obj.siteName,
                        obj.userid
                    )
                );
                // yield put(actions.addNewDevicetypeProperty(obj.identify, devicetypeId, obj.propertyFromat));
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

function* editSysconfigDeviceTypeFunc(obj) {
    try {
        const result = yield call(
            editSysconfigDeviceType,
            obj.devicetypeId,
            obj.defaultvalues,
            obj.additionalProperty,
            obj.basicTypeInstances,
            obj.deviceProperty,
            obj.siteName,
            obj.userid
        );
        if (result && result.status) {
            if (result.status.code === "00000000") {
                yield put(actions.addNewDevicetypeToSysconfigSuccess(obj.identify));
            } else {
                yield put(actions.deleteDevicetype(obj.identify, obj.devicetypeId));
                throw new Error(result.status.message);
            }
        } else {
            yield put(actions.deleteDevicetype(obj.identify, obj.devicetypeId));
            throw new Error("unkown error!");
        }
    } catch (e) {
        yield put(msg.error(e.message));
    }
}

function* getDeviceSchemaFunc(obj) {
    try {
        const result = yield call(getDeviceSchema, obj.siteName);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                let configs = result.config;
                yield put(actions.getDeviceSchemaSuccess(obj.identify, obj.schemaType, configs));
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

function* getDeviceTypeSchemaFunc(obj) {
    try {
        const result = yield call(getDeviceTypeSchema, obj.siteName);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                let configs = result.config;
                let devicetypeSchema = formatDevicetypeSchema(configs);
                yield put(actions.getDeviceSchemaSuccess(obj.identify, obj.schemaType, devicetypeSchema));
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

function* getDeviceTypeDetailFunc(obj) {
    try {
        const result = yield call(getDeviceTypeDetail, obj.selectDeviceId);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                let mapData = result.arrayData[0];
                yield put(actions.getDeviceTypeDetailSuccess(obj.identify, mapData));
                yield put(actions.getSysconfigDeviceTypeDetail(obj.identify, obj.siteName, obj.selectDeviceId));
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

function* getSysconfigDeviceTypeDetailFunc(obj) {
    try {
        const result = yield call(getSysconfigDeviceTypeDetail, obj.siteName, obj.selectDeviceId);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                let configs = result.config && result.config.configvals && result.config.configvals[0];
                yield put(actions.getSysconfigDeviceTypeDetailSuccess(obj.identify, configs));
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

function* addDevicetypePropertyFunc(obj) {
    try {
        const result = yield call(
            updateDevicetypeProperty,
            obj.devicetypeId,
            obj.propertyFromat,
            obj.updateProperty,
            obj.deleteProperty
        );
        if (result && result.status) {
            if (result.status.code === "00000000") {
                // let configs = result.config.configvals[0];
                // yield put(actions.getSysconfigDeviceTypeDetailSuccess(obj.identify));
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

function* editDeviceDetailFunc(obj) {
    try {
        const result = yield call(
            editDeviceDetail,
            obj.deviceId,
            obj.deviceDisplayName,
            obj.devicetypeId,
            obj.deviceapplication,
            obj.locationObj,
            obj.properties
        );
        if (result && result.status) {
            if (result.status.code === "00000000") {
                yield put(actions.editDeviceDetailSuccess(obj.identify));
                // yield put(actions.addNewDevicetypeProperty(obj.identify, obj.deviceId, {}, obj.properties));
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

function* addLocationFunc(obj) {
    try {
        const result = yield call(addLocation, obj.locationName, obj.coordinates);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                let location = result.mapData;
                yield put(actions.addLocationSuccess(obj.identify, location));
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

function* addAddressFunc({
    identify,
    addressdisplayname,
    addressname,
    addresslocationId,
    addressimage,
    createType,
    parentId
}) {
    try {
        const result = yield call(
            addNewAddress,
            addressdisplayname,
            addressname,
            addresslocationId,
            addressimage,
            createType,
            parentId
        );
        if (result && result.status) {
            if (result.status.code === "00000000") {
                yield put(msg.success(result.status.message));
                yield put(actions.createApplicationSuccess(identify));
            } else {
                throw new Error(result.status.message);
            }
        } else {
            throw new Error("unkown error!");
        }
    } catch (e) {
        yield put(msg.error(e.message, "Application - Add address"));
    }
}

function* getTopologySchemaFunc({ identify, schemaType, siteName }) {
    try {
        const result = yield call(getTopologySchema, siteName, schemaType);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                let configs = result.config;
                let appSchema = formatApplicationSchema(configs, schemaType + "Config");
                console.log(appSchema);
                if (appSchema && appSchema[schemaType]) {
                    yield put(actions.getTopologySchemaSuccess(identify, schemaType, appSchema));
                } else {
                    throw new Error("Incorrect Schema.");
                }
            } else {
                throw new Error(result.status.message);
            }
        } else {
            throw new Error("Can Not Get Schema.");
        }
    } catch (e) {
        yield put(msg.error(e.message, "Application - GetSchema"));
    }
}

function* addAppLocationFunc(obj) {
    try {
        const result = yield call(addLocation, obj.locationName, obj.coordinates);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                let location = result.mapData;
                yield put(actions.addAppLocationSuccess(obj.identify, location));
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

function* uploadImageFunc({ identify, formData }) {
    try {
        const result = yield call(upload, formData);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                const imageId = result.mediaFileUrls ? result.mediaFileUrls[0] : undefined;
                yield put(msg.success(result.status.message));
                yield put(actions.uploadImgSuccess(identify, imageId));
            } else {
                throw new Error(result.status.message);
            }
        } else {
            throw new Error("unkown error!");
        }
    } catch (e) {
        yield put(msg.error(e.message, "Device Provisioning"));
    }
}

function* sendDeviceCommandFunc({ identify, deviceId, changedValue }) {
    try {
        const result = yield call(sendDeviceCommandFetch, deviceId, changedValue);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                yield put(actions.editDeviceDetailSuccess(identify));
                yield put(msg.success(result.status.message));
            } else {
                throw new Error(result.status.message);
            }
        } else {
            throw new Error("unkown error!");
        }
    } catch (e) {
        yield put(msg.error(e.message, "Application - UploadImage"));
    }
}

function* getTopologyDetailSaga() {
    yield takeEvery(actionTypes.TOPOMGMTFLOATTAB_GETDETAIL, getTopoDetail);
}

function* getTopologyAlarmSaga() {
    yield takeEvery(actionTypes.TOPOMGMTFLOATTAB_GETALARM, getTopoAlarm);
}

function* getTopologyEventSaga() {
    yield takeEvery(actionTypes.TOPOMGMTFLOATTAB_GETEVENT, getTopoEvent);
}

function* searchTopoTypeFuncSaga() {
    yield takeEvery(actionTypes.TOPOMGMTFLOATTAB_SEARCH_TOPOTYPE, searchTopoTypeFunc);
}

function* searchTopoAddressFuncSaga() {
    yield takeEvery(actionTypes.TOPOMGMTFLOATTAB_SEARCH_ADDRESS, searchTopoAddressFunc);
}

function* addDeviceSaga() {
    yield takeEvery(actionTypes.TOPOMGMTFLOATTAB_ADD_DEVICE, addDeviceFunc);
}

function* getDeviceSchemaSaga() {
    yield takeEvery(actionTypes.TOPOMGMTFLOATTAB_GET_DEVICE_SCHEMA, getDeviceSchemaFunc);
}

function* getDeviceTypeSchemaSaga() {
    yield takeEvery(actionTypes.TOPOMGMTFLOATTAB_GET_DEVICE_TYPE_SCHEMA, getDeviceTypeSchemaFunc);
}

function* addDeviceTypeSaga() {
    yield takeEvery(actionTypes.TOPOMGMTFLOATTAB_ADD_DEVICE_TYPE, addDeviceTypeFunc);
}

function* addSysconfigDeviceTypeSaga() {
    yield takeEvery(actionTypes.TOPOMGMTFLOATTAB_ADD_DEVICE_TYPE_SYSCONFIG, addSysconfigDeviceTypeFunc);
}

function* getSysconfigBasictypeSaga() {
    yield takeEvery(actionTypes.TOPOMGMTFLOATTAB_GET_SYSCONFIG_BASIC_TYPE, getSysconfigBasictypeFunc);
}

function* getDeviceTypeDetailSaga() {
    yield takeEvery(actionTypes.TOPOMGMTFLOATTAB_GET_DEVICE_TYPE_DETAIL, getDeviceTypeDetailFunc);
}

function* getSysconfigDeviceTypeDetailSaga() {
    yield takeEvery(actionTypes.TOPOMGMTFLOATTAB_GET_SYSCONFIG_DEVICE_TYPE_DETAIL, getSysconfigDeviceTypeDetailFunc);
}

function* searchTopoLocationFuncSaga() {
    yield takeEvery(actionTypes.TOPOMGMTFLOATTAB_SEARCH_LOCATION, searchTopoLocationFunc);
}

function* addDevicetypeProperty() {
    yield takeEvery(actionTypes.TOPOMGMTFLOATTAB_ADD_DEVICE_TYPE_PROPERTY, addDevicetypePropertyFunc);
}

function* editDeviceDetailSagas() {
    yield takeEvery(actionTypes.TOPOMGMTFLOATTAB_EDIT_DEVICE_DETAIL, editDeviceDetailFunc);
}

function* addLocationSagas() {
    yield takeEvery(actionTypes.TOPOMGMTFLOATTAB_ADD_LOCATION, addLocationFunc);
}

function* editDeviceTypeSaga() {
    yield takeEvery(actionTypes.TOPOMGMTFLOATTAB_EDIT_DEVICE_TYPE, editDeviceTypeFunc);
}

function* editSysconfigDeviceTypeSaga() {
    yield takeEvery(actionTypes.TOPOMGMTFLOATTAB_EDIT_DEVICE_TYPE_SYSCONFIG, editSysconfigDeviceTypeFunc);
}

function* createAddressSaga() {
    yield takeEvery(actionTypes.TOPOMGMTFLOATTAB_CREATE_APP, addAddressFunc);
}

function* getTopologySchemaSaga() {
    yield takeEvery(actionTypes.TOPOMGMTFLOATTAB_GETAPP_SCHEMA_REQUEST, getTopologySchemaFunc);
}

function* addAppLocationSagas() {
    yield takeEvery(actionTypes.TOPOMGMTFLOATTAB_ADD_APP_LOCATION, addAppLocationFunc);
}

function* uploadImageSaga() {
    yield takeEvery(actionTypes.TOPOMGMTFLOATTAB_UPLOAD_IMAGE_REQUEST, uploadImageFunc);
}

function* sendDeviceCommandSaga() {
    yield takeEvery(actionTypes.TOPOMGMTFLOATTAB_SEND_DEVICE_COMMAND, sendDeviceCommandFunc);
}

export default function* root() {
    yield [
        fork(getTopologyDetailSaga),
        fork(getTopologyAlarmSaga),
        fork(getTopologyEventSaga),
        fork(searchTopoTypeFuncSaga),
        fork(searchTopoAddressFuncSaga),
        fork(addDeviceSaga),
        fork(getDeviceSchemaSaga),
        fork(getDeviceTypeSchemaSaga),
        fork(addDeviceTypeSaga),
        fork(addSysconfigDeviceTypeSaga),
        fork(getSysconfigBasictypeSaga),
        fork(getDeviceTypeDetailSaga),
        fork(getSysconfigDeviceTypeDetailSaga),
        fork(searchTopoLocationFuncSaga),
        fork(addDevicetypeProperty),
        fork(editDeviceDetailSagas),
        fork(addLocationSagas),
        fork(editDeviceTypeSaga),
        fork(editSysconfigDeviceTypeSaga),
        fork(createAddressSaga),
        fork(getTopologySchemaSaga),
        fork(addAppLocationSagas),
        fork(uploadImageSaga),
        fork(sendDeviceCommandSaga)
    ];
}
