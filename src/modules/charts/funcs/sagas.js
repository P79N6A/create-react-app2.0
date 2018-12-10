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
 * Created by KaiDi on 25/05/2018.
 */

import { put, call, takeEvery, fork } from "redux-saga/effects";
import * as actionTypes from "./actionTypes";
import * as actions from "./actions";
import { actions as msg } from "modules/messageCenter";
import * as apis from "api/chart";
import { I18n } from "react-i18nify";
import _ from "lodash";

const moduleName = "Chart";

function* callTopology({ identify, appName, iotIds }) {
    if (_.isEmpty(iotIds)) {
        yield put(actions.topologyFailure(identify));
        return;
    }
    try {
        const result = yield call(apis.getTopology, appName, iotIds);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                let source = result.arrayData;
                let payload = {pro: {}};
                source.forEach((src, i) => {
                    let id = src["physical.iotTopologyId"];
                    _.forEach(src.properties || {}, (item, key) => {
                        payload.pro[id] = payload.pro[id] ? payload.pro[id] : {};
                        payload.pro[id][key] = src.properties[key];
                    });
                });
                yield put(actions.topologySuccess(identify, payload));
            } else {
                throw new Error(result.status.message);
            }
        } else {
            throw new Error(I18n.t("chart.sagasError.topologeError"));
        }
    } catch (e) {
        yield put(actions.topologyFailure(identify));
        yield put(msg.error(e.message, moduleName + " - Topology"));
    }
}

function* callDeviceModelProperty({ identify, deviceModels }) {
    if (_.isEmpty(deviceModels)) {
        yield put(actions.deviceModelPropertyFailure(identify));
        return;
    }
    try {
        const result = yield call(apis.getDeviceModelProperty, deviceModels);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                const arrayData = result.arrayData;
                let payload = {
                    propertyList: {}
                };
                payload.propertyList = _.reduce(
                    arrayData,
                    (sum, devicemodel) => {
                        let temp = {};
                        _.forEach(_.keys(devicemodel.property), (item, index) => {
                            if (_.keys(sum).indexOf(item) > -1) {
                                temp[item] = sum[item];
                            }
                        });
                        return temp;
                    },
                    (arrayData[0] && arrayData[0].property) || {}
                );
                yield put(actions.deviceModelPropertySuccess(identify, payload));
            } else {
                throw new Error(result.status.message);
            }
        } else {
            throw new Error(I18n.t("chart.sagasError.deviceModelError"));
        }
    } catch (e) {
        yield put(actions.deviceModelPropertyFailure(identify));
        yield put(msg.error(e.message, moduleName + " - Get Reading List"));
    }
}

function* callTopologyStatic({ identify, resourcelist, applicationInfo }) {
    try {
        const result = yield call(apis.getTopologyStatic, resourcelist, applicationInfo);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                let payload = result.mapData;
                yield put(actions.topologyStaticSuccess(identify, payload));
            } else {
                throw new Error(result.status.message);
            }
        } else {
            throw new Error(I18n.t("chart.sagasError.topologyStatisticError"));
        }
    } catch (e) {
        yield put(actions.topologyStaticFailure(identify));
        yield put(msg.error(e.message, moduleName + " - TopologyStatistic"));
    }
}

function* callAlarm({ identify, appName, iotIds, dateRange, readings, aggregation, interval, group }) {
    try {
        const result = yield call(apis.getAlarm, appName, iotIds, dateRange, readings, aggregation, interval, group);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                yield put(actions.alarmSuccess(identify, result.alarms));
            } else {
                throw new Error(result.status.message);
            }
        } else {
            throw new Error(I18n.t("chart.sagasError.alarmError"));
        }
    } catch (e) {
        yield put(actions.alarmFailure(identify));
        yield put(msg.error(e.message, moduleName + " - Alarms"));
    }
}

function* callEvent({ identify, appName, iotIds, dateRange, readings, aggregation, interval, group }) {
    try {
        const result = yield call(apis.getEvent, appName, iotIds, dateRange, readings, aggregation, interval, group);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                yield put(actions.eventSuccess(identify, result.events));
            } else {
                throw new Error(result.status.message);
            }
        } else {
            throw new Error(I18n.t("chart.sagasError.eventError"));
        }
    } catch (e) {
        console.log("event failed");
        yield put(actions.eventFailure(identify));
        yield put(msg.error(e.message, moduleName, " - Events"));
    }
}

