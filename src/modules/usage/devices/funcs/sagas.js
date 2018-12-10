import { put, call, takeEvery, fork } from "redux-saga/effects";
import * as actionTypes from "./actionTypes";
import * as actions from "./actions";
import { getDevicesData, getMeterData} from "api/usage";
import { actions as msg } from "modules/messageCenter";
import {
    getTopologyResource
} from "api/dashboardLibrary";

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

function* getDevicesDataFunc({userId,startTime,endTime, pageno, limit}) {
    try {
        const result = yield call(getDevicesData,userId,startTime,endTime, pageno, limit);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                let deviceMeter = result.meter;
                yield put(actions.getDeviceDataFromAPISuccess(deviceMeter));
                console.log("result--",result);
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

function* getOneWeekDevicesDataFunc({userId,currentTime,lastOneWeek, pageno, limit}) {
    try {
        const result = yield call(getDevicesData,userId,currentTime,lastOneWeek, pageno, limit);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                let deviceMeter = result.meter;
                yield put(actions.getOneWeekDeviceDataFromAPISuccess(deviceMeter));
                console.log("result--",result);
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

function* getOneMonthDevicesDataFunc({userId,currentTime,lastOneMonth, pageno, limit}) {
    try {
        const result = yield call(getDevicesData,userId,currentTime,lastOneMonth, pageno, limit);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                let deviceMeter = result.meter;
                yield put(actions.getOneMonthDeviceDataFromAPISuccess(deviceMeter));
                console.log("month result--",result);
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

function* getSixMonthsDevicesDataFunc({userId,currentTime,lastSixMonths, pageno, limit}) {
    try {
        const result = yield call(getDevicesData,userId,currentTime,lastSixMonths, pageno, limit);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                let deviceMeter = result.meter;
                yield put(actions.getSixMonthsDeviceDataFromAPISuccess(deviceMeter));
                console.log("six month result--",result);
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

function* getOneYearDevicesDataFunc({userId,currentTime,lastOneYear, pageno, limit}) {
    try {
        const result = yield call(getDevicesData,userId,currentTime,lastOneYear, pageno, limit);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                let deviceMeter = result.meter;
                yield put(actions.getOneYearDeviceDataFromAPISuccess(deviceMeter));
                console.log("one year result--",result);
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

function* getDeviesSaga() {
    yield takeEvery(actionTypes.COUNT_DEVICE_REQUEST, getDeviceData);
    yield takeEvery(actionTypes.GET_DEVICE_DATA_FROM_API, getDevicesDataFunc);
    yield takeEvery(actionTypes.GET_ONE_WEEK_DEVICE_DATA_FROM_API, getOneWeekDevicesDataFunc);
    yield takeEvery(actionTypes.GET_ONE_MONTH_DEVICE_DATA_FROM_API, getOneMonthDevicesDataFunc);
    yield takeEvery(actionTypes.GET_SIX_MONTHS_DEVICE_DATA_FROM_API, getSixMonthsDevicesDataFunc);
    yield takeEvery(actionTypes.GET_ONE_YEAR_DEVICE_DATA_FROM_API, getOneYearDevicesDataFunc);
}

export default function* root() {
    yield [fork(getDeviesSaga)];
}