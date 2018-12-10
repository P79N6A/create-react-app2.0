import {
    WORKFLOW_UPDATE,
    WORKFLOW_TASK_LIST_SUCCESS
} from "./actionTypes";
import createReducer from "commons/utils/reducerHelper";

const initialState = {};

const workflowData = {
    [WORKFLOW_UPDATE](state, action) {
        return { 
            ...state,
            [action.identify]: {
                ...state[action.identify],
                modelXml: action.payload
            }
        };
    },
    [WORKFLOW_TASK_LIST_SUCCESS](state, action) {
        console.log(action);
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify], 
                taskList: action.payload
            }
        };
    }
};

const workflowReducer = createReducer(initialState, Object.assign({}, workflowData));

export default workflowReducer;