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
import { RULE_REQUEST, RULE_DELETERULE, RULE_RULE_SCHEMA, RULE_ACTION_SCHEMA, RULE_GET_ACTION_CONTENT} from "./actionTypes";
import * as actions from "./actions";
import { actions as msg } from "modules/messageCenter";
import { getRuleData, deleteRule, searchRule, getRuleSchema, getActionSchema, actionContent } from "api/rule";
import { I18n } from "react-i18nify";
import { formatter } from "./util";
const moduleName = "Rule";
function* getRuleDatas(obj) {
    try {
        const result = yield call(searchRule, obj.pageNo, obj.pageLimit, obj.sitename, obj.modulename, obj.submodulename, obj.predicate, obj.sortConfig);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                let pagination = result.pagination;
                let arrayData = result.configs;
                yield put(
                    actions.getRuleDataSuccess(pagination, arrayData, obj.identify, obj.modulename, obj.predicate, obj.sortConfig, obj.orderDisplayName, obj.orderDirection)
                );
                console.log(obj);
            } else {
                yield put(msg.warn(result.status.message, moduleName));
                throw new Error(result.status.message);
            }
        } else {
            yield put(msg.warn(I18n.t("rule.sagasError.rulesListError"), `${moduleName}- GetRuleList`));
            throw new Error(I18n.t("rule.sagasError.rulesListError"));
        }
    } catch (e) {
        yield put(msg.error(e.message, moduleName));
    }
}

function* deleteRuleData(obj) {
    try {
        const result = yield call(deleteRule, obj.sitename, obj.modulename, obj.submodulename, obj.config, obj.pageLimit);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                let resultList = yield call(getRuleData, obj.pageLimit, "1", obj.sitename, obj.modulename, obj.submodulename);
                if (resultList.status.code === "00000000") {
                    let pagination = resultList.pagination;
                    let arrayData = resultList.configs;
                    yield put(actions.deleteRuleDataSuccess(obj.identify));
                    yield put(actions.getRuleDataSuccess(pagination, arrayData, obj.identify, obj.modulename));
                }
                yield put(msg.success(formatter(I18n.t("rule.common.deleteSuccess"), obj.config.configs && obj.config.configs.join()), moduleName));
            } else {
                yield put(actions.deleteRuleDataFailure(obj.identify));
                yield put(msg.warn(result.status.message, moduleName));
                throw new Error(result.status.message);
            }
        } else {
            yield put(msg.warn(I18n.t("rule.sagasError.deleteRuleError"), `${moduleName}- DeleteRule`));
            throw new Error(I18n.t("rule.sagasError.deleteRuleError"));
        }
    } catch (e) {
        yield put(msg.error(e.message, moduleName));
    }
}

function* getRuleSchemas(obj) {
    try {
        const result = yield call(getRuleSchema, obj.sitename);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                let configs = result.config;
                let ruleSchema = JSON.parse(configs.configvals[0].configval);
                yield put(
                    actions.getRuleSchemaSuccess(ruleSchema, obj.identify)
                );
            } else {
                yield put(msg.warn(result.status.message, moduleName));
                throw new Error(result.status.message);
            }
        } else {
            yield put(msg.warn(I18n.t("rule.sagasError.ruleSchemaError"), `${moduleName}- GetRuleSchema`));
            throw new Error(I18n.t("rule.sagasError.ruleSchemaError"));
        }
    } catch (e) {
        yield put(msg.error(e.message, moduleName));
    }
}
function* getActionSchemas(obj) {
    try {
        const result = yield call(getActionSchema, obj.sitename);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                let configs = result.config;
                let actionSchema = JSON.parse(configs.configvals[0].configval);
                yield put(
                    actions.getActionSchemaSuccess(actionSchema, obj.identify)
                );
            } else {
                yield put(msg.warn(result.status.message, moduleName));
                throw new Error(result.status.message);
            }
        }  else {
            yield put(msg.warn(I18n.t("rule.sagasError.ruleSchemaError"), `${moduleName}- GetActionSchema`));
            throw new Error(I18n.t("rule.sagasError.actionSchemaError"));
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
                yield put(actions.getActionContentSuccess(config, `${obj.config}-${obj.alarmType}`, obj.identify));
            } else {
                throw new Error(result.status.message);
            }
        }
    } catch (e) {
        console.log(e);
    }
}
// function* getSMSSubjectList(obj) {
//     try {
//         const result = yield call(emailList, obj.sitename, "smssubject.general");
//         if (result && result.status) {
//             if (result.status.code === "00000000") {
//                 const smsSubjectList = result.config;
//                 yield put(actions.getSMSSubjectListSuccess(smsSubjectList, obj.identify));
//             } else {
//                 throw new Error(result.status.message);
//             }
//         }
//     } catch (e) {
//         console.log(e);
//     }
// }


function* getRuleListSaga() {
    yield takeEvery(RULE_REQUEST, getRuleDatas);
}
function* getRuleSchemaSaga() {
    yield takeEvery(RULE_RULE_SCHEMA, getRuleSchemas);
}
function* getActionSchemaSaga() {
    yield takeEvery(RULE_ACTION_SCHEMA, getActionSchemas);
}
function* getActionContentSaga() {
    yield takeEvery(RULE_GET_ACTION_CONTENT, getActionContents);
}
function* deleteRuleDataSaga() {
    yield takeEvery(RULE_DELETERULE, deleteRuleData);
}

// function* getSMSTemplateListSaga() {
//     yield takeEvery(RULE_GET_SMS_TEMPLATE, getSMSTemplateList);
// }
export default function* root() {
    yield [fork(getRuleListSaga), fork(deleteRuleDataSaga), fork(getRuleSchemaSaga), fork(getActionSchemaSaga), fork(getActionContentSaga)];
}
