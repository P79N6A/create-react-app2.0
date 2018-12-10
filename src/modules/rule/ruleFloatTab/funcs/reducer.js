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
 * Created by wangrui on 22/06/2018.
 */
import {
    RULEFLOATTAB_INIT,
    RULEFLOATTAB_SET,
    RULEFLOATTAB_CHANGETAB,
    RULEFLOATTAB_GETDETAIL_SUCCESS,
    RULEFLOATTAB_ADDRULE,
    RULEFLOATTAB_ADDRULE_SUCCESS,
    RULEFLOATTAB_ADDRULE_FAILURE,
    RULEFLOATTAB_UPDATERULE,
    RULEFLOATTAB_UPDATERULE_SUCCESS,
    RULEFLOATTAB_GET_TOPOLOGY_LIST_SUCCESS,
    RULEFLOATTAB_GET_DEVICEMODEL_INFO_SUCCESS,
    RULEFLOATTAB_GET_DEVICEMODEL_INFO_FAIL,
    RULEFLOATTAB_GET_RULE_CONDITION_CONFIG,
    RULEFLOATTAB_GET_ACTION_CONTENT_SUCCESS,
    RULEFLOATTAB_GET_DEVICEMODEL_INFO,
    RULEFLOATTAB_SAVE_CONFIGS
    // RULEFLOATTAB_GET_EMAIL_LIST_SUCCESS,
    // RULEFLOATTAB_GET_EMAIL_SUBJECT_LIST_SUCCESS
} from "./actionTypes";
import createReducer from "commons/utils/reducerHelper";

const initialState = [];

const rule = {
    [RULEFLOATTAB_INIT](state, action) {
        let key = action.identify;
        return {
            ...state,
            [key]: {
                identify: key
            }
        };
    },
    [RULEFLOATTAB_SET](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                configname: action.configname,
                defaultTab: action.defaultTab,
                currentTab: action.defaultTab,
                getDetailSuccess: action.getDetailSuccess,
                saveConfigs: {}
            }
        };
    },
    [RULEFLOATTAB_CHANGETAB](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                currentTab: action.checkedTab
            }
        };
    },
    [RULEFLOATTAB_GETDETAIL_SUCCESS](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                configData: action.arrayData,
                getDetailSuccess: action.getDetailSuccess,
                saveConfigs: {}
            }
        };
    },
    [RULEFLOATTAB_ADDRULE](state, action) {
        return {
            [action.identify]: {
                ...state[action.identify],
                refreshRuleFloatSuccess: action.refreshRuleFloatSuccess
            }
        };
    },
    [RULEFLOATTAB_ADDRULE_SUCCESS](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                refreshRuleFloatSuccess: action.refreshRuleFloatSuccess
            }
        };
    },
    [RULEFLOATTAB_ADDRULE_FAILURE](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                refreshRuleFloatSuccess: action.refreshRuleFloatSuccess
            }
        };
    },
    [RULEFLOATTAB_UPDATERULE](state, action) {
        return {
            [action.identify]: {
                ...state[action.identify],
                refreshRuleFloatSuccess: action.refreshRuleFloatSuccess,
            }
        };
    },
    [RULEFLOATTAB_UPDATERULE_SUCCESS](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                refreshRuleFloatSuccess: action.refreshRuleFloatSuccess
            }
        };
    },
    [RULEFLOATTAB_GET_TOPOLOGY_LIST_SUCCESS](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                properties: action.properties
            }
        };
    },
    [RULEFLOATTAB_GET_DEVICEMODEL_INFO](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                getconditionSuccess: false
            }
        };
    },
    [RULEFLOATTAB_GET_DEVICEMODEL_INFO_SUCCESS](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                conditionSchema: action.conditionSchema,
                deviceModelName: action.deviceModelName,
                getconditionSuccess: true
            }
        };
    },
    [RULEFLOATTAB_GET_DEVICEMODEL_INFO_FAIL](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                getconditionSuccess: true
            }
        };
    },
    [RULEFLOATTAB_GET_RULE_CONDITION_CONFIG](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                conditionConfig: action.conditionConfig,
            }
        };
    },
    [RULEFLOATTAB_GET_ACTION_CONTENT_SUCCESS](state, action) {
        let actionContent = {};
        actionContent[action.configname] = action.actionContent;
        if (state[action.identify].actionContent) {
            actionContent = Object.assign({}, state[action.identify].actionContent, actionContent);
        }
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                actionContent: actionContent,
            }
        };
    },
    [RULEFLOATTAB_SAVE_CONFIGS](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                saveConfigs: Object.assign({}, state[action.identify].saveConfigs, action.configs)
            }
        };
    },

};

const todoReducer = createReducer(initialState, Object.assign({}, rule));

export default todoReducer;
