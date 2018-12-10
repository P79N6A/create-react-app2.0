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
 * Created by xulu on 31/08/2018.
 */
import * as actionTypes from "./actionTypes";
import createReducer from "commons/utils/reducerHelper";
import { wsCategory } from "./constants";

const initialState = [];

const topoTree = {
    [actionTypes.TOPOGRAPH_GET_TOPO_GRAPH](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                searchGraphSuccess: action.searchGraphSuccess
            }
        };
    },
    [actionTypes.TOPOGRAPH_GET_TOPO_GRAPH_SUCCESS](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                topoGraphData: action.topoGraphData,
                searchGraphSuccess: action.searchGraphSuccess
            }
        };
    },
    [actionTypes.TOPOGRAPH_SEARCH_TOPO_GRAPH_AREA](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                searchGraphSuccess: action.searchGraphSuccess
            }
        };
    },
    [actionTypes.TOPOGRAPH_SELECT_NODE](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                selectDeviceId: action.nodeId
            }
        };
    },
    [actionTypes.TOPOGRAPH_CLOSE_FLOATTAB](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                showFloatTab: action.showFloatTab,
                selectDeviceId: action.selectDeviceId
            }
        };
    },
    [actionTypes.TOPOGRAPH_EDITOR_CONTROL_PROPS](state, action) {
        return {
            ...state,
            [action.identify]: Object.assign(
                {
                    ...state[action.identify]
                },
                action.editorState
            )
        };
    },
    // get sysconfig device type success
    [actionTypes.TOPOGRAPH_GET_SYSCONFIG_DEVICE_TYPE_SUCCESS](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                [action.dataType]: action.sysconfigDevicetypes
            }
        };
    },
    /**
     *
     *
     * @param {*} state
     * @param {*} action
     * @returns
     */
    [actionTypes.RECEIVE_WEBSOCKET_MESSAGE](state, action) {
        // let identify = action.identify;
        let data = action.payload.status.code === "00000000" ? action.payload : {};
        return {
            ...state,
            wsMessage: data["header-category"] === wsCategory ? data.data : null
        };
    }
};

const topoTreeReducer = createReducer(initialState, Object.assign({}, topoTree));

export default topoTreeReducer;
