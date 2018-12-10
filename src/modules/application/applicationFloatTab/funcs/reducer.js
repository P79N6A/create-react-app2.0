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
 * Created by xulu on 25/05/2018.
 */
import * as actions from "./actionTypes";
import createReducer from "commons/utils/reducerHelper";

const initialState = [];

const topology = {
    [actions.APPLICATION_FLOATTAB_INIT](state, action) {
        let key = action.identify;
        return {
            ...state,
            [key]: {
                identify: key
            }
        };
    },
    [actions.APPLICATION_FLOATTAB_SET](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                deviceId: action.deviceId,
                imageId: action.imageId,
                resourcePath: action.resourcePath,
                defaultTab: action.defaultTab,
                currentTab: action.defaultTab,
                getDetailSuccess: action.getDetailSuccess,
                detailSearchWord: action.detailSearchWord
            }
        };
    },
    [actions.APPLICATION_FLOATTAB_CHANGETAB](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                currentTab: action.checkedTab
            }
        };
    },
    [actions.APPLICATION_FLOATTAB_GETADDRESS_DETAIL](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                isLoadingAddressDetail: true,
                imageId: ""
            }
        };
    },
    [actions.APPLICATION_FLOATTAB_GETADDRESS_DETAIL_SUCCESS](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                addressDetail: action.addressDetail,
                getDetailSuccess: true,
                isLoadingAddressDetail: false
            }
        };
    },
    [actions.APPLICATION_GET_DEVICE_DETAIL_REQUEST](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                isLoadingAddressDetail: true
            }
        };
    },
    [actions.APPLICATION_GET_DEVICE_DETAIL_SUCCESS](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                deviceDetail: action.deviceDetail,
                getDetailSuccess: true,
                isLoadingAddressDetail: false
            }
        };
    },
    [actions.APPLICATION_GETDATA_FAILURE](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                ...action
            }
        };
    },
    [actions.APPLICATION_FLOATTAB_SET_TITLE](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                currentTitle: action.currentTitle
            }
        };
    },
    [actions.FLOATTAB_GETAPP_SCHEMA_SUCCESS](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                [action.schemaType + "Schema"]: action.configs
            }
        };
    },
    [actions.APPLICATION_FLOATTAB_CREATE_APP_SUCCESS](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                needRefreshTopology: action.needRefreshTopology
            }
        };
    },
    [actions.APPLICATION_FLOATTAB_CREATE_APP](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                needRefreshTopology: action.needRefreshTopology
            }
        };
    },
    [actions.APPLICATION_FLOATTAB_UPDATE_APP](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                needRefreshTopology: action.needRefreshTopology
            }
        };
    },
    [actions.APPLICATION_FLOATTAB_UPDATE_APP_SUCCESS](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                needRefreshTopology: action.needRefreshTopology
            }
        };
    },
    [actions.APPLICATION_CREATE_LOCATION_REQUEST](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                disableSave: action.disableSave
            }
        };
    },
    [actions.APPLICATION_CREATE_LOCATION_SUCCESS](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                location: action.location,
                disableSave: action.disableSave
            }
        };
    },
    [actions.APPLICATION_UPLOAD_IMAGE_SUCCESS](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                imageId: action.imageId
            }
        };
    }
};

const todoReducer = createReducer(initialState, Object.assign({}, topology));

export default todoReducer;
