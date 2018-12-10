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

export const toggleAllModalState = (modalFlag, status) => {
    return {
        type: actionTypes.CCMS_DAHSBOARD_MODAL_STATUS_CONTROL,
        modal: modalFlag,
        status
    };
};

export const toggleEditMode = editMode => {
    return {
        type: actionTypes.CCMS_WIDGETS_BOARD_TOGGLE_EDIT_MODE,
        editMode
    };
};

export const previewElementSwitch = element => {
    return {
        type: actionTypes.CCMS_WIDGETS_BOARD_PREVIEW_CENTRE_ELEMENT_SWITCH,
        element
    };
};

export const requestPageConfig = (pageKey, page) => {
    return {
        type: actionTypes.CCMS_WIDGETS_BOARD_PAGECONFIG_REQUEST,
        pageKey,
        page
    };
};

export const passPageConfig = config => {
    return {
        type: actionTypes.CCMS_WIDGETS_BOARD_PAGECONFIG_REQUEST_RESULT,
        pageConfig: config
    };
};

export const updatePageConfig = (config, mediaBlob) => {
    return {
        type: actionTypes.CCMS_WIDGETS_BOARD_UPDATE_PAGECONFIG_REQUEST,
        pageConfig: config,
        media: mediaBlob
    };
};

export const updateReducerPageConfig = config => {
    return {
        type: actionTypes.CCMS_WIDGETS_BOARD_UPDATE_REDUCER_PAGECONFIG,
        pageConfig: config
    };
};

export const requestAllDefaultComponent = () => {
    return {
        type: actionTypes.CCMS_WIDGETS_BOARD_REQUEST_ALL_DEFAULT_COMPONENT
    };
};

export const passDefaultComponentToLocal = datas => {
    return {
        type: actionTypes.CCMS_WIDGETS_BOARD_TRANSMIT_DEFAULT_COMPONENTS,
        comps: datas
    };
};

export const saveTemplate = templateData => {
    return {
        type: actionTypes.CCMS_WIDGETS_BOARD_SAVE_TEMPLATE,
        templateData
    };
};

export const exportCSVAction = (exportWidgets, exportTime) => {
    return {
        type: actionTypes.CCMS_WIDGETS_BOARD_EXPORT_WIDGETS,
        exportWidgets,
        exportTime
    };
};

export const errorMessageReceived = message => {
    return {
        type: actionTypes.CCMS_WIDGETS_BOARD_ERROR_MESSAGE,
        message
    };
};

export const passLoadingState = status => {
    return {
        type: actionTypes.CCMS_WIDGETS_BOARD_LOADING_STATUS,
        loading: status
    };
};

export const cleanTokenForPage = pageKey => {
    return {
        type: actionTypes.CCMS_DASHBOARD_LIBRARY_CLEAN_TOKEN_FOR_PAGE,
        pageKey
    };
};

export const createUpdateResource = ({ group, resourceId }) => {
    return {
        type: actionTypes.CCMS_WIDGET_BOARD_CREATE_AND_UPDATE_RESOURCE,
        group,
        resourceId
    };
};

export const getResourceByGroupResourceId = ({ group, resourceId }) => {
    return {
        type: actionTypes.CCMS_WIDGET_BOARD_GET_RESOURCE_BY_GROUP_AND_RESOURCEID,
        group,
        resourceId
    };
};

export const passPageEditable = editable => {
    return {
        type: actionTypes.CCMS_WIDGET_BOARD_EDITABLE,
        editable
    };
};

export const getPermissionList = () => {
    return {
        type: actionTypes.CCMS_WIDGET_BOARD_GET_PERMISSION_LIST
    };
};

export const updatePermissions = permissionParam => {
    return {
        type: actionTypes.CCMS_WIDGET_BOARD_UPDATE_PERMISSION_LIST,
        permissionParam
    };
};

export const passSecurityDialogState = state => {
    return {
        type: actionTypes.CCMS_WIDGET_BOARD_TOGGLE_SECURITY_DIALOG,
        state
    };
};

export const getResourceInfo = materialKey => {
    return {
        type: actionTypes.CCMS_WIDGET_BOARD_GET_RESOURCE_INFOMATION,
        materialKey
    };
};
export const passPermissions = (p_list, group) => {
    return {
        type: actionTypes.CCMS_WIDGET_BOARD_PASS_PERMISSION_LIST,
        permissions: p_list,
        group
    };
};

export const deleteresource = resourceid => {
    return {
        type: actionTypes.CCMS_DASHBOARD_LIBRARY_DELETE_RESOURCE,
        resourceid
    };
};
export const passResourceDetail = resourceDetail => {
    return {
        type: actionTypes.CCMS_DASHBOARD_LIBRARY_PASSRESOURCE_DETAIL,
        resourceDetail
    };
};

export const getVisualInfo = id => {
    return {
        type: actionTypes.CCMS_DASHBOARD_CHECK_VISUAL,
        id
    };
};
