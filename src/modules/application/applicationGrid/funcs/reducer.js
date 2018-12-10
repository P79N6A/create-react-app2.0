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
    APPLICATION_INIT,
    APPLICATION_INIT_PROPS,
    APPLICATION_FLOATTAB_OPEN,
    APPLICATION_FLOATTAB_CLOSE,
    APPLICATION_COLUMN_FILTER_CHANGE,
    APPLICATION_CCMS_CONTROL,
    APPLICATION_EDITOR_CONTROL_PROPS,
    APPLICATION_STORE_COLUMN_FILTER,
    APPLICATION_MULTIPLE_SELECT,
    APPLICATION_SORT_CHANGED,
    RECEIVE_WEBSOCKET_MESSAGE,
    AUTO_REFRESH_ACTION,
    DELETE_ADDRESS_REQUEST,
    DELETE_ADDRESS_SUCCESS,
    GET_ADDRESS_FROM_LAYER_REQUEST,
    GET_ADDRESS_FROM_LAYER_SUCCESS,
    GET_ADDRESS_FROM_LAYER_FAILURE
} from "./actionTypes";
import createReducer from "commons/utils/reducerHelper";

const initialState = [];

const application = {
    [APPLICATION_INIT](state, action) {
        return {
            ...state,
            [action.identify]: {
                orderBy:action.orderBy
            }
        };
    },
    [APPLICATION_INIT_PROPS](state, action) {
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
    [GET_ADDRESS_FROM_LAYER_REQUEST](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                showFloatTab: action.showFloatTab,
                listType:action.nodeType,
                isPending: action.isPending,
                refreshTopologySuccess: action.refreshTopologySuccess
            }
        };
    },
    [GET_ADDRESS_FROM_LAYER_SUCCESS](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                arrayData: action.layerData,
                isPending: action.isPending,
                pagination: action.pagination,
                sortConfig: action.sortConfig,
                pageNo: action.pagination.currentpage,
                pageLimit: action.pagination.limit,
                orderDisplayName: action.orderDisplayName,
                orderDirection: action.orderDirection,
                refreshTopologySuccess: action.refreshTopologySuccess,
            }
        };
    },
    [GET_ADDRESS_FROM_LAYER_FAILURE](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                isPending: action.isPending,
                refreshTopologySuccess: action.refreshTopologySuccess,
            }
        };
    },
    [DELETE_ADDRESS_REQUEST](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                refreshTopology: action.refreshTopology
            }
        };
    },
    [DELETE_ADDRESS_SUCCESS](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                refreshTopology: action.refreshTopology,
                multipleSelected: action.multipleSelected
            }
        };
    },
    [APPLICATION_FLOATTAB_OPEN](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                showFloatTab: action.showFloatTab,
                selectApplicationId: action.applicationId,
                selectResourcePath: action.resourcePath,
                selectApplicationName: action.applicationName,
                geo: action.geo,
                floatTabType: action.floatTabType
            }
        };
    },
    [APPLICATION_FLOATTAB_CLOSE](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                showFloatTab: action.showFloatTab
            }
        };
    },
    [APPLICATION_COLUMN_FILTER_CHANGE](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                currentColumns: action.currentColumns
            }
        };
    },
    [APPLICATION_CCMS_CONTROL](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify]
            }
        };
    },
    [APPLICATION_EDITOR_CONTROL_PROPS](state, action) {
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
    [APPLICATION_STORE_COLUMN_FILTER](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                columnConfig: action.columnConfig,
                filterConfig: action.filterConfig
            }
        };
    },
    [APPLICATION_MULTIPLE_SELECT](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                multipleSelected: action.multipleSelected
            }
        };
    },
    [APPLICATION_SORT_CHANGED](state, action) {
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

const todoReducer = createReducer(initialState, Object.assign({}, application));

export default todoReducer;
