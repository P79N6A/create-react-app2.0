import {
    // SAVE_KPI_REQUEST,
    CHANGE_PROPERTY,
    SAVE_KPI_SUCCESS,
    SAVE_KPI_FAILURE,
    KPI_GET_DBLIST_SUCCESS,
    KPI_PREVIEW_REQUEST,
    KPI_PREVIEW_SUCCESS,
    // GET_KPI_LIST_REQUEST,
    GET_KPI_LIST_SUCCESS,
    // GET_KPI_LIST_FAILURE,
    // KPI_PREVIEW_FAILURE
} from "./actionTypes";
// import * as FilterTypes from "./constants";
import createReducer from "commons/utils/reducerHelper";

const initialState = {};

const kpiQueryBuilder = {
    [CHANGE_PROPERTY](state, action) {
        let identify = action.identify;
        let name = action.parameterName;
        return {
            ...state,
            [identify]: {
                ...state[identify],
                [name]: action.value
            }
        };
    },
    [GET_KPI_LIST_SUCCESS](state, action) {
        let identify = action.identify;
        return {
            ...state,
            [identify]: {
                ...state[identify],
                serviceList:action.serviceList
            }
        };
    },
    [SAVE_KPI_SUCCESS](state, action) {
        let identify = action.identify;
        return {
            ...state,
            [identify]: {
                ...state[identify],
                message:action.message
            }
        };
    },
    [SAVE_KPI_FAILURE](state, action) {
        let identify = action.identify;
        return {
            ...state,
            [identify]: {
                ...state[identify],
                message:action.message
            }
        };
    },
    [KPI_PREVIEW_REQUEST](state, action) {
        let identify = action.identify;
        return {
            ...state,
            [identify]: {
                ...state[identify],
                showTable: true
            }
        };
    },
    [KPI_PREVIEW_SUCCESS](state, action) {
        let identify = action.identify;
        return {
            ...state,
            [identify]: {
                ...state[identify],
                preview: action.recordset,
                columns: action.keyList
            }
        };
    },
    [KPI_GET_DBLIST_SUCCESS](state, action) {
        let identify = action.identify;
        return {
            ...state,
            [identify]: {
                ...state[identify],
                dbList: action.payload
            }
        };
    }
};

const filterReducer = createReducer(initialState, Object.assign({}, kpiQueryBuilder));

export default filterReducer;
