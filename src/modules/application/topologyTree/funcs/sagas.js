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
// import { put, call, takeEvery, fork } from "redux-saga/effects";
// import { GET_ADDRESS_REQUEST,DELETE_ADDRESS_REQUEST } from "./actionTypes";
// import * as actions from "./actions";
// import { actions as msg } from "modules/messageCenter";
// import { getTopoAddress,deleteAddressData } from "api/application";

// function* getTopoAddressData(obj) {
//     try {
//         const result = yield call(getTopoAddress, obj.pageLimit, obj.pageNo, obj.predicate, obj.sortConfig);
//         if (result && result.status) {
//             if (result.status.code === "00000000") {
//                 let pagination = result.pagination;
//                 let arrayData = result.arrayData;
//                 yield put(
//                     actions.getAddressDataSuccess(pagination, arrayData, obj.identify, obj.predicate, obj.sortConfig, obj.orderDisplayName, obj.orderDirection)
//                 );
//             } else {
//                 throw new Error(result.status.message);
//             }
//         } else {
//             throw new Error("unkown error!");
//         }
//     } catch (e) {
//         yield put(msg.error(e.message));
//     }
// }

// function* deleteAddress(obj) {
//     try {
//         const result = yield call(deleteAddressData, obj.iotId);
//         if (result && result.status) {
//             if (result.status.code === "00000000") {
//                 yield put(msg.success(result.status.message));
//                 yield put(actions.deleteAddressSuccess(obj.identify));
//                 // yield put(actions.deleteSysconfigDeviceType(obj.identify, obj.iotId, obj.siteName));
//             } else {
//                 throw new Error(result.status.message);
//             }
//         } else {
//             throw new Error("unkown error!");
//         }
//     } catch (e) {
//         yield put(msg.error(e.message));
//         console.log("error: ", e.message);
//     }
// }

// function* getTopologyAddressSaga() {
//     yield takeEvery(GET_ADDRESS_REQUEST, getTopoAddressData);
// }

// function* deleteAddressSaga() {
//     yield takeEvery(DELETE_ADDRESS_REQUEST, deleteAddress);
// }

// export default function* root() {
//     yield [fork(getTopologyAddressSaga),fork(deleteAddressSaga)];
// }
