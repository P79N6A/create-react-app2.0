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
    TOPOFLOATTAB_INIT,
    TOPOFLOATTAB_SET,
    TOPOFLOATTAB_CHANGETAB,
    TOPOFLOATTAB_GETDETAIL_SUCCESS,
    TOPOFLOATTAB_GETALARM,
    TOPOFLOATTAB_GETALARM_SUCCESS,
    TOPOFLOATTAB_GETEVENT,
    TOPOFLOATTAB_GETEVENT_SUCCESS,
    TOPOFLOATTAB_DETAIL_SEARCH,
    TOPOFLOATTAB_SET_TITLE,
    TOPOFLOATTAB_SHOW_LOCATION_IN_MAP
} from "./actionTypes";
import createReducer from "commons/utils/reducerHelper";

const initialState = [];

const topology = {
    [TOPOFLOATTAB_INIT](state, action) {
        let key = action.identify;
        return {
            ...state,
            deviceLocation: action.locateData,
            [key]: {
                identify: key
            }
        };
    },
    [TOPOFLOATTAB_SET](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                deviceId: action.deviceId,
                resourcePath: action.resourcePath,
                defaultTab: action.defaultTab,
                currentTab: action.defaultTab,
                getAlarmSuccess: action.getAlarmSuccess,
                getEventSuccess: action.getEventSuccess,
                getDetailSuccess: action.getDetailSuccess,
                detailSearchWord: action.detailSearchWord,
                alarms: action.alarms,
                events: action.events
            }
        };
    },
    [TOPOFLOATTAB_CHANGETAB](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                currentTab: action.checkedTab
            }
        };
    },
    [TOPOFLOATTAB_GETDETAIL_SUCCESS](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                deviceData: action.arrayData,
                getDetailSuccess: action.getDetailSuccess
            }
        };
    },
    [TOPOFLOATTAB_GETALARM](state, action) {
        return { ...state, getAlarmSuccess: action.getAlarmSuccess };
    },
    [TOPOFLOATTAB_GETALARM_SUCCESS](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                alarms: action.alarms,
                getAlarmSuccess: action.getAlarmSuccess,
                alarmPagination: action.alarmPagination,
                alarmOrder: action.orderOpt.alarmOrderBy,
                alarmOrderDisplayName: action.orderOpt.alarmOrderDisplayName,
                alarmOrderDirection: action.orderOpt.alarmOrderDirection
            }
        };
    },
    [TOPOFLOATTAB_GETEVENT](state, action) {
        return { ...state, getEventSuccess: action.getEventSuccess };
    },
    [TOPOFLOATTAB_GETEVENT_SUCCESS](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                events: action.events,
                getEventSuccess: action.getEventSuccess,
                eventPagination: action.eventPagination,
                eventOrder: action.orderOpt.eventOrderBy,
                eventOrderDisplayName: action.orderOpt.eventOrderDisplayName,
                eventOrderDirection: action.orderOpt.eventOrderDirection
            }
        };
    },
    [TOPOFLOATTAB_DETAIL_SEARCH](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                detailSearchWord: action.detailSearchWord
            }
        };
    },
    [TOPOFLOATTAB_SET_TITLE](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                currentTitle: action.currentTitle
            }
        };
    },
    [TOPOFLOATTAB_SHOW_LOCATION_IN_MAP](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                deviceLocation: action.locateData
            }
        };
    }
};

const todoReducer = createReducer(initialState, Object.assign({}, topology));

export default todoReducer;
