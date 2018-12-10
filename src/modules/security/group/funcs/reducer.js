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
 * Created by Jia Luo on 27/07/2018.
 */
import * as actionTypes from "./actionTypes";

import createReducer from "commons/utils/reducerHelper";
import { initialState } from "./constants";

const group = {
    [actionTypes.SECURITY_GROUP_GET_REQUEST](state, action) {
        return {
            ...state,
            loading: true
        };
    },
    [actionTypes.SECURITY_GROUP_FROMID_REQUEST](state, action) {
        return {
            ...state,
            drawerLoading: true
        };
    },
    [actionTypes.SECURITY_GROUP_FROMID_REQUEST_SUCCESS](state, action) {
        const { applications = [] } = action.group;
        let root = applications.map(n => {
            if (n.readwrite === 0) {
                n.readwrite = 0;
            } else {
                n.readwrite = 1;
            }
            return n;
        });
        return {
            ...state,
            applicationidArr: root,
            group: action.group,
            drawerLoading: false
        };
    },
    [actionTypes.SECURITY_GROUP_GET_REQUEST_SUCCESS](state, action) {
        let rootPayload = action.groupList.map(n => {
            // n.numberOfUsers = n.users.length;
            return n;
        });
        let currGroupData = state.currGroupData;
        if (currGroupData.grpid) {
            currGroupData = rootPayload.find(n => n.grpid === currGroupData.grpid);
        }
        return {
            ...state,
            payload: rootPayload,
            pagination: action.pagination,
            currGroupData: currGroupData || {},
            loading: false
        };
    },
    [actionTypes.SECURITY_GROUP_POST_REQUEST](state, action) {
        return {
            ...state,
            loading: true
        };
    },
    [actionTypes.SECURITY_GROUP_PUT_REQUEST](state, action) {
        return {
            ...state,
            loading: true
        };
    },
    [actionTypes.SECURITY_GROUP_DELETE_REQUEST](state, action) {
        return {
            ...state,
            loading: true
        };
    },
    [actionTypes.SECURITY_UPDATE_USER_GROUP](state, action) {
        return {
            ...state
        };
    },
    [actionTypes.SECURITY_LOADING](state, action) {
        return {
            ...state,
            loading: action.loading
        };
    },
    [actionTypes.SECURITY_GROUP_RESET](state, action) {
        return {
            ...state,
            ...action.reset
        };
    },
    [actionTypes.SECURITY_GROUP_RESET_TEMP](state, action) {
        const { grpid, userid } = action;
        const { payload } = state;
        let rootCurrData = {};
        let application = "";
        let rootpayload = payload.map(n => {
            if (n.grpid === grpid) {
                let rootusers = n.users.find(m => m.userid !== userid);
                n.users = rootusers;
                rootCurrData = n;
            }
            return n;
        });
        return {
            ...state,
            payload: rootpayload,
            currGroupData: rootCurrData,
            application
        };
    },
    [actionTypes.SECURITY_GROUP_VISIABLE](state, action) {
        return {
            ...state,
            visualizations: action.visualizations
        };
    },
    [actionTypes.SECURITY_GROUP_USER_GRPID_SUCCESS](state, action) {
        let root = action.result.map(n => {
            n.groupList = n.groups.map(m => m.grpname).join(",");
            return n;
        });
        return {
            ...state,
            users: root,
            userPagination: action.userPagination
        };
    },
    [actionTypes.SECURITY_GROUP_APPLICATION_GRPID_SUCCESS](state, action) {
        return {
            ...state,
            applications: action.result,
            applicationPagination: action.pagination
        };
    },
    [actionTypes.SECURITY_GROUP_APPLICATIONS](state, action) {
        let root = action.applicationidArr.map(n => {
            if (n.readwrite === 0) {
                n.readwrite = 0;
            } else {
                n.readwrite = 1;
            }
            return n;
        });
        return {
            ...state,
            applicationidArr: root
        };
    }
};

const groupReducer = createReducer(initialState, Object.assign({}, group));
export default groupReducer;
