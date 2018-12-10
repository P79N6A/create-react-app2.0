import * as actionTypes from "./actionTypes";

export const changeHeaderTitle = headerTitle => {
    return {
        type: actionTypes.BASE_HEADER_TITLE,
        title: headerTitle
    };
};

export const getUserHeader = mediaFileId => {
    return {
        type: actionTypes.BASE_HEADER_USER_GET_AVATOR_REQUEST,
        mediaFileId
    };
};

export const getUserHeaderSuccess = media => {
    return {
        type: actionTypes.BASE_HEADER_GET_AVATOR_REQUEST_SUCCESS,
        media
    };
};

export const getLogoHeader = mediaFileId => {
    return {
        type: actionTypes.BASE_HEADER_USER_GET_LOGO_REQUEST,
        mediaFileId
    };
};

export const getLogoSuccess = media => {
    return {
        type: actionTypes.BASE_HEADER_GET_LOGO_REQUEST_SUCCESS,
        media
    };
};

export const reset = reset => ({
    type: actionTypes.BASE_HEADER_RESET,
    reset
});
