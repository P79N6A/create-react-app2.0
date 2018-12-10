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
*/
import { put, call, takeLatest, fork } from "redux-saga/effects";
import { TOPOLOGYMODELFILTER_SEARCH } from "./actionTypes";
import * as actions from "./actions";
import { actions as msg } from "modules/messageCenter";
import {  getTopologyModelFilterDataBySearch } from "api/topologyFilter";

function* getTopologyModelListBySearch(obj){
    try {
        const result = yield call(getTopologyModelFilterDataBySearch, obj.searchWord, obj.pagenation );
        if (result && result.status) {
            if (result.status.code === "00000000") {
                let pagination = result.pagination;
                let arrayData = result.arrayData;
                yield put(actions.getTopoModelFilterDataSuccess(pagination, arrayData, false, obj.clear));
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

function* getTopologyModelListBySearchSaga() {
    yield takeLatest(TOPOLOGYMODELFILTER_SEARCH, getTopologyModelListBySearch);
}

export default function* root() {
    yield [
        fork(getTopologyModelListBySearchSaga)
    ];
}