import {
// TASK_GET_FILE_INFO_SUCCESS,
// TASK_REMOVE_IS_LOADING,
// TASK_GET__FILE_BY_TASKID_SUCCESS
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

const taskFloatTab = {
    // [TASK_GET_FILE_INFO_SUCCESS](state, action) {
    //     // console.log(action);
    //     // console.log(state);
    //     return {
    //         ...state,
    //         [action.identify]: {
    //             ...state[action.identify],
    //             files: action.files,
    //             isLoading: false,
    //             isUploadFile: action.isUploadFile
    //         }
    //     };
    // }
};

const taskFloatTabReducer = createReducer(initialState, Object.assign({}, taskFloatTab));

export default taskFloatTabReducer;