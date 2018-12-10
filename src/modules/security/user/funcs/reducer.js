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
 * Created by Jia Luo on 27/07/2018.
 */
import * as actionTypes from "./actionTypes";

import createReducer from "commons/utils/reducerHelper";
import { initialState } from "./constants";

const user = {
    [actionTypes.SECURITY_USER_LOADING](state, action) {
        return {
            ...state,
            loading: action.loading
        };
    },
    [actionTypes.SECURITY_USER_GET_REQUEST_SUCCESS](state, action) {
        let rootDatas = action.userList.map(item => {
            // item.active = item.active;
            item.userexpiredate = item.userexpiredate
                .replace(/(\d{4})-(\d+)-(\d+)/g, "$1/$2/$3")
                .split(/\//)
                .map(item => {
                    if (item.length === 1) return "0" + item;
                    return item;
                })
                .join("/")
                .substring(0, 10);
            item.userstartdate = item.userstartdate
                .replace(/(\d{4})-(\d+)-(\d+)/g, "$1/$2/$3")
                .split(/\//)
                .map(item => {
                    if (item.length === 1) return "0" + item;
                    return item;
                })
                .join("/")
                .substring(0, 10);
            item.groupList = item.groups
                .sort((a, b) => a.grpname < b.grpname)
                .map(group => {
                    return group.grpname;
                })
                .join(",");
            item.active = item.userstatus !== "-1" ? (item.userstatus === "1" ? "Active" : "Pending") : "Inactive";
            return item;
        });
        return {
            ...state,
            payload: rootDatas,
            pagination: action.pagination,
            loading: false
        };
    },
    [actionTypes.SECURITY_USER_GET_REQUEST](state, action) {
        return {
            ...state,
            loading: true
        };
    },
    [actionTypes.SECURITY_USER_POST_REQUEST](state, action) {
        return {
            ...state,
            // loading: true,
            drawerLoading: true
        };
    },
    [actionTypes.SECURITY_USER_RESET](state, action) {
        return {
            ...state,
            ...action.reset
        };
    },
    [actionTypes.SECURITY_USER_PUT_REQUEST](state, action) {
        return {
            ...state,
            drawerLoading: true
            // loading: true
        };
    },
    [actionTypes.SECURITY_USER_DELETE_REQUEST](state, action) {
        return {
            ...state,
            loading: true
        };
    },
    [actionTypes.SECURITY_USER_DELETE_REQUEST_SUCCESS](state, action) {
        return {
            ...state,
            loading: false
        };
    },
    [actionTypes.SECURITY_USER_SEARCHDATA](state, action) {
        return {
            ...state,
            searchData: Object.assign({}, state.searchData, action.searchData)
        };
    },
    [actionTypes.SECURITY_USER_GET_GROUP_REQUEST_SUCCESS](state, action) {
        return {
            ...state,
            groupAllList: action.flag === true ? state.groupAllList.concat(action.results) : action.results,
            grpPagination: action.pagination
        };
    },
    [actionTypes.SECURITY_USER_GET_FROM_ID_REQUEST](state, action) {
        return {
            ...state,
            drawerLoading: true
        };
    },
    [actionTypes.SECURITY_USER_GET_FROM_ID_REQUEST_SUCCESS](state, action) {
        return {
            ...state,
            drawerLoading: false,
            currUserData: action.userData.length ? action.userData[0] : {}
        };
    },
    [actionTypes.SECURITY_USER_GET_AVATOR_REQUEST_SUCCESS](state, action) {
        return {
            ...state,
            avator: action.avator
        };
    }
};

const userReducer = createReducer(initialState, Object.assign({}, user));
export default userReducer;
