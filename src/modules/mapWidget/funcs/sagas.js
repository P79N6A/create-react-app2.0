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
 * Modified by DengXiaoLong on 25/06/2018.
 */

import {
    put,
    call,
    takeEvery,
    fork
} from "redux-saga/effects";

import {
    MAP_ALARM_SEARCH,
    MAP_GET_ADDRESS,
    MAP_ALARM_TYPE_DATA,
    MAP_GET_INFO_BY_ADDRESS,
    MAP_ALARM_EXPORT_EXCEL
} from "./actionTypes";
import {
    mapGetAlarm,
    mapGetAddress,
    alarmTypeData,
    mapGetInfoByAddress,
    getSysconfigDeviceType
} from "api/mapWidget";
import { exportAlarmData } from "api/panel";
import {
    handleDevicesForLocation,
    // getDevicesTypeForLocation,
    // getIconFromSysConfig
} from "./utils/deviceUtil";
import {
    handleAlarmsForLocation
} from "./utils/alarmUtils";
import * as actions from "./actions";

function* getAllTypesAlarm(obj) {
    try {
        const {
            alarmCondition,
            identify
        } = obj;
        const result = yield call(alarmTypeData, alarmCondition, identify);
        yield put(actions.mapChangeLoadingStatus("loading", obj.identify));
        if (result && result.status) {
            if ("00000000" === result.status.code) {
                yield put(actions.mapChangeLoadingStatus("loaded", obj.identify));
                switch (alarmCondition) {
                    case "capalarm.alarmtype":
                        yield put(
                            actions.mapGetAlarmTypeRequestSuccess(result.alarms, obj.identify)
                        );
                        break;
                    case "capevent.severity":
                        yield put(
                            actions.mapGetAlarmSeverityRequestSuccess(result.alarms, obj.identify)
                        );
                        break;
                    case "capalarm.state":
                        yield put(
                            actions.mapGetAlarmStateRequestSuccess(result.alarms, obj.identify)
                        );
                        break;
                    default:
                        break;
                }
            }
        }
    } catch (e) {
        throw new Error(e.message);
    }
};

function* mapGetAlarmLit(obj) {
    try {
        const {
            timeArr,
            conditions,
            parameters,
            identify
        } = obj;
        const result = yield call(mapGetAlarm, timeArr, conditions, parameters, identify);
        yield put(actions.mapChangeLoadingStatus("loading", obj.identify));
        if (result && result.status) {
            if ("00000000" === result.status.code) {
                yield put(actions.mapChangeLoadingStatus("loaded", obj.identify));
                const datas = handleAlarmsForLocation(result.alarms);
                yield put(actions.mapDataRequestSuccess(datas, obj.parameters, obj.identify));
            }
        }
    } catch (e) {
        throw new Error(e.message);
    }
};

function* mapGetAddressData(obj) {
    try {
        const {
            value,
            identify
        } = obj;
        const result = yield call(mapGetAddress, value, identify);
        if (result && result.status) {
            if ("00000000" === result.status.code) {
                yield put(actions.mapGetAddressSuccess(result.arrayData, obj.identify));
            }
        }
    } catch (e) {
        throw new Error(e.message);
    }
};

function* mapGetDataByAddress(obj) {
    try {
        const {
            iotIds,
            identify
        } = obj;
        const result = yield call(mapGetInfoByAddress, iotIds, identify);
        yield put(actions.mapChangeLoadingStatus("loading", obj.identify));
        if (result && result.status) {
            if ("00000000" === result.status.code) {
                const systemConfigDeviceType = yield call(getSysconfigDeviceType);
                if (systemConfigDeviceType && systemConfigDeviceType.status) {
                    if ("00000000" === systemConfigDeviceType.status.code) {
                        yield put(actions.mapChangeLoadingStatus("loaded", obj.identify));
                        const data = handleDevicesForLocation(result.arrayData, systemConfigDeviceType.configs);
                        // const deviceTypeData = getDevicesTypeForLocation(result.arrayData);
                        if (obj.parameters.iconAndColor && JSON.stringify(obj.parameters.iconAndColor) !== "{}") {
                            const { iconAndColor } = obj.parameters;
                            let dataNew = [];
                            Object.keys(iconAndColor).forEach(item => {
                                dataNew = data.map(itemIn => {
                                    if (item === itemIn.type) {
                                        if (iconAndColor[item].icon) {
                                            itemIn.deviceIcon = iconAndColor[item].icon;
                                        }
                                        if (iconAndColor[item].iconColor) {
                                            itemIn.deviceIconColor = iconAndColor[item].iconColor;
                                        }
                                    }
                                    return itemIn;
                                });
                            });
                            yield put(
                                actions.mapDeviceDataRequestSuccess(
                                    dataNew,
                                    [], // [...new Set(deviceTypeData)]
                                    obj.parameters,
                                    obj.identify
                                )
                            );
                        } else {
                            yield put(
                                actions.mapDeviceDataRequestSuccess(
                                    data,
                                    [],// [...new Set(deviceTypeData)]
                                    obj.parameters,
                                    obj.identify
                                )
                            );
                        }
                    }
                }
            }
        }
    } catch (e) {
        throw new Error(e.message);
    }
};

// export alarm data to excel
function* exportAlarmToExcel(obj) {
    try {
        const result = yield call(exportAlarmData, obj.filterData, 1000, obj.identify);
        yield put(actions.mapExportExcelSuccess(result, obj.identify));
    } catch (e) {
        console.log(e);
    }
};

function* getAllTypesAlarmSage() {
    yield takeEvery(MAP_ALARM_TYPE_DATA, getAllTypesAlarm);
};

function* mapGetAlarmLitSage() {
    yield takeEvery(MAP_ALARM_SEARCH, mapGetAlarmLit);
};

function* mapGetAddressSaga() {
    yield takeEvery(MAP_GET_ADDRESS, mapGetAddressData);
};

function* mapGetDataByAddressSaga() {
    yield takeEvery(MAP_GET_INFO_BY_ADDRESS, mapGetDataByAddress);
};

function* exportAlarmToExcelSaga() {
    yield takeEvery(MAP_ALARM_EXPORT_EXCEL, exportAlarmToExcel);
};

export default function* root() {
    yield [fork(getAllTypesAlarmSage)];
    yield [fork(mapGetAlarmLitSage)];
    yield [fork(mapGetAddressSaga)];
    yield [fork(mapGetDataByAddressSaga)];
    yield [fork(exportAlarmToExcelSaga)];
}
