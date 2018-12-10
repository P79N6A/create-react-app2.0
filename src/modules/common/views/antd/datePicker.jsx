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
 * Created by LuoJia on 17/10/2018.
 */

import React from "react";
// import PropTypes from "prop-types";
import { DatePicker } from "antd";
import { withStyles } from "@material-ui/core/styles";
import FormHelperText from "@material-ui/core/FormHelperText";
import classnames from "classnames";

const styles = Theme => ({
    "@global": {
        ".isDatePicker .ant-input,.isDatePicker .ant-calendar-range-picker-separator": {
            color: Theme.palette.text.primary,
            fontSize: "1rem",
            fontFamily: "Roboto, Helvetica, Arial, sans-serif",
            lineHeight: "1.1875em"
        },
        ".isDatePicker .ant-input": {
            background: "none",
            border: "none",
            borderRadius: 0,
            borderBottom: "1px solid " + Theme.typography.caption.color
        },
        ".isDatePicker .ant-calendar-picker:hover .ant-calendar-picker-input": {
            borderBottom: "2px solid " + Theme.typography.caption.color
        },
        ".isDatePicker .ant-calendar-picker:focus .ant-calendar-picker-input": {
            borderBottom: "2px solid " + Theme.palette.secondary.main,
            boxShadow: "none"
        },
        ".isDatePicker .ant-calendar-picker .ant-input-disabled": {
            borderBottom: "1px dotted " + Theme.palette.text.disabled + " !important"
        },
        ".isDatePicker .isDatePicker-textlabel": {
            marginBottom: "0.2rem",
            marginTop: 0
        },
        ".isDatePicker .isDatePicker-disabled": {
            color: Theme.palette.text.disabled + " !important"
        },
        ".isDatePicker:focus-within .isDatePicker-textlabel": {
            color: Theme.palette.secondary.main + "!important"
        },
        ".isDatePicker:focus-within .ant-input": {
            backgroundColor: "rgba(0, 0, 0, 0.05)"
        },
        ".isDatePicker .ant-calendar-picker-icon": {
            display: "none"
        },
        ".isDatePicker .ant-calendar-picker-clear": {
            color: Theme.typography.caption.color,
            background: "none"
        },
        ".isDatePicker .ant-calendar": {
            boxShadow: Theme.shadows[8],
            backgroundColor: Theme.palette.background.paper,
            color: Theme.palette.action.active,
            border: "none",
            borderRadius: 0
        },
        ".isDatePicker .ant-calendar-input-wrap .ant-calendar-date-input-wrap .ant-calendar-input": {
            backgroundColor: "transparent",
            color: Theme.palette.text.primary
        },
        ".isDatePicker .ant-calendar-body .ant-calendar-table .ant-calendar-cell:not(.ant-calendar-disabled-cell) .ant-calendar-date,.isDatePicker .ant-calendar .ant-calendar-range-middle": {
            color: Theme.palette.text.primary,
            borderRadius: "50%"
        },
        ".isDatePicker .ant-calendar-last-month-cell .ant-calendar-date, .isDatePicker .ant-calendar-next-month-btn-day .ant-calendar-date,.isDatePicker .ant-calendar-disabled-cell .ant-calendar-date": {
            // color: Theme.palette.text.disabled + " !important"
        },
        ".isDatePicker .ant-calendar-date:hover,.isDatePicker .ant-calendar-selected-day .ant-calendar-date,.isDatePicker .ant-calendar-range .ant-calendar-in-range-cell:before": {
            background: Theme.palette.secondary.main
        },
        ".isDatePicker .ant-calendar-disabled-cell .ant-calendar-date:hover,.isDatePicker .ant-calendar-disabled-cell .ant-calendar-date": {
            background: Theme.palette.text.disabled
        },
        ".isDatePicker .ant-calendar-today .ant-calendar-date": {
            border: "1px solid #bcbcbc"
        },
        ".isDatePicker .ant-calendar-disabled-cell.ant-calendar-today .ant-calendar-date:before": {
            border: "none"
        },
        ".isDatePicker .ant-calendar-range.ant-calendar-time .ant-calendar-time-picker-combobox": {
            backgroundColor: Theme.palette.background.paper
        },
        ".isDatePicker .ant-calendar-range.ant-calendar-time .ant-calendar-time-picker-combobox .ant-calendar-time-picker-select li:hover": {
            background: Theme.palette.secondary.main
        },
        ".isDatePicker .ant-calendar-range.ant-calendar-time .ant-calendar-time-picker-combobox .ant-calendar-time-picker-select li.ant-calendar-time-picker-select-option-selected": {
            background: Theme.palette.secondary.main
        }
    }
});

const DatePickers = props => {
    const { label, disabled, id } = props;
    return (
        <div id={id || "isDatePicker"} className="isDatePicker">
            {label && (
                <FormHelperText className={classnames("isDatePicker-textlabel", { "isDatePicker-disabled": disabled })}>
                    {label}
                </FormHelperText>
            )}
            <DatePicker {...props} getCalendarContainer={() => document.getElementById(id || "isDatePicker")} />
        </div>
    );
};

export default withStyles(styles)(DatePickers);
