/*
 * =========================================================================
 *  Copyright (C)2015 NCS Pte. Ltd. All Rights Reserved
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
 * Created by @Luo Jia alex on 29/05/15.
 */
export const REDUCER_NAME = "dashboard";
export const CONSITIONS_SESSION_KEY = "ISC-DASHBOARD-SEARCH-CONDITIONS";
export const MODULE_NAME = "DASHBOARD";
export const initialState = {
    payload: [],
    isShowModal: {
        widgets: false,
        chartType: false
    },
    isScale: false,
    isDelete: false,
    isDeletePagekey: "",
    currItem: {},
    dashboardItem: {},
    pageId: "",
    groupData: [],
    cloneGroupData: [],
    countData: [0, 0, 0],
    dashboardsLen: 0,
    total: 0,
    userSubmitTemplates: [],
    loading: false,
    searchData: {
        sortOrders: [
            {
                field: "priority",
                asc: false
            },
            {
                field: "createDt",
                asc: false
            }
        ],
        pageable: { pageno: 0, limit: 20 },
        group: "",
        name: "",
        fields: ["pageKey", "pageId", "name", "desc", "createDt", "updateDt"],
        configValue: {}
    }
};

export const Search = {
    groups: ["All Dashboards", "Alarms", "Event"],
    group: "All Dashboards",
    orderBys: [
        { text: "Sort By", value: "Sort By" },
        { text: "Newly Added", value: "createDt" },
        { text: "Last Edited", value: "updateDt" },
        { text: "Most Viewed", value: "callNum" }
    ],
    orderBy: "Sort By",
    statusDatas: [
        {
            status: "Dashboards",
            icon: "dashboard",
            count: "000",
            "material-key": null
        },
        { status: "Devices", icon: "devices_other", count: "000", "material-key": null },
        { status: "Alarms", icon: "warning", count: "000", "material-key": null }
    ]
};

export const sortGroup = [
    {
        field: "updateDt",
        asc: true,
        value: "Date Creation"
    },
    {
        field: "id",
        asc: false,
        value: "Group Name"
    }
];

export const columnData = [
    { id: "id", numeric: true, disablePadding: true, label: "Groups" },
    { id: "createDt", numeric: true, disablePadding: true, label: "Date Created" },
    { id: "pageLen", numeric: true, disablePadding: false, label: "No. of Dashboard" }
];

export const permission = {
    ruleMANT: "ISC_WEB_COMP_C_CCMS_DASHBOARD_GROUP",
    creteDashboardGroupCOMP: "ISC_WEB_COMP_C_CCMS_DASHBOARD_GROUP"
};

export const DEFAULT = "default";
export const HIGH = "high";

export const DASHBOARD_BLACK_LIST = "Customize Dashboards";
