import { put, call, takeEvery, fork } from "redux-saga/effects";
import * as actionTypes from "./actionTypes";
import * as actions from "./actions";
import { getUsersNotificatonsData} from "api/usage";
import { actions as msg } from "modules/messageCenter";

function* getUsersDataFunc({userId,startTime, endTime, pageno, limit}) {
    try {
        const result = yield call(getUsersNotificatonsData,userId,startTime,endTime, pageno, limit);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                let usersMeter = result.meter;
                yield put(actions.getUsersDataFromAPISuccess(usersMeter));
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

function* getOneWeekUsersDataFunc({userId,currentTime,lastOneWeek, pageno, limit}) {
    try {
        const result = yield call(getUsersNotificatonsData,userId,currentTime,lastOneWeek, pageno, limit);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                let usersMeter = result.meter;
                yield put(actions.getOneWeekUsersDataFromAPISuccess(usersMeter));
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

function* getOneMonthUsersDataFunc({userId,currentTime,lastOneMonth, pageno, limit}) {
    try {
        const result = yield call(getUsersNotificatonsData,userId,currentTime,lastOneMonth, pageno, limit);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                let usersMeter = result.meter;
                yield put(actions.getOneMonthUsersDataFromAPISuccess(usersMeter));
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

function* getSixMonthsUsersDataFunc({userId,currentTime,lastSixMonths, pageno, limit}) {
    try {
        const result = yield call(getUsersNotificatonsData,userId,currentTime,lastSixMonths, pageno, limit);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                let usersMeter = result.meter;
                yield put(actions.getSixMonthsUsersDataFromAPISuccess(usersMeter));
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

function* getOneYearUsersDataFunc({userId,currentTime,lastOneYear, pageno, limit}) {
    try {
        const result = yield call(getUsersNotificatonsData,userId,currentTime,lastOneYear, pageno, limit);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                let usersMeter = result.meter;
                yield put(actions.getOneYearUsersDataFromAPISuccess(usersMeter));
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

function* getUsersSaga() {
    yield takeEvery(actionTypes.GET_USERS_DATA_FROM_API, getUsersDataFunc);
    yield takeEvery(actionTypes.GET_ONE_WEEK_USERS_DATA_FROM_API, getOneWeekUsersDataFunc);
    yield takeEvery(actionTypes.GET_ONE_MONTH_USERS_DATA_FROM_API, getOneMonthUsersDataFunc);
    yield takeEvery(actionTypes.GET_SIX_MONTHS_USERS_DATA_FROM_API, getSixMonthsUsersDataFunc);
    yield takeEvery(actionTypes.GET_ONE_YEAR_USERS_DATA_FROM_API, getOneYearUsersDataFunc);
}

export default function* root() {
    yield [fork(getUsersSaga)];
}