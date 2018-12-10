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
 * Created by SongCheng on 31/08/2018.
 */
import {
    AUDIT_CCMS_ACTION,
    AUDIT_REQUEST_ITEMSSEARCH,
    AUDIT_REQUEST_SUCCESS,
    AUDIT_REQUEST_FAILED,
    AUDIT_SORTERDATA_SAVE,
    AUDIT_SAVE_ROWSPERPAGE,
    AUDIT_SELECTCOLUMNS_SAVE,
    AUDIT_DRAWER_TOGGLE,
    AUDIT_GETDETAIL_REQUEST_SUCCESS,
    AUDIT_GETREQUESTCONTENT_SUCCESS
} from "./actionTypes";
import createReducer from "commons/utils/reducerHelper";

const initialState = {};
const audit = {
    [AUDIT_REQUEST_ITEMSSEARCH](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                loading: action.loading
            }
        };
    },
    [AUDIT_CCMS_ACTION](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                ...action.props
            }
        };
    },
    [AUDIT_REQUEST_SUCCESS](state, action) {
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
    [AUDIT_REQUEST_FAILED](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                loading: action.loading,
                identify: action.identify
            }
        };
    },
    //save sorter data
    [AUDIT_SORTERDATA_SAVE](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                orderBy: action.orderBy,
                order: action.order,
                sorterData: action.sorterData,
                arrayData: action.newData
            }
        };
    },
    //save AUDIT_SAVE_ROWSPERPAGE
    [AUDIT_SAVE_ROWSPERPAGE](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                pageNo: action.pageNo,
                pageLimit: action.pageLimit
            }
        };
    },
    //save AUDIT_SELECTCOLUMNS_SAVE
    [AUDIT_SELECTCOLUMNS_SAVE](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                columns: action.items,
                columnConfig: action.columnConfig
            }
        };
    },
    //save AUDIT_DRAWER_TOGGLE
    [AUDIT_DRAWER_TOGGLE](state, action) {
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
    //get detail success
    [AUDIT_GETDETAIL_REQUEST_SUCCESS](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                detailData: action.arrayData
            }
        };
    },
    //AUDIT_GETREQUESTCONTENT_SUCCESS
    [AUDIT_GETREQUESTCONTENT_SUCCESS](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                contentBody: action.contentBody
            }
        };
    }
};

const todoReducer = createReducer(initialState, Object.assign({}, audit));

export default todoReducer;
