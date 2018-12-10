/*
* =========================================================================
*  Copyright (C)2018 NCS Pte. Ltd. All Rights Reserved
*
*  This software is confidential and proprietary to NCS Pte. Ltd. You shall
*  use this software only in accordance with the terms of the license
*  agreement you entered into with NCS.  No aspect or part or all of this
*  software may be reproduced, modified or disclosed without full and
*  direct written authorisation from NCS.
*
*  NCS SUPPLIES THIS SOFTWARE ON AN "AS IS" BASIS. NCS MAKES NO
*  REPRESENTATIONS OR WARRANTIES, EITHER EXPRESSLY OR IMPLIEDLY, ABOUT THE
*  SUITABILITY OR NON-INFRINGEMENT OF THE SOFTWARE. NCS SHALL NOT BE LIABLE
*  FOR ANY LOSSES OR DAMAGES SUFFERED BY LICENSEE AS A RESULT OF USING,
*  MODIFYING OR DISTRIBUTING THIS SOFTWARE OR ITS DERIVATIVES.
*
*  =========================================================================
*/
/**
 * Created by Jia Luo on 27/07/2018.
 */
import * as actionTypes from "./actionTypes";

// export actions
export const changeLoading = loading => ({
    loading,
    type: actionTypes.SECURITY_USER_LOADING
});

export const getUser = searchData => ({
    searchData,
    type: actionTypes.SECURITY_USER_GET_REQUEST
});

export const getUserSuccess = (userList, pagination) => ({
    userList,
    pagination,
    type: actionTypes.SECURITY_USER_GET_REQUEST_SUCCESS
});

export const addUser = (userData, groupData, searchData, fileObj) => ({
    userData,
    groupData,
    searchData,
    fileObj,
    type: actionTypes.SECURITY_USER_POST_REQUEST
});

export const addUserSuccess = () => ({
    type: actionTypes.SECURITY_USER_POST_REQUEST
});

export const updateUser = (userData, groupData, searchData, fileObj) => ({
    userData,
    groupData,
    searchData,
    fileObj,
    type: actionTypes.SECURITY_USER_PUT_REQUEST
});

export const updateUserSuccess = () => ({
    type: actionTypes.SECURITY_USER_PUT_REQUEST_SUCCESS
});

export const deleteUser = (userID, searchData) => ({
    userID,
    searchData,
    type: actionTypes.SECURITY_USER_DELETE_REQUEST
});

export const deleteUserSuccess = () => ({
    type: actionTypes.SECURITY_USER_DELETE_REQUEST_SUCCESS
});

export const selectUser = userData => ({
    userData,
    type: actionTypes.SECURITY_USER_SELECT
});

export const combineSearchData = searchData => ({
    searchData,
    type: actionTypes.SECURITY_USER_SEARCHDATA
});

export const resetPassword = postData => ({
    postData,
    type: actionTypes.SECURITY_USER_RESET_PASSWORD
});

export const reset = reset => ({
    reset,
    type: actionTypes.SECURITY_USER_RESET
});

export const getGroup = (searchData, flag) => ({
    searchData,
    flag,
    type: actionTypes.SECURITY_USER_GET_GROUP_REQUEST
});

export const getGroupSuccess = (results, pagination, flag) => ({
    results,
    pagination,
    flag,
    type: actionTypes.SECURITY_USER_GET_GROUP_REQUEST_SUCCESS
});

export const getUserFromId = userid => ({
    userid,
    type: actionTypes.SECURITY_USER_GET_FROM_ID_REQUEST
});

export const getUserFromIdSuccess = userData => ({
    userData,
    type: actionTypes.SECURITY_USER_GET_FROM_ID_REQUEST_SUCCESS
});

export const getAvator = mediaFileId => ({
    mediaFileId,
    type: actionTypes.SECURITY_USER_GET_AVATOR_REQUEST
});

export const getAvatorSuccess = avator => ({
    avator,
    type: actionTypes.SECURITY_USER_GET_AVATOR_REQUEST_SUCCESS
});


export const sendEmailToUser = userid => ({
    userid,
    type: actionTypes.SECURITY_USER_POST_SEND_EMAIL
})