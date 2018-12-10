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
 * Created by SongCheng on 20/05/2018.
 */
import { put, call, takeLatest, fork, takeEvery } from "redux-saga/effects";
import {
    ALARM_GETDETAIL_REQUEST,
    ALARM_REQUEST_ITEMSSEARCH,
    ALARM_GETDETAILMEDIA_REQUEST,
    EXPORT_ALARM_DATA_REQUEST,
    ALARM_STREAM_REQUEST,
    ALARM_PARAMETERS_REQUEST,
    ALARM_CHANGE_STATE_REQUEST,
    ALARM_GET_ASSOCIATIONS_DATA,
    ALARM_ASSOCIATE_ITEM,
    ALARM_DISSOCIATE_ITEM,
    ALARM_ASSOCIATION_SEARCH_REQUEST,
    ALARM_POST_EDIT_DATA,
    // ALARM_POST_EDIT_DATA_SUCCESS,
    ALARM_GET_USER_LIST,
    ALARM_GET_COMMENTS_DATA,
    ALARM_POST_COMMENTS,
    ALARM_UPDATE_LISTDETAIL,
    ALARM_UPLOAD_FILE,
    ALARM_POST_FILE_ID,
    EXPORT_ALARM_DETAIL_REQUEST,
    ALARM_GET_PAGE_KEY
} from "./actionTypes";
import * as actions from "./actions";
import { actions as msg } from "modules/messageCenter";
import {
    getDetaildata,
    getSearchItemsData,
    getDetailMedia,
    exportAlarmData,
    getStreamDataApi,
    callParametersApi,
    callChangeStateApi,
    callAssociateItemApi,
    callDissociateItemApi,
    callEditDataApi,
    getUserListApi,
    getCommentsDataApi,
    postCommentsApi,
    callUploadFileApi,
    callPostFileIdApi,
    callGetPageKeyApi
} from "api/alarm";
import moment from "moment";
import Store from "commons/store";
import { checkBrowser, downloadFile } from "./detailExport";

const moduleName = "Alarm";
function* searchItemsData(obj) {
    try {
        const result = yield call(getSearchItemsData, obj);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                let pagination = result.pagination;
                let arrayData = result.alarms;
                yield put(actions.getDataRequestSuccess(arrayData, pagination, obj.identify));
            } else {
                yield put(actions.getDataRequestFailed(obj.identify));
                yield put(msg.warn(result.status.message, moduleName));
            }
        } else {
            yield put(msg.error(result.status.message || "unkown error!", moduleName));
        }
    } catch (e) {
        console.log(moduleName + "-" + e.message);
    }
}

function* detaildata(obj) {
    try {
        const result = yield call(getDetaildata, obj.id);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                let arrayData = result.alarms;
                yield put(actions.getDetailRequestSuccess(arrayData, obj.identify));
            } else {
                yield put(msg.warn(result.status.message, moduleName));
            }
        } else {
            yield put(msg.error(result.status.message || "unkown error!", moduleName));
        }
    } catch (e) {
        console.log(moduleName + "-" + e.message);
    }
}
function* getDetailMediaRequest(obj) {
    try {
        let idArr = obj.id;
        const result = yield call(getDetailMedia, idArr[0]);
        let odownLoad = document.createElement("a");
        let browserType = checkBrowser();
        let filename = result[1].headers.get("Content-Disposition");
        if (filename) {
            try {
                filename = filename.slice(filename.indexOf("filename=") + 10, filename.length - 1);
            } catch (error) {
                filename = "";
            }
        }
        if (browserType === "IE" || browserType === "Edge") {
            odownLoad.click();
            window.navigator.msSaveBlob(result[0], filename || moment() + ".png");
        } else {
            odownLoad.href = URL.createObjectURL(result[0]);
            odownLoad.download = filename || moment() + ".png";
            odownLoad.click();
            odownLoad.remove();
        }
    } catch (e) {
        console.log(moduleName + "-" + e.message);
    }
}

