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
 * Created by wplei on 25/05/18.
 */
import { put, call, takeLatest, fork, throttle } from "redux-saga/effects";
import * as actionTypes from "./actionTypes";
import * as actions from "./actions";
// import _ from "lodash";
import { message } from "antd";
import Fetch from "commons/utils/fetch";
import { WIDGETS_COLLECTION_PATH } from "commons/constants/const";
// import { message } from "antd";
import { actions as msgc } from "modules/messageCenter";
import { MODULE_NAME } from "./constants";
//API
import {
    getResource,
    saveTemplate,
    // getPermissions,
    // checkPermission,
    // getResourceInfo,
    updatePageConfig,
    // updatePermissions,
    // getAllDefaultComp,
    createUpdateResource,
    getPageConfigByPageId,
    cleanTokenForPageConfig,
    deleteResourceFromSecurity,
    getVisualInfo
} from "api/ccms";

import { createVisiualizations, getApplicationsByUserId } from "api/dashboardLibrary";

import { getGroupList, upload } from "api/security";
import { searchTopoAddressApplications } from "api/topology";
// import { checkUserModify } from "api/dashboardLibrary";
//API

function* upadtePageConfig({ pageConfig, media }) {
    let result;
    let thumbnail;
    if (media) {
        result = yield call(upload, media);
        if (result.status.code === "00000000") {
            thumbnail = result.mediaFileUrls[0];
        } else {
            // yield put(msgc.warn("Screenshoot is not working on IE, Please update you browser", "FILE"));
            thumbnail = "";
        }
    } else {
        thumbnail = "";
    }
    const { configValue } = pageConfig;
    configValue.thumbnail = thumbnail;
    result = yield call(updatePageConfig, pageConfig);
    if (result.status.code === "00000000") {
        yield put(actions.passLoadingState(false));
        yield put(msgc.success("Dashboard update successfully", MODULE_NAME));
    } else {
        yield put(msgc.error(result.status.message, MODULE_NAME));
        yield put(actions.passLoadingState(false));
    }
    yield put(actions.passLoadingState(false));
}

function* onRequestAllDefaultCompnent() {
    const categories = yield Fetch.get(WIDGETS_COLLECTION_PATH);
    yield put(actions.passDefaultComponentToLocal(categories));
}

function* saveTemplateData({ templateData }) {
    const result = yield call(saveTemplate, templateData);
    if (result.status.code !== "00000000") {
        yield put(msgc.error(result.status.message, MODULE_NAME));
    }
}
// request pageconfig & resource infomations
function* requestConfigById({ pageKey, page }) {
    try {
        let result = yield call(getPageConfigByPageId, pageKey, page);
        if (result.status.code === "00000000") {
            const materialKey = result.page["material-key"];
            yield put(actions.passPageConfig(result.page));
            result = yield call(getVisualInfo, materialKey);
            yield put(actions.passResourceDetail(result.visualizations[0]));
        } else {
            yield put(actions.passPageEditable(false));
        }
    } catch (error) {
        yield put(actions.passPageEditable(false));
    }
    yield put(actions.passLoadingState(false));
}

function* cleanTokenForPage({ pageKey }) {
    try {
        yield call(cleanTokenForPageConfig, pageKey);
    } catch (error) {
        console.log(error);
    }
}

function* createUpdateResourceApi({ group, resourceId }) {
    try {
        yield call(createUpdateResource, group, resourceId);
    } catch (error) {
        console.log(error);
    }
}

function* getResourceApi({ group, resourceId }) {
    try {
        yield call(getResource, group, resourceId);
    } catch (error) {
        console.log(error);
    }
}

function* getUserGroupsApi() {
    try {
        let result = yield call(getGroupList, { pageno: 1, limit: 1000 });
        if (result.status.code === "00000000") {
            // yield put(actions.passPermissions(result.groups));
        } else {
            yield put(msgc.error(result.status.message, MODULE_NAME));
            // message.error(result.status.message);
        }
    } catch (error) {}
}

// function* updatePermissionsApi({ permissionParam }) {
//     try {
//         let result = yield call(updatePermissions, permissionParam);
//         if (result.status.code === "00000000") {
//             yield put(msgc.success(result.status.message));
//             // message.success("UPDATE PERMISSION", result.status.message);
//         } else {
//             yield put(msgc.error(result.status.message));
//             // message.error("UPDATE PERMISSION", result.status.message);
//         }
//         yield put(actions.passLoadingState(false));
//     } catch (error) {
//         yield put(actions.passLoadingState(false));
//     }
// }

