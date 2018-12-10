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
 * Created by wangrui on 22/06/2018.
 */
import { put, call, takeEvery, fork } from "redux-saga/effects";
import {
    TIMELINE_ALARM_SEARCH,
    TIMELINE_CHANGE_STATE_REQUEST,
    TIMELINE_ALARM_EXPORT
} from "./actionTypes";
import * as actions from "./actions";
import { actions as msg } from "modules/messageCenter";
import {
    alarmSearchForTimeline,
    callChangeStateApi,
    callAlarmExportApi
} from "api/timeline";
import { I18n } from "react-i18nify";
const moduleName = "Timeline";
function* getAlarms(obj) {
    try {
        let severityConfig = obj.severityConfig && Object.keys(obj.severityConfig).length > 0 && JSON.parse(obj.severityConfig);
        let apiflag = false;
        severityConfig && severityConfig.forEach(element => {
            if(element.defaultSelect){
                apiflag = true;
            }
        });
        if(!apiflag && severityConfig){
            yield put(actions.alarmSearchSuccess([], obj.identify));
            return;
        }
        const result = yield call(alarmSearchForTimeline, obj.startTime, obj.endTime, obj.severityConfig, obj);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                let arrayData = result.alarms;
                yield put(actions.alarmSearchSuccess(arrayData, obj.identify));
            } else {
                yield put(msg.warn(result.status.message, moduleName));
                throw new Error(result.status.message);
            }
        } else {
            yield put(msg.warn(I18n.t("timeline.sagasError.alarmsError"), `${moduleName}- GetAlarms`));
            throw new Error(I18n.t("timeline.sagasError.alarmsError"));
        }
       
    } catch (e) {
        yield put(msg.error(e.message, moduleName));
    }
}

function* callChangeState(obj) {
    try {
        const result = yield call(callChangeStateApi, obj);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                yield put(actions.changeStateRequestSuccess(result.alarms[0], obj.identify));
                yield put(msg.success("Successfully.", moduleName));
            } else {
                throw new Error(result.status.message);
            }
        } else {
            yield put(msg.warn(I18n.t("timeline.sagasError.acknowlageAlarmError"), `${moduleName}- Acknowlage`));
            throw new Error(I18n.t("timeline.sagasError.acknowlageAlarmError"));
        }
    } catch (e) {
        yield put(msg.error(e.message));
    }
}
function* callAlarmExport(obj) {
    try {
        const result = yield call(callAlarmExportApi, obj);
        yield put(actions.exportAlarmDataSuccess(result, obj.identify));
    } catch (e) {
        yield put(msg.error(e.message));
    }
}
function* getAlarmsSaga() {
    yield takeEvery(TIMELINE_ALARM_SEARCH, getAlarms);
}

function* changeStateRequestSaga() {
    yield takeEvery(TIMELINE_CHANGE_STATE_REQUEST, callChangeState);
}

function* callAlarmExportSaga() {
    yield takeEvery(TIMELINE_ALARM_EXPORT, callAlarmExport);
}
export default function* root() {
    yield [
        fork(getAlarmsSaga), fork(changeStateRequestSaga), fork(callAlarmExportSaga)
    ];
}
