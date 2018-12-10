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
import * as actionTypes from "./actionTypes";
import { INITIAL_STATE } from "./constants";
import reducerHelper from "commons/utils/reducerHelper";

const handlers = {
    [actionTypes.CCMS_DASHBOARD_TOGGLE_MODAL](state, action) {
        const { payload } = action;
        return Object.assign({}, state, {
            ...payload,
            dialogDisabled: false
        });
    },
    [actionTypes.CCMS_GET_USER_TEMPLATE_SUCCESS](state, action) {
        const { payload } = action;
        return Object.assign({}, state, {
            ...payload
        });
    },
    [actionTypes.CCMS_GET_GROUP_DATA_SUCCESS](state, action) {
        const { payload } = action;
        return Object.assign({}, state, {
            ...payload
        });
    },
    [actionTypes.CCMS_MODAL_GET_PAGEKEY_SUCCESS](state, action) {
        const { key } = action.payload;
        return Object.assign({}, state, {
            pageKey: key
        });
    },
    [actionTypes.CCMS_MODAL_LOCK_DIALOG](state, action) {
        const { disabledDialog } = action.payload;
        return {
            ...state,
            dialogDisabled: disabledDialog
        };
    }
};

const reducers = reducerHelper(INITIAL_STATE, Object.assign({}, handlers));

export default reducers;
