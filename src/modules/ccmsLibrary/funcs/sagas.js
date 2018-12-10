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
import { getPageConfig, updatePageConfig } from "api/ccms";
import { dashboardList, getGroupList } from "api/dashboardLibrary";
import { alarmList, deviceList } from "api/statistics";
import store from "commons/store";
import { actions as MESSAGE } from "modules/messageCenter";
import { call, fork, put, takeLatest } from "redux-saga/effects";
import { DEFAULT_SEARCH_CONDITION } from "../funcs/constants";
import * as actions from "./actions";
import * as types from "./actionTypes";

const MODULE_NAME = "CCMS";

function* dashboardRequest({ conditions }) {
    let result = yield call(dashboardList, conditions);
    let { configValue, status } = result;
    if (status.code === "00000000") {
        yield put(actions.getDashboardSuccess(configValue));
    } else {
        yield put(MESSAGE.error(status.message, MODULE_NAME));
    }
    yield put(actions.toggleLoadingState(false));
}

function* groupRequest({ payload }) {
    const { appid } = payload;
    let result = yield call(getGroupList, appid);
    let { status } = result;
    if (status.code === "00000000") {
        yield put(actions.groupRequestSuccess(result.group));
    } else {
        yield put(MESSAGE.error(status.message));
    }
}

function* updatePriority({ payload }) {
    const { pageId, appid, priority } = payload;
    const result = yield call(getPageConfig, pageId);
    const { status, configValue: pageConfig } = result;
    if (status.code === "00000000") {
        if (priority === "high") {
            pageConfig.priority = "default";
        } else {
            pageConfig.priority = "high";
        }
        const result = yield call(updatePageConfig, pageConfig);
        const { status, appendMsg } = result;
        if (status.code === "00000000" && appendMsg === pageConfig.pageKey) {
            // fetch dashboard-list after set the priority for dashboard
            yield put(
                actions.dashboardRequest({
                    reload: false,
                    applicationId: appid
                })
            );
        } else if (status.code === "21000401") {
            yield put(MESSAGE.warn(status.message, MODULE_NAME));
        } else {
            yield put(MESSAGE.warn(status.message, MODULE_NAME));
        }
    } else {
        yield put(MESSAGE.error(status.message, MODULE_NAME));
    }
}

function* requestCounts({ payload }) {
    const { appid, apppath } = payload;
    store.dispatch(
        actions.requestCountsSuccess({
            devices: { count: 0 },
            alarms: { count: 0 },
            dashboards: { count: 0 }
        })
    );
    Promise.all([
        yield call(alarmList, undefined, undefined, apppath),
        yield call(deviceList, "device", apppath),
        yield call(
            dashboardList,
            Object.assign({}, DEFAULT_SEARCH_CONDITION, {
                applicationId: appid
            })
        )
    ])
        .then(function(datas) {
            let flag;
            datas.forEach(data => {
                if (data) {
                    const { status } = data;
                    if (status.code === "00000000") {
                    } else {
                        store.dispatch(MESSAGE.warn(status.message));
                        store.dispatch(
                            actions.requestCountsSuccess({
                                devices: { count: 0 },
                                alarms: { count: 0 },
                                dashboards: { count: 0 }
                            })
                        );
                        flag = true;
                        return;
                    }
                }
            });
            if (flag) return;
            const alarmCounts = datas[0].alarms[0].count;
            const deviceCounts = datas[1].mapData.device.all;
            const dashboardCounts = datas[2].pageable.total;
            store.dispatch(
                actions.requestCountsSuccess({
                    devices: { count: deviceCounts },
                    alarms: { count: alarmCounts },
                    dashboards: { count: dashboardCounts }
                })
            );
        })
        .catch(err => {
            console.log(err, "LIBRARY-SAGAS L90");
        });
}

function* dashboardRequestSaga() {
    yield takeLatest(types.REQUEST_DASHBOARDS, dashboardRequest);
}

function* groupRequestSaga() {
    yield takeLatest(types.REQUEST_GROUP, groupRequest);
}

function* updatePrioritySaga() {
    yield takeLatest(types.REQUEST_UPDATE_DASHBOARD_PRIORITY, updatePriority);
}

function* requestCountsSaga() {
    yield takeLatest(types.REQUEST_COUNTS, requestCounts);
}

export default function* root() {
    yield [fork(dashboardRequestSaga), fork(groupRequestSaga), fork(updatePrioritySaga), fork(requestCountsSaga)];
}
