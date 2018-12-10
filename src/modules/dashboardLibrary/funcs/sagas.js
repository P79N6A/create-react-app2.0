/*
 * =========================================================================
 *  Copyright (C)2015 NCS Pte. Ltd. All Rights Reserved
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
 * Created by @Luo Jia alex on 29/05/15.
 */
// import pinyin from "pinyin";
// import _ from "lodash";
import { getPageConfig, updatePageConfig } from "api/ccms";
import {
    checkUserModify,
    createVisiualizations,
    dashboardItem,
    dashboardList,
    deleteDashboard,
    deleteGroup,
    deleteTemplate,
    duplicatePageConfig,
    editGroup,
    getApplicationsByUserId,
    // getTopologyResource
    // deleteResourceFromSecurity
    getDashboardTemplate,
    getGroupList,
    saveDashboard,
    savePageConfigDetail,
    updateGroup,
    updateGroupList,
    // createSecurityResource,
    // checkResource,
    // updatePermissions,
    // getPermissions,
    updateMaterialKeyToCcms
} from "api/dashboardLibrary";
import { getFile } from "api/security";
import { alarmList, deviceList } from "api/statistics";
// import * as securityAction from "commons/security/user/funcs/actions";
import { passPermissions } from "modules/ccms/widgetsBoard/funcs/actions";
import * as message from "modules/messageCenter/funcs/actions";
import { call, fork, put, takeEvery, takeLatest } from "redux-saga/effects";
import * as actions from "./actions";
import {
    CCMS_DASHBOARD_LIBRARY_CHECK_USER_MODIFY,
    COUNT_REQUEST,
    // DASHBOARD_REQUEST_SUCCESS,
    DASHBOARD_ADD,
    DASHBOARD_APPLICATION_BY_TYPE,
    // DASHBOARD_DELETE,
    DASHBOARD_DELETE_REQUEST,
    DASHBOARD_DUPLICATE_REQUEST,
    DASHBOARD_EDIT,
    // DASHBOARD_ADD_SUCCESS,
    // DASHBOARD_GET_SUCCESS,
    DASHBOARD_GET,
    DASHBOARD_GET_THUMBNAIL_BY_FILEID,
    DASHBOARD_GROUP_DELETE_REQUEST,
    DASHBOARD_GROUP_EDIT_REQUEST,
    DASHBOARD_GROUP_REQUEST,
    DASHBOARD_PAGE_PRIORITY,
    DASHBOARD_REQUEST,
    GROUPLIST_UPDATE_REQUEST,
    GROUP_ADD_REQUEST,
    // DASHBOARD_DELETE_SUCCESS,
    REST_CURRITEM,
    TEMPLATE_DELETE_REQUEST,
    TEMPLATE_SAVE_REQUEST
} from "./actionTypes";
import { DASHBOARD_BLACK_LIST, MODULE_NAME } from "./constants";

function generateUUID() {
    var d = new Date().getTime();
    var uuid = "xxxxx".replace(/[xy]/g, function(c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
    });
    return uuid.toUpperCase();
}

// function convertChinese(str) {
//     let convertStr = "";
//     let strArr = str.split("");
//     const convertStrArr = strArr.map(word => {
//         return pinyin(word, {
//             style: pinyin.STYLE_NORMAL
//         })[0];
//     });
//     convertStrArr.forEach(word => {
//         convertStr += word[0];
//     });
//     return convertStr;
// }

function* getDashboardData({ searchData, flag }) {
    try {
        let { group } = searchData;
        yield put(actions.getDashboardSuccess([], {}, flag, 0));
        let result = yield call(dashboardList, searchData);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                let { configValue } = result;
                if (group !== DASHBOARD_BLACK_LIST && configValue)
                    configValue = configValue.filter(c => {
                        if (!c.groups) c.groups = [];
                        return !c.groups.includes(DASHBOARD_BLACK_LIST);
                    });
                let total = (configValue && configValue.length) || 0;
                yield put(actions.getDashboardSuccess(configValue || [], result.pageable, flag, total));
            } else {
                throw new Error(result.status.message || "UNKOW ERROR!");
            }
        }
    } catch (e) {
        console.log(e);
    }
}

