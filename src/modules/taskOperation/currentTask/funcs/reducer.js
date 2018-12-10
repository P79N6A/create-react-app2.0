import {
    TASK_CHECK_CURRENT_DATA_SUCCESS,
    TASK_CHANGE,
    TASK_SUBIT_MESSAGES_INFO,
    TASK_GET_FILE_INFO,
    TASK_CHECK_CURRENT_XML_SUCCESS,
    TASK_GET_FILE_LIST_SUCCESS
} from "./actionTypes";
import createReducer from "commons/utils/reducerHelper";

const initialState = {
    // messages: [{
    //     type: "success",
    //     message: "",
    //     id: "",
    //     unread: true,
    // }]
};

const currentTask = {
    [TASK_CHANGE](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                selectedRadio: action.payload
            }
        };
    },
    [TASK_CHECK_CURRENT_DATA_SUCCESS](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                tasks: action.content
            }
        };
    },
    [TASK_SUBIT_MESSAGES_INFO](state, action) {
        // console.log(action);
        // console.log(state);
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                message: action.messages
            }
        };
    },
    [TASK_GET_FILE_INFO](state, action) {
        // console.log(action);
        // console.log(state);
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                filesList: action.filesInfo
            }
        };
    },
    [TASK_CHECK_CURRENT_XML_SUCCESS](state, action) {
        // console.log(action);
        // console.log(state);
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                modelXml: action.content
            }
        };
    },
    [TASK_GET_FILE_LIST_SUCCESS](state, action) {
        // console.log(action);
        // console.log(state);
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                intialFileList: action.files,
            }
        };
    },
};

const currentTaskReducer = createReducer(initialState, Object.assign({}, currentTask));

export default currentTaskReducer;