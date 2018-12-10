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
 * Modified by DengXiaoLong on 25/06/2018.
 */

import * as actions from "./actionTypes";

export const mapGetAlarmList = (timeArr, conditions, parameters, identify) => ({
    type: actions.MAP_ALARM_SEARCH,
    timeArr,
    conditions,
    parameters,
    identify
});

export const mapGetAllData = (data, identify) => ({
    type: actions.MAP_GET_All_DATA,
    data,
    identify
});

export const mapDataRequestSuccess = (tempData, parameters, identify) => ({
    type: actions.MAP_REQUEST_SUCCESS, 
    tempData,
    parameters,
    identify
});
export const mapDeviceDataRequestSuccess = (tempData, deviceTypeData, parameters, identify) => ({
    type: actions.MAP_DEVICE_DATA_REQUEST_SUCCESS, 
    tempData,
    deviceTypeData,
    parameters,
    identify
});

export const mapDeviceChangeIconAndColor = (tempData, parameters, identify) => ({
    type: actions.MAP_DEVICE_CHANGE_ICON_AND_COLOR,
    tempData,
    parameters,
    identify
});

export const changeTitle = (title, identify) => ({
    type: actions.MAP_CHANGE_TITLE,
    title,
    identify
});

// choose icon
export const changeIcon = (icon, identify) => ({
    type: actions.MAP_CHOOSE_ICON,
    icon,
    identify
});

// change icon color
export const changeIconColor = (iconColor, identify) => ({
    type: actions.MAP_CHANGE_ICON_COLOR,
    iconColor,
    identify,
}); 

// get address
export const mapGetAddress = (value, identify) => ({
    type: actions.MAP_GET_ADDRESS,
    value,
    identify,
});

// map address get success
export const mapGetAddressSuccess = (addressData, parameters, identify) => ({
    type: actions.MAP_GET_ADDRESS_SUCCESS,
    addressData,
    parameters,
    identify
});

// map get info by address topology ids
export const mapGetInfoByAddress = (iotIds, parameters, identify) => ({
    type: actions.MAP_GET_INFO_BY_ADDRESS,
    iotIds,
    parameters,
    identify
});

// clear info
export const clearMapInfo = (tempData, deviceTypeData, parameters,identify) =>({
    type: actions.MAP_INFO_ADDRESS_CLEAR,
    tempData,
    deviceTypeData,
    parameters,
    identify
});

// get alarm type severity status
export const mapGetAllKindsOfData = (alarmCondition, identify) => ({
    type: actions.MAP_ALARM_TYPE_DATA,
    alarmCondition,
    identify
});

// get alarm type data success
export const mapGetAlarmTypeRequestSuccess = (typeData, identify) => ({
    type: actions.MAP_ALARM_TYPE_DATA_REQUEST_SUCCESS,
    typeData,
    identify
});

// get alarm type data success
export const mapGetAlarmSeverityRequestSuccess = (severityData, identify) => ({
    type: actions.MAP_ALARM_SEVERITY_DATA_REQUEST_SUCCESS,
    severityData,
    identify
});

// get alarm type data success
export const mapGetAlarmStateRequestSuccess = (stateData, identify) => ({
    type: actions.MAP_ALARM_STATE_DATA_REQUEST_SUCCESS,
    stateData,
    identify
});

// the loading status change
export const mapChangeLoadingStatus = (loading, identify) => ({
    type: actions.MAP_LAONDING_STATUS,
    loading,
    identify
});

// the editer status change
export const mapChangeEditerStatus = (editer, identify) => ({
    type: actions.MAP_EDITER_STATUS,
    editer,
    identify
});

// export alarm locations to excel
export const mapAlarmExportExcel = (filterData, pagesize, identify) => ({
    type: actions.MAP_ALARM_EXPORT_EXCEL,
    filterData,
    pagesize,
    identify
});

// export to excel data success
export const mapExportExcelSuccess = (exportData, identify) => ({
    type: actions.MAP_EXPORT_EXCEL_SUCCESS,
    exportData,
    identify
});

// clear basic map data
export const clearBasicMapData = (basicMapMessage) => ({
    type: actions.MAPP_CLEAR_DATA,
    basicMapMessage
});

// save map draw data for topology
export const saveMapDrawData = (mapDrawData, identify) => ({
    type: actions.MAP_DRAW_INFOMATION,
    mapDrawData,
    identify
});