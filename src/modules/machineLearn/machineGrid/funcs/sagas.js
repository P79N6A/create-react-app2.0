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
 * Created by HuLin on 03/08/2018.
 */
// import { put, call, takeLatest, fork } from "redux-saga/effects";
// import { SETREQUESTDEVICENAME } from "./actionTypes";
// import * as actions from "./actions";
// import { getRequestDeviceName } from "api/machineLearn";
// import { actions as msg } from "modules/messageCenter";
// //import { I18n } from "react-i18nify";
// const moduleName = "JOBS";

// function * requestDeviceName(obj) {
//     try {
//         const result = yield call(getRequestDeviceName, obj.sitename);
//         if (result && result.status) {
//             if (result.status.code === "00000000") {
//                 yield put(actions.getRequestDeviceName(result.configs, obj.identify));
//             }
//         }
//     } catch (e) {
//         yield put(msg.error(e.message, moduleName));
//     }
// }


// function* setRequestDeviceName() {
//     yield takeLatest(SETREQUESTDEVICENAME, requestDeviceName);
// }



// export default function* root() {
//     yield  [
//         fork(setRequestDeviceName)
//     ];
// }
