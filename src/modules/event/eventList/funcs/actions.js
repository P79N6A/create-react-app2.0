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
    EVENT_REQUEST_SUCCESS,
    EVENT_REQUEST_FAILED,
    EVENT_DRAWER_TOGGLE,
    EVENT_SEARCHTIME_SAVE,
    EVENT_REQUEST_ITEMSSEARCH,
    EVENT_ITEMSDATA_SAVE,
    EVENT_GETDETAIL_REQUEST,
    EVENT_GETDETAIL_REQUEST_SUCCESS,
    EVENT_SELECTCOLUMNS_SAVE,
    EVENT_CCMS_ACTION,
    EVENT_EDITOR_CONTROL_PROPS,
    EVENT_SORTERDATA_SAVE,
    EXPORT_EVENT_DATA_REQUEST,
    EXPORT_EVENT_DATA_SUCCESS,
    EVENT_CHANGE_DISPLAY_TYPE,
    EVENT_SAVE_ROWSPERPAGE,
    EVENT_SAVE_STREAMING_DATA,
    EVENT_STREAM_REQUEST,
    EVENT_STREAM_REQUEST_SUCCESS,
    EVENT_SAVE_SORTRESULT,
    EVENT_PARAMETERS_REQUEST,
    EVENT_PARAMETERS_REQUEST_SUCCESS,
    EVENT_CLOSE_WS_LOCK
} from "./actionTypes";

//init event list data
// export const getDataRequest = (newTime, pageNo, pageLimit, sorterData, identify) => ({
//     type: EVENT_REQUEST,
//     newTime,
//     pageNo,
//     pageLimit,
//     sorterData,
//     identify,
//     loading: false
// });
export const getDataRequestSuccess = (arrayData, pagination, identify) => {
    return {
        type: EVENT_REQUEST_SUCCESS,
        pagination,
        arrayData,
        identify,
        loading: true
    };
};

export const getDataRequestFailed = identify => {
    return {
        type: EVENT_REQUEST_FAILED,
        identify,
        loading: true,
        loading2: true
    };
};

//open event detail
export const getDrawerToggle = (status, anchor, isActive, identify) => ({
    type: EVENT_DRAWER_TOGGLE,
    showItems: status,
    anchor: anchor,
    isActive: isActive,
    identify
});

//init event list save search time
export const saveSearchTime = (time, identify) => ({
    type: EVENT_SEARCHTIME_SAVE,
    currentTime: time,
    identify
});

//according to items search
export const getItemsRequest = (paginator, predicate, applicationid, identify) => ({
    type: EVENT_REQUEST_ITEMSSEARCH,
    paginator,
    predicate,
    applicationid,
    identify,
    loading: false
});

//save search items data
export const saveItemsData = (itemsData, identify) => ({
    type: EVENT_ITEMSDATA_SAVE,
    itemsData,
    identify
});

//get event detail data
export const getDetailRequest = (id, identify) => ({
    type: EVENT_GETDETAIL_REQUEST,
    id,
    identify
});
//get event detail data successful
export const getDetailRequestSuccess = (arrayData, identify) => ({
    type: EVENT_GETDETAIL_REQUEST_SUCCESS,
    arrayData: arrayData,
    identify
});
//save selected columns
export const saveSelectColumns = (selectedColumn, columnConfig, identify) => ({
    type: EVENT_SELECTCOLUMNS_SAVE,
    items: selectedColumn,
    columnConfig: columnConfig,
    identify
});

export const ccmsAction = (props, identify) => {
    return {
        type: EVENT_CCMS_ACTION,
        props,
        identify
    };
};

//handle edit data
export const editorControlProps = (editorData, identify) => ({
    type: EVENT_EDITOR_CONTROL_PROPS,
    editorData,
    identify
});

//save SortersArr
export const saveSortersArr = (orderBy, order, sortersArr, identify) => ({
    type: EVENT_SORTERDATA_SAVE,
    orderBy: orderBy,
    order: order,
    sorterData: sortersArr,
    identify
});

//export .Excel
export const exportEventDataRequest = (identify, itemsData, columninfos, pageLimit, dateRange, applicationid) => ({
    type: EXPORT_EVENT_DATA_REQUEST,
    identify,
    itemsData,
    columninfos,
    pageLimit,
    dateRange,
    applicationid
});
export const exportEventDataSuccess = (identify, data) => ({
    type: EXPORT_EVENT_DATA_SUCCESS,
    identify,
    data
});

//toggle list or view
export const changeTopoDisplayType = (topoDisplayType, identify) => ({
    type: EVENT_CHANGE_DISPLAY_TYPE,
    identify,
    topoDisplayType
});

//save saveRowsPerPage
export const saveRowsPerPage = (pageNo, pageLimit, identify) => ({
    type: EVENT_SAVE_ROWSPERPAGE,
    pageNo,
    pageLimit,
    identify
});

//save stream data
export const saveStreamingData = (data, identify) => ({
    type: EVENT_SAVE_STREAMING_DATA,
    data,
    identify
});
export const closeWsLock = (value, identify) => ({
    type: EVENT_CLOSE_WS_LOCK,
    value,
    identify
});

//get stream data
export const getStreamRequest = (pageNo, pageLimit, predicate, applicationid, identify) => ({
    type: EVENT_STREAM_REQUEST,
    pageNo,
    pageLimit,
    predicate,
    applicationid,
    identify,
    loading2: false
});
//get stream data success
export const getStreamDataRequestSuccess = (arrayData, identify) => {
    return {
        type: EVENT_STREAM_REQUEST_SUCCESS,
        arrayData: arrayData,
        identify,
        loading2: true
    };
};

//saveSortResult
export const saveSortResult = (newData, identify) => ({
    type: EVENT_SAVE_SORTRESULT,
    newData,
    identify
});

//request Parameters name
export const requestParameters = (value, identify) => ({
    type: EVENT_PARAMETERS_REQUEST,
    value,
    identify
});
export const getParametersSuccess = (arrayData, identify) => {
    return {
        type: EVENT_PARAMETERS_REQUEST_SUCCESS,
        arrayData: arrayData,
        identify
    };
};
