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
import * as actions from "./actionTypes";
import createReducer from "commons/utils/reducerHelper";

const initialState = [];

const topologyMgmt = {
    [actions.TOPOLOGYMGMT_INIT_ALL_REDUX](state, action) {
        return {
            ...state,
            [action.identify]: {
                selectApplication: action.selectApplication,
                checkedTab: action.checkedTab
            }
        };
    },
    [actions.TOPOLOGYMGMT_INIT_PROPS](state, action) {
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
    [actions.TOPOLOGYMGMT_REQUEST](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                isPending: action.isPending,
                refreshTopologySuccess: action.refreshTopologySuccess,
                orderBy: action.orderBy
            }
        };
    },
    [actions.TOPOLOGYMGMT_REQUEST_SUCCESS](state, action) {
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
                refreshTopologySuccess: action.refreshTopologySuccess,
                searchType: action.searchType
            }
        };
    },
    [actions.TOPOLOGYMGMT_FLOATTAB_OPEN](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                showFloatTab: action.showFloatTab,
                selectDeviceId: action.deviceId,
                selectResourcePath: action.resourcePath,
                selectDeviceName: action.selectDeviceName,
                geo: action.geo,
                selectAddressIotId: action.addressIotId,
                selectAddressName: action.addressName,
                selectDeviceIcon: action.deviceIcon,
                selectDeviceModelId: action.deviceModelId,
                floatTabType: action.floatTabType,
                hasParentDevice: action.hasParentDevice
            }
        };
    },
    [actions.TOPOLOGYMGMT_FLOATTAB_CLOSE](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                showFloatTab: action.showFloatTab
            }
        };
    },
    [actions.TOPOLOGYMGMT_COLUMN_FILTER_CHANGE](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                currentColumns: action.currentColumns
            }
        };
    },
    [actions.TOPOLOGYMGMT_STORE_COLUMN_FILTER](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                columnConfig: action.columnConfig,
                filterConfig: action.filterConfig
            }
        };
    },
    [actions.TOPOLOGYMGMT_MULTIPLE_SELECT](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                multipleSelected: action.multipleSelected
            }
        };
    },
    [actions.TOPOLOGYMGMT_SORT_CHANGED](state, action) {
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
    [actions.TOPOLOGYMGMT_DELETE_DEVICE](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                refreshTopology: action.refreshTopology
            }
        };
    },
    [actions.TOPOLOGYMGMT_DELETE_DEVICE_TYPE](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                refreshTopology: action.refreshTopology
            }
        };
    },
    [actions.TOPOLOGYMGMT_DELETE_DEVICE_SUCCESS](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                refreshTopology: action.refreshTopology,
                multipleSelected: action.multipleSelected
            }
        };
    },
    [actions.TOPOLOGYMGMT_DELETE_DEVICE_TYPE_SUCCESS](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                refreshTopology: action.refreshTopology,
                multipleSelected: action.multipleSelected
            }
        };
    },
    [actions.TOPOLOGYMGMT_CHANGETAB](state, action) {
        let changes = true;
        if (state[action.identify].currentTab === action.checkedTab) {
            changes = false;
        }
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                currentTab: action.checkedTab,
                pageNo: action.pageNo,
                pageLimit: action.pageLimit,
                arrayData: changes ? action.arrayData : state[action.identify].arrayData,
                columnConfig: action.columnConfig,
                multipleSelected: action.multipleSelected,
                selectDeviceId: action.selectDeviceId,
                showFloatTab: action.showFloatTab
            }
        };
    },
    // get sysconfig device type
    [actions.TOPOLOGYMGMT_TYPE_REQUEST](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                refreshTopologySuccess: action.refreshTopologySuccess,
                orderBy: action.orderBy
            }
        };
    },
    // get sysconfig device type success
    [actions.TOPOLOGYMGMT_GET_SYSCONFIG_DEVICE_TYPE_SUCCESS](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                [action.dataType]: action.sysconfigDevicetypes
            }
        };
    },
    // get sysconfig basic type success
    [actions.TOPOLOGYMGMT_GET_SYSCONFIG_BASIC_TYPE_SUCCESS](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                [action.dataType]: action.configs
            }
        };
    },
    // get sysconfig device schema success---
    [actions.TOPOLOGYMGMT_GET_SYSCONFIG_DEVICE_SCHEMA_SUCCESS](state, action) {
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
    [actions.TOPOLOGYMGMT_GET_SYSCONFIG_DEVICE_TYPE_SCHEMA_SUCCESS](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                [action.schemaType]: action.configs
            }
        };
    },
    // get sysconfig integration systems success
    [actions.TOPOLOGYMGMT_GET_SYSCONFIG_INTEGRATION_SYSTEM_SUCCESS](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                [action.schemaType]: action.configs
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
    [actions.AUTO_REFRESH_ACTION](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                refreshCount: action.refreshCount
            }
        };
    }
};

const todoReducer = createReducer(initialState, Object.assign({}, topologyMgmt));

export default todoReducer;
