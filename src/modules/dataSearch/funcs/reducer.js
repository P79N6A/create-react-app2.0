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
    [actionTypes.GETEXPORTPARAMS](state, action) {
        return {
            ...state,
            exportId: action.exportId
        };
    },
    [actionTypes.DISPLAYNAME](state, action) {
        return {
            ...state,
            configvalname: action.configvalname.configs
        };
    },
    [actionTypes.GETDEFAULTDATA](state, action) {
        return {
            ...state,
            getDefaultData: action.defaultTableData,
            refreshSuccess: action.refreshSuccess
        };
    },    
    [actionTypes.SETDEFAULTDATA](state, action) {
        return {
            ...state,
            refreshSuccess: action.refreshSuccess
        };
    },        
    [actionTypes.GETSEARCHDATE](state, action) {
        return{ 
            ...state, 
            searchData: action.searchData,
            refreshSuccess: action.refreshSuccess
        };
    }, 
    [actionTypes.SELECTVAL](state, action) {
        return{ 
            ...state, 
            arr: action.arr
        };
    },
    [actionTypes.GETDATARESULT](state, action) {
        return{ 
            ...state, 
            arr: action.data
        };
    },
    [actionTypes.SETDOWNLOAD](state, action) {
        return{ 
            ...state, 
            refreshSuccess: action.refreshSuccess
        };
    },
    [actionTypes.GETDOWNLOADURL](state, action) {
        return{ 
            ...state, 
            refreshSuccess: action.refreshSuccess,
            jobResult: {
                jobResult:action.jobResult, 
                taskViewId: action.taskViewId
            }
            
        };
    },
    [actionTypes.SETREFLUSH](state, action) {
        return {
            ...state,
            refreshSuccess: action.refreshSuccess
        }; 
    },
    [actionTypes.GETREFLUSH](state, action) {
        return {
            ...state,
            refreshSuccess: action.refreshSuccess,
            taskStatus: {
                taskId: action.taskId,
                status: action.status,
                jobStatus: action.jobStatus
            }
        }; 
    }
};



const dataReducer = createReducer(initialState, Object.assign({}, data));

export default dataReducer;