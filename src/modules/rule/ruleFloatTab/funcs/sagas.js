/*
* =========================================================================
*  Copyright (C)2018 NCS Pte. Ltd. All Rights Reserved
*
*  This software is confidential and proprietary to NCS Pte. Ltd. You shall
*  use this software only in accordance with the terms of the license
*  agreement you entered into with NCS.  No aspect or part or all of this
*  software may be reproduced, modified or disclosed without full and
*  direct written authorisation from NCS.
*
*  NCS SUPPLIES THIS SOFTWARE ON AN "AS IS" BASIS. NCS MAKES NO
*  REPRESENTATIONS OR WARRANTIES, EITHER EXPRESSLY OR IMPLIEDLY, ABOUT THE
*  SUITABILITY OR NON-INFRINGEMENT OF THE SOFTWARE. NCS SHALL NOT BE LIABLE
*  FOR ANY LOSSES OR DAMAGES SUFFERED BY LICENSEE AS A RESULT OF USING,
*  MODIFYING OR DISTRIBUTING THIS SOFTWARE OR ITS DERIVATIVES.
*
*  =========================================================================
*/
/**
 * Created by wangrui on 22/06/2018.
 */
import { put, call, takeEvery, fork } from "redux-saga/effects";
import {
    RULEFLOATTAB_GETDETAIL,
    RULEFLOATTAB_UPDATERULE,
    RULEFLOATTAB_ADDRULE,
    RULEFLOATTAB_GET_TOPOLOGY_LIST,
    RULEFLOATTAB_GET_DEVICEMODEL_INFO,
    RULEFLOATTAB_UPDATE_NOTIFICATION,
    RULEFLOATTAB_GET_ACTION_CONTENT,
    RULEFLOATTAB_CREATE_NOTIFICATION_CONFIG,
    RULEFLOATTAB_CREATE_WORKFLOW_CONFIG
} from "./actionTypes";
import * as actions from "./actions";
import { actions as msg } from "modules/messageCenter";
import { actions as ruleGridActions } from "../../ruleGrid";
import {
    getRuleDetail,
    getRuleData,
    updateRule,
    addRule,
    topologyList,
    deviceModelConfig,
    updateAction,
    actionContent,
    notificationConfig,
    workflowConfig
} from "api/rule";
import { I18n } from "react-i18nify";
import { formatter } from "./util";
// import $ from "jquery";
const moduleName = "Rule";
function* getRulesDetail(obj) {
    try {
        const result = yield call(getRuleDetail, obj.sitename, obj.modulename, obj.submodulename, obj.configname);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                let arrayData = result.config;
                yield put(actions.getRuleDetailSuccess(arrayData, obj.identify));
            } else {
                yield put(msg.warn(result.status.message, moduleName));
                throw new Error(result.status.message);
            }
        }  else {
            yield put(msg.warn(I18n.t("rule.sagasError.ruleDetailError"), `${moduleName}- GetDetail`));
            throw new Error(I18n.t("rule.sagasError.ruleDetailError"));
        }
    } catch (e) {
        yield put(msg.error(e.message, moduleName));
    }
}
function* updateRules(obj) {
    try {
        const result = yield call(updateRule, obj.sitename, obj.modulename, obj.submodulename, obj.configname, obj.configvaldesc, obj.configval, obj.user);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                let resultList = yield call(getRuleData, obj.pageLimit, obj.pageNo, obj.sitename, obj.modulename, obj.submodulename);
                if (resultList.status.code === "00000000") {
                    let pagination = resultList.pagination;
                    let arrayData = resultList.configs;
                    // yield put(actions.updateRuleSuccess(obj.identify));
                    yield put(ruleGridActions.getRuleDataSuccess(pagination, arrayData, obj.identify,  obj.modulename));
                }
                yield put(msg.success(formatter(I18n.t("rule.common.updateSuccess"), obj.configname), moduleName));
            } else {
                yield put(msg.warn(result.status.message, moduleName));
                throw new Error(result.status.message);
            }
        }  else {
            yield put(msg.warn(I18n.t("rule.sagasError.updateRuleError"), `${moduleName}- UpdateRule`));
            throw new Error(I18n.t("rule.sagasError.updateRuleError"));
        }
    } catch (e) {
        yield put(msg.error(e.message, moduleName));
    }
}
function* addRuleData(obj) {
    try {
        const result = yield call(addRule, obj);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                let resultList = yield call(getRuleData, obj.pageLimit, "1", obj.sitename, obj.modulename, obj.submodulename);
                if (resultList.status.code === "00000000") {
                    let pagination = resultList.pagination;
                    let arrayData = resultList.configs;
                    yield put(actions.addRuleSuccess(obj.identify));
                    yield put(ruleGridActions.getRuleDataSuccess(pagination, arrayData, obj.identify, obj.modulename));
                    yield put(msg.success(formatter(I18n.t("rule.common.addSuccess"),obj.configName), moduleName));
                }
            } else {
                yield put(actions.addRuleFailure(obj.identify));
                yield put(msg.warn(result.status.message, moduleName));
                throw new Error(result.status.message);
            }
        }  else {
            yield put(msg.warn(I18n.t("rule.sagasError.addRuleError"), `${moduleName}- AddRule`));
            throw new Error(I18n.t("rule.sagasError.addRuleError"));
        }
    } catch (e) {
        yield put(msg.error(e.message, moduleName));
    }
}
function* getTopologyData(obj) {
    try {
        const result = yield call(topologyList, obj.iotId);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                const deviceModelId = result.arrayData[0] && result.arrayData[0]["devicemodel.iotTopologyId"];
                yield put(
                    actions.getTopologyModelListData(
                        obj.sitename,
                        deviceModelId,
                        obj.identify,
                        result.arrayData[0] && result.arrayData[0]["devicemodel.displayName"]
                    )
                );
            } else {
                yield put(msg.warn(result.status.message, moduleName));
                throw new Error(result.status.message);
            }
        }  else {
            yield put(msg.warn(I18n.t("rule.sagasError.deviceError"), `${moduleName}- GetDevice`));
            throw new Error(I18n.t("rule.sagasError.deviceError"));
        }
    } catch (e) {
        yield put(msg.error(e.message, moduleName));
    }
}
function* getDeviceModelInfo(obj) {
    try {
        const result = yield call(deviceModelConfig, obj.sitename, obj.deviceModelId);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                let conditionSchema = result.objectData;
                yield put(
                    actions.getTopologyModelInfoSuccess(
                        conditionSchema,
                        obj.identify,
                        obj.deviceModelName
                    )
                );
            } else {
                yield put(actions.getTopologyModelInfoFail(obj.identify));
                yield put(msg.warn(result.status.message, moduleName));
                throw new Error(result.status.message);
            }
        } else {
            yield put(msg.warn(I18n.t("rule.sagasError.deviceError"), `${moduleName}- GetDevice`));
            throw new Error(I18n.t("rule.sagasError.deviceModelError"));
        }
    } catch (e) {
        yield put(msg.error(e.message, moduleName));
    }
}
function* updateNotifications(obj) {
    try {
        const result = yield call(updateAction, obj.sitename, obj.modules, obj.userid);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                if (obj.mode.includes("add")) {
                } else {
                    yield put(msg.success(formatter(I18n.t("rule.common.updateSuccess"),obj.configname), moduleName));
                }
            } else {
                yield put(msg.warn(result.status.message, moduleName));
                throw new Error(result.status.message);
            }
        }
    } catch (e) {
        yield put(msg.error(e.message, moduleName));
    }
}
function* createNotificationConfigs(obj) {
    try {
        const result = yield call(notificationConfig, obj.notificationConfig, obj.mode);
        if (result && result.status) {
            if (result.status.code === "00000000") {
            }
        }
    } catch (e) {
        yield put(msg.error(e.message, moduleName));
    }
}
function* workflowConfigs(obj) {
    try {
        const result = yield call(workflowConfig, obj.workflowConfig, obj.mode);
        if (result && result.status) {
            if (result.status.code === "00000000") {
            }
        }
    } catch (e) {
        yield put(msg.error(e.message, moduleName));
    }
}

