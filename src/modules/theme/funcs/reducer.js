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
 * Created by Wangrui on 08/06/2018.
 */

import { CONFIG_REQUEST_SUCCESS, THEME_CHANGE, THEME_PUSH, THEME_RESET } from "./actionTypes";
import createReducer from "commons/utils/reducerHelper";
import themes from "../themes.json";
const initialState = {
    theme: "DARK_THEME"
};
function validateConfig(config) {
    if (config) {
        let configVal = typeof config === "object" ? config : JSON.parse(config);
        configVal.theme = Object.assign({}, themes, configVal.theme);
        return configVal;
    }
}

const config = {
    [CONFIG_REQUEST_SUCCESS](state, action) {
        return {
            ...state,
            config: validateConfig(action.config.value),
            theme: validateConfig(action.config.value).theme
        };
    },
    [THEME_CHANGE](state, action) {
        const { themeId } = action;
        return {
            ...state,
            theme: themeId
        };
    },
    [THEME_PUSH](state, action) {
        const { MuiTheme } = action;
        return {
            ...state,
            MuiTheme
        };
    },
    [THEME_RESET](state, action) {
        const { reset = {} } = action;
        return {
            ...state,
            ...reset
        };
    }
};

const themeReducer = createReducer(initialState, Object.assign({}, config));

export default themeReducer;
