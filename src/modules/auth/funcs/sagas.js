import { put, call, takeLatest, fork, throttle } from "redux-saga/effects";
import { I18n } from "react-i18nify";
import {
    LOGIN_REQUEST,
    LOGOUT_REQUEST,
    IS_TOKEN_VALID_REQUEST,
    KEEP_ALIVE_REQUEST,
    LOGIN_ACCOUNT_REQUEST,
    CHANGE_PASSWORD_REQUEST,
    FORGOT_PASSWORD_REQUST,
    FORGOT_PASSWORD_GET_SECURITY_CODE_REQUST
} from "./actionTypes";
import * as message from "modules/messageCenter/funcs/actions";
import { changePassword } from "api/security";
import * as actions from "./actions";
import { actions as ThemeActions } from "modules/theme/index";
import { actions as msg } from "modules/messageCenter";
import { ISC_ACCOUNT_INFO } from "commons/constants/const";
import {
    login,
    keepAlive,
    logout,
    isTokenValid,
    getAccountData,
    forgotPassword as forgotPasswordAPI,
    getVerificationCode as getVerificationCodeAPI
} from "api/identify";
import { getAccountItem } from "api/account";
import tokenHelper from "commons/utils/tokenHelper";
import userHelper from "commons/utils/userHelper";
import { getFile } from "api/security";
import encode16Bit from "commons/utils/encode16bit";
const moduleName = "Login - Security";
const moduleNameSub = "Change Password";
function* callLogin({ userName, password, accountId }) {
    try {
        const result = yield call(login, userName, password, accountId);
        // localStorage.setItem("ISC-Account", accountId);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                if (result.authorities && result.authorities instanceof Array && result.authorities.length > 0) {
                    let auth = result.authorities[0];
                    if (auth.user && auth.user.userinfo && auth.user.userinfo.security) {
                        let identify = auth.user.userinfo.security;
                        let permissions = new Set();
                        // identify.permissions = new Set();
                        identify.isValid = auth.token.isvalid;
                        identify.logincondition = auth.token.logincondition || null;
                        for (var key in identify.isc_web_function_permissions) {
                            if (identify.isc_web_function_permissions[key]) {
                                permissions.add(key);
                            }
                        }
                        identify.permissions = Array.from(permissions);
                        identify.username = auth.user.name;
                        //login successed
                        delete identify.isc_web_function_permissions;
                        tokenHelper.set(identify.tokenid);
                        let accountid = auth.user.userinfo.security.accountid;
                        const accountRes = yield call(getAccountItem, accountid);
                        let accountinfo = {};
                        if (accountRes && accountRes.status && accountRes.status.code === "00000000") {
                            accountinfo = accountRes.accounts.length ? accountRes.accounts[0] : {};
                            yield put(ThemeActions.reset({ uitheme: accountinfo.uitheme }));
                        }
                        identify.accountinfo = accountinfo;
                        // if (accountinfo.logo) {
                        //     let getLogoRst = yield call(
                        //         getFile,
                        //         accountinfo.logo + encode16Bit.ascii2hex(identify.tokenid)
                        //     );
                        //     if (getLogoRst && getLogoRst.length) {
                        //         const urlCreator = window.URL || window.webkitURL;
                        //         let url =
                        //             getLogoRst && getLogoRst[0] ? urlCreator.createObjectURL(getLogoRst[0]) : undefined;
                        //         identify.accountinfo.logopic = url;
                        //     }
                        // }
                        sessionStorage.setItem(ISC_ACCOUNT_INFO, JSON.stringify(accountinfo || {}));
                        userHelper.set(JSON.stringify(identify));
                        // localStorage.setItem("currentUser", JSON.stringify(auth));
                        // sessionStorage.setItem("currentUser", JSON.stringify(auth));
                        yield put(actions.loginSuccess());
                        yield put(actions.createIdentify(identify));
                        if (result.status.message.toLowerCase() !== "success") {
                            yield put(msg.warn(result.status.message, moduleName));
                        }
                    } else {
                        yield put(actions.loginFailure());
                        yield put(msg.warn("cannot get user identify!", moduleName));
                        throw new Error("cannot get user identify!");
                    }
                } else {
                    yield put(actions.loginFailure());
                    yield put(msg.warn("something wrong!", moduleName));
                    throw new Error("something wrong!");
                }
            } else {
                yield put(actions.loginFailure());
                yield put(msg.warn(result.status.message, moduleName));
            }
        } else {
            yield put(actions.loginFailure());
            throw new Error(I18n.t("login.loginUnknowError"));
        }
    } catch (e) {
        yield put(actions.loginFailure());
        console.log(e.message);
        yield put(msg.warn(e.message, moduleName));
        yield put(actions.updateIdentify(false));
    }
}