function* saveDashboardData({ status, pageName, desc, group, widgets, thumbnail, groupDatas, priority, appid }) {
    try {
        const materialKey = "ISC_WEB_PAGE_CCMS_" + pageName.toUpperCase().replace(/\s+/g, "") + "_" + generateUUID();
        // const postdata = {
        //     visualizationid: materialKey,
        //     displayname: pageName,
        //     description: desc
        // };
        // let result = yield call(createVisiualizations, postdata);
        // if (result.status.code === "00000000") {
        const mk_list = {
            materialKeys: [materialKey]
        };
        let result = yield call(updateMaterialKeyToCcms, mk_list);
        if (result.status.code === "00000000") {
            result = yield call(
                saveDashboard,
                status,
                pageName,
                desc,
                group,
                widgets,
                thumbnail,
                materialKey,
                priority,
                appid,
                groupDatas
            );
            if (result && result.status.code === "00000000") {
                yield call(createVisiualizations, {
                    applicationid: appid,
                    visualizationid: materialKey,
                    displayname: pageName,
                    description: desc
                });
                // yield put(message.success(result.status.message));
                let newPageKey = result.appendMsg;
                if (groupDatas) {
                    if (groupDatas.NewGroup || groupDatas.groupList.length) {
                        if (groupDatas.NewGroup) {
                            yield put(actions.updateGroup(groupDatas.NewGroup, [newPageKey]));
                        } else {
                            let groupList = {
                                page: newPageKey,
                                groups: groupDatas.groupList
                            };
                            yield put(actions.updateGroupList(groupList));
                        }
                    }
                }
                yield put(actions.setPageId(newPageKey));
            } else {
                console.log("error");
                yield put(actions.toggleLoading(false));
                yield put(message.error(result.status.message, MODULE_NAME));
            }
        } else {
            yield put(actions.toggleLoading(false));
            yield put(message.error(result.status.message, MODULE_NAME));
        }
        // } else {
        //     yield put(actions.toggleLoading(false));
        //     yield put(message.error(result.status.message));
        // }
    } catch (e) {
        console.log(e);
    }
}

// save modify
function* editPageConfigDetail({ originData, editData }) {
    try {
        const result = yield call(savePageConfigDetail, originData, editData);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                const key = originData.pageKey;
                const title = editData.title ? editData.title : "";
                yield put(actions.addWidgets(false, false));
                yield put(actions.getDahboardItem(key));
                if (title) {
                    yield put(actions.refreshDashboardTitle(key, title));
                }
                // yield put(message.success(result.status.message));
            } else {
                yield put(message.error(result.status.message, MODULE_NAME));
                throw new Error(result.status.message || "UNKOW ERROR!");
            }
        }
    } catch (e) {
        console.log(e);
    }
}

function* deleteDashboardData({ key, goBack }) {
    try {
        const result = yield call(deleteDashboard, key);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                yield put(message.success("Delete dashboard successfully", MODULE_NAME));
                goBack();
                // yield put(actions.deleteDashboardSuccess(params.key));
            } else {
                yield put(message.error(result.status.message, MODULE_NAME));
                throw new Error(result.status.message || "UNKOW ERROR!");
            }
        }
    } catch (e) {
        console.log(e);
    }
}

function* getDashboardTemplateData({ appid: id }) {
    try {
        const result = yield call(getDashboardTemplate);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                let groups = result.groups;
                groups =
                    groups &&
                    groups.filter(item => {
                        const { value } = item;
                        const { applicationId } = value;
                        return applicationId === id;
                    });
                yield put(actions.getDashboardTemplateSuccess(groups));
            } else {
                throw new Error(result.status.message || "UNKOW ERROR!");
            }
        }
    } catch (e) {
        console.log(e);
    }
}

