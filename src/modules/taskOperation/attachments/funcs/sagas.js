import {put, call, takeLatest, fork} from "redux-saga/effects";
import {
    TASK_SUBIT_UPLOAD_FILE,
    TASK_GET_UPLOAD_FILE,
    TASK_GET_FILE_INFO,
    TASK_REMOVE_FILE,
    TASK_GET__FILE_BY_TASKID
} from "./actionTypes";
import * as actions from "./actions";
import {
    uploadFile,
    bpmFile,
    getUploadFiles,
    getBpmFilesInfo,
    getDetailMedia,
    deletBpmFile,
    deletFile,
    getTaskInfo,
    getFileByTaskId
} from "api/workflow";
import { actions as msg } from "modules/messageCenter";
import _ from "lodash";
import { I18n } from "react-i18nify";
const moduleName = I18n.t("workflow.attachments.moduleName");
function * submitTaskFileAsync(obj){
    // console.log("submitTaskFileAsync:", obj);
    // var identify = content.identify;
    try{
        const result = yield call(uploadFile, obj.file);
        if (result && result.status) {
            if (result.status.code === "00000000") {

                const resultList = yield call(bpmFile, obj.alarm, result.mediaFileUrls[0]);

                if(resultList && resultList.status) {
                    if (resultList.status.code === "00000000") {
                        yield put(actions.getBpmFiles(obj.identify, obj.alarm.alarmids));

                        // let messages = "Upload Success";
                        yield put(msg.success(I18n.t("workflow.attachments.attachmentsUploadSuccess"), moduleName));
                    }else {
                        yield put(msg.error(resultList.status.message, moduleName));
                        yield put(actions.isLoading(obj.identify, false));
                        // throw new Error(resultList.status.message);
                    }
                }
            } else {
                yield put(msg.error(result.status.message, moduleName));
                // throw new Error(result.status.message);
                yield put(actions.isLoading(obj.identify, false));
            }
        } else {
            throw new Error("unkown error!");
        }
    }catch(e){
        console.log(e);
    }
};
function * getBpmFilesAsync(obj){
    // console.log("getBpmFilesAsync:", obj);
    // var identify = content.identify;
    
    try{
        if(obj.alarmId === "") {
            let files = [];
            yield put(actions.getBpmFilesInfoAsyncSuccess(obj.identify, files, false));
            return false;
        }
        const taskResult = yield call(getTaskInfo, obj.alarmId);
        if(taskResult && taskResult.status){
            if(taskResult.status.code === "00000000"){
                let bpmeventsResult = taskResult.bpmevents.bpmevents[0];
                let bpmevents = [bpmeventsResult.file_id1.file_id, bpmeventsResult.file_id2.file_id];
                // console.log(bpmevents);

                let taskBpmevents = taskResult.tasks[0].tasks;
                let intitalFiles = [];
                // console.log(taskBpmevents);
                if(taskBpmevents.length > 1){
                    taskBpmevents.map(item=>{
                        if(item.file_id3 !== undefined || item.file_id4 !== undefined){
                            // console.log(item);
                            let file_id3 = item.file_id3.split("file_id=")[1].split("}", 1)[0];
                            // console.log(file_id3);
                            let file_id4 = item.file_id4.split("file_id=")[1].split("}", 1)[0];
                            let taskFile = [file_id3,file_id4];
                            // return taskBpmevents = [file_id3, file_id4];
                            // console.log(taskFile);
                            intitalFiles = bpmevents.concat(taskFile);
                            // console.log(intitalFiles);
                        }
                        return true;
                    });
                }else{
                    intitalFiles = bpmevents;
                }
                // console.log(intitalFiles);
                const result = yield call(getUploadFiles, obj.alarmId);
                if (result && result.status) {
                    if (result.status.code === "00000000") {
                        // if(result.bpmfiles.length > 0) {
                        // console.log(result);
                        yield put(actions.getBpmUpdateFilesInfoAsyncSuccess(obj.identify, result.bpmfiles, false));

                        let fileIds = result.bpmfiles.map(item =>{
                            return item.fileid;
                        });
                        // console.log(fileIds);
                        intitalFiles = intitalFiles.concat(fileIds);
                        // console.log(intitalFiles);
                        const resultList = yield call(getBpmFilesInfo, intitalFiles.toString());
        
                        if(resultList && resultList.status) {
                            if (resultList.status.code === "00000000") {
                                // console.log(resultList);
                                yield put(actions.bpmFilesInfo(obj.identify, resultList.files, true));
                            }else {
                                yield put(msg.error(resultList.status.message, moduleName));
                                // throw new Error(resultList.status.message);
                            }
                        // }
                        // } else {
                        //     let files = [];
                        //     yield put(actions.getBpmFilesInfoAsyncSuccess(obj.identify, files, true));
                        }
                    } else {
                        yield put(msg.error(result.status.message, moduleName));
                        // throw new Error(result.status.message);
                    }
                } else {
                    throw new Error("unkown error!");
                }
            } else {
                let files = [];
                yield put(actions.getBpmFilesInfoAsyncSuccess(obj.identify, files, false));
                // yield put(msg.error(taskResult.status.messages));
            }
        }
    }catch(e){
        console.log(e);
    }
};
function * getBpmFilesInfoAsync(obj){
    // console.log("getBpmFilesInfoAsync:", obj);
    try {
        let arr = [];
        let idArr = obj.files;
        let token = sessionStorage["ISC-Auth-Token"];
        let hexToken = [];
        for (let i = 0; i < idArr.length; i++) {
            hexToken = [];
            for (let n = 0, len = token.length; n < len; n++) {
                var hex = Number(token.charCodeAt(n)).toString(16);
                hexToken.push((hex.length > 1 && hex) || "0" + hex);
            }
            let fileHexToken =  _.join(hexToken, "");
            // console.log(fileHexToken);
            let id = idArr[i].fileid + fileHexToken;
            const result = yield call(getDetailMedia, id);
            // console.log("result:", result);
            let blob = result[0];
            let res = result[1];

            let objNew = {
                filename: idArr[i].filename,
                fileid: idArr[i].fileid,
                size: idArr[i].size,
                uploadtime: idArr[i].uploadtime,
                useid: idArr[i].useid,
                url: window.URL.createObjectURL(blob),
                urlDown: res.url
            };

            arr.push(objNew);
        }
        yield put(actions.getBpmFilesInfoAsyncSuccess(obj.identify, arr, true));
        // console.log("result", arr);
    } catch (e) {
        yield put(msg.error(e.message, moduleName));
    }
}
function * removeFileAsync(obj){
    // console.log("removeFileAsync:", obj);
    // var identify = content.identify;
    if(!obj.fileId) return;
    try{
        const result = yield call(deletBpmFile, obj.alarm, obj.fileId);
        if (result && result.status) {
            if (result.status.code === "00000000") {

                yield put(actions.getBpmFiles(obj.identify, obj.alarm.alarmid));

                const resultList = yield call(deletFile, obj.fileId);
                if(resultList && resultList.status) {
                    if (resultList.status.code === "00000000") {
                        // let messages = "Delete Success";
                        yield put(msg.success(I18n.t("workflow.attachments.attachmentsRemoveSuccess"), moduleName));
                    }else {
                        yield put(msg.error(resultList.status.message, moduleName));
                        // throw new Error(resultList.status.message);
                    }
                }
            } else {
               
                yield put(msg.error(result.status.message, moduleName));
                yield put(actions.isLoading(obj.identify, false));
                // throw new Error(result.status.message);
            }
        } else {
            throw new Error("unkown error!");
        }
    }catch(e){
        
        yield put(actions.isLoading(obj.identify, false));
        console.log(e);
    }
};

