/*
 *  =========================================================================
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
 * Created by Wangrui on 25/05/2018.
 * Modified by DengXiaoLong on 25/05/2018.
 */
import * as actions from "./actionTypes";

// get init data
export const getInitData = () => ({
    type: actions.PANEL_GET_INIT_DATA,
});


// change panel background color
export const changeBgColor = (backgroundColor, identify) => ({
    type: actions.PANEL_CHANGE_BACKGROUND_COLOR,
    backgroundColor,
    identify,
});

// change panel count color
export const changeCountColor = (countColor, identify) => ({
    type: actions.PANEL_CHANGE_COUNT_COLOR,
    countColor,
    identify,
});

// change icon color
export const changeIconColor = (iconColor, identify) => ({
    type: actions.PANEL_CHANGE_ICON_COLOR,
    iconColor,
    identify,
});

// change panel title
export const changeTitle = (title, identify) => ({
    type: actions.PANEL_CHANGE_TITLE,
    title,
    identify,
});

// get alarm list data
export const getAlarmListData = (times, types, parameters, identify) => ({
    type: actions.PANEL_GET_ALARM_LIST,
    times,
    types,
    parameters,
    identify,
});

// get topology data list
export const getTopologyListData = (iotId, parameters, identify) => ({
    type: actions.PANEL_GET_TOPOLOGY_LIST,
    iotId,
    parameters,
    identify,
});

// get topology value
export const getTopologyListValue = (iotId, parameters, choseValue, units, identify) => ({
    type: actions.PANEL_GET_TOPOLOGY_LIST_VALUE,
    iotId,
    parameters,
    choseValue,
    units,
    identify,
});

// get topology data list success
export const getTopologyListDataSuccess = (topologyTemp, parameters, identify) => ({
    type: actions.PANEL_GET_TOPOLOGY_LIST_SUCCESS,
    topologyTemp,
    parameters,
    identify,
});

// get event list data
export const getEventListData = (timeArr, types, parameters, identify) => ({
    type: actions.PANEL_GET_EVENT_LIST,
    timeArr,
    types,
    parameters,
    identify,
});

// get device list data
export const getDeviceListData = (deviceType, parameters, identify) => ({
    type: actions.PANEL_GET_DEVICE_LIST,
    deviceType,
    parameters,
    identify,
});

// get device reading list data
export const getDeviceReadingData = (iotId, aggregation, parameters, identify) => ({
    type: actions.PANEL_GET_DEVICE_READING_LIST,
    iotId,
    aggregation,
    parameters,
    identify
});

// choose icon
export const changeIcon = (icon, identify) => ({
    type: actions.PANEL_CHOOSE_ICON,
    icon,
    identify
});


// set init parameters for panel
export const setInitForPanel = (selfParameters, identify) => ({
    type: actions.PANEL_SET_INIT_FOR_PANEL,
    selfParameters,
    identify,
});

// change count
export const changeCount = (count, parameters, identify) => ({
    type: actions.PANEL_CHANGE_COUNT,
    count,
    parameters,
    identify,
});
// data request success
export const dataRequestSuccess = (tempData, count, parameters, identify) => ({
    type: actions.PANEL_REQUEST_DATA_SUCCESS,
    tempData,
    count,
    parameters,
    identify,
});
// data request success
export const dataDeviceReadingRequestSuccess = (tempData, parameters, identify) => ({
    type: actions.PANEL_DEVICE_READING_REQUEST_DATA_SUCCESS,
    tempData,
    parameters,
    identify,
});
// data request success
export const dataDeviceReadingAggreagtionRequestSuccess = (deviceReadingData, deviceReadingDataWs, parameters, identify) => ({
    type: actions.PANEL_DEVICE_READING_AGGREAGTION_DATA_SUCCESS,
    deviceReadingData,
    deviceReadingDataWs,
    parameters,
    identify,
});
// panel get all data
export const panelGetAllData = (data, identify) => {
    return {
        type: actions.PANEL_GET_All_DATA,
        data,
        identify
    };
};

