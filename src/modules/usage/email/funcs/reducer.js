import * as actionTypes from "./actionTypes";
import reducerHelper from "commons/utils/reducerHelper";
const initialState = {};

const compB = {
    // [actionTypes.PASS_TEXT_TO_COMPB](state, action) {
    //     return Object.assign({}, state, {
    //         text: action.text
    //     });
    // },
    // [actionTypes.GET_EMAIL_DATA_FROM_API_SUCCESS](state, action) {
    //     return Object.assign({}, state, {
    //         email: action.emails
    //     });
    // }

    [actionTypes.GET_EMAIL_DATA_FROM_API_SUCCESS](state, action) {
        return Object.assign({}, state, {
            email: action.email,
            totalItems: action.email.pagination.totalrecords,
            emailsPagination: action.email.pagination
        });
    },
    [actionTypes.GET_ONE_WEEK_EMAIL_DATA_FROM_API_SUCCESS](state, action) {
        return Object.assign({}, state, {
            // email: action.emails,
            oneWeekemail: action.email
            // totalItems: action.emails.pagination.totalrecords,
            // pagination: action.emails.pagination

        });
    },
    [actionTypes.GET_ONE_MONTH_EMAIL_DATA_FROM_API_SUCCESS](state, action) {
        return Object.assign({}, state, {
            // email: action.emails,
            oneMonthemail: action.email
            // totalItems: action.emails.pagination.totalrecords,
            // pagination: action.emails.pagination
        });
    },
    [actionTypes.GET_SIX_MONTHS_EMAIL_DATA_FROM_API_SUCCESS](state, action) {
        return Object.assign({}, state, {
            // email: action.emails,
            sixMonthsemail: action.email
            // totalItems: action.emails.pagination.totalrecords,
            // pagination: action.emails.pagination
        });
    },
    [actionTypes.GET_ONE_YEAR_EMAIL_DATA_FROM_API_SUCCESS](state, action) {
        return Object.assign({}, state, {
            // email: action.emails,
            oneYearemail: action.email
            // totalItems: action.emails.pagination.totalrecords,
            // pagination: action.emails.pagination
        });
    }
};

let reducer = reducerHelper(initialState, Object.assign({}, compB));

export default reducer;