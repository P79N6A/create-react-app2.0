import * as actionTypes from "./actionTypes";
import reducerHelper from "commons/utils/reducerHelper";
const initialState = {};

const compB = {
    // [actionTypes.PASS_TEXT_TO_COMPB](state, action) {
    //     return Object.assign({}, state, {
    //         text: action.text
    //     });
    // },
    // [actionTypes.GET_USERS_DATA_FROM_API_SUCCESS](state, action) {
    //     return Object.assign({}, state, {
    //         users: action.userss
    //     });
    // }

    [actionTypes.GET_USERS_DATA_FROM_API_SUCCESS](state, action) {
        return Object.assign({}, state, {
            users: action.users,
            totalItems: action.users.pagination.totalrecords,
            usersPagination: action.users.pagination
        });
    },
    [actionTypes.GET_ONE_WEEK_USERS_DATA_FROM_API_SUCCESS](state, action) {
        return Object.assign({}, state, {
            // users: action.userss,
            oneWeekusers: action.users
            // totalItems: action.userss.pagination.totalrecords,
            // pagination: action.userss.pagination

        });
    },
    [actionTypes.GET_ONE_MONTH_USERS_DATA_FROM_API_SUCCESS](state, action) {
        return Object.assign({}, state, {
            // users: action.userss,
            oneMonthusers: action.users
            // totalItems: action.userss.pagination.totalrecords,
            // pagination: action.userss.pagination
        });
    },
    [actionTypes.GET_SIX_MONTHS_USERS_DATA_FROM_API_SUCCESS](state, action) {
        return Object.assign({}, state, {
            // users: action.userss,
            sixMonthsusers: action.users
            // totalItems: action.userss.pagination.totalrecords,
            // pagination: action.userss.pagination
        });
    },
    [actionTypes.GET_ONE_YEAR_USERS_DATA_FROM_API_SUCCESS](state, action) {
        return Object.assign({}, state, {
            // users: action.userss,
            oneYearusers: action.users
            // totalItems: action.userss.pagination.totalrecords,
            // pagination: action.userss.pagination
        });
    }
};

let reducer = reducerHelper(initialState, Object.assign({}, compB));

export default reducer;