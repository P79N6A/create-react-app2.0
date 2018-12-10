import { initState } from "./constant";
import * as actionTypes from "./actionTypes";
import createReducer from "commons/utils/reducerHelper";

const system = {
    [actionTypes.SECURITY_FORGOT_PASSWORD_USER_REQUEST](state, action) {
        return { ...state, isLoading: true };
    },
    [actionTypes.SECURITY_FORGOT_PASSWORD_RESET](state, action) {
        return { ...state, ...action.reset };
    }
};

export default createReducer(Object.assign({}, initState), system);
