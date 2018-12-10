import * as actionTypes from "./actionTypes";

// export const getUsersDataFromAPI = (userId, startTime, endTime) => {
//     return {
//         type: actionTypes.GET_USERS_DATA_FROM_API,
//         userId,
//         startTime,
//         endTime
//     };
// };

// export const getUsersDataFromAPISuccess = users => {
//     return {
//         type: actionTypes.GET_USERS_DATA_FROM_API_SUCCESS,
//         users: users
//     };
// };

/**ddddddddddddddddddd */
export const getUsersDataFromAPI = (userId, startTime, endTime, pageno, limit) => {
    return {
        type: actionTypes.GET_USERS_DATA_FROM_API,
        userId,
        startTime,
        endTime, 
        pageno, 
        limit
    };
};

export const getUsersDataFromAPISuccess = users => {
    return {
        type: actionTypes.GET_USERS_DATA_FROM_API_SUCCESS,
        users: users
    };
};

export const getOneWeekUsersDataFromAPI = (userId, currentTime, lastOneWeek, pageno, limit) => {
    return {
        type: actionTypes.GET_ONE_WEEK_USERS_DATA_FROM_API,
        userId,
        currentTime,
        lastOneWeek,
        pageno,
        limit
    };
};


export const getOneWeekUsersDataFromAPISuccess = users => {
    return {
        type: actionTypes.GET_ONE_WEEK_USERS_DATA_FROM_API_SUCCESS,
        oneWeekUsers: users,
        users: users
    };
};

export const getOneMonthUsersDataFromAPI = (userId, currentTime, lastOneMonth, pageno, limit) => {
    return {
        type: actionTypes.GET_ONE_MONTH_USERS_DATA_FROM_API,
        userId,
        currentTime,
        lastOneMonth,
        pageno,
        limit
    };
};

export const getOneMonthUsersDataFromAPISuccess = users => {
    return {
        type: actionTypes.GET_ONE_MONTH_USERS_DATA_FROM_API_SUCCESS,
        oneMonthUsers: users,
        users: users
    };
};


export const getSixMonthsUsersDataFromAPI = (userId, currentTime, lastSixMonths, pageno, limit) => {
    return {
        type: actionTypes.GET_SIX_MONTHS_USERS_DATA_FROM_API,
        userId,
        currentTime,
        lastSixMonths,
        pageno,
        limit
    };
};

export const getSixMonthsUsersDataFromAPISuccess = users => {
    return {
        type: actionTypes.GET_SIX_MONTHS_USERS_DATA_FROM_API_SUCCESS,
        sixMonthsUsers: users,
        users: users
    };
};

export const getOneYearUsersDataFromAPI = (userId, currentTime, lastOneYear, pageno, limit) => {
    return {
        type: actionTypes.GET_ONE_YEAR_USERS_DATA_FROM_API,
        userId,
        currentTime,
        lastOneYear,
        pageno,
        limit
    };
};

export const getOneYearUsersDataFromAPISuccess = users => {
    return {
        type: actionTypes.GET_ONE_YEAR_USERS_DATA_FROM_API_SUCCESS,
        oneYearUsers: users,
        users: users
    };
};