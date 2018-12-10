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
import { message } from "antd";

import { getRoleList, saveRole, updateRole, deleteRole } from "api/security";

function* getRoleListData({ searchData, flag }) {
    try {
        const result = yield call(getRoleList, searchData);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                yield put(actions.getRoleSuccess(result.roles || []));
                // !flag && message.success(result.status.message);
            } else {
                !flag &&  message.error(result.status.message);
                throw new Error(result.status.message || "UNKOW ERROR!");
            }
        }
    } catch (e) {
        console.log(e);
    }
}

function* addRoleData(...userInfo) {
    try {
        const result = yield call(
            saveRole,
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
                yield put(actions.getRoleSuccess(result.users || []));
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

function* updateRoleData(...userInfo) {
    try {
        const result = yield call(
            updateRole,
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
                yield put(actions.getRoleSuccess(result.users || []));
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

function* deleteRoleData(userID) {
    try {
        const result = yield call(deleteRole, userID);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                yield put(actions.getRoleSuccess(result.users || []));
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

function* getRoleListDataSaga() {
    yield takeLatest(actionTypes.SECURITY_ROLE_GET_REQUEST, getRoleListData);
}

function* addRoleDataSaga() {
    yield takeLatest(actionTypes.SECURITY_ROLE_POST_REQUEST, addRoleData);
}

function* updateRoleDataSaga() {
    yield takeLatest(actionTypes.SECURITY_ROLE_PUT_REQUEST, updateRoleData);
}

function* deleteRoleDataSaga() {
    yield takeLatest(actionTypes.SECURITY_ROLE_DELETE_REQUEST, deleteRoleData);
}

export default function* root() {
    yield [fork(getRoleListDataSaga), fork(addRoleDataSaga), fork(updateRoleDataSaga), fork(deleteRoleDataSaga)];
}
