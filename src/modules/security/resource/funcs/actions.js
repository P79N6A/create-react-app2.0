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
export const getResource = (searchData = {}, grpid, flag) => ({
    searchData,
    grpid,
    flag,
    type: actionTypes.SECURITY_RESOURCE_GET_REQUEST
});

export const getResourceSuccess = (resourceList, pagination) => ({
    resourceList,
    pagination,
    type: actionTypes.SECURITY_RESOURCE_GET_REQUEST_SUCCESS
});

export const addResource = (...resourceInfo) => ({
    ...resourceInfo,
    type: actionTypes.SECURITY_RESOURCE_POST_REQUEST
});

export const addResourceSuccess = () => ({
    type: actionTypes.SECURITY_RESOURCE_POST_REQUEST
});

export const updateResource = (...resourceInfo) => ({
    ...resourceInfo,
    type: actionTypes.SECURITY_RESOURCE_PUT_REQUEST
});

export const updateResourceSuccess = () => ({
    type: actionTypes.SECURITY_RESOURCE_PUT_REQUEST_SUCCESS
});

export const deleteResource = resourceID => ({
    resourceID,
    type: actionTypes.SECURITY_RESOURCE_DELETE_REQUEST
});

export const deleteResourceSuccess = () => ({
    type: actionTypes.SECURITY_RESOURCE_DELETE_REQUEST_SUCCESS
});

export const selectResource = resourceData => ({
    resourceData,
    type: actionTypes.SECURITY_RESOURCE_SELECT
});

export const reset = reset => ({
    reset,
    type: actionTypes.SECURITY_RESOURCE_RESET
});

export const getGrpIdResource = (searchData = {}, grpid) => ({
    searchData,
    grpid,
    type: actionTypes.SECURITY_RESOURCE_GRPID_REQUEST
});

export const getGrpIdResourceSuccess = (resourceList, pagination) => ({
    resourceList,
    pagination,
    type: actionTypes.SECURITY_RESOURCE_GRPID_REQUEST_SUCCESS
});
