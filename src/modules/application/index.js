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
import * as actions from "./applicationGrid/funcs/actions";
import reducer from "./applicationGrid/funcs/reducer";
import { REDUCER_NAME } from "./applicationGrid/funcs/constants";
import view from "./applicationCont/views/container";
import sagas from "./applicationGrid/funcs/sagas";
import {
    sagas as topoFloatTabSagas,
    reducer as topoFloatTabReducer,
    reducerName as topoFloatTabReducerName
} from "modules/application/applicationFloatTab";
import {
    // sagas as topoFilterSagas,
    reducer as topoFilterReducer,
    reducerName as topoFilterReducerName
} from "modules/application/applicationEnhanceFilter";
import store, { injectAsyncReducer, sagaMiddleware } from "commons/store";

const visualEditer = true;
sagaMiddleware.run(topoFloatTabSagas);
sagaMiddleware.run(sagas);
// sagaMiddleware.run(topoFilterSagas);
injectAsyncReducer(store, topoFloatTabReducerName, topoFloatTabReducer);
injectAsyncReducer(store, topoFilterReducerName, topoFilterReducer);
injectAsyncReducer(store, REDUCER_NAME, reducer);
// injectAsyncReducer(store, REDUCER_NAME, reducer);
// sagaMiddleware.run(sagas);

export { actions, reducer, view, sagas, REDUCER_NAME as reducerName, visualEditer };
