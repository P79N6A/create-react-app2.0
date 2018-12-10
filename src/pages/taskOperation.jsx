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
 * Created by Chenling on 16/10/2018.
 */

import React from "react";
// import store, { injectAsyncReducer, sagaMiddleware } from "../commons/store";
import {
    view as TaskOperation,
//     sagas as workFlowSagas,
//     reducer as workFlowReducer,
//     reducerName as workFlowReducerName
} from "modules/taskOperation";
import config from "./config/workflow.json";
// sagaMiddleware.run(workFlowSagas);
// injectAsyncReducer(store, workFlowReducerName, workFlowReducer);

function TaskOperationPage() {
    let firstWorkflow = config[0];
    let ableWorkflow = JSON.parse(sessionStorage.getItem("ISC-SETTINGS")).sopAction.ableWorkflow;
    // console.log(ableWorkflow);
    return (
        ableWorkflow && <TaskOperation
            {...firstWorkflow.config}
        />
        
    );
}

export default TaskOperationPage;
