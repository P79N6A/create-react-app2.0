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
 * Created by wplei on 25/05/18.
 */
import * as actionTypes from "./actionTypes";

// ! NEW ACTION START
export const showModal = (open, options) => {
    return {
        type: actionTypes.CCMS_TOGGLE_MODAL,
        open,
        options
    };
};

export const toggleEditMode = state => {
    return {
        type: actionTypes.CCMS_TOGGLE_EDIT_MODE,
        editMode: state
    };
};

export const requestPage = (pageKey, options) => {
    return {
        type: actionTypes.CCMS_REQUEST_PAGE,
        pageKey,
        options
    };
};

export const transformPage = pageConfig => {
    return {
        type: actionTypes.CCMS_TRANSFORM_PAGE,
        pageConfig
    };
};

export const requestDefaultWidgets = () => {
    return {
        type: actionTypes.CCMS_REQUEST_DEFAULT_COMPONENT
    };
};

export const transformDefaultWidgets = widgets => {
    return {
        type: actionTypes.CCMS_TRANSFORM_DEFAULT_COMPONENT,
        widgets
    };
};

export const requestPageUpdate = (pageConfig, blob) => {
    return {
        type: actionTypes.CCMS_REQUEST_UPDATE_PAGE,
        pageConfig,
        media: blob
    };
};

export const getApplications = () => {
    return {
        type: actionTypes.CCMS_REQUEST_APPLICATIONS
    };
};

export const transformApplications = (applications, role) => {
    return {
        type: actionTypes.CCMS_TRANSFORM_APPLICATIONS,
        applications,
        group: role
    };
};

export const transformResourceInformation = infos => {
    return {
        type: actionTypes.CCMS_TRANSFORM_RESOURCE_INFO,
        infos
    };
};

export const deleteResource = resourceId => {
    return {
        type: actionTypes.CCMS_DELETE_RESOURCE,
        resourceId
    };
};

export const exportCSVAction = (exportWidgets, exportTime) => {
    return {
        type: actionTypes.CCMS_WIDGETS_BOARD_EXPORT_WIDGETS,
        exportWidgets,
        exportTime
    };
};

export const saveTemplate = templateData => {
    return {
        type: actionTypes.CCMS_WIDGETS_BOARD_SAVE_TEMPLATE,
        templateData
    };
};

export const updateAppAssociate = params => {
    return {
        type: actionTypes.CCMS_UPDATE_APP_ASSOCIATE,
        params
    };
};

export const cleanTokenForPage = pageKey => {
    return {
        type: actionTypes.CCMS_CLEAN_CCMS_LOCK,
        pageKey
    };
};

export const CCMS_TRANSFORM_PAGE_KEY = pageKey => {
    return {
        type: actionTypes.CCMS_TRANSFORM_PAGE_KEY,
        pageKey
    };
};

export const getCustomizedDashboards = appid => {
    return {
        type: actionTypes.CCMS_REQUEST_CUSTOMIZED_DASHBOARD,
        payload: {
            appid
        }
    };
};

export const getCustomizedDashboardsSuccess = customizedDashboards => {
    return {
        type: actionTypes.CCMS_GET_CUSTOMIZE_DASHBOARD,
        payload: {
            customizedDashboards
        }
    };
};

export const getCustomizedDashboardKey = customizedDashboardKey => {
    return {
        type: actionTypes.CCMS_GET_CUSTOMIZE_DASHBOARD_KEY,
        payload: {
            customizedDashboardKey
        }
    };
};
