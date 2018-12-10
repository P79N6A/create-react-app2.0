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
 * Created by ChenLing on 29/08/2018.
 */

import React from "react";
// import PropTypes from "prop-types";
import { DatePicker } from "antd";
import { withStyles } from "@material-ui/core/styles";
import FormHelperText from "@material-ui/core/FormHelperText";
import classnames from "classnames";

const { RangePicker } = DatePicker;
// const rangePickerId = sessionStorage["rangePickerId"];
let rangePickerId = "";

const styles = Theme => ({
    
    "@global": {
        rangePickerId: rangePickerId,
        "#@{rangePickerId} .ant-input": {
            color: Theme.palette.action.active,
            fontSize: "1rem",
            fontFamily: "Roboto, Helvetica, Arial, sans-serif",
            lineHeight: "1.1875em",
            background: "none",
            border: "none",
            borderRadius: 0,
            with: "100%",
            borderBottom: "1px solid " + Theme.typography.caption.color
        },
        "#@{rangePickerId} .ant-calendar-range-picker-separator": {
            color: Theme.palette.action.active,
            fontSize: "1rem",
            fontFamily: "Roboto, Helvetica, Arial, sans-serif",
            lineHeight: "1.1875em"
        },
        "#@{rangePickerId} .ant-calendar-picker-container.ant-calendar-picker-container-placement-bottomLeft": {
            top: "0px !important",
        },
        "#@{rangePickerId} .ant-calendar-picker:hover .ant-calendar-picker-input": {
            borderBottom: "2px solid " + Theme.palette.action.active
        },
        "#@{rangePickerId} .ant-calendar-picker:focus .ant-calendar-picker-input": {
            borderBottom: "2px solid " + Theme.palette.secondary.main,
            boxShadow: "none"
        },
        "#@{rangePickerId} .ant-calendar-picker .ant-input-disabled": {
            borderBottom: "1px dotted " + Theme.palette.action.disabled + " !important"
        },
        "#@{rangePickerId} .iscDatePicker-textlabel": {
            marginBottom: "0.2rem",
            marginTop: 0
        },
        "#@{rangePickerId} .iscDatePicker-disabled": {
            color: "rgba(0, 0, 0, 0.38) !important"
        },
        "#@{rangePickerId}:focus-within .iscDatePicker-textlabel": {
            color: Theme.palette.secondary.main
        },
        "#@{rangePickerId}:focus-within .ant-input": {
            backgroundColor: "rgba(0, 0, 0, 0.05)"
        },
        "#@{rangePickerId} .ant-calendar-picker-icon": {
            display: "none"
        },
        "#@{rangePickerId} .ant-calendar-picker-clear": {
            color: Theme.typography.caption.color,
            background: "none"
        },
        "#@{rangePickerId} .ant-calendar": {
            boxShadow: Theme.shadows[8],
            backgroundColor: Theme.palette.background.paper,
            color: Theme.palette.action.active,
            border: "none",
            borderRadius: 0
        },
        "#@{rangePickerId} .ant-calendar-input-wrap .ant-calendar-date-input-wrap .ant-calendar-input": {
            backgroundColor: "transparent",
            color: Theme.palette.action.active
        },
        "#@{rangePickerId} .ant-calendar-body .ant-calendar-table .ant-calendar-date": {
            color: Theme.palette.action.active,
            borderRadius: "50%"
        },
        "#@{rangePickerId} .ant-calendar .ant-calendar-range-middle": {
            color: Theme.palette.action.active,
            borderRadius: "50%"
        },
        "#@{rangePickerId} .ant-calendar-date:hover": {
            background: Theme.palette.secondary.main
        },
        "#@{rangePickerId} .ant-calendar-selected-day .ant-calendar-date": {
            background: Theme.palette.secondary.main
        },
        "#@{rangePickerId} .ant-calendar-disabled-cell .ant-calendar-date": {
            background: "none",
            color: Theme.palette.action.disabled + " !important"
        },
        "#@{rangePickerId} .ant-calendar-range .ant-calendar-in-range-cell:before": {
            background: Theme.palette.secondary.main
        }
    }
});
const RangePickers = props => {
    const { label, disabled, RangePickerId } = props;
    rangePickerId= RangePickerId;
    return (
        <div id={RangePickerId} >
            {label && (
                <FormHelperText
                    className={classnames("iscDatePicker-textlabel", { "iscDatePicker-disabled": disabled })}
                >
                    {label}
                </FormHelperText>
            )}

            <RangePicker {...props} getCalendarContainer={() => document.getElementById(RangePickerId)} />
        </div>
        
    );
};
export default withStyles(styles)(RangePickers);
// export default RangePickers;
