import {
    put,
    call,
    takeEvery,
    takeLatest,
    fork
} from "redux-saga/effects";
import {
    COUNT_DEVICE_REQUEST,
    COUNT_EVENTS_REQUEST,
    USAGE_METER_DEVICE_DETAIL,
    USAGE_GET_ACOUNTS_DETAIL

} from "./actionTypes";
import * as actions from "./actions";
import {
    actions as msg
} from "modules/messageCenter";

import { /*deviceList,*/
    alarmList
} from "api/statistics";
import {
    getTopologyResource
} from "api/dashboardLibrary";

import {
    getDevicesData,
    getStreamDataApi
} from "api/usage";
import {
    getAccountData
} from "api/identify";


function* loginAccountInfo() {
    try {
        const result = yield call(getAccountData);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                let data = result.accounts;
                yield put(actions.getAcountsSuccess(data));
            } else {
                throw new Error(result.status.message);
            }
        } else {
            throw new Error("unkown error!");
        }
    } catch (e) {}
}

function* searchItemsData(obj) {
    try {
        const result = yield call(getDevicesData, obj);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                let arrayData = result.meter;
                yield put(actions.getDeviceDataRequestSuccess(arrayData, obj.identify));
                console.log("meter arrayData", arrayData);
            } else {
                // yield put(actions.getDeviceRequestFailed(obj.identify));
                // throw new Error(result.status.message);
            }
        } else {
            throw new Error("unkown error!");
        }
        console.log("result", result);
    } catch (e) {
        yield put(msg.error(e.message));
    }
}


function* getDeviceData() {
    try {
        // const alarm = yield call(alarmList);
        // const events = yield call(getStreamDataApi);

        // const devices = yield call(deviceList);
        const devices = yield call(getTopologyResource);
        if (devices && devices.status) {
            if (devices.status.code === "00000000") {
                let arr = [];
                console.log("devices API", devices);


                try {
                    arr.push(devices.pagination.totalrecords ? devices.pagination.totalrecords : 0);

                    yield put(actions.getDeviceCountSuccess(arr));
                    console.log("device apiarr", arr);
                } catch (error) {
                    throw new Error(error);

                }
            } else {
                console.log("devices Error API", devices);

                throw new Error("Data error" || "UNKOW ERROR!");

            }
        }
    } catch (e) {
        console.log(e);
    }
}

function* getEventsData() {
    try {
        // const alarm = yield call(alarmList);
        const events = yield call(getStreamDataApi);
        if (events && events.status) {
            if (events.status.code === "00000000") {
                let arr = [];
                try {

                    arr.push(events.pagination.totalrecords ? events.pagination.totalrecords : 0);

                    yield put(actions.getEventCountSuccess(arr));
                    console.log("event apiarr", arr);
                } catch (error) {
                    throw new Error(error);

                }
            } else {

                console.log("Events Error API", events);
                throw new Error("Data error" || "UNKOW ERROR!");

            }
        }
    } catch (e) {
        console.log(e);
    }
}

// function* getTopologyDetailSaga() {
//     yield takeEvery(USAGE_METER_DEVICE_DETAIL, searchItemsData);
// }

// function* getCountDataSaga() {
//     yield takeLatest(COUNT_REQUEST, getCountData);
// }

// function* getAccountDataSaga() {
//     yield takeLatest(USAGE_GET_ACOUNTS_DETAIL, loginAccountInfo);
// }

function* usage() {
    yield takeEvery(USAGE_METER_DEVICE_DETAIL, searchItemsData);
    yield takeLatest(COUNT_DEVICE_REQUEST, getDeviceData);
    yield takeLatest(COUNT_EVENTS_REQUEST, getEventsData);
    yield takeLatest(USAGE_GET_ACOUNTS_DETAIL, loginAccountInfo);
}

export default function* root() {
    yield [
        fork(usage)
    ];
}