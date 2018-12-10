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
 * Created by Krishalee on 16/11/18.
 */
import * as actionTypes from "./actionTypes";

export const getConfigsFromSysconfig = data => {
    return {
        type: actionTypes.TOPOIMPORT_CONFIGS_FROM_SYSCONFIG,
        data
    };
};

export const getConfigSuccess = data => {
    return {
        data,
        type: actionTypes.TOPOIMPORT_CONFIGS_FROM_SYSCONFIG_SUCCESS
    };
};

export const getFileHistory = postData => {
    return {
        postData,
        type: actionTypes.TOPOIMPORT_GET_FILE_HISTORY
    };
};

export const getFileHistorySuccess = data => {
    return {
        data,
        type: actionTypes.TOPOIMPORT_GET_FILE_HISTORY_SUCCESS
    };
};

export const deviceImportRequest = (file, uploadtype, postData) => {
    return {
        file,
        uploadtype,
        postData,
        type: actionTypes.TOPOIMPORT_BULK_DEVICE_IMPORT
    };
};

export const deviceImportSuccess = data => {
    return {
        type: actionTypes.TOPOIMPORT_BULK_DEVICE_IMPORT_SUCCESS,
        data: data
    };
};

export const deviceImportFail = data => {
    return {
        type: actionTypes.TOPOIMPORT_BULK_DEVICE_IMPORT_FAIL,
        data: data
    };
};