function* deleteTemplateData({ id, appid }) {
    try {
        const result = yield call(deleteTemplate, id);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                // yield put(actions.getDashboardTemplate());
                yield getDashboardTemplateData({ appid });
                yield put(message.success(result.status.message, MODULE_NAME));
            } else {
                yield put(message.error(result.status.message, MODULE_NAME));
                throw new Error(result.status.message || "UNKOW ERROR!");
            }
        }
    } catch (e) {
        console.log(e);
    }
}

function* getDashboardDataSaga() {
    yield takeLatest(DASHBOARD_REQUEST, getDashboardData);
}

function* saveDashboardSaga() {
    yield takeLatest(DASHBOARD_ADD, saveDashboardData);
}

function* getDashboardItem(param) {
    try {
        const result = yield call(dashboardItem, param.key);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                yield put(actions.getDahboardItemSuccess(result.configValue));
            } else {
                throw new Error(result.status.message || "UNKOW ERROR!");
            }
        }
    } catch (e) {}
}

function* updateGroupData({ groupId, pages, status, desc, appid }) {
    try {
        const result = yield call(updateGroup, groupId, pages, status, desc, appid);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                yield put(message.success(result.status.message, MODULE_NAME));
                yield put(actions.pushGroupItem(result.group));
                // yield put(actions.getGroupList());
            } else {
                yield put(message.error(result.status.message, MODULE_NAME));
                throw new Error(result.status.message || "UNKOW ERROR!");
            }
        }
    } catch (e) {}
}

function* getGroupData({ searchData }) {
    try {
        const { applicationId } = searchData;
        let result = yield call(getGroupList, applicationId);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                // let customizedGroup = false;
                // const a = {
                //     groupId: "Customize Dashboards",
                //     pages: [],
                //     status: "2002",
                //     desc: "Customized Dashboards for rule",
                //     appid: applicationId
                // };
                // result.group.forEach(g => {
                //     if (g.id === "Customize Dashboards") {
                //         customizedGroup = true;
                //     }
                // });
                // if (!customizedGroup) yield updateGroupData(a);
                // result = yield call(getGroupList, applicationId);
                yield put(actions.getGroupListSuccess(result.group));
            } else {
                throw new Error(result.status.message || "UNKOW ERROR!");
            }
        }
    } catch (e) {}
}

function* deleteGroupData({ seqId, searchData, appid }) {
    try {
        const result = yield call(deleteGroup, seqId);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                yield put(message.success(result.status.message, MODULE_NAME));
                yield put(actions.getGroupList({ applicationId: appid }));
                yield put(actions.dashboardRequest(searchData));
            } else {
                yield put(message.error(result.status.message, MODULE_NAME));
                throw new Error(result.status.message || "UNKOW ERROR!");
            }
        }
    } catch (e) {}
}

function* editGroupData({ seqId, id, page, desc, searchData }) {
    try {
        const result = yield call(editGroup, seqId, id, page, desc);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                yield put(message.success(result.status.message, MODULE_NAME));
                yield put(actions.getGroupList());
                yield put(actions.dashboardRequest(searchData));
            } else {
                yield put(message.error(result.status.message, MODULE_NAME));
                throw new Error(result.status.message || "UNKOW ERROR!");
            }
        }
    } catch (e) {}
}

