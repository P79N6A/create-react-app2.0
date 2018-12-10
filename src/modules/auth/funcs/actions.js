import * as actions from "./actionTypes";
import { pendingTask, begin, end } from "react-redux-spinner";

// Login
export const loginRequest = (userName, password, accountId) => ({
    type: actions.LOGIN_REQUEST,
    userName,
    password,
    accountId,
    [pendingTask]: begin
});

export const loginSuccess = () => ({ type: actions.LOGIN_SUCCESS, [pendingTask]: end });

export const loginFailure = () => ({ type: actions.LOGIN_FAILURE, [pendingTask]: end });

// Logout
export const logoutRequest = token => ({ type: actions.LOGOUT_REQUEST, token, [pendingTask]: begin });

export const logoutSuccess = () => ({ type: actions.LOGOUT_SUCCESS, [pendingTask]: end });

export const logoutFailure = () => ({ type: actions.LOGOUT_FAILURE, [pendingTask]: end });

// IsTokenValid
export const isTokenValidRequest = () => ({ type: actions.IS_TOKEN_VALID_REQUEST });

// export const isTokenValidSuccess = (payload) => ({type: actions.IS_TOKEN_VALID_SUCCESS, payload});

// export const isTokenValidFailure = (payload) => ({type: actions.IS_TOKEN_VALID_FAILURE, payload});

// KeepAlive
export const keepAliveRequest = () => ({ type: actions.KEEP_ALIVE_REQUEST });

// export const keepAliveSuccess = (payload) => ({type: actions.IS_TOKEN_VALID_SUCCESS, payload});

// export const keepAliveFailure = (payload) => ({type: actions.IS_TOKEN_VALID_FAILURE, payload});

export const createIdentify = payload => ({ type: actions.CREATE_IDENTIFY, payload });

export const updateIdentify = payload => ({ type: actions.UPDATE_IDENTIFY, payload });

export const loginAccount = () => ({ type: actions.LOGIN_ACCOUNT_REQUEST });
export const loginAccountSuccess = payload => ({ type: actions.LOGIN_ACCOUNT_SUCCESS, payload });
export const loginGroup = group => ({ type: actions.LOGIN_GROUP, group });
export const forgotEvent = open => ({ type: actions.LOGIN_FORGOT, open });
export const ccmsControl = (identify, defaultFilterLists) => ({
    type: actions.LOGIN_CCMS_CONTROL,
    identify,
    defaultFilterLists
});

export const changePasswordRequest = data => ({
    type: actions.CHANGE_PASSWORD_REQUEST,
    data
});

export const changePasswordSuccess = data => ({
    type: actions.CHANGE_PASSWORD_REQUEST_SUCCESS,
    data
});

export const reset = reset => ({
    type: actions.LOGIN_RESET,
    reset
});

export const forgotPassword = (email, code, captchaToken) => ({
    email,
    code,
    captchaToken,
    type: actions.FORGOT_PASSWORD_REQUST
});

export const getVerificationCode = () => ({
    type: actions.FORGOT_PASSWORD_GET_SECURITY_CODE_REQUST
});

export const checkVerificationCode = (code, header) => ({
    code,
    header,
    type: actions.FORGOT_PASSWORD_VALIDATION_SECURITY_CODE_REQUST
});
