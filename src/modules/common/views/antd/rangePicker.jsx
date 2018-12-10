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
import { DatePicker } from "antd";
import { withStyles } from "@material-ui/core/styles";
import FormHelperText from "@material-ui/core/FormHelperText";
import classnames from "classnames";

const { RangePicker } = DatePicker;

const styles = Theme => ({
    "@global": {
        ".iscDatePicker .ant-input,.iscDatePicker .ant-calendar-range-picker-separator": {
            color: Theme.palette.text.primary,
            fontSize: "1rem",
            fontFamily: "Roboto, Helvetica, Arial, sans-serif",
            lineHeight: "1.1875em"
        },
        ".iscDatePicker .ant-input": {
            background: "none",
            border: "none",
            borderRadius: 0,
            borderBottom: "1px solid " + Theme.typography.caption.color
        },
        ".iscDatePicker .ant-calendar-picker:hover .ant-calendar-picker-input": {
            borderBottom: "2px solid " + Theme.typography.caption.color
        },
        ".iscDatePicker .ant-calendar-picker:focus .ant-calendar-picker-input": {
            borderBottom: "2px solid " + Theme.palette.secondary.main,
            boxShadow: "none"
        },
        ".iscDatePicker .ant-calendar-picker .ant-input-disabled": {
            borderBottom: "1px dotted " + Theme.palette.text.disabled + " !important"
        },
        ".iscDatePicker .iscDatePicker-textlabel": {
            marginBottom: "0.2rem",
            marginTop: 0
        },
        ".iscDatePicker .iscDatePicker-disabled": {
            color: Theme.palette.text.disabled + " !important"
        },
        ".iscDatePicker:focus-within .iscDatePicker-textlabel": {
            color: Theme.palette.secondary.main
        },
        ".iscDatePicker:focus-within .ant-input": {
            backgroundColor: "rgba(0, 0, 0, 0.05)"
        },
        ".iscDatePicker .ant-calendar-picker-icon": {
            display: "none"
        },
        ".iscDatePicker .ant-calendar-picker-clear": {
            color: Theme.typography.caption.color,
            background: "none"
        },
        ".iscDatePicker .ant-calendar": {
            boxShadow: Theme.shadows[8],
            backgroundColor: Theme.palette.background.paper,
            color: Theme.palette.action.active,
            border: "none",
            borderRadius: 0
        },
        ".iscDatePicker .ant-calendar-input-wrap .ant-calendar-date-input-wrap .ant-calendar-input": {
            backgroundColor: "transparent",
            color: Theme.palette.text.primary
        },
        ".iscDatePicker .ant-calendar-body .ant-calendar-table .ant-calendar-cell:not(.ant-calendar-disabled-cell) .ant-calendar-date,.iscDatePicker .ant-calendar .ant-calendar-range-middle": {
            color: Theme.palette.text.primary,
            borderRadius: "50%"
        },
        ".iscDatePicker .ant-calendar-last-month-cell .ant-calendar-date, .iscDatePicker .ant-calendar-next-month-btn-day .ant-calendar-date,.iscDatePicker .ant-calendar-disabled-cell .ant-calendar-date": {
            color: Theme.palette.text.disabled + " !important"
        },
        ".iscDatePicker .ant-calendar-date:hover,.iscDatePicker .ant-calendar-selected-day .ant-calendar-date,.iscDatePicker .ant-calendar-range .ant-calendar-in-range-cell:before": {
            background: Theme.palette.secondary.main
        },
        ".iscDatePicker .ant-calendar-disabled-cell .ant-calendar-date:hover,.iscDatePicker .ant-calendar-disabled-cell .ant-calendar-date": {
            background: Theme.palette.text.disabled
        },
        ".iscDatePicker .ant-calendar-today .ant-calendar-date": {
            border: "1px solid #bcbcbc"
        },
        ".iscDatePicker .ant-calendar-disabled-cell.ant-calendar-today .ant-calendar-date:before": {
            border: "none"
        },
        ".iscDatePicker .ant-calendar-range.ant-calendar-time .ant-calendar-time-picker-combobox":{
            backgroundColor: Theme.palette.background.paper,
        },
        ".iscDatePicker .ant-calendar-range.ant-calendar-time .ant-calendar-time-picker-combobox .ant-calendar-time-picker-select li:hover":{
            background: Theme.palette.secondary.main            
        },
        ".iscDatePicker .ant-calendar-range.ant-calendar-time .ant-calendar-time-picker-combobox .ant-calendar-time-picker-select li.ant-calendar-time-picker-select-option-selected":{
            background: Theme.palette.secondary.main
        }
    }
});

const RangePickers = props => {
    const { label, disabled, id } = props;
    return (
        <div id={id || "iscDatePicker"} className="iscDatePicker">
            {label && (
                <FormHelperText
                    className={classnames("iscDatePicker-textlabel", { "iscDatePicker-disabled": disabled })}
                >
                    {label}
                </FormHelperText>
            )}
            <RangePicker {...props} getCalendarContainer={() => document.getElementById(id || "iscDatePicker")} />
        </div>
    );
};

export default withStyles(styles)(RangePickers);
