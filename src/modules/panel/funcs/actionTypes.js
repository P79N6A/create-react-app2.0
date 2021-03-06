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
 * Modified by DengXiaoLong on 25/05/2018.
 */

export const PANEL_REQUEST_SUCCESS = "PANEL/REQUEST_SUCCESS";
// for panel
export const PANEL_CHANGE_COUNT = "PANEL/PANEL_CHANGE_COUNT";
export const PANEL_REQUEST_DATA_SUCCESS = "PANEL/PANEL_REQUEST_DATA_SUCCESS";
export const PANEL_DEVICE_READING_REQUEST_DATA_SUCCESS = "PANEL/PANEL_DEVICE_READING_REQUEST_DATA_SUCCESS";
export const PANEL_DEVICE_READING_DATA_CLEAR = "PANEL/PANEL_DEVICE_READING_DATA_CLEAR";
export const PANEL_DEVICE_READING_AGGREAGTION_DATA_SUCCESS = "PANEL/PANEL_DEVICE_READING_AGGREAGTION_DATA_SUCCESS";
export const PANEL_LOADING_STATUS = "PANEL/PANEL_LOADING_STATUS";

export const PANEL_GET_INIT_DATA = "PANEL/PANEL_GET_INIT_DATA";
export const PANEL_RESET_ALL_STATES = "PANEL/PANEL_RESET_ALL_STATES";
export const PANEL_SET_INIT_FOR_PANEL = "PANEL/PANEL_SET_INIT_FOR_PANEL";

// common types
export const PANEL_CHANGE_BACKGROUND_COLOR = "PANEL/PANEL_CHANGE_BACKGROUND_COLOR";
export const PANEL_CHANGE_ICON_COLOR = "PANEL/PANEL_CHANGE_ICON_COLOR";
export const PANEL_CHANGE_TITLE = "PANEL/CHANGE_TITLE";
export const PANEL_CHOOSE_ICON = "PANEL/PANEL_CHOOSE_ICON";
export const PANEL_CHANGE_COUNT_COLOR = "PANEL/PANEL_CHANGE_COUNT_COLOR";
export const PANEL_COUNT_SIZE_CONTROL = "PANEL/PANEL_COUNT_SIZE_CONTROL";
export const PANEL_TITLE_SIZE_CONTROL = "PANEL/PANEL_TITLE_SIZE_CONTROL";
export const PANEL_ICON_SIZE_CONTROL = "PANEL/PANEL_ICON_SIZE_CONTROL";
export const PANEL_CHANGE_TITLE_COLOR = "PANEL/PANEL_CHANGE_TITLE_COLOR";
export const PANEL_CHANGE_PARAMETER_ONE_SIZE = "PANEL/PANEL_CHANGE_PARAMETER_ONE_SIZE";
export const PANEL_CHANGE_PARAMETER_ONE_COLOR = "PANEL/PANEL_CHANGE_PARAMETER_ONE_COLOR";
export const PANEL_CHANGE_PARAMETER_TWO_SIZE = "PANEL/PANEL_CHANGE_PARAMETER_TWO_SIZE";
export const PANEL_CHANGE_PARAMETER_TWO_COLOR = "PANEL/PANEL_CHANGE_PARAMETER_TWO_COLOR";
export const PANEL_DURATION_CHANGE_STATUS = "PANEL/PANEL_DURATION_CHANGE_STATUS";
export const PANEL_DURATION_CHANGE_TIME = "PANEL/PANEL_DURATION_CHANGE_TIME";

// export data
export const PANEL_EXPORT_ALARM_TO_EXCEL = "PANEL/PANEL_EXPORT_ALARM_TO_EXCEL";
export const PANEL_EXPORT_EVENT_TO_EXCEL = "PANEL/PANEL_EXPORT_EVENT_TO_EXCEL";
export const PANEL_EXPORT_TO_EXCEL_SUCCESS = "PANEL/PANEL_EXPORT_TO_EXCEL_SUCCESS";
export const PANEL_EXPORT_DATA_CLEAR = "PANEL/PANEL_EXPORT_DATA_CLEAR";

// device
export const PANEL_GET_TOPOLOGY_LIST = "PANEL/PANEL_GET_TOPOLOGY_LIST";
export const PANEL_GET_TOPOLOGY_LIST_VALUE = "PANEL/PANEL_GET_TOPOLOGY_LIST_VALUE";
export const PANEL_GET_TOPOLOGY_LIST_SUCCESS = "PANEL/PANEL_GET_TOPOLOGY_LIST_SUCCESS";

export const PANEL_GET_ALARM_LIST = "PANEL/PANEL_GET_ALARM_LIST";
export const PANEL_GET_ALARM_LIST_SUCCESS = "PANEL/PANEL_GET_ALARM_LIST_SUCCESS";

export const PANEL_GET_DEVICE_LIST = "PANEL/PANEL_GET_DEVICE_LIST";
export const PANEL_DEVICE_FILTER = "PANEL/PANEL_DEVICE_FILTER";
export const PANEL_GET_DEVICE_LIST_SUCCESS = "PANEL/PANEL_GET_DEVICE_LIST_SUCCESS";

export const PANEL_GET_DEVICE_READING_LIST = "PANEL/PANEL_GET_DEVICE_READING_LIST";

export const PANEL_GET_EVENT_LIST = "PANEL/PANEL_GET_EVENT_LIST";
export const PANEL_CLEAR_PARAMETERS = "PANEL/PANEL_CLEAR_PARAMETERS";
export const PANEL_CLEAR_TEMP_DATA = "PANEL/PANEL_CLEAR_TEMP_DATA";
export const PANEL_EDITER_STATUS = "PANEL/PANEL_EDITER_STATUS";
export const PANEL_GET_EVENT_LIST_SUCCESS = "PANEL/PANEL_GET_EVENT_LIST_SUCCESS";

// this type belongs to ccms
export const PANEL_GET_All_DATA = "PANEL/PANEL_GET_All_DATA";

// this type belongs to websocket
export const RECEIVE_WEBSOCKET_MESSAGE = "ISC/RECIEVED_MESSAGE";
export const REFRESH_ACTION = "ISC/REFRESH_ACTION";
export const AUTO_REFRESH_INIT = "ISC/AUTO_REFRESH_INIT";
export const ADD_WS_DATA = "PANEL/ADD_WS_DATA";
