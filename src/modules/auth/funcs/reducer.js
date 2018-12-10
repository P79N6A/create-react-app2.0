import * as actions from "./actionTypes";
import createReducer from "commons/utils/reducerHelper";

const initialState = {
    isValid: false,
    isOpenPassword: false,
    isLoading: false
};

const login = {
    [actions.CREATE_IDENTIFY](state, action) {
        return {
            ...state,
            ...action.payload
        };
    },
    [actions.UPDATE_IDENTIFY](state, action) {
        return { ...state, isValid: action.payload };
    },
    [actions.LOGIN_ACCOUNT_SUCCESS](state, action) {
        return { ...state, account: action.payload };
    },
    [actions.LOGIN_CCMS_CONTROL](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                defaultFilterLists: action.defaultFilterLists
            }
        };
    },
    [actions.LOGIN_REQUEST](state, action) {
        return { ...state, loginFlag: true };
    },
    [actions.LOGIN_SUCCESS](state, action) {
        return { ...state, isValid: false, loginFlag: false };
    },
    [actions.LOGIN_FAILURE](state, action) {
        return { ...state, isValid: false, loginFlag: false };
    },
    [actions.LOGOUT_SUCCESS](state, action) {
        return { ...state, isValid: false };
    },
    [actions.LOGOUT_FAILURE](state, action) {
        return { ...state, isValid: false };
    },
    [actions.LOGIN_GROUP](state, action) {
        return { ...state, group: action.group };
    },
    [actions.LOGIN_FORGOT](state, action) {
        return { ...state, open: action.open };
    },
    [actions.LOGIN_RESET](state, action) {
        return { ...state, ...action.reset };
    }
};

const loginReducer = createReducer(initialState, Object.assign({}, login));

export default loginReducer;
