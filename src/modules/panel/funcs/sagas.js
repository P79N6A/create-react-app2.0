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
 * Created by Wangrui on 25/05/2018.
 * Modified by DengXiaoLong on 25/05/2018.
 */

import {
    put,
    call,
    takeEvery,
    fork
} from "redux-saga/effects";
import {
    PANEL_GET_ALARM_LIST,
    PANEL_GET_EVENT_LIST,
    PANEL_GET_TOPOLOGY_LIST,
    PANEL_GET_DEVICE_LIST,
    PANEL_EXPORT_ALARM_TO_EXCEL,
    PANEL_EXPORT_EVENT_TO_EXCEL,
    PANEL_GET_TOPOLOGY_LIST_VALUE
} from "./actionTypes";
import * as actions from "./actions";
import { actions as msgCenter } from "modules/messageCenter";
import {
    alarmList,
    eventList,
    deviceList,
    topologyList,
    exportAlarmData,
    exportEventData,
    topologyProperty
} from "api/panel";
import {
    calcMultipleCount,
    getChoosedCount
} from "./utils";
import {
    getDeviceChoosedCount,
    calcDeviceMultipleCount,
    deviceCalcSum
} from "./utils/deviceUtils";
import {
    calcMultipleCount as deviceReadingCalac
} from "./utils/deviceReadingUtil";
import {
    getValueBySeverity
} from "./utils/alarmUtils";

// get alarm count
function* getAlarmData(obj) {
    try {
        const result = yield call(alarmList, obj.times, obj.types);
        yield put(actions.panelChangeLoadingStatus("loading", obj.identify));
        if (result && result.status) {
            if (result.status.code === "00000000") {
                yield put(actions.panelChangeLoadingStatus("loaded", obj.identify));
                if (result.alarms.length === 0) {
                    yield put(actions.dataRequestSuccess([], 0, obj.parameters, obj.identify));
                } else {
                    if (result.alarms[0] && Object.values(result.alarms[0]).length === 1) {
                        yield put(actions.dataRequestSuccess([], result.alarms[0].count, obj.parameters, obj.identify));
                    } else {
                        yield put(actions.dataRequestSuccess(result.alarms, 0, obj.parameters, obj.identify));
                        const {
                            choosedFilters,
                            alarmType
                        } = obj.parameters;
                        if (choosedFilters.length) {
                            if ("Alarm Severity" === alarmType) {
                                const count = calcMultipleCount(
                                    getChoosedCount(result.alarms, getValueBySeverity(choosedFilters))
                                );
                                yield put(actions.changeCount(count, obj.parameters, obj.identify));
                                return;
                            }
                            const count = calcMultipleCount(getChoosedCount(result.alarms, choosedFilters));
                            yield put(actions.changeCount(count, obj.parameters, obj.identify));
                        }
                    }
                }
            } else {
                yield put(msgCenter.error(result.status.message));
            }
        }
    } catch (e) {
        console.log(e);
    }
}

// get event count
function* getEventData(obj) {
    try {
        const result = yield call(eventList, obj.timeArr, obj.types);
        yield put(actions.panelChangeLoadingStatus("loading", obj.identify));
        if (result && result.status) {
            if (result.status.code === "00000000") {
                yield put(actions.panelChangeLoadingStatus("loaded", obj.identify));
                if (result.events.length === 0) {
                    yield put(actions.dataRequestSuccess([], 0, obj.parameters, obj.identify));
                } else {
                    if (result.events[0] && Object.values(result.events[0]).length === 1) {
                        yield put(actions.dataRequestSuccess([], result.events[0].count, obj.parameters, obj.identify));
                    } else {
                        yield put(actions.dataRequestSuccess(result.events, 0, obj.parameters, obj.identify));
                        const {
                            choosedFilters
                        } = obj.parameters;
                        if (choosedFilters.length) {
                            const count = calcMultipleCount(getChoosedCount(result.events, choosedFilters));
                            yield put(actions.changeCount(count, obj.parameters, obj.identify));
                        }
                    }
                }
            } else {
                yield put(msgCenter.error(result.status.message));
            }
        }
    } catch (e) {
        console.log(e);
    }
}

// get device data
function* getTopologyData(obj) {
    try {
        const result = yield call(topologyList, obj.iotId);
        yield put(actions.panelChangeLoadingStatus("loading", obj.identify));
        if (result && result.status) {
            if (result.status.code === "00000000") {
                yield put(actions.panelChangeLoadingStatus("loaded", obj.identify));
                if (result.arrayData.length) {
                    const data = result.arrayData.map((item) => {
                        if (item.property) {
                            const tempData = {};
                            Object.values(item.property).forEach(itemEach => {
                                tempData[itemEach.displayName] = itemEach.units;
                            });
                            return tempData;
                        }
                        return {};
                    });
                    yield put(actions.dataDeviceReadingRequestSuccess(data, obj.parameters, obj.identify));
                } else {
                    yield put(actions.dataDeviceReadingRequestSuccess([], obj.parameters, obj.identify));
                }
            } else {
                yield put(msgCenter.error(result.status.message));
            }
        }
    } catch (e) {
        console.log(e);
    }
}

