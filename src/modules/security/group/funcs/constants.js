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

import { I18n } from "react-i18nify";
export const REDUCER_NAME = "security/group";

export const initialState = {
    payload: [],
    group: {},
    groupAllList: [],
    seachValue: "",
    applicationidArr: [],
    loading: false,
    drawerOpen: false,
    drawerLoading: false,
    transferLoading: false,
    currGroupData: {},
    searchData: {
        limit: 20,
        pageno: 1,
        sortkey: "grpName",
        asc: true
    },
    userSearchData: {
        limit: 10,
        pageno: 1
    },
    userPagination: {},
    pagination: {},
    application: "",
    applications: [],
    editApplication: "",
    users: [],
    applicationSearchData: {
        pageno: 1,
        limit: 10
    },
    applicationPagination: {}
};

export const columnDatas = [
    {
        id: "grpname",
        numeric: false,
        disablePadding: false,
        label: I18n.t("security.userGroups.GroupName")
    },
    {
        id: "grpdescription",
        numeric: false,
        disablePadding: false,
        label: I18n.t("security.userGroups.Description"),
        contentAlign: false,
        property: { component: "th", scope: "row", padding: "none" }
    },
    {
        label: I18n.t("common.TableActions")
    }
    // {
    //     id: "numberOfUsers",
    //     numeric: false,
    //     disablePadding: false,
    //     label:"No. of Members",
    //     contentAlign: false
    // }
];
export const usersColumnDatas = [
    {
        id: "userid",
        numeric: false,
        disablePadding: false,
        label: "User ID"
    },
    {
        id: "username",
        numeric: false,
        disablePadding: false,
        label: "User Name"
    }
];

export const groupFields = [
    {
        label: I18n.t("security.userGroups.GroupName"),
        name: "grpname",
        value: "",
        rules: "required",
        property: {
            placeholder: I18n.t("security.userGroups.GroupName")
        }
    },
    {
        multiline: true,
        label: I18n.t("security.userGroups.Description"),
        name: "grpdescription",
        value: "",
        rules: ["dbnormal"],
        property: {
            placeholder: I18n.t("security.userGroups.Description")
        }
    }
    // {
    //     multiple: true,
    //     label: "Role(s)",
    //     name: "roles",
    //     value: [],
    //     items: [],
    //     type: "select"
    // },
    // {
    //     multiple: true,
    //     label: "User(s)",
    //     name: "users",
    //     value: [],
    //     items: [],
    //     type: "select"
    // }
];
