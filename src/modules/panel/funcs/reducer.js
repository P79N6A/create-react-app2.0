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

import createReducer from "commons/utils/reducerHelper";
import * as actions from "./actionTypes";

const initialState = {
    title: "Choose Panel",
    backgroundColor: "#cfcfcf",
    dateRangeDefaultValue: ["isc::{Today(00:00:00)-iso8601::(P7D)}"],
    icon: "android",
    iconColor: "white",
    countColor: "white",
    titleColor: "#dcdcdc",
    allCount: "",
    filterCount: "",
    count: "0",
    tempData: {},
    topologyTemp: {},
    parameters: {},
    today: "isc::{Today(00:00:00)}",
    countSizeValue: "L",
    titleSizeValue: "L",
    iconSizeValue: "L",
    loading: "loading",
    editer: "editing",
    exportData: null,
    deviceReadingData: [],
    deviceReadingDataWs: {},
    parameterOneSizeValue: "M",
    parameterOneColorValue: "#fff",
    parameterTwoSizeValue: "M",
    parameterTwoColorValue: "#fff",
    wsMessage: {},
    refreshCount: 0,
    durationSwitch: false,
    durationTime: "30 seconds"
};

const panel = {
    // get panel init data
    [actions.PANEL_GET_INIT_DATA](state) {
        return {
            ...state
        };
    },
    // panel get all data
    [actions.PANEL_GET_All_DATA](state, action) {
        // console.log(action);
        return {
            ...state,
            [`panel${action.identify}`]: {
                ...state[`panel${action.identify}`],
                icon: action.data.icon,
                iconColor: action.data.iconColor,
                countColor: action.data.countColor || "rgba(255, 255, 255, .87)",
                editer: action.data.editer || "editing",
                backgroundColor: action.data.backgroundColor,
                title: action.data.title,
                type: action.data.type,
                parameters: action.data.parameters || {},
                identify: action.identify,
                countSizeValue: action.data.countSizeValue || "L",
                titleSizeValue: action.data.titleSizeValue || "L",
                iconSizeValue: action.data.iconSizeValue || "L",
                parameterOneSizeValue: action.data.parameterOneSizeValue || "M",
                parameterOneColorValue: action.data.parameterOneColorValue || "#fff",
                parameterTwoSizeValue: action.data.parameterTwoSizeValue || "M",
                parameterTwoColorValue: action.data.parameterTwoColorValue || "#fff",
                titleColor: action.data.titleColor || "rgba(255, 255, 255, .87)",
                durationSwitch: !!action.data.durationSwitch,
                durationTime: action.data.durationTime || "30 seconds",
                durationTimer: action.data.durationTimer || `timer_${Math.random()}`
            }
        };
    },
    // change panel background color
    [actions.PANEL_CHANGE_BACKGROUND_COLOR](state, action) {
        return {
            ...state,
            [`panel${action.identify}`]: {
                ...state[`panel${action.identify}`],
                backgroundColor: action.backgroundColor,
                identify: action.identify
            }
        };
    },
    // change icon color
    [actions.PANEL_CHANGE_ICON_COLOR](state, action) {
        return {
            ...state,
            [`panel${action.identify}`]: {
                ...state[`panel${action.identify}`],
                iconColor: action.iconColor,
                identify: action.identify
            }
        };
    },
    // change panel title
    [actions.PANEL_CHANGE_TITLE](state, action) {
        return {
            ...state,
            [`panel${action.identify}`]: {
                ...state[`panel${action.identify}`],
                title: action.title,
                identify: action.identify
            }
        };
    },
    // change parameter one size
    [actions.PANEL_CHANGE_PARAMETER_ONE_SIZE](state, action) {
        return {
            ...state,
            [`panel${action.identify}`]: {
                ...state[`panel${action.identify}`],
                parameterOneSizeValue: action.parameterOneSizeValue,
                identify: action.identify
            }
        };
    },
    // change parameter one color
    [actions.PANEL_CHANGE_PARAMETER_ONE_COLOR](state, action) {
        return {
            ...state,
            [`panel${action.identify}`]: {
                ...state[`panel${action.identify}`],
                parameterOneColorValue: action.parameterOneColorValue,
                identify: action.identify
            }
        };
    },
    // change parameter two size
    [actions.PANEL_CHANGE_PARAMETER_TWO_SIZE](state, action) {
        return {
            ...state,
            [`panel${action.identify}`]: {
                ...state[`panel${action.identify}`],
                parameterTwoSizeValue: action.parameterTwoSizeValue,
                identify: action.identify
            }
        };
    },
    // change parameter two color
    [actions.PANEL_CHANGE_PARAMETER_TWO_COLOR](state, action) {
        return {
            ...state,
            [`panel${action.identify}`]: {
                ...state[`panel${action.identify}`],
                parameterTwoColorValue: action.parameterTwoColorValue,
                identify: action.identify
            }
        };
    },
    // choose panel icon
    [actions.PANEL_CHOOSE_ICON](state, action) {
        return {
            ...state,
            [`panel${action.identify}`]: {
                ...state[`panel${action.identify}`],
                icon: action.icon,
                identify: action.identify
            }
        };
    },
    // get device data success
    [actions.PANEL_GET_DEVICE_LIST_SUCCESS](state, action) {
        return {
            ...state,
            [`panel${action.identify}`]: {
                ...state[`panel${action.identify}`],
                deviceData: action.deviceData,
                deviceDataCount: action.deviceData.all,
                identify: action.identify
            }
        };
    },
    // device filter
    [actions.PANEL_DEVICE_FILTER](state, action) {
        return {
            ...state,
            [`panel${action.identify}`]: {
                ...state[`panel${action.identify}`],
                deviceDataCount: action.deviceDataCount,
                identify: action.identify
            }
        };
    },
    // reset all states
    [actions.PANEL_RESET_ALL_STATES](state, action) {
        return {
            ...state,
            [`panel${action.identify}`]: {
                identify: action.identify
            }
        };
    },
    // set panel self parameters
    [actions.PANEL_SET_INIT_FOR_PANEL](state, action) {
        return {
            ...state,
            [`panel${action.identify}`]: {
                ...state[`panel${action.identify}`],
                identify: action.identify,
                ...action.selfParameters
            }
        };
    },
    // change count
    [actions.PANEL_CHANGE_COUNT](state, action) {
        return {
            ...state,
            [`panel${action.identify}`]: {
                ...state[`panel${action.identify}`],
                identify: action.identify,
                parameters: action.parameters,
                count: action.count
            }
        };
    },
    // panel request data success
    [actions.PANEL_REQUEST_DATA_SUCCESS](state, action) {
        return {
            ...state,
            [`panel${action.identify}`]: {
                ...state[`panel${action.identify}`],
                identify: action.identify,
                tempData: action.tempData,
                count: action.count,
                parameters: action.parameters
            }
        };
    },
    // panel request data success
    [actions.PANEL_DEVICE_READING_REQUEST_DATA_SUCCESS](state, action) {
        return {
            ...state,
            [`panel${action.identify}`]: {
                ...state[`panel${action.identify}`],
                identify: action.identify,
                tempData: action.tempData,
                parameters: action.parameters
            }
        };
    },
    // device reading data success
    [actions.PANEL_DEVICE_READING_AGGREAGTION_DATA_SUCCESS](state, action) {
        return {
            ...state,
            [`panel${action.identify}`]: {
                ...state[`panel${action.identify}`],
                identify: action.identify,
                deviceReadingData: action.deviceReadingData,
                deviceReadingDataWs: action.deviceReadingDataWs,
                parameters: action.parameters
            }
        };
    },
    // panel clear all parameters
    [actions.PANEL_CLEAR_PARAMETERS](state, action) {
        return {
            ...state,
            [`panel${action.identify}`]: {
                ...state[`panel${action.identify}`],
                parameters: action.parameters,
                identify: action.identify
            }
        };
    },
    // panel clear all temp data
    [actions.PANEL_CLEAR_TEMP_DATA](state, action) {
        return {
            ...state,
            [`panel${action.identify}`]: {
                ...state[`panel${action.identify}`],
                tempData: action.tempData,
                identify: action.identify
            }
        };
    },
    // panel font size control
    [actions.PANEL_TITLE_SIZE_CONTROL](state, action) {
        return {
            ...state,
            [`panel${action.identify}`]: {
                ...state[`panel${action.identify}`],
                titleSizeValue: action.titleSizeValue,
                identify: action.identify
            }
        };
    },
    // panel count size control
    [actions.PANEL_COUNT_SIZE_CONTROL](state, action) {
        return {
            ...state,
            [`panel${action.identify}`]: {
                ...state[`panel${action.identify}`],
                countSizeValue: action.countSizeValue,
                identify: action.identify
            }
        };
    },
    // panel change font color
    [actions.PANEL_CHANGE_TITLE_COLOR](state, action) {
        return {
            ...state,
            [`panel${action.identify}`]: {
                ...state[`panel${action.identify}`],
                titleColor: action.titleColor,
                identify: action.identify
            }
        };
    },
    // panel change count color
    [actions.PANEL_CHANGE_COUNT_COLOR](state, action) {
        return {
            ...state,
            [`panel${action.identify}`]: {
                ...state[`panel${action.identify}`],
                countColor: action.countColor,
                identify: action.identify
            }
        };
    },
    // panel icon szie control
    [actions.PANEL_ICON_SIZE_CONTROL](state, action) {
        return {
            ...state,
            [`panel${action.identify}`]: {
                ...state[`panel${action.identify}`],
                iconSizeValue: action.iconSizeValue,
                identify: action.identify
            }
        };
    },
    // panel change loading status
    [actions.PANEL_LOADING_STATUS](state, action) {
        return {
            ...state,
            [`panel${action.identify}`]: {
                ...state[`panel${action.identify}`],
                loading: action.loading,
                identify: action.identify
            }
        };
    },
    // panel change edit status
    [actions.PANEL_EDITER_STATUS](state, action) {
        return {
            ...state,
            [`panel${action.identify}`]: {
                ...state[`panel${action.identify}`],
                editer: action.editer,
                identify: action.identify
            }
        };
    },
    // panel export data success
    [actions.PANEL_EXPORT_TO_EXCEL_SUCCESS](state, action) {
        return {
            ...state,
            [`panel${action.identify}`]: {
                ...state[`panel${action.identify}`],
                exportData: action.exportData,
                identify: action.identify
            }
        };
    },
    // panel export data clear
    [actions.PANEL_EXPORT_DATA_CLEAR](state, action) {
        return {
            ...state,
            [`panel${action.identify}`]: {
                ...state[`panel${action.identify}`],
                exportData: action.exportData,
                identify: action.identify
            }
        };
    },
    [actions.RECEIVE_WEBSOCKET_MESSAGE](state, action) {
        let data = action.payload.status.code === "00000000" ? action.payload : {};
        return {
            ...state,
            wsMessage: data
        };
    },
    [actions.ADD_WS_DATA](state, action) {
        return {
            ...state,
            [`panel${action.identify}`]: {
                ...state[`panel${action.identify}`],
                wsMessage: action.wsMessage,
                identify: action.identify
            }
        };
    },
    [actions.PANEL_DURATION_CHANGE_STATUS](state, action) {
        return {
            ...state,
            [`panel${action.identify}`]: {
                ...state[`panel${action.identify}`],
                durationSwitch: action.durationSwitch,
                identify: action.identify
            }
        };
    },
    [actions.PANEL_DURATION_CHANGE_TIME](state, action) {
        return {
            ...state,
            [`panel${action.identify}`]: {
                ...state[`panel${action.identify}`],
                durationTime: action.durationTime,
                identify: action.identify
            }
        };
    }
};
const panelReducer = createReducer(initialState, Object.assign({}, panel));

export default panelReducer;
