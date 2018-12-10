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
import { getIcon } from "./utils";

import createReducer from "commons/utils/reducerHelper";
import { initState } from "./constants";
import _ from "lodash";

const logger = {
    [actionTypes.LOGGER_GET_LOG_LIST_REQUEST_SUCCESS](state, action) {
        const { criteria } = action.paginations;
        let rootPayload = action.results.map(n => {
            if (criteria !== "ALL") {
                return {
                    title: criteria,
                    text: n,
                    icon: getIcon(criteria)
                };
            } else {
                let regRes = n.match(/[(?<=|\s+)][A-Z]+[(?=\s+|)]/);
                return {
                    title: regRes ? regRes[0] : "INFO",
                    text: n,
                    icon: regRes ? getIcon(regRes[0]) : getIcon("INFO")
                };
            }
        });
        return {
            ...state,
            payload: rootPayload,
            paginations: action.paginations,
            isLoading: false
        };
    },
    [actionTypes.LOGGER_GET_MODULES_REQUEST_SUCCESS](state, action) {
        return {
            ...state,
            moduleList: action.results,
            module: action.results.length ? action.results[0] : ""
        };
    },
    [actionTypes.LOGGER_GET_MODULES_CHILD_REQUEST_SUCCESS](state, action) {
        return {
            ...state,
            secondModuleList: action.results,
            secondModule: action.results.length ? action.results[0] : "",
            moduleChild: action.results.length ? action.results[0] : ""
        };
    },
    [actionTypes.LOGGER_CHANGE_LOADING](state, action) {
        return {
            ...state,
            isLoading: !!action.flag
        };
    },
    [actionTypes.LOGGER_RESET](state, action) {
        return {
            ...state,
            ...action.reset
        };
    },
    [actionTypes.RECEIVE_WEBSOCKET_MESSAGE](state, action) {
        const { paginations = {}, criteria } = state;
        const { totalpages, currentpage } = paginations;
        let data = action.payload.status.code === "00000000" ? action.payload : {};
        let rootPaginations = _.cloneDeep(state.paginations);
        let rootpPayload = _.cloneDeep(state.payload);
        if (
            data["header-category"] === "ISC_LOGGER" &&
            totalpages === currentpage &&
            currentpage &&
            criteria === "ALL"
        ) {
            rootpPayload = data.data.value.map(n => {
                let regRes = n.match(/[(?<=|\s+)][A-Z]+[(?=\s+|)]/);
                return {
                    title: regRes ? regRes[0] : "INFO",
                    text: n,
                    icon: regRes ? getIcon(regRes[0]) : getIcon("INFO")
                };
            });
            rootPaginations = data.data.pagination;
        }

        return {
            ...state,
            payload: rootpPayload,
            paginations: rootPaginations
            // wsMessage: data
        };
    },
    [actionTypes.LOGGER_DOWNLOAD_FILE_SUCCESS](state, action) {
        return {
            ...state,
            downloadfile: action.content
        };
    }
};

const loggerReducer = createReducer(initState, Object.assign({}, logger));
export default loggerReducer;
