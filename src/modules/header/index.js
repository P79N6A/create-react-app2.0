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
 * Created by wplei on 25/05/18.
 */
import store, { injectAsyncReducer, sagaMiddleware } from "commons/store";
import reducer from "./funcs/reducer";
import * as actions from "./funcs/actions";
import Header from "./views/header";
import sagas from "./funcs/sagas";
import {
    REDUCER_NAME as reducerName
    // INITAL_STATE as initialState
} from "./funcs/constants";

injectAsyncReducer(store, reducerName, reducer);
sagaMiddleware.run(sagas);

export {
    Header as view,
    reducer,
    reducerName,
    // navbarAction,
    // initialState,
    actions,
    sagas
};
