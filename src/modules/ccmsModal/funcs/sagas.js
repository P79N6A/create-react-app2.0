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
/*
 * @Author: wplei
 * @Date: 2018-11-09 13:07:07
 * @Last Modified by:   wplei
 * @Last Modified time: 2018-11-09 13:07:07
 */
import { saveTemplate } from "api/ccms";
// API
import { createVisiualizations, deleteDashboard, deleteGroup as deletePageGroup, deleteTemplate as callDeleteUserTemplate, duplicatePageConfig, getDashboardTemplate as callUserTemplate, getGroupList, saveDashboard, updateGroupList, updateGroupNew, updateMaterialKeyToCcms } from "api/dashboardLibrary";
import getGuid from "commons/utils/guid";
import { actions as CCMSEX } from "modules/ccmsEx";
import { actions as DASHBOARDS } from "modules/ccmsLibrary";
import { actions as MODALS } from "modules/ccmsModal";
import { actions as MESSAGE } from "modules/messageCenter";
import { call, fork, put, takeLatest } from "redux-saga/effects";
import * as actions from "./actions";
import * as actionType from "./actionTypes";
import { INITIAL_STATE } from "./constants";
// API

const MODULE_NAME = "CCMS-MODAL";

function* dashboardRequest({ payload }) {
    // if (refresh)
    const { applicationId, reload = true } = payload;
    if (reload) yield put(DASHBOARDS.getDashboardSuccess([]));
    if (reload) yield put(DASHBOARDS.requestCounts());
    // yield put(CCMSEX.getCustomizedDashboards(applicationId));
    yield put(DASHBOARDS.dashboardRequest({ applicationId }));
}

function* toggleModal(state) {
    yield put(
        MODALS.toggleModal(state || false, {
            mode: null
        })
    );
}

function* lockDialog(state) {
    yield put(MODALS.lockDialog(state));
}

function* clonePage({ payload }) {
    const { pageId, name, groups, id, desc, status, appid } = payload;
    const result = yield call(duplicatePageConfig, pageId, name, appid);
    const { status: requestStatus, appendMsg: newPageId } = result;
    if (requestStatus.code === "00000000") {
        // invoke widget layout
        // yield put(
        //     CCMSEX.requestPage(newPageId, {
        //         editMode: true
        //     })
        // );
        // refresh dashboard library
        yield dashboardRequest({
            payload: {
                reload: false,
                applicationId: appid
            }
        });
        if (groups) {
            // associate exist groups
            yield updatePageGroup({
                payload: {
                    groups: Object.assign(
                        {},
                        {
                            groups,
                            page: newPageId
                        }
                    ),
                    applicationId: appid
                }
            });
        } else {
            // create new group
            yield createGroup({
                payload: {
                    id,
                    desc,
                    appid,
                    status,
                    pages: [newPageId]
                }
            });
        }
        yield toggleModal(false);
        window.location.hash = "/ccms?page=" + pageId;
    } else {
        yield put(MESSAGE.error(requestStatus.message));
    }
    yield lockDialog(false);
}

