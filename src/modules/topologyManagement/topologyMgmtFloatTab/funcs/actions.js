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

export const initTopoFloatTab = identify => ({
    type: actions.TOPOMGMTFLOATTAB_INIT,
    identify
});
export const setTopoFloatTab = (deviceId, resourcePath, defaultTab, identify) => ({
    type: actions.TOPOMGMTFLOATTAB_SET,
    getAlarmSuccess: false,
    getEventSuccess: false,
    getDetailSuccess: false,
    searchTopoTypeSuccess: false,
    detailSearchWord: null,
    selectDevicetype: "",
    devicetypeId: "",
    activeStep: 0,
    addDeviceSuccess: false,
    shouldNext: true,
    // defaultIcon: "donut_small",
    alarms: [],
    events: [],
    deviceId,
    resourcePath,
    defaultTab,
    identify
});

export const changeTab = (checkedTab, identify) => ({
    type: actions.TOPOMGMTFLOATTAB_CHANGETAB,
    checkedTab,
    identify
});

export const getDeviceDetail = (deviceId, identify) => ({
    type: actions.TOPOMGMTFLOATTAB_GETDETAIL,
    deviceId,
    identify
});

export const getTopoDetailSuccess = (arrayData, identify) => ({
    type: actions.TOPOMGMTFLOATTAB_GETDETAIL_SUCCESS,
    getDetailSuccess: true,
    arrayData,
    identify
});

export const getTopoAlarms = (iotId, pageNo, pageLimit, identify, orderOpt) => ({
    type: actions.TOPOMGMTFLOATTAB_GETALARM,
    getAlarmSuccess: false,
    iotId,
    pageNo,
    pageLimit,
    identify,
    orderOpt
});
export const getTopoAlarmsSuccess = (alarms, alarmPagination, identify, orderOpt) => ({
    type: actions.TOPOMGMTFLOATTAB_GETALARM_SUCCESS,
    alarms,
    alarmPagination,
    identify,
    orderOpt,
    getAlarmSuccess: true
});

export const getTopoEvents = (iotId, pageNo, pageLimit, identify, orderOpt) => ({
    type: actions.TOPOMGMTFLOATTAB_GETEVENT,
    getEventSuccess: false,
    iotId,
    pageNo,
    pageLimit,
    identify,
    orderOpt
});
export const getTopoEventsSuccess = (events, eventPagination, identify, orderOpt) => ({
    type: actions.TOPOMGMTFLOATTAB_GETEVENT_SUCCESS,
    events,
    eventPagination,
    identify,
    orderOpt,
    getEventSuccess: true
});

export const detailSearch = (identify, detailSearchWord) => ({
    type: actions.TOPOMGMTFLOATTAB_DETAIL_SEARCH,
    identify,
    detailSearchWord
});

export const setFloatTabTitle = (identify, currentTitle) => ({
    type: actions.TOPOMGMTFLOATTAB_SET_TITLE,
    identify,
    currentTitle
});

export const topologyTypeRequest = identify => ({
    type: actions.TOPOMGMTFLOATTAB_SEARCH_TOPOTYPE,
    identify
});

export const getTopoTypeDataSuccess = (identify, topoTypeData) => ({
    type: actions.TOPOMGMTFLOATTAB_SEARCH_TOPOTYPE_SUCCESS,
    identify,
    topoTypeData,
    searchTopoTypeSuccess: true
});

export const selectDeviceTypeFunc = (identify, selectDevicetype, devicetypeId) => ({
    type: actions.TOPOMGMTFLOATTAB_SELECT_DEVICE_TYPE,
    identify,
    selectDevicetype,
    devicetypeId
});

export const topoSearchAddress = (identify, address, limit, pageno, clearLiveSearch) => ({
    type: actions.TOPOMGMTFLOATTAB_SEARCH_ADDRESS,
    identify,
    address,
    limit,
    pageno,
    clearLiveSearch
});

