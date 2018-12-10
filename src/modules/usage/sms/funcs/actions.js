import * as actionTypes from "./actionTypes";

// export const getsmsDataFromAPI = (userId, startTime, endTime) => {
//     return {
//         type: actionTypes.GET_sms_DATA_FROM_API,
//         userId,
//         startTime,
//         endTime
//     };
// };

// export const getsmsDataFromAPISuccess = sms => {
//     return {
//         type: actionTypes.GET_sms_DATA_FROM_API_SUCCESS,
//         sms: sms
//     };
// };

/**ddddddddddddddddddd */
export const getSmsDataFromAPI = (userId, startTime, endTime, pageno, limit) => {
    return {
        type: actionTypes.GET_SMS_DATA_FROM_API,
        userId,
        startTime,
        endTime, 
        pageno, 
        limit
    };
};

export const getSmsDataFromAPISuccess = sms => {
    return {
        type: actionTypes.GET_SMS_DATA_FROM_API_SUCCESS,
        sms: sms
    };
};

export const getOneWeekSmsDataFromAPI = (userId, currentTime, lastOneWeek, pageno, limit) => {
    return {
        type: actionTypes.GET_ONE_WEEK_SMS_DATA_FROM_API,
        userId,
        currentTime,
        lastOneWeek,
        pageno,
        limit
    };
};


export const getOneWeekSmsDataFromAPISuccess = sms => {
    return {
        type: actionTypes.GET_ONE_WEEK_SMS_DATA_FROM_API_SUCCESS,
        oneWeeksms: sms,
        sms: sms
    };
};

export const getOneMonthSmsDataFromAPI = (userId, currentTime, lastOneMonth, pageno, limit) => {
    return {
        type: actionTypes.GET_ONE_MONTH_SMS_DATA_FROM_API,
        userId,
        currentTime,
        lastOneMonth,
        pageno,
        limit
    };
};

export const getOneMonthSmsDataFromAPISuccess = sms => {
    return {
        type: actionTypes.GET_ONE_MONTH_SMS_DATA_FROM_API_SUCCESS,
        oneMonthsms: sms,
        sms: sms
    };
};


export const getSixMonthsSmsDataFromAPI = (userId, currentTime, lastSixMonths, pageno, limit) => {
    return {
        type: actionTypes.GET_SIX_MONTHS_SMS_DATA_FROM_API,
        userId,
        currentTime,
        lastSixMonths,
        pageno,
        limit
    };
};

export const getSixMonthsSmsDataFromAPISuccess = sms => {
    return {
        type: actionTypes.GET_SIX_MONTHS_SMS_DATA_FROM_API_SUCCESS,
        sixMonthssms: sms,
        sms: sms
    };
};

export const getOneYearSmsDataFromAPI = (userId, currentTime, lastOneYear, pageno, limit) => {
    return {
        type: actionTypes.GET_ONE_YEAR_SMS_DATA_FROM_API,
        userId,
        currentTime,
        lastOneYear,
        pageno,
        limit
    };
};

export const getOneYearSmsDataFromAPISuccess = sms => {
    return {
        type: actionTypes.GET_ONE_YEAR_SMS_DATA_FROM_API_SUCCESS,
        oneYearsms: sms,
        sms: sms
    };
};