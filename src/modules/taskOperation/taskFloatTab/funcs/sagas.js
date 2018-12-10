import {
// put, 
// call, 
// takeLatest, 
// fork
} from "redux-saga/effects";
// import {
//     // TASK_SUBIT_UPLOAD_FILE
// } from "./actionTypes";
// import * as actions from "./actions";
// import {
//     // uploadFile
// } from "api/workflow";
// import { actions as msg } from "modules/messageCenter";
// import _ from "lodash";
// import { I18n } from "react-i18nify";
// const moduleName = I18n.t("workflow.attachments.moduleName");


// function * getBpmFilesByTaskIdAsync(obj){
//     // if(!obj.taskId) return;
//     // console.log("getBpmFilesByTaskIdAsync", obj);
//     try{
//         if(obj.taskId && obj.taskId !== -1){
//             const result = yield call(getFileByTaskId, obj.taskId);
//             if (result && result.status) {
//                 if (result.status.code === "00000000") {
//                     if (result.status.code === "00000000") {
//                         // if(result.bpmfiles.length > 0) {
//                         console.log(result);
//                         let bpmFileId = [];
//                         if(result.bpmfiles.length){
//                             let fileIds = result.bpmfiles.map(item =>{
//                                 return item.fileid;
//                             });
//                             bpmFileId = fileIds;
//                             console.log(bpmFileId);
//                         }
//                         console.log(bpmFileId);
//                         yield put(actions.getBpmFilesByTaskIdSuccess(obj.identify, bpmFileId));
//                         // intitalFiles = intitalFiles.concat(fileIds);
//                         // console.log(intitalFiles);
//                         // const resultList = yield call(getBpmFilesInfo, fileIds.toString());
        
//                         // if(resultList && resultList.status) {
//                         //     if (resultList.status.code === "00000000") {
//                         //         // console.log(resultList);
//                         //         yield put(actions.bpmFilesInfo(obj.identify, resultList.files, true));
//                         //     }else {
//                         //         yield put(msg.error(resultList.status.messages, moduleName));
//                         //         // throw new Error(resultList.status.message);
//                         //     }
//                         // }
//                         // } else {
//                         //     let files = [];
//                         //     yield put(actions.getBpmFilesInfoAsyncSuccess(obj.identify, files, true));
//                     }
//                 } else {
//                     yield put(msg.error(result.status.messages, moduleName));
//                     // throw new Error(result.status.message);
//                 }
//             }
//         }else{
//             let bpmfiles = undefined;
//             yield put(actions.getBpmFilesByTaskIdSuccess(obj.identify, bpmfiles));
//         }
//     }catch(e){
//         console.log(e); 
//     }
// }


export default function * root(){
    yield [
        // fork(submitTaskFileSaga)
    ];
}