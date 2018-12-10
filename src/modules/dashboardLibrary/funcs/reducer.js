/*
 * =========================================================================
 *  Copyright (C)2015 NCS Pte. Ltd. All Rights Reserved
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
 * Created by @Luo Jia alex on 29/05/15.
 */
import {
    DASHBOARD_ADD,
    DASHBOARD_DELETE,
    DASHBOARD_REQUEST,
    DASHBOARD_REQUEST_SUCCESS,
    WIDGET_ADD,
    TOOGLE_SCALE,
    WIDGET_SAVE,
    WIDGET_SAVE_SUCCESS,
    DASHBOARD_DELETE_SUCCESS,
    REST_CURRITEM,
    DASHBOARD_DELETE_REQUEST,
    DASHBOARD_ADD_SUCCESS,
    DASHBOARD_GET_SUCCESS,
    DASHBOARD_GET,
    DASHBOARD_EDIT,
    DASHBOARD_REFRESH_TITLE,
    DASHBOARD_FILTER,
    REST_DASHBOARD_ITEM,
    DASHBOARD_SET_PAGEKEY,
    GROUP_ADD_REQUEST,
    GROUP_ADD_REQUEST_SUCCESS,
    DASHBOARD_GROUP_REQUEST,
    DASHBOARD_GROUP_REQUEST_SUCCESS,
    DASHBOARD_GROUP_DELETE_REQUEST,
    DASHBOARD_GROUP_DELETE_REQUEST_SUCCESS,
    DASHBOARD_GROUP_EDIT_REQUEST,
    DASHBOARD_GROUP_EDIT_REQUEST_SUCCESS,
    DASHBOARD_DUPLICATE_REQUEST,
    GROUPLIST_UPDATE_REQUEST,
    COUNT_REQUEST_SUCCESS,
    TEMPLATE_SAVE_REQUEST_SUCCESS,
    DASHBOARD_GROUP_FILTER,
    DASHBOARD_GROUP_PUSH_ITEM,
    DDASHBOARD_LOADING_COVER,
    DASHBOARD_GET_CUSTOMIZED_DASHBOARDS,
    DASHBOARD_GET_CUSTOMIZED_DASHBOARD_KEY
} from "./actionTypes";
import createReducer from "commons/utils/reducerHelper";
import { initialState } from "./constants";

