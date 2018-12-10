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
import reducerHelper from "commons/utils/reducerHelper";
import * as actions from "./actionTypes";

const initialState = [];
const timelineMgmt = {
    [actions.RECEIVE_WEBSOCKET_MESSAGE](state, action) {
        let data = action.payload.status.code === "00000000" ? action.payload : {};
        return {
            ...state,
            wsMessage: data
        };
    },
    //save ALARM_SAVE_STREAMING_DATA
    [actions.TIMELINE_SAVE_STREAMING_DATA](state, action) {
        let wsData = [];
        wsData = wsData.concat(action.data);
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                streamingData: wsData
            }
        };
    },
    [actions.TIMELINE_FLOATTAB_OPEN](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                showFloatTab: action.showFloatTab,
                selectType: action.selectType,
                detailData: action.details
            }
        };
    },
    [actions.TIMELINE_FLOATTAB_CLOSE](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                showFloatTab: action.showFloatTab
            }
        };
    },
    [actions.TIMELINE_CCMS_CONTROL](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify]
            }
        };
    },
    [actions.TIMELINE_EDITOR_CONTROL_PROPS](state, action) {
        return {
            ...state,
            [action.identify]: Object.assign(
                {
                    ...state[action.identify]
                },
                action.editorState
            )
        };
    },
    // [actions.AUTO_REFRESH_ACTION](state, action) {
    //     return {
    //         ...state,
    //         [action.identify]: {
    //             ...state[action.identify],
    //             refreshCount: action.refreshCount
    //         }
    //     };
    // },
    [actions.TIMELINE_ALARM_SEARCH_SUCCESS](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                alarmData: action.data
            }
        };
    },
    [actions.TIMELINE_COLUMNS_CHANGED](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                currentCheckColumns: action.currentCheckColumns
            }
        };
    },
    [actions.TIMELINE_SHOW_LOCATION_IN_MAP](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                deviceLocation: action.locateData
            }
        };
    },
    [actions.TIMELINE_CHANGE_STATE_REQUEST_SUCCESS](state, action) {
        let original = state[action.identify].alarmData.map(item => {
            return item.id === action.arrayData.id ? action.arrayData : item;
        });
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                alarmData: original
            }
        };
    },
    [actions.TIMELINE_ALARM_EXPORT_SUCCESS](state, action) {
        let identify = action.identify;
        return {
            ...state,
            [identify]: {
                ...state[identify],
                exportData: action.alarm,
            }
        };
    },
}
const timelineExReducer = reducerHelper(initialState, Object.assign({}, timelineMgmt));

export default timelineExReducer;
