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
// import * as groupActions from "../../group/funcs/actions";
import * as message from "modules/messageCenter/funcs/actions";

import {
    getUserList,
    saveUser,
    updateUser,
    deleteUser,
    updateUserGroup,
    resetpassword,
    getGroupList,
    getUserFromId,
    upload,
    getFile,
    removeFile,
    sendEmail
} from "api/security";
const modulesName = "User";
function* getUserListData({ searchData }) {
    try {
        const result = yield call(getUserList, searchData);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                yield put(actions.getUserSuccess(result.users || [], result.pagination || {}));
                // yield put(message.success(result.status.message));
            } else {
                yield put(message.error(result.status.message, modulesName));
                yield put(actions.changeLoading(false));
                throw new Error(result.status.message || "UNKOW ERROR!");
            }
        }
    } catch (e) {
        console.log(e);
    }
}

function* addUserData({ userData, groupData, searchData, fileObj }) {
    try {
        let result3;
        let imageUri = "";
        if (fileObj) {
            result3 = yield call(upload, fileObj.originFileObj);
        }
        if (result3 && result3.status) {
            if (result3.status.code === "00000000") {
                imageUri = result3.mediaFileUrls.length ? result3.mediaFileUrls[0] : "";
            } else {
                throw new Error(result3.status.message || "UNKOW ERROR!");
            }
        }
        userData = Object.assign({}, userData, { userimage: imageUri || userData.userimage });
        const result = yield call(saveUser, userData);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                const result2 = yield call(updateUserGroup, groupData);
                if (result2.status.code === "00000000") {
                    const { grpid, ...otherData } = searchData;
                    yield put(message.success(result.status.message, modulesName));
                    yield put(actions.getUser(otherData));
                    yield put(actions.changeLoading(false));
                    yield put(actions.reset({ isLoading: false, openDrawer: false, currUserData: {}, avator: [] }));
                } else {
                    yield put(actions.changeLoading(false));
                    yield put(actions.reset({ isLoading: false, drawerLoading: false, openDrawer: true }));
                    throw new Error(result2.status.message || "UNKOW ERROR!");
                }
            } else {
                yield put(actions.changeLoading(false));
                yield put(actions.reset({ isLoading: false, drawerLoading: false, openDrawer: true }));
                throw new Error(result.status.message || "UNKOW ERROR!");
            }
            yield put(actions.changeLoading(false));
        }
    } catch (e) {
        yield put(message.error(e.message, modulesName));
        console.log(e);
    }
}

function* updateUserData({ userData, groupData, searchData, fileObj }) {
    try {
        let result3;
        let imageUri = "";
        if (fileObj) {
            result3 = yield call(upload, fileObj.originFileObj);
        }
        if (result3 && result3.status) {
            if (result3.status.code === "00000000") {
                imageUri = result3.mediaFileUrls.length ? result3.mediaFileUrls[0] : "";
                if (imageUri && userData.userimage) {
                    yield call(removeFile, userData.userimage);
                }
            } else {
                throw new Error(result3.status.message || "UNKOW ERROR!");
            }
        }
        userData = Object.assign({}, userData, { userimage: imageUri || userData.userimage });
        const result = yield call(updateUser, userData);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                const result2 = yield call(updateUserGroup, groupData);
                if (result2.status.code === "00000000") {
                    const { grpid, ...otherData } = searchData;
                    yield put(message.success(result.status.message, modulesName));
                    yield put(actions.getUser(otherData));
                    yield put(actions.reset({ isLoading: false, openDrawer: false, currUserData: {}, avator: [] }));
                } else {
                    yield put(actions.changeLoading(false));
                    yield put(actions.reset({ isLoading: false, openDrawer: true }));
                    throw new Error(result2.status.message || "UNKOW ERROR!");
                }
            } else {
                yield put(actions.changeLoading(false));
                yield put(actions.reset({ isLoading: false, openDrawer: true }));
                throw new Error(result.status.message || "UNKOW ERROR!");
            }
            yield put(actions.changeLoading(false));
        }
    } catch (e) {
        yield put(message.error(e.message, modulesName));
        console.log(e);
    }
}

