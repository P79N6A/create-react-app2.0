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
export const getRole = (searchData={}, flag) => ({
    searchData,
    flag,
    type: actionTypes.SECURITY_ROLE_GET_REQUEST
});

export const getRoleSuccess = roleList => ({
    roleList,
    type: actionTypes.SECURITY_ROLE_GET_REQUEST_SUCCESS
});

export const addRole = (...roleInfo) => ({
    ...roleInfo,
    type: actionTypes.SECURITY_ROLE_POST_REQUEST
});

export const addRoleSuccess = () => ({
    type: actionTypes.SECURITY_ROLE_POST_REQUEST
});

export const updateRole = (...roleInfo) => ({
    ...roleInfo,
    type: actionTypes.SECURITY_ROLE_PUT_REQUEST
});

export const updateRoleSuccess = () => ({
    type: actionTypes.SECURITY_ROLE_PUT_REQUEST_SUCCESS
});

export const deleteRole = roleID => ({
    roleID,
    type: actionTypes.SECURITY_ROLE_DELETE_REQUEST
});

export const deleteRoleSuccess = () => ({
    type: actionTypes.SECURITY_ROLE_DELETE_REQUEST_SUCCESS
});

export const selectRole = roleData => ({
    roleData,
    type: actionTypes.SECURITY_ROLE_SELECT
});
