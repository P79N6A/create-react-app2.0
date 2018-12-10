import * as actionTypes from "./actionTypes";

// export const getEventsCount = () => ({
//     type: actionTypes.COUNT_EVENTS_REQUEST
// });
export const getDeviceCount = () => ({
    type: actionTypes.COUNT_DEVICE_REQUEST
});

// export const getDeviceCountSuccess = devices => {
//     return {
//         type: actionTypes.COUNT_DEVICE_REQUEST_SUCCESS,
//         countDeviceData: devices
//     };
// };

export const getDeviceCountSuccess = (countDeviceData) => ({
    countDeviceData,
    type: actionTypes.COUNT_DEVICE_REQUEST_SUCCESS
});


export const getDeviceDataFromAPI = (userId, startTime, endTime, pageno, limit) => {
    return {
        type: actionTypes.GET_DEVICE_DATA_FROM_API,
        userId,
        startTime,
        endTime, 
        pageno, 
        limit
    };
};
export const getDeviceDataFromAPISuccess = devices => {
    return {
        type: actionTypes.GET_DEVICE_DATA_FROM_API_SUCCESS,
        devices: devices
    };
};

export const getOneWeekDeviceDataFromAPI = (userId, currentTime, lastOneWeek,  pageno, limit) => {
    return {
        type: actionTypes.GET_ONE_WEEK_DEVICE_DATA_FROM_API,
        userId,
        currentTime,
        lastOneWeek,
        pageno,
        limit
    };
};


export const getOneWeekDeviceDataFromAPISuccess = devices => {
    return {
        type: actionTypes.GET_ONE_WEEK_DEVICE_DATA_FROM_API_SUCCESS,
        oneWeekDevices: devices,
        devices: devices
    };
};

export const getOneMonthDeviceDataFromAPI = (userId, currentTime, lastOneMonth, pageno, limit) => {
    return {
        type: actionTypes.GET_ONE_MONTH_DEVICE_DATA_FROM_API,
        userId,
        currentTime,
        lastOneMonth,
        pageno, 
        limit
    };
};

export const getOneMonthDeviceDataFromAPISuccess = devices => {
    return {
        type: actionTypes.GET_ONE_MONTH_DEVICE_DATA_FROM_API_SUCCESS,
        oneMonthDevices: devices,
        devices: devices
    };
};

export const getSixMonthsDeviceDataFromAPI = (userId, currentTime, lastSixMonths, pageno, limit) => {
    return {
        type: actionTypes.GET_SIX_MONTHS_DEVICE_DATA_FROM_API,
        userId,
        currentTime,
        lastSixMonths,
        pageno,
        limit
    };
};

export const getSixMonthsDeviceDataFromAPISuccess = devices => {
    return {
        type: actionTypes.GET_SIX_MONTHS_DEVICE_DATA_FROM_API_SUCCESS,
        sixMontshdevices: devices,
        devices: devices
    };
};
export const getOneYearDeviceDataFromAPI = (userId, currentTime, lastOneYear, pageno, limit) => {
    return {
        type: actionTypes.GET_ONE_YEAR_DEVICE_DATA_FROM_API,
        userId,
        currentTime,
        lastOneYear,
        pageno, 
        limit
    };
};

export const getOneYearDeviceDataFromAPISuccess = devices => {
    return {
        type: actionTypes.GET_ONE_YEAR_DEVICE_DATA_FROM_API_SUCCESS,
        oneYearDevices: devices,
        devices: devices
    };
};