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
    type: actionTypes.SECURITY_LOADING
});

export const getGroup = (searchData = {}, flag) => ({
    searchData,
    flag,
    type: actionTypes.SECURITY_GROUP_GET_REQUEST
});

export const getGroupFromId = grpid => ({
    grpid,
    type: actionTypes.SECURITY_GROUP_FROMID_REQUEST
});
export const getGroupFromIdSuccess = group => ({
    group,
    type: actionTypes.SECURITY_GROUP_FROMID_REQUEST_SUCCESS
});

export const getGroupSuccess = (groupList, pagination) => ({
    groupList,
    pagination,
    type: actionTypes.SECURITY_GROUP_GET_REQUEST_SUCCESS
});

export const addGroup = (group, searchData) => ({
    group,
    searchData,
    type: actionTypes.SECURITY_GROUP_POST_REQUEST
});

// export const addGroupSuccess = () => ({
//     type: actionTypes.SECURITY_GROUP_POST_REQUEST
// });

export const updateGroup = (group, searchData) => ({
    group,
    searchData,
    type: actionTypes.SECURITY_GROUP_PUT_REQUEST
});

export const updateGroupSuccess = () => ({
    type: actionTypes.SECURITY_GROUP_PUT_REQUEST_SUCCESS
});

export const deleteGroup = (groupID,searchData) => ({
    groupID,
    searchData,
    type: actionTypes.SECURITY_GROUP_DELETE_REQUEST
});

export const deleteGroupSuccess = () => ({
    type: actionTypes.SECURITY_GROUP_DELETE_REQUEST_SUCCESS
});

export const selectGroup = groupData => ({
    groupData,
    type: actionTypes.SECURITY_GROUP_SELECT
});

export const updateUsreGroup = (groupData, groupSearchData, userSearchData) => ({
    groupData,
    userSearchData,
    groupSearchData,
    type: actionTypes.SECURITY_UPDATE_USER_GROUP
});

export const reset = reset => ({
    reset,
    type: actionTypes.SECURITY_GROUP_RESET
});

export const removeDeleteUser = (grpid, userid) => ({
    grpid,
    userid,
    type: actionTypes.SECURITY_GROUP_RESET_TEMP
});

export const visualizations = visualizations => ({
    visualizations,
    type: actionTypes.SECURITY_GROUP_VISIABLE
});

export const getUserFromGrpId = userSearchData => ({
    userSearchData,
    type: actionTypes.SECURITY_GROUP_USER_GRPID_REQUEST
});

export const getUserFromGrpIdSuccess = (result,userPagination) => ({
    result,
    userPagination,
    type: actionTypes.SECURITY_GROUP_USER_GRPID_SUCCESS
});

export const getApplicationFromGrpId = searchData => ({
    searchData,
    type: actionTypes.SECURITY_GROUP_APPLICATION_GRPID_REQUEST
});

export const getApplicationFromGrpIdSuccess = (result, pagination) => ({
    result,
    pagination,
    type: actionTypes.SECURITY_GROUP_APPLICATION_GRPID_SUCCESS
});

export const applicationidFunc = applicationidArr => ({
    applicationidArr,
    type: actionTypes.SECURITY_GROUP_APPLICATIONS
});
