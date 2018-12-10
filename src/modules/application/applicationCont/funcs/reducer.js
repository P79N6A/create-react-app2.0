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
 * Created by xulu on 31/08/2018.
 */
import * as actionTypes from "./actionTypes";
import createReducer from "commons/utils/reducerHelper";

const initialState = [];

const topoTree = {
    [actionTypes.TOPOTREEGRAPH_EDITOR_CONTROL_PROPS](state, action) {
        return {
            ...state,
            [action.identify]: Object.assign(
                {
                    ...state[action.identify]
                },
                action.editorState
            )
        };
    },
    [actionTypes.APPLICATION_FLOATTAB_CLOSE](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                showFloatTab: action.showFloatTab
            }
        };
    }
};

const topoTreeReducer = createReducer(initialState, Object.assign({}, topoTree));

export default topoTreeReducer;
