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
 * Created by HuLin on 20/05/2018.
 */
import * as actionTypes from "./actionTypes";
import createReducer from "commons/utils/reducerHelper";

const initialState = {};

const data = {
    [actionTypes.SETOPENDIALOG](state, action) {
        return {
            ...state,
            isOpenDialog: action.open,
            [action.identify]: {
                ...state[action.identify]
            }
        };
    },
    [actionTypes.SETAPPLICATIONID](state, action) {
        return {
            ...state,
            applicationId: action.appid,
            [action.identify]: {
                ...state[action.identify]
            }
        };
    },
    [actionTypes.SETDELETEDIALOG](state, action) {
        return {
            ...state,
            isDeleteDialog: action.open,
            [action.identify]: {
                ...state[action.identify]
            }
        };
    },
    [actionTypes.SETOPENDRAWER](state, action) {
        return {
            ...state,
            isOpenDrawer: action.isOpenDrawer,
            [action.identify]: {
                ...state[action.identify]
            }
        };
    },
    [actionTypes.SETCOMMONDISPLAYINFO](state, action) {
        return {
            ...state,
            refreshCommonSuccess: action.refreshCommonSuccess,
            [action.identify]: {
                ...state[action.identify]
            }
        };
    },
    [actionTypes.GETCOMMONDISPLAYINFO](state, action) {
        return {
            ...state,
            refreshCommonSuccess: action.refreshCommonSuccess,
            commonDisplayInfo: action.commonDisplayInfo,
            [action.identify]: {
                ...state[action.identify]
            }
        };
    },
    [actionTypes.GETDEVICEBASICTYPE](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                deviceBasicType: action.deviceBasicType
            }
        };
    }, 
    [actionTypes.SETREFRESHMODEL](state, action) {
        return {
            ...state,
            refreshSuccess: action.refreshSuccess,
            [action.identify]: {
                ...state[action.identify]
            }
        };
    },
    [actionTypes.GETREFRESHMODEL](state, action) {
        return {
            ...state,
            refreshSuccess: action.refreshSuccess,
            [action.identify]: {
                ...state[action.identify],
                pagination: action.pagination,
                modelTable: action.modelTable
            }
        };
    },
    [actionTypes.SETDELETEMODEL](state, action) {
        return {
            ...state,
            refreshSuccess: action.refreshSuccess,
            [action.identify]: {
                ...state[action.identify]
            }
        };
    },
    [actionTypes.SETMODELINFO](state, action) {
        return {
            ...state,
            refreshCommonInfoSuccess: action.refreshCommonInfoSuccess,
            [action.identify]: {
                ...state[action.identify],
                modelIdInfo: action.modelIdInfo
            }
        };
    },
    [actionTypes.GETMODELINFO](state, action) {
        return {
            ...state,
            refreshCommonInfoSuccess: action.refreshCommonInfoSuccess,
            [action.identify]: {
                ...state[action.identify],
                modelIdInfo: action.modelIdInfo
            }
        };
    },
};

const dataReducer = createReducer(initialState, Object.assign({}, data));

export default dataReducer;
