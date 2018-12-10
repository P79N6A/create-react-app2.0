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
    TOPOGRAPHFLOATTAB_INIT,
    TOPOGRAPHFLOATTAB_SET,
    TOPOGRAPHFLOATTAB_CHANGETAB,
    TOPOGRAPHFLOATTAB_GETDETAIL,
    TOPOGRAPHFLOATTAB_GETDETAIL_SUCCESS,
    TOPOGRAPHFLOATTAB_GETALARM,
    TOPOGRAPHFLOATTAB_GETALARM_SUCCESS,
    TOPOGRAPHFLOATTAB_GETEVENT,
    TOPOGRAPHFLOATTAB_GETEVENT_SUCCESS,
    TOPOGRAPHFLOATTAB_DETAIL_SEARCH,
    TOPOGRAPHFLOATTAB_SET_TITLE,
    TOPOGRAPHFLOATTAB_SHOW_LOCATION_IN_MAP
} from "./actionTypes";

export const initTopoFloatTab = identify => ({
    type: TOPOGRAPHFLOATTAB_INIT,
    identify,
    deviceLocation: {}
});
export const setTopoFloatTab = (deviceId, resourcePath, defaultTab, identify) => ({
    type: TOPOGRAPHFLOATTAB_SET,
    getAlarmSuccess: false,
    getEventSuccess: false,
    getDetailSuccess: false,
    detailSearchWord: null,
    alarms: [],
    events: [],
    deviceId,
    resourcePath,
    defaultTab,
    identify
});

export const changeTab = (checkedTab, identify) => ({
    type: TOPOGRAPHFLOATTAB_CHANGETAB,
    checkedTab,
    identify
});

export const getDeviceDetail = (deviceId, identify) => ({
    type: TOPOGRAPHFLOATTAB_GETDETAIL,
    deviceId,
    identify
});

export const getTopoDetailSuccess = (arrayData, identify) => ({
    type: TOPOGRAPHFLOATTAB_GETDETAIL_SUCCESS,
    getDetailSuccess: true,
    arrayData,
    identify
});

export const getTopoAlarms = (iotId, pageNo, pageLimit, identify, orderOpt) => ({
    type: TOPOGRAPHFLOATTAB_GETALARM,
    getAlarmSuccess: false,
    iotId,
    pageNo,
    pageLimit,
    identify,
    orderOpt
});
export const getTopoAlarmsSuccess = (alarms, alarmPagination, identify, orderOpt) => ({
    type: TOPOGRAPHFLOATTAB_GETALARM_SUCCESS,
    alarms,
    alarmPagination,
    identify,
    orderOpt,
    getAlarmSuccess: true
});

export const getTopoEvents = (iotId, pageNo, pageLimit, identify, orderOpt) => ({
    type: TOPOGRAPHFLOATTAB_GETEVENT,
    getEventSuccess: false,
    iotId,
    pageNo,
    pageLimit,
    identify,
    orderOpt
});
export const getTopoEventsSuccess = (events, eventPagination, identify, orderOpt) => ({
    type: TOPOGRAPHFLOATTAB_GETEVENT_SUCCESS,
    events,
    eventPagination,
    identify,
    orderOpt,
    getEventSuccess: true
});

export const detailSearch = (identify, detailSearchWord) => ({
    type: TOPOGRAPHFLOATTAB_DETAIL_SEARCH,
    identify,
    detailSearchWord
});

export const setFloatTabTitle = (identify, currentTitle) => ({
    type: TOPOGRAPHFLOATTAB_SET_TITLE,
    identify,
    currentTitle
});

export const storeDeviceLocation = (identify, locateData) => ({
    type: TOPOGRAPHFLOATTAB_SHOW_LOCATION_IN_MAP,
    identify,
    locateData
});