export const searchAddressSuccess = (identify, addressData, pagination, clearLiveSearch) => ({
    type: actions.TOPOMGMTFLOATTAB_SEARCH_ADDRESS_SUCCESS,
    identify,
    addressData,
    pagination,
    clearLiveSearch
});

export const addNewDevice = (
    identify,
    devicetypeId,
    deviceName,
    deviceDisplayName,
    deviceAddressId,
    deviceLocationId,
    parentDeviceId,
    properties
) => ({
    type: actions.TOPOMGMTFLOATTAB_ADD_DEVICE,
    identify,
    devicetypeId,
    deviceName,
    deviceDisplayName,
    deviceAddressId,
    deviceLocationId,
    parentDeviceId,
    properties,
    needRefreshTopology: false
});

export const addNewDeviceSuccess = identify => ({
    type: actions.TOPOMGMTFLOATTAB_ADD_DEVICE_SUCCESS,
    identify,
    addDeviceSuccess: true,
    needRefreshTopology: true
});

export const changeAvtiveStep = (identify, activeStep) => ({
    type: actions.TOPOMGMTFLOATTAB_CHANGE_AVTIVESTEP,
    identify,
    activeStep
});

export const getDeviceSchema = (identify, siteName, schemaType) => ({
    type: actions.TOPOMGMTFLOATTAB_GET_DEVICE_SCHEMA,
    identify,
    siteName,
    schemaType
});

export const getDeviceSchemaSuccess = (identify, schemaType, configs) => ({
    type: actions.TOPOMGMTFLOATTAB_GET_DEVICE_SCHEMA_SUCCESS,
    identify,
    schemaType,
    configs
});

export const getDeviceTypeSchema = (identify, siteName, schemaType) => ({
    type: actions.TOPOMGMTFLOATTAB_GET_DEVICE_TYPE_SCHEMA,
    identify,
    siteName,
    schemaType
});

export const getSysconfigBasicType = (identify, siteName, schemaType) => ({
    type: actions.TOPOMGMTFLOATTAB_GET_SYSCONFIG_BASIC_TYPE,
    identify,
    siteName,
    schemaType
});

export const getSysconfigBasicTypeSuccess = (identify, schemaType, configs) => ({
    type: actions.TOPOMGMTFLOATTAB_GET_SYSCONFIG_BASIC_TYPE_SUCCESS,
    identify,
    schemaType,
    configs
});

// add new device type
export const addNewDevicetype = (
    identify,
    defaultvalues,
    basicTypeInstances,
    additionalProperty,
    deviceProperty,
    propertyFromat,
    siteName,
    userid
) => ({
    type: actions.TOPOMGMTFLOATTAB_ADD_DEVICE_TYPE,
    identify,
    defaultvalues,
    basicTypeInstances,
    additionalProperty,
    deviceProperty,
    propertyFromat,
    siteName,
    userid,
    needRefreshTopology: false,
    addDevicetypeSuccess: false
});

export const addNewDevicetypeSuccess = identify => ({
    type: actions.TOPOMGMTFLOATTAB_ADD_DEVICE_TYPE_SUCCESS,
    identify,
    needRefreshTopology: true,
    addDevicetypeSuccess: true
});

export const addNewDevicetypeToSysconfig = (
    identify,
    devicetypeId,
    defaultvalues,
    basicTypeInstances,
    additionalProperty,
    deviceProperty,
    siteName,
    userid
) => ({
    type: actions.TOPOMGMTFLOATTAB_ADD_DEVICE_TYPE_SYSCONFIG,
    identify,
    devicetypeId,
    defaultvalues,
    basicTypeInstances,
    additionalProperty,
    deviceProperty,
    siteName,
    userid
});

export const addNewDevicetypeToSysconfigSuccess = identify => ({
    type: actions.TOPOMGMTFLOATTAB_ADD_DEVICE_TYPE_SYSCONFIG_SUCCESS,
    identify,
    needRefreshTopology: true,
    addDevicetypeSuccess: true
});

