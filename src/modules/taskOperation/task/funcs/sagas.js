import {put, call, takeLatest, fork} from "redux-saga/effects";
import {
    TASK_SEARCH_TEXT_CHANGE, 

} from "./actionTypes";
import * as actions from "./actions";
import {
    searchList
} from "api/workflow";
// const moduleName = "Work Flow Task";
function * taskListBySearch(postData){
    // console.log(postData);
    try{
        const result=yield call(searchList, postData.postData);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                // const resultList = yield put(actions.updateTaskList, result.tasks);
                // console.log(result)
                if(result.tasks) {
                    yield put(actions.updateTaskList(postData.identify, result));
                }
                
                // if(resultList && resultList.status) {
                //     if (resultList.status.code === "00000000") {
                //         yield put(actions.taskList(resultList.tasks[0].tasks));
                //     }else {
                //         throw new Error(resultList.status.message);
                //     }
                // }
            } else {
                throw new Error(result.status.message);
            }
        } else {
            throw new Error("unkown error!");
        }
    }catch(e){
        console.log(e);
    };
};
function * taskListBySearchSaga(){
    yield takeLatest(TASK_SEARCH_TEXT_CHANGE, taskListBySearch);
};
export default function * root(){
    yield [
        fork(taskListBySearchSaga)
    ];
}