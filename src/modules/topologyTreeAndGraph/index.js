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
 * Created by xulu on 31/08/2018.
 */
import * as actions from "./topologyCont/funcs/actions";
import reducer from "./topologyCont/funcs/reducer";
import { REDUCER_NAME } from "./topologyCont/funcs/constants";
import view from "./topologyCont/views/container";
import sagas from "./topologyCont/funcs/sagas";

import {
    sagas as topoFloatTabSagas,
    reducer as topoFloatTaReducer,
    reducerName as topoFloatTaReducerName
} from "modules/topologyTreeAndGraph/topologyFloatTab";
import store, { injectAsyncReducer, sagaMiddleware } from "commons/store";
import EditorView from "./topologyCont/views/editorView";

sagaMiddleware.run(sagas);
sagaMiddleware.run(topoFloatTabSagas);
injectAsyncReducer(store, REDUCER_NAME, reducer);
injectAsyncReducer(store, topoFloatTaReducerName, topoFloatTaReducer);

export { actions, reducer, view, sagas, REDUCER_NAME as reducerName, EditorView as editerView };
