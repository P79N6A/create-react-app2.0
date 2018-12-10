import {put, call, takeLatest, fork} from "redux-saga/effects";
import {
    SOP_LIST_QRQUEST,
    SOP_LIST_PAGINATIONCHANGE_CHANGE,
    SOP_ADD_NEW_SOPS,
    SOP_ADD_NEW_FLOW_FILE,
    SOP_LIST_DELET,
    SOP_EDIT_SOPS,
    SOP_GET_SOP_MANAGMENT_SCHEMA
} from "./actionTypes";
import * as actions from "./actions";
import { actions as messages } from "modules/messageCenter";
import {
    searchList,
    addSops,
    deletSops,
    editSop,
    getSopManagmentSchema
} from "api/sop";
import { sopManagmentSchema } from "./formatSchema";
import { I18n } from "react-i18nify";
var fileData;
const moduleName = I18n.t("sop.moduleName");
function * getSopListAsyn(action) {
    // console.log("getSopListAsyn:", action);
    // console.log(action);
    var identify = action.identify;
    var postData = {
        keyWord: action.keyWord || "",
        pagination:{
            limit: action.pagination.limit,
            currentpage: action.pagination.currentpage
        },
        sortorders: action.sortorders
    };
    try{
        // console.log(keyWord);
        const result = yield call(searchList, postData);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                yield put(actions.searchSopListQequestSuccess(identify, result, action.sortLists, action.sortorders,action.orderDirection, action.orderDisplayName, action.orderBy));
            } else {
                throw new Error(result.status.message);
            }
        } else {
            throw new Error("unkown error!");
        }
    } catch (e) {
        console.log(e);
    }
        
};
function * getSopListByPageAsyn(action) {
    // console.log("getSopListByPageAsyn:", action);
    var identify = action.identify;
    var postData = {
        keyWord: action.action.keyWord || "",
        pagination:{
            limit: action.action.pagination.limit,
            currentpage: action.action.pagination.currentpage
        },
        sortorders: action.action.sortorders
    };
    try{
        // console.log(keyWord);
        const result = yield call(searchList, postData);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                yield put(actions.searchSopListQequestSuccess(identify, result, action.action.sortLists, action.action.sortorders, action.action.orderDirection, action.action.orderDisplayName, action.action.orderBy));
            } else {
                throw new Error(result.status.message);
            }
        } else {
            throw new Error("unkown error!");
        }
    } catch (e) {
        console.log(e);
    }
        
};
function * addNewSopsAsyn(fromData) {
    // console.log(`getSopListByPageAsyn:${action}`);
    // console.log("addNewSopsAsyn:",fromData);
    let file = fileData;
    var identify = fromData.fromData.identify;
    // console.log(file);
    if(file === undefined){
        // let message = {
        //     message:  "File is not provided. Please provide file.",
        //     type: "error"
        // };
        // yield put(actions.messageInfo(identify, message));

        // let message = "File is not provided. Please provide file.";
        yield put(messages.error(I18n.t("sop.fileError"), moduleName));
        return false;
    }
    // console.log(file)
    // fromData: fromData,
    // identify,
    // keyWord, 
    // sortorders, 
    // sortLists, 
    // orderDirection, 
    // orderDisplayName, 
    // orderBy,
    // pagination: pagination,
    var postData = {
        pagination: fromData.pagination,
        fromData: fromData.fromData,
        file: file
    };
    // var paginationData = fromData.fromData.pagination;
    // var keyWord = "";
    try{
        // console.log(keyWord);
        const result = yield call(addSops, postData);
        // console.log(result);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                // console.log(paginationData);
                // let message = {
                //     message: "Create Sop successfully",
                //     type: "success"
                // };
                // let message = "Create Sop successfully";
                yield put(messages.success(I18n.t("sop.addSuccess"), moduleName));
                // identify, keyWord, sortorders, sortLists, orderDirection, orderDisplayName, orderBy, pagination
                yield put(actions.searchSopListQequest(identify, fromData.fromData.keyWord, fromData.fromData.sortorders, fromData.fromData.sortLists, fromData.fromData.orderDirection, fromData.fromData.orderDisplayName, fromData.fromData.orderBy, fromData.fromData.pagination));
                
            } else {
                // let message = {
                //     message: result.status.message,
                //     type: "error"
                // };
                // yield put(actions.messageInfo(identify, message));
                let message = result.status.message;
                yield put(messages.error(message, moduleName));
                // throw new Error(result.status.message);
            }
        } else {
            throw new Error("unkown error!");
        }
    } catch (e) {
        console.log(e);
    }  
};
function * deletListAsyn(obj) {
    // console.log(obj);
    var identify = obj.identify;
    var postData = {
        pagination: obj.data.pagination,
        id: obj.data.sops,
    };
    // pagination,
    // keyWord,
    // sops: item,
    // sortorders,
    // sortLists,
    // orderDirection,
    // orderDisplayName,
    // orderBy
    // var keyWord = "";
    try{
        // console.log(keyWord);
        const result = yield call(deletSops, postData.id);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                // identify, keyWord, sortorders, sortLists, orderDirection, orderDisplayName, orderBy, pagination
                yield put(actions.searchSopListQequest(identify, obj.data.keyWord,  obj.data.sortorders, obj.data.sortLists, obj.data.orderDirection,obj.data.orderDisplayName,obj.data.orderBy,obj.data.pagination));
                // let message = {
                //     message: "Delet Sop successfully",
                //     type: "success"
                // };
                // yield put(actions.messageInfo(identify, message));

                // let message ="Delet Sop successfully";
                yield put(messages.success(I18n.t("sop.deleteSuccess"), moduleName));

            } else {
                // let message = {
                //     message: result.status.message,
                //     type: "error"
                // };
                // yield put(actions.messageInfo(identify, message));

                let message = result.status.message;
                yield put(messages.error(message, moduleName));
                // throw new Error(result.status.message);
            }
        } else {
            throw new Error("unkown error!");
        }
    } catch (e) {
        console.log(e);
    }
};
function * addNewSopsFileAsyn(file) {
    // console.log(`getSopListByPageAsyn:${action}`);
    // console.log("sagas:",file);
    fileData = file.file;
    // console.log(fileData);
    var fileName =fileData.name.split(".");
    var fileType = fileName[fileName.length-1];
    // console.log(fileName[fileName.length-1]);
    // return file;
    try{
        // console.log(keyWord);
        if(fileType !== "xml"){
            // let message = {
            //     message: "Upload file type must be xml!",
            //     type: "error"
            // };
            // yield put(actions.messageInfo(file.identify, message));

            // let message = "Upload file type must be xml!";
            yield put(messages.error(I18n.t("sop.fileXml"), moduleName));

            return;
        }
        yield call(addSops, "file");
    } catch (e) {
        // console.log(e);
    }
};
function * editSopListAsync(obj) {
    // console.log("editSopListAsync:",obj);
    var identify = obj.fromData.identify;
    var postData = {
        fromData: obj.fromData.fromData
    };
    // var keyWord = "";
    // var paginationData = obj.fromData.pagination;
    try{
        // console.log(keyWord);
        const result = yield call(editSop, postData);
        // console.log(result);
        if (result && result.status) {
            if (result.status.code === "00000000") {

                // let message = "Edit Sop successfully";
                yield put(messages.success(I18n.t("sop.updateSuccess"), moduleName));
            
                yield put(actions.searchSopListQequest(identify, obj.fromData.keyWord, obj.fromData.sortorders, obj.fromData.sortLists, obj.fromData.orderDirection, obj.fromData.orderDisplayName, obj.fromData.orderBy, obj.fromData.pagination));
            } else {
                // let message = {
                //     message: result.status.message,
                //     type: "error"
                // };
                // yield put(actions.messageInfo(identify, message));

                let message = result.status.message;
                yield put(messages.error(message, moduleName));
                // throw new Error(result.status.message);
            }
        } else {
            throw new Error("unkown error!");
        }
    } catch (e) {
        console.log(e);
    }
};
function * getSopManagmentSchemaAsync(obj) {
    // console.log("getSopManagmentSchemaAsync:", obj);
    // let identify = obj.identify;
    let siteName = obj.siteName;
    try{
        // console.log(keyWord);
        const result = yield call(getSopManagmentSchema, siteName);
        // console.log(result);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                let configs = result.config;
                let sopSchema = sopManagmentSchema(configs);
                if (sopSchema && sopSchema.sops) {
                    yield put(actions.getSopManagmentSchemaSuccess(obj.identify, obj.schemaType, sopSchema));
                } else {
                    throw new Error("Incorrect sopManagment Schema.");
                }
            } else {
                // let message = {
                //     message: result.status.message,
                //     type: "error"
                // };
                // yield put(actions.messageInfo(identify, message));

                let message = result.status.message;
                yield put(messages.error(message, moduleName));
                // throw new Error(result.status.message);
            }
        } else {
            throw new Error("unkown error!");
        }
    } catch (e) {
        console.log(e);
    }
};
function * getSopListAsynSaga() {
    yield takeLatest(SOP_LIST_QRQUEST, getSopListAsyn);
};
function * getSopListByPageSaga() {
    yield takeLatest(SOP_LIST_PAGINATIONCHANGE_CHANGE, getSopListByPageAsyn);
};
function * addNewSopsAsynSaga() {
    yield takeLatest(SOP_ADD_NEW_SOPS, addNewSopsAsyn);
};
function * addNewSopsFileSaga() {
    yield takeLatest(SOP_ADD_NEW_FLOW_FILE, addNewSopsFileAsyn);
};
function * deletListAsynSaga() {
    yield takeLatest(SOP_LIST_DELET, deletListAsyn);
};
function * editSopListAsyncSaga() {
    yield takeLatest(SOP_EDIT_SOPS, editSopListAsync);
};
function * getSopManagmentSchemaSaga() {
    yield takeLatest(SOP_GET_SOP_MANAGMENT_SCHEMA, getSopManagmentSchemaAsync);
};

export default function * root(){
    yield [
        fork(getSopListAsynSaga),
        fork(getSopListByPageSaga),
        fork(addNewSopsAsynSaga),
        fork(addNewSopsFileSaga),
        fork(deletListAsynSaga),
        fork(editSopListAsyncSaga),
        fork(getSopManagmentSchemaSaga),
    ];
}
