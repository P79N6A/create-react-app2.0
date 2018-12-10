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
import * as actionTypes from "./actionType";
import { INITIAL_STATE as initialState } from "./constants";
import reducerHelper from "commons/utils/reducerHelper";
import _ from "lodash";

const handlers = {
    [actionTypes.CCMS_DATA_TRANSMIT](state, action) {
        const { datas, topic } = action;
        if (topic && _.isEqual(datas, state[topic])) {
            return state;
        }
        return Object.assign({}, state, {
            [topic]: datas
        });
    },
    [actionTypes.CCMS_DATA_DELETE](state, action) {
        const { topic } = action;
        if (topic in state) {
            delete state[topic];
        }
        return Object.assign({}, state, {
            ...state
        });
    }
};

const reducers = reducerHelper(initialState, Object.assign({}, handlers));

export default reducers;
