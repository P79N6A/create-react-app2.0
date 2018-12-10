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
 * Created by HuLin on 22/06/2018.
 */
import * as actions from "./machineGrid/funcs/actions";
import reducer from "./machineGrid/funcs/reducer";
import { REDUCER_NAME } from "./machineGrid/funcs/constants";
import view from "./machineGrid/views/container";
import sagas from "./machineGrid/funcs/sagas";

import {
    sagas as machineJobDeviceSagas,
    reducer as machineJobDeviceReducer,
    reducerName as machineJobDeviceReducerName
} from "modules/machineLearn/jobSchedule";

import {
    sagas as modelManagementSagas,
    reducer as modelManagementReducer,
    reducerName as modelManagementReducerName
} from "modules/machineLearn/modelManagement";
import store, { injectAsyncReducer, sagaMiddleware } from "commons/store";

sagaMiddleware.run(machineJobDeviceSagas);
sagaMiddleware.run(modelManagementSagas);
injectAsyncReducer(store, machineJobDeviceReducerName, machineJobDeviceReducer);
injectAsyncReducer(store, modelManagementReducerName, modelManagementReducer);

export { actions, reducer, view, sagas, REDUCER_NAME as reducerName };

