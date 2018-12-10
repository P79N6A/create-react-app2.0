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
 * Created by wplei on 25/05/18.
 */
import * as actionTypes from "./actionTypes";
import { INITIAL_STATE as initialState } from "./constants";
import reducerHelper from "commons/utils/reducerHelper";

const handlers = {
    [actionTypes.CCMS_TOGGLE_MODAL](state, action) {
        const { open, options } = action;
        return Object.assign({}, state, {
            open,
            ...options
        });
    },
    [actionTypes.CCMS_TRANSFORM_PAGE](state, action) {
        const { pageConfig } = action;
        return Object.assign({}, state, {
            pageConfig,
            loading: false
        });
    },
    [actionTypes.CCMS_TRANSFORM_DEFAULT_COMPONENT](state, action) {
        const { widgets } = action;
        return Object.assign({}, state, {
            widgets
        });
    },
    [actionTypes.CCMS_TRANSFORM_APPLICATIONS](state, action) {
        const { applications, group } = action;
        return Object.assign({}, state, {
            applications,
            group
        });
    },
    [actionTypes.CCMS_TRANSFORM_RESOURCE_INFO](state, action) {
        const { infos } = action;
        return Object.assign({}, state, {
            resourceInfo: infos
        });
    },
    [actionTypes.CCMS_WIDGETS_BOARD_EXPORT_WIDGETS](state, action) {
        let exportData = {
            exportWidgets: action.exportWidgets,
            exportTime: action.exportTime
        };
        return Object.assign({}, state, {
            exportData: exportData
        });
    },
    [actionTypes.CCMS_TOGGLE_EDIT_MODE](state, action) {
        return Object.assign({}, state, {
            editMode: action.editMode
        });
    },
    [actionTypes.CCMS_TRANSFORM_PAGE_KEY](state, action) {
        const { pageKey } = action;
        return Object.assign({}, state, {
            pageKey
        });
    },
    [actionTypes.CCMS_GET_CUSTOMIZE_DASHBOARD_KEY](state, action) {
        const { customizedDashboardKey } = action.payload;
        return Object.assign({}, state, {
            customizedDashboardKey
        });
    },
    [actionTypes.CCMS_GET_CUSTOMIZE_DASHBOARD](state, action) {
        const { customizedDashboards } = action.payload;
        return Object.assign({}, state, {
            customizedDashboards
        });
    }
};

const reducers = reducerHelper(initialState, Object.assign({}, handlers));

export default reducers;
