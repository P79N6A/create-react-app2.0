import * as actionTypes from "./actionTypes";

export const getLogList = searchData => ({
    searchData,
    type: actionTypes.LOGGER_GET_LOG_LIST_REQUEST
});

export const downLoadFile = filename => ({
    filename,
    type: actionTypes.LOGGER_DOWNLOAD_FILE
});

export const getModules = () => ({
    type: actionTypes.LOGGER_GET_MODULES_REQUEST
});

export const getModuleChild = modulename => ({
    modulename,
    type: actionTypes.LOGGER_GET_MODULES_CHILD_REQUEST
});

export const getLogListSuccess = (results, paginations) => ({
    results,
    paginations,
    type: actionTypes.LOGGER_GET_LOG_LIST_REQUEST_SUCCESS
});

export const getModulesSuccess = results => ({
    results,
    type: actionTypes.LOGGER_GET_MODULES_REQUEST_SUCCESS
});

export const getModuleChildSuccess = results => ({
    results,
    type: actionTypes.LOGGER_GET_MODULES_CHILD_REQUEST_SUCCESS
});

export const changeLoading = flag => ({
    flag,
    type: actionTypes.LOGGER_CHANGE_LOADING
});

export const reset = reset => ({
    reset,
    type: actionTypes.LOGGER_RESET
});

export const autoRefreshInit = (identify, timer) => ({
    type: actionTypes.AUTO_REFRESH_INIT,
    identify,
    timer
});

export const publishMSG = (topic, category, args, streamid) => ({
    type: actionTypes.PUBLISH_MESSAGE,
    topic,
    category,
    args,
    streamid
});

export const downLoadSuccess = content => ({
    content,
    type: actionTypes.LOGGER_DOWNLOAD_FILE_SUCCESS
});
