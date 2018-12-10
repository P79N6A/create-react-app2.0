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
export const getResourcePath = (searchData = {}, flag) => ({
    searchData,
    flag,
    type: actionTypes.SECURITY_RESOURCEPATH_GET_REQUEST
});

export const coverApplications = results => ({
    results,
    type: actionTypes.SECURITY_RESOURCEPATH_COVER_APPLICATION
});

export const getResourcePathSuccess = (resourcePathList, pagination, flag) => ({
    resourcePathList,
    pagination,
    flag,
    type: actionTypes.SECURITY_RESOURCEPATH_GET_REQUEST_SUCCESS
});

export const addResourcePath = (...resourcePathInfo) => ({
    ...resourcePathInfo,
    type: actionTypes.SECURITY_RESOURCEPATH_POST_REQUEST
});

export const addResourcePathSuccess = () => ({
    type: actionTypes.SECURITY_RESOURCEPATH_POST_REQUEST
});

export const updateResourcePath = (...resourcePathInfo) => ({
    ...resourcePathInfo,
    type: actionTypes.SECURITY_RESOURCEPATH_PUT_REQUEST
});

export const updateResourcePathSuccess = () => ({
    type: actionTypes.SECURITY_RESOURCEPATH_PUT_REQUEST_SUCCESS
});

export const deleteResourcePath = resourcePathID => ({
    resourcePathID,
    type: actionTypes.SECURITY_RESOURCEPATH_DELETE_REQUEST
});

export const deleteResourcePathSuccess = () => ({
    type: actionTypes.SECURITY_RESOURCEPATH_DELETE_REQUEST_SUCCESS
});

export const selectResourcePath = resourcePathData => ({
    resourcePathData,
    type: actionTypes.SECURITY_RESOURCEPATH_SELECT
});

export const reset = reset => ({
    reset,
    type: actionTypes.SECURITY_RESOURCEPATH_RESET
});

export const fail = () => ({
    type: actionTypes.SECURITY_RESOURCEPATH_REQUEST_FAIL
});

export const radioSelected = radioSelected => ({
    radioSelected,
    type: actionTypes.SECURITY_RESOURCEPATH_RADIO
});
