import { put, call, takeLatest, fork } from "redux-saga/effects";
import * as actionTypes from "./actionTypes";
import * as actions from "./actions";
import * as message from "modules/messageCenter/funcs/actions";
import { resetForgotPassword } from "api/identify";
import { isValidToken } from "api/security";
const modulesName = "Reset Password";

function* activitionUserData({ postData }) {
    try {
        let result = yield call(resetForgotPassword, postData);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                yield put(message.success(result.status.message, modulesName));
                yield put(actions.reset({ active: true, isLoading: false }));
            } else {
                yield put(actions.reset({ active: false, isLoading: false }));
                yield put(message.error(result.status.message, modulesName));
                throw new Error(result.status.message || "UNKOW ERROR!");
            }
        }
    } catch (error) {
        console.log(error);
    }
}

function* validationToken({ token }) {
    try {
        let result = yield call(isValidToken, token);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                yield put(actions.reset({ isValidToken: true }));
            } else {
                yield put(actions.reset({ isValidToken: false }));
                yield put(message.error(result.status.message, modulesName));
                throw new Error(result.status.message || "UNKOW ERROR!");
            }
        }
    } catch (error) {
        console.log(error);
    }
}

function* activitionUserDataSaga() {
    yield takeLatest(actionTypes.SECURITY_FORGOT_PASSWORD_USER_REQUEST, activitionUserData);
}

function* validationTokenSaga() {
    yield takeLatest(actionTypes.SECURITY_FORGOT_PASSWORD_ISVAILTOEKN, validationToken);
}

export default function* root() {
    yield [fork(activitionUserDataSaga), fork(validationTokenSaga)];
}
