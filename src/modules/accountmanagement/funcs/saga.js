import { put, call, takeLatest, fork } from "redux-saga/effects";
import * as actionTypes from "./actionTypes";
import * as actions from "./actions";
import * as message from "modules/messageCenter/funcs/actions";
import {
    getAcountList,
    getAccountItem,
    saveAccount,
    deleteAccount,
    updateAccount,
    saveUrlToSysApi,
    updateUrlToSys,
    getMasterUrls,
    getAccount,
    editAccountGroupConfigs
} from "api/account";
import { upload, removeFile, getFile } from "api/security";
import encode16Bit from "commons/utils/encode16bit";
import token from "commons/utils/tokenHelper";
const modulesName = "Account Management";
function* getAcountListData({ searchData }) {
    try {
        let result = yield call(getAcountList, searchData);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                yield put(actions.getAcountListSuccess(result.accounts, result.pagination));
                yield put(actions.reset({ isLoading: false }));
            } else {
                yield put(actions.reset({ isLoading: false }));
                throw new Error(result.status.message || "UNKOW ERROR!");
            }
        }
    } catch (error) {
        yield put(message.error(error.message, modulesName));
        console.log(error);
    }
}

function* getAccountFromID({ accountid }) {
    try {
        let result = yield call(getAccountItem, accountid);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                let account = result.accounts.length ? result.accounts[0] : {};
                yield put(actions.getAccountFromIDSuccess(account));
                if (account && account.logo) {
                    let logoRes = yield call(getFile, account.logo + encode16Bit.ascii2hex(token.get()));
                    if (logoRes && Array.isArray(logoRes) && logoRes.length) {
                        yield put(actions.getLogoSuccess(logoRes));
                    } else {
                        yield put(actions.reset({ avator: [] }));
                    }
                }
                yield put(actions.reset({ drawerLoading: false }));
            } else {
                yield put(actions.reset({ drawerLoading: false }));
                throw new Error(result.status.message || "UNKOW ERROR!");
            }
        }
    } catch (error) {
        yield put(message.error(error.message, modulesName));
        console.log(error);
    }
}

function* saveAccountData({ accountData, groupData, searchData, fileObj }) {
    // const url = accountData[0].url;
    // delete accountData[0].url;
    try {
        let logo = "";
        if (fileObj) {
            const fileRes = yield call(upload, fileObj.originFileObj);
            if (fileRes && fileRes.status) {
                if (fileRes.status.code === "00000000") {
                    logo = fileRes.mediaFileUrls.length ? fileRes.mediaFileUrls[0] : "";
                } else {
                    throw new Error(fileRes.status.message || "UNKOW ERROR!");
                }
            }
        }
        if (groupData) {
            let groupSaveresult = yield call(editAccountGroupConfigs, groupData);
            if (groupSaveresult && groupSaveresult.status && groupSaveresult.status.code !== "00000000") {
                yield put(actions.reset({ drawerLoading: false, drawerOpen: true, account: {} }));
                throw new Error(groupSaveresult.status.message || "UNKOW ERROR!");
                // return;
            }
        }
        let urlConfig = yield call(getMasterUrls);
        let rootPostData = Object.assign({}, accountData[0], { logo });
        if (urlConfig.status.code === "00000000") {
            let result = yield call(saveAccount, [rootPostData]);
            if (result && result.status) {
                if (result.status.code === "00000000") {
                    let postdata = {
                        configs: urlConfig.configs
                    };
                    let accountid = result.accounts[0] && result.accounts[0].id;
                    let tenantname = result.accounts[0].displayname;
                    yield call(saveUrlToSysApi, postdata, tenantname, accountid);
                    yield put(message.success(result.status.message, modulesName));
                    yield put(actions.getAcountList(searchData));
                    yield put(actions.reset({ drawerLoading: false, drawerOpen: false, account: {} }));
                } else {
                    yield put(actions.reset({ drawerLoading: false, drawerOpen: true }));
                    throw new Error(result.status.message || "UNKOW ERROR!");
                }
            }
        }
    } catch (error) {
        yield put(message.error(error.message, modulesName));
        console.log(error);
    }
}

