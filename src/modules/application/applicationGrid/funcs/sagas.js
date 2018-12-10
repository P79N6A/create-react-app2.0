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
import { deleteAddressData, getTopoResourcepathData } from "api/application";
import { I18n } from "react-i18nify";
// import _ from "lodash";

const errorPath = "application.sagasError.grid.";

function* deleteAddress(obj) {
    try {
        const result = yield call(deleteAddressData, obj.iotId);
        if (result && result.status) {
            if (result.status.code === "00000000") {
                yield put(msg.success(result.status.message, "Application - Delete"));
                yield put(actions.deleteAddressSuccess(obj.identify));
            } else {
                throw new Error(result.status.message);
            }
        } else {
            throw new Error(I18n.t(errorPath + "deleteError"));
        }
    } catch (e) {
        yield put(msg.error(e.message, "Application - Delete"));
    }
}

function* getTopoAddressDataFromLayer({
    identify,
    predicates,
    pageLimit,
    pageNo,
    iotId,
    resourcetype,
    sortConfig,
    orderDisplayName,
    orderDirection
}) {
    try {
        const result = yield call(
            getTopoResourcepathData,
            pageLimit,
            pageNo,
            predicates,
            iotId,
            resourcetype,
            sortConfig
        );
        if (result && result.status) {
            if (result.status.code === "00000000" && result.arrayData) {
                const { pagination, arrayData } = result;
                yield put(
                    actions.getAddressFromLayerSuccess(
                        identify,
                        arrayData,
                        iotId,
                        pagination,
                        sortConfig,
                        orderDisplayName,
                        orderDirection
                    )
                );
            } else {
                throw new Error(result.status.message);
            }
        } else {
            throw new Error(I18n.t(errorPath + "getResourcePathError"));
        }
    } catch (e) {
        yield put(actions.getAddressFromLayerFailure(identify));
        yield put(msg.error(e.message, "Application - GetListData"));
    }
}

function* deleteAddressSaga() {
    yield takeEvery(actionTypes.DELETE_ADDRESS_REQUEST, deleteAddress);
}

function* getAddressLayerSaga() {
    yield takeEvery(actionTypes.GET_ADDRESS_FROM_LAYER_REQUEST, getTopoAddressDataFromLayer);
}

export default function* root() {
    yield [fork(deleteAddressSaga), fork(getAddressLayerSaga)];
}
