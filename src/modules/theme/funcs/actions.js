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
import { CONFIG_REQUEST_SUCCESS, CONFIG_REQUEST, THEME_CHANGE, THEME_PUSH, THEME_RESET } from "./actionTypes";

export const getConfigSuccess = config => ({
    type: CONFIG_REQUEST_SUCCESS,
    config
});
export const configRequest = account => ({
    type: CONFIG_REQUEST,
    account
});
export const changeTheme = theme_topic => {
    return {
        type: THEME_CHANGE,
        themeId: theme_topic
    };
};
export const pushTheme = theme => {
    return {
        type: THEME_PUSH,
        MuiTheme: theme
    };
};

export const reset = reset => {
    return {
        type: THEME_RESET,
        reset
    };
};
