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
    APPLICATION_FILTER_SEARCH_TYPES_SUCCESS,
    APPLICATION_FILTER_PREDICATE_CHANGED,
    APPLICATION_FILTER_COLUMNS_CHANGED,
    APPLICATION_FILTER_STORE_FILTER,
    APPLICATION_FILTER_FILTERVALUE_CHANGES,
    APPLICATION_FILTER_REFRESH
} from "./actionTypes";
import createReducer from "commons/utils/reducerHelper";

const initialState = [];

const topology = {
    [APPLICATION_FILTER_STORE_FILTER](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                filterConfig: action.filterConfig
            }
        };
    },
    [APPLICATION_FILTER_PREDICATE_CHANGED](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                predicate: action.predicate,
                filterArr: action.filterArr
            }
        };
    },
    [APPLICATION_FILTER_COLUMNS_CHANGED](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                currentCheckColumns: action.currentCheckColumns
            }
        };
    },
    [APPLICATION_FILTER_FILTERVALUE_CHANGES](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                filterConfig: action.filterConfig
            }
        };
    },
    [APPLICATION_FILTER_SEARCH_TYPES_SUCCESS](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                topoTypeDatas: action.topoTypeDatas
            }
        };
    },
    [APPLICATION_FILTER_REFRESH](state, action) {
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
