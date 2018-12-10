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
 * Created by KaiDi on 25/05/2018.
 */

import * as actions from "./actionTypes";
// import { pendingTask, begin, end } from "react-redux-spinner";

// export const changeLoadingStatus=(identify,isLoading)=>({ type: actions.CHANGE_LOADING_STATUS, isLoading, identify });

export const changeUseState = (identify, state) => ({ type: actions.CHANGE_USE_STATE, state, identify });

//topology
export const topologyRequest = (identify, appName, iotIds, noData) => ({
    type: actions.TOPOLOGY_REQUEST,
    appName,
    iotIds,
    noData,
    identify
});

export const topologySuccess = (identify, payload) => ({
    type: actions.TOPOLOGY_SUCCESS,
    payload,
    identify
});

export const topologyFailure = identify => ({ type: actions.TOPOLOGY_FAILURE, identify });

//property
export const deviceModelPropertyRequest = (identify, deviceModels) => ({
    type: actions.DEVICEMODEL_PROPERTY_REQUEST,
    identify,
    deviceModels
});
export const deviceModelPropertySuccess = (identify, payload) => ({
    type: actions.DEVICEMODEL_PROPERTY_SUCCESS,
    identify,
    payload
});

export const deviceModelPropertyFailure = identify => ({ type: actions.DEVICEMODEL_PROPERTY_FAILURE, identify });

//topologyStatic
export const topologyStaticRequest = (identify, resourcelist, applicationInfo) => ({
    type: actions.TOPOLOGY_STATIC_REQUEST,
    resourcelist,
    applicationInfo,
    identify
});

export const topologyStaticSuccess = (identify, payload) => ({
    type: actions.TOPOLOGY_STATIC_SUCCESS,
    payload,
    identify
});

export const topologyStaticFailure = identify => ({ type: actions.TOPOLOGY_STATIC_FAILURE, identify });

//event
export const alarmRequest = (identify, appName, iotIds, dateRange, readings, aggregation, interval, group) => ({
    type: actions.ALARM_REQUEST,
    identify,
    appName,
    iotIds,
    dateRange,
    readings,
    aggregation,
    interval,
    group
});

export const alarmSuccess = (identify, payload) => ({
    type: actions.ALARM_SUCCESS,
    payload,
    identify
});

export const alarmFailure = identify => ({ type: actions.ALARM_FAILURE, identify });

//alarm
export const eventRequest = (identify, appName, iotIds, dateRange, readings, aggregation, interval, group) => ({
    type: actions.EVENT_REQUEST,
    identify,
    appName,
    iotIds,
    dateRange,
    readings,
    aggregation,
    interval,
    group
});

export const eventSuccess = (identify, payload) => ({
    type: actions.EVENT_SUCCESS,
    identify,
    payload
});

export const eventFailure = identify => ({ type: actions.EVENT_FAILURE, identify });

//servicelist
export const getServiceListRequest = (identify, sitename) => ({
    type: actions.GET_KPI_LIST_REQUEST,
    identify,
    sitename
});
export const getServiceListSuccess = (identify, serviceList) => ({
    type: actions.GET_KPI_LIST_SUCCESS,
    identify,
    serviceList
});

export const getServiceListFailure = identify => ({ type: actions.GET_KPI_LIST_FAILURE, identify });

//kpi
export const kpiPreviewRequest = (identify, serviceType, format, kpiQuery, sitename) => ({
    type: actions.KPI_PREVIEW_REQUEST,
    identify,
    serviceType,
    format,
    kpiQuery,
    sitename
});

export const kpiPreviewSuccess = (identify, data, keyList) => ({
    type: actions.KPI_PREVIEW_SUCCESS,
    identify,
    data,
    keyList
});

export const kpiPreviewFailure = identify => ({ type: actions.KPI_PREVIEW_FAILURE, identify });

export const kpiServiceRequest = (identify, kpiName, sitename) => ({
    type: actions.KPI_SERVICE_REQUEST,
    identify,
    kpiName,
    sitename
});

export const kpiServiceSuccess = (identify, data, keyList) => ({
    type: actions.KPI_SERVICE_SUCCESS,
    identify,
    data,
    keyList
});

export const kpiServiceFailure = identify => ({ type: actions.KPI_SERVICE_FAILURE, identify });

//for query builder
export const changeProperty = (identify, object) => ({
    type: actions.CHANGE_PROPERTY,
    identify,
    object
});
export const applyDefaultProps = (identify, props) => ({
    type: actions.APPLY_DEFAULT_PROPERTY,
    identify,
    props
});

export const exportEventAlarmDataRequest = (identify, source, appName, columninfos, iotIds, dateRange, readings) => ({
    type: actions.EXPORT_EVENT_ALARM_DATA_REQUEST,
    identify,
    source,
    appName,
    columninfos,
    iotIds,
    dateRange,
    readings
});

export const exportEventAlarmDataSuccess = (identify, data) => ({
    type: actions.EXPORT_EVENT_ALARM_DATA_SUCCESS,
    identify,
    data
});

export const exportEventAlarmDataFailure = identify => ({ type: actions.EXPORT_EVENT_ALARM_DATA_FAILURE, identify });

export const autoRefreshInit = (identify, timer) => ({
    type: actions.AUTO_REFRESH_INIT,
    identify,
    timer
});
