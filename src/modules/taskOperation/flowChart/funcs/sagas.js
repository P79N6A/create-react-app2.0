import {put, call, takeLatest, fork} from "redux-saga/effects";
import {
    WORKFLOW_REQUEST, 
    // WORKFLOW_TASK_LIST
} from "./actionTypes";
import * as actions from "./actions";
import {
    // taskList, 
    modelXml,
    // getTaskInfo
} from "api/workflow";
// import { actions as msg } from "modules/messageCenter";
// import qs from "commons/utils/queryStringHelper";
// import { I18n } from "react-i18nify";
// const moduleName = I18n.t("workflow.currentTask.moduleName");
function * getWorkflowGraph(obj){
    // console.log("getWorkflowGraph:", alarm);
    // console.log(alarm);
    // if (Object.keys(alarm.payload).length === 0) 
    //     return false;
    if (obj.processdefinitionid === "") 
        return false;
    try{
        let identify = obj.identify;
        const resultXml = yield call(modelXml, obj.processdefinitionid);
        if(resultXml && resultXml.status) {
            if (resultXml.status.code === "00000000") {
                yield put(actions.updateWorkflow(identify, resultXml.model));
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
function * getGraphSaga() {
    yield takeLatest(WORKFLOW_REQUEST, getWorkflowGraph);
};
export default function * root(){
    yield [
        fork(getGraphSaga)
        // fork(getTaskInfoAsynSaga),
    ];
}