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
import * as types from "./actionTypes";
import createReducer from "commons/utils/reducerHelper";

const handler = {
    [types.REQUEST_DASHBOARD_SUCCESS](state, action) {
        const { payload } = action;
        return Object.assign({}, state, {
            ...payload
        });
    },
    [types.REQUEST_GROUP_SUCCESS](state, action) {
        const { payload } = action;
        return Object.assign({}, state, {
            ...payload
        });
    },
    [types.REQUEST_DASHBOARD_LOADING](state, action) {
        const { isLoading } = action;
        return Object.assign({}, state, {
            isLoading
        });
    },
    [types.REQUEST_COUNTS_SUCCESS](state, action) {
        const { counts } = action;
        return Object.assign({}, state, {
            counts
        });
    }
};

const reducers = createReducer({}, Object.assign({}, handler));

export default reducers;
