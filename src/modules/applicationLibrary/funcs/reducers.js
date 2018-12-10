/*
* =========================================================================
*  Copyright (C)2015 NCS Pte. Ltd. All Rights Reserved
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
 * Created by @Luo Jia alex on 29/05/15.
 */
import * as ActionType from "./actionTypes";
import createReducer from "commons/utils/reducerHelper";
// import { initialState } from "./constants";

const dashboard = {
    [ActionType.APPLICATION_DASHBOARD_CONTROL](state, action) {
        const { open } = action;
        return { ...state, open };
    },
    [ActionType.APPLICATION_REQUEST_SUCCESS](state, action) {
        const { datas } = action;
        return {
            ...state,
            datas
        };
    },
    [ActionType.APPLICATION_LOADING_CONTROL](state, action) {
        const { load } = action;
        return {
            ...state,
            load
        };
    }
};

const reducer = createReducer({}, Object.assign({}, dashboard));

export default reducer;