// choose icon
export const changeIcon = (icon, identify) => ({
    type: actions.TOPOMGMTFLOATTAB_CHOOSE_ICON,
    icon,
    identify
});

// get device type detail
export const getDeviceTypeDetail = (identify, selectDeviceId, siteName) => ({
    type: actions.TOPOMGMTFLOATTAB_GET_DEVICE_TYPE_DETAIL,
    identify,
    selectDeviceId,
    siteName
});

// get device type detail success
export const getDeviceTypeDetailSuccess = (identify, devicetypeDetail) => ({
    type: actions.TOPOMGMTFLOATTAB_GET_DEVICE_TYPE_DETAIL_SUCCESS,
    identify,
    devicetypeDetail
});

// get sysconfig device type detail success
export const getSysconfigDeviceTypeDetail = (identify, siteName, selectDeviceId) => ({
    type: actions.TOPOMGMTFLOATTAB_GET_SYSCONFIG_DEVICE_TYPE_DETAIL,
    identify,
    siteName,
    selectDeviceId
});

// get sysconfig device type detail success
export const getSysconfigDeviceTypeDetailSuccess = (identify, sysconfigDevicetypeDetail) => ({
    type: actions.TOPOMGMTFLOATTAB_GET_SYSCONFIG_DEVICE_TYPE_DETAIL_SUCCESS,
    identify,
    sysconfigDevicetypeDetail,
    needRefreshTopology: true
});

export const topoSearchLocation = (identify, location, limit, pageno, clearLiveSearch) => ({
    type: actions.TOPOMGMTFLOATTAB_SEARCH_LOCATION,
    identify,
    location,
    limit,
    pageno,
    clearLiveSearch
});

export const topoSearchLocationSuccess = (identify, locationData, pagination, clearLiveSearch) => ({
    type: actions.TOPOMGMTFLOATTAB_SEARCH_LOCATION_SUCCESS,
    identify,
    locationData,
    pagination,
    clearLiveSearch
});

// handle property change when add device type
export const handlePropertyChanged = (identify, propertyType, propertyData) => ({
    type: actions.TOPOMGMTFLOATTAB_PROPERTY_CHANGE,
    identify,
    propertyType,
    propertyData
});

// delete devicetype when add to sysconfig failed
export const deleteDevicetype = (identify, iotId) => ({
    type: actions.TOPOMGMTFLOATTAB_DELETE_DEVICE_TYPE,
    identify,
    iotId
});

// add device type property
export const addNewDevicetypeProperty = (identify, devicetypeId, propertyFromat, updateProperty, deleteProperty) => ({
    type: actions.TOPOMGMTFLOATTAB_ADD_DEVICE_TYPE_PROPERTY,
    identify,
    devicetypeId,
    propertyFromat,
    updateProperty,
    deleteProperty
});

// edit device detail
export const editDeviceDetail = (
    identify,
    deviceId,
    deviceDisplayName,
    devicetypeId,
    deviceapplication,
    locationObj,
    properties
) => ({
    type: actions.TOPOMGMTFLOATTAB_EDIT_DEVICE_DETAIL,
    identify,
    deviceId,
    deviceDisplayName,
    devicetypeId,
    deviceapplication,
    locationObj,
    properties,
    needRefreshTopology: false
});

// edit device detail success
export const editDeviceDetailSuccess = identify => ({
    type: actions.TOPOMGMTFLOATTAB_EDIT_DEVICE_DETAIL_SUCCESS,
    identify,
    needRefreshTopology: true
});

// add location
export const addLocation = (identify, locationName, coordinates) => ({
    type: actions.TOPOMGMTFLOATTAB_ADD_LOCATION,
    identify,
    locationName,
    coordinates,
    disableSave: false
});