function* callKpiPreview({ identify, serviceType, format, kpiQuery, sitename }) {
    try {
        const result = yield call(apis.getKpiPreview, serviceType, format, kpiQuery, sitename);
        if (result && result.recordset) {
            let data = {};
            result.recordset.forEach((item, i) => {
                Object.keys(item).forEach(value => {
                    data[value] = data[value] || [];
                    data[value][i] = item[value];
                });
            });
            let keyList = Object.keys(data);
            yield put(actions.kpiPreviewSuccess(identify, data, keyList));
        } else {
            throw new Error(I18n.t("chart.sagasError.kpiPreviewError"));
        }
    } catch (e) {
        console.log("kpi query failed.");
        yield put(actions.kpiPreviewFailure(identify));
        yield put(msg.error(e.message, moduleName + " - KPI Preview"));
    }
}

function* callKpiService({ identify, kpiName, sitename }) {
    try {
        const result = yield call(apis.getKpiService, kpiName, sitename);
        if (result && result.recordset) {
            let data = {};
            result.recordset.forEach((item, i) => {
                Object.keys(item).forEach(value => {
                    data[value] = data[value] || [];
                    data[value][i] = item[value];
                });
            });
            let keyList = Object.keys(data);
            yield put(actions.kpiServiceSuccess(identify, data, keyList));
        } else {
            throw new Error(I18n.t("chart.sagasError.kpiServiceError"));
        }
    } catch (e) {
        console.log("kpi query failed.");
        yield put(actions.kpiPreviewFailure(identify));
        yield put(msg.error(e.message, moduleName + " - KPI Service"));
    }
}

function* callKpiServiceList({ identify, sitename }) {
    try {
        const result = yield call(apis.getServiceList, sitename);
        if (result && result.status && result.status.code === "00000000") {
            let serviceList = result.configs;
            yield put(actions.getServiceListSuccess(identify, serviceList));
        } else {
            throw new Error(I18n.t("chart.sagasError.kpiServiceListError"));
        }
    } catch (e) {
        console.log("kpi query failed.");
        yield put(actions.getServiceListFailure(identify));
        yield put(msg.error(e.message, moduleName + " - KPI Service"));
    }
}

function* callExportAlarmEventData({ identify, source, appName, columninfos, iotIds, dateRange, readings }) {
    let api = {
        alarm: apis.exportAlarmData,
        event: apis.exportEventData
    };
    try {
        const result = yield call(api[source], appName, columninfos, iotIds, dateRange, readings);
        if (result && (_.isString(result) ? result.indexOf("doctype html>") === -1 : true)) {
            yield put(actions.exportEventAlarmDataSuccess(identify, result));
        } else {
            throw new Error(I18n.t("chart.sagasError.exportAlmEvtError"));
        }
    } catch (e) {
        console.log("chart export failed");
        yield put(actions.exportEventAlarmDataFailure(identify));
        yield put(msg.error(e.message, moduleName + " - Export"));
    }
}

function* topologySaga() {
    yield takeEvery(actionTypes.TOPOLOGY_REQUEST, callTopology);
}

function* deviceModelSaga() {
    yield takeEvery(actionTypes.DEVICEMODEL_PROPERTY_REQUEST, callDeviceModelProperty);
}

function* topologyStaticSaga() {
    yield takeEvery(actionTypes.TOPOLOGY_STATIC_REQUEST, callTopologyStatic);
}

function* alarmSaga() {
    yield takeEvery(actionTypes.ALARM_REQUEST, callAlarm);
}

function* eventSaga() {
    yield takeEvery(actionTypes.EVENT_REQUEST, callEvent);
}

function* kpiPreviewSaga() {
    yield takeEvery(actionTypes.KPI_PREVIEW_REQUEST, callKpiPreview);
}

function* kpiServiceSaga() {
    yield takeEvery(actionTypes.KPI_SERVICE_REQUEST, callKpiService);
}

function* serviceListSaga() {
    yield takeEvery(actionTypes.GET_KPI_LIST_REQUEST, callKpiServiceList);
}

function* exportEventAlarmSaga() {
    yield takeEvery(actionTypes.EXPORT_EVENT_ALARM_DATA_REQUEST, callExportAlarmEventData);
}

export default function* root() {
    yield [
        fork(topologySaga),
        fork(topologyStaticSaga),
        fork(alarmSaga),
        fork(eventSaga),
        fork(kpiPreviewSaga),
        fork(kpiServiceSaga),
        fork(serviceListSaga),
        fork(exportEventAlarmSaga),
        fork(deviceModelSaga)
    ];
}
