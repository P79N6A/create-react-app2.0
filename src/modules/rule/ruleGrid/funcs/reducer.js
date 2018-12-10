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
 * Created by wangrui on 22/06/2018.
 */
import {
    RULE_INIT_PROPS,
    RULE_REQUEST,
    RULE_REQUEST_SUCCESS,
    RULE_FLOATTAB_OPEN,
    RULE_FLOATTAB_CLOSE,
    RULE_COLUMN_FILTER_CHANGE,
    RULE_CCMS_CONTROL,
    RULE_EDITOR_CONTROL_PROPS,
    RULE_STORE_COLUMN_FILTER,
    RULE_MULTIPLE_SELECT,
    RULE_SORT_CHANGED,
    RULE_DELETERULE,
    RULE_DELETERULE_SUCCESS,
    RULE_DELETERULE_FAILURE,
    RULE_CHANGETAB,
    RULE_CHANGE_ADDMODE,
    RULE_RULE_SCHEMA_SUCCESS,
    RULE_ACTION_SCHEMA_SUCCESS,
    RULE_GET_ACTION_CONTENT_SUCCESS,
    RULE_INIT_ALL_REDUX
} from "./actionTypes";
import createReducer from "commons/utils/reducerHelper";

const initialState = [];

const rule = {
    [RULE_INIT_ALL_REDUX](state, action) {
        const multipleSelect = state[action.identify] && state[action.identify].multipleSelect;
        return {
            ...state,
            [action.identify]: {multipleSelect}
        };
    },
    [RULE_INIT_PROPS](state, action) {
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
                pageNo: action.pageNo,
                orderBy: action.orderBy,
                orderDirection: action.orderDirection
            }
        };
    },
    [RULE_REQUEST](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                isPending: action.isPending,
                refreshRuleSuccess: action.refreshRuleSuccess
            }
        };
    },
    [RULE_REQUEST_SUCCESS](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                arrayData: action.arrayData,
                modulename: action.modulename,
                pagination: action.pagination,
                predicate: action.predicate,
                sortConfig: action.sortConfig,
                pageNo: action.pagination.currentpage,
                pageLimit: action.pagination.limit,
                orderDisplayName: action.orderDisplayName,
                orderDirection: action.orderDirection,
                isPending: action.isPending,
                refreshRuleSuccess: action.refreshRuleSuccess,
                multipleSelected: action.multipleSelected
            }
        };
    },
    [RULE_FLOATTAB_OPEN](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                showFloatTab: action.showFloatTab,
                floatTabType: action.floatTabType,
                selectConfigname: action.configname
            }
        };
    },
    [RULE_FLOATTAB_CLOSE](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                showFloatTab: action.showFloatTab
            }
        };
    },
    [RULE_COLUMN_FILTER_CHANGE](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                currentColumns: action.currentColumns
            }
        };
    },
    [RULE_CCMS_CONTROL](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify]
            }
        };
    },
    [RULE_EDITOR_CONTROL_PROPS](state, action) {
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
    [RULE_STORE_COLUMN_FILTER](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                columnConfig: action.columnConfig,
                filterConfig: action.filterConfig
            }
        };
    },
    [RULE_MULTIPLE_SELECT](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                multipleSelected: action.multipleSelected
            }
        };
    },
    [RULE_SORT_CHANGED](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                orderBy: action.orderBy,
                orderDirection: action.orderDirection,
                orderDisplayName: action.orderDisplayName
            }
        };
    },
    [RULE_DELETERULE](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                refreshRuleSuccess: action.refreshRuleSuccess
            }
        };
    },
    [RULE_DELETERULE_SUCCESS](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                multipleSelected: action.multipleSelected,
                refreshRuleSuccess: action.refreshRuleSuccess
            }
        };
    },
    [RULE_DELETERULE_FAILURE](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                multipleSelected: action.multipleSelected,
                refreshRuleSuccess: action.refreshRuleSuccess
            }
        };
    },
    [RULE_CHANGETAB](state, action) {
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
    [RULE_CHANGE_ADDMODE](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                addMode: action.addMode
            }
        };
    },
    [RULE_RULE_SCHEMA_SUCCESS](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                ruleSchema: action.ruleSchema
            }
        };
    },
    [RULE_ACTION_SCHEMA_SUCCESS](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                actionSchema: action.actionSchema
            }
        };
    },
    [RULE_GET_ACTION_CONTENT_SUCCESS](state, action) {
        let actionContent = {};
        actionContent[action.configname] = action.actionContent;
        if(state[action.identify].actionContent){
            actionContent = Object.assign({}, state[action.identify].actionContent, actionContent);
        }
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                actionContent: actionContent,
            }
        };
    },
};

const todoReducer = createReducer(initialState, Object.assign({}, rule));

export default todoReducer;
