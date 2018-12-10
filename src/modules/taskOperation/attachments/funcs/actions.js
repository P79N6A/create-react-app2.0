import {
    TASK_SUBIT_UPLOAD_FILE,
    TASK_GET_UPLOAD_FILE,
    TASK_GET_FILE_INFO,
    TASK_GET_FILE_INFO_SUCCESS,
    TASK_REMOVE_FILE,
    TASK_REMOVE_IS_LOADING,
    TASK_GET__FILE_BY_TASKID,
    TASK_GET__FILE_BY_TASKID_SUCCESS,
    TASK_GET__FILE_BY_UPADE_SUCCESS
} from "./actionTypes";

export const uploadFile = (identify, alarm, file) => ({
    type: TASK_SUBIT_UPLOAD_FILE,
    identify, 
    alarm,
    file
});

export const getBpmFiles = (identify, alarmId) => ({
    type: TASK_GET_UPLOAD_FILE,
    identify, 
    alarmId
});
export const bpmFilesInfo = (identify, files) => ({
    type: TASK_GET_FILE_INFO,
    identify, 
    files
});
export const getBpmFilesInfoAsyncSuccess = (identify, files, isUploadFile) => ({
    type: TASK_GET_FILE_INFO_SUCCESS,
    identify, 
    files,
    isUploadFile: isUploadFile
});
export const removeFile = (identify, alarm, fileId) => ({
    type: TASK_REMOVE_FILE,
    identify, 
    alarm, 
    fileId
});
export const isLoading = (identify, isLoading) => ({
    type: TASK_REMOVE_IS_LOADING,
    identify, 
    isLoading, 
});
export const getBpmFilesByTaskId = (identify, taskId) => ({
    type: TASK_GET__FILE_BY_TASKID,
    identify, 
    taskId
});
export const getBpmFilesByTaskIdSuccess = (identify, bpmfiles) => ({
    type: TASK_GET__FILE_BY_TASKID_SUCCESS,
    identify, 
    bpmfiles
});

export const getBpmUpdateFilesInfoAsyncSuccess = (identify, bpmfiles, isUploadFile) => ({
    type: TASK_GET__FILE_BY_UPADE_SUCCESS,
    identify, 
    bpmfiles,
    isUploadFile: isUploadFile
});






