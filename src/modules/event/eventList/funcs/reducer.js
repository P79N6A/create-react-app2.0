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
import {
    EVENT_REQUEST_SUCCESS,
    EVENT_REQUEST_FAILED,
    EVENT_DRAWER_TOGGLE,
    EVENT_SEARCHTIME_SAVE,
    EVENT_ITEMSDATA_SAVE,
    EVENT_GETDETAIL_REQUEST,
    EVENT_GETDETAIL_REQUEST_SUCCESS,
    EVENT_SELECTCOLUMNS_SAVE,
    EVENT_CCMS_ACTION,
    EVENT_EDITOR_CONTROL_PROPS,
    EVENT_REQUEST_ITEMSSEARCH,
    RECEIVE_WEBSOCKET_MESSAGE,
    REFRESH_ACTION,
    EVENT_SORTERDATA_SAVE,
    EXPORT_EVENT_DATA_SUCCESS,
    EVENT_CHANGE_DISPLAY_TYPE,
    EVENT_SAVE_ROWSPERPAGE,
    EVENT_SAVE_STREAMING_DATA,
    EVENT_STREAM_REQUEST,
    EVENT_STREAM_REQUEST_SUCCESS,
    EVENT_SAVE_SORTRESULT,
    EVENT_PARAMETERS_REQUEST_SUCCESS,
    EVENT_CLOSE_WS_LOCK
} from "./actionTypes";
import createReducer from "commons/utils/reducerHelper";

const initialState = {};
const event = {
    [EVENT_REQUEST_ITEMSSEARCH](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                loading: action.loading,
                identify: action.identify
            }
        };
    },
    [EVENT_REQUEST_SUCCESS](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                arrayData: action.arrayData,
                pagination: action.pagination,
                pageLimit: action.pagination.limit,
                loading: action.loading,
                identify: action.identify
            }
        };
    },
    [EVENT_REQUEST_FAILED](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                loading: action.loading,
                loading2: action.loading2,
                identify: action.identify
            }
        };
    },

    [EVENT_DRAWER_TOGGLE](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                showItems: action.showItems,
                anchor: action.anchor,
                isActive: action.isActive
            }
        };
    },
    [EVENT_SEARCHTIME_SAVE](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                currentTime: action.currentTime
            }
        };
    },
    [EVENT_ITEMSDATA_SAVE](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                itemsData: action.itemsData
            }
        };
    },
    [EVENT_GETDETAIL_REQUEST](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                detailData: null
            }
        };
    },
    [EVENT_GETDETAIL_REQUEST_SUCCESS](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                detailData: action.arrayData,
                identify: action.identify
            }
        };
    },
    [EVENT_SELECTCOLUMNS_SAVE](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                columns: action.items,
                columnConfig: action.columnConfig
            }
        };
    },
    [EVENT_CCMS_ACTION](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                ...action.props
            }
        };
    },
    [EVENT_EDITOR_CONTROL_PROPS](state, action) {
        return {
            ...state,
            [action.identify]: Object.assign(
                {
                    ...state[action.identify]
                },
                action.editorData
            )
        };
    },

    //auto refresh
    [RECEIVE_WEBSOCKET_MESSAGE](state, action) {
        // let identify = action.identify;
        let data = action.payload.status.code === "00000000" ? action.payload : {};
        return {
            ...state,
            wsMessage: data
        };
    },
    // manual refresh
    [REFRESH_ACTION](state, action) {
        // let identify = action.identify;
        return {
            ...state,
            refreshCount: action.refreshCount
        };
    },

    //save sorter data
    [EVENT_SORTERDATA_SAVE](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                orderBy: action.orderBy,
                order: action.order,
                sorterData: action.sorterData
            }
        };
    },
    [EVENT_SAVE_SORTRESULT](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                arrayData: action.newData
            }
        };
    },

    //export success
    [EXPORT_EVENT_DATA_SUCCESS](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                exportData: action.data
            }
        };
    },

    //toggle list or view
    [EVENT_CHANGE_DISPLAY_TYPE](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                topoDisplayType: action.topoDisplayType
            }
        };
    },

    //save EVENT_SAVE_ROWSPERPAGE
    [EVENT_SAVE_ROWSPERPAGE](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                pageNo: action.pageNo,
                pageLimit: action.pageLimit
            }
        };
    },

    //save EVENT_SAVE_STREAMING_DATA
    [EVENT_SAVE_STREAMING_DATA](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                streamingData: action.data
            }
        };
    },
    [EVENT_CLOSE_WS_LOCK](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                wsLock: action.value
            }
        };
    },

    //EVENT_STREAM_REQUEST
    [EVENT_STREAM_REQUEST](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                loading2: action.loading2
            }
        };
    },
    //EVENT_STREAM_REQUEST_SUCCESS
    [EVENT_STREAM_REQUEST_SUCCESS](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                identify: action.identify,
                streamingData: action.arrayData,
                loading2: action.loading2
            }
        };
    },

    //EVENT_PARAMETERS_REQUEST_SUCCESS
    [EVENT_PARAMETERS_REQUEST_SUCCESS](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                identify: action.identify,
                parametersData: action.arrayData
            }
        };
    }
};

const todoReducer = createReducer(initialState, Object.assign({}, event));

export default todoReducer;