function* callExportAlarmData(obj) {
    try {
        const result = yield call(exportAlarmData, obj);
        yield put(actions.exportAlarmDataSuccess(obj.identify, result));
    } catch (e) {
        console.log(moduleName + "-" + e.message);
    }
}
// function* callExportAlarmDetail({ identify, itemsData, columninfos, pageLimit }) {
function* callExportAlarmDetail(obj) {
    try {
        const exportData = yield call(exportAlarmData, obj);
        if (exportData.status && (exportData.status.code === "20010020" || exportData.status.code === "00000001")) {
            yield put(msg.error(exportData.status.message, moduleName));
        } else {
            var odownLoad = document.createElement("a");
            let browserType = checkBrowser();
            if (browserType === "IE" || browserType === "Edge") {
                odownLoad.click();
                downloadFile(moment() + "-Alarm.xls", exportData);
            } else {
                odownLoad.href = "data:application/octet-stream;charset=utf-8;base64," + exportData;
                odownLoad.download = moment() + "-Alarm.xls";
                odownLoad.click();
                odownLoad.remove();
            }
        }
    } catch (e) {
        console.log(moduleName + "-" + e.message);
    }
}

function* getStreamData(obj) {
    try {
        const result = yield call(getStreamDataApi, obj);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                let arrayData = result.alarms;
                yield put(actions.getStreamDataRequestSuccess(arrayData, obj.identify));
            } else {
                yield put(actions.getDataRequestFailed(obj.identify));
                yield put(msg.warn(result.status.message, moduleName));
            }
        } else {
            yield put(msg.error(result.status.message || "unkown error!", moduleName));
        }
    } catch (e) {
        console.log(moduleName + "-" + e.message);
    }
}

function* callParameters(obj) {
    try {
        const result = yield call(callParametersApi, obj.value);
        yield put(actions.getParametersSuccess(result.parameters, obj.identify));
    } catch (e) {
        console.log(moduleName + "-" + e.message);
    }
}

function* callChangeState(obj) {
    try {
        const result = yield call(callChangeStateApi, obj);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                // yield put(actions.callChangeStateSuccess(result.alarms[0], obj.identify));
                yield put(actions.updateListDetailSuccess(obj.identify, result.alarms, "listDetail"));
                yield put(msg.success(result.status.message, moduleName));
            } else {
                //successful but unable to start SOP
                yield put(msg.warn(result.status.message, moduleName));
            }
        } else {
            // throw new Error("unkown error!");
            yield put(msg.error(result.status.message || "unkown error!", moduleName));
        }
    } catch (e) {
        console.log("Alarm-" + e.message);
    }
}

function* callAssociationsData(obj) {
    try {
        const result = yield call(getSearchItemsData, obj);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                let arrayData = result.alarms;
                yield put(actions.getAssociationsDataSuccess(arrayData, obj.identify));
            } else {
                yield put(msg.warn(result.status.message, moduleName));
            }
        } else {
            yield put(msg.error(result.status.message || "unkown error!", moduleName));
        }
    } catch (e) {
        console.log(moduleName + "-" + e.message);
    }
}

function* callAssociateItem(obj) {
    try {
        const result = yield call(callAssociateItemApi, obj);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                let arrayData = result.alarms;
                //return P => update list and detail || use obj.childId to call detailApi =>update list
                yield put(actions.updateListDetailSuccess(obj.identify, arrayData, "listDetail"));
                yield put(actions.updateListDetail(obj.identify, obj.childId, "list"));
                yield put(msg.success(result.status.message, moduleName));
            } else {
                yield put(msg.warn(result.status.message, moduleName));
            }
        } else {
            yield put(msg.error(result.status.message || "unkown error!", moduleName));
        }
    } catch (e) {
        console.log(moduleName + "-" + e.message);
    }
}

