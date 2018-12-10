import * as actionTypes from "./actionTypes";

export const activitionUser = postData => ({
    postData,
    type: actionTypes.SECURITY_ACTIVITION_USER_REQUEST
});

export const reset = reset => ({
    reset,
    type: actionTypes.SECURITY_ACTIVITION_RESET
});

export const validationToken = token => ({
    token,
    type: actionTypes.SECURITY_ACTIVITION_ISVAILTOEKN
});
