import {
    // put, 
    // call, 
    // takeLatest, 
    fork
} from "redux-saga/effects";
import {
// TASK_SUBIT_UPLOAD_FILE,
// TASK_GET_UPLOAD_FILE,
// TASK_GET_FILE_INFO,
// TASK_REMOVE_FILE
} from "./actionTypes";
// import * as actions from "./actions";
import {
// uploadFile,
// bpmFile,
// getUploadFiles,
// getBpmFilesInfo,
// getDetailMedia,
// deletBpmFile,
// deletFile,
// getTaskInfo
} from "api/workflow";
// import { actions as msg } from "modules/messageCenter";
// import _ from "lodash";
// import { I18n } from "react-i18nify";
// const moduleName = I18n.t("workflow.attachments.moduleName");
// function * submitTaskFileAsync(obj){
//     // console.log("submitTaskFileAsync:", obj);
//     // var identify = content.identify;
//     try{
//         const result = yield call(uploadFile, obj.file);
//         if (result && result.status) {
//             if (result.status.code === "00000000") {

//                 const resultList = yield call(bpmFile, obj.alarm, result.mediaFileUrls[0]);

//                 if(resultList && resultList.status) {
//                     if (resultList.status.code === "00000000") {
//                         yield put(actions.getBpmFiles(obj.identify, obj.alarm.alarmids));

//                         // let messages = "Upload Success";
//                         yield put(msg.success(I18n.t("workflow.attachments.attachmentsUploadSuccess"), moduleName));
//                     }else {
//                         yield put(msg.error(resultList.status.message, moduleName));
//                         // throw new Error(resultList.status.message);
//                     }
//                 }
//             } else {
//                 yield put(msg.error(result.status.messages, moduleName));
//                 // throw new Error(result.status.message);
//             }
//         } else {
//             throw new Error("unkown error!");
//         }
//     }catch(e){
//         console.log(e);
//     }
// };
function * submitTaskFileSaga() {
    // yield takeLatest(TASK_SUBIT_UPLOAD_FILE, submitTaskFileAsync);
};
export default function * root(){
    yield [
        fork(submitTaskFileSaga),
    ];
}