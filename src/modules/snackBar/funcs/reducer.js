import { SNACKBAR_LOAD, SNACKBAR_CLEAR } from "./actionTypes";
import createReducer from "commons/utils/reducerHelper";

const initialState = [];

const message = {
    [SNACKBAR_LOAD](state, action) {
        return {message: Object.assign({}, state, action)};
    },
    [SNACKBAR_CLEAR](state, action) {
        return {message: {}};
    }
};

const messageReducer = createReducer(initialState, Object.assign({}, message));

export default messageReducer;
