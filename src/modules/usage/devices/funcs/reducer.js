import * as actionTypes from "./actionTypes";
import reducerHelper from "commons/utils/reducerHelper";
const initialState = {};

const compA = {
    // [actionTypes.PASS_TEXT_TO_COMPB](state, action) {
    //     return Object.assign({}, state, {
    //         text: action.text
    //     });
    // },

    [actionTypes.COUNT_DEVICE_REQUEST_SUCCESS](state, action) {
        return Object.assign({}, state, {
            countDeviceDatacheck: action.countDeviceData
        });
    },
    [actionTypes.GET_DEVICE_DATA_FROM_API_SUCCESS](state, action) {
        return Object.assign({}, state, {
            devices: action.devices,
            totalItems: action.devices.pagination.totalrecords,
            countDeviceData: action.devices,
            devicePagination: action.devices.pagination
        });
    },
    [actionTypes.GET_ONE_WEEK_DEVICE_DATA_FROM_API_SUCCESS](state, action) {
        return Object.assign({}, state, {
            //  devices: action.devices,
            oneWeekDevices: action.devices,
            // totalItems: action.devices.pagination.totalrecords,
            //  pagination: action.devices.pagination

        });
    },
    [actionTypes.GET_ONE_MONTH_DEVICE_DATA_FROM_API_SUCCESS](state, action) {
        return Object.assign({}, state, {
            // devices: action.devices,
            oneMonthDevices: action.oneMonthDevices,
            // totalItems: action.devices.pagination.totalrecords,
            // pagination: action.devices.pagination
        });
    },
    [actionTypes.GET_SIX_MONTHS_DEVICE_DATA_FROM_API_SUCCESS](state, action) {
        return Object.assign({}, state, {
            // devices: action.devices,
            sixMonthskDevices: action.devices,
            // totalItems: action.devices.pagination.totalrecords,
            // pagination: action.devices.pagination
        });
    },
    [actionTypes.GET_ONE_YEAR_DEVICE_DATA_FROM_API_SUCCESS](state, action) {
        return Object.assign({}, state, {
            // devices: action.devices,
            oneYearDevices: action.devices,
            // totalItems: action.devices.pagination.totalrecords,
            // pagination: action.devices.pagination
        });
    }
};

let reducer = reducerHelper(initialState, Object.assign({}, compA));

export default reducer;