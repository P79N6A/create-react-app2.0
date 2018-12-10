import { put, call, takeEvery, fork } from "redux-saga/effects";
import * as actionTypes from "./actionTypes";
import * as actions from "./actions";
import { getEventsData} from "api/usage";
import { actions as msg } from "modules/messageCenter";

// function* getEventsDataFunc({userId,startTime,endTime}) {
//     try {
//         const result = yield call(getEventsData,userId,startTime,endTime);
//         if (result && result.status) {
//             if (result.status.code === "00000000") {
//                 let eventMeter = result.meter;
//                 yield put(actions.getEventsDataFromAPISuccess(eventMeter));
//                 console.log("result--",result);
//             } else {
//                 throw new Error(result.status.message);
//             }
//         } else {
//             throw new Error("unkown error!");
//         }
//     } catch (e) {
//         yield put(msg.error(e.message));
//     }
// }

// function* getEventsSaga() {
//     yield takeEvery(actionTypes.GET_EVENTS_DATA_FROM_API, getEventsDataFunc);
// }

function* getEventsDataFunc({userId,startTime, endTime, pageno, limit}) {
    try {
        const result = yield call(getEventsData,userId,startTime,endTime, pageno, limit);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                let EventMeter = result.meter;
                yield put(actions.getEventDataFromAPISuccess(EventMeter));
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

function* getOneWeekEventsDataFunc({userId,currentTime,lastOneWeek, pageno, limit}) {
    try {
        const result = yield call(getEventsData,userId,currentTime,lastOneWeek, pageno, limit);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                let EventMeter = result.meter;
                yield put(actions.getOneWeekEventDataFromAPISuccess(EventMeter));
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

function* getOneMonthEventsDataFunc({userId,currentTime,lastOneMonth, pageno, limit}) {
    try {
        const result = yield call(getEventsData,userId,currentTime,lastOneMonth, pageno, limit);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                let EventMeter = result.meter;
                yield put(actions.getOneMonthEventDataFromAPISuccess(EventMeter));
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

function* getSixMonthsEventsDataFunc({userId,currentTime,lastSixMonths, pageno, limit}) {
    try {
        const result = yield call(getEventsData,userId,currentTime,lastSixMonths, pageno, limit);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                let EventMeter = result.meter;
                yield put(actions.getSixMonthsEventDataFromAPISuccess(EventMeter));
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

function* getOneYearEventsDataFunc({userId,currentTime,lastOneYear, pageno, limit}) {
    try {
        const result = yield call(getEventsData,userId,currentTime,lastOneYear, pageno, limit);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                let EventMeter = result.meter;
                yield put(actions.getOneYearEventDataFromAPISuccess(EventMeter));
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

function* getEventsSaga() {
    yield takeEvery(actionTypes.GET_EVENT_DATA_FROM_API, getEventsDataFunc);
    yield takeEvery(actionTypes.GET_ONE_WEEK_EVENT_DATA_FROM_API, getOneWeekEventsDataFunc);
    yield takeEvery(actionTypes.GET_ONE_MONTH_EVENT_DATA_FROM_API, getOneMonthEventsDataFunc);
    yield takeEvery(actionTypes.GET_SIX_MONTHS_EVENT_DATA_FROM_API, getSixMonthsEventsDataFunc);
    yield takeEvery(actionTypes.GET_ONE_YEAR_EVENT_DATA_FROM_API, getOneYearEventsDataFunc);
}

export default function* root() {
    yield [fork(getEventsSaga)];
}