// get device data
function* getTopologyDataValue(obj) {
    try {
        const result = yield call(topologyProperty, obj.iotId);
        yield put(actions.panelChangeLoadingStatus("loading", obj.identify));
        if (result && result.status) {
            if (result.status.code === "00000000") {
                yield put(actions.panelChangeLoadingStatus("loaded", obj.identify));
                const { choseValue, parameters, units, identify } = obj;
                const propertiesArr = [];
                const iotIdValuesArr = {};
                if (result.arrayData && result.arrayData.length) {
                    result.arrayData.forEach((item) => {
                        if (item.properties && item.properties[choseValue]) {
                            propertiesArr.push(item.properties[choseValue]);
                            iotIdValuesArr[item.properties.deviceid] = item.properties[choseValue];
                        }
                    });
                    // console.log(propertiesArr);
                    const unit = units ? `(${units})` : "";
                    yield put(actions.changeCount(
                        `${deviceReadingCalac(propertiesArr, parameters.aggregation)}${unit}`,
                        parameters,
                        identify
                    ));
                    yield put(actions.dataDeviceReadingAggreagtionRequestSuccess(
                        propertiesArr,
                        iotIdValuesArr,
                        parameters,
                        identify
                    ));
                } else {
                    yield put(actions.changeCount(
                        0,
                        parameters,
                        obj.identify
                    ));
                    yield put(actions.dataDeviceReadingAggreagtionRequestSuccess(
                        [],
                        parameters,
                        identify
                    ));
                }
            } else {
                yield put(msgCenter.error(result.status.message));
            }
        }
    } catch (e) {
        console.log(e);
    }
}

// get device count
function* getDeviceData(obj) {
    try {
        const result = yield call(deviceList, obj.deviceType);
        yield put(actions.panelChangeLoadingStatus("loading", obj.identify));
        if (result && result.status) {
            if (result.status.code === "00000000") {
                yield put(actions.panelChangeLoadingStatus("loaded", obj.identify));
                const {
                    mapData
                } = result;
                const {
                    choosedFilters,
                    device
                } = obj.parameters;
                const deviceKey = device === "All" ? "device" : device.toLowerCase();
                if (choosedFilters.length) {
                    yield put(actions.dataRequestSuccess(
                        mapData[deviceKey].aggregation,
                        calcDeviceMultipleCount(
                            getDeviceChoosedCount(mapData[deviceKey].aggregation, choosedFilters, obj.deviceType)
                        ),
                        obj.parameters,
                        obj.identify
                    ));
                } else {
                    yield put(actions.dataRequestSuccess(
                        mapData[deviceKey].aggregation,
                        obj.parameters.choosedType === "All" ? deviceCalcSum(mapData[deviceKey].aggregation) : 0,
                        obj.parameters,
                        obj.identify
                    ));
                }
            } else {
                yield put(msgCenter.error(result.status.message));
            }
        }
    } catch (e) {
        console.log(e);
    }
}

// export alarm data to excel
function* exportAlarmToExcel(obj) {
    try {
        const result = yield call(exportAlarmData, obj.filterData, obj.pagesize, obj.identify);
        if (result && result.status) {
            if (result.status.code !== "00000000") {
                yield put(msgCenter.info(result.status.message));
            }
        }
        if (result && !result.status) {
            yield put(actions.panelExportExcelSuccess(result, obj.identify));
        }
    } catch (e) {
        new Error(e);
    }
}

// export devent data to excel
function* exportEventToExcel(obj) {
    try {
        const result = yield call(exportEventData, obj.filterData, obj.pagesize, obj.identify);
        if (result && result.status) {
            if (result.status.code !== "00000000") {
                yield put(msgCenter.info(result.status.message));
            }
        }
        if (result && !result.status) {
            yield put(actions.panelExportExcelSuccess(result, obj.identify));
        }
    } catch (e) {
        new Error(e);
    }
}

function* getAlarmDataSaga() {
    yield takeEvery(PANEL_GET_ALARM_LIST, getAlarmData);
}

function* getEventDataSaga() {
    yield takeEvery(PANEL_GET_EVENT_LIST, getEventData);
}

function* getDeviceDataSage() {
    yield takeEvery(PANEL_GET_DEVICE_LIST, getDeviceData);
}

function* getTopologyDataSaga() {
    yield takeEvery(PANEL_GET_TOPOLOGY_LIST, getTopologyData);
}

function* getTopologyDataValueSaga() {
    yield takeEvery(PANEL_GET_TOPOLOGY_LIST_VALUE, getTopologyDataValue);
}

function* exportAlarmToExcelSaga() {
    yield takeEvery(PANEL_EXPORT_ALARM_TO_EXCEL, exportAlarmToExcel);
}

function* exportEventToExcelSaga() {
    yield takeEvery(PANEL_EXPORT_EVENT_TO_EXCEL, exportEventToExcel);
}

export default function* root() {
    yield [
        fork(getAlarmDataSaga),
        fork(getEventDataSaga),
        fork(getDeviceDataSage),
        fork(getTopologyDataSaga),
        fork(exportAlarmToExcelSaga),
        fork(exportEventToExcelSaga),
        fork(getTopologyDataValueSaga)
    ];
};
