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
    TOPOGRAPHFLOATTAB_GETDETAIL_SUCCESS,
    TOPOGRAPHFLOATTAB_GETALARM,
    TOPOGRAPHFLOATTAB_GETALARM_SUCCESS,
    TOPOGRAPHFLOATTAB_GETEVENT,
    TOPOGRAPHFLOATTAB_GETEVENT_SUCCESS,
    TOPOGRAPHFLOATTAB_DETAIL_SEARCH,
    TOPOGRAPHFLOATTAB_SET_TITLE,
    TOPOGRAPHFLOATTAB_SHOW_LOCATION_IN_MAP
} from "./actionTypes";
import createReducer from "commons/utils/reducerHelper";

const initialState = [];

const topology = {
    [TOPOGRAPHFLOATTAB_INIT](state, action) {
        let key = action.identify;
        return {
            ...state,
            deviceLocation: action.locateData,
            [key]: {
                identify: key
            }
        };
    },
    [TOPOGRAPHFLOATTAB_SET](state, action) {
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
    [TOPOGRAPHFLOATTAB_CHANGETAB](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                currentTab: action.checkedTab
            }
        };
    },
    [TOPOGRAPHFLOATTAB_GETDETAIL_SUCCESS](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                deviceData: action.arrayData,
                getDetailSuccess: action.getDetailSuccess
            }
        };
    },
    [TOPOGRAPHFLOATTAB_GETALARM](state, action) {
        return { ...state, getAlarmSuccess: action.getAlarmSuccess };
    },
    [TOPOGRAPHFLOATTAB_GETALARM_SUCCESS](state, action) {
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
    [TOPOGRAPHFLOATTAB_GETEVENT](state, action) {
        return { ...state, getEventSuccess: action.getEventSuccess };
    },
    [TOPOGRAPHFLOATTAB_GETEVENT_SUCCESS](state, action) {
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
    [TOPOGRAPHFLOATTAB_DETAIL_SEARCH](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                detailSearchWord: action.detailSearchWord
            }
        };
    },
    [TOPOGRAPHFLOATTAB_SET_TITLE](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                currentTitle: action.currentTitle
            }
        };
    },
    [TOPOGRAPHFLOATTAB_SHOW_LOCATION_IN_MAP](state, action) {
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
