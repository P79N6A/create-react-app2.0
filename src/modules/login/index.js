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
 * Created by Wangrui on 25/05/2018.
 */
import view from "./views/container";
import selfSagas from "./funcs/selfSagas";
import loginReducer from "./funcs/reducers";
import { INITIAL_STATE } from "./funcs/constants";
import sagas from "modules/auth/funcs/sagas";
import reducer from "modules/auth/funcs/reducer";
import { REDUCER_NAME } from "./funcs/constants";

// import store, { injectAsyncReducer } from "commons/store";
// injectAsyncReducer(store, REDUCER_NAME, reducer);
// sagaMiddleware.run(sagas);

export {
    INITIAL_STATE as initialState,
    reducer,
    view,
    sagas,
    selfSagas,
    loginReducer,
    REDUCER_NAME as loginReducerName
};
