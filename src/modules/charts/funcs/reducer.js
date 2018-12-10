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
 * Created by KaiDi on 25/05/2018.
 */

import * as actions from "./actionTypes";
import createReducer from "commons/utils/reducerHelper";

// const initialState = {
//     data: [],
//     property: [],
//     isReady: false,
//     // isLoading:false,
//     isNewData: false
// };
const initialState = {};

const chart = {
    [actions.CHANGE_USE_STATE](state, action) {
        let identify = action.identify;
        return {
            ...state,
            [identify]: {
                ...state[identify],
                isNewData: action.state
            }
        };
    },
    [actions.TOPOLOGY_REQUEST](state, action) {
        let identify = action.identify;
        return {
            ...state,
            [identify]: {
                ...state[identify],
                isLoading: true
            }
        };
    },
    [actions.TOPOLOGY_SUCCESS](state, action) {
        let identify = action.identify;
        let source = action.payload;
        return {
            ...state,
            [identify]: {
                ...state[identify],
                data: source.pro,
                isLoading: false,
                isNewData: true
            }
        };
    },
    [actions.TOPOLOGY_FAILURE](state, action) {
        let identify = action.identify;
        return {
            ...state,
            [identify]: {
                ...state[identify],
                isLoading: false,
                data: {},
                isNewData: true
            }
        };
    },
    [actions.DEVICEMODEL_PROPERTY_REQUEST](state, action) {
        let identify = action.identify;
        return {
            ...state,
            [identify]: {
                ...state[identify],
                isLoading: true
            }
        };
    },
    [actions.DEVICEMODEL_PROPERTY_SUCCESS](state, action) {
        let identify = action.identify;
        let source = action.payload;
        return {
            ...state,
            [identify]: {
                ...state[identify],
                propertyList: source.propertyList,
                // isReady: true,
                isLoading: false
            }
        };
    },
    [actions.DEVICEMODEL_PROPERTY_FAILURE](state, action) {
        let identify = action.identify;
        return {
            ...state,
            [identify]: {
                ...state[identify],
                isLoading: false,
                propertyList: {}
            }
        };
    },
    [actions.TOPOLOGY_STATIC_REQUEST](state, action) {
        let identify = action.identify;
        return {
            ...state,
            [identify]: {
                ...state[identify],
                isLoading: true
            }
        };
    },
    [actions.TOPOLOGY_STATIC_SUCCESS](state, action) {
        let identify = action.identify;
        let source = action.payload;
        return {
            ...state,
            [identify]: {
                ...state[identify],
                data: source,
                isLoading: false,
                isNewData: true
            }
        };
    },
    [actions.TOPOLOGY_STATIC_FAILURE](state, action) {
        let identify = action.identify;
        return {
            ...state,
            [identify]: {
                ...state[identify],
                isLoading: false,
                isNewData: true,
                data:{}
            }
        };
    },
    [actions.ALARM_REQUEST](state, action) {
        let identify = action.identify;
        return {
            ...state,
            [identify]: {
                ...state[identify],
                isLoading: true
            }
        };
    },
    [actions.ALARM_SUCCESS](state, action) {
        let identify = action.identify;
        return {
            ...state,
            [identify]: {
                ...state[identify],
                data: action.payload,
                isLoading: false,
                isNewData: true
            }
        };
    },
    [actions.ALARM_FAILURE](state, action) {
        let identify = action.identify;
        return {
            ...state,
            [identify]: {
                ...state[identify],
                isLoading: false,
                isNewData: true,
                data:{}
            }
        };
    },
    [actions.EVENT_REQUEST](state, action) {
        let identify = action.identify;
        return {
            ...state,
            [identify]: {
                ...state[identify],
                isLoading: true
            }
        };
    },
    [actions.EVENT_SUCCESS](state, action) {
        let identify = action.identify;
        return {
            ...state,
            [identify]: {
                ...state[identify],
                data: action.payload,
                isLoading: false,
                isNewData: true
            }
        };
    },
    [actions.EVENT_FAILURE](state, action) {
        let identify = action.identify;
        return {
            ...state,
            [identify]: {
                ...state[identify],
                isLoading: false,
                isNewData: true,
                data:{}
            }
        };
    },
    //KPI PREVIEW
    [actions.KPI_PREVIEW_REQUEST](state, action) {
        let identify = action.identify;
        return {
            ...state,
            [identify]: {
                ...state[identify],
                isLoading: true
            }
        };
    },
    [actions.KPI_PREVIEW_SUCCESS](state, action) {
        let identify = action.identify;
        let keyList = action.keyList;
        let data = action.data;
        return {
            ...state,
            [identify]: {
                ...state[identify],
                data,
                propertyList: keyList,
                isLoading: false,
                isNewData: true
            }
        };
    },
    [actions.KPI_PREVIEW_FAILURE](state, action) {
        let identify = action.identify;
        return {
            ...state,
            [identify]: {
                ...state[identify],
                isLoading: false,
                isNewData: true,
                data:{}
            }
        };
    },
    //KPI SERVICE
    [actions.KPI_SERVICE_REQUEST](state, action) {
        let identify = action.identify;
        return {
            ...state,
            [identify]: {
                ...state[identify],
                isLoading: true
            }
        };
    },
    [actions.KPI_SERVICE_SUCCESS](state, action) {
        let identify = action.identify;
        let keyList = action.keyList;
        let data = action.data;
        return {
            ...state,
            [identify]: {
                ...state[identify],
                data,
                propertyList: keyList,
                isLoading: false,
                isNewData: true
            }
        };
    },
    [actions.KPI_SERVICE_FAILURE](state, action) {
        let identify = action.identify;
        return {
            ...state,
            [identify]: {
                ...state[identify],
                isLoading: false,
                isNewData: true,
                data:{}
            }
        };
    },
    [actions.GET_KPI_LIST_SUCCESS](state, action) {
        let identify = action.identify;
        return {
            ...state,
            [identify]: {
                ...state[identify],
                serviceList: action.serviceList
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
    [actions.CHANGE_PROPERTY](state, action) {
        let identify = action.identify;
        // let name = action.parameterName;
        return {
            ...state,
            [identify]: {
                ...state[identify],
                ...action.object
                // [name]: action.value
            }
        };
    },
    [actions.APPLY_DEFAULT_PROPERTY](state, action) {
        let identify = action.identify;
        return {
            ...state,
            [identify]: {
                ...state[identify],
                ...action.props
            }
        };
    },
    /**
     * export
     *
     * @param {*} state
     * @param {*} action
     * @returns
     */
    [actions.EXPORT_EVENT_ALARM_DATA_REQUEST](state, action) {
        let identify = action.identify;
        return {
            ...state,
            [identify]: {
                ...state[identify],
                exportError:undefined
            }
        };
    },
    [actions.EXPORT_EVENT_ALARM_DATA_SUCCESS](state, action) {
        let identify = action.identify;
        return {
            ...state,
            [identify]: {
                ...state[identify],
                exportData: action.data,
            }
        };
    },
    [actions.EXPORT_EVENT_ALARM_DATA_FAILURE](state, action) {
        let identify = action.identify;
        return {
            ...state,
            [identify]: {
                ...state[identify],
                exportError:true
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
    [actions.RECEIVE_WEBSOCKET_MESSAGE](state, action) {
        // let identify = action.identify;
        let data = action.payload.status.code === "00000000" ? action.payload : {};
        return {
            ...state,
            wsMessage: data
        };
    },
    [actions.REFRESH_ACTION](state, action) {
        let identify = action.identify;
        return {
            ...state,
            [identify]: {
                ...state[identify],
                refreshCount: action.refreshCount
            }
        };
    }
};

const chartReducer = createReducer(initialState, Object.assign({}, chart));

export default chartReducer;
