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
// import * as userActions from "../../user/funcs/actions";
import * as message from "modules/messageCenter/funcs/actions";
// import { message } from "antd";
// import getGuid from "commons/utils/guid";

import {
    getGroupList,
    saveGroup,
    updateGroup,
    deleteGroup,
    getGroupFromId,
    // updateGroupRole,
    updateUserGroup,
    getUserList
    // getResourceList
    // createPermission,
    // permissionResource,
    // addRole,
    // rolePermission
} from "api/security";
import { searchTopoAddressApplications } from "api/topology";

const modulesName = "User Group";
function* getGroupListData({ searchData, flag }) {
    try {
        const result = yield call(getGroupList, searchData);
        // let result2 = {};
        // if(flag) {
        //     result2 =  yield call(getGroupList, {});
        // }
        if (result && result.status) {
            if (result.status.code === "00000000") {
                yield put(actions.getGroupSuccess(result.groups || [], result.pagination));
                yield put(actions.changeLoading(false));
            } else {
                yield put(actions.changeLoading(false));
                throw new Error(result.status.message || "UNKOW ERROR!");
            }
            yield put(actions.changeLoading(false));
        }
    } catch (e) {
        yield put(message.error(e.message, modulesName));
        console.log(e);
    }
}

function* addGroupData({ group, searchData }) {
    try {
        const result = yield call(saveGroup, group);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                yield put(message.success(result.status.message, modulesName));
                yield put(actions.reset({ drawerOpen: false, group: {}, users: [] }));
                yield put(actions.changeLoading(false));
                yield put(actions.getGroup(searchData));
            } else {
                yield put(actions.changeLoading(false));
                yield put(actions.reset({ drawerOpen: true }));
                throw new Error(result.status.message || "UNKOW ERROR!");
            }
        }
    } catch (e) {
        yield put(message.error(e.message, modulesName));
        console.log(e);
    }
}

function* updateGroupData({ group, searchData }) {
    try {
        const result = yield call(updateGroup, group);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                yield put(message.success(result.status.message, modulesName));
                yield put(actions.getGroup(searchData, true));
                yield put(actions.reset({ drawerOpen: false, group: {}, users: [] }));
            } else {
                yield put(actions.changeLoading(false));
                yield put(actions.reset({ drawerOpen: true }));
                throw new Error(result.status.message || "UNKOW ERROR!");
            }
        }
    } catch (e) {
        yield put(message.error(e.message, modulesName));
        console.log(e);
    }
}

function* getGroupFromIdData({ grpid }) {
    try {
        const result = yield call(getGroupFromId, grpid);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                yield put(actions.getGroupFromIdSuccess(result.group));
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

function* deleteGroupData({ groupID, searchData }) {
    try {
        const result = yield call(deleteGroup, groupID);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                yield put(message.success(result.status.message, modulesName));
                yield put(actions.getGroup(searchData));
                yield put(actions.reset({ drawerLoading: false }));
            } else {
                yield put(actions.reset({ loading: false, drawerLoading: false }));
                throw new Error(result.status.message || "UNKOW ERROR!");
            }
        }
    } catch (e) {
        yield put(message.error(e.message, modulesName));
        console.log(e);
    }
}

// delete user from group
function* updateUserGroups({ groupData, groupSearchData, userSearchData }) {
    try {
        const result = yield call(updateUserGroup, groupData);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                yield put(message.success(result.status.message, modulesName));
                yield put(actions.getUserFromGrpId(userSearchData));
                yield put(actions.reset({ drawerLoading: false }));
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

function* getUserFromGrpIdData({ userSearchData }) {
    try {
        const result = yield call(getUserList, userSearchData);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                yield put(actions.getUserFromGrpIdSuccess(result.users || [], result.pagination));
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

function* getApplicationFromGrpIdData({ searchData }) {
    try {
        yield put(actions.reset({ transferLoading: true }));
        const { application, limit, pageno, searchFlag = true } = searchData;
        const result = yield call(
            searchTopoAddressApplications,
            application,
            limit,
            pageno,
            ["address"],
            ["address"],
            "",
            searchFlag
        );
        if (result && result.status) {
            yield put(actions.changeLoading(true));
            if (result.status.code === "00000000") {
                yield put(actions.getApplicationFromGrpIdSuccess(result.arrayData || [], result.pagination));
                yield put(actions.reset({ transferLoading: true }));
            } else {
                yield put(actions.reset({ transferLoading: true }));
                yield put(actions.changeLoading(false));
                throw new Error(result.status.message || "UNKOW ERROR!");
            }
        }
    } catch (e) {
        yield put(actions.changeLoading(false));
        yield put(message.error(e.message, modulesName));
        console.log(e);
    }
}

function* updateUserGroupSaga() {
    yield takeLatest(actionTypes.SECURITY_UPDATE_USER_GROUP, updateUserGroups);
}

function* getGroupFromIdDataSaga() {
    yield takeLatest(actionTypes.SECURITY_GROUP_FROMID_REQUEST, getGroupFromIdData);
}

function* getGroupListDataSaga() {
    yield takeLatest(actionTypes.SECURITY_GROUP_GET_REQUEST, getGroupListData);
}

function* addGroupDataSaga() {
    yield takeLatest(actionTypes.SECURITY_GROUP_POST_REQUEST, addGroupData);
}

// function* addGroupDataSaga() {
//     yield takeLatest(actionTypes.SECURITY_GROUP_POST_REQUEST, addGroupFiveCombineOne);
// }

function* updateGroupDataSaga() {
    yield takeLatest(actionTypes.SECURITY_GROUP_PUT_REQUEST, updateGroupData);
}

function* deleteGroupDataSaga() {
    yield takeLatest(actionTypes.SECURITY_GROUP_DELETE_REQUEST, deleteGroupData);
}

function* getUserFromGrpIdSaga() {
    yield takeLatest(actionTypes.SECURITY_GROUP_USER_GRPID_REQUEST, getUserFromGrpIdData);
}

function* getApplicationFromGrpIdSaga() {
    yield takeLatest(actionTypes.SECURITY_GROUP_APPLICATION_GRPID_REQUEST, getApplicationFromGrpIdData);
}

export default function* root() {
    yield [
        fork(getGroupListDataSaga),
        fork(addGroupDataSaga),
        fork(updateGroupDataSaga),
        fork(deleteGroupDataSaga),
        fork(updateUserGroupSaga),
        fork(getUserFromGrpIdSaga),
        fork(getApplicationFromGrpIdSaga),
        fork(getGroupFromIdDataSaga)
    ];
}
