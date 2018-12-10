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
    TOPOLOGY_INIT_PROPS,
    TOPOLOGY_REQUEST,
    TOPOLOGY_REQUEST_SUCCESS,
    TOPOLOGY_FLOATTAB_OPEN,
    TOPOLOGY_FLOATTAB_CLOSE,
    TOPOLOGY_COLUMN_FILTER_CHANGE,
    TOPOLOGY_CCMS_CONTROL,
    TOPOLOGY_EDITOR_CONTROL_PROPS,
    TOPOLOGY_STORE_COLUMN_FILTER,
    TOPOLOGY_MULTIPLE_SELECT,
    TOPOLOGY_SORT_CHANGED,
    TOPOLOGY_EXPORT_TOPOLOGY_DATA_SUCCESS,
    RECEIVE_WEBSOCKET_MESSAGE,
    AUTO_REFRESH_ACTION,
    TOPOLOGY_CHANGE_DISPLAY_TYPE,
    TOPOLOGY_GET_SYSCONFIG_DEVICE_TYPE_SUCCESS,
    TOPOLOGY_GET_SYSCONFIG_DEVICE_SCHEMA_SUCCESS,
    TOPOLOGY_GET_SYSCONFIG_DEVICE_TYPE_SCHEMA_SUCCESS
} from "./actionTypes";
import createReducer from "commons/utils/reducerHelper";

const initialState = [];

const topology = {
    [TOPOLOGY_INIT_PROPS](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                title: action.title,
                subTitle: action.subTitle,
                columnConfig: action.columnConfig,
                tabTypes: action.tabTypes,
                topoDisplayType: action.topoDisplayType,
                multipleSelect: action.multipleSelect,
                pageLimit: action.pageLimit,
                orderBy: action.orderBy,
                orderDirection: action.orderDirection
            }
        };
    },
    [TOPOLOGY_REQUEST](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                isPending: action.isPending,
                refreshTopologySuccess: action.refreshTopologySuccess
            }
        };
    },
    [TOPOLOGY_REQUEST_SUCCESS](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                arrayData: action.arrayData,
                pagination: action.pagination,
                predicate: action.predicate,
                sortConfig: action.sortConfig,
                pageNo: action.pagination.currentpage,
                pageLimit: action.pagination.limit,
                orderDisplayName: action.orderDisplayName,
                orderDirection: action.orderDirection,
                isPending: action.isPending,
                refreshTopologySuccess: action.refreshTopologySuccess
            }
        };
    },
    [TOPOLOGY_FLOATTAB_OPEN](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                showFloatTab: action.showFloatTab,
                selectDeviceId: action.deviceId,
                selectResourcePath: action.resourcePath,
                selectDeviceName: action.selectDeviceName,
                geo: action.geo
            }
        };
    },
    [TOPOLOGY_FLOATTAB_CLOSE](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                showFloatTab: action.showFloatTab
            }
        };
    },
    [TOPOLOGY_COLUMN_FILTER_CHANGE](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                currentColumns: action.currentColumns
            }
        };
    },
    [TOPOLOGY_CCMS_CONTROL](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify]
            }
        };
    },
    [TOPOLOGY_EDITOR_CONTROL_PROPS](state, action) {
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
    [TOPOLOGY_STORE_COLUMN_FILTER](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                columnConfig: action.columnConfig,
                filterConfig: action.filterConfig
            }
        };
    },
    [TOPOLOGY_MULTIPLE_SELECT](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                multipleSelected: action.multipleSelected
            }
        };
    },
    [TOPOLOGY_SORT_CHANGED](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                orderBy: action.orderBy,
                orderDisplayName: action.orderDisplayName,
                orderDirection: action.orderDirection
            }
        };
    },
    [TOPOLOGY_EXPORT_TOPOLOGY_DATA_SUCCESS](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                exportTopoDatas: action.exportTopoDatas
            }
        };
    },
    [TOPOLOGY_CHANGE_DISPLAY_TYPE](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                topoDisplayType: action.topoDisplayType,
                title: action.widgetTitle
            }
        };
    },
    // get sysconfig device type success
    [TOPOLOGY_GET_SYSCONFIG_DEVICE_TYPE_SUCCESS](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                [action.dataType]: action.sysconfigDevicetypes
            }
        };
    },
    // get sysconfig device schema success---
    [TOPOLOGY_GET_SYSCONFIG_DEVICE_SCHEMA_SUCCESS](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                [action.schemaType]: action.sysconfigDeviceSchema,
                sysconfigDevicePropertySchema: action.sysconfigDevicePropertySchema
            }
        };
    },
    // get sysconfig device schema success---
    [TOPOLOGY_GET_SYSCONFIG_DEVICE_TYPE_SCHEMA_SUCCESS](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                [action.schemaType]: action.configs
            }
        };
    },
    [RECEIVE_WEBSOCKET_MESSAGE](state, action) {
        let data = action.payload.status.code === "00000000" ? action.payload : {};
        return {
            ...state,
            wsMessage: data
        };
    },
    [AUTO_REFRESH_ACTION](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                refreshCount: action.refreshCount
            }
        };
    }
    // [REFRESH_ACTION](state, action) {
    //     console.log("auto refresh: ", action);
    //     return {
    //         ...state,
    //         // refreshCount: action.refreshCount
    //     };
    // }
};

const todoReducer = createReducer(initialState, Object.assign({}, topology));

export default todoReducer;
