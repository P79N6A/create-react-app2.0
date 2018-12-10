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
* Modified by DengXiaoLong on 25/06/2018.
*/

import createReducer from "commons/utils/reducerHelper";
import * as actions from "./actionTypes";

const initState = {
    tempData: [],
    title: "default title",
    icon: "",
    iconColor: "",
    backgroundColor: "",
    today: "isc::{Today(00:00:00)}",
    dateRangeDefaultValue: ["isc::{Today(00:00:00)-iso8601::(P1D)}"],
    addressData: [],
    alarmCondition: "",
    typeData: [],
    severityData: [],
    stateData: [],
    deviceTypeData: [],
    parameters: {},
    loading: "loading",
    editer: "editing",
    zoom: 10.4,
    exportData: null,
    basicMapMessage: {},
    mapDrawData: []
};

const viewInMap = {
    // map request data success
    [actions.MAP_REQUEST_SUCCESS](state, action) {
        return {
            ...state,
            [`map${action.identify}`] : {
                ...state[`map${action.identify}`],
                tempData: action.tempData,
                parameters: action.parameters,
                identify: action.identify
            }
        };
    },
    // device map request data success
    [actions.MAP_DEVICE_DATA_REQUEST_SUCCESS](state, action) {
        return {
            ...state,
            [`map${action.identify}`]: {
                ...state[`map${action.identify}`],
                tempData: action.tempData,
                deviceTypeData: action.deviceTypeData,
                parameters: action.parameters,
                identify: action.identify
            }
        };
    },
    [actions.MAP_CHANGE_TITLE](state, action) {
        return {
            ...state,
            [`map${action.identify}`]: {
                ...state[`map${action.identify}`],
                title: action.title,
                identify: action.identify,
            }
        };
    },
    [actions.MAP_CHOOSE_ICON](state, action) {
        return {
            ...state,
            [`map${action.identify}`]: {
                ...state[`map${action.identify}`],
                icon: action.icon,
                identify: action.identify,
            }
        };
    },
    // map change icon color 
    [actions.MAP_CHANGE_ICON_COLOR](state, action) {
        return {
            ...state,
            [`map${action.identify}`]: {
                ...state[`map${action.identify}`],
                iconColor: action.iconColor,
                identify: action.identify,
            }
        };
    },
    // device map change icon
    [actions.MAP_DEVICE_CHANGE_ICON_AND_COLOR](state, action) {
        return {
            ...state,
            [`map${action.identify}`]: {
                ...state[`map${action.identify}`],
                tempData: action.tempData,
                parameters: action.parameters,
                identify: action.identify,
            }
        };
    },
    // map get all data
    [actions.MAP_GET_All_DATA](state, action) {
        return {
            ...state,
            [`map${action.identify}`] : {
                ...state[`map${action.identify}`],
                icon: action.data.icon,
                iconColor: action.data.iconColor,
                title: action.data.title,
                type: action.data.type,
                zoom: action.data.defaultZoom,
                parameters: action.data.parameters || {},
                editer: action.data.editer || "editing",
                dateStyle: action.data.dateStyle,
                identify: action.identify,
            },
        };
    },
    // map get address
    [actions.MAP_GET_ADDRESS_SUCCESS](state, action) {
        return {
            ...state,
            [`map${action.identify}`] : {
                ...state[`map${action.identify}`],
                addressData: action.addressData,
                parameters: action.parameters,
                identify: action.identify,
            }
        };
    },
    // clear map info 
    [actions.MAP_INFO_ADDRESS_CLEAR](state, action) {
        return {
            ...state,
            [`map${action.identify}`] : {
                ...state[`map${action.identify}`],
                tempData: action.tempData,
                deviceTypeData: action.deviceTypeData,
                parameters: action.parameters,
                identify: action.identify,
            }
        };
    },
    // type data get success
    [actions.MAP_ALARM_TYPE_DATA_REQUEST_SUCCESS](state, action) {
        return {
            ...state,
            [`map${action.identify}`]: {
                ...state[`map${action.identify}`],
                typeData: action.typeData,
                identify: action.identify
            }
        };
    },
    // severity data get success
    [actions.MAP_ALARM_SEVERITY_DATA_REQUEST_SUCCESS](state, action) {
        return {
            ...state,
            [`map${action.identify}`]: {
                ...state[`map${action.identify}`],
                severityData: action.severityData,
                identify: action.identify
            }
        };
    },
    // status data get success
    [actions.MAP_ALARM_STATE_DATA_REQUEST_SUCCESS](state, action) {
        return {
            ...state,
            [`map${action.identify}`]: {
                ...state[`map${action.identify}`],
                stateData: action.stateData,
                identify: action.identify
            }
        };
    },
    // map change loading status
    [actions.MAP_LAONDING_STATUS](state, action) {
        return {
            ...state,
            [`map${action.identify}`]: {
                ...state[`map${action.identify}`],
                loading: action.loading,
                identify: action.identify
            }
        };
    },
    // map change editer status
    [actions.MAP_EDITER_STATUS](state, action) {
        return {
            ...state,
            [`map${action.identify}`]: {
                ...state[`map${action.identify}`],
                editer: action.editer,
                identify: action.identify
            }
        };
    },
    // map export excel data success
    [actions.MAP_EXPORT_EXCEL_SUCCESS](state, action) {
        return {
            ...state,
            [`map${action.identify}`]: {
                ...state[`map${action.identify}`],
                exportData: action.exportData,
                identify: action.identify
            }
        };
    },
    // map export excel data success
    [actions.MAP_DRAW_INFOMATION](state, action) {
        return {
            ...state,
            [`map${action.identify}`]: {
                ...state[`map${action.identify}`],
                mapDrawData: action.mapDrawData,
                identify: action.identify
            }
        };
    },
    [actions.RECEIVE_WEBSOCKET_MESSAGE](state, action) {
        let data = action.payload.status.code === "00000000" ? action.payload : {};
        return {
            ...state,
            basicMapMessage: data
        };
    },
    [actions.MAPP_CLEAR_DATA](state, action) {
        return {
            ...state,
            basicMapMessage: action.basicMapMessage
        };
    },
};

const viewInMapReducer = createReducer(initState, Object.assign({}, viewInMap));

export default viewInMapReducer;
