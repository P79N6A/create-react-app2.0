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
    RULE_PREDICATE_CHANGED,
    RULE_COLUMNS_CHANGED,
    RULE_STORE_FILTER,
    RULE_FILTERVALUE_CHANGES,
    RULEFILTER_REFRESH_RULE
} from "./actionTypes";
import createReducer from "commons/utils/reducerHelper";

const initialState = [];

const rule = {
    [RULE_STORE_FILTER](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                filterConfig: action.filterConfig
            }
        };
    },
    [RULE_PREDICATE_CHANGED](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                predicate: action.predicate,
                filterArr: action.filterArr
            }
        };
    },
    [RULE_COLUMNS_CHANGED](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                currentCheckColumns: action.currentCheckColumns
            }
        };
    },
    [RULE_FILTERVALUE_CHANGES](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                filterConfig: action.filterConfig
            }
        };
    },
    [RULEFILTER_REFRESH_RULE](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                refreshRule: action.refreshRule
            }
        };
    }
};

const todoReducer = createReducer(initialState, Object.assign({}, rule));

export default todoReducer;
