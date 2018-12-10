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
import * as ActionTypes from "./actionTypes";
import reducerHelper from "commons/utils/reducerHelper";
import { INITAL_STATE as initalState } from "./constants";

const handler = {
    [ActionTypes.BASE_NAVBAR_STATE](state, action) {
        return Object.assign({}, state, {
            menuOpen: action.menuOpen
        });
    },
    [ActionTypes.BASE_NAVBAR_LIST_UPDATE](state, action) {
        return Object.assign({}, state, {
            menuList: action.menuList
        });
    },
    [ActionTypes.BASE_NAVBAR_STATE_UPDATE](state, action) {
        const { state: s } = action;
        return {
            ...state,
            state: s
        };
    }
};

let reducer = reducerHelper(initalState, Object.assign({}, handler));

export default reducer;
