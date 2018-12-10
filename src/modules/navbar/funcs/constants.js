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
 * Created by wplei on 25/05/18.
 */
import { I18n } from "react-i18nify";
// const MATERIAL_KEY = get();
export const REDUCER_NAME = "navbar";
export const NAVBAR_OPEN = "open";
export const NAVBAR_LIST = "list";
export const MENU_LIST = [
    {
        id: "back",
        text: "Back To Applications",
        icon: "reply",
        state: 1
    },
    {
        text: "Application Library", //I18n.t("navbar.Dashboards")
        uri: "/",
        icon: "dashboard",
        state: 0,
        // "material-key": MATERIAL_KEY["APPLICATION_LIBRARY"]["material-key"]
    },
    {
        text: I18n.t("navbar.Dashboards"),
        uri: "/dashboards",
        icon: "dashboard",
        state: 1,
        // "material-key": MATERIAL_KEY["DASHBOARD_LIBRARY_MGMT_PAGE"]["material-key"]
    },
    {
        id: "device",
        text: "Devices",
        icon: "devices_other",
        state: 1,
        // "material-key": MATERIAL_KEY["DEVICE_MGMT_PAGE"]["material-key"],
        subs: [
            {
                id: "device",
                text: "Device Provisioning",
                uri: "/deviceProvision",
                icon: "show_chart",
                state: 1,
                // "material-key": MATERIAL_KEY["DEVICE_MGMT_PAGE"]["material-key"]
            }
        ]
    },
    {
        text: I18n.t("navbar.Rules"),
        uri: "/rules",
        icon: "poll",
        state: 1,
        // "material-key": MATERIAL_KEY["RULE_MGMT_PAGE"]["material-key"]
    },
    {
        text: I18n.t("navbar.Events"),
        uri: "/events",
        icon: "format_list_bulleted",
        state: 1,
        // "material-key": MATERIAL_KEY["EVENT_MGMT_PAGE"]["material-key"]
    },
    {
        text: I18n.t("navbar.Alarms"),
        uri: "/alarms",
        icon: "warning",
        state: 1,
        // "material-key": MATERIAL_KEY["ALARM_MGMT_PAGE"]["material-key"]
    },
    {
        text: "App Management",
        uri: "/application",
        icon: "apps",
        state: 0,
        // "material-key": MATERIAL_KEY["SETTING_APPLICATION_CONFIG_PAGE"]["material-key"]
    },
    {
        text: I18n.t("navbar.Users"),
        uri: "/security",
        icon: "people_outline",
        state: [0],
        // "material-key": MATERIAL_KEY["SECURITY_MGMT_PAGE"]["material-key"]
    },
    {
        text: "Big Data Export",
        uri: "/dataSearch",
        icon: "exit_to_app",
        state: [0],
        // "material-key": MATERIAL_KEY["DATA_DATASEARCH_PAGE"]["material-key"]
    },
    {
        text: I18n.t("navbar.Accounts"),
        uri: "/account",
        icon: "account_circle",
        state: [0, 1],
        // "material-key": MATERIAL_KEY["ACCOUNTS_PAGE"]["material-key"]
    },
    {
        text: "Machine Learning",
        uri: "/machineLearn",
        icon: "perm_data_setting",
        state: [0, 1],
        // "material-key": MATERIAL_KEY["MACHINE_LEARNING"]["material-key"]
    },
    {
        text: I18n.t("navbar.Logger"),
        uri: "/logger",
        icon: "event_note",
        state: 0,
        // "material-key": MATERIAL_KEY["LOGGER_PAGE"]["material-key"]
    }
];

export const INITAL_STATE = {};
