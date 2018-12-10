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
import React, { Component } from "react";
import moment from "moment";
import { withStyles } from "@material-ui/core/styles";
// import classnames from "classnames";
import { DatePicker } from "./importForm";
import { getDate } from "./funcs/utils";
const styles = theme => ({
    datePickerWrapper: {
        position: "relative",
        margin: "16px 0px 8px!important"
    },
    label: {
        color: theme.palette.secondary.main + "!important"
    },
    input: {
        "&:hover": {
            borderBottom: "0px"
        },
        borderBottom: "2px solid " + theme.palette.secondary.main + "!important"
    },
    dateLabel: {
        color: theme.palette.text.secondary + "!important",
        fontSize: "0.75rem!important",
        "&:focus": {
            color: theme.palette.secondary.main + "!important"
        }
    },
    inputOrigi: {
        "&:hover": {
            borderColor: theme.palette.text.primary
        },
        borderBottom: "1px solid " + theme.palette.text.primary
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
            color: theme.palette.text.primary
        }
    }
});
const dateFormat = "YYYY/MM/DD";
class DatePickerEditor extends Component {
    state = {
        value: getDate(),
        reg: new RegExp(this.props.schema.valueregex || "\\w\\W"),
        disabled: !~this.props.schema.operations.indexOf("w"),
        required: this.props.schema.mandatory ? "*" : ""
    };
    componentDidMount() {
        const { name } = this.props.schema;
        const { value } = this.state;
        this.props._updatevalue(value, name);
    }
    componentWillReceiveProps(nextProps) {
        const { schema } = nextProps;
        const { value } = schema;
        const { schema: propsSchema } = this.props;
        const { value: propsValue } = propsSchema;
        if (value !== propsValue && value) {
            this.setState({
                value
            });
        }
    }
    // shouldComponentUpdate(nextProps, nextState) {
    //     if (nextState.value === this.state.value) return false;
    //     return true;
    // }
    onChange = name => (date, dateString) => {
        const { name } = this.props.schema;
        this.setState(
            {
                value: dateString
            },
            () => {
                this.props._updatevalue(dateString, name);
            }
        );
    };
    render() {
        let { value, disabled, required } = this.state;
        const { classes, initState = {} } = this.props;
        const { displayname, name, property = {} } = this.props.schema;
        const { disabled: disabledParam = {}, visible = {} } = property;
        const { impactfield, impactvalue } = disabledParam;
        const { impactfield: visiblefield, impactvalue: visiblevalue, impactlogic = true } = visible;
        if (impactfield && initState.hasOwnProperty(impactfield) && initState[impactfield] === impactvalue) {
            disabled = true;
        }
        if (
            visiblefield && initState.hasOwnProperty(visiblefield) && impactlogic
                ? initState[visiblefield] === visiblevalue
                : initState[visiblefield] !== visiblevalue
        ) {
            return null;
        }
        return (
            <div className={classes.datePickerWrapper}>
                <label className={classes.dateLabel}>{displayname + required}</label>
                <DatePicker
                    allowClear={false}
                    disabled={disabled}
                    // defaultValue={moment(value, dateFormat)}
                    value={moment(value, dateFormat)}
                    format={dateFormat}
                    onChange={this.onChange(name)}
                    showToday
                    // className={classnames(classes.datePicker, isOpen ? classes.input : classes.inputOrigi)}
                    // onOpenChange={this.onOpenChange}
                />
            </div>
        );
    }
}

export default withStyles(styles)(DatePickerEditor);
