import * as actionTypes from "./actionTypes";
import reducerHelper from "commons/utils/reducerHelper";
const initialState = {};

const compB = {
    // [actionTypes.PASS_TEXT_TO_COMPB](state, action) {
    //     return Object.assign({}, state, {
    //         text: action.text
    //     });
    // },
    // [actionTypes.GET_EVENTS_DATA_FROM_API_SUCCESS](state, action) {
    //     return Object.assign({}, state, {
    //         events: action.events
    //     });
    // }

    [actionTypes.GET_EVENT_DATA_FROM_API_SUCCESS](state, action) {
        return Object.assign({}, state, {
            events: action.events,
            totalItems: action.events.pagination.totalrecords,
            eventsPagination: action.events.pagination
        });
    },
    [actionTypes.GET_ONE_WEEK_EVENT_DATA_FROM_API_SUCCESS](state, action) {
        return Object.assign({}, state, {
            // events: action.events,
            oneWeekEvents: action.events,
            // totalItems: action.events.pagination.totalrecords,
            // pagination: action.events.pagination

        });
    },
    [actionTypes.GET_ONE_MONTH_EVENT_DATA_FROM_API_SUCCESS](state, action) {
        return Object.assign({}, state, {
            // events: action.events,
            oneMonthevents: action.events,
            // totalItems: action.events.pagination.totalrecords,
            // pagination: action.events.pagination
        });
    },
    [actionTypes.GET_SIX_MONTHS_EVENT_DATA_FROM_API_SUCCESS](state, action) {
        return Object.assign({}, state, {
            // events: action.events,
            sixMonthsevents: action.events,
            // totalItems: action.events.pagination.totalrecords,
            // pagination: action.events.pagination
        });
    },
    [actionTypes.GET_ONE_YEAR_EVENT_DATA_FROM_API_SUCCESS](state, action) {
        return Object.assign({}, state, {
            // events: action.events,
            oneYearevents: action.events,
            // totalItems: action.events.pagination.totalrecords,
            // pagination: action.events.pagination
        });
    }
};

let reducer = reducerHelper(initialState, Object.assign({}, compB));

export default reducer;