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
 * Created by xulu on 25/05/2018.
 */
import { put, call, takeEvery, fork } from "redux-saga/effects";
import * as actionTypes from "./actionTypes";
import * as actions from "./actions";
import { actions as msg } from "modules/messageCenter";
import * as apiFuncs from "api/topology";

function* getTopoGraphData(obj) {
    try {
        const result = yield call(apiFuncs.getTopoGraphData, obj.iotId);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                let graphs = result.graphs && result.graphs[0];
                let graphObj = {
                    graphs: graphs,
                    key: Math.random()
                };
                yield put(actions.getTopoGraphSuccess(obj.identify, graphObj));
            } else {
                throw new Error(result.status.message);
            }
        } else {
            throw new Error("unkown error!");
        }
    } catch (e) {
        yield put(msg.error(e.message));
    }
}

function* searchTopoGraphArea(obj) {
    try {
        const result = yield call(apiFuncs.searchTopoGraphArea, obj.areaFormat);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                let graphs = result.graphs && result.graphs[0];
                let graphObj = {
                    graphs: graphs,
                    key: Math.random()
                };
                yield put(actions.getTopoGraphSuccess(obj.identify, graphObj));
            } else {
                throw new Error(result.status.message);
            }
        } else {
            throw new Error("unkown error!");
        }
    } catch (e) {
        yield put(msg.error(e.message));
    }
}

// get sysconfig device types func
function* getSysconfigDeviceTypeFunc(obj) {
    try {
        const result = yield call(apiFuncs.getSysconfigDeviceType, obj.siteName);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                let deviceTypesData = result.configs;
                let deviceTypeObj = {
                    deviceTypesData: deviceTypesData,
                    key: Math.random()
                };
                yield put(actions.getSysconfigDeviceTypeSuccess(obj.identify, deviceTypeObj, obj.dataType));
            } else {
                throw new Error(result.status.message);
            }
        } else {
            throw new Error("unkown error!");
        }
    } catch (e) {
        yield put(msg.error(e.message));
    }
}

function* getTopologyGraphDataSaga() {
    yield takeEvery(actionTypes.TOPOGRAPH_GET_TOPO_GRAPH, getTopoGraphData);
}

function* searchTopologyGraphAreaSaga() {
    yield takeEvery(actionTypes.TOPOGRAPH_SEARCH_TOPO_GRAPH_AREA, searchTopoGraphArea);
}

// get sysconfig device type sage
function* getSysconfigDeviceTypeSaga() {
    yield takeEvery(actionTypes.TOPOGRAPH_GET_SYSCONFIG_DEVICE_TYPE, getSysconfigDeviceTypeFunc);
}

export default function* root() {
    yield [fork(getTopologyGraphDataSaga), fork(searchTopologyGraphAreaSaga), fork(getSysconfigDeviceTypeSaga)];
}
