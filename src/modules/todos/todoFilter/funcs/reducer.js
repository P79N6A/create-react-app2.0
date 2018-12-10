import { SET_FILTER } from "./actionTypes";
import * as FilterTypes from "./constants";
import createReducer from "commons/utils/reducerHelper";

const initialState = FilterTypes.ALL;

const filter = {
    [SET_FILTER](state, action) {
        return action.filter;
    }
};

const filterReducer = createReducer(initialState, Object.assign({}, filter));

export default filterReducer;
