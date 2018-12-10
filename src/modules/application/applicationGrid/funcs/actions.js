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
 * Created by xulu on 25/05/2018.
 */
import {
    APPLICATION_INIT,
    DELETE_ADDRESS_REQUEST,
    APPLICATION_FLOATTAB_OPEN,
    APPLICATION_FLOATTAB_CLOSE,
    APPLICATION_COLUMN_FILTER_CHANGE,
    APPLICATION_CCMS_CONTROL,
    APPLICATION_EDITOR_CONTROL_PROPS,
    APPLICATION_STORE_COLUMN_FILTER,
    APPLICATION_MULTIPLE_SELECT,
    APPLICATION_SORT_CHANGED,
    DELETE_ADDRESS_SUCCESS,
    GET_ADDRESS_FROM_LAYER_REQUEST,
    GET_ADDRESS_FROM_LAYER_SUCCESS,
    GET_ADDRESS_FROM_LAYER_FAILURE,
    // APPLICATION_CHANGE_DISPLAY_TYPE,
    AUTO_REFRESH_INIT
} from "./actionTypes";

export const initApplicationGrid = (identify, orderBy) => ({
    type: APPLICATION_INIT,
    identify,
    orderBy
});

export const closeFloatTab = identify => ({
    type: APPLICATION_FLOATTAB_CLOSE,
    showFloatTab: false,
    identify
});

export const columnFilterChange = (identify, currentColumns) => ({
    type: APPLICATION_COLUMN_FILTER_CHANGE,
    showFloatTab: false,
    identify,
    currentColumns
});

export const ccmsControl = identify => ({
    type: APPLICATION_CCMS_CONTROL,
    identify
});

export const editorControlProps = (identify, editorState) => ({
    type: APPLICATION_EDITOR_CONTROL_PROPS,
    identify,
    editorState
});

export const storeColumnsAndFilters = (identify, columnConfig, filterConfig) => ({
    type: APPLICATION_STORE_COLUMN_FILTER,
    identify,
    columnConfig,
    filterConfig
});

export const multipleChecked = (identify, multipleSelected) => ({
    type: APPLICATION_MULTIPLE_SELECT,
    identify,
    multipleSelected
});

export const columnSortChanged = (identify, orderBy, orderDisplayName, orderDirection) => ({
    type: APPLICATION_SORT_CHANGED,
    identify,
    orderBy,
    orderDisplayName,
    orderDirection
});

export const autoRefreshInit = (identify, timer) => ({
    type: AUTO_REFRESH_INIT,
    identify,
    timer
});

export const deleteAddressDataItems = (identify, iotId, siteName) => ({
    type: DELETE_ADDRESS_REQUEST,
    identify,
    iotId,
    siteName,
    refreshTopology: false
});

export const deleteAddressSuccess = identify => ({
    type: DELETE_ADDRESS_SUCCESS,
    identify,
    refreshTopology: true
});

export const openFloatTab = (identify, floatTabType, applicationId, resourcePath, geo, applicationName) => ({
    type: APPLICATION_FLOATTAB_OPEN,
    showFloatTab: true,
    applicationId,
    resourcePath,
    geo,
    applicationName,
    identify,
    floatTabType
});

export const getAddressFromLayerRequest = (
    identify,
    predicates,
    pageLimit,
    pageNo,
    iotId,
    resourcetype,
    sortConfig,
    orderDisplayName,
    orderDirection
) => ({
    type: GET_ADDRESS_FROM_LAYER_REQUEST,
    identify,
    iotId,
    pageNo,
    pageLimit,
    sortConfig,
    predicates,
    resourcetype,
    orderDisplayName,
    orderDirection,
    isPending: true,
    showFloatTab: false,
    refreshTopologySuccess: false
});

export const getAddressFromLayerSuccess = (
    identify,
    layerData,
    iotId,
    pagination,
    sortConfig,
    orderDisplayName,
    orderDirection
) => ({
    type: GET_ADDRESS_FROM_LAYER_SUCCESS,
    identify,
    layerData,
    pagination,
    iotId,
    sortConfig,
    orderDisplayName,
    orderDirection,
    isPending: false,
    refreshTopologySuccess: true,
    refreshTopology: false
});

export const getAddressFromLayerFailure = identify => ({
    type: GET_ADDRESS_FROM_LAYER_FAILURE,
    identify,
    isPending: false,
    refreshTopologySuccess: true,
    refreshTopology: false
});
