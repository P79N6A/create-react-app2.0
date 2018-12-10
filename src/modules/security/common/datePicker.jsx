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
import React from "react";
import PropTypes from "prop-types";
// import { theme as themes } from "modules/theme";
import moment from "moment";
import { withStyles } from "@material-ui/core/styles";
import classnames from "classnames";
import "./style/datePicker.less";
import { RangePicker, DatePickers } from "./index";

// const { RangePicker } = DatePicker;

const styles = themes => ({
    datePickerWrapper: {
        position: "relative",
        margin: "4px 0px 8px!important"
    },
    label: {
        color: themes.palette.secondary.main + "!important"
    },
    input: {
        "&:hover": {
            borderBottom: "0px"
        },
        borderBottom: "2px solid " + themes.palette.secondary.main + "!important"
    },
    dateLabel: {
        color: themes.palette.text.secondary,
        fontSize: "0.75rem",
        "&:focus": {
            color: themes.palette.secondary.main
        }
    },
    inputOrigi: {
        "&:hover": {
            borderColor: themes.palette.text.primary
        },
        borderBottom: "1px solid " + themes.palette.text.primary
    },
    datePicker: {
        width: "100%",
        position: "relative",
        top: "-7px",
        padding: "0",
        "& input": {
            border: "0px!important",
            outline: "none",
            padding: "0",
            background: "none",
            color: themes.palette.text.primary
        }
    }
});

/**
 * Call server API based on HTTP DELETE
 * @example
 *  range(start, end)
 *
 * @param {number} start
 * @param {number} end
 * @returns array
 */

// function range(start, end) {
//     const result = [];
//     for (let i = start; i < end; i++) {
//         result.push(i);
//     }
//     return result;
// }

// function disabledDate(current) {
//     // Can not select days before today and today
//     return current && current < moment().endOf("day");
// }

// function disabledRangeTime(_, type) {
//     if (type === "start") {
//         return {
//             disabledHours: () => range(0, 60).splice(4, 20),
//             disabledMinutes: () => range(30, 60),
//             disabledSeconds: () => [55, 56]
//         };
//     }
//     return {
//         disabledHours: () => range(0, 60).splice(20, 4),
//         disabledMinutes: () => range(0, 31),
//         disabledSeconds: () => [55, 56]
//     };
// }

/**
 * Date component user for simple-json-schema, you can control disabled and date or date range
 * @example
 *
 *
 * @param {func} onChange
 * @param {string} label
 * @param {string|array} defaultDate
 * @param {boolean} dateRange
 * @param {boolean} disabled
 * @returns Component
 */
class Date extends React.Component {
    static defaultProps = {
        dateFormat: "YYYY/MM/DD",
        type: "date"
    };
    state = {
        isOpen: false,
        value: this.props.defaultDate
    };
    onOpenChange = status => {
        this.setState({
            isOpen: status
        });
    };
    onChange = name => (date, dateString) => {
        this.setState({
            value: dateString
        });
        this.props.onChange(name, dateString);
    };
    render() {
        const {
            classes,
            onChange,
            dateFormat,
            label,
            defaultDate,
            dateRange,
            name,
            disabled,
            ...otherProps
        } = this.props;
        const { isOpen } = this.state;
        return (
            <div className={classes.datePickerWrapper}>
                {!dateRange ? (
                    <React.Fragment>
                        <label className={classnames(classes.dateLabel, isOpen ? classes.label : "")}>{label}</label>
                        <DatePickers
                            allowClear={false}
                            defaultValue={moment(defaultDate, dateFormat)}
                            value={moment(defaultDate, dateFormat)}
                            format={dateFormat}
                            onChange={this.onChange(name)}
                            showToday
                            className={classnames(classes.datePicker, isOpen ? classes.input : classes.inputOrigi)}
                            onOpenChange={this.onOpenChange}
                            {...otherProps}
                        />
                        {/* <DatePicker
                            allowClear={false}
                            defaultValue={moment(defaultDate, dateFormat)}
                            value={moment(defaultDate, dateFormat)}
                            format={dateFormat}
                            onChange={onChange}
                            showToday
                            className={classnames(classes.datePicker, isOpen ? classes.input : classes.inputOrigi)}
                            onOpenChange={this.onOpenChange}
                            {...this.props}
                        /> */}
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <label className={classnames(classes.dateLabel, isOpen ? classes.label : "")}>{label}</label>
                        <RangePicker
                            allowClear={false}
                            disabled={disabled}
                            // disabledDate={disabledDate}
                            // disabledTime={disabledRangeTime}
                            onChange={this.onChange(name)}
                            onOpenChange={this.onOpenChange}
                            value={[moment(defaultDate[0], dateFormat), moment(defaultDate[1], dateFormat)]}
                            // defaultValue={[moment(defaultDate[0], dateFormat), moment(defaultDate[1], dateFormat)]}
                            // showTime={{
                            //     hideDisabledOptions: true,
                            //     defaultValue: [moment("00:00:00", "HH:mm:ss"), moment("11:59:59", "HH:mm:ss")]
                            // }}
                            format="YYYY-MM-DD"
                        />
                    </React.Fragment>
                )}
            </div>
        );
    }
}

Date.propTypes = {
    classes: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired
    // defaultDate: PropTypes.string.isRequired
};

export default withStyles(styles)(Date);
