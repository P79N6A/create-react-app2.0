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
 * Created by wangrui on 22/06/2018.
 */
import * as actions from "./ruleGrid/funcs/actions";
import reducer from "./ruleGrid/funcs/reducer";
import { REDUCER_NAME } from "./ruleGrid/funcs/constants";
import view from "./ruleGrid/views/container";
import sagas from "./ruleGrid/funcs/sagas";
import {
    sagas as ruleFloatTabSagas,
    reducer as ruleFloatTabReducer,
    reducerName as ruleFloatTabReducerName
} from "modules/rule/ruleFloatTab";
import {
    // sagas as ruleFilterSagas,
    reducer as ruleFilterReducer,
    reducerName as ruleFilterReducerName
} from "modules/rule/ruleEnhanceFilter";
import store, { injectAsyncReducer, sagaMiddleware } from "commons/store";
import EditerView from "./ruleGrid/views/editerView";

// import {
//     reducer as filterReducer,
//     reducerName as filterReducerName,
//     sagas as filterSagas
// } from "modules/filter/topologyFilter";
import {
    reducer as filterModelReducer,
    reducerName as filterModelReducerName,
    sagas as filterModelSagas
} from "modules/filter/topologyDeviceModelSearch";
const visualEditer = true;
sagaMiddleware.run(ruleFloatTabSagas);
// sagaMiddleware.run(filterSagas);
sagaMiddleware.run(filterModelSagas);
sagaMiddleware.run(sagas);
injectAsyncReducer(store, ruleFloatTabReducerName, ruleFloatTabReducer);
injectAsyncReducer(store, ruleFilterReducerName, ruleFilterReducer);
// injectAsyncReducer(store, filterReducerName, filterReducer);
injectAsyncReducer(store, filterModelReducerName, filterModelReducer);
injectAsyncReducer(store, REDUCER_NAME, reducer);
export { actions, reducer, view, sagas, REDUCER_NAME as reducerName, visualEditer, EditerView as editerView };
