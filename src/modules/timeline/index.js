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
import * as actions from "./timelineContent/funcs/actions";
import reducer from "./timelineContent/funcs/reducer";
import { REDUCER_NAME } from "./timelineContent/funcs/constants";
import view from "./timelineContent/views/container";
import sagas from "./timelineContent/funcs/sagas";
// import {
//     sagas as timelineFloatTabSagas,
//     reducer as timelineFloatTabReducer,
//     reducerName as timelineFloatTabReducerName
// } from "modules/timeline/timelineFloatTab";
import {
    // sagas as timelineFilterSagas,
    reducer as timelineFilterReducer,
    reducerName as timelineFilterReducerName
} from "modules/timeline/timelineEnhanceFilter";
import store, { injectAsyncReducer, sagaMiddleware } from "commons/store";
import EditerView from "./timelineContent/views/editerView";

// import {
//     reducer as filterReducer,
//     reducerName as filterReducerName,
//     sagas as filterSagas
// } from "modules/filter/topologyFilter";
const visualEditer = true;
// sagaMiddleware.run(timelineFloatTabSagas);
sagaMiddleware.run(sagas);
// injectAsyncReducer(store, timelineFloatTabReducerName, timelineFloatTabReducer);
injectAsyncReducer(store, timelineFilterReducerName, timelineFilterReducer);
injectAsyncReducer(store, REDUCER_NAME, reducer);
// injectAsyncReducer(store, filterReducerName, filterReducer);
// injectAsyncReducer(store, filterModelReducerName, filterModelReducer);
export { actions, reducer, view, sagas, REDUCER_NAME as reducerName, visualEditer, EditerView as editerView };