function* callLogout(obj) {
    try {
        const result = yield call(logout, obj.token);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                yield put(actions.logoutSuccess());
                yield put(actions.updateIdentify(false));
                tokenHelper.remove();
                userHelper.remove();
                sessionStorage.removeItem("ISC-APPLICATION-ID");
                sessionStorage.removeItem("ISC-APPLICATION-INFO");
            } else {
                yield put(actions.updateIdentify(false));
                throw new Error(result.status.message);
            }
        } else {
            throw new Error(I18n.t("login.logoutUnknowError"));
        }
    } catch (e) {
        yield put(actions.logoutFailure());
        yield put(msg.error(e.message, moduleName));
        // yield put(actions.updateIdentify(false));
    }
}

function* callIsTokenValid() {
    try {
        const result = yield call(isTokenValid);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                yield put(actions.updateIdentify(true));
            } else {
                throw new Error(result.status.message);
            }
        } else {
            throw new Error(I18n.t("login.invalidTokenUnknowError"));
        }
    } catch (e) {
        yield put(actions.updateIdentify(false));
        yield put(msg.error(e.message, moduleName));
    }
}

function* callKeepAlive() {
    try {
        const result = yield call(keepAlive);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                yield put(actions.updateIdentify(true));
            } else {
                throw new Error(result.status.message);
            }
        } else {
            throw new Error(I18n.t("login.keepAliveUnkonwError"));
        }
    } catch (e) {
        yield put(actions.updateIdentify(false));
        yield put(msg.error(e.message, moduleName));
    }
}
function* loginAccountInfo() {
    try {
        const result = yield call(getAccountData);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                let data = result.accounts;
                yield put(actions.loginAccountSuccess(data));
            } else {
                throw new Error(result.status.message);
            }
        } else {
            throw new Error("unkown error!");
        }
    } catch (e) {
        yield put(msg.error(e.message, moduleName));
    }
}
function* changePasswordData({ data }) {
    try {
        const result = yield call(changePassword, data);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                yield put(
                    actions.reset({ isOpenPassword: false, isLoading: false, isValid: false, isChangePassword: true })
                );
                yield put(actions.logoutRequest(tokenHelper.get()));
                yield put(message.success(I18n.t("changePassword.changePasswordSuccess"), moduleNameSub));
            } else {
                yield put(actions.reset({ isLoading: false }));
                throw new Error(result.status.message);
            }
        } else {
            throw new Error(I18n.t("login.changePasswordUnknowError"));
        }
    } catch (e) {
        yield put(message.error(e.message, moduleName));
    }
}

function* forgotPassword({ email, code, captchaToken }) {
    try {
        const result = yield call(forgotPasswordAPI, email, code, captchaToken);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                yield put(actions.reset({ isCodeValidatePass: true }));
                // yield put(message.success(result.status.message, moduleName));
            } else {
                yield put(actions.getVerificationCode());
                yield put(actions.reset({ isCodeValidatePass: false }));
                throw new Error(result.status.message || I18n.t("login.resetPasswordUnknowError"));
            }
        } else {
            throw new Error(I18n.t("login.resetPasswordUnknowError"));
        }
    } catch (e) {
        yield put(message.warn(e.message, moduleName));
    }
}

function* getVerificationCode() {
    try {
        const result = yield call(getVerificationCodeAPI);
        if (result.length) {
            yield put(actions.reset({ verificationCode: result }));
        }
    } catch (e) {
        yield put(message.warn(e.message, moduleName));
    }
}
function* loginSaga() {
    yield takeLatest(LOGIN_REQUEST, callLogin);
}

function* logoutSaga() {
    yield takeLatest(LOGOUT_REQUEST, callLogout);
}

function* isTokenValidSaga() {
    yield takeLatest(IS_TOKEN_VALID_REQUEST, callIsTokenValid);
}

function* keepAliveSaga() {
    yield takeLatest(KEEP_ALIVE_REQUEST, callKeepAlive);
}

function* loginAccount() {
    yield throttle(10000, LOGIN_ACCOUNT_REQUEST, loginAccountInfo);
}
function* changePasswordDataSaga() {
    yield takeLatest(CHANGE_PASSWORD_REQUEST, changePasswordData);
}
function* forgotPasswordSaga() {
    yield takeLatest(FORGOT_PASSWORD_REQUST, forgotPassword);
}
function* getVerificationCodeSaga() {
    yield takeLatest(FORGOT_PASSWORD_GET_SECURITY_CODE_REQUST, getVerificationCode);
}
export default function* root() {
    yield [
        fork(loginSaga),
        fork(logoutSaga),
        fork(isTokenValidSaga),
        fork(keepAliveSaga),
        fork(loginAccount),
        fork(changePasswordDataSaga),
        fork(forgotPasswordSaga),
        fork(getVerificationCodeSaga)
    ];
}
