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
 * Created by SongCheng on 20/05/2018.
 */
export const EVENT_REQUEST_SUCCESS = "EVENT/REQUEST_SUCCESS";
export const EVENT_REQUEST_FAILED = "EVENT/REQUEST_FAILED";

export const EVENT_DRAWER_TOGGLE = "EVENT/DRAWER_TOGGLE";

export const EVENT_SEARCHTIME_SAVE = "EVENT/SEARCHTIME_SAVE";
export const EVENT_REQUEST_ITEMSSEARCH = "EVENT/REQUEST_ITEMSSEARCH";
export const EVENT_ITEMSDATA_SAVE = "EVENT/ITEMSDATA_SAVE";
export const EVENT_GETDETAIL_REQUEST = "EVENT/GETDETAIL_REQUEST";
export const EVENT_GETDETAIL_REQUEST_SUCCESS = "EVENT/GETDETAIL_REQUEST_SUCCESS";
export const EVENT_SELECTCOLUMNS_SAVE = "EVENT/SELECTCOLUMNS_SAVE";

export const EVENT_CCMS_ACTION = "EVENT/CCMS_ACTION";
export const EVENT_EDITOR_CONTROL_PROPS = "EVENT/EDITOR_CONTROL_PROPS";

export const EVENT_SORTERDATA_SAVE = "EVENT/SORTERDATA_SAVE";

//for Refresh
export const RECEIVE_WEBSOCKET_MESSAGE = "ISC/RECIEVED_MESSAGE";
export const REFRESH_ACTION = "ISC/REFRESH_ACTION";

//for export
export const EXPORT_EVENT_DATA_REQUEST = "EVENT/EXPORT_EVENT_DATA_REQUEST";
export const EXPORT_EVENT_DATA_SUCCESS = "EVENT/EXPORT_EVENT_DATA_SUCCESS";
export const EXPORT_EVENT_DATA_FAILURE = "EVENT/EXPORT_EVENT_DATA_FAILURE";

//
export const EVENT_CHANGE_DISPLAY_TYPE = "EVENT/CHANGE_DISPLAY_TYPE";

//save pageLimit
export const EVENT_SAVE_ROWSPERPAGE = "EVENT/SAVE_ROWSPERPAGE";

//save streaming data
export const EVENT_SAVE_STREAMING_DATA = "EVENT/SAVE_STREAMING_DATA";

//get stream data
export const EVENT_STREAM_REQUEST = "EVENT/STREAM_REQUEST";
export const EVENT_STREAM_REQUEST_SUCCESS = "EVENT/STREAM_REQUEST_SUCCESS";

//save sort result
export const EVENT_SAVE_SORTRESULT = "EVENT/SAVE_SORTRESULT";

//get parameter name
export const EVENT_PARAMETERS_REQUEST = "EVENT/PARAMETERS_REQUEST";
export const EVENT_PARAMETERS_REQUEST_SUCCESS = "EVENT/PARAMETERS_REQUEST_SUCCESS";

//EVENT_CLOSE_WS_LOCK
export const EVENT_CLOSE_WS_LOCK = "EVENT/CLOSE_WS_LOCK";
