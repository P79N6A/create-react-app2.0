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
import { Switch, FormControlLabel } from "@material-ui/core";
// import { withStyles } from "@material-ui/core";

// const styles = theme => ({});

class SwitchEditor extends Component {
    state = {
        value: !!this.props.schema.value,
        reg: new RegExp(this.props.schema.valueregex || "\\w\\W"),
        disabled: !~this.props.schema.operations.indexOf("w"),
        required: this.props.schema.mandatory ? "*" : ""
    };
    componentDidMount() {
        const { name, datatype } = this.props.schema;
        let { value } = this.state;
        if (datatype && datatype === "string") {
            value = String(value);
        } else if (datatype && datatype === "number") {
            value = +value;
        }
        this.props._updatevalue(value, name);
    }
    componentWillReceiveProps(nextProps) {
        const { schema } = nextProps;
        let { value } = schema;
        const { schema: propsSchema } = this.props;
        const { value: propsValue, datatype } = propsSchema;
        if (value !== propsValue) {
            if (datatype && datatype === "string") {
                value = value === "false" ? false : true;
            } else if (datatype && datatype === "number") {
                value = !!value;
            }
            this.setState({
                value
            });
        }
    }
    onChange = name => event => {
        let value = event.target.checked;
        const { name, datatype } = this.props.schema;
        this.setState(
            {
                value: !!value
            },
            () => {
                if (datatype && datatype === "string") {
                    value = String(value);
                } else if (datatype && datatype === "number") {
                    value = +value;
                }
                this.props._updatevalue(value, name);
            }
        );
    };
    shouldComponentUpdate(nextProps, nextState) {
        if (nextState.value === this.state.value) return false;
        return true;
    }
    render() {
        const { value, disabled, required } = this.state;
        // const { margin = "" } = this.props;
        const { displayname, name } = this.props.schema;
        return (
            <FormControlLabel
                control={<Switch disabled={disabled} checked={!!value} onChange={this.onChange(name)} value={name} />}
                label={displayname + required}
            />
        );
    }
}

export default SwitchEditor;
