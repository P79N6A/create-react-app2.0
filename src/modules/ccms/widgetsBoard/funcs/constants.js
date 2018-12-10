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
import { toggleAllModalState } from "./actions";
import store from "commons/store";
export const REDUCER_NAME = "ccms/widgetsboard";
export const RESOURCE_GROUP = "COMMON_CONFIG";
export const MODULE_NAME = "CCMS";
export const CUSTOMIZE_GROUP = "CUSTOMIZE_CONFIG";
export const INITIAL_STATE = {
    editMode: false,
    previewElement: null,
    components: [],
    loading: true,
    buttonActions: [
        {
            label: "Add Widget",
            id: "addWidget",
            icon: "important_devices",
            "material-key": null,
            action: name => {
                store.dispatch(toggleAllModalState(name, true));
            }
        },
        {
            label: "Rename Dashboard",
            id: "renameWidget",
            icon: "spellcheck",
            "material-key": null,
            action: name => {
                store.dispatch(toggleAllModalState(name, true));
            }
        },
        {
            label: "Move Dashboard",
            id: "move",
            icon: "move_to_inbox",
            "material-key": null,
            action: name => {
                store.dispatch(toggleAllModalState(name, true));
            }
        },
        {
            label: "Delete Dashboard",
            id: "deleteBoard",
            icon: "delete",
            "material-key": null,
            action: name => {
                store.dispatch(toggleAllModalState(name, true));
            }
        }
        // {
        //     label: "Application Associate",
        //     id: "addPermission",
        //     icon: "insert_link",
        //     "material-key": MATERIAL_KEY["ADD_PERMISSIONS"],
        //     action: (name, key) => {
        //         store.dispatch(toggleAllModalState(name, true));
        //         store.dispatch(getResourceInfo(key));
        //     }
        // }
    ],
    pageConfig: {
        configValue: {
            title: "",
            group: "",
            widgets: []
        }
    },
    transmitDatas: {}
};