function * getBpmFilesByTaskIdAsync(obj){
    // if(!obj.taskId) return;
    // console.log("getBpmFilesByTaskIdAsync", obj);
    try{
        if(obj.taskId && obj.taskId !== -1){
            const result = yield call(getFileByTaskId, obj.taskId);
            if (result && result.status) {
                if (result.status.code === "00000000") {
                    if (result.status.code === "00000000") {
                        // if(result.bpmfiles.length > 0) {
                        // console.log(result);
                        let bpmFileId = [];
                        if(result.bpmfiles.length){
                            let fileIds = result.bpmfiles.map(item =>{
                                return item.fileid;
                            });
                            bpmFileId = fileIds;
                            // console.log(bpmFileId);
                        }
                        // console.log(bpmFileId);
                        yield put(actions.getBpmFilesByTaskIdSuccess(obj.identify, bpmFileId));
                    }
                } else {
                    yield put(msg.error(result.status.message, moduleName));
                    // throw new Error(result.status.message);
                }
            }
        }else{
            let bpmfiles = undefined;
            yield put(actions.getBpmFilesByTaskIdSuccess(obj.identify, bpmfiles));
        }
    }catch(e){
        console.log(e); 
    }
}

function * submitTaskFileSaga() {
    yield takeLatest(TASK_SUBIT_UPLOAD_FILE, submitTaskFileAsync);
};
function * getBpmFilesSaga() {
    yield takeLatest(TASK_GET_UPLOAD_FILE, getBpmFilesAsync);
};
function * getBpmFilesInfoSaga() {
    yield takeLatest(TASK_GET_FILE_INFO, getBpmFilesInfoAsync);
};
function * removeFileSaga() {
    yield takeLatest(TASK_REMOVE_FILE, removeFileAsync);
};
function * getBpmFilesByTaskIdSaga() {
    yield takeLatest(TASK_GET__FILE_BY_TASKID, getBpmFilesByTaskIdAsync);
};
export default function * root(){
    yield [
        fork(submitTaskFileSaga),
        fork(getBpmFilesSaga),
        fork(getBpmFilesInfoSaga),
        fork(removeFileSaga),
        fork(getBpmFilesByTaskIdSaga)
    ];
}