// add location success
export const addLocationSuccess = (identify, location) => ({
    type: actions.TOPOMGMTFLOATTAB_ADD_LOCATION_SUCCESS,
    identify,
    location,
    disableSave: true
});

// edit device type
export const editDevicetype = (
    identify,
    defaultvalues,
    basicTypeInstances,
    additionalProperty,
    deviceProperty,
    propertyFromat,
    siteName,
    userid,
    selectDeviceId
) => ({
    type: actions.TOPOMGMTFLOATTAB_EDIT_DEVICE_TYPE,
    identify,
    defaultvalues,
    basicTypeInstances,
    additionalProperty,
    deviceProperty,
    propertyFromat,
    siteName,
    userid,
    selectDeviceId,
    needRefreshTopology: false
});

export const editDevicetypeSuccess = identify => ({
    type: actions.TOPOMGMTFLOATTAB_EDIT_DEVICE_TYPE_SUCCESS,
    identify,
    needRefreshTopology: true
});

// edit device type to sysconfig
export const editDevicetypeToSysconfig = (
    identify,
    devicetypeId,
    defaultvalues,
    basicTypeInstances,
    additionalProperty,
    deviceProperty,
    siteName,
    userid
) => ({
    type: actions.TOPOMGMTFLOATTAB_EDIT_DEVICE_TYPE_SYSCONFIG,
    identify,
    devicetypeId,
    defaultvalues,
    basicTypeInstances,
    additionalProperty,
    deviceProperty,
    siteName,
    userid
});

export const editDevicetypeToSysconfigSuccess = identify => ({
    type: actions.TOPOMGMTFLOATTAB_EDIT_DEVICE_TYPE_SYSCONFIG_SUCCESS,
    identify,
    needRefreshTopology: true
});

export const createApplicationRequest = (identify, application, createType, parentId) => ({
    type: actions.TOPOMGMTFLOATTAB_CREATE_APP,
    identify,
    createType,
    parentId,
    addressdisplayname: application.addressdisplayname,
    addressname: application.addressname,
    addresslocation: application.addresslocation,
    addAppSuccess: false
});

export const createApplicationSuccess = identify => ({
    type: actions.TOPOMGMTFLOATTAB_CREATE_APP_SUCCESS,
    identify,
    addAppSuccess: true
});

//get application schema
export const getTopologySchema = (identify, siteName, schemaType) => ({
    type: actions.TOPOMGMTFLOATTAB_GETAPP_SCHEMA_REQUEST,
    identify,
    siteName,
    schemaType
});

export const getTopologySchemaSuccess = (identify, schemaType, configs) => ({
    type: actions.TOPOMGMTFLOATTAB_GETAPP_SCHEMA_SUCCESS,
    identify,
    schemaType,
    configs
});

// add location
export const addAppLocation = (identify, locationName, coordinates) => ({
    type: actions.TOPOMGMTFLOATTAB_ADD_APP_LOCATION,
    identify,
    locationName,
    coordinates,
    disableAppSave: false
});

// add location success
export const addAppLocationSuccess = (identify, appLocation) => ({
    type: actions.TOPOMGMTFLOATTAB_ADD_APP_LOCATION_SUCCESS,
    identify,
    appLocation,
    disableAppSave: true
});

//uploadImage request
export const uploadImgRequest = (identify, formData) => ({
    type: actions.TOPOMGMTFLOATTAB_UPLOAD_IMAGE_REQUEST,
    identify,
    formData,
    disableSave: false
});

// uploadImage success
export const uploadImgSuccess = (identify, imageId) => ({
    type: actions.TOPOMGMTFLOATTAB_UPLOAD_IMAGE_SUCCESS,
    identify,
    imageId,
    disableSave: true
});

export const sendDeviceCommand = (identify, deviceId, changedValue) => ({
    type: actions.TOPOMGMTFLOATTAB_SEND_DEVICE_COMMAND,
    identify,
    deviceId,
    changedValue
});