function* getActionContents(obj) {
    try {
        const result = yield call(actionContent, obj.sitename, obj.module, obj.submodule, obj.config, obj.alarmType);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                const config = result.config;
                yield put(actions.getActionContentSuccess(config, obj.config, obj.identify));
            } else {
                throw new Error(result.status.message);
            }
        }
    } catch (e) {
        yield put(msg.error(e.message, moduleName));
    }
}
function* getRuleDetailSaga() {
    yield takeEvery(RULEFLOATTAB_GETDETAIL, getRulesDetail);
}
function* updateRuleSaga() {
    yield takeEvery(RULEFLOATTAB_UPDATERULE, updateRules);
}
function* addRuleDataSaga() {
    yield takeEvery(RULEFLOATTAB_ADDRULE, addRuleData);
}
function* getTopologyDataSaga() {
    yield takeEvery(RULEFLOATTAB_GET_TOPOLOGY_LIST, getTopologyData);
}
function* getTopologyModelSaga() {
    yield takeEvery(RULEFLOATTAB_GET_DEVICEMODEL_INFO, getDeviceModelInfo);
}
function* updateNotificationSaga() {
    yield takeEvery(RULEFLOATTAB_UPDATE_NOTIFICATION, updateNotifications);
}
function* createNotificationSaga() {
    yield takeEvery(RULEFLOATTAB_CREATE_NOTIFICATION_CONFIG, createNotificationConfigs);
}
function* createWorkflowSaga() {
    yield takeEvery(RULEFLOATTAB_CREATE_WORKFLOW_CONFIG, workflowConfigs);
}
function* getActionContentSaga() {
    yield takeEvery(RULEFLOATTAB_GET_ACTION_CONTENT, getActionContents);
}
export default function* root() {
    yield [
        fork(getRuleDetailSaga),
        fork(addRuleDataSaga),
        fork(updateRuleSaga),
        fork(getTopologyDataSaga),
        fork(getTopologyModelSaga),
        fork(updateNotificationSaga),
        fork(getActionContentSaga),
        fork(createNotificationSaga),
        fork(createWorkflowSaga)
    ];
}
