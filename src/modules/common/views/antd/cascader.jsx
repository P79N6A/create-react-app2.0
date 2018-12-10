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
 * Created by KaiDi on 25/05/2018.
 */

import React from "react";
// import PropTypes from "prop-types";
import { Cascader } from "antd";
import { withStyles } from "@material-ui/core/styles";
import FormHelperText from "@material-ui/core/FormHelperText";
import classnames from "classnames";

const styles = Theme => ({
    "@global": {
        ".iscCascader .ant-cascader-picker": {
            color: Theme.palette.text.primary,
            background: "none",
            border: "none",
            fontSize: "1rem",
            fontFamily: "Roboto, Helvetica, Arial, sans-serif",
            lineHeight: "1.1875em"
        },
        ".iscCascader .ant-input": {
            border: "none",
            borderRadius: 0,
            borderBottom: "1px solid " + Theme.typography.caption.color
        },
        ".iscCascader .ant-cascader-picker:hover .ant-cascader-input": {
            borderBottom: "2px solid " + Theme.typography.caption.color
        },
        ".iscCascader .ant-cascader-picker:focus .ant-cascader-input": {
            borderBottom: "2px solid " + Theme.palette.secondary.main,
            boxShadow: "none"
        },
        ".iscCascader .iscCascader-disabled": {
            color: Theme.palette.text.disabled + " !important"
        },
        ".iscCascader .ant-cascader-picker-disabled .ant-input-disabled": {
            borderBottom: "1px dotted " + Theme.palette.text.disabled + " !important"
        },
        ".iscCascader .ant-cascader-picker .ant-cascader-picker-label": {
            padding: 0
        },
        ".iscCascader .iscCascader-textlabel": {
            marginBottom: "0.2rem",
            marginTop: 0
        },
        ".iscCascader:focus-within .iscCascader-textlabel": {
            color: Theme.palette.secondary.main
        },
        ".iscCascader:focus-within .ant-cascader-picker": {
            backgroundColor: "rgba(0, 0, 0, 0.05)"
        },
        ".iscCascader .ant-cascader-picker-arrow,.iscCascader .ant-cascader-picker-clear": {
            color: Theme.typography.caption.color,
            background: "none"
        },
        //dropdown menu
        ".iscCascader .ant-cascader-menus .ant-cascader-menu": {
            boxShadow: Theme.shadows[8],
            backgroundColor: Theme.palette.background.paper,
            borderRight: "1px solid " + Theme.palette.divider
        },
        ".iscCascader .ant-cascader-menus .ant-cascader-menu,.iscCascader .ant-cascader-menu-item-expand:after": {
            color: Theme.palette.text.primary
        },
        ".iscCascader .ant-cascader-menu-item-active:not(.ant-cascader-menu-item-disabled), .iscCascader .ant-cascader-menu-item-active:not(.ant-cascader-menu-item-disabled):hover": {
            backgroundColor: Theme.palette.action.selected
        },
        ".iscCascader .ant-cascader-menu-item:hover": {
            backgroundColor: Theme.palette.action.hover
        }
    }
});

const Cascaders = props => {
    const { label, disabled, id } = props;
    return (
        <div id={id || "iscDatePicker"} className="iscCascader">
            {label && (
                <FormHelperText className={classnames("iscCascader-textlabel", { "iscCascader-disabled": disabled })}>
                    {label}
                </FormHelperText>
            )}
            <Cascader {...props} getPopupContainer={() => document.getElementById(id || "iscDatePicker")} />
        </div>
    );
};

export default withStyles(styles)(Cascaders);
