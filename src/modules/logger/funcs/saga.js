import { put, call, takeLatest, fork } from "redux-saga/effects";
import * as actionTypes from "./actionTypes";
import * as actions from "./action";
import * as message from "modules/messageCenter/funcs/actions";

import { getLoggerList, downLoadFile, getModules, getModuleChild } from "api/logger";
const modulesName = "Logger Management";
function* getLoggerListData({ searchData }) {
    try {
        yield put(actions.changeLoading(true));
        const result = yield call(getLoggerList, searchData);
        const { criteria } = searchData;
        let pagination = Object.assign({}, result.pagination, { criteria });
        if (result && result.status) {
            if (result.status.code === "00000000") {
                yield put(actions.getLogListSuccess(result.value, pagination));
                yield put(actions.changeLoading(false));
                yield put(actions.reset({ pushWebsocket: true }));
            } else {
                yield put(actions.changeLoading(false));
                throw new Error(result.status.message || "UNKOW ERROR!");
            }
        }
    } catch (e) {
        yield put(actions.changeLoading(false));
        yield put(message.error(e.message, modulesName));
        console.log(e);
    }
}

function* getModuleChildData({ modulename }) {
    try {
        const result = yield call(getModuleChild, modulename);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                yield put(actions.getModuleChildSuccess(result.value));
                yield put(actions.changeLoading(false));
            } else {
                yield put(actions.changeLoading(false));
                throw new Error(result.status.message || "UNKOW ERROR!");
            }
        }
    } catch (e) {
        yield put(message.error(e.message, modulesName));
        console.log(e);
    }
}

function* getModulesData() {
    try {
        const result = yield call(getModules);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                yield put(actions.getModulesSuccess(result.value));
                yield put(actions.changeLoading(false));
            } else {
                yield put(actions.changeLoading(false));
                throw new Error(result.status.message || "UNKOW ERROR!");
            }
        }
    } catch (e) {
        yield put(message.error(e.message, modulesName));
        console.log(e);
    }
}

function* downLoadFileData({ filename }) {
    try {
        const result = yield call(downLoadFile, filename);
        if (result) {
            yield put(actions.downLoadSuccess(result));
        } else {
            throw new Error(result.status.message || "UNKOW ERROR!");
        }
    } catch (e) {
        yield put(message.error(e.message, modulesName));
        console.log(e);
    }
}

function* getLoggerListDataSaga() {
    yield takeLatest(actionTypes.LOGGER_GET_LOG_LIST_REQUEST, getLoggerListData);
}

function* getModulesDataSaga() {
    yield takeLatest(actionTypes.LOGGER_GET_MODULES_REQUEST, getModulesData);
}

function* getModuleChildDataSaga() {
    yield takeLatest(actionTypes.LOGGER_GET_MODULES_CHILD_REQUEST, getModuleChildData);
}

function* downLoadFileDataSaga() {
    yield takeLatest(actionTypes.LOGGER_DOWNLOAD_FILE, downLoadFileData);
}

export default function* root() {
    yield [
        fork(getLoggerListDataSaga),
        fork(getModulesDataSaga),
        fork(getModuleChildDataSaga),
        fork(downLoadFileDataSaga)
    ];
}
