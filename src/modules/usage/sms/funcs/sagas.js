import { put, call, takeEvery, fork } from "redux-saga/effects";
import * as actionTypes from "./actionTypes";
import * as actions from "./actions";
import { getSmsNotificatonsData} from "api/usage";
import { actions as msg } from "modules/messageCenter";

function* getSmsDataFunc({userId,startTime, endTime, pageno, limit}) {
    try {
        const result = yield call(getSmsNotificatonsData,userId,startTime,endTime, pageno, limit);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                let smsMeter = result.meter;
                yield put(actions.getSmsDataFromAPISuccess(smsMeter));
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

function* getOneWeekSmsDataFunc({userId,currentTime,lastOneWeek, pageno, limit}) {
    try {
        const result = yield call(getSmsNotificatonsData,userId,currentTime,lastOneWeek, pageno, limit);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                let smsMeter = result.meter;
                yield put(actions.getOneWeekSmsDataFromAPISuccess(smsMeter));
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

function* getOneMonthSmsDataFunc({userId,currentTime,lastOneMonth, pageno, limit}) {
    try {
        const result = yield call(getSmsNotificatonsData,userId,currentTime,lastOneMonth, pageno, limit);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                let smsMeter = result.meter;
                yield put(actions.getOneMonthSmsDataFromAPISuccess(smsMeter));
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

function* getSixMonthsSmsDataFunc({userId,currentTime,lastSixMonths, pageno, limit}) {
    try {
        const result = yield call(getSmsNotificatonsData,userId,currentTime,lastSixMonths, pageno, limit);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                let smsMeter = result.meter;
                yield put(actions.getSixMonthsSmsDataFromAPISuccess(smsMeter));
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

function* getOneYearSmsDataFunc({userId,currentTime,lastOneYear, pageno, limit}) {
    try {
        const result = yield call(getSmsNotificatonsData,userId,currentTime,lastOneYear, pageno, limit);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                let smsMeter = result.meter;
                yield put(actions.getOneYearSmsDataFromAPISuccess(smsMeter));
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

function* getSmsSaga() {
    yield takeEvery(actionTypes.GET_SMS_DATA_FROM_API, getSmsDataFunc);
    yield takeEvery(actionTypes.GET_ONE_WEEK_SMS_DATA_FROM_API, getOneWeekSmsDataFunc);
    yield takeEvery(actionTypes.GET_ONE_MONTH_SMS_DATA_FROM_API, getOneMonthSmsDataFunc);
    yield takeEvery(actionTypes.GET_SIX_MONTHS_SMS_DATA_FROM_API, getSixMonthsSmsDataFunc);
    yield takeEvery(actionTypes.GET_ONE_YEAR_SMS_DATA_FROM_API, getOneYearSmsDataFunc);
}

export default function* root() {
    yield [fork(getSmsSaga)];
}