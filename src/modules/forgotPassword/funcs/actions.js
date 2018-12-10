import * as actionTypes from "./actionTypes";

export const resetPassword = postData => ({
    postData,
    type: actionTypes.SECURITY_FORGOT_PASSWORD_USER_REQUEST
});

export const reset = reset => ({
    reset,
    type: actionTypes.SECURITY_FORGOT_PASSWORD_RESET
});

export const validationToken = token => ({
    token,
    type: actionTypes.SECURITY_FORGOT_PASSWORD_ISVAILTOEKN
});
