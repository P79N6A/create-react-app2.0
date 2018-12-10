import { initState } from "./constant";
import * as actionTypes from "./actionTypes";
import createReducer from "commons/utils/reducerHelper";
import { activeData } from "./constant";

const system = {
    [actionTypes.ACCOUNT_LIST_REQUEST](state, action) {
        return { ...state, isLoading: true };
    },
    [actionTypes.ACCOUNT_LIST_REQUEST_SUCCESS](state, action) {
        let root = action.payload.map(n => {
            let status = activeData.find(m => m.value === String(n.status));
            n.status = status ? status.label : "Active";
            return n;
        });
        return {
            ...state,
            payload: root,
            paginations: action.paginations
        };
    },
    [actionTypes.ACCOUNT_RESET](state, action) {
        return {
            ...state,
            ...action.reset
        };
    },
    [actionTypes.ACCOUNT_ITEM_REQUEST](state, action) {
        return {
            ...state,
            drawerLoading: true
        };
    },
    [actionTypes.ACCOUNT_ITEM_REQUEST_SUCCESS](state, action) {
        return {
            ...state,
            account: action.account
        };
    },
    [actionTypes.ACCOUNT_SAVE_REQUEST](state, action) {
        return {
            ...state,
            drawerLoading: true
        };
    },
    [actionTypes.ACCOUNT_UPDATE_REQUEST](state, action) {
        return {
            ...state,
            drawerLoading: true
        };
    },
    [actionTypes.ACCOUNT_GROUP_REQUEST_SUCCESS](state, action) {
        const { accountGroupData, flag, pagination } = action;
        return {
            ...state,
            groupSearchData: pagination,
            accountGroupDatas: flag
                ? ["Add a new group"].concat(accountGroupData)
                : state.accountGroupDatas.concat(accountGroupData)
        };
    },
    [actionTypes.ACCOUNT_GET_LOGO_REQUEST_SUCCESS](state, action) {
        return {
            ...state,
            logo: action.logo
        };
    }
};

export default createReducer(Object.assign({}, initState), system);