function* deleteUserData({ userID, searchData }) {
    try {
        const result = yield call(deleteUser, userID);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                const { ...otherData } = searchData;
                yield put(message.success(result.status.message, modulesName));
                yield put(actions.deleteUserSuccess(searchData));
                yield put(actions.getUser(otherData));
                // yield put(message.success(result.status.message));
            } else {
                yield put(actions.changeLoading(false));
                throw new Error(result.status.message || "UNKOW ERROR!");
            }
        }
    } catch (e) {
        yield put(message.error(e.message, modulesName));
        console.log(e);
    }
}

function* reserPassword({ postData }) {
    try {
        const result = yield call(resetpassword, postData);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                yield put(message.success(result.status.message, modulesName));
                yield put(actions.changeLoading(false));
            } else {
                yield put(actions.changeLoading(false));
                throw new Error(result.status.message || "UNKOW ERROR!");
            }
        }
    } catch (error) {
        yield put(message.error(error.message, modulesName));
    }
}

function* getGroupData({ searchData, flag }) {
    try {
        const result = yield call(getGroupList, searchData);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                yield put(actions.getGroupSuccess(result.groups || [], result.pagination, flag));
            } else {
                throw new Error(result.status.message || "UNKOW ERROR!");
            }
        }
    } catch (e) {
        yield put(message.error(e.message, modulesName));
        console.log(e);
    }
}

function* getUserFromIdData({ userid }) {
    try {
        const result = yield call(getUserFromId, userid);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                yield put(actions.getUserFromIdSuccess(result.users || [], result.pagination || {}));
                // yield put(message.success(result.status.message));
            } else {
                yield put(actions.reset({ drawerLoading: false }));
                throw new Error(result.status.message || "UNKOW ERROR!");
            }
        }
    } catch (e) {
        yield put(message.error(e.message, modulesName));
        console.log(e);
    }
}

function* getAvatorData({ mediaFileId }) {
    try {
        const result = yield call(getFile, mediaFileId);
        if (result && result.length) {
            yield put(actions.getAvatorSuccess(result));
        } else {
            throw new Error(result.status.message || "UNKOW ERROR!");
        }
    } catch (e) {
        yield put(message.error(e.message, modulesName));
        console.log(e);
    }
}

function* sendEmailToUser({ userid }) {
    try {
        const result = yield call(sendEmail, userid);
        if (result && result.status && result.status.code === "00000000") {
            yield put(message.success(result.status.message, modulesName));
        } else {
            throw new Error(result.status.message || "UNKOW ERROR!");
        }
    } catch (e) {
        yield put(message.error(e.message, modulesName));
        console.log(e);
    }
}

function* getUserListDataSaga() {
    yield takeLatest(actionTypes.SECURITY_USER_GET_REQUEST, getUserListData);
}

function* addUserDataSaga() {
    yield takeLatest(actionTypes.SECURITY_USER_POST_REQUEST, addUserData);
}

function* updateUserDataSaga() {
    yield takeLatest(actionTypes.SECURITY_USER_PUT_REQUEST, updateUserData);
}

function* deleteUserDataSaga() {
    yield takeLatest(actionTypes.SECURITY_USER_DELETE_REQUEST, deleteUserData);
}

function* reserPasswordSaga() {
    yield takeLatest(actionTypes.SECURITY_USER_RESET_PASSWORD, reserPassword);
}

function* getGroupDataSaga() {
    yield takeLatest(actionTypes.SECURITY_USER_GET_GROUP_REQUEST, getGroupData);
}

function* getUserFromIdDataSaga() {
    yield takeLatest(actionTypes.SECURITY_USER_GET_FROM_ID_REQUEST, getUserFromIdData);
}

function* getAvatorDataSaga() {
    yield takeLatest(actionTypes.SECURITY_USER_GET_AVATOR_REQUEST, getAvatorData);
}

function* sendEmailToUserSaga() {
    yield takeLatest(actionTypes.SECURITY_USER_POST_SEND_EMAIL, sendEmailToUser);
}
export default function* root() {
    yield [
        fork(getUserListDataSaga),
        fork(addUserDataSaga),
        fork(updateUserDataSaga),
        fork(deleteUserDataSaga),
        fork(reserPasswordSaga),
        fork(getGroupDataSaga),
        fork(getUserFromIdDataSaga),
        fork(getAvatorDataSaga),
        fork(sendEmailToUserSaga)
    ];
}
