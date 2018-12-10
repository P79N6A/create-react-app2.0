import * as actionTypes from "./actionTypes";

export const getAcountList = searchData => ({
    searchData,
    type: actionTypes.ACCOUNT_LIST_REQUEST
});

export const getAcountListSuccess = (payload, paginations) => ({
    payload,
    paginations,
    type: actionTypes.ACCOUNT_LIST_REQUEST_SUCCESS
});

export const reset = reset => ({
    reset,
    type: actionTypes.ACCOUNT_RESET
});

export const getAccountFromID = accountid => ({
    accountid,
    type: actionTypes.ACCOUNT_ITEM_REQUEST
});
export const getAccountFromIDSuccess = account => ({
    account,
    type: actionTypes.ACCOUNT_ITEM_REQUEST_SUCCESS
});

export const saveAccount = (accountData, searchData, groupData, fileObj) => ({
    accountData,
    groupData,
    searchData,
    fileObj,
    type: actionTypes.ACCOUNT_SAVE_REQUEST
});

export const updateAccount = (accountData, searchData, groupData, fileObj) => ({
    accountData,
    searchData,
    groupData,
    fileObj,
    type: actionTypes.ACCOUNT_UPDATE_REQUEST
});

export const deleteAccount = (accountids, searchData) => ({
    accountids,
    searchData,
    type: actionTypes.ACCOUNT_DELETE_REQUEST
});

export const saveUrlToSys = (postdata, tenantname) => {
    return {
        type: actionTypes.ACCOUNT_SAVE_URL_TO_SYS,
        postdata,
        tenantname
    };
};

export const updateUrlInSys = (postdata, tenantname) => {
    return {
        type: actionTypes.ACCOUNT_UPDATE_URL_IN_SYS,
        postdata,
        tenantname
    };
};

export const getUrlsFromMaster = () => {
    return {
        type: actionTypes.ACCOUNT_URL_REQUEST
    };
};

export const getAccountGroupList = (searchData, flag) => ({
    searchData,
    flag,
    type: actionTypes.ACCOUNT_GROUP_REQUEST
});
export const getAccountGroupListSuccess = (accountGroupData, pagination, flag) => ({
    accountGroupData,
    pagination,
    flag,
    type: actionTypes.ACCOUNT_GROUP_REQUEST_SUCCESS
});

export const saveAccountGroup = accountGroups => ({
    accountGroups,
    type: actionTypes.ACCOUNT_GROUP_SAVE_REQUEST
});


export const getLogo = mediaFileId => ({
    mediaFileId,
    type: actionTypes.ACCOUNT_GET_LOGO_REQUEST
});

export const getLogoSuccess = logo => ({
    logo,
    type: actionTypes.ACCOUNT_GET_LOGO_REQUEST_SUCCESS
});