const dashboard = {
    [DASHBOARD_REQUEST](state, action) {
        return { ...state, loading: true, searchData: Object.assign({}, state.searchData, action.searchData) };
    },
    [DASHBOARD_REQUEST_SUCCESS](state, action) {
        if (!action.dashboardData) return { ...state };
        let pageno = null;
        const { favouriteTrigger, pageable } = action;
        if (favouriteTrigger) {
            pageno = pageable.pageno;
        } else {
            pageno = state.searchData.pageable["pageno"];
        }
        let rootData = action.dashboardData;
        return {
            ...state,
            dashboardsLen: action.dashboardsLen ? action.dashboardsLen : state.dashboardsLen,
            payload: pageno === 0 ? rootData : state.payload.concat(rootData),
            loading: false,
            searchData: Object.assign({}, state.searchData, { pageable: action.pageable || state.searchData.pageable }),
            total: action.total !== null ? action.total : state.total
        };
    },
    [DASHBOARD_ADD](state, action) {
        return { ...state, loading: true };
    },
    [DASHBOARD_SET_PAGEKEY](state, action) {
        return { ...state, pageId: action.pageId };
    },
    [DASHBOARD_ADD_SUCCESS](state, action) {
        return {
            ...state,
            pageKey: action.data.pagekey,
            payload: state.payload.concat(action.data),
            clonePayload: state.clonePayload.concat(action.data)
        };
    },
    [WIDGET_ADD](state, action) {
        return {
            ...state,
            isShowModal: {
                widget: action.widget || false,
                chartType: action.chartType || false
            }
        };
    },
    [TOOGLE_SCALE](state, action) {
        let currItem = state.payload.filter(item => item.pageKey === action.key);
        return {
            ...state,
            isScale: typeof action.isScale === "boolean" ? action.isScale : !state.isScale,
            currItem: currItem.length ? currItem[0] : {},
            dashboardItem: action.isScale ? state.dashboardItem : {}
        };
    },
    [WIDGET_SAVE](state, action) {
        return { ...state };
    },
    [WIDGET_SAVE_SUCCESS](state, action) {
        return { ...state };
    },
    [DASHBOARD_DELETE](state, action) {
        return {
            ...state,
            isDelete: typeof action.isDelete ? action.isDelete : false
        };
    },
    [DASHBOARD_DELETE_REQUEST](state, action) {
        return { ...state, currItem: {}, dashboardItem: {} };
    },
    [DASHBOARD_DELETE_SUCCESS](state, action) {
        return {
            ...state,
            isDeletePagekey: action.key,
            currItem: {}
        };
    },
    [REST_CURRITEM](state, action) {
        return { ...state, ...action.reset };
    },
    [REST_DASHBOARD_ITEM](state, action) {
        return { ...state, dashboardItem: {} };
    },
    [DASHBOARD_GET](state, action) {
        return { ...state };
    },
    [DASHBOARD_GET_SUCCESS](state, action) {
        return { ...state, dashboardItem: action.data || {} };
    },
    [DASHBOARD_EDIT](state, action) {
        return { ...state };
    },
    [DASHBOARD_REFRESH_TITLE](state, action) {
        let newData = state.payload.map(item => {
            if (item.pageKey === action.key) {
                item.name = action.title;
            }
            return item;
        });
        let cloneData = state.clonePayload.map(item => {
            if (item.pageKey === action.key) {
                item.name = action.title;
            }
            return item;
        });
        let currItem = Object.assign(state.currItem, {
            configValue: { ...state.currItem.configValue, title: action.title }
        });
        return {
            ...state,
            payload: newData,
            currItem: currItem,
            clonePayload: cloneData
        };
    },
    [DASHBOARD_FILTER](state, action) {
        if (!action.text) return { ...state, payload: state.clonePayload };
        let reg = new RegExp(action.text.toLowerCase());
        // eval("/" + action.text.toLowerCase() + "/g");
        let filterData = state.clonePayload.filter(item => {
            return reg.test(item.name.toLowerCase());
        });
        return { ...state, payload: filterData };
    },
    [GROUP_ADD_REQUEST](state, action) {
        return {
            ...state
        };
    },
    [GROUP_ADD_REQUEST_SUCCESS](state, action) {
        return {
            ...state,
            groupData: action.groupData
        };
    },
    [DASHBOARD_GROUP_REQUEST](state, action) {
        return {
            ...state
        };
    },
    [DASHBOARD_GROUP_REQUEST_SUCCESS](state, action) {
        let rootGroup = action.groupData.map(item => {
            item.pageLen = item.page.length;
            return item;
        });
        return {
            ...state,
            groupData: rootGroup,
            cloneGroupData: rootGroup
        };
    },
    [DASHBOARD_GROUP_DELETE_REQUEST](state, action) {
        return {
            ...state
        };
    },
    [DASHBOARD_GROUP_DELETE_REQUEST_SUCCESS](state, action) {
        return {
            ...state
        };
    },
    [DASHBOARD_GROUP_EDIT_REQUEST](state, action) {
        return {
            ...state
        };
    },
    [DASHBOARD_GROUP_EDIT_REQUEST_SUCCESS](state, action) {
        return {
            ...state
        };
    },
    [DASHBOARD_GROUP_PUSH_ITEM](state, action) {
        let newGroupData = state.groupData.concat(action.groupItem);
        let pageKey = action.groupItem.page[0];
        let id = action.groupItem.id;
        let newPayload = state.payload.map(item => {
            if (pageKey === item.pageKey) {
                item.groups = item.groups ? item.groups.concat(id) : [].concat(id);
            }
            return item;
        });
        return {
            ...state,
            groupData: newGroupData,
            cloneGroupData: newGroupData,
            payload: newPayload
        };
    },
    [DASHBOARD_DUPLICATE_REQUEST](state, action) {
        return {
            ...state
        };
    },
    [GROUPLIST_UPDATE_REQUEST](state, action) {
        return {
            ...state,
            groupList: action.groupList
        };
    },
    [DASHBOARD_GROUP_FILTER](state, action) {
        let condition = action.search.replace(/^\s+|\s+$/g);
        if (!condition) return { ...state, cloneGroupData: state.groupData };
        let reg = new RegExp(condition.toLowerCase());
        let flterGroup = state.groupData.filter(item => {
            return reg.test(item.id.toLowerCase());
        });
        return { ...state, cloneGroupData: flterGroup };
    },
    [COUNT_REQUEST_SUCCESS](state, action) {
        return {
            ...state,
            countData: action.countData
        };
    },
    [TEMPLATE_SAVE_REQUEST_SUCCESS](state, action) {
        return {
            ...state,
            userSubmitTemplates: action.userSubmitTemplates
        };
    },
    [DDASHBOARD_LOADING_COVER](state, action) {
        return {
            ...state,
            loading: action.loading
        };
    },
    [DASHBOARD_GET_CUSTOMIZED_DASHBOARDS](state, action) {
        const { customizedDashboards } = action.payload;
        return Object.assign({}, state, {
            customizedDashboards
        });
    },
    [DASHBOARD_GET_CUSTOMIZED_DASHBOARD_KEY](state, action) {
        const { customizedKey } = action.payload;
        return Object.assign({}, state, {
            customizedKey
        });
    }
};

const dashboardReducer = createReducer(initialState, Object.assign({}, dashboard));

export default dashboardReducer;
