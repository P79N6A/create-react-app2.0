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
    ALARM_INITDATA_REQUEST_SUCCESS,
    ALARM_REQUEST_FAILED,
    ALARM_DRAWER_TOGGLE,
    ALARM_GETDETAIL_REQUEST,
    ALARM_GETDETAIL_REQUEST_SUCCESS,
    ALARM_ITEMSDATA_SAVE,
    ALARM_SELECTCOLUMNS_SAVE,
    ALARM_SEARCHTIME_SAVE,
    ALARM_GETDETAILMEDIA_REQUEST_SUCCESS,
    ALARM_CCMS_ACTION,
    ALARM_EDITOR_CONTROL_PROPS,
    ALARM_REQUEST_ITEMSSEARCH,
    ALARM_SORTERDATA_SAVE,
    ALARM_CHANGE_DISPLAY_TYPE,
    RECEIVE_WEBSOCKET_MESSAGE,
    REFRESH_ACTION,
    EXPORT_ALARM_DATA_SUCCESS,
    ALARM_SAVE_ROWSPERPAGE,
    ALARM_SAVE_STREAMING_DATA,
    ALARM_STREAM_REQUEST,
    ALARM_STREAM_REQUEST_SUCCESS,
    ALARM_SAVE_SORTRESULT,
    ALARM_PARAMETERS_REQUEST_SUCCESS,
    ALARM_CHANGE_STATE_REQUEST_SUCCESS,
    // ALARM_GET_ASSOCIATIONS_DATA,
    ALARM_GET_ASSOCIATIONS_DATA_SUCCESS,
    ALARM_RESET_ASSOCIATIONS_DATA,
    ALARM_DISSOCIATE_ITEM_SUCCESS,
    ALARM_ASSOCIATION_SEARCH_REQUEST_SUCCESS,
    ALARM_GET_USER_LIST_SUCCESS,
    ALARM_GET_COMMENTS_DATA_SUCCESS,
    ALARM_UPDATE_LISTDETAIL_SUCCESS,
    ALARM_UPLOAD_FILE_SUCCESS,
    ALARM_CLOSE_WS_LOCK,
    ALARM_GET_PAGE_KEY_SUCCESS
} from "./actionTypes";
import createReducer from "commons/utils/reducerHelper";

const initialState = {};

