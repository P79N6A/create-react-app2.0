import {put, call, takeLatest, fork} from "redux-saga/effects";
import {
    TASK_SUBMIT, 
    TASK_CHECK_CURRENT_DATA,
    TASK_CHECK_CURRENT_XML,
    TASK_GET_FILE_LIST,
    TASK_GET_FILE
} from "./actionTypes";
import * as actions from "./actions";
import { actions as msg } from "modules/messageCenter";
import {
    submitTask,
    getTaskInfo,
    modelXml,
    getBpmFilesInfo,
    getDetailMedia
} from "api/workflow";
import { I18n } from "react-i18nify";
import _ from "lodash";
const moduleName = I18n.t("workflow.currentTask.moduleName");
function * getTaskInfoAsyn(alarm){
    // console.log(`"getTaskInfoAsyn:"${alarm}`);
    // console.log(alarm);
    // if (Object.keys(alarm.content).length === 0) 
    //     return false;
    if (alarm.alarmId === "") 
        return false;
    // console.log("getTaskInfoAsyn");
    try{
        // console.log(alarm.content.id)
        let alarmid = alarm.alarmId;
        // console.log(alarmid);
        const result = yield call(getTaskInfo, alarmid);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                yield put(actions.currentTaskListSuccess(alarm.identify, result.tasks[0].tasks));
            } else {    
                let tasks = [];
                yield put(actions.currentTaskListSuccess(alarm.identify, tasks));
                // let messages = {
                //     type: "error",
                //     message: result.status.message,
                // };
                // yield put(actions.messagesBox(alarm.identify, messages));

                let message = result.status.message;
                yield put(msg.error(message, moduleName));
                // throw new Error(result.status.message);
            }
        } else {
            // let messages = {
            //     type: "error",
            //     message: result.status.message,
            // };
            // yield put(actions.messagesBox(alarm.identify, messages));

            let message = result.status.message;
            yield put(msg.error(message, moduleName));
            // throw new Error("unkown error!");
        }
    } catch (e) {
        console.log(e);
    }
};
function * submit_Task(content){
    // console.log(content);
    // var identify = content.identify;
    if(!content) return;
    try{
        // let alarmid = content.payload.alarmids;
        const result = yield call(submitTask, content.payload.id, content.payload);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                // let messages = {
                //     type: "success",
                //     message: "Submit success",
                // };
                // yield put(actions.messagesBox(content.identify, messages));

                // let message = "Submit success";

                yield put(msg.success(I18n.t("workflow.currentTask.submitSuccess"), moduleName));

                const resultList = yield call(getTaskInfo, content.payload.alarmids);
                if(resultList && resultList.status) {
                    if (resultList.status.code === "00000000") {
                        // console.log(resultList);
                        
                        yield put(actions.currentTaskListSuccess(content.identify, resultList.tasks[0].tasks));
                        
                        
                    }else {
                        // let messages = {
                        //     type: "error",
                        //     message: resultList.status.message,
                        // };
                        // yield put(actions.messagesBox(content.identify, messages));
                        let message = resultList.status.message;
                        yield put(msg.error(message, moduleName));
                        // throw new Error(resultList.status.message);
                    }
                }
            } else {
                // let messages = {
                //     type: "error",
                //     message: result.status.message,
                // };
                // yield put(actions.messagesBox(content.identify, messages));

                let message = result.status.message;
                yield put(msg.error(message, moduleName));
                // throw new Error(result.status.message);
            }
        } else {
            throw new Error("unkown error!");
        }
    }catch(e){
        console.log(e);
    }
};
function * getCheckTaskXml(alarm){
    // console.log("getWorkflowGraph:", alarm);
    // console.log(alarm);
    if (Object.keys(alarm.content).length === 0) 
        return false;
    try{
        let identify = alarm.identify;
        // const result = yield call(getTaskInfo, alarm.payload.alarmids);
        // if (result && result.status) {
        //     if (result.status.code === "00000000") {
        //         yield put(actions.taskList(identify, result.tasks[0].tasks));
        const resultXml = yield call(modelXml, alarm.content.processdefinitionid);
        if(resultXml && resultXml.status) {
            if (resultXml.status.code === "00000000") {
                yield put(actions.updateWorkflowXml(identify, resultXml.model));
            } else {
                throw new Error(resultXml.status.message);
            }
            // }
            // } else {
            //     throw new Error(result.status.message);
            // }
        } else {
            throw new Error("unkown error!");
        }
    } catch (e) {
        console.log(e);
    }
        
};

function * getTaskPdfFileAsync(obj){
    // console.log("getWorkflowGraph:", alarm);
    // console.log(alarm);
    // if (Object.keys(alarm.content).length === 0) 
    //     return false;
    try{
        let identify = obj.identify;
        // const result = yield call(getTaskInfo, alarm.payload.alarmids);
        // if (result && result.status) {
        //     if (result.status.code === "00000000") {
        //         yield put(actions.taskList(identify, result.tasks[0].tasks));
        const result = yield call(getBpmFilesInfo, obj.fileId.toString());
        if(result && result.status) {
            // console.log(result);
            if (result.status.code === "00000000") {
                yield put(actions.bpmFileInfo(identify, result.files));
            } else {
                // throw new Error(result.status.message);

                yield put(msg.error(result.status.message, moduleName));
            }
            // }
            // } else {
            //     throw new Error(result.status.message);
            // }
        } else {
            throw new Error("unkown error!");
        }
    } catch (e) {
        console.log(e);
    } 
};
function * getBpmFilesInfoAsync(obj){
    // console.log("getBpmFilesInfoAsync:", obj);
    try {
        let arr = [];
        let idArr = obj.file;
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
        // console.log(arr);
        yield put(actions.getBpmFilesInfoAsyncSuccess(obj.identify, arr));
        // console.log("result", arr);
    } catch (e) {
        yield put(msg.error(e.message, moduleName));
    }
}

function * getTaskInfoSaga() {
    yield takeLatest(TASK_CHECK_CURRENT_DATA, getTaskInfoAsyn);
};
function * submitTaskSaga() {
    yield takeLatest(TASK_SUBMIT, submit_Task);
};
function * getCheckTaskXmlSaga() {
    yield takeLatest(TASK_CHECK_CURRENT_XML, getCheckTaskXml);
};

function * getTaskPdfFileAsyncSaga() {
    yield takeLatest(TASK_GET_FILE_LIST, getTaskPdfFileAsync);
};

function * getBpmFilesInfoSaga() {
    yield takeLatest(TASK_GET_FILE, getBpmFilesInfoAsync);
};
export default function * root(){
    yield [
        fork(getTaskInfoSaga),
        fork(submitTaskSaga),
        fork(getCheckTaskXmlSaga),
        fork(getTaskPdfFileAsyncSaga),
        fork(getBpmFilesInfoSaga),
    ];
}