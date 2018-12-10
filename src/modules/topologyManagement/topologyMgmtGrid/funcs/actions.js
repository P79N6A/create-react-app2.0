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
import * as actions from "./actionTypes";

// get topology device data
export const initAllRedux = (identify, selectApplication, checkedTab) => ({
    type: actions.TOPOLOGYMGMT_INIT_ALL_REDUX,
    identify,
    selectApplication,
    checkedTab
});

// get topology device data
export const topologyRequest = (
    pageNo,
    pageLimit,
    identify,
    predicate,
    sortConfig,
    orderDisplayName,
    orderDirection,
    orderBy
) => ({
    type: actions.TOPOLOGYMGMT_REQUEST,
    pageNo,
    pageLimit,
    identify,
    predicate,
    sortConfig,
    orderDisplayName,
    orderDirection,
    orderBy,
    isPending: true,
    refreshTopologySuccess: false
});

// get topology device data success
export const getTopoDataSuccess = (
    pagination,
    arrayData,
    identify,
    predicate,
    sortConfig,
    orderDisplayName,
    orderDirection
) => ({
    type: actions.TOPOLOGYMGMT_REQUEST_SUCCESS,
    pagination: pagination,
    arrayData: arrayData,
    identify,
    predicate,
    sortConfig,
    orderDisplayName,
    orderDirection,
    isPending: false,
    refreshTopologySuccess: true,
    searchType: "device"
});

// get topology device type data
export const topologyTypeRequest = (
    pageNo,
    pageLimit,
    identify,
    predicate,
    sortConfig,
    orderDisplayName,
    orderDirection,
    orderBy
) => ({
    type: actions.TOPOLOGYMGMT_TYPE_REQUEST,
    pageNo,
    pageLimit,
    identify,
    predicate,
    sortConfig,
    orderDisplayName,
    orderDirection,
    orderBy,
    isPending: true,
    refreshTopologyTypeSuccess: false
});

// get topology device type data success
export const getTopoTypeDataSuccess = (
    pagination,
    arrayData,
    identify,
    predicate,
    sortConfig,
    orderDisplayName,
    orderDirection
) => ({
    type: actions.TOPOLOGYMGMT_REQUEST_SUCCESS,
    pagination: pagination,
    arrayData: arrayData,
    identify,
    predicate,
    sortConfig,
    orderDisplayName,
    orderDirection,
    isPending: false,
    refreshTopologySuccess: true,
    searchType: "devicetype"
});

// click to open float tab
export const openFloatTab = (
    identify,
    floatTabType,
    deviceId,
    resourcePath,
    geo,
    selectDeviceName,
    addressIotId,
    addressName,
    deviceModelId,
    deviceIcon,
    hasParentDevice
) => ({
    type: actions.TOPOLOGYMGMT_FLOATTAB_OPEN,
    showFloatTab: true,
    deviceId,
    resourcePath,
    geo,
    selectDeviceName,
    addressIotId,
    addressName,
    deviceModelId,
    deviceIcon,
    identify,
    floatTabType,
    hasParentDevice
});

// click to close float tab
export const closeFloatTab = identify => ({
    type: actions.TOPOLOGYMGMT_FLOATTAB_CLOSE,
    showFloatTab: false,
    identify
});

// columnfilter changed
export const columnFilterChange = (identify, currentColumns) => ({
    type: actions.TOPOLOGYMGMT_COLUMN_FILTER_CHANGE,
    showFloatTab: false,
    identify,
    currentColumns
});

// store columns and filters
export const storeColumnsAndFilters = (identify, columnConfig, filterConfig) => ({
    type: actions.TOPOLOGYMGMT_STORE_COLUMN_FILTER,
    identify,
    columnConfig,
    filterConfig
});

// multiple check select
export const multipleChecked = (identify, multipleSelected) => ({
    type: actions.TOPOLOGYMGMT_MULTIPLE_SELECT,
    identify,
    multipleSelected
});

// column sort changed
export const columnSortChanged = (identify, orderBy, orderDisplayName, orderDirection) => ({
    type: actions.TOPOLOGYMGMT_SORT_CHANGED,
    identify,
    orderBy,
    orderDisplayName,
    orderDirection
});

// auto refresh init
export const autoRefreshInit = (identify, timer) => ({
    type: actions.AUTO_REFRESH_INIT,
    identify,
    timer
});