function* updateAccountData({ accountData, groupData, searchData, fileObj }) {
    // const url = accountData[0].url;
    // delete accountData[0].url;
    try {
        let result3;
        let logo = "";
        if (fileObj) {
            result3 = yield call(upload, fileObj.originFileObj);
        }
        if (result3 && result3.status) {
            if (result3.status.code === "00000000") {
                logo = result3.mediaFileUrls.length ? result3.mediaFileUrls[0] : "";
                if (logo && accountData[0].logo) {
                    yield call(removeFile, accountData[0].logo);
                }
            } else {
                throw new Error(result3.status.message || "UNKOW ERROR!");
            }
        }
        if (groupData) {
            let groupSaveresult = yield call(editAccountGroupConfigs, groupData);
            if (groupSaveresult && groupSaveresult.status && groupSaveresult.status.code !== "00000000") {
                throw new Error(groupSaveresult.status.message || "UNKOW ERROR!");
            }
        }
        let rootData = Object.assign({}, accountData[0], { logo: logo || accountData.logo });
        let result = yield call(updateAccount, [rootData]);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                yield put(message.success(result.status.message, modulesName));
                yield put(actions.getAcountList(searchData));
                yield put(actions.reset({ drawerLoading: false, drawerOpen: false, account: {} }));
            } else {
                yield put(actions.reset({ drawerLoading: false }));
                throw new Error(result.status.message || "UNKOW ERROR!");
            }
        }
    } catch (error) {
        yield put(message.error(error.message, modulesName));
        console.log(error);
    }
}

function* deleteAccountData({ accountids, searchData }) {
    try {
        let result = yield call(deleteAccount, accountids);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                yield put(message.success(result.status.message, modulesName));
                yield put(actions.getAcountList(searchData));
                yield put(actions.reset({ deleteOpen: false, deleteData: [] }));
            } else {
                // yield put(actions.reset({ deleteOpen: false }));
                throw new Error(result.status.message || "UNKOW ERROR!");
            }
        }
    } catch (error) {
        yield put(message.error(error.message, modulesName));
        console.log(error);
    }
}

function* getAccoutGroupListData({ searchData, flag }) {
    try {
        let result = yield call(getAccount, searchData);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                yield put(actions.getAccountGroupListSuccess(result.configs, result.pagination, flag));
            } else {
                // yield put(actions.reset({ deleteOpen: false }));
                throw new Error(result.status.message || "UNKOW ERROR!");
            }
        }
    } catch (error) {
        yield put(message.error(error.message, modulesName));
        console.log(error);
    }
}

function* getAvatorData({ mediaFileId }) {
    try {
        const result = yield call(getFile, mediaFileId);
        if (result && result.length) {
            yield put(actions.getLogoSuccess(result));
        } else {
            throw new Error(result.status.message || "UNKOW ERROR!");
        }
    } catch (e) {
        yield put(message.error(e.message, modulesName));
        console.log(e);
    }
}

// function* saveUrlToSys({ postdata, tenantname }) {
//     try {
//         const result = yield call(saveUrlToSysApi, postdata, tenantname);
//         if (result.status.code === "00000000") {
//             console.log("save url to sys success");
//         }
//     } catch (error) {}
// }
function* updateurlinSys({ postdata, tenantname }) {
    try {
        let result = yield call(updateUrlToSys, postdata, tenantname);
        if (result.status.code === "00000000") {
            console.log("update url to sys success");
        }
    } catch (error) {}
}

function* getAcountListDataSaga() {
    yield takeLatest(actionTypes.ACCOUNT_LIST_REQUEST, getAcountListData);
}
function* getAccountFromIDSaga() {
    yield takeLatest(actionTypes.ACCOUNT_ITEM_REQUEST, getAccountFromID);
}
function* saveAccountDataSaga() {
    yield takeLatest(actionTypes.ACCOUNT_SAVE_REQUEST, saveAccountData);
}
function* updateAccountDataSaga() {
    yield takeLatest(actionTypes.ACCOUNT_UPDATE_REQUEST, updateAccountData);
}
function* deleteAccountDataSaga() {
    yield takeLatest(actionTypes.ACCOUNT_DELETE_REQUEST, deleteAccountData);
}
function* getAccoutGroupListDataSaga() {
    yield takeLatest(actionTypes.ACCOUNT_GROUP_REQUEST, getAccoutGroupListData);
}
// function* saveUrlToSysSaga() {
// yield takeLatest(actionTypes.ACCOUNT_SAVE_URL_TO_SYS, saveUrlToSys);
// }
function* updateUrlInSysSaga() {
    yield takeLatest(actionTypes.ACCOUNT_UPDATE_URL_IN_SYS, updateurlinSys);
}

function* getAvatorDataSaga() {
    yield takeLatest(actionTypes.ACCOUNT_GET_LOGO_REQUEST, getAvatorData);
}

export default function* root() {
    yield [
        fork(updateAccountDataSaga),
        fork(getAcountListDataSaga),
        fork(getAccountFromIDSaga),
        fork(saveAccountDataSaga),
        fork(deleteAccountDataSaga),
        // fork(saveUrlToSysSaga),
        fork(updateUrlInSysSaga),
        fork(getAccoutGroupListDataSaga),
        fork(getAvatorDataSaga)
    ];
}
