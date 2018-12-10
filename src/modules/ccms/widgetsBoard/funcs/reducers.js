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
import * as actionTypes from "../funcs/actionTypes";
import { INITIAL_STATE as initialState } from "./constants";
import reducerHelper from "commons/utils/reducerHelper";

const handlers = {
    [actionTypes.CCMS_DAHSBOARD_MODAL_STATUS_CONTROL](state, action) {
        const { modal, status } = action;
        // console.log(modal, "--->", status);
        return Object.assign({}, state, {
            [modal]: status
        });
    },
    [actionTypes.CCMS_WIDGETS_BOARD_TOGGLE_EDIT_MODE](state, action) {
        return Object.assign({}, state, {
            editMode: action.editMode
        });
    },
    [actionTypes.CCMS_WIDGETS_BOARD_PREVIEW_CENTRE_ELEMENT_SWITCH](state, action) {
        return Object.assign({}, state, {
            previewElement: action.element
        });
    },
    [actionTypes.CCMS_WIDGETS_BOARD_PAGECONFIG_REQUEST_RESULT](state, action) {
        return Object.assign({}, state, {
            pageConfig: action.pageConfig,
            pageRequestError: false,
            errorMessage: false
        });
    },
    [actionTypes.CCMS_WIDGETS_BOARD_UPDATE_REDUCER_PAGECONFIG](state, action) {
        return Object.assign({}, state, {
            pageConfig: action.pageConfig
        });
    },
    [actionTypes.CCMS_WIDGETS_BOARD_TRANSMIT_DEFAULT_COMPONENTS](state, action) {
        return Object.assign({}, state, {
            components: action.comps
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
    [actionTypes.CCMS_WIDGETS_BOARD_ERROR_MESSAGE](state, action) {
        return Object.assign({}, state, {
            pageRequestError: true,
            pageConfig: {
                configValue: {
                    title: "",
                    group: "",
                    widgets: []
                }
            },
            errorMessage: action.message
        });
    },
    [actionTypes.CCMS_WIDGETS_BOARD_LOADING_STATUS](state, action) {
        return Object.assign({}, state, {
            loading: action.loading
        });
    },
    [actionTypes.CCMS_WIDGET_BOARD_EDITABLE](state, action) {
        return Object.assign({}, state, {
            editable: action.editable,
            pageRequestError: !action.editable
        });
    },
    [actionTypes.CCMS_WIDGET_BOARD_TOGGLE_SECURITY_DIALOG](state, action) {
        return Object.assign({}, state, {
            securityDialog: action.state
        });
    },
    [actionTypes.CCMS_WIDGET_BOARD_PASS_PERMISSION_LIST](state, action) {
        return Object.assign({}, state, {
            permissionList: action.permissions,
            userGroup: action.group
        });
    },
    [actionTypes.CCMS_DASHBOARD_LIBRARY_PASSRESOURCE_DETAIL](state, action) {
        return Object.assign({}, state, {
            resourceDetail: action.resourceDetail
        });
    }
};

const reducers = reducerHelper(initialState, Object.assign({}, handlers));

export default reducers;
