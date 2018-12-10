import * as actionTypes from "./actionTypes";
import reducerHelper from "commons/utils/reducerHelper";
const initialState = {};

const compB = {
    // [actionTypes.PASS_TEXT_TO_COMPB](state, action) {
    //     return Object.assign({}, state, {
    //         text: action.text
    //     });
    // },
    // [actionTypes.GET_sms_DATA_FROM_API_SUCCESS](state, action) {
    //     return Object.assign({}, state, {
    //         sms: action.sms
    //     });
    // }

    [actionTypes.GET_SMS_DATA_FROM_API_SUCCESS](state, action) {
        return Object.assign({}, state, {
            sms: action.sms,
            totalItems: action.sms.pagination.totalrecords,
            smsPagination: action.sms.pagination
        });
    },
    [actionTypes.GET_ONE_WEEK_SMS_DATA_FROM_API_SUCCESS](state, action) {
        return Object.assign({}, state, {
            // sms: action.sms,
            oneWeeksms: action.sms
            // totalItems: action.sms.pagination.totalrecords,
            // pagination: action.sms.pagination

        });
    },
    [actionTypes.GET_ONE_MONTH_SMS_DATA_FROM_API_SUCCESS](state, action) {
        return Object.assign({}, state, {
            // sms: action.sms,
            oneMonthsms: action.sms
            // totalItems: action.sms.pagination.totalrecords,
            // pagination: action.sms.pagination
        });
    },
    [actionTypes.GET_SIX_MONTHS_SMS_DATA_FROM_API_SUCCESS](state, action) {
        return Object.assign({}, state, {
            // sms: action.sms,
            sixMonthssms: action.sms
            // totalItems: action.sms.pagination.totalrecords,
            // pagination: action.sms.pagination
        });
    },
    [actionTypes.GET_ONE_YEAR_SMS_DATA_FROM_API_SUCCESS](state, action) {
        return Object.assign({}, state, {
            // sms: action.sms,
            oneYearsms: action.sms
            // totalItems: action.sms.pagination.totalrecords,
            // pagination: action.sms.pagination
        });
    }
};

let reducer = reducerHelper(initialState, Object.assign({}, compB));

export default reducer;