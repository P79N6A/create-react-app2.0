import * as types from "./actionTypes";
// import _ from "lodash";
import { DEFAULT_SEARCH_CONDITION } from "./constants";
// let conditionCache = null;
let appId = "";
let appPath = "";

export const toggleLoadingState = isLoading => {
    return {
        type: types.REQUEST_DASHBOARD_LOADING,
        isLoading
    };
};

export const dashboardRequest = conditions => {
    // in case of someone lose the search conditions &
    // it's easy to control the default search condition or condition is not completed
    let storeConditions = JSON.parse(sessionStorage.getItem("ISC-DASHBOARD-SEARCH-CONDITIONS") || "{}");
    return {
        type: types.REQUEST_DASHBOARDS,
        conditions: Object.assign({}, DEFAULT_SEARCH_CONDITION, storeConditions, conditions)
    };
};

export const groupRequest = appid => {
    return {
        type: types.REQUEST_GROUP,
        payload: {
            appid
        }
    };
};

export const getDashboardSuccess = dashboards => {
    return {
        type: types.REQUEST_DASHBOARD_SUCCESS,
        payload: {
            dashboards
        }
    };
};

export const groupRequestSuccess = groups => {
    return {
        type: types.REQUEST_GROUP_SUCCESS,
        payload: {
            groups
        }
    };
};

export const updatePriority = (pageId, priority, appid) => {
    return {
        type: types.REQUEST_UPDATE_DASHBOARD_PRIORITY,
        payload: {
            pageId,
            appid,
            priority
        }
    };
};

export const requestCounts = (appid, apppath) => {
    if (appid) appId = appid;
    if (apppath) appPath = apppath;
    return {
        type: types.REQUEST_COUNTS,
        payload: {
            appid: appid || appId,
            apppath: apppath || appPath
        }
    };
};

export const requestCountsSuccess = counts => {
    return {
        type: types.REQUEST_COUNTS_SUCCESS,
        counts
    };
};