function* associateApplication({ permissionParam }) {
    try {
        const { visualizationid, applicationid, dashboardname, desc } = permissionParam;
        const postdata = {
            applicationid,
            visualizationid,
            displayname: dashboardname,
            description: desc
        };
        const result = yield call(createVisiualizations, postdata);
        if (result.status.code === "00000000") {
            // yield put(msgc.success(result.status.message));
        }
        yield put(actions.passLoadingState(false));
    } catch (error) {}
}

function* getResourceInfoApi({ materialKey }) {
    try {
        const result = yield call(getVisualInfo, materialKey);
        if (result.status.code === "00000000") {
            yield put(actions.passResourceDetail(result.resources));
        }
    } catch (error) {}
}

function* deleteResourceApi({ resourceid }) {
    const result = yield call(deleteResourceFromSecurity, resourceid);
    if (result.status.code !== "00000000") {
        message.success(result.status.message);
    }
}

function* getApplications() {
    let result = null,
        datas = null;
    const { groups, userid } = JSON.parse(sessionStorage.getItem("ISC-CURRENT-USER") || "{}");
    const role = groups && groups.includes("Administrator") ? "admin" : userid;
    if (role === "admin") {
        result = yield call(searchTopoAddressApplications);
        datas = result.arrayData;
    } else {
        result = yield call(getApplicationsByUserId, role);
        datas = result.applications;
    }
    if (result.status.code === "00000000") {
        yield put(actions.passPermissions(datas, role));
    }
}

function* getVisualInfoApi({ visualizationid }) {
    // const result = yield call(getVisualInfo, visualizationid);
    // debugger;
}

function* requestConfigByPageid() {
    yield throttle(500, actionTypes.CCMS_WIDGETS_BOARD_PAGECONFIG_REQUEST, requestConfigById);
}

function* requestUpdateConfig() {
    yield takeLatest(actionTypes.CCMS_WIDGETS_BOARD_UPDATE_PAGECONFIG_REQUEST, upadtePageConfig);
}

function* requestAllDefaultComponent() {
    yield takeLatest(actionTypes.CCMS_WIDGETS_BOARD_REQUEST_ALL_DEFAULT_COMPONENT, onRequestAllDefaultCompnent);
}

function* saveTemplateSaga() {
    yield takeLatest(actionTypes.CCMS_WIDGETS_BOARD_SAVE_TEMPLATE, saveTemplateData);
}

function* cleanToken() {
    yield takeLatest(actionTypes.CCMS_DASHBOARD_LIBRARY_CLEAN_TOKEN_FOR_PAGE, cleanTokenForPage);
}

function* createUpdateResourceSaga() {
    yield takeLatest(actionTypes.CCMS_WIDGET_BOARD_CREATE_AND_UPDATE_RESOURCE, createUpdateResourceApi);
}

function* getResourceSage() {
    yield takeLatest(actionTypes.CCMS_WIDGET_BOARD_GET_RESOURCE_BY_GROUP_AND_RESOURCEID, getResourceApi);
}

function* getPermissionList() {
    yield takeLatest(actionTypes.CCMS_WIDGET_BOARD_GET_PERMISSION_LIST, getApplications);
}

function* updatePermissionSaga() {
    yield takeLatest(actionTypes.CCMS_WIDGET_BOARD_UPDATE_PERMISSION_LIST, associateApplication);
}

function* getResourceInfoSaga() {
    yield takeLatest(actionTypes.CCMS_WIDGET_BOARD_GET_RESOURCE_INFOMATION, getResourceInfoApi);
}

function* deleteResource() {
    yield takeLatest(actionTypes.CCMS_DASHBOARD_LIBRARY_DELETE_RESOURCE, deleteResourceApi);
}

function* getUserGroups() {
    yield takeLatest(actionTypes.CCMS_WIDGET_BOARD_GET_PERMISSION_LIST, getUserGroupsApi);
}

function* getVisualInfoSaga() {
    yield takeLatest(actionTypes.CCMS_DASHBOARD_CHECK_VISUAL, getVisualInfoApi);
}

export default function* root() {
    yield [
        fork(cleanToken),
        fork(deleteResource),
        fork(getResourceSage),
        fork(saveTemplateSaga),
        fork(getUserGroups),
        fork(getResourceInfoSaga),
        fork(requestUpdateConfig),
        fork(updatePermissionSaga),
        fork(requestConfigByPageid),
        fork(createUpdateResourceSaga),
        fork(requestAllDefaultComponent),
        fork(getPermissionList),
        fork(getVisualInfoSaga)
    ];
}
