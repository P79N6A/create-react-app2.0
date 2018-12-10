import * as actionTypes  from "./actionTypes";
import createReducer from "commons/utils/reducerHelper";
import { initialState } from "./constants";
// const initialState = {};

const usage = {
    [actionTypes.USAGE_GET_ACCOUNTS_SUCCESS](state, action) {
        return Object.assign({}, state, {
            accountsData: action.accountsData
        });
    },
    [actionTypes.COUNT_DEVICE_REQUEST_SUCCESS](state, action) {
        return Object.assign({}, state, {
            countDeviceData: action.countDeviceData
        });
    },
    [actionTypes.COUNT_EVENTS_REQUEST_SUCCESS](state, action) {
        return Object.assign({}, state, {
            countEventsData: action.countEventsData
        });
    },
    [actionTypes.PASSED_ACCOUNT_ID_TO_OTHER_COMP](state, action) {
        return Object.assign({}, state, {
            passedAccountVal: action.passedAccountVal
        });
    }
    // ,
    // [actionTypes.USAGE_METER_DEVICE_DETAIL](state, action) {
    //     return Object.assign({}, state, {
    //         deviceData: action.deviceData
    //     });
    // }
    // [actionTypes.USAGE_GET_ACOUNTS_DETAIL](state, action) {
    //     return Object.assign({}, state, {
    //         accountsData: action.accountsData
    //     });
    // }
};

let reducer = createReducer(initialState, Object.assign({}, usage));
export default reducer;