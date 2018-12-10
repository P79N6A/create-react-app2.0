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
import { InputLabel, Select } from "modules/common";
import { FormControl, MenuItem, FormHelperText } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
    "select-container": {
        width: "100%",
        marginTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit
    }
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250
        }
    }
};

class TextAreaEditor extends Component {
    state = {
        value: this.props.schema.value || "",
        reg: new RegExp(this.props.schema.valueregex || "\\w\\W"),
        disabled: !~this.props.schema.operations.indexOf("w")
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
        if (value !== propsValue) {
            this.setState({
                value: value
            });
        }
    }
    onChange = (name, flag) => event => {
        let value = event.target.value;
        const { name, datatype } = this.props.schema;
        if (datatype && datatype === "number") {
            value = parseInt(value, 10);
        }
        this.setState(
            {
                value: String(value)
            },
            () => {
                this.props._updatevalue(value, name);
            }
        );
    };
    shouldComponentUpdate(nextProps, nextState) {
        if (nextState.value === this.state.value) return false;
        return true;
    }
    render() {
        const { value = "", reg, disabled } = this.state;
        const { margin = "" } = this.props;
        const { displayname, mandatory, valueregex, valueerror = "", enum: enums, name } = this.props.schema;
        let flag = true;
        if (valueregex) {
            flag = reg.test(value);
        }
        return (
            <FormControl className="schema-select-container" error={!flag && !!value} disabled={disabled || false}>
                {margin !== "none" && (
                    <InputLabel required={mandatory} htmlFor="select">
                        {displayname}
                    </InputLabel>
                )}
                <Select value={value || ""} onChange={this.onChange(name)} MenuProps={MenuProps}>
                    {enums.map((item, i) => {
                        if (typeof item === "string") {
                            return (
                                <MenuItem key={i} title={item} value={item}>
                                    {item}
                                </MenuItem>
                            );
                        }
                        return (
                            <MenuItem key={i} title={item.label} value={item.value}>
                                {item.label}
                            </MenuItem>
                        );
                    })}
                </Select>
                {!flag && !!value && <FormHelperText>{valueerror}</FormHelperText>}
            </FormControl>
        );
    }
}

export default withStyles(styles)(TextAreaEditor);
