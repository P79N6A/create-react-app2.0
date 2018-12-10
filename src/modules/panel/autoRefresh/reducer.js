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
 * Modified by DengXiaoLong on 25/05/2018.
 */

import createReducer from "commons/utils/reducerHelper";
import * as actions from "./actionTypes";
const initState = {
    wsMessage: {}
};
let timer = null;
const autoRefresh = {
    [actions.RECEIVE_WEBSOCKET_MESSAGE](state, action) {
        let data = action.payload.status.code === "00000000" ? action.payload : {};
        if (timer) {
            clearTimeout(timer);
        }
        return {
            ...state,
            wsMessage: data
        };
    },
    [actions.REFRESH_ACTION](state, action) {
        return {
            ...state,
            refreshCount: action.refreshCount
        };
    }
};
const autoRefreshReducer = createReducer(initState, Object.assign({}, autoRefresh));

export default autoRefreshReducer;