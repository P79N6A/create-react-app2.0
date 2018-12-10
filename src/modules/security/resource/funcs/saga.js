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
 * Created by Jia Luo on 27/07/2018.
 */
import { put, call, takeLatest, fork } from "redux-saga/effects";
import * as actionTypes from "./actionTypes";
import * as actions from "./actions";
import * as message from "modules/messageCenter/funcs/actions";

import { getResourceList, saveResource, updateResource, deleteResource } from "api/security";

function* getResourceListData({ searchData, flag }) {
    try {
        const result = yield call(getResourceList, searchData);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                yield put(actions.getResourceSuccess(result.visualizations || [], result.pagination, flag));
                // !flag && message.success(result.status.message);
            } else {
                throw new Error(result.status.message || "UNKOW ERROR!");
            }
        }
    } catch (e) {
        yield put(message.error(e.message));
        console.log(e);
    }
}

function* getGrpIdResourceListData({ searchData }) {
    try {
        const result = yield call(getResourceList, Object.assign({}, searchData));
        if (result && result.status) {
            if (result.status.code === "00000000") {
                yield put(actions.getGrpIdResourceSuccess(result.visualizations || [], result.pagination));
                // !flag && message.success(result.status.message);
            } else {
                throw new Error(result.status.message || "UNKOW ERROR!");
            }
        }
    } catch (e) {
        yield put(message.error(e.message));
        console.log(e);
    }
}

function* addResourceData(...userInfo) {
    try {
        const result = yield call(
            saveResource,
            userInfo.userid,
            userInfo.username,
            userInfo.userfirstname,
            userInfo.userlastname,
            userInfo.userimage,
            userInfo.useremail,
            userInfo.usermobile,
            userInfo.usercontactno2,
            userInfo.userstartdate,
            userInfo.userexpiredate,
            userInfo.userinfo
        );
        if (result && result.status) {
            if (result.status.code === "00000000") {
                yield put(actions.getResourceSuccess(result.users || []));
                message.success(result.status.message);
            } else {
                throw new Error(result.status.message || "UNKOW ERROR!");
            }
        }
    } catch (e) {
        yield put(message.error(e.message));
        console.log(e);
    }
}

function* updateResourceData(...userInfo) {
    try {
        const result = yield call(
            updateResource,
            userInfo.userid,
            userInfo.username,
            userInfo.userfirstname,
            userInfo.userlastname,
            userInfo.userimage,
            userInfo.useremail,
            userInfo.usermobile,
            userInfo.usercontactno2,
            userInfo.userstartdate,
            userInfo.userexpiredate,
            userInfo.userinfo
        );
        if (result && result.status) {
            if (result.status.code === "00000000") {
                yield put(actions.getResourceSuccess(result.users || []));
                message.success(result.status.message);
            } else {
                throw new Error(result.status.message || "UNKOW ERROR!");
            }
        }
    } catch (e) {
        message.success(e);
        console.log(e);
    }
}

function* deleteResourceData(userID) {
    try {
        const result = yield call(deleteResource, userID);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                yield put(actions.getResourceSuccess(result.users || []));
                message.success(result.status.message);
            } else {
                throw new Error(result.status.message || "UNKOW ERROR!");
            }
        }
    } catch (e) {
        message.success(e);
        console.log(e);
    }
}

function* getResourceListDataSaga() {
    yield takeLatest(actionTypes.SECURITY_RESOURCE_GET_REQUEST, getResourceListData);
}

function* getGrpIdResourceListDataSaga() {
    yield takeLatest(actionTypes.SECURITY_RESOURCE_GRPID_REQUEST, getGrpIdResourceListData);
}

function* addResourceDataSaga() {
    yield takeLatest(actionTypes.SECURITY_RESOURCE_POST_REQUEST, addResourceData);
}

function* updateResourceDataSaga() {
    yield takeLatest(actionTypes.SECURITY_RESOURCE_PUT_REQUEST, updateResourceData);
}

function* deleteResourceDataSaga() {
    yield takeLatest(actionTypes.SECURITY_RESOURCE_DELETE_REQUEST, deleteResourceData);
}

export default function* root() {
    yield [
        fork(getResourceListDataSaga),
        fork(addResourceDataSaga),
        fork(updateResourceDataSaga),
        fork(deleteResourceDataSaga),
        fork(getGrpIdResourceListDataSaga)
    ];
}
