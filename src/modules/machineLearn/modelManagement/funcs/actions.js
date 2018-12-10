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

//set open dialog
export const setOpenDialog = (open, identify) => {
    return {
        type: actionTypes.SETOPENDIALOG,
        open,
        identify
    };
};

//set applicationId
export const setApplicationId = (appid, identify) => {
    return {
        type: actionTypes.SETAPPLICATIONID,
        appid,
        identify
    };
};


//set open delete dialog
export const setDeleteDialog = (open, identify) => {
    return {
        type: actionTypes.SETDELETEDIALOG,
        open,
        identify
    };
};

//set open management
export const setOpenDrawer = (isOpenDrawer, identify) => {
    return {
        type: actionTypes.SETOPENDRAWER,
        isOpenDrawer,
        identify
    };
};

//set refresh table
export const setReFreshModel = (page, rowsPerpage, orderBy, order, identify) => {
    return {
        type: actionTypes.SETREFRESHMODEL,
        page,
        rowsPerpage,
        orderBy,
        order,
        refreshSuccess: false,
        identify
    };
};

//set refresh table
export const getReFreshModel = (modelTable, pagination, identify) => {
    return {
        type: actionTypes.GETREFRESHMODEL,
        modelTable,
        pagination,
        refreshSuccess: true,
        identify
    };
};

//set setCommonDisplayInfo
export const setCommonDisplayInfo = (commonId, identify) => {
    return {
        type: actionTypes.SETCOMMONDISPLAYINFO,
        commonId,
        refreshCommonSuccess: false,
        identify
    };
};

//get setCommonDisplayInfo
export const getCommonDisplayInfo = (commonDisplayInfo, identify) => {
    return {
        type: actionTypes.GETCOMMONDISPLAYINFO,
        commonDisplayInfo,
        refreshCommonSuccess: true,
        identify
    };
};

//set delete model
export const setDeleteModel = (modelId, identify) => {
    return {
        type: actionTypes.SETDELETEMODEL,
        modelId,
        refreshSuccess: false,
        identify
    };
};

//set device basic type
export const setDeviceBasicType = (sitename, identify) => {
    return {
        type: actionTypes.SETDEVICEBASICTYPE,
        sitename,
        identify
    };
};

//get device basic type
export const getDeviceBasicType = (deviceBasicType, identify) => {
    return {
        type: actionTypes.GETDEVICEBASICTYPE,
        deviceBasicType,
        identify
    };
};

//set model info
export const setModelInfo = (modelId, identify) => {
    return {
        type: actionTypes.SETMODELINFO,
        modelId,
        refreshCommonInfoSuccess: false,
        modelIdInfo: {},
        identify
    };
};

//get model info
export const getModelInfo = (modelIdInfo, identify) => {
    return {
        type: actionTypes.GETMODELINFO,
        modelIdInfo,
        refreshCommonInfoSuccess: true,
        identify
    };
};

//set create model
export const setCreateModel = (
    modelName,
    description,
    modelType,
    fileSwagger,
    venderName,
    deviceTypeName,
    outputParameters,
    appid,
    basicTypeInstances,
    additionalProperty,
    deviceProperty,
    sitename,
    userid,
    identify
) => {
    return {
        type: actionTypes.SETCREATEMODEL,
        modelName,
        description,
        modelType,
        fileSwagger,
        venderName,
        deviceTypeName,
        outputParameters,
        appid,
        basicTypeInstances,
        additionalProperty,
        deviceProperty,
        sitename,
        userid,
        refreshSuccess: false,
        identify
    };
};

//set update model
export const setUpdateModel = (modelId, modelName, description, modelType, fileSwagger, identify) => {
    return {
        type: actionTypes.SETUPDATEMODEL,
        modelId,
        modelName,
        description,
        modelType,
        fileSwagger,
        identify
    };
};
