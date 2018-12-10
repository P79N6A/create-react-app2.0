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
import { TextField } from "modules/common";
// import { withStyles } from "@material-ui/core";

// const styles = theme => ({});

class StringEditor extends Component {
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
    onChange = (name, flag) => event => {
        let value = event.target.value;
        const { name, datatype } = this.props.schema;
        if (datatype && datatype === "number") {
            value = parseInt(value, 10);
        }
        this.setState({
            value: String(value)
        });
        this.props._updatevalue(value, name);
    };
    componentWillReceiveProps(nextProps) {
        const { schema } = nextProps;
        const { value } = schema;
        const { schema: propsSchema } = this.props;
        const { value: propsValue } = propsSchema;
        if (value !== propsValue || value !== this.state.value) {
            this.setState({
                value: value || ""
            });
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (nextState.value === this.state.value && this.state.disabled !== nextState.disabled) return false;
        return true;
    }
    render() {
        let { value, reg, disabled } = this.state;
        const { margin = "", initState = {} } = this.props;
        const { displayname, mandatory, valueregex, valueerror = "", name, property = {} } = this.props.schema;
        const { disabled: disabledParam = {}, visible = {}, mandatory: submandatory = false } = property;
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
        let flag = true;
        if (valueregex) {
            flag = reg.test(value);
        }
        return (
            <TextField
                className="schema-textField"
                required={mandatory || submandatory}
                label={displayname}
                InputLabelProps={{
                    shrink: true
                }}
                value={value || ""}
                margin={margin ? margin : "normal"}
                helperText={!flag && !!value ? valueerror : ""}
                // {...this.props}
                error={!flag && !!value}
                onChange={this.onChange(name, !flag)}
                disabled={disabled}
            />
        );
    }
}

export default StringEditor;
