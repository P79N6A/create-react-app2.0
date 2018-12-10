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

import { getPageConfigByPageId, updatePageConfig } from "api/ccms";
import { dashboardList } from "api/dashboardLibrary";
import { upload } from "api/security";
import { WIDGETS_COLLECTION_PATH } from "commons/constants/const";
import Fetch from "commons/utils/fetch";
import { actions as DASHBOARDS } from "modules/ccmsLibrary";
import { actions as MODALS } from "modules/ccmsModal";
import { actions as MESSAGE } from "modules/messageCenter";
import { call, fork, put, takeLatest } from "redux-saga/effects";
import * as actions from "./actions";
import * as actionTypes from "./actionTypes";
import { MODULE_NAME } from "./constants";

function* requestDefaultComponent() {}

function* requestConfigById({ pageKey, options }) {
    const { editMode = false, page } = options;
    const categories = yield Fetch.get(WIDGETS_COLLECTION_PATH);
    yield put(actions.transformDefaultWidgets(categories));
    yield put(
        actions.showModal(true, {
            editMode,
            loading: true
        })
    );
    if (pageKey) {
        let result = yield call(getPageConfigByPageId, page, pageKey);
        if (result.status.code === "00000000") {
            yield put(actions.transformPage(result.page));
            yield put(
                actions.showModal(true, {
                    editMode,
                    loading: false
                })
            );
        } else {
            yield put(
                actions.showModal(false, {
                    loading: false
                })
            );
            yield put(
                MESSAGE.error(
                    "Can't find dashboard by current pagekey, please contact your admin or try again later",
                    MODULE_NAME
                )
            );
        }
    } else {
        yield put(
            MESSAGE.error(
                "Can't find dashboard by current pagekey, please contact your admin or try again later",
                MODULE_NAME
            )
        );
    }
}

function* requestUpdatePage({ pageConfig, media }) {
    try {
        let result;
        if (media) {
            result = yield call(upload, media);
            if (result.status.code === "00000000") {
                const mediaUrl = result.mediaFileUrls[0];
                const { configValue } = pageConfig;
                configValue.thumbnail = mediaUrl;
            }
        }
        let { appid = "" } = pageConfig;
        result = yield call(updatePageConfig, pageConfig);
        if (result.status.code === "00000000") {
            yield put(actions.transformPage(pageConfig));
            yield put(
                DASHBOARDS.dashboardRequest({
                    applicationId: appid
                })
            );
            yield put(
                MODALS.toggleModal(false, {
                    mode: null
                })
            );
        } else {
            yield put(
                MESSAGE.error("Update dashboard failed, please contact your admin or try again later", MODULE_NAME)
            );
        }
    } catch (error) {}
}

function* requestCustomizeDashboard({ payload }) {
    let { appid } = payload;
    let searchConditions = {
        applicationId: appid,
        sortOrders: [
            {
                field: "createDt",
                asc: false
            }
        ],
        pageable: { pageno: 0, limit: 100 },
        group: "",
        fields: ["pageKey", "pageId", "name", "desc", "createDt", "updateDt"],
        configValue: {}
    };
    let result = yield call(dashboardList, searchConditions);
    if (result && result.status) {
        if (result.status.code === "00000000") {
            yield put(actions.getCustomizedDashboardsSuccess(result.configValue));
        } else {
            yield put(actions.getCustomizedDashboardsSuccess([]));
        }
    }
}

function* requestConfigByPageid() {
    yield takeLatest(actionTypes.CCMS_REQUEST_PAGE, requestConfigById);
}

function* requestAllDefaultComponent() {
    yield takeLatest(actionTypes.CCMS_REQUEST_DEFAULT_COMPONENT, requestDefaultComponent);
}

function* requestUpdateConfig() {
    yield takeLatest(actionTypes.CCMS_REQUEST_UPDATE_PAGE, requestUpdatePage);
}

function* requestCustomizedDashboardsSaga() {
    yield takeLatest(actionTypes.CCMS_REQUEST_CUSTOMIZED_DASHBOARD, requestCustomizeDashboard);
}

export default function* root() {
    yield [
        fork(requestUpdateConfig),
        fork(requestConfigByPageid),
        fork(requestAllDefaultComponent),
        fork(requestCustomizedDashboardsSaga)
    ];
}
