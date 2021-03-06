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
 * Created by JIa Luo on 10/10/2018.
 */
import React from "react";
import configs from "./config/activition.json";
import { view as Activition, sagas, reducerName, reducer } from "modules/activition";
import store, { injectAsyncReducer, sagaMiddleware } from "../commons/store";

injectAsyncReducer(store, reducerName, reducer);
sagaMiddleware.run(sagas);

export const Activitions = () => {
    let alarm = configs.modules[0];
    const { props } = alarm;
    // store.dispatch(ccmsAction(config.properties, config.identify));
    return <Activition {...props} />;
};

export default Activitions;
