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
import { RangePicker } from "./importForm";
import { getDate } from "./funcs/utils";
const styles = theme => ({
    datePickerWrapper: {
        position: "relative",
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit * 2
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
        color: theme.palette.text.secondary,
        fontSize: "0.75rem",
        "&:focus": {
            color: theme.palette.secondary.main
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
        value: this.props.initState[this.props.schema.name] || [getDate(), getDate()],
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
    // shouldComponentUpdate(nextProps, nextState) {
    //     if (nextState.value.join(",") === this.state.value.join(",")) return false;
    //     return true;
    // }
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
                <RangePicker
                    allowClear={false}
                    disabled={disabled}
                    onChange={this.onChange(name)}
                    onOpenChange={this.onOpenChange}
                    value={[moment(value[0], dateFormat), moment(value[1], dateFormat)]}
                    format="YYYY-MM-DD"
                />
            </div>
        );
    }
}

export default withStyles(styles)(DatePickerEditor);
