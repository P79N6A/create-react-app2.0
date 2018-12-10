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
    getTopologySchema,
    getAddressDetail,
    addNewAddress,
    updateAddress,
    addLocation,
    getDeviceDetail
} from "api/application";
import { upload } from "api/security";
import { formatApplicationSchema } from "./formatSchema";
import { I18n } from "react-i18nify";
import _ from "lodash";

const errorPath = "application.sagasError.floatTab.";

function* getTopologySchemaFunc({ identify, schemaType, siteName }) {
    try {
        const result = yield call(getTopologySchema, siteName, schemaType);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                const appSchema = formatApplicationSchema(result.config, schemaType + "Config");
                if (!_.isEmpty(appSchema)) {
                    yield put(actions.getTopologySchemaSuccess(identify, schemaType, appSchema));
                } else {
                    throw new Error(I18n.t(errorPath + "incorrectSchemaError"));
                }
            } else {
                throw new Error(result.status.message);
            }
        } else {
            throw new Error(I18n.t(errorPath + "getAppSchemaError"));
        }
    } catch (e) {
        yield put(msg.error(e.message, "Application - GetSchema"));
    }
}

function* getAddressDetailFunc({ identify, applicationId, applicationType }) {
    try {
        const result = yield call(getAddressDetail, applicationId, applicationType);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                let mapData = result.arrayData[0];
                yield put(actions.getAddressDetailSuccess(identify, mapData));
            } else {
                yield put(actions.getDataFailure(identify, { isLoadingAddressDetail: false }));
                throw new Error(result.status.message);
            }
        } else {
            throw new Error(I18n.t(errorPath + "getAddDetailError"));
        }
    } catch (e) {
        yield put(msg.error(e.message, "Application - Topology"));
    }
}

function* getDeviceDetailFunc({ identify, deviceId }) {
    try {
        const result = yield call(getDeviceDetail, deviceId);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                let mapData = result.arrayData[0];
                yield put(actions.getDeviceDetailSuccess(identify, mapData));
                // yield put(actions.getSysconfigDeviceTypeDetail(obj.identify, obj.siteName, obj.selectDeviceId));
            } else {
                yield put(actions.getDataFailure(identify, { isLoadingAddressDetail: false }));
                throw new Error(result.status.message);
            }
        } else {
            throw new Error(I18n.t(errorPath + "getdvcDetailError"));
        }
    } catch (e) {
        yield put(msg.error(e.message, "Application - Topology"));
    }
}

function* addAddressFunc({ identify, displayname, name, locationId, image, icon, createType, parentId }) {
    try {
        const result = yield call(addNewAddress, displayname, name, icon, locationId, image, createType, parentId);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                yield put(msg.success(result.status.message));
                yield put(actions.createApplicationSuccess(identify));
            } else {
                throw new Error(result.status.message);
            }
        } else {
            throw new Error(I18n.t(errorPath + "addError"));
        }
    } catch (e) {
        yield put(msg.error(e.message, "Application - Add"));
    }
}

function* updateAddressFunc({ identify, addressType, id, icon, displayname, name, newLoc, oldLoc, image }) {
    try {
        const result = yield call(updateAddress, addressType, id, displayname, name, icon, newLoc, oldLoc, image);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                yield put(actions.updateApplicationSuccess(identify));
            } else {
                throw new Error(result.status.message);
            }
        } else {
            throw new Error(I18n.t(errorPath + "updateError"));
        }
    } catch (e) {
        yield put(msg.error(e.message, "Application - Update"));
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
            throw new Error(I18n.t(errorPath + "addLocError"));
        }
    } catch (e) {
        yield put(msg.error(e.message, "Application - Add Location"));
    }
}

function* uploadImage({ identify, formData }) {
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
            throw new Error(I18n.t(errorPath + "uploadImgError"));
        }
    } catch (e) {
        yield put(msg.error(e.message, "Application - UploadImage"));
    }
}

function* getTopologySchemaSaga() {
    yield takeEvery(actionTypes.FLOATTAB_GETAPP_SCHEMA_REQUEST, getTopologySchemaFunc);
}

function* addLocationSagas() {
    yield takeEvery(actionTypes.APPLICATION_CREATE_LOCATION_REQUEST, addLocationFunc);
}

function* getAddressDetailSaga() {
    yield takeEvery(actionTypes.APPLICATION_FLOATTAB_GETADDRESS_DETAIL, getAddressDetailFunc);
}

function* getDeviceDetailSaga() {
    yield takeEvery(actionTypes.APPLICATION_GET_DEVICE_DETAIL_REQUEST, getDeviceDetailFunc);
}

function* createAddressSaga() {
    yield takeEvery(actionTypes.APPLICATION_FLOATTAB_CREATE_APP, addAddressFunc);
}

function* updateAddressSaga() {
    yield takeEvery(actionTypes.APPLICATION_FLOATTAB_UPDATE_APP, updateAddressFunc);
}

function* uploadImageSaga() {
    yield takeEvery(actionTypes.APPLICATION_UPLOAD_IMAGE_REQUEST, uploadImage);
}

export default function* root() {
    yield [
        fork(getTopologySchemaSaga),
        fork(getAddressDetailSaga),
        fork(getDeviceDetailSaga),
        fork(createAddressSaga),
        fork(updateAddressSaga),
        fork(addLocationSagas),
        fork(uploadImageSaga)
    ];
}
