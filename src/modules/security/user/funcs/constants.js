/*
* =========================================================================
*  Copyright (C)2018 NCS Pte. Ltd. All Rights Reserved
*
*  This software is confidential and proprietary to NCS Pte. Ltd. You shall
*  use this software only in accordance with the terms of the license
*  agreement you entered into with NCS.  No aspect or part or all of this
*  software may be reproduced, modified or disclosed without full and
*  direct written authorisation from NCS.
*
*  NCS SUPPLIES THIS SOFTWARE ON AN "AS IS" BASIS. NCS MAKES NO
*  REPRESENTATIONS OR WARRANTIES, EITHER EXPRESSLY OR IMPLIEDLY, ABOUT THE
*  SUITABILITY OR NON-INFRINGEMENT OF THE SOFTWARE. NCS SHALL NOT BE LIABLE
*  FOR ANY LOSSES OR DAMAGES SUFFERED BY LICENSEE AS A RESULT OF USING,
*  MODIFYING OR DISTRIBUTING THIS SOFTWARE OR ITS DERIVATIVES.
*
*  =========================================================================
*/
/**
 * Created by Jia Luo on 27/07/2018.
 */
import moment from "moment";
import _ from "lodash";
import { I18n } from "react-i18nify";
export const REDUCER_NAME = "security/user";

export const initialState = {
    payload: [],
    groupAllList: [],
    deleteData: [],
    userData: {},
    currUserData: {},
    avator: [],
    seachValue: "",
    loading: false,
    isLoading: false,
    openDrawer: false,
    drawerLoading: false,
    deleteOpen: false,
    pagination: {
        currentpage: 1,
        limit: 20,
        totalpages: 1,
        totalrecords: 0
    },
    searchData: {
        activeflag: "both",
        pageno: 1,
        limit: 20,
        sortkey: "userid",
        order: "asc"
    },
    grpSearchData: {
        pageno: 1,
        limit: 10
    },
    grpPagination: {
        currentpage: 1,
        limit: 10,
        totalpages: 1,
        totalrecords: 0
    }
};

export function getDate() {
    return moment().format("YYYY-MM-DD");
}