function* createPage({ payload }) {
    const { name, desc, groups, priority, status, appid, widgets = [], trigger } = payload;
    const mk = `ISC_WEB_PAGE_CCMS_${name.toUpperCase().replace(/\s+/g, "")}_${getGuid()}`;
    const mkList = {
        materialKeys: [mk]
    };
    let result = yield call(updateMaterialKeyToCcms, mkList);
    if (result.status.code === "00000000") {
        result = yield call(saveDashboard, status, name, desc, groups, widgets, "", mk, priority, appid);
        if (result.status.code === "00000000") {
            const { appendMsg } = result;
            yield put(actions.getPageKeySuccess(appendMsg));
            yield call(createVisiualizations, {
                applicationid: appid,
                visualizationid: mk,
                displayname: name,
                description: desc
            });
            yield updatePageGroup({
                payload: {
                    groups: Object.assign(
                        {},
                        {
                            groups: groups.map(g => {
                                const { id, seqId } = g;
                                return {
                                    id,
                                    seqId
                                };
                            }),
                            page: appendMsg
                        }
                    ),
                    applicationId: appid
                }
            });
            yield dashboardRequest({
                payload: {
                    reload: false,
                    applicationId: appid
                }
            });
            yield toggleModal(false);
            if (trigger === "pop")
                return yield put(
                    CCMSEX.requestPage(appendMsg, {
                        editMode: true
                    })
                );
            window.location.hash = "/ccms?page=" + appendMsg;
        } else if (result.status.code === "21000401") {
            yield put(MESSAGE.warn(result.status.message, MODULE_NAME));
        } else if (result.status.code === "21000402") {
            yield put(MESSAGE.warn(result.status.message, MODULE_NAME));
        } else {
            yield put(MESSAGE.error(result.status.message, MODULE_NAME));
        }
    } else {
        yield put(MESSAGE.error(result.status.message, MODULE_NAME));
    }
    yield lockDialog(false);
}

function* deletePage({ payload }) {
    const { pageKey, appid } = payload;
    const result = yield call(deleteDashboard, pageKey);
    if (result.status.code === "00000000") {
        yield dashboardRequest({
            payload: {
                applicationId: appid
            }
        });
        yield put(MODALS.toggleModal(false));
        yield put(CCMSEX.showModal(false));
    } else {
        yield put(MESSAGE.error(result.status.message, MODULE_NAME));
    }
    yield lockDialog(false);
}

function* getUserTemplate({ category, appid }) {
    switch (category) {
        case "user":
            const result = yield call(callUserTemplate, appid);
            if (result.status.code === "00000000") {
                const { groups } = result;
                yield put(actions.getUserTemplateSuccess(groups));
            } else {
                yield put(MESSAGE.error(result.status.message, MODULE_NAME));
            }
            break;
        case "default":
            const { templates } = INITIAL_STATE;
            yield put(actions.getUserTemplateSuccess(templates));
            break;
        default:
            break;
    }
}

function* deleteUserTemplate({ id }) {
    const result = yield call(callDeleteUserTemplate, id);
    if (result.status.code === "00000000") {
        yield put(actions.getUserTemplate("user"));
    } else {
        yield put(MESSAGE.error(result.status.message, MODULE_NAME));
    }
}

function* getGroups({ payload }) {
    let { applicationId } = payload;
    let result = yield call(getGroupList, applicationId);
    if (result.status.code === "00000000") {
        // let customizedGroup = false;
        // const a = {
        //     id: BLACK_KEY,
        //     pages: [],
        //     status: "2002",
        //     desc: "Customized Dashboards for rule",
        //     appid: applicationId
        // };
        // result.group.forEach(g => {
        //     if (g.id === BLACK_KEY) {
        //         customizedGroup = true;
        //     }
        // });
        // if (!customizedGroup) {
        //     yield createGroup({ payload: a });
        //     result = yield call(getGroupList, applicationId);
        // }
        yield put(MODALS.getGroupsSuccess(result.group));
    } else {
        yield put(MESSAGE.error(result.status.message, MODULE_NAME));
    }
}

function* createGroup({ payload }) {
    const { id, desc, pages, status, appid } = payload;
    const result = yield call(updateGroupNew, undefined, id, pages, status, desc, appid);
    if (result.status.code === "00000000") {
        // reset group data
        yield getGroups({
            payload: {
                applicationId: appid
            }
        });
    } else if (result.status.code === "21000201") {
        yield put(MESSAGE.warn(result.status.message, MODULE_NAME));
    } else {
        yield put(MESSAGE.warn(result.status.message, MODULE_NAME));
    }
    yield lockDialog(false);
}