function* callDissociateItem(obj) {
    try {
        const result = yield call(callDissociateItemApi, obj);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                let arrayData = result.alarms;
                yield put(msg.success(result.status.message, moduleName));
                yield put(actions.dissociateItemSuccess(arrayData, obj.identify));
                if (obj.state === "CC") {
                    //return P => update list and detail || use obj.childId to call detailApi =>update list
                    yield put(actions.updateListDetailSuccess(obj.identify, arrayData, "listDetail"));
                    yield put(actions.updateListDetail(obj.identify, obj.childId, "list"));
                } else {
                    //return P =>update list || use obj.childId to call detailApi =>update list and detail
                    yield put(actions.updateListDetailSuccess(obj.identify, arrayData, "list"));
                    yield put(actions.updateListDetail(obj.identify, obj.childId, "listDetail"));
                }
            } else {
                yield put(msg.warn(result.status.message, moduleName));
            }
        } else {
            yield put(msg.error(result.status.message || "unkown error!", moduleName));
        }
    } catch (e) {
        console.log(moduleName + "-" + e.message);
    }
}

function* callUpdateListDetail(obj) {
    try {
        const result = yield call(getDetaildata, obj.id);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                let arrayData = result.alarms;
                yield put(actions.updateListDetailSuccess(obj.identify, arrayData, obj.value));
            } else {
                yield put(msg.warn(result.status.message, moduleName));
            }
        } else {
            yield put(msg.error(result.status.message || "unkown error!", moduleName));
        }
    } catch (e) {
        console.log(moduleName + "-" + e.message);
    }
}

function* searchAssociationsData(obj) {
    try {
        const result = yield call(getSearchItemsData, obj);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                let pagination = result.pagination;
                let arrayData = result.alarms;
                yield put(actions.associationSearchRequestSuccess(arrayData, pagination, obj.identify));
            } else {
                yield put(msg.warn(result.status.message, moduleName));
            }
        } else {
            yield put(msg.error(result.status.message || "unkown error!", moduleName));
        }
    } catch (e) {
        console.log(moduleName + "-" + e.message);
    }
}

//
function* callEditData(obj) {
    try {
        let str = checkEdit(obj);
        if (str.indexOf("&") === -1) {
            return;
        }
        const result = yield call(callEditDataApi, obj.id, str);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                let arrayData = result.alarms;
                yield put(actions.updateListDetailSuccess(obj.identify, arrayData, "list"));
            }
            if (result.status.level === "info") {
                yield put(msg.success(result.status.message, moduleName));
            } else if (result.status.level === "warn") {
                yield put(msg.warn(result.status.message, moduleName));
            } else {
                yield put(msg.error(result.status.message, moduleName));
            }
        } else {
            yield put(msg.error(result.status.message || "unkown error!", moduleName));
        }
    } catch (e) {
        console.log("Alarm-" + e.message);
    }
}
function checkEdit(obj) {
    let str = "shownull=hide";
    for (let i in obj) {
        if (obj[i] && i !== "type" && i !== "identify" && i !== "id") {
            str = str + "&" + i + "=" + obj[i];
        }
    }
    return str;
}

//
function* getUserList(obj) {
    try {
        const result = yield call(getUserListApi, obj);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                let pagination = result.pagination;
                let arrayData = result.users;
                yield put(actions.getUserListSuccess(arrayData, pagination, obj.identify));
            } else {
                yield put(msg.warn(result.status.message, moduleName));
            }
        } else {
            yield put(msg.error(result.status.message || "unkown error!", moduleName));
        }
    } catch (e) {
        console.log(moduleName + "-" + e.message);
    }
}

//
function* getCommentsData(obj) {
    try {
        const result = yield call(getCommentsDataApi, obj);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                let arrayData = result.comments;
                console.log("comments:", arrayData);
                yield put(actions.getCommentsDataSuccess(arrayData, obj.identify));
            } else {
                yield put(msg.warn(result.status.message, moduleName));
            }
        } else {
            yield put(msg.error(result.status.message || "unkown error!", moduleName));
        }
    } catch (e) {
        console.log(moduleName + "-" + e.message);
    }
}
function* postComments(obj) {
    try {
        if (obj.value.trim() === "") {
            yield put(msg.warn("Comments cannot be empty.", moduleName));
            return;
        }
        const result = yield call(postCommentsApi, obj);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                yield put(actions.getCommentsData(obj.id, obj.identify));
                yield put(msg.success(result.status.message, moduleName));
            } else {
                yield put(msg.warn(result.status.message, moduleName));
            }
        } else {
            yield put(msg.error(result.status.message || "unkown error!", moduleName));
        }
    } catch (e) {
        console.log(moduleName + "-" + e.message);
    }
}

