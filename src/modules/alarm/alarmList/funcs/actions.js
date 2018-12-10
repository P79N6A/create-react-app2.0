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
 * Created by SongCheng on 20/05/2018.
 */

import {
    ALARM_INITDATA_REQUEST_SUCCESS,
    ALARM_REQUEST_FAILED,
    ALARM_DRAWER_TOGGLE,
    ALARM_GETDETAIL_REQUEST,
    ALARM_GETDETAIL_REQUEST_SUCCESS,
    ALARM_ITEMSDATA_SAVE,
    ALARM_SELECTCOLUMNS_SAVE,
    ALARM_SEARCHTIME_SAVE,
    ALARM_REQUEST_ITEMSSEARCH,
    ALARM_GETDETAILMEDIA_REQUEST,
    ALARM_GETDETAILMEDIA_REQUEST_SUCCESS,
    ALARM_CCMS_ACTION,
    ALARM_EDITOR_CONTROL_PROPS,
    ALARM_SORTERDATA_SAVE,
    ALARM_CHANGE_DISPLAY_TYPE,
    EXPORT_ALARM_DATA_REQUEST,
    EXPORT_ALARM_DATA_SUCCESS,
    ALARM_SAVE_ROWSPERPAGE,
    ALARM_SAVE_STREAMING_DATA,
    ALARM_STREAM_REQUEST,
    ALARM_STREAM_REQUEST_SUCCESS,
    ALARM_SAVE_SORTRESULT,
    ALARM_PARAMETERS_REQUEST,
    ALARM_PARAMETERS_REQUEST_SUCCESS,
    ALARM_CHANGE_STATE_REQUEST,
    ALARM_CHANGE_STATE_REQUEST_SUCCESS,
    ALARM_GET_ASSOCIATIONS_DATA,
    ALARM_GET_ASSOCIATIONS_DATA_SUCCESS,
    ALARM_RESET_ASSOCIATIONS_DATA,
    ALARM_ASSOCIATE_ITEM,
    ALARM_DISSOCIATE_ITEM,
    ALARM_DISSOCIATE_ITEM_SUCCESS,
    ALARM_ASSOCIATION_SEARCH_REQUEST,
    ALARM_ASSOCIATION_SEARCH_REQUEST_SUCCESS,
    ALARM_POST_EDIT_DATA,
    // ALARM_POST_EDIT_DATA_SUCCESS,
    ALARM_GET_USER_LIST,
    ALARM_GET_USER_LIST_SUCCESS,
    ALARM_GET_COMMENTS_DATA,
    ALARM_GET_COMMENTS_DATA_SUCCESS,
    ALARM_POST_COMMENTS,
    ALARM_POST_FILE_ID,
    ALARM_UPDATE_LISTDETAIL,
    ALARM_UPDATE_LISTDETAIL_SUCCESS,
    ALARM_UPLOAD_FILE,
    ALARM_UPLOAD_FILE_SUCCESS,
    EXPORT_ALARM_DETAIL_REQUEST,
    ALARM_CLOSE_WS_LOCK,
    ALARM_GET_PAGE_KEY,
    ALARM_GET_PAGE_KEY_SUCCESS
} from "./actionTypes";

//init alarm list data success
export const getDataRequestSuccess = (arrayData, pagination, identify) => {
    return {
        type: ALARM_INITDATA_REQUEST_SUCCESS,
        arrayData: arrayData,
        pagination: pagination,
        identify,
        loading: true
    };
};

export const getDataRequestFailed = identify => {
    return {
        type: ALARM_REQUEST_FAILED,
        identify,
        loading: true
    };
};

//open alarm detail
export const getDrawerToggle = (status, anchor, isActive, identify) => ({
    type: ALARM_DRAWER_TOGGLE,
    showItems: status,
    anchor: anchor,
    isActive: isActive,
    identify
});
//get alarm detail data
export const getDetailRequest = (id, identify) => {
    return {
        type: ALARM_GETDETAIL_REQUEST,
        id,
        identify
    };
};