// panel chlear parameters
export const panelClearParameters = (parameters, identify) => {
    return {
        type: actions.PANEL_CLEAR_PARAMETERS,
        parameters,
        identify
    };
};

// panel font size control
export const panelTitleSizeControl = (titleSizeValue, identify) => {
    return {
        type: actions.PANEL_TITLE_SIZE_CONTROL,
        titleSizeValue,
        identify
    };
};

// panel font size control
export const panelCountSizeControl = (countSizeValue, identify) => {
    return {
        type: actions.PANEL_COUNT_SIZE_CONTROL,
        countSizeValue,
        identify
    };
};

// panel font color
export const panelSetTitleColor = (titleColor, identify) => {
    return {
        type: actions.PANEL_CHANGE_TITLE_COLOR,
        titleColor,
        identify
    };
};

// panel icon size control
export const panelIconSizeControl = (iconSizeValue, identify) => {
    return {
        type: actions.PANEL_ICON_SIZE_CONTROL,
        iconSizeValue,
        identify
    };
};

// panel parameter one size control
export const panelParameterOneSizeControl = (parameterOneSizeValue, identify) => {
    return {
        type: actions.PANEL_CHANGE_PARAMETER_ONE_SIZE,
        parameterOneSizeValue,
        identify
    };
};

// panel parameter one size control
export const panelParameterOneColorControl = (parameterOneColorValue, identify) => {
    return {
        type: actions.PANEL_CHANGE_PARAMETER_ONE_COLOR,
        parameterOneColorValue,
        identify
    };
};

// panel parameter two size control
export const panelParameterTwoSizeControl = (parameterTwoSizeValue, identify) => {
    return {
        type: actions.PANEL_CHANGE_PARAMETER_TWO_SIZE,
        parameterTwoSizeValue,
        identify
    };
};

// panel parameter two size control
export const panelParameterTwoColorControl = (parameterTwoColorValue, identify) => {
    return {
        type: actions.PANEL_CHANGE_PARAMETER_TWO_COLOR,
        parameterTwoColorValue,
        identify
    };
};

// panel change loading status
export const panelChangeLoadingStatus = (loading, identify) => ({
    type: actions.PANEL_LOADING_STATUS,
    loading,
    identify
});

// panel clear tempdata
export const panelClearTempData = (tempData, identify) => ({
    type: actions.PANEL_CLEAR_TEMP_DATA,
    tempData,
    identify
});

// panel editer status
export const panelEditerStatus = (editer, identify) => ({
    type: actions.PANEL_EDITER_STATUS,
    editer,
    identify
});

// panel export alarm data
export const panelExportAlarmExcel = (filterData, pagesize, identify) => ({
    type: actions.PANEL_EXPORT_ALARM_TO_EXCEL,
    filterData,
    pagesize,
    identify
});

// panel export event data
export const panelExportEventExcel = (filterData, pagesize, identify) => ({
    type: actions.PANEL_EXPORT_EVENT_TO_EXCEL,
    filterData,
    pagesize,
    identify
});

// panel export success
export const panelExportExcelSuccess = (exportData, identify) => ({
    type: actions.PANEL_EXPORT_TO_EXCEL_SUCCESS,
    exportData,
    identify
});

// panel export data clear
export const panelExportDataClear = (exportData, identify) => ({
    type: actions.PANEL_EXPORT_DATA_CLEAR,
    exportData,
    identify
});

export const addWsData = (wsMessage, identify) => ({
    type: actions.ADD_WS_DATA,
    wsMessage,
    identify
});

// change the duration switch status
export const panelChangeDurationStatus = (durationSwitch, identify) => ({
    type: actions.PANEL_DURATION_CHANGE_STATUS,
    durationSwitch,
    identify
});

// change the duration switch time
export const panelChangeDurationTime = (durationTime, identify) => ({
    type: actions.PANEL_DURATION_CHANGE_TIME,
    durationTime,
    identify
});