function* duplicatePageConfigData({ pageKey, name, groupDatas, duplicateToPageEditMode }) {
    try {
        let result = yield call(checkUserModify, pageKey);
        const { appendMsg, status } = result;
        if (status.code === "00000000") {
            if (appendMsg.editable) {
                const result = yield call(duplicatePageConfig, pageKey, name);
                if (result && result.status) {
                    if (result.status.code === "00000000") {
                        let newPageKey = result.appendMsg;
                        yield put(message.success(result.status.message, MODULE_NAME));
                        if (groupDatas.NewGroup || groupDatas.groupList.length) {
                            if (groupDatas.NewGroup) {
                                yield put(actions.updateGroup(groupDatas.NewGroup, [newPageKey]));
                            } else {
                                let groupList = {
                                    page: newPageKey,
                                    groups: groupDatas.groupList
                                };
                                yield put(actions.updateGroupList(groupList));
                            }
                        }
                        duplicateToPageEditMode(newPageKey);
                    } else {
                        yield put(message.error(result.status.message, MODULE_NAME));
                        throw new Error(result.status.message || "UNKOW ERROR!");
                    }
                }
            } else {
                message.warn(appendMsg.message, MODULE_NAME);
            }
        } else {
            message.warn(status.message, MODULE_NAME);
        }
    } catch (e) {}
}

function* updateGroupListData({ groupList, searchData = {}, refresh = false }) {
    try {
        let result = yield call(checkUserModify, groupList.page);
        const { appendMsg, status } = result;
        if (status.code === "00000000") {
            if (appendMsg.editable) {
                const result = yield call(updateGroupList, groupList);
                if (result && result.status) {
                    if (result.status.code === "00000000") {
                        yield put(message.success(result.status.message, MODULE_NAME));
                        yield put(actions.getGroupList());
                        // ? remove call dashboardSummary api
                        if (refresh) {
                            yield put(actions.dashboardRequest(searchData));
                        }
                        // yield put(actions.dashboardRequest(searchData));
                    } else {
                        yield put(message.error(result.status.message, MODULE_NAME));
                        throw new Error(result.status.message || "UNKOW ERROR!");
                    }
                }
            } else {
                message.warn(appendMsg.message, MODULE_NAME);
            }
        } else {
            message.warn(status.message, MODULE_NAME);
        }
    } catch (e) {}
}

function* restCurrItem() {
    yield takeLatest(REST_CURRITEM, actions.restCurrItem);
}

function* getCountData({ appName }) {
    try {
        const alarm = yield call(alarmList);
        // const devices = yield call(deviceList);
        const devices = yield call(deviceList, "device", appName);
        if (devices && devices.status && alarm && alarm.status) {
            if (devices.status.code === "00000000" || alarm.status.code === "00000000") {
                let arr = [];
                try {
                    arr.push(devices.mapData.device.all ? devices.mapData.device.all : 0);
                    arr.push(
                        alarm.alarms
                            ? alarm.alarms
                                  .map(item => item.count)
                                  .reduce((a, b) => {
                                      return +a + +b;
                                  }, 0)
                            : 0
                    );
                    arr.unshift(
                        arr.reduce((a, b) => {
                            return +a + +b;
                        }, 0)
                    );
                    yield put(actions.getCountSuccess(arr));
                } catch (error) {
                    throw new Error(error);
                }
            } else {
                throw new Error("Data error" || "UNKOW ERROR!");
            }
        }
    } catch (e) {
        console.log(e);
    }
}

function checkUser({ pageKey }) {
    try {
        window.location.hash = "/ccms?page=" + pageKey;
    } catch (error) {
        console.log(error);
    }
}

function* updatePriorityAPI({ config, searchData }) {
    const { pageKey, priority } = config;
    try {
        let result = yield call(getPageConfig, pageKey);
        if (result.status.code === "00000000") {
            let { configValue } = result;
            configValue.priority = priority;
            result = yield call(updatePageConfig, configValue);
            if (result.status.code === "00000000") {
                result = yield call(dashboardList, searchData);
                if (result.status.code === "00000000") {
                    yield put(
                        actions.getDashboardSuccess(
                            result.configValue || [],
                            { pageno: 0, limit: 20 },
                            false,
                            result.pageable.total,
                            true
                        )
                    );
                }
            } else {
                yield put(message.error(result.status.message, MODULE_NAME));
            }
        }
    } catch (error) {}
}

