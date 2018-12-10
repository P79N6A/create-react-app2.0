import {
// TASK_GET_FILE_INFO_SUCCESS,
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

const recordList = {
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
    // },
};

const recordListReducer = createReducer(initialState, Object.assign({}, recordList));

export default recordListReducer;