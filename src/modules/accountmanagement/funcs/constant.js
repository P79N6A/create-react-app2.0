import { I18n } from "react-i18nify";
import moment from "moment";
export function getDate() {
    return moment().format("YYYY-MM-DD");
}
export const REDUCER_NAME = "account";
export const initState = {
    payload: [],
    logo: [],
    searchData: {
        pageno: 1,
        limit: 20,
        sort: "asc"
    },
    groupSearchData: {
        pageno: 1,
        limit: 10
    },
    accountGroupDatas: [],
    paginations: {},
    isLoading: false,
    drawerLoading: false,
    drawerOpen: false,
    deleteOpen: false,
    account: {},
    deleteData: []
};
export const columnDatas = [
    {
        id: "displayname",
        numeric: false,
        orderby: false,
        disablePadding: false,
        label: I18n.t("account.AccountName")
    },
    {
        id: "id",
        numeric: false,
        disablePadding: false,
        orderby: false,
        label: I18n.t("account.AccountID"),
        contentAlign: false
    },
    {
        id: "status",
        numeric: false,
        disablePadding: false,
        label: I18n.t("account.Status"),
        orderby: false,
        contentAlign: false
    },
    {
        id: "description",
        numeric: false,
        disablePadding: false,
        orderby: false,
        label: I18n.t("account.Description"),
        contentAlign: false
    },
    {
        label: "Actions"
    }
];

export const activeData = [{ label: "Inactive", value: "0" }, { label: "Active", value: "1" }];

export const addAccountFields = [
    {
        label: I18n.t("account.AccountName"),
        name: "displayname",
        value: "",
        rules: "required"
    },
    // {
    //     label: "Account ID",
    //     name: "id",
    //     value: "",
    //     readOnly: true
    // },
    {
        label: I18n.t("account.Description"),
        name: "description",
        value: ""
    },
    {
        label: I18n.t("account.Status"),
        name: "status",
        type: "radio",
        value: true
    },
    // {
    //     label: "Url",
    //     name: "url",
    //     value: "",
    //     multiline: true
    // },
    {
        label: I18n.t("account.IoTGateway"),
        name: "iotgateway",
        value: "IoThub",
        readOnly: true
    }
    // {
    //     label: "Account Group",
    //     name: "group",
    //     value: "Other",
    //     items: ["Other", "One"],
    //     type: "select",
    //     rules: "required"
    // }
];

export const dateOfExpiry = [
    // {
    //     label: "Tick for Trial Account",
    //     name: "trialaccount",
    //     value: false,
    //     type: "checkbox"
    // },
    {
        label: "Date of Expiry",
        name: "dateofexpiry",
        type: "date",
        parent: "trialaccount",
        property: {},
        value: getDate()
    }
];

export const otherGroup = [
    {
        label: "Enter Your Group",
        name: "othergroup",
        value: "",
        rules: "required"
    }
];

export const selectTheme = [
    {
        label: "Select Theme",
        name: "uitheme",
        value: "Default-NCS",
        type: "select",
        items: ["Default-NCS", "Default-Optus", "Default-Singtel"],
        rules: "required"
    }
];

export const editAccountFields = [
    {
        label: I18n.t("account.AccountName"),
        name: "displayname",
        value: "",
        rules: "required"
    },
    // {
    //     label: "Account ID",
    //     name: "id",
    //     value: "",
    //     readOnly: true
    // },
    {
        label: I18n.t("account.Status"),
        name: "status",
        type: "radio",
        value: true
    },
    {
        label: I18n.t("account.Description"),
        name: "description",
        value: ""
    },
    {
        label: I18n.t("account.IoTGateway"),
        name: "iotgateway",
        value: "IoThub",
        readOnly: true
    }
    // {
    //     label: "Tick for Trial Account",
    //     name: "trialaccount",
    //     value: false,
    //     type: "checkbox"
    // }
];

export const accountCardField = [
    {
        ids: Math.random(Date.now()),
        form: [
            {
                label: "Saiutation",
                name: "salutation",
                value: "Mr.",
                rules: "required",
                type: "select",
                items: ["Mr.", "Mrs."],
                layout: {
                    xs: 4,
                    sm: 2,
                    paddingRight: true
                }
            },
            {
                label: "Name",
                name: "name",
                value: "",
                rules: "required",
                layout: {
                    xs: 8,
                    sm: 4
                }
            },
            {
                label: "Job Title",
                name: "jobtitle",
                value: ""
            },
            {
                label: "Address",
                name: "address",
                value: ""
            },
            {
                label: "Tick if same as primary contact",
                name: "sameasaddress",
                type: "checkbox",
                value: false
            },
            {
                label: "Contact No.",
                name: "countrycode",
                value: "",
                layout: {
                    xs: 4,
                    sm: 2,
                    paddingRight: true
                },
                rules: ["required", "countrycode"]
            },
            {
                label: " ",
                name: "phone",
                value: "",
                layout: {
                    xs: 8,
                    sm: 4
                },
                rules: ["required", "number"]
            },
            {
                label: "Email",
                name: "email",
                value: "",
                rules: ["required", "email"]
            }
        ]
    }
];
