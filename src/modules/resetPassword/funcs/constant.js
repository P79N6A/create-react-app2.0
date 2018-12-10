import { I18n } from "react-i18nify";
export const REDUCER_NAME = "forgotPassword";
export const initState = {
    isValidToken: true,
    active: false,
    isLoading: false,
    data: {}
};
export const resetPassword = [
    {
        label: I18n.t("security.users.NewPassword"),
        name: "password",
        rules: ["password"],
        type: "password",
        value: ""
    },
    {
        label: I18n.t("security.users.ConfirmPassword"),
        name: "confirmpassword",
        rules: ["password"],
        type: "password",
        value: ""
    }
];
