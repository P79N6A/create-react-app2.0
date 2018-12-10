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
 * Created by SongCheng on 31/08/2018.
 */
import store, { injectAsyncReducer, sagaMiddleware } from "commons/store";
import * as actions from "./auditList/funcs/actions";
import { ccmsAction } from "./auditList/funcs/actions";
import reducer from "./auditList/funcs/reducer";
import { REDUCER_NAME } from "./auditList/funcs/constants";
import view from "./auditList/views/container";
import sagas from "./auditList/funcs/sagas";
// import EditerView from "./auditList/views/editerView";
const visualEditer = true;

injectAsyncReducer(store, REDUCER_NAME, reducer);
sagaMiddleware.run(sagas);

export {
    actions,
    reducer,
    view,
    sagas,
    REDUCER_NAME as reducerName,
    visualEditer,
    // EditerView as editerView,
    ccmsAction
};