// click to change device and device type tab
export const changeTab = (identify, checkedTab, columnConfig) => ({
    type: actions.TOPOLOGYMGMT_CHANGETAB,
    checkedTab,
    identify,
    columnConfig,
    pageNo: 1,
    pageLimit: 10,
    arrayData: [],
    multipleSelected: [],
    selectDeviceId: "",
    showFloatTab: false
});

// delete device data
export const deleteDataItems = (identify, iotId) => ({
    type: actions.TOPOLOGYMGMT_DELETE_DEVICE,
    identify,
    iotId,
    refreshTopology: false
});

// delete device data success
export const deleteDeviceSuccess = identify => ({
    type: actions.TOPOLOGYMGMT_DELETE_DEVICE_SUCCESS,
    identify,
    refreshTopology: true
});

// delete device type data
export const deleteTypeDataItems = (identify, iotId, siteName) => ({
    type: actions.TOPOLOGYMGMT_DELETE_DEVICE_TYPE,
    identify,
    iotId,
    siteName,
    refreshTopology: false
});

// delete device type data success
export const deleteDeviceTypeSuccess = identify => ({
    type: actions.TOPOLOGYMGMT_DELETE_DEVICE_TYPE_SUCCESS,
    identify,
    refreshTopology: true
});

// delete sysconfig devicetype
export const deleteSysconfigDeviceType = (identify, deviceytypeId, siteName) => ({
    type: actions.TOPOLOGYMGMT_DELETE_SYSCONFIG_DEVICE_TYPE,
    identify,
    deviceytypeId,
    siteName
});

// get sysconfig devicetypes
export const getSysconfigDeviceTypes = (identify, siteName, dataType) => ({
    type: actions.TOPOLOGYMGMT_GET_SYSCONFIG_DEVICE_TYPE,
    identify,
    siteName,
    dataType
});

// get sysconfig devicetypes success
export const getSysconfigDeviceTypeSuccess = (identify, sysconfigDevicetypes, dataType) => ({
    type: actions.TOPOLOGYMGMT_GET_SYSCONFIG_DEVICE_TYPE_SUCCESS,
    identify,
    sysconfigDevicetypes,
    dataType
});

// get sysconfig basic type
export const getSysconfigBasicType = (identify, siteName, schemaType) => ({
    type: actions.TOPOLOGYMGMT_GET_SYSCONFIG_BASIC_TYPE,
    identify,
    siteName,
    schemaType
});

// get sysconfig basic type success
export const getSysconfigBasicTypeSuccess = (identify, dataType, configs) => ({
    type: actions.TOPOLOGYMGMT_GET_SYSCONFIG_BASIC_TYPE_SUCCESS,
    identify,
    dataType,
    configs
});

// get sysconfig device schema
export const getSysconfigDeviceSchema = (identify, siteName, schemaType) => ({
    type: actions.TOPOLOGYMGMT_GET_SYSCONFIG_DEVICE_SCHEMA,
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
    type: actions.TOPOLOGYMGMT_GET_SYSCONFIG_DEVICE_SCHEMA_SUCCESS,
    identify,
    sysconfigDeviceSchema,
    sysconfigDevicePropertySchema,
    schemaType
});

// get sysconfig device type schema
export const getSysconfigDeviceTypeSchema = (identify, siteName, schemaType) => ({
    type: actions.TOPOLOGYMGMT_GET_SYSCONFIG_DEVICE_TYPE_SCHEMA,
    identify,
    siteName,
    schemaType
});

// get sysconfig device type schema success
export const getSysconfigDeviceTypeSchemaSuccess = (identify, schemaType, configs) => ({
    type: actions.TOPOLOGYMGMT_GET_SYSCONFIG_DEVICE_TYPE_SCHEMA_SUCCESS,
    identify,
    schemaType,
    configs
});

// get sysconfig integration systems
export const getSysconfigIntegrationSystems = (identify, siteName, schemaType) => ({
    type: actions.TOPOLOGYMGMT_GET_SYSCONFIG_INTEGRATION_SYSTEM,
    identify,
    siteName,
    schemaType
});

// get sysconfig integration systems success
export const getSysconfigIntegrationSystemsSuccess = (identify, schemaType, configs) => ({
    type: actions.TOPOLOGYMGMT_GET_SYSCONFIG_INTEGRATION_SYSTEM_SUCCESS,
    identify,
    schemaType,
    configs
});
