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
 * Created by SongCheng on 31/08/2018.
 */

import {
    AUDIT_CCMS_ACTION,
    AUDIT_REQUEST_SUCCESS,
    AUDIT_REQUEST_FAILED,
    AUDIT_REQUEST_ITEMSSEARCH,
    AUDIT_SORTERDATA_SAVE,
    AUDIT_SAVE_ROWSPERPAGE,
    AUDIT_SELECTCOLUMNS_SAVE,
    AUDIT_DRAWER_TOGGLE,
    AUDIT_GETDETAIL_REQUEST,
    AUDIT_GETDETAIL_REQUEST_SUCCESS,
    AUDIT_GETREQUESTCONTENT,
    AUDIT_GETREQUESTCONTENT_SUCCESS
} from "./actionTypes";

export const ccmsAction = (props, identify) => ({
    type: AUDIT_CCMS_ACTION,
    props,
    identify
});

export const getDataRequestSuccess = (arrayData, pagination, identify) => {
    return {
        type: AUDIT_REQUEST_SUCCESS,
        pagination: pagination,
        arrayData: arrayData,
        identify,
        loading: true
    };
};

export const getDataRequestFailed = identify => {
    return {
        type: AUDIT_REQUEST_FAILED,
        identify,
        loading: true
    };
};

//according to items search
export const getItemsRequest = (paginator, sortorders, predicate, identify) => ({
    type: AUDIT_REQUEST_ITEMSSEARCH,
    paginator,
    sortorders,
    predicate,
    identify,
    loading: false
});

//save SortersArr
export const saveSortersArr = (orderBy, order, sortersArr, newData, identify) => ({
    type: AUDIT_SORTERDATA_SAVE,
    orderBy: orderBy,
    order: order,
    sorterData: sortersArr,
    newData: newData,
    identify
});

//save saveRowsPerPage
export const saveRowsPerPage = (pageNo, pageLimit, identify) => ({
    type: AUDIT_SAVE_ROWSPERPAGE,
    pageNo,
    pageLimit,
    identify
});

//save selected columns
export const saveSelectColumns = (selectedColumn, columnConfig, identify) => ({
    type: AUDIT_SELECTCOLUMNS_SAVE,
    items: selectedColumn,
    columnConfig: columnConfig,
    identify
});

//open audit detail
export const getDrawerToggle = (status, anchor, isActive, identify) => ({
    type: AUDIT_DRAWER_TOGGLE,
    showItems: status,
    anchor: anchor,
    isActive: isActive,
    identify
});

//get detail data
export const getDetailRequest = (id, identify) => ({
    type: AUDIT_GETDETAIL_REQUEST,
    id,
    identify
});
//get detail data successful
export const getDetailRequestSuccess = (arrayData, identify) => ({
    type: AUDIT_GETDETAIL_REQUEST_SUCCESS,
    arrayData: arrayData,
    identify
});

//get requestContent
export const getRequestContent = (id, identify) => ({
    type: AUDIT_GETREQUESTCONTENT,
    id,
    identify
});
export const getRequestContentSuccess = (contentBody, identify) => ({
    type: AUDIT_GETREQUESTCONTENT_SUCCESS,
    contentBody: contentBody,
    identify
});
