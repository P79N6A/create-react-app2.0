import * as actionTypes from "./actionTypes";

// export const getEventsDataFromAPI = (userId, startTime, endTime) => {
//     return {
//         type: actionTypes.GET_EVENTS_DATA_FROM_API,
//         userId,
//         startTime,
//         endTime
//     };
// };

// export const getEventsDataFromAPISuccess = events => {
//     return {
//         type: actionTypes.GET_EVENTS_DATA_FROM_API_SUCCESS,
//         events: events
//     };
// };

/**ddddddddddddddddddd */
export const getEventDataFromAPI = (userId, startTime, endTime, pageno, limit) => {
    return {
        type: actionTypes.GET_EVENT_DATA_FROM_API,
        userId,
        startTime,
        endTime, 
        pageno, 
        limit
    };
};

export const getEventDataFromAPISuccess = events => {
    return {
        type: actionTypes.GET_EVENT_DATA_FROM_API_SUCCESS,
        events: events
    };
};

export const getOneWeekEventDataFromAPI = (userId, currentTime, lastOneWeek, pageno, limit) => {
    return {
        type: actionTypes.GET_ONE_WEEK_EVENT_DATA_FROM_API,
        userId,
        currentTime,
        lastOneWeek,
        pageno,
        limit
    };
};


export const getOneWeekEventDataFromAPISuccess = events => {
    return {
        type: actionTypes.GET_ONE_WEEK_EVENT_DATA_FROM_API_SUCCESS,
        oneWeekevents: events,
        events: events
    };
};

export const getOneMonthEventDataFromAPI = (userId, currentTime, lastOneMonth, pageno, limit) => {
    return {
        type: actionTypes.GET_ONE_MONTH_EVENT_DATA_FROM_API,
        userId,
        currentTime,
        lastOneMonth,
        pageno,
        limit
    };
};

export const getOneMonthEventDataFromAPISuccess = events => {
    return {
        type: actionTypes.GET_ONE_MONTH_EVENT_DATA_FROM_API_SUCCESS,
        oneMonthevents: events,
        events: events
    };
};


export const getSixMonthsEventDataFromAPI = (userId, currentTime, lastSixMonths, pageno, limit) => {
    return {
        type: actionTypes.GET_SIX_MONTHS_EVENT_DATA_FROM_API,
        userId,
        currentTime,
        lastSixMonths,
        pageno,
        limit
    };
};

export const getSixMonthsEventDataFromAPISuccess = events => {
    return {
        type: actionTypes.GET_SIX_MONTHS_EVENT_DATA_FROM_API_SUCCESS,
        sixMonthsevents: events,
        events: events
    };
};

export const getOneYearEventDataFromAPI = (userId, currentTime, lastOneYear, pageno, limit) => {
    return {
        type: actionTypes.GET_ONE_YEAR_EVENT_DATA_FROM_API,
        userId,
        currentTime,
        lastOneYear,
        pageno,
        limit
    };
};

export const getOneYearEventDataFromAPISuccess = events => {
    return {
        type: actionTypes.GET_ONE_YEAR_EVENT_DATA_FROM_API_SUCCESS,
        oneYearevents: events,
        events: events
    };
};