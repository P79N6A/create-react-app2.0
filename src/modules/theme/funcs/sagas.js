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
* Created by Wangrui on 08/06/2018.
*/
import { put, call, takeLatest, fork } from "redux-saga/effects";
import { CONFIG_REQUEST } from "./actionTypes";
import * as actions from "./actions";
// import { actions as msg } from "modules/messageCenter";
import { getConfig } from "api/theme";
import themes from "../themes.json";
function* getConfigs(obj) {
    try {
        const result = yield call(getConfig, obj.account );
        if (result && result.status) {
            if (result.status.code === "00000000") {
                let config = result.resource;
                if(config.value && config.value.theme){
                    yield put(actions.getConfigSuccess(config));
                    return;
                } 
            } else {
                throw new Error(result.status.message);
            }
        } else {
            throw new Error("unkown error!");
        }
        yield put(actions.getConfigSuccess({value:{theme: themes}}));
    } catch (e) {
        yield put(actions.getConfigSuccess({value:{theme: themes}}));
    }
}

function* getConfigSaga() {
    yield takeLatest(CONFIG_REQUEST, getConfigs);
}

export default function* root() {
    yield [
        fork(getConfigSaga)
    ];
}