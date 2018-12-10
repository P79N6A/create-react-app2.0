/*
 * =========================================================================
 *  Copyright (C)2015 NCS Pte. Ltd. All Rights Reserved
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
 * Created by @Luo Jia alex on 29/05/15.
 */

import * as actionTypes from "./actionTypes";

export const dashboardRequest = (searchData, flag) => ({
    searchData,
    flag,
    type: actionTypes.DASHBOARD_REQUEST
});

export const getDashboardSuccess = (dashboardData, pageable, flag, total, favouriteTrigger) => {
    return {
        dashboardsLen: flag ? dashboardData.length : null,
        type: actionTypes.DASHBOARD_REQUEST_SUCCESS,
        dashboardData,
        pageable,
        favouriteTrigger,
        total: flag ? total : null
    };
};

export const saveDashboard = (status, pageName, desc, group, widgets, thumbnail, groupDatas, priority, appid) => {
    return {
        status,
        pageName,
        desc,
        group,
        widgets,
        thumbnail,
        groupDatas,
        priority,
        appid,
        type: actionTypes.DASHBOARD_ADD
    };
};

export const setPageId = pageId => {
    return {
        pageId,
        type: actionTypes.DASHBOARD_SET_PAGEKEY
    };
};

export const addWidgets = (widget, chartType) => {
    return {
        type: actionTypes.WIDGET_ADD,
        chartType: chartType,
        widget: widget
    };
};

export const toggleScale = (key, isScale) => {
    return {
        type: actionTypes.TOOGLE_SCALE,
        key: key,
        isScale: isScale
    };
};

export const saveWidgets = () => {
    return {
        type: actionTypes.WIDGET_SAVE
    };
};

export const saveWidgetsSuccess = () => {
    return {
        type: actionTypes.WIDGET_SAVE_SUCCESS
    };
};

export const deleteDashboard = isDelete => {
    return {
        isDelete,
        type: actionTypes.DASHBOARD_DELETE
    };
};

export const restCurrItem = reset => {
    return {
        reset,
        type: actionTypes.REST_CURRITEM
    };
};

export const restDashboardItem = () => {
    return {
        type: actionTypes.REST_DASHBOARD_ITEM
    };
};

export const deleteDashboardRequest = (key, goBack) => {
    return {
        key,
        goBack,
        type: actionTypes.DASHBOARD_DELETE_REQUEST
    };
};

export const deleteDashboardSuccess = key => {
    return {
        key,
        type: actionTypes.DASHBOARD_DELETE_SUCCESS
    };
};

export const addDashboardSuccess = data => {
    return {
        data,
        type: actionTypes.DASHBOARD_ADD_SUCCESS
    };
};

export const getDahboardItemSuccess = data => {
    return {
        data,
        type: actionTypes.DASHBOARD_GET_SUCCESS
    };
};

export const editDashboardSave = (originData, editData) => {
    return {
        originData,
        editData,
        type: actionTypes.DASHBOARD_EDIT
    };
};

export const editDashboardSaveSuccess = () => {
    return {
        type: actionTypes.DASHBOARD_EDIT_SUCCESS
    };
};

export const getDahboardItem = key => {
    return {
        key,
        type: actionTypes.DASHBOARD_GET
    };
};

export const refreshDashboardTitle = (key, title) => ({
    key,
    title,
    type: actionTypes.DASHBOARD_REFRESH_TITLE
});

export const filterDashboard = text => ({
    text,
    type: actionTypes.DASHBOARD_FILTER
});

// GROUP
export const updateGroup = (groupId, pages, status, desc, appid) => ({
    groupId,
    pages,
    status,
    desc,
    appid,
    type: actionTypes.GROUP_ADD_REQUEST
});

export const updateGroupSuccess = groupData => ({
    type: actionTypes.GROUP_ADD_REQUEST_SUCCESS
});

export const getGroupList = searchData => ({
    searchData,
    type: actionTypes.DASHBOARD_GROUP_REQUEST
});

export const getGroupListSuccess = groupData => ({
    groupData,
    type: actionTypes.DASHBOARD_GROUP_REQUEST_SUCCESS
});