function* callUploadFile(obj) {
    try {
        const result = yield call(callUploadFileApi, obj.file);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                let fileId = result.mediaFileUrls;
                yield put(actions.uploadFileSuccess(fileId, obj.identify));
            } else {
                yield put(msg.warn(result.status.message, moduleName));
            }
        } else {
            yield put(msg.error(result.status.message || "unkown error!", moduleName));
        }
    } catch (e) {
        console.log(moduleName + "-" + e.message);
    }
}

function* callPostFileId(obj) {
    try {
        const result = yield call(callPostFileIdApi, obj);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                // console.log("result=>", result);
                yield put(actions.getCommentsData(obj.id, obj.identify));
                yield put(msg.success(result.status.message, moduleName));
            } else {
                yield put(msg.warn(result.status.message, moduleName));
            }
        } else {
            yield put(msg.error(result.status.message || "unkown error!", moduleName));
        }
    } catch (e) {
        console.log(moduleName + "-" + e.message);
    }
}

function* callGetPageKey(obj) {
    try {
        const result = yield call(callGetPageKeyApi, obj);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                let key =
                    JSON.parse(result.config.configvals[0].configval).dashboard &&
                    JSON.parse(result.config.configvals[0].configval).dashboard.pagekey;
                let dashboard =
                    Store.getState().CCMSEX.customizedDashboards &&
                    Store.getState().CCMSEX.customizedDashboards.filter(item => item.pageKey === key);
                key = dashboard.length > 0 ? key : null;
                yield put(actions.getPageKeySuccess(key, obj.identify));
            } else {
                yield put(actions.getPageKeySuccess(null, obj.identify));
            }
        } else {
            yield put(actions.getPageKeySuccess(null, obj.identify));
        }
    } catch (e) {
        console.log(moduleName + "-" + e.message);
    }
}

function* getAlarmListSaga() {
    yield takeEvery(ALARM_STREAM_REQUEST, getStreamData);
    yield takeLatest(ALARM_GETDETAIL_REQUEST, detaildata);
    yield takeEvery(ALARM_REQUEST_ITEMSSEARCH, searchItemsData);
    yield takeEvery(EXPORT_ALARM_DATA_REQUEST, callExportAlarmData);
    yield takeLatest(ALARM_PARAMETERS_REQUEST, callParameters);
    yield takeLatest(ALARM_CHANGE_STATE_REQUEST, callChangeState);
    yield takeLatest(ALARM_GET_ASSOCIATIONS_DATA, callAssociationsData);
    yield takeLatest(ALARM_ASSOCIATE_ITEM, callAssociateItem);
    yield takeLatest(ALARM_DISSOCIATE_ITEM, callDissociateItem);
    yield takeLatest(ALARM_ASSOCIATION_SEARCH_REQUEST, searchAssociationsData);
    yield takeLatest(ALARM_POST_EDIT_DATA, callEditData);
    yield takeLatest(ALARM_GET_USER_LIST, getUserList);
    yield takeLatest(ALARM_GET_COMMENTS_DATA, getCommentsData);
    yield takeLatest(ALARM_POST_COMMENTS, postComments);
    yield takeLatest(ALARM_UPDATE_LISTDETAIL, callUpdateListDetail);
    yield takeLatest(ALARM_UPLOAD_FILE, callUploadFile);
    yield takeLatest(ALARM_POST_FILE_ID, callPostFileId);
    yield takeLatest(ALARM_GETDETAILMEDIA_REQUEST, getDetailMediaRequest);
    yield takeLatest(EXPORT_ALARM_DETAIL_REQUEST, callExportAlarmDetail);
    yield takeLatest(ALARM_GET_PAGE_KEY, callGetPageKey);
}

export default function* root() {
    yield [fork(getAlarmListSaga)];
}
