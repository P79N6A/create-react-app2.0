import { SNACKBAR_LOAD, SNACKBAR_CLEAR } from "./actionTypes";

export const loadSnackbar = (message, status) => {
    setTimeout(() => {
        clearSnackbar();
    }, 3000);
    return {
        type: SNACKBAR_LOAD,
        open: true,
        message: message,
        status: status
    };
};
export const clearSnackbar = () => ({
    type: SNACKBAR_CLEAR
});