export const deleteGroup = (seqId, searchData, appid) => ({
    seqId,
    appid,
    searchData,
    type: actionTypes.DASHBOARD_GROUP_DELETE_REQUEST
});

export const deleteGroupSuccess = () => ({
    type: actionTypes.DASHBOARD_GROUP_DELETE_REQUEST_SUCCESS
});

export const editGroup = (seqId, id, page, desc, searchData) => ({
    seqId,
    id,
    page,
    desc,
    searchData,
    type: actionTypes.DASHBOARD_GROUP_EDIT_REQUEST
});

export const filterGroup = (search = "") => ({
    search,
    type: actionTypes.DASHBOARD_GROUP_FILTER
});

export const duplicatePageConfig = (pageKey, name, groupDatas, duplicateToPageEditMode) => ({
    pageKey,
    name,
    groupDatas,
    duplicateToPageEditMode: duplicateToPageEditMode,
    type: actionTypes.DASHBOARD_DUPLICATE_REQUEST
});

export const duplicatePageConfigSuccess = () => ({
    type: actionTypes.DASHBOARD_DUPLICATE_REQUEST_SUCCESS
});

export const updateGroupList = (groupList, searchData = {}, refresh = false) => ({
    groupList,
    searchData,
    refresh,
    type: actionTypes.GROUPLIST_UPDATE_REQUEST
});

export const pushGroupItem = groupItem => ({
    groupItem,
    type: actionTypes.DASHBOARD_GROUP_PUSH_ITEM
});

export const getCount = appName => ({
    type: actionTypes.COUNT_REQUEST,
    appName
});

export const getCountSuccess = countData => ({
    countData,
    type: actionTypes.COUNT_REQUEST_SUCCESS
});

export const getDashboardTemplate = appid => ({
    type: actionTypes.TEMPLATE_SAVE_REQUEST,
    appid
});

export const getDashboardTemplateSuccess = userSubmitTemplates => ({
    userSubmitTemplates,
    type: actionTypes.TEMPLATE_SAVE_REQUEST_SUCCESS
});

export const deleteTemplateRequest = (id, appid) => ({
    appid,
    id,
    type: actionTypes.TEMPLATE_DELETE_REQUEST
});

export const checkUserModify = pageKey => {
    return {
        type: actionTypes.CCMS_DASHBOARD_LIBRARY_CHECK_USER_MODIFY,
        pageKey
    };
};

/**
 *
 * @param {Boolean} loading
 */
export const toggleLoading = loading => {
    return {
        type: actionTypes.DDASHBOARD_LOADING_COVER,
        loading
    };
};

/**
 *
 */

export const updatePriority = (config, searchData) => {
    return {
        type: actionTypes.DASHBOARD_PAGE_PRIORITY,
        config,
        searchData
    };
};
/**
 *
 * @param {*} gpid
 */
export const getApplicationsByGroupId = gpid => {
    return {
        type: actionTypes.DASHBOARD_APPLICATION_BY_TYPE,
        groupId: gpid
    };
};
/**
 * get thumbnail pic
 */
export const getThumbnail = (fileId, originalId) => {
    return {
        type: actionTypes.DASHBOARD_GET_THUMBNAIL_BY_FILEID,
        mediaFileId: fileId,
        originalId
    };
};

/**
 *
 * get thumbnail success
 *
 */
export const getThumbnailSuccess = (file, originalId) => {
    return {
        type: actionTypes.DASHBOARD_GET_THUMBNAIL_SUCCESS,
        mediaFile: file,
        originalId
    };
};

// ** get customized dashboards
export const getCustomizedSuccess = customizedDashboards => {
    return {
        type: actionTypes.DASHBOARD_GET_CUSTOMIZED_DASHBOARDS,
        payload: {
            customizedDashboards
        }
    };
};
//  ** get customized pageKey

export const getCustomizedKey = customizedKey => {
    return {
        type: actionTypes.DASHBOARD_GET_CUSTOMIZED_DASHBOARD_KEY,
        payload: {
            customizedKey
        }
    };
};
