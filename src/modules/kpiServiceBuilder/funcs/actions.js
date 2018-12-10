import {
    SAVE_KPI_REQUEST,
    SAVE_KPI_SUCCESS,
    SAVE_KPI_FAILURE,
    KPI_PREVIEW_REQUEST,
    KPI_PREVIEW_SUCCESS,
    KPI_PREVIEW_FAILURE,
    KPI_GET_DBLIST_REQUEST,
    KPI_GET_DBLIST_SUCCESS,
    KPI_GET_DBLIST_FAILURE,
    GET_KPI_LIST_REQUEST,
    GET_KPI_LIST_SUCCESS,
    GET_KPI_LIST_FAILURE,
    CHANGE_PROPERTY
} from "./actionTypes";

export const changeProperty = (identify, parameterName, value) => ({
    type: CHANGE_PROPERTY,
    identify,
    parameterName,
    value
});

export const saveKpiRequest = (identify, serviceId, modifiedby, kpiType, format, queryScript) => ({
    type: SAVE_KPI_REQUEST,
    identify,
    serviceId,
    modifiedby,
    kpiType,
    format,
    queryScript
});
export const saveKpiSuccess = (identify, message) => ({
    type: SAVE_KPI_SUCCESS,
    identify,
    message
});

export const saveKpiFailure = (identify, message) => ({ type: SAVE_KPI_FAILURE, identify, message });

//servicelist
export const getServiceListRequest = identify => ({
    type: GET_KPI_LIST_REQUEST,
    identify
});
export const getServiceListSuccess = (identify, serviceList) => ({
    type: GET_KPI_LIST_SUCCESS,
    identify,
    serviceList
});

export const getServiceListFailure = identify => ({ type: GET_KPI_LIST_FAILURE, identify });

//preview
export const getPreviewRequest = (identify, dbtype, format, queryScript) => ({
    type: KPI_PREVIEW_REQUEST,
    identify,
    dbtype,
    format,
    queryScript
});
export const getPreviewSuccess = (identify, recordset, keyList) => ({
    type: KPI_PREVIEW_SUCCESS,
    identify,
    recordset,
    keyList
});

export const getPreviewFailure = identify => ({ type: KPI_PREVIEW_FAILURE, identify });

export const getDblistRequest = identify => ({
    type: KPI_GET_DBLIST_REQUEST,
    identify
});

//dblist
export const getDblistSuccess = (identify, payload) => ({
    type: KPI_GET_DBLIST_SUCCESS,
    payload,
    identify
});

export const getDblistFailure = identify => ({ type: KPI_GET_DBLIST_FAILURE, identify });
