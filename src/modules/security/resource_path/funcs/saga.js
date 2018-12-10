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
import { put, call, takeLatest, fork, throttle } from "redux-saga/effects";
import * as actionTypes from "./actionTypes";
import * as actions from "./actions";
// import { message } from "antd";

import * as message from "modules/messageCenter/funcs/actions";

import { saveResourcePath, updateResourcePath, deleteResourcePath } from "api/security";
import { searchTopoAddressApplications } from "api/topology";

function* getResourcePathListData({ searchData, flag }) {
    try {
        const { pageno, limit, orderby, address } = searchData;
        const result = yield call(
            searchTopoAddressApplications,
            address,
            limit,
            pageno,
            ["address"],
            ["address"],
            orderby
        );
        if (result && result.status) {
            if (result.status.code === "00000000") {
                yield put(actions.getResourcePathSuccess(result.arrayData || [], result.pagination, flag));
            } else {
                yield put(actions.fail());
                throw new Error(result.status.message || "UNKOW ERROR!");
            }
        }
    } catch (e) {
        yield put(message.error(e.message));
        console.log(e);
    }
}

function* addResourcePathData(...userInfo) {
    try {
        const result = yield call(
            saveResourcePath,
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
                yield put(actions.getResourcePathSuccess(result.users || []));
                yield put(message.success(result.status.message));
            } else {
                throw new Error(result.status.message || "UNKOW ERROR!");
            }
        }
    } catch (e) {
        yield put(message.error(e.message));
        console.log(e);
    }
}

function* updateResourcePathData(...userInfo) {
    try {
        const result = yield call(
            updateResourcePath,
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
                yield put(actions.getResourcePathSuccess(result.users || []));
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

function* deleteResourcePathData(userID) {
    try {
        const result = yield call(deleteResourcePath, userID);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                yield put(actions.getResourcePathSuccess(result.users || []));
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

function* getResourcePathListDataSaga() {
    yield throttle(1000, actionTypes.SECURITY_RESOURCEPATH_GET_REQUEST, getResourcePathListData);
    // yield takeLatest(actionTypes.SECURITY_RESOURCEPATH_GET_REQUEST, getResourcePathListData);
}

function* addResourcePathDataSaga() {
    yield takeLatest(actionTypes.SECURITY_RESOURCEPATH_POST_REQUEST, addResourcePathData);
}

function* updateResourcePathDataSaga() {
    yield takeLatest(actionTypes.SECURITY_RESOURCEPATH_PUT_REQUEST, updateResourcePathData);
}

function* deleteResourcePathDataSaga() {
    yield takeLatest(actionTypes.SECURITY_RESOURCEPATH_DELETE_REQUEST, deleteResourcePathData);
}

export default function* root() {
    yield [
        fork(getResourcePathListDataSaga),
        fork(addResourcePathDataSaga),
        fork(updateResourcePathDataSaga),
        fork(deleteResourcePathDataSaga)
    ];
}
