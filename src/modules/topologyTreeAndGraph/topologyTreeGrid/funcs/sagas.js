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
import * as apiFuncs from "api/topology";

function* getTopoTreeData(obj) {
    try {
        const result = yield call(apiFuncs.getTopoTreeData, obj.roles, obj.iotId, obj.treeMode);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                let layers = result.layers && result.layers[0];
                yield put(actions.getTopoTreeDataSuccess(obj.identify, layers, obj.callback));
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

function* searchTopoTreeData(obj) {
    try {
        const result = yield call(
            apiFuncs.searchTopoTreeData,
            obj.pageNo,
            obj.pageLimit,
            obj.treeFilter,
            obj.selectAppRespath,
            obj.underAppFilter,
            obj.addressOutPutList,
            obj.addressOutPutList
        );
        if (result && result.status) {
            if (result.status.code === "00000000") {
                let arrayData = result.arrayData;
                let pagination = result.pagination;
                yield put(actions.searchTopoTreeDataSuccess(obj.identify, arrayData, pagination, obj.callback));
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

function* searchTopoTreeAddressData(obj) {
    try {
        const result = yield call(
            apiFuncs.searchTopoTreeData,
            obj.pageNo,
            obj.pageLimit,
            obj.treeFilter,
            obj.selectAppRespath,
            obj.underAppFilter,
            obj.addressOutPutList,
            obj.addressOutPutList
        );
        if (result && result.status) {
            if (result.status.code === "00000000") {
                let arrayData = result.arrayData;
                let pagination = result.pagination;
                yield put(actions.searchTopoTreeDataSuccess(obj.identify, arrayData, pagination, obj.callback));
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
        const result = yield call(apiFuncs.getSysconfigDeviceType, obj.siteName);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                let deviceTypesData = result.configs;
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

function* getTopologyTreeDataSaga() {
    yield takeEvery(actionTypes.TOPOTREE_GET_TOPO_TREE_DATA, getTopoTreeData);
}

function* searchTopologyTreeDataSaga() {
    yield takeEvery(actionTypes.TOPOTREE_SEARCH_TOPO_TREE_DATA, searchTopoTreeData);
}

function* searchTopologyTreeAddressDataSaga() {
    yield takeEvery(actionTypes.TOPOTREE_SEARCH_TOPO_TREE_ADDRESS_DATA, searchTopoTreeAddressData);
}

// get sysconfig device type sage
function* getSysconfigDeviceTypeSaga() {
    yield takeEvery(actionTypes.TOPOTREE_GET_SYSCONFIG_DEVICE_TYPE, getSysconfigDeviceTypeFunc);
}

export default function* root() {
    yield [
        fork(getTopologyTreeDataSaga),
        fork(searchTopologyTreeDataSaga),
        fork(getSysconfigDeviceTypeSaga),
        fork(searchTopologyTreeAddressDataSaga)
    ];
}
