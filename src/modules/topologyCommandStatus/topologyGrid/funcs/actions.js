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
    TOPOLOGY_REQUEST,
    TOPOLOGY_REQUEST_SUCCESS,
    TOPOLOGY_FLOATTAB_OPEN,
    TOPOLOGY_FLOATTAB_CLOSE,
    TOPOLOGY_COLUMN_FILTER_CHANGE,
    TOPOLOGY_CCMS_CONTROL,
    TOPOLOGY_EDITOR_CONTROL_PROPS,
    TOPOLOGY_STORE_COLUMN_FILTER,
    TOPOLOGY_MULTIPLE_SELECT,
    TOPOLOGY_SORT_CHANGED,
    TOPOLOGY_EXPORT_TOPOLOGY_DATA,
    TOPOLOGY_EXPORT_TOPOLOGY_DATA_SUCCESS,
    TOPOLOGY_CHANGE_DISPLAY_TYPE,
    AUTO_REFRESH_INIT,
    TOPOLOGY_GET_SYSCONFIG_DEVICE_TYPE,
    TOPOLOGY_GET_SYSCONFIG_DEVICE_TYPE_SUCCESS,
    TOPOLOGY_GET_SYSCONFIG_DEVICE_SCHEMA,
    TOPOLOGY_GET_SYSCONFIG_DEVICE_SCHEMA_SUCCESS,
    TOPOLOGY_GET_SYSCONFIG_DEVICE_TYPE_SCHEMA,
    TOPOLOGY_GET_SYSCONFIG_DEVICE_TYPE_SCHEMA_SUCCESS
} from "./actionTypes";

export const topologyRequest = (
    pageNo,
    pageLimit,
    identify,
    predicate,
    sortConfig,
    orderDisplayName,
    orderDirection
) => ({
    type: TOPOLOGY_REQUEST,
    pageNo,
    pageLimit,
    identify,
    predicate,
    sortConfig,
    orderDisplayName,
    orderDirection,
    isPending: true,
    refreshTopologySuccess: false
});

export const getTopoDataSuccess = (
    pagination,
    arrayData,
    identify,
    predicate,
    sortConfig,
    orderDisplayName,
    orderDirection
) => ({
    type: TOPOLOGY_REQUEST_SUCCESS,
    pagination: pagination,
    arrayData: arrayData,
    identify,
    predicate,
    sortConfig,
    orderDisplayName,
    orderDirection,
    isPending: false,
    refreshTopologySuccess: true
});

export const openFloatTab = (deviceId, resourcePath, geo, selectDeviceName, identify) => ({
    type: TOPOLOGY_FLOATTAB_OPEN,
    showFloatTab: true,
    deviceId,
    resourcePath,
    geo,
    selectDeviceName,
    identify
});

export const closeFloatTab = identify => ({
    type: TOPOLOGY_FLOATTAB_CLOSE,
    showFloatTab: false,
    identify
});

export const columnFilterChange = (identify, currentColumns) => ({
    type: TOPOLOGY_COLUMN_FILTER_CHANGE,
    showFloatTab: false,
    identify,
    currentColumns
});

export const ccmsControl = identify => ({
    type: TOPOLOGY_CCMS_CONTROL,
    identify
});

export const editorControlProps = (identify, editorState) => ({
    type: TOPOLOGY_EDITOR_CONTROL_PROPS,
    identify,
    editorState
});

export const storeColumnsAndFilters = (identify, columnConfig, filterConfig) => ({
    type: TOPOLOGY_STORE_COLUMN_FILTER,
    identify,
    columnConfig,
    filterConfig
});

export const multipleChecked = (identify, multipleSelected) => ({
    type: TOPOLOGY_MULTIPLE_SELECT,
    identify,
    multipleSelected
});

export const columnSortChanged = (identify, orderBy, orderDisplayName, orderDirection) => ({
    type: TOPOLOGY_SORT_CHANGED,
    identify,
    orderBy,
    orderDisplayName,
    orderDirection
});

export const exportTopologyData = identify => ({
    type: TOPOLOGY_EXPORT_TOPOLOGY_DATA,
    identify
});

export const exportTopologyDataSuccess = (identify, exportTopoDatas) => ({
    type: TOPOLOGY_EXPORT_TOPOLOGY_DATA_SUCCESS,
    identify,
    exportTopoDatas
});

export const changeTopoDisplayType = (identify, topoDisplayType, widgetTitle) => ({
    type: TOPOLOGY_CHANGE_DISPLAY_TYPE,
    identify,
    topoDisplayType,
    widgetTitle
});

export const autoRefreshInit = (identify, timer) => ({
    type: AUTO_REFRESH_INIT,
    identify,
    timer
});

// get sysconfig devicetypes
export const getSysconfigDeviceTypes = (identify, siteName, dataType) => ({
    type: TOPOLOGY_GET_SYSCONFIG_DEVICE_TYPE,
    identify,
    siteName,
    dataType
});

// get sysconfig devicetypes success
export const getSysconfigDeviceTypeSuccess = (identify, sysconfigDevicetypes, dataType) => ({
    type: TOPOLOGY_GET_SYSCONFIG_DEVICE_TYPE_SUCCESS,
    identify,
    sysconfigDevicetypes,
    dataType
});

// get sysconfig device schema
export const getSysconfigDeviceSchema = (identify, siteName, schemaType) => ({
    type: TOPOLOGY_GET_SYSCONFIG_DEVICE_SCHEMA,
    identify,
    siteName,
    schemaType
});

// get sysconfig device schema success
export const getSysconfigDeviceSchemaSuccess = (
    identify,
    sysconfigDeviceSchema,
    sysconfigDevicePropertySchema,
    schemaType
) => ({
    type: TOPOLOGY_GET_SYSCONFIG_DEVICE_SCHEMA_SUCCESS,
    identify,
    sysconfigDeviceSchema,
    sysconfigDevicePropertySchema,
    schemaType
});

// get sysconfig device type schema
export const getSysconfigDeviceTypeSchema = (identify, siteName, schemaType) => ({
    type: TOPOLOGY_GET_SYSCONFIG_DEVICE_TYPE_SCHEMA,
    identify,
    siteName,
    schemaType
});

// get sysconfig device type schema success
export const getSysconfigDeviceTypeSchemaSuccess = (identify, schemaType, configs) => ({
    type: TOPOLOGY_GET_SYSCONFIG_DEVICE_TYPE_SCHEMA_SUCCESS,
    identify,
    schemaType,
    configs
});
