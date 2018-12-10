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
 * Created by Wangrui on 25/05/2018.
 */
import { 
    TIMELINE_SAVE_STREAMING_DATA, 
    TIMELINE_ALARM_SEARCH, 
    TIMELINE_ALARM_SEARCH_SUCCESS, 
    TIMELINE_FLOATTAB_CLOSE, 
    TIMELINE_FLOATTAB_OPEN, 
    TIMELINE_CCMS_CONTROL, 
    TIMELINE_EDITOR_CONTROL_PROPS, 
    TIMELINE_SHOW_LOCATION_IN_MAP, 
    TIMELINE_CHANGE_STATE_REQUEST, 
    TIMELINE_CHANGE_STATE_REQUEST_SUCCESS,
    TIMELINE_ALARM_EXPORT,
    TIMELINE_ALARM_EXPORT_SUCCESS
} from "./actionTypes";
// export const initAllRedux = identify => ({
//     type: actions.TIMELINE_INIT_ALL_REDUX,
//     identify
// });

//save stream data
export const saveStreamingData = (data, identify) => ({
    type: TIMELINE_SAVE_STREAMING_DATA,
    data,
    identify
});

export const alarmSearchTimeline = (startTime, endTime, severityConfig, applicationid, identify) => ({
    type: TIMELINE_ALARM_SEARCH,
    startTime,
    endTime,
    severityConfig,
    applicationid, 
    identify
});
export const alarmSearchSuccess = (data, identify) => ({
    type: TIMELINE_ALARM_SEARCH_SUCCESS,
    data,
    identify
});
export const closeFloatTab = identify => ({
    type: TIMELINE_FLOATTAB_CLOSE,
    showFloatTab: false,
    identify
});
export const openFloatTab = (selectType, details, identify) => ({
    type: TIMELINE_FLOATTAB_OPEN,
    showFloatTab: true,
    selectType,
    details,
    identify
});
export const ccmsControl = identify => ({
    type: TIMELINE_CCMS_CONTROL,
    identify
});
export const editorControlProps = (identify, editorState) => ({
    type: TIMELINE_EDITOR_CONTROL_PROPS,
    identify,
    editorState
});
export const storeDeviceLocation = (identify, locateData) => ({
    type: TIMELINE_SHOW_LOCATION_IN_MAP,
    identify,
    locateData
});
export const changeStateRequest = (id, owner, state, identify) => ({
    type: TIMELINE_CHANGE_STATE_REQUEST,
    id, owner, state, identify
});
export const changeStateRequestSuccess = (arrayData, identify) => ({
    type: TIMELINE_CHANGE_STATE_REQUEST_SUCCESS,
    arrayData, identify
});
export const alarmExport = (filterConfig, identify) => ({
    type: TIMELINE_ALARM_EXPORT,
    filterConfig, identify
});
export const exportAlarmDataSuccess = (alarm, identify) => ({
    type: TIMELINE_ALARM_EXPORT_SUCCESS,
    alarm, identify
});

