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
 * Created by xulu on 25/05/2018.
 */
import { put, call, takeEvery, fork } from "redux-saga/effects";
import { TOPOGRAPHFLOATTAB_GETDETAIL, TOPOGRAPHFLOATTAB_GETALARM, TOPOGRAPHFLOATTAB_GETEVENT } from "./actionTypes";
import * as actions from "./actions";
import { actions as msg } from "modules/messageCenter";
import { getTopologyDetail, getTopologyAlarm, getTopologyEvent } from "api/topology";

function* getTopoDetail(obj) {
    try {
        const result = yield call(getTopologyDetail, obj.deviceId);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                let arrayData = result.arrayData && result.arrayData[0];
                yield put(actions.getTopoDetailSuccess(arrayData, obj.identify));
            } else {
                throw new Error(result.status.message);
            }
        } else {
            throw new Error("unkown error!");
        }
    } catch (e) {
        yield put(msg.error(e.message));
    }
}

function* getTopoAlarm(obj) {
    try {
        const result = yield call(getTopologyAlarm, obj.iotId, obj.pageNo, obj.pageLimit, obj.orderOpt);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                let alarms = result.alarms;
                let alarmPagination = result.pagination;
                yield put(actions.getTopoAlarmsSuccess(alarms, alarmPagination, obj.identify, obj.orderOpt));
            } else {
                throw new Error(result.status.message);
            }
        } else {
            throw new Error("unkown error!");
        }
    } catch (e) {
        yield put(msg.error(e.message));
    }
}

function* getTopoEvent(obj) {
    try {
        const result = yield call(getTopologyEvent, obj.iotId, obj.pageNo, obj.pageLimit, obj.currentOrder);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                let events = result.events;
                let eventPagination = result.pagination;
                yield put(actions.getTopoEventsSuccess(events, eventPagination, obj.identify, obj.orderOpt));
            } else {
                throw new Error(result.status.message);
            }
        } else {
            throw new Error("unkown error!");
        }
    } catch (e) {
        yield put(msg.error(e.message));
    }
}

function* getTopologyDetailSaga() {
    yield takeEvery(TOPOGRAPHFLOATTAB_GETDETAIL, getTopoDetail);
}

function* getTopologyAlarmSaga() {
    yield takeEvery(TOPOGRAPHFLOATTAB_GETALARM, getTopoAlarm);
}

function* getTopologyEventSaga() {
    yield takeEvery(TOPOGRAPHFLOATTAB_GETEVENT, getTopoEvent);
}

export default function* root() {
    yield [fork(getTopologyDetailSaga), fork(getTopologyAlarmSaga), fork(getTopologyEventSaga)];
}