function* getApplicationsByGroupId({ groupId }) {
    try {
        let result = yield call(getApplicationsByUserId, groupId);
        if (result.status.code === "00000000") {
            yield put(passPermissions(result.applications));
        }
    } catch (error) {}
}
// function* deleteResourceApi(resourceId) {
//     const result = yield call(deleteResourceFromSecurity, resourceId);
//     if (result.status.code === "00000000") {
//         yield put(message.success(result.status.message));
//     } else {
//         yield put(message.success(result.status.message));
//     }
// }

function* getThumbnailApi({ mediaFileId, originalId }) {
    try {
        let result = yield call(getFile, mediaFileId);
        console.log(mediaFileId, originalId, result);
        yield put(actions.getThumbnailSuccess(result, originalId));
    } catch (error) {}
}

function* deleteDashboardSaga() {
    yield takeLatest(DASHBOARD_DELETE_REQUEST, deleteDashboardData);
}

function* getDashboardItemSaga() {
    yield takeLatest(DASHBOARD_GET, getDashboardItem);
}

function* editPageConfigDetailSaga() {
    yield takeLatest(DASHBOARD_EDIT, editPageConfigDetail);
}

function* updateGroupDataSaga() {
    yield takeLatest(GROUP_ADD_REQUEST, updateGroupData);
}

function* getGroupDataSaga() {
    yield takeLatest(DASHBOARD_GROUP_REQUEST, getGroupData);
}

function* deleteGroupDataSaga() {
    yield takeLatest(DASHBOARD_GROUP_DELETE_REQUEST, deleteGroupData);
}

function* editGroupDataSaga() {
    yield takeLatest(DASHBOARD_GROUP_EDIT_REQUEST, editGroupData);
}

function* duplicatePageConfigDataSaga() {
    yield takeLatest(DASHBOARD_DUPLICATE_REQUEST, duplicatePageConfigData);
}

function* updateGroupListDataSaga() {
    yield takeLatest(GROUPLIST_UPDATE_REQUEST, updateGroupListData);
}

function* getCountDataSaga() {
    yield takeLatest(COUNT_REQUEST, getCountData);
}

function* getDashboardTemplateDataSaga() {
    yield takeLatest(TEMPLATE_SAVE_REQUEST, getDashboardTemplateData);
}

function* deleteTemplateDataSaga() {
    yield takeLatest(TEMPLATE_DELETE_REQUEST, deleteTemplateData);
}

function* cheakModify() {
    yield takeLatest(CCMS_DASHBOARD_LIBRARY_CHECK_USER_MODIFY, checkUser);
}

function* deleteResourceSage() {
    // yield takeLatest();
}

function* updatePrioritySaga() {
    yield takeLatest(DASHBOARD_PAGE_PRIORITY, updatePriorityAPI);
}

function* getApplicationsByGroupIdSaga() {
    yield takeLatest(DASHBOARD_APPLICATION_BY_TYPE, getApplicationsByGroupId);
}

function* getThumbnailSaga() {
    yield takeEvery(DASHBOARD_GET_THUMBNAIL_BY_FILEID, getThumbnailApi);
}

export default function* root() {
    yield [
        fork(getDashboardDataSaga),
        fork(saveDashboardSaga),
        fork(deleteDashboardSaga),
        fork(restCurrItem),
        fork(getDashboardItemSaga),
        fork(editPageConfigDetailSaga),
        fork(updateGroupDataSaga),
        fork(getGroupDataSaga),
        fork(deleteGroupDataSaga),
        fork(editGroupDataSaga),
        fork(duplicatePageConfigDataSaga),
        fork(updateGroupListDataSaga),
        fork(getCountDataSaga),
        fork(getDashboardTemplateDataSaga),
        fork(deleteTemplateDataSaga),
        fork(cheakModify),
        fork(deleteResourceSage),
        fork(updatePrioritySaga),
        fork(getApplicationsByGroupIdSaga),
        fork(getThumbnailSaga)
    ];
}