//get alarm detail data successful
export const getDetailRequestSuccess = (arrayData, identify) => ({
    type: ALARM_GETDETAIL_REQUEST_SUCCESS,
    arrayData: arrayData,
    identify
});
//get alarm attachment
export const getDetailMediaRequest = (id, identify) => ({
    type: ALARM_GETDETAILMEDIA_REQUEST,
    id,
    identify
});
//
export const getDetailMediaRequestSuccess = (arrayData, identify) => ({
    type: ALARM_GETDETAILMEDIA_REQUEST_SUCCESS,
    arrayData: arrayData,
    identify
});

//save search items data
export const saveItemsData = (itemsData, identify) => ({
    type: ALARM_ITEMSDATA_SAVE,
    itemsData,
    identify
});

//save selected columns
export const saveSelectColumns = (selectedColumn, columnConfig, identify) => ({
    type: ALARM_SELECTCOLUMNS_SAVE,
    items: selectedColumn,
    columnConfig: columnConfig,
    identify
});

//init alarm list save search time
export const saveSearchTime = (time, identify) => ({
    type: ALARM_SEARCHTIME_SAVE,
    currentTime: time,
    identify
});

//according to items search
export const getItemsRequest = (paginator, predicate, applicationid, identify) => ({
    type: ALARM_REQUEST_ITEMSSEARCH,
    paginator,
    predicate,
    applicationid,
    identify,
    loading: false
});

export const ccmsAction = (props, identify) => {
    return {
        type: ALARM_CCMS_ACTION,
        props,
        identify
    };
};

//handle edit data
export const editorControlProps = (editorData, identify) => ({
    type: ALARM_EDITOR_CONTROL_PROPS,
    editorData,
    identify
});

//save SortersArr saveSortersArr
export const saveSortersArr = (orderBy, order, sortersArr, identify) => ({
    type: ALARM_SORTERDATA_SAVE,
    orderBy: orderBy,
    order: order,
    sorterData: sortersArr,
    identify
});

//request Parameters name
export const requestParameters = (value, identify) => ({
    type: ALARM_PARAMETERS_REQUEST,
    value,
    identify
});
export const getParametersSuccess = (arrayData, identify) => {
    return {
        type: ALARM_PARAMETERS_REQUEST_SUCCESS,
        arrayData: arrayData,
        identify
    };
};

//export .Excel
export const exportAlarmDataRequest = (identify, itemsData, columninfos, pageLimit, dateRange, applicationid) => ({
    type: EXPORT_ALARM_DATA_REQUEST,
    identify,
    itemsData,
    columninfos,
    pageLimit,
    dateRange,
    applicationid
});
export const exportAlarmDataSuccess = (identify, data) => ({
    type: EXPORT_ALARM_DATA_SUCCESS,
    identify,
    data
});
export const exportAlarmDetail = (identify, itemsData, columninfos, pageLimit, applicationid) => ({
    type: EXPORT_ALARM_DETAIL_REQUEST,
    identify,
    itemsData,
    columninfos,
    pageLimit,
    applicationid
});

//toggle list or view
export const changeTopoDisplayType = (topoDisplayType, identify) => ({
    type: ALARM_CHANGE_DISPLAY_TYPE,
    identify,
    topoDisplayType
});

//save saveRowsPerPage
export const saveRowsPerPage = (pageNo, pageLimit, identify) => ({
    type: ALARM_SAVE_ROWSPERPAGE,
    pageNo,
    pageLimit,
    identify
});

//save stream data
export const saveStreamingData = (data, identify) => ({
    type: ALARM_SAVE_STREAMING_DATA,
    data,
    identify
});
export const closeWsLock = (value, identify) => ({
    type: ALARM_CLOSE_WS_LOCK,
    value,
    identify
});

//get stream data
export const getStreamRequest = (pageNo, pageLimit, applicationid, identify) => ({
    type: ALARM_STREAM_REQUEST,
    pageNo,
    pageLimit,
    applicationid,
    identify,
    loading2: false
});
//get stream data success
export const getStreamDataRequestSuccess = (arrayData, identify) => {
    return {
        type: ALARM_STREAM_REQUEST_SUCCESS,
        arrayData: arrayData,
        identify,
        loading2: true
    };
};
//saveSortResult
export const saveSortResult = (newData, identify) => ({
    type: ALARM_SAVE_SORTRESULT,
    newData,
    identify
});

