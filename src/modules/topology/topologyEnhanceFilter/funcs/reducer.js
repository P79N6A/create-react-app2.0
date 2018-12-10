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
    TOPOFILTER_SEARCH_TYPES_SUCCESS,
    TOPOFILTER_PREDICATE_CHANGED,
    TOPOFILTER_COLUMNS_CHANGED,
    TOPOFILTER_STORE_FILTER,
    TOPOFILTER_FILTERVALUE_CHANGES,
    TOPOFILTER_REFRESH_TOPOLOGY
} from "./actionTypes";
import createReducer from "commons/utils/reducerHelper";

const initialState = [];

const topology = {
    [TOPOFILTER_STORE_FILTER](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                filterConfig: action.filterConfig
            }
        };
    },
    [TOPOFILTER_PREDICATE_CHANGED](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                predicate: action.predicate,
                filterArr: action.filterArr
            }
        };
    },
    [TOPOFILTER_COLUMNS_CHANGED](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                currentCheckColumns: action.currentCheckColumns
            }
        };
    },
    [TOPOFILTER_FILTERVALUE_CHANGES](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                filterConfig: action.filterConfig
            }
        };
    },
    [TOPOFILTER_SEARCH_TYPES_SUCCESS](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                topoTypeDatas: action.topoTypeDatas
            }
        };
    },
    [TOPOFILTER_REFRESH_TOPOLOGY](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                refreshTopology: action.refreshTopology
            }
        };
    }
};

const todoReducer = createReducer(initialState, Object.assign({}, topology));

export default todoReducer;
