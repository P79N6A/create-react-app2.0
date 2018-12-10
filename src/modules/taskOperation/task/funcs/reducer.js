import {
    TASK_SEARCH_TEXT_CHANGE, 
    TASK_SEARCH_TEXT_CHANGE_SUCCESS,
    TASK_CHECK
} from "./actionTypes";
import createReducer from "commons/utils/reducerHelper";

const initialState = {
    pagination: {
        totalrecords: 0,
        totalpages: 0,
        limit: 10,
        currentpage: 1,
    },
    rowsPerPageOptions: [3, 10, 20, 50, 100, 200],
};

const task = {
    [TASK_SEARCH_TEXT_CHANGE](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                text: action.text
            }
        };
    },
    [TASK_SEARCH_TEXT_CHANGE_SUCCESS](state, result) {
        // console.log(result);
        return {
            ...state,
            [result.identify]: {
                ...state[result.identify],
                taskList: result.result.tasks,
                checkTask: {},
                pagination: result.result.pagination,
                loading: false
            }
        };
    },
    [TASK_CHECK](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                checkTask: action.content
            }
        };
    }
};
const taskReducer = createReducer(initialState, Object.assign({}, task));

export default taskReducer;