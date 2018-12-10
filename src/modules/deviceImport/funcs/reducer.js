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
 * Created by Krishalee on 16/11/18.
 */
import {
    TOPOIMPORT_CONFIGS_FROM_SYSCONFIG_SUCCESS,
    TOPOIMPORT_GET_FILE_HISTORY_SUCCESS,
    TOPOIMPORT_BULK_DEVICE_IMPORT_SUCCESS
    // TOPOIMPORT_BULK_DEVICE_INIT_PROPS
} from "./actionTypes";
import reducerHelper from "commons/utils/reducerHelper";
import { initialState } from "./constants";
// const initialState = {};

const importData = {
    [TOPOIMPORT_CONFIGS_FROM_SYSCONFIG_SUCCESS](state, action) {
        return Object.assign({}, state, {
            result: action
        });
    },
    [TOPOIMPORT_GET_FILE_HISTORY_SUCCESS](state, action) {
        return Object.assign({}, state, {
            files: action.data.files,
            pagination: action.data.pagination
        });
    },
    [TOPOIMPORT_BULK_DEVICE_IMPORT_SUCCESS](state, action) {
        return Object.assign({}, state, {
            job: action.data
            // result: action
        });
    }
};

let importReducer = reducerHelper(initialState, Object.assign({}, importData));

export default importReducer;
