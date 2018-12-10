import {
    TASK_GET_FILE_INFO_SUCCESS,
    TASK_REMOVE_IS_LOADING,
    TASK_GET__FILE_BY_TASKID_SUCCESS,
    TASK_GET__FILE_BY_UPADE_SUCCESS
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

const attachments = {
    [TASK_GET_FILE_INFO_SUCCESS](state, action) {
        // console.log(action);
        // console.log(state);
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                files: action.files,
                isLoading: false,
                isUploadFile: action.isUploadFile
            }
        };
    },
    [TASK_REMOVE_IS_LOADING](state, action) {
        // console.log(action);
        // console.log("isLoading");
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                isLoading: false,
            }
        };
    },
    [TASK_GET__FILE_BY_TASKID_SUCCESS](state, action) {
        // console.log(action);
        // console.log("isLoading");
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                isLoading: false,
                bpmfiles: action.bpmfiles
            }
        };
    },
    [TASK_GET__FILE_BY_UPADE_SUCCESS](state, action) {
        // console.log(action);
        // console.log("isLoading");
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                allFiles: action.bpmfiles,
                isLoading: false,
                isUploadFile: action.isUploadFile
            }
        };
    },
};

const attachmentsReducer = createReducer(initialState, Object.assign({}, attachments));

export default attachmentsReducer;