//change alarm state
export const changeStateRequest = (id, owner, state, identify) => ({
    type: ALARM_CHANGE_STATE_REQUEST,
    id,
    owner,
    state,
    identify
});
export const callChangeStateSuccess = (arrayData, identify) => {
    return {
        type: ALARM_CHANGE_STATE_REQUEST_SUCCESS,
        arrayData,
        identify
    };
};

//getAssociationsData
export const getAssociationsData = (paginator, predicate, identify) => ({
    type: ALARM_GET_ASSOCIATIONS_DATA,
    paginator,
    predicate,
    identify
});
export const getAssociationsDataSuccess = (arrayData, identify) => ({
    type: ALARM_GET_ASSOCIATIONS_DATA_SUCCESS,
    arrayData,
    identify
});
export const resetAssociationsData = (value, identify) => ({
    type: ALARM_RESET_ASSOCIATIONS_DATA,
    value,
    identify
});

//associate item
export const associateItem = (parentId, childId, identify) => ({
    type: ALARM_ASSOCIATE_ITEM,
    parentId,
    childId,
    identify
});

//dissociate item
export const dissociateItem = (parentId, childId, state, identify) => ({
    type: ALARM_DISSOCIATE_ITEM,
    parentId,
    childId,
    state,
    identify
});
export const dissociateItemSuccess = (arrayData, identify) => ({
    type: ALARM_DISSOCIATE_ITEM_SUCCESS,
    arrayData,
    identify
});
export const updateListDetail = (identify, id, value) => ({
    type: ALARM_UPDATE_LISTDETAIL,
    identify,
    id,
    value
});
export const updateListDetailSuccess = (identify, arrayData, value) => ({
    type: ALARM_UPDATE_LISTDETAIL_SUCCESS,
    identify,
    arrayData,
    value
});

//association search request
export const associationSearchRequest = (paginator, predicate, applicationid, identify) => ({
    type: ALARM_ASSOCIATION_SEARCH_REQUEST,
    paginator,
    predicate,
    applicationid,
    identify
});
export const associationSearchRequestSuccess = (arrayData, pagination, identify) => ({
    type: ALARM_ASSOCIATION_SEARCH_REQUEST_SUCCESS,
    arrayData,
    pagination,
    identify
});

//postEditData
export const postEditData = (id, owner, state, severity, urgency, identify) => ({
    type: ALARM_POST_EDIT_DATA,
    id,
    owner,
    state,
    severity,
    urgency,
    identify
});

//get user list
export const getUserList = (pageNo, pageLimit, identify) => ({
    type: ALARM_GET_USER_LIST,
    pageNo,
    pageLimit,
    identify
});
export const getUserListSuccess = (arrayData, pagination, identify) => ({
    type: ALARM_GET_USER_LIST_SUCCESS,
    arrayData,
    pagination,
    identify
});

//getCommentsData
export const getCommentsData = (id, identify) => ({
    type: ALARM_GET_COMMENTS_DATA,
    id,
    identify
});
export const getCommentsDataSuccess = (arrayData, identify) => ({
    type: ALARM_GET_COMMENTS_DATA_SUCCESS,
    arrayData,
    identify
});

//postComments
export const postComments = (id, value, identify) => ({
    type: ALARM_POST_COMMENTS,
    id,
    value,
    identify
});
export const postFileId = (id, fileId, identify) => ({
    type: ALARM_POST_FILE_ID,
    id,
    fileId,
    identify
});

//uploadFile
export const uploadFile = (file, identify) => ({
    type: ALARM_UPLOAD_FILE,
    file,
    identify
});
export const uploadFileSuccess = (id, identify) => ({
    type: ALARM_UPLOAD_FILE_SUCCESS,
    id,
    identify
});

//get pagekey
export const getPageKey = (value, identify) => ({
    type: ALARM_GET_PAGE_KEY,
    value,
    identify
});
export const getPageKeySuccess = (value, identify) => ({
    type: ALARM_GET_PAGE_KEY_SUCCESS,
    value,
    identify
});