function* updatePageGroup({ payload }) {
    const { groups, applicationId } = payload;
    const result = yield call(updateGroupList, groups);
    if (result.status.code === "00000000") {
        // reset group data
        yield getGroups({
            payload: {
                applicationId
            }
        });
        yield dashboardRequest({
            payload: {
                reload: false,
                applicationId: applicationId
            }
        });
        yield put(
            MODALS.toggleModal(false, {
                mode: null
            })
        );
    } else {
        yield put(MESSAGE.error(result.status.message, MODULE_NAME));
    }
    yield lockDialog(false);
}

function* saveUserTemplate({ payload }) {
    const { postdata } = payload;
    const { applicationId } = postdata;
    const result = yield call(saveTemplate, postdata, applicationId);
    if (result.status.code === "00000000") {
        yield getUserTemplate({ category: "user", appid: applicationId });
    } else {
        yield put(MESSAGE.error(result.status.message, MODULE_NAME));
    }
    yield lockDialog(false);
}

function* deleteGroup({ payload }) {
    const { seqId, appid } = payload;
    let result = yield call(deletePageGroup, seqId);
    let { status } = result;
    if (status.code !== "00000000") {
        yield lockDialog(false);
        return yield put(MESSAGE.error(status.message, MODULE_NAME));
    }
    yield getGroups({
        payload: {
            applicationId: appid
        }
    });
    yield dashboardRequest({
        payload: { reload: false, applicationId: appid }
    });
    yield lockDialog(false);
}

function* updateGroup({ payload }) {
    const { seqId, name, pages, status, desc, appid } = payload;
    let result = yield call(updateGroupNew, seqId, name, pages, status, desc, appid);
    let { status: resultStatus } = result;
    if (resultStatus.code !== "00000000") {
        yield lockDialog(false);
        return yield put(MESSAGE.error(resultStatus.message, MODULE_NAME));
    }
    yield getGroups({
        payload: {
            applicationId: appid
        }
    });
    yield dashboardRequest({
        payload: { reload: false, applicationId: appid }
    });
    yield lockDialog(false);
}

function* deletePageSaga() {
    yield takeLatest(actionType.CCMS_DASHBOARD_DELETE, deletePage);
}

function* getUserTemplateSaga() {
    yield takeLatest(actionType.CCMS_GET_USER_TEMPLATE, getUserTemplate);
}

function* deleteUserGroupSaga() {
    yield takeLatest(actionType.CCMS_DELETE_USER_TEMPLATE, deleteUserTemplate);
}

function* getGroupsSaga() {
    yield takeLatest(actionType.CCMS_GET_GROUP_DATA, getGroups);
}

function* createGroupSaga() {
    yield takeLatest(actionType.CCMS_CREATE_GROUP, createGroup);
}

function* updatePageGroupSaga() {
    yield takeLatest(actionType.CCMS_UPDATE_PAGE_GROUP, updatePageGroup);
}

function* saveUserTemplateSaga() {
    yield takeLatest(actionType.CCMS_SAVE_USER_TEMPLATE, saveUserTemplate);
}

function* createPageSaga() {
    yield takeLatest(actionType.CCMS_CREATE_DASHBOARD, createPage);
}

function* clonePageSaga() {
    yield takeLatest(actionType.CCMS_CLONE_DASHBOARD, clonePage);
}

function* deleteGroupSaga() {
    yield takeLatest(actionType.CCMS_MODAL_DELETE_GROUP, deleteGroup);
}

function* updateGroupSaga() {
    yield takeLatest(actionType.CCMS_MODAL_UPDATE_GROUP, updateGroup);
}

export default function* root() {
    yield [
        fork(clonePageSaga),
        fork(createPageSaga),
        fork(createGroupSaga),
        fork(getGroupsSaga),
        fork(deletePageSaga),
        fork(getUserTemplateSaga),
        fork(deleteUserGroupSaga),
        fork(updatePageGroupSaga),
        fork(saveUserTemplateSaga),
        fork(deleteGroupSaga),
        fork(updateGroupSaga)
    ];
}
