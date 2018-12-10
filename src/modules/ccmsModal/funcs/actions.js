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
import * as types from "./actionTypes";

export const toggleModal = (open, options) => {
    return {
        type: types.CCMS_DASHBOARD_TOGGLE_MODAL,
        payload: {
            open,
            ...options
        }
    };
};

export const deletePage = (pageKey, appid) => {
    return {
        type: types.CCMS_DASHBOARD_DELETE,
        payload: {
            pageKey,
            appid
        }
    };
};

export const getUserTemplate = category => {
    return {
        type: types.CCMS_GET_USER_TEMPLATE,
        category
    };
};

export const getUserTemplateSuccess = templates => {
    return {
        type: types.CCMS_GET_USER_TEMPLATE_SUCCESS,
        payload: {
            templates
        }
    };
};

export const deleteUserTemplate = id => {
    return {
        type: types.CCMS_DELETE_USER_TEMPLATE,
        id
    };
};

export const saveUseTemplate = postdata => {
    return {
        type: types.CCMS_SAVE_USER_TEMPLATE,
        payload: {
            postdata
        }
    };
};

export const getGroups = id => {
    return {
        type: types.CCMS_GET_GROUP_DATA,
        payload: {
            applicationId: id
        }
    };
};

export const getGroupsSuccess = datas => {
    return {
        type: types.CCMS_GET_GROUP_DATA_SUCCESS,
        payload: { groups: datas }
    };
};

export const createGroup = (id, pages, status, desc, appid) => {
    return {
        type: types.CCMS_CREATE_GROUP,
        payload: {
            id,
            pages,
            status,
            desc,
            appid
        }
    };
};

export const deleteGroup = (seqId, appid) => {
    return {
        type: types.CCMS_MODAL_DELETE_GROUP,
        payload: {
            seqId,
            appid
        }
    };
};

export const updateGroup = (seqId, name, status = "2001", desc = "", pages = [], appid) => {
    return {
        type: types.CCMS_MODAL_UPDATE_GROUP,
        payload: {
            name,
            seqId,
            pages,
            status,
            desc,
            appid
        }
    };
};

export const updatePageGroup = (groups, appid) => {
    return {
        type: types.CCMS_UPDATE_PAGE_GROUP,
        payload: {
            groups,
            applicationId: appid
        }
    };
};

export const createPage = (name, desc, groups, priority, status, widgets, appid, trigger) => {
    return {
        type: types.CCMS_CREATE_DASHBOARD,
        payload: {
            name,
            desc,
            appid,
            groups,
            status,
            widgets,
            priority,
            trigger
        }
    };
};

export const clonePage = (pageId, name, groups, id, desc, status, appid) => {
    return {
        type: types.CCMS_CLONE_DASHBOARD,
        payload: {
            pageId,
            name,
            groups,
            id,
            desc,
            status,
            appid
        }
    };
};

export const getPageKeySuccess = key => {
    return {
        type: types.CCMS_MODAL_GET_PAGEKEY_SUCCESS,
        payload: {
            key
        }
    };
};

export const lockDialog = status => {
    return {
        type: types.CCMS_MODAL_LOCK_DIALOG,
        payload: {
            disabledDialog: status
        }
    };
};
