import * as ActionTypes from "./actionTypes";

export const appControl = options => {
    return {
        type: ActionTypes.APPLICATION_DASHBOARD_CONTROL,
        ...options
    };
};

export const appRequest = predicates => {
    return {
        type: ActionTypes.APPLICATION_REQUEST,
        predicates
    };
};

export const requestSuccess = datas => {
    return {
        type: ActionTypes.APPLICATION_REQUEST_SUCCESS,
        datas
    };
};

export const loadingControl = state => {
    return {
        type: ActionTypes.APPLICATION_LOADING_CONTROL,
        load: state
    };
};
