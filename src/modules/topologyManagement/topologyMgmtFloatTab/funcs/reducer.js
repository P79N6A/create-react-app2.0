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
    [actions.TOPOMGMTFLOATTAB_INIT](state, action) {
        let key = action.identify;
        return {
            ...state,
            [key]: {
                identify: key
            }
        };
    },
    [actions.TOPOMGMTFLOATTAB_SET](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                deviceId: action.deviceId,
                resourcePath: action.resourcePath,
                defaultTab: action.defaultTab,
                currentTab: action.defaultTab,
                getAlarmSuccess: action.getAlarmSuccess,
                getEventSuccess: action.getEventSuccess,
                getDetailSuccess: action.getDetailSuccess,
                detailSearchWord: action.detailSearchWord,
                selectDevicetype: action.selectDevicetype,
                devicetypeId: action.devicetypeId,
                activeStep: action.activeStep,
                addDeviceSuccess: action.addDeviceSuccess,
                shouldNext: action.shouldNext,
                // defaultIcon: action.defaultIcon,
                alarms: action.alarms,
                events: action.events
            }
        };
    },
    [actions.TOPOMGMTFLOATTAB_CHANGETAB](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                currentTab: action.checkedTab
            }
        };
    },
    [actions.TOPOMGMTFLOATTAB_GETDETAIL_SUCCESS](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                deviceData: action.arrayData,
                getDetailSuccess: action.getDetailSuccess
            }
        };
    },
    [actions.TOPOMGMTFLOATTAB_GETALARM](state, action) {
        return { ...state, getAlarmSuccess: action.getAlarmSuccess };
    },
    [actions.TOPOMGMTFLOATTAB_GETALARM_SUCCESS](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                alarms: action.alarms,
                getAlarmSuccess: action.getAlarmSuccess,
                alarmPagination: action.alarmPagination,
                alarmOrder: action.orderOpt.alarmOrderBy,
                alarmOrderDisplayName: action.orderOpt.alarmOrderDisplayName,
                alarmOrderDirection: action.orderOpt.alarmOrderDirection
            }
        };
    },
    [actions.TOPOMGMTFLOATTAB_GETEVENT](state, action) {
        return { ...state, getEventSuccess: action.getEventSuccess };
    },
    [actions.TOPOMGMTFLOATTAB_GETEVENT_SUCCESS](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                events: action.events,
                getEventSuccess: action.getEventSuccess,
                eventPagination: action.eventPagination,
                eventOrder: action.orderOpt.eventOrderBy,
                eventOrderDisplayName: action.orderOpt.eventOrderDisplayName,
                eventOrderDirection: action.orderOpt.eventOrderDirection
            }
        };
    },
    [actions.TOPOMGMTFLOATTAB_DETAIL_SEARCH](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                detailSearchWord: action.detailSearchWord
            }
        };
    },
    [actions.TOPOMGMTFLOATTAB_SET_TITLE](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                currentTitle: action.currentTitle
            }
        };
    },
    [actions.TOPOMGMTFLOATTAB_SEARCH_TOPOTYPE_SUCCESS](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                topoTypeData: action.topoTypeData,
                searchTopoTypeSuccess: action.searchTopoTypeSuccess
            }
        };
    },
    [actions.TOPOMGMTFLOATTAB_SELECT_DEVICE_TYPE](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                selectDevicetype: action.selectDevicetype,
                devicetypeId: action.devicetypeId
            }
        };
    },
    [actions.TOPOMGMTFLOATTAB_SEARCH_ADDRESS_SUCCESS](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                addressData: action.addressData,
                addressPagination: action.pagination,
                addressClearSearch: action.clearLiveSearch
            }
        };
    },
    [actions.TOPOMGMTFLOATTAB_ADD_DEVICE](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                needRefreshTopology: action.needRefreshTopology
            }
        };
    },
    [actions.TOPOMGMTFLOATTAB_ADD_LOCATION](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                disableSave: action.disableSave
            }
        };
    },
    [actions.TOPOMGMTFLOATTAB_ADD_LOCATION_SUCCESS](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                location: action.location,
                disableSave: action.disableSave
            }
        };
    },
    [actions.TOPOMGMTFLOATTAB_EDIT_DEVICE_DETAIL](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                needRefreshTopology: action.needRefreshTopology
            }
        };
    },
    [actions.TOPOMGMTFLOATTAB_EDIT_DEVICE_DETAIL_SUCCESS](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                needRefreshTopology: action.needRefreshTopology
            }
        };
    },
    [actions.TOPOMGMTFLOATTAB_ADD_DEVICE_SUCCESS](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                addDeviceSuccess: action.addDeviceSuccess,
                needRefreshTopology: action.needRefreshTopology
            }
        };
    },
    [actions.TOPOMGMTFLOATTAB_EDIT_DEVICE_TYPE](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                needRefreshTopology: action.needRefreshTopology
            }
        };
    },
    [actions.TOPOMGMTFLOATTAB_EDIT_DEVICE_TYPE_SYSCONFIG_SUCCESS](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                needRefreshTopology: action.needRefreshTopology
            }
        };
    },
    [actions.TOPOMGMTFLOATTAB_CHANGE_AVTIVESTEP](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                activeStep: action.activeStep
            }
        };
    },
    [actions.TOPOMGMTFLOATTAB_GET_DEVICE_SCHEMA_SUCCESS](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                [action.schemaType]: action.configs
            }
        };
    },
    [actions.TOPOMGMTFLOATTAB_ADD_DEVICE_TYPE](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                needRefreshTopology: action.needRefreshTopology,
                addDevicetypeSuccess: action.addDevicetypeSuccess
            }
        };
    },
    [actions.TOPOMGMTFLOATTAB_ADD_DEVICE_TYPE_SYSCONFIG_SUCCESS](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                needRefreshTopology: action.needRefreshTopology,
                addDevicetypeSuccess: action.addDevicetypeSuccess
            }
        };
    },
    [actions.TOPOMGMTFLOATTAB_GET_SYSCONFIG_BASIC_TYPE_SUCCESS](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                [action.schemaType]: action.configs
            }
        };
    }, // choose icon
    [actions.TOPOMGMTFLOATTAB_CHOOSE_ICON](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                defaultIcon: action.icon
            }
        };
    }, // get devicetype detail success
    [actions.TOPOMGMTFLOATTAB_GET_DEVICE_TYPE_DETAIL_SUCCESS](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                devicetypeDetail: action.devicetypeDetail
            }
        };
    },
    // get devicetype detail success
    [actions.TOPOMGMTFLOATTAB_GET_SYSCONFIG_DEVICE_TYPE_DETAIL_SUCCESS](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                sysconfigDevicetypeDetail: action.sysconfigDevicetypeDetail,
                needRefreshTopology: action.needRefreshTopology
            }
        };
    },
    // search topo location success
    [actions.TOPOMGMTFLOATTAB_SEARCH_LOCATION_SUCCESS](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                locationData: action.locationData,
                locationPagination: action.pagination,
                locationClearSearch: action.clearLiveSearch
            }
        };
    },

    // property change
    [actions.TOPOMGMTFLOATTAB_PROPERTY_CHANGE](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                [action.propertyType]: action.propertyData
            }
        };
    },
    [actions.TOPOMGMTFLOATTAB_CREATE_APP](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                addAppSuccess: action.addAppSuccess
            }
        };
    },
    [actions.TOPOMGMTFLOATTAB_CREATE_APP_SUCCESS](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                addAppSuccess: action.addAppSuccess
            }
        };
    },
    [actions.TOPOMGMTFLOATTAB_GETAPP_SCHEMA_SUCCESS](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                [action.schemaType + "Schema"]: action.configs
            }
        };
    },
    [actions.TOPOMGMTFLOATTAB_ADD_APP_LOCATION](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                disableAppSave: action.disableAppSave
            }
        };
    },
    [actions.TOPOMGMTFLOATTAB_ADD_APP_LOCATION_SUCCESS](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                appLocation: action.appLocation,
                disableAppSave: action.disableAppSave
            }
        };
    },
    [actions.TOPOMGMTFLOATTAB_UPLOAD_IMAGE_SUCCESS](state, action) {
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
