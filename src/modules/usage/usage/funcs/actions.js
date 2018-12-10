import * as actionTypes from "./actionTypes";

export const getDeviceCount = () => ({
    type: actionTypes.COUNT_DEVICE_REQUEST
});

export const getEventsCount = () => ({
    type: actionTypes.COUNT_EVENTS_REQUEST
});


export const getDeviceCountSuccess = (countDeviceData) => ({
    countDeviceData,
    type: actionTypes.COUNT_DEVICE_REQUEST_SUCCESS
});

export const getEventCountSuccess = (countEventsData) => ({
    countEventsData,
    type: actionTypes.COUNT_EVENTS_REQUEST_SUCCESS
});

export const getDeviceDataRequestSuccess = deviceData => ({
    deviceData,
    type: actionTypes.USAGE_METER_DEVICE_DETAIL
});

export const getAcountsList = () => ({
    type: actionTypes.USAGE_GET_ACOUNTS_DETAIL
    // type: actionTypes.USAGE_ACCOUNT_LIST_REQUEST
});

export const getAcountsSuccess = (accountsData) => ({
    accountsData,
    type: actionTypes.USAGE_GET_ACCOUNTS_SUCCESS
});

export const passAccountID = (passedAccountVal) => {
    return {
        type: actionTypes.PASSED_ACCOUNT_ID_TO_OTHER_COMP,
        passedAccountVal
    };
};