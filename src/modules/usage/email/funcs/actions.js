import * as actionTypes from "./actionTypes";

// export const getEmailDataFromAPI = (userId, startTime, endTime) => {
//     return {
//         type: actionTypes.GET_EMAIL_DATA_FROM_API,
//         userId,
//         startTime,
//         endTime
//     };
// };

// export const getEmailDataFromAPISuccess = email => {
//     return {
//         type: actionTypes.GET_EMAIL_DATA_FROM_API_SUCCESS,
//         email: email
//     };
// };

/**ddddddddddddddddddd */
export const getEmailDataFromAPI = (userId, startTime, endTime, pageno, limit) => {
    return {
        type: actionTypes.GET_EMAIL_DATA_FROM_API,
        userId,
        startTime,
        endTime, 
        pageno, 
        limit
    };
};

export const getEmailDataFromAPISuccess = email => {
    return {
        type: actionTypes.GET_EMAIL_DATA_FROM_API_SUCCESS,
        email: email
    };
};

export const getOneWeekEmailDataFromAPI = (userId, currentTime, lastOneWeek, pageno, limit) => {
    return {
        type: actionTypes.GET_ONE_WEEK_EMAIL_DATA_FROM_API,
        userId,
        currentTime,
        lastOneWeek,
        pageno,
        limit
    };
};


export const getOneWeekEmailDataFromAPISuccess = email => {
    return {
        type: actionTypes.GET_ONE_WEEK_EMAIL_DATA_FROM_API_SUCCESS,
        oneWeekEmail: email,
        email: email
    };
};

export const getOneMonthEmailDataFromAPI = (userId, currentTime, lastOneMonth, pageno, limit) => {
    return {
        type: actionTypes.GET_ONE_MONTH_EMAIL_DATA_FROM_API,
        userId,
        currentTime,
        lastOneMonth,
        pageno,
        limit
    };
};

export const getOneMonthEmailDataFromAPISuccess = email => {
    return {
        type: actionTypes.GET_ONE_MONTH_EMAIL_DATA_FROM_API_SUCCESS,
        oneMonthEmail: email,
        email: email
    };
};


export const getSixMonthsEmailDataFromAPI = (userId, currentTime, lastSixMonths, pageno, limit) => {
    return {
        type: actionTypes.GET_SIX_MONTHS_EMAIL_DATA_FROM_API,
        userId,
        currentTime,
        lastSixMonths,
        pageno,
        limit
    };
};

export const getSixMonthsEmailDataFromAPISuccess = email => {
    return {
        type: actionTypes.GET_SIX_MONTHS_EMAIL_DATA_FROM_API_SUCCESS,
        sixMonthsEmail: email,
        email: email
    };
};

export const getOneYearEmailDataFromAPI = (userId, currentTime, lastOneYear, pageno, limit) => {
    return {
        type: actionTypes.GET_ONE_YEAR_EMAIL_DATA_FROM_API,
        userId,
        currentTime,
        lastOneYear,
        pageno,
        limit
    };
};

export const getOneYearEmailDataFromAPISuccess = email => {
    return {
        type: actionTypes.GET_ONE_YEAR_EMAIL_DATA_FROM_API_SUCCESS,
        oneYearEmail: email,
        email: email
    };
};