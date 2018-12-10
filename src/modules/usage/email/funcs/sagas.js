import { put, call, takeEvery, fork } from "redux-saga/effects";
import * as actionTypes from "./actionTypes";
import * as actions from "./actions";
import { getEmailNotificatonsData} from "api/usage";
import { actions as msg } from "modules/messageCenter";

function* getEmailDataFunc({userId,startTime, endTime, pageno, limit}) {
    try {
        const result = yield call(getEmailNotificatonsData,userId,startTime,endTime, pageno, limit);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                let emalMeter = result.meter;
                yield put(actions.getEmailDataFromAPISuccess(emalMeter));
                // console.log("result--",result);
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

function* getOneWeekEmailDataFunc({userId,currentTime,lastOneWeek, pageno, limit}) {
    try {
        const result = yield call(getEmailNotificatonsData,userId,currentTime,lastOneWeek, pageno, limit);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                let emalMeter = result.meter;
                yield put(actions.getOneWeekEmailDataFromAPISuccess(emalMeter));
                // console.log("result--",result);
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

function* getOneMonthEmailDataFunc({userId,currentTime,lastOneMonth, pageno, limit}) {
    try {
        const result = yield call(getEmailNotificatonsData,userId,currentTime,lastOneMonth, pageno, limit);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                let emalMeter = result.meter;
                yield put(actions.getOneMonthEmailDataFromAPISuccess(emalMeter));
                // console.log("month result--",result);
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

function* getSixMonthsEmailDataFunc({userId,currentTime,lastSixMonths, pageno, limit}) {
    try {
        const result = yield call(getEmailNotificatonsData,userId,currentTime,lastSixMonths, pageno, limit);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                let emalMeter = result.meter;
                yield put(actions.getSixMonthsEmailDataFromAPISuccess(emalMeter));
                // console.log("six month result--",result);
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

function* getOneYearEmailDataFunc({userId,currentTime,lastOneYear, pageno, limit}) {
    try {
        const result = yield call(getEmailNotificatonsData,userId,currentTime,lastOneYear, pageno, limit);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                let emalMeter = result.meter;
                yield put(actions.getOneYearEmailDataFromAPISuccess(emalMeter));
                // console.log("one year result--",result);
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

function* getEmailSaga() {
    yield takeEvery(actionTypes.GET_EMAIL_DATA_FROM_API, getEmailDataFunc);
    yield takeEvery(actionTypes.GET_ONE_WEEK_EMAIL_DATA_FROM_API, getOneWeekEmailDataFunc);
    yield takeEvery(actionTypes.GET_ONE_MONTH_EMAIL_DATA_FROM_API, getOneMonthEmailDataFunc);
    yield takeEvery(actionTypes.GET_SIX_MONTHS_EMAIL_DATA_FROM_API, getSixMonthsEmailDataFunc);
    yield takeEvery(actionTypes.GET_ONE_YEAR_EMAIL_DATA_FROM_API, getOneYearEmailDataFunc);
}

export default function* root() {
    yield [fork(getEmailSaga)];
}