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
    type: actions.APPLICATION_FLOATTAB_INIT,
    identify
});
export const setTopoFloatTab = (deviceId, resourcePath, defaultTab, identify) => ({
    type: actions.APPLICATION_FLOATTAB_SET,
    getAlarmSuccess: false,
    getEventSuccess: false,
    getDetailSuccess: false,
    detailSearchWord: null,
    imageId: "",
    alarms: [],
    events: [],
    deviceId,
    resourcePath,
    defaultTab,
    identify
});

export const changeTab = (checkedTab, identify) => ({
    type: actions.APPLICATION_FLOATTAB_CHANGETAB,
    checkedTab,
    identify
});

//get application detail request
export const getAddressDetail = (identify, applicationId, applicationType) => ({
    type: actions.APPLICATION_FLOATTAB_GETADDRESS_DETAIL,
    applicationId,
    applicationType,
    identify
});

// get application detail success
export const getAddressDetailSuccess = (identify, addressDetail) => ({
    type: actions.APPLICATION_FLOATTAB_GETADDRESS_DETAIL_SUCCESS,
    identify,
    addressDetail
});

export const getDeviceDetailRequest = (identify, deviceId) => ({
    type: actions.APPLICATION_GET_DEVICE_DETAIL_REQUEST,
    deviceId,
    identify
});

// get application detail success
export const getDeviceDetailSuccess = (identify, deviceDetail) => ({
    type: actions.APPLICATION_GET_DEVICE_DETAIL_SUCCESS,
    identify,
    deviceDetail
});

export const getDataFailure = (identify, action) => ({
    type: actions.APPLICATION_GETDATA_FAILURE,
    identify,
    ...action
});

export const detailSearch = (identify, detailSearchWord) => ({
    type: actions.APPLICATION_FLOATTAB_DETAIL_SEARCH,
    identify,
    detailSearchWord
});

export const setFloatTabTitle = (identify, currentTitle) => ({
    type: actions.APPLICATION_FLOATTAB_SET_TITLE,
    identify,
    currentTitle
});

//get application schema
export const getTopologySchema = (identify, siteName, schemaType) => ({
    type: actions.FLOATTAB_GETAPP_SCHEMA_REQUEST,
    identify,
    siteName,
    schemaType
});

export const getTopologySchemaSuccess = (identify, schemaType, configs) => ({
    type: actions.FLOATTAB_GETAPP_SCHEMA_SUCCESS,
    identify,
    schemaType,
    configs
});

export const createApplicationRequest = (identify, application, createType, parentId) => ({
    type: actions.APPLICATION_FLOATTAB_CREATE_APP,
    identify,
    createType,
    parentId,
    icon: application.addressicon,
    displayname: application.addressdisplayname,
    name: application.addressname,
    locationId: application.locationId,
    image: application.addressimage,
    needRefreshTopology: false
});

export const createApplicationSuccess = identify => ({
    type: actions.APPLICATION_FLOATTAB_CREATE_APP_SUCCESS,
    identify,
    needRefreshTopology: true
});

export const updateApplicationRequest = (identify, addressType, id, application, removeLoc) => ({
    type: actions.APPLICATION_FLOATTAB_UPDATE_APP,
    identify,
    addressType,
    id,
    icon: application.addressicon,
    displayname: application.addressdisplayname,
    name: application.addressname,
    newLoc: application.locationId,
    oldLoc: removeLoc,
    image: application.addressimage,
    needRefreshTopology: false
});

export const updateApplicationSuccess = identify => ({
    type: actions.APPLICATION_FLOATTAB_UPDATE_APP_SUCCESS,
    identify,
    needRefreshTopology: true
});

// add location
export const addLocationRequest = (identify, locationName, coordinates) => ({
    type: actions.APPLICATION_CREATE_LOCATION_REQUEST,
    identify,
    locationName,
    coordinates,
    disableSave: false
});

// add location success
export const addLocationSuccess = (identify, location) => ({
    type: actions.APPLICATION_CREATE_LOCATION_SUCCESS,
    identify,
    location,
    disableSave: true
});

//uploadImage request
export const uploadImgRequest = (identify, formData) => ({
    type: actions.APPLICATION_UPLOAD_IMAGE_REQUEST,
    identify,
    formData,
    disableSave: false
});

// uploadImage success
export const uploadImgSuccess = (identify, imageId) => ({
    type: actions.APPLICATION_UPLOAD_IMAGE_SUCCESS,
    identify,
    imageId,
    disableSave: true
});
