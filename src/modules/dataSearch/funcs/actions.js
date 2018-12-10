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
 * Created by hl on 09/07/2018.
 */
import * as actionTypes from "./actionTypes";

//set export params
export const setExportParams = () => {
    return {
        type: actionTypes.SETEXPORTPARAMS,
    };
};

//set export params
export const getExportParams = (exportId) => {
    return {
        type: actionTypes.GETEXPORTPARAMS,
        exportId
    };
};


//get configName
export const configNames = (configvalname) => {
    return {
        type: actionTypes.DISPLAYNAME,
        configvalname: configvalname
    };
};

//set config name
export const requestName = (arr) => {
    return {
        type: actionTypes.REQUESTNAME,
        arr
    };
};

//set default table data
export const setDefaultTableData = (obj) => {
    return {
        type: actionTypes.SETDEFAULTDATA,
        obj,
        refreshSuccess: false
    };
};

//get default table data
export const getDefaultTableData = (defaultTableData) => {
    return {
        type: actionTypes.GETDEFAULTDATA,
        defaultTableData,
        refreshSuccess: true
    };
};


//get select val
export const selectVal = (arr) => {
    return {
        type: actionTypes.SELECTVAL,
        arr
    };
};

//set search request
export const requestSearch = (obj) => {
    return {
        type: actionTypes.GETSEARCHDATE,
        obj,
        refreshSuccess:false
    };
};



//set download
export const setDownload = (taskId) => {
    return {
        type: actionTypes.SETDOWNLOAD,
        taskId,
        refreshSuccess: false
    };
};

//get downloadUrl
export const getDownloadUrl = (jobResult, taskViewId) => {
    return {
        type: actionTypes.GETDOWNLOADURL,
        jobResult,
        taskViewId,
        refreshSuccess: true
    };
};

//set reflush
export const setReflush = (obj) => {
    return {
        type: actionTypes.SETREFLUSH,
        obj,
        refreshSuccess: false
    };
};

//get reflush
export const getReflush = (taskId, status, jobStatus) => {
    return {
        type: actionTypes.GETREFLUSH,
        taskId,
        status,
        jobStatus,
        refreshSuccess: true
    };
};

//set noselect
export const noSelect = (name) => {
    return {
        type: actionTypes.SETNOSELECT,
        name
    };
};





//get requestConfig
// export const requestConfig = () => {
//     return {
//         type: actionTypes.GETREQUESTCONFIG,
//         refreshSuccess: true
//     };
// };









