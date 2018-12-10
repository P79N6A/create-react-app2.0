import {
    TASK_SEARCH_TEXT_CHANGE, 
    TASK_SEARCH_TEXT_CHANGE_SUCCESS,
    TASK_CHECK
} from "./actionTypes";

export const checkTask = (identify, content) => ({
    type: TASK_CHECK,
    identify, 
    content
});
export const searchTextChange = (identify, postData) => ({
    type: TASK_SEARCH_TEXT_CHANGE,
    identify,
    postData
});
export const updateTaskList = (identify, result) => ({
    type: TASK_SEARCH_TEXT_CHANGE_SUCCESS,
    identify, 
    result
});


