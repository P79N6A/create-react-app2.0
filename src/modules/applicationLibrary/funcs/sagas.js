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
import { put, call, takeEvery, fork } from "redux-saga/effects";
import { APPLICATION_REQUEST } from "./actionTypes";
import * as actions from "./actions";
import { actions as msg } from "modules/messageCenter";
import { getTopoAddress } from "api/application";
const MODULE_NAME = "TOPOLOGY";

function* getTopoAddressData({ pageLimit, pageNo = 1, predicates = {}, sortConfig }) {
    const predicate = {
        predicates: [
            {
                field: "address.recordType",
                operator: "EQ_STR_NC",
                value: "application"
            },
            ...predicates
        ],
        operator: "AND"
    };
    const result = yield call(getTopoAddress, pageLimit, pageNo, predicate, sortConfig);
    if (result.status.code === "00000000") {
        let arrayData = result.arrayData;
        yield put(actions.requestSuccess(arrayData));
    } else {
        yield put("get topology data error, Please contract you admin or try again later", MODULE_NAME);
    }
    yield put(actions.loadingControl(false));
}

function* getTopologyAddressSaga() {
    yield takeEvery(APPLICATION_REQUEST, getTopoAddressData);
}

export default function* root() {
    yield [fork(getTopologyAddressSaga)];
}
