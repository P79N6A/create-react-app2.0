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
 * Created by KaiDi on 25/05/2018.
 */
import sagas from "./funcs/sagas";
import reducer from "./funcs/reducer";
import view from "./views/view-container";
import { REDUCER_NAME } from "./funcs/constants";
import editerView from "./views/views-edit/editView-container";
import TimeFormatPicker from "./views/views-edit/timeFormatPicker";
import store, { injectAsyncReducer, sagaMiddleware } from "commons/store";

injectAsyncReducer(store, REDUCER_NAME, reducer);
sagaMiddleware.run(sagas);
//#region *unify export name* Modufy by @wplei 18.05.28 / 10:34
export { view, sagas, reducer, REDUCER_NAME as reducerName, editerView, TimeFormatPicker };
