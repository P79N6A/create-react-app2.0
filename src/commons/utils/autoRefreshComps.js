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
 * Created by xulu on 30/06/2018.
 */
import { takeEvery, fork } from "redux-saga/effects";
// import { clearInterval } from "timers";
import store from "../store";

//#region action types
export const AUTO_REFRESH_INIT = "ISC/AUTO_REFRESH_INIT";
export const REFRESH_ACTION = "ISC/REFRESH_ACTION";

//#endregion #region actions
export const autoRefreshInit = (identify, timer) => ({ type: AUTO_REFRESH_INIT, identify, timer });
export const refreshAction = (identify, refreshCount) => ({ type: REFRESH_ACTION, identify, refreshCount });

//#endregion
const defaultTimer = 60 * 10 * 1000;
let compsRefresh = {};
let refreshCountObj = {};

function startRefreshFunc(identify, timer) {
    let refreshTimer = timer ? timer : defaultTimer;
    if (refreshCountObj[identify] > 500) {
        refreshCountObj[identify] = 0;
    }
    clearInterval(compsRefresh[identify]);
    compsRefresh[identify] = setInterval(() => {
        store.dispatch(refreshAction(identify, refreshCountObj[identify]));
        refreshCountObj[identify]++;
    }, refreshTimer);
}

function callRefreshInit({ identify, timer }) {
    if (!identify) {
        return;
    }
    if (!refreshCountObj[identify]) {
        refreshCountObj[identify] = 0;
        startRefreshFunc(identify, timer);
    }
}
//#endregion #region sagas

function* refreshInitSaga() {
    yield takeEvery(AUTO_REFRESH_INIT, callRefreshInit);
}

export default function* root() {
    yield [fork(refreshInitSaga)];
}

//#endregion
