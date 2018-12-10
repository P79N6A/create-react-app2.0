import {
    TASK_CHANGE,
    TASK_CHECK_CURRENT_DATA,
    TASK_SUBMIT,
    TASK_CHECK_CURRENT_DATA_SUCCESS,
    TASK_SUBIT_MESSAGES_INFO,
    TASK_SUBIT_UPLOAD_FILE,
    TASK_GET_UPLOAD_FILE,
    TASK_GET_FILE_INFO,
    TASK_CHECK_CURRENT_XML,
    TASK_CHECK_CURRENT_XML_SUCCESS,
    TASK_GET_FILE_LIST,
    TASK_GET_FILE,
    TASK_GET_FILE_LIST_SUCCESS
} from "./actionTypes";

export const taskSubmit = (identify, payload) =>({
    type: TASK_SUBMIT,
    identify,
    payload
});
export const taskChange = (identify, payload)=>({
    type: TASK_CHANGE,
    identify, 
    payload
});
export const currentTaskList = (identify, alarmId) => ({
    type: TASK_CHECK_CURRENT_DATA,
    identify,
    alarmId
});
export const getCurrentTaskXml = (identify, content) => ({
    type: TASK_CHECK_CURRENT_XML,
    identify,
    content
});
export const updateWorkflowXml = (identify, content) => ({
    type: TASK_CHECK_CURRENT_XML_SUCCESS,
    identify,
    content
});
export const currentTaskListSuccess = (identify, content) => ({
    type: TASK_CHECK_CURRENT_DATA_SUCCESS,
    identify, 
    content
});
export const messagesBox = (identify, messages) => ({
    type: TASK_SUBIT_MESSAGES_INFO,
    identify, 
    messages
});
export const uploadFile = (identify, workData, file) => ({
    type: TASK_SUBIT_UPLOAD_FILE,
    identify, 
    workData,
    file
});

export const getBpmFiles = (identify, workData) => ({
    type: TASK_GET_UPLOAD_FILE,
    identify, 
    workData
});
export const bpmFilesInfo = (identify, filesInfo) => ({
    type: TASK_GET_FILE_INFO,
    identify, 
    filesInfo
});
export const getTaskPdfFile = (identify, fileId) => ({
    type: TASK_GET_FILE_LIST,
    identify, 
    fileId
});
export const bpmFileInfo = (identify, file) => ({
    type: TASK_GET_FILE,
    identify, 
    file
});
export const getBpmFilesInfoAsyncSuccess = (identify, files) => ({
    type: TASK_GET_FILE_LIST_SUCCESS,
    identify, 
    files,
});