const alarm = {
    [ALARM_REQUEST_ITEMSSEARCH](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                loading: action.loading,
                identify: action.identify
            }
        };
    },
    [ALARM_INITDATA_REQUEST_SUCCESS](state, action) {
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
    [ALARM_REQUEST_FAILED](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                loading: action.loading,
                identify: action.identify
            }
        };
    },

    [ALARM_DRAWER_TOGGLE](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                showItems: action.showItems,
                isActive: action.isActive,
                anchor: action.anchor
            }
        };
    },
    [ALARM_GETDETAIL_REQUEST](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                detailData: null,
                pageKey: null
            }
        };
    },
    [ALARM_GETDETAIL_REQUEST_SUCCESS](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                detailData: action.arrayData
            }
        };
    },
    [ALARM_GETDETAILMEDIA_REQUEST_SUCCESS](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                mediaData: action.arrayData
            }
        };
    },
    [ALARM_ITEMSDATA_SAVE](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                itemsData: action.itemsData
            }
        };
    },
    [ALARM_SELECTCOLUMNS_SAVE](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                columns: action.items,
                columnConfig: action.columnConfig
            }
        };
    },
    [ALARM_SEARCHTIME_SAVE](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                currentTime: action.currentTime
            }
        };
    },
    [ALARM_CCMS_ACTION](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                ...action.props
            }
        };
    },
    [ALARM_EDITOR_CONTROL_PROPS](state, action) {
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
        let data = action.payload.status.code === "00000000" ? action.payload : {};
        return {
            ...state,
            wsMessage: data
        };
    },
    // manual refresh
    [REFRESH_ACTION](state, action) {
        return {
            ...state,
            refreshCount: action.refreshCount
        };
    },

    //save sorter data
    [ALARM_SORTERDATA_SAVE](state, action) {
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
    [ALARM_SAVE_SORTRESULT](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                arrayData: action.newData
            }
        };
    },

    //export success
    [EXPORT_ALARM_DATA_SUCCESS](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                exportData: action.data
            }
        };
    },

    //toggle list or view
    [ALARM_CHANGE_DISPLAY_TYPE](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                topoDisplayType: action.topoDisplayType
            }
        };
    },

    //save ALARM_SAVE_ROWSPERPAGE
    [ALARM_SAVE_ROWSPERPAGE](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                pageNo: action.pageNo,
                pageLimit: action.pageLimit
            }
        };
    },

    //save ALARM_SAVE_STREAMING_DATA
    [ALARM_SAVE_STREAMING_DATA](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                streamingData: action.data
            }
        };
    },
    [ALARM_CLOSE_WS_LOCK](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                wsLock: action.value
            }
        };
    },

    //ALARM_STREAM_REQUEST
    [ALARM_STREAM_REQUEST](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                loading2: action.loading2
            }
        };
    },
    //ALARM_STREAM_REQUEST_SUCCESS
    [ALARM_STREAM_REQUEST_SUCCESS](state, action) {
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

    //ALARM_PARAMETERS_REQUEST_SUCCESS
    [ALARM_PARAMETERS_REQUEST_SUCCESS](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                identify: action.identify,
                parametersData: action.arrayData
            }
        };
    },

    //ALARM_CHANGE_STATE_REQUEST_SUCCESS
    [ALARM_CHANGE_STATE_REQUEST_SUCCESS](state, action) {
        let original = null;
        let mode = state[action.identify].topoDisplayType;
        if (!mode) {
            return;
        } else if (mode === "Search") {
            original = state[action.identify].arrayData.map(item => {
                return item.id === action.arrayData.id ? (item = action.arrayData) : item;
            });
            return {
                ...state,
                [action.identify]: {
                    ...state[action.identify],
                    identify: action.identify,
                    arrayData: original
                }
            };
        } else {
            original = state[action.identify].streamingData.map(item => {
                return item.id === action.arrayData.id ? (item = action.arrayData) : item;
            });
            return {
                ...state,
                [action.identify]: {
                    ...state[action.identify],
                    identify: action.identify,
                    streamingData: original
                }
            };
        }
    },
    //ALARM_GET_ASSOCIATIONS_DATA
    // [ALARM_GET_ASSOCIATIONS_DATA](state, action) {
    //     return {
    //         ...state,
    //         [action.identify]: {
    //             ...state[action.identify],
    //             associationsData: null
    //         }
    //     };
    // },
    //ALARM_GET_ASSOCIATIONS_DATA_SUCCESS
    [ALARM_GET_ASSOCIATIONS_DATA_SUCCESS](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                associationsData: action.arrayData
            }
        };
    },

    //ALARM_RESET_ASSOCIATIONS_DATA
    [ALARM_RESET_ASSOCIATIONS_DATA](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                associationsData: action.value
            }
        };
    },

    //ALARM_DISSOCIATE_ITEM_SUCCESS
    [ALARM_DISSOCIATE_ITEM_SUCCESS](state, action) {
        let original = state[action.identify].associationsData.filter(item =>
            action.arrayData[0].associations.includes(item.id)
        );
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                identify: action.identify,
                associationsData: original
            }
        };
    },

    //ALARM_ASSOCIATION_SEARCH_REQUEST_SUCCESS
    [ALARM_ASSOCIATION_SEARCH_REQUEST_SUCCESS](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                assSearchData: action.arrayData,
                assSearchPagination: action.pagination
            }
        };
    },

    //ALARM_GET_USER_LIST_SUCCESS
    [ALARM_GET_USER_LIST_SUCCESS](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                userList: action.arrayData,
                userPagination: action.pagination
            }
        };
    },

    //ALARM_GET_COMMENTS_DATA_SUCCESS
    [ALARM_GET_COMMENTS_DATA_SUCCESS](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                commentsData: action.arrayData
            }
        };
    },

    //ALARM_UPDATE_LISTDETAIL_SUCCESS
    [ALARM_UPDATE_LISTDETAIL_SUCCESS](state, action) {
        let original = null;
        let mode = state[action.identify].topoDisplayType;
        let value = action.value;

        if (value === "list") {
            if (!mode) {
                return;
            } else if (mode === "Search") {
                // console.log("U list -> search");
                original = state[action.identify].arrayData.map(item => {
                    return item.id === action.arrayData[0].id ? (item = action.arrayData[0]) : item;
                });
                return {
                    ...state,
                    [action.identify]: {
                        ...state[action.identify],
                        identify: action.identify,
                        arrayData: original
                    }
                };
            } else {
                // console.log("U list -> stream");
                original = state[action.identify].streamingData.map(item => {
                    return item.id === action.arrayData[0].id ? (item = action.arrayData[0]) : item;
                });
                return {
                    ...state,
                    [action.identify]: {
                        ...state[action.identify],
                        identify: action.identify,
                        streamingData: original
                    }
                };
            }
        } else {
            if (!mode) {
                // console.log("U listDetail -> detail");
                return {
                    ...state,
                    [action.identify]: {
                        ...state[action.identify],
                        identify: action.identify,
                        detailData: action.arrayData
                    }
                };
            } else if (mode === "Search") {
                // console.log("U listDetail -> listdetail");
                original = state[action.identify].arrayData.map(item => {
                    return item.id === action.arrayData[0].id ? (item = action.arrayData[0]) : item;
                });
                return {
                    ...state,
                    [action.identify]: {
                        ...state[action.identify],
                        identify: action.identify,
                        detailData: action.arrayData,
                        arrayData: original
                    }
                };
            } else {
                original = state[action.identify].streamingData.map(item => {
                    return item.id === action.arrayData[0].id ? (item = action.arrayData[0]) : item;
                });
                return {
                    ...state,
                    [action.identify]: {
                        ...state[action.identify],
                        identify: action.identify,
                        detailData: action.arrayData,
                        streamingData: original
                    }
                };
            }
        }
    },

    //ALARM_UPLOAD_FILE_SUCCESS
    [ALARM_UPLOAD_FILE_SUCCESS](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                uploadFileId: action.id
            }
        };
    },

    //ALARM_GET_PAGE_KEY_SUCCESS
    [ALARM_GET_PAGE_KEY_SUCCESS](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                pageKey: action.value
            }
        };
    }
};

const todoReducer = createReducer(initialState, Object.assign({}, alarm));

export default todoReducer;