export const resetPassword = [
    // {
    //     label: "Old Password",
    //     name: "oldPassword",
    //     rules: ["password"],
    //     type: "password",
    //     value: ""
    // },
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

export const UserDetailField = [
    // {
    //     multiple: true,
    //     label: "Selectssss Test",
    //     name: "selects",
    //     value: [],
    //     items: ["one", "two", "three"],
    //     type: "select",
    //     children: [
    //         {
    //             value: "one",
    //             ID: "one"
    //         }
    //     ]
    // },
    // {
    //     label: "Select Test",
    //     name: "select",
    //     value: "one",
    //     items: ["one", "two", "three"],
    //     type: "select"
    // },
    // {
    //     label: "Sex",
    //     name: "testRadio",
    //     value: true,
    //     type: "radio"
    // },
    {
        label: I18n.t("security.users.UserID"),
        name: "userid",
        readOnly: true,
        rules: ["required", "id"],
        value: "",
        property: {
            placeholder: I18n.t("security.users.UserID")
        }
    },
    {
        label: I18n.t("security.users.UserName"),
        name: "username",
        rules: ["required", "name"],
        value: "",
        property: {
            placeholder: I18n.t("security.users.UserName")
        }
    },
    {
        label: I18n.t("security.users.FirstName"),
        name: "userfirstname",
        rules: ["normal"],
        value: "",
        layout: {
            xs: 6,
            sm: 6,
            paddingRight: true
        },
        property: {
            placeholder: I18n.t("security.users.FirstName")
        }
    },
    {
        label: I18n.t("security.users.LastName"),
        name: "userlastname",
        rules: ["normal"],
        layout: {
            xs: 6,
            sm: 6
        },
        value: "",
        property: {
            placeholder: I18n.t("security.users.LastName")
        }
    },
    {
        label: I18n.t("security.users.Email"),
        name: "useremail",
        rules: ["required", "email"],
        value: "",
        layout: {
            xs: 6,
            sm: 6,
            paddingRight: true
        },
        property: {
            placeholder: I18n.t("security.users.Email")
        }
    },
    {
        label: I18n.t("security.users.Mobile"),
        name: "usermobile",
        rules: ["phone"],
        value: "",
        layout: {
            xs: 6,
            sm: 6
        },
        property: {
            placeholder: I18n.t("security.users.Mobile")
        }
    },
    {
        label: I18n.t("security.users.MembershipDuration"),
        name: "timerange",
        dateRange: true,
        type: "date",
        value: [getDate(), getDate()]
    },
    // {
    //     label: I18n.t("security.users.Password "),
    //     name: "password",
    //     rules: ["password", "required"],
    //     type: "password",
    //     value: "",
    //     property: {
    //         placeholder: I18n.t("security.users.Password ")
    //     }
    // },
    // {
    //     label: I18n.t("security.users.ConfirmPassword"),
    //     name: "confirmpassword",
    //     rules: ["password", "required"],
    //     type: "password",
    //     value: "",
    //     property: {
    //         placeholder: I18n.t("security.users.ConfirmPassword")
    //     }
    // },
    {
        label: I18n.t("security.users.Status"),
        name: "active",
        type: "radio",
        value: true
    },
    {
        label: I18n.t("security.users.Group"),
        name: "groups",
        readOnly: true,
        type: "select",
        multiple: true,
        value: [],
        items: []
    }
];

export const addUserFields = _.cloneDeep(UserDetailField)
    .map((item, i) => {
        const { readOnly, ...data } = item;
        if (data.name === "timerange") {
            data.value = [getDate(), getDate()];
        }
        return data;
    })
    .filter(n => {
        return n.name !== "active";
    });
export const editUserFields = _.cloneDeep(UserDetailField).filter(item => {
    return item.type !== "password";
});
export const viewUserFields = _.cloneDeep(UserDetailField).filter(item => {
    return item.type !== "password";
});

export const readOnlyFields = UserDetailField.filter(item => item.type !== "password");

export const userFilter = [
    { text: "Show All Status", value: "both" },
    { text: "Active only", value: "active" },
    { text: "Inactive only", value: "inactive" }
];

export const columnDatas = [
    {
        id: "userid",
        numeric: false,
        disablePadding: false,
        label: I18n.t("security.users.UserID"),
        property: { component: "th", scope: "row" }
    },
    {
        id: "username",
        numeric: false,
        disablePadding: false,
        label: I18n.t("security.users.UserName"),
        contentAlign: false,
        property: { component: "th", scope: "row", padding: "none" }
    },
    {
        id: "useremail",
        numeric: false,
        disablePadding: false,
        label: I18n.t("security.users.Email"),
        contentAlign: false,
        property: { component: "th", scope: "row", padding: "none" }
    },
    {
        id: "groupList",
        numeric: false,
        disablePadding: false,
        label: I18n.t("security.users.UserGroup"),
        contentAlign: false,
        orderby: false,
        property: { component: "th", scope: "row", padding: "none" }
    },
    {
        id: "active",
        numeric: false,
        disablePadding: false,
        label: I18n.t("security.users.Status"),
        contentAlign: false,
        orderby: false,
        property: { component: "th", scope: "row", padding: "none" }
    },
    {
        label: "Actions"
    }
];

let counter = 0;
function createData(name, calories, fat, carbs, protein) {
    counter += 1;
    return { id: counter, name, calories, fat, carbs, protein };
}

export const data = [
    createData("Cupcake", 305, 3.7, 67, 4.3),
    createData("Donut", 452, 25.0, 51, 4.9),
    createData("Eclair", 262, 16.0, 24, 6.0),
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
    createData("Honeycomb", 408, 3.2, 87, 6.5),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData("Jelly Bean", 375, 0.0, 94, 0.0),
    createData("KitKat", 518, 26.0, 65, 7.0),
    createData("Lollipop", 392, 0.2, 98, 0.0),
    createData("Marshmallow", 318, 0, 81, 2.0),
    createData("Nougat", 360, 19.0, 9, 37.0),
    createData("Oreo", 437, 18.0, 63, 4.0)
];

export const columnData = [
    { id: "name", numeric: false, disablePadding: true, label: "Dessert (100g serving)" },
    { id: "calories", numeric: true, disablePadding: false, label: "Calories" },
    { id: "fat", numeric: true, disablePadding: false, label: "Fat (g)" },
    { id: "carbs", numeric: true, disablePadding: false, label: "Carbs (g)" },
    { id: "protein", numeric: true, disablePadding: false, label: "Protein (g)" }
];
