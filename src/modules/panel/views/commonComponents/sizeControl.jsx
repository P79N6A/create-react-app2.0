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
 * Created by DengXiaolong on 28/05/2018.
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import { connect } from "react-redux";
import { Select, InputLabel } from "modules/common";
import {
    panelTitleSizeControl,
    panelIconSizeControl,
    panelCountSizeControl,
    panelParameterOneSizeControl,
    panelParameterTwoSizeControl
} from "./../../funcs/actions";

class SizeControl extends Component {
    static defaultProps = {
        defaultValue: ""
    };
    static propType = {
        defaultValue: PropTypes.string,
        label: PropTypes.string.isRequired
    };
    state = {
        currentValue: this.props.defaultValue,
        selctOptions: ["M", "L", "XL", "XXL", "XXXL"]
    };
    handleChange = e => {
        const { value } = e.target;
        const { dispatch, identify, changeSizeTarget } = this.props;
        this.setState({ name: value, currentValue: value });
        switch (changeSizeTarget){
            case "countSize":
                dispatch(panelCountSizeControl(value, identify));
                break;
            case "titleSize":
                dispatch(panelTitleSizeControl(value, identify));
                break;
            case "iconSize":
                dispatch(panelIconSizeControl(value, identify));
                break;
            case "parameterOne":
                dispatch(panelParameterOneSizeControl(value, identify));
                break;
            case "parameterTwo":
                dispatch(panelParameterTwoSizeControl(value, identify));
                break;
            default:
                break;
        }
    };
    render() {
        const { identify, label } = this.props;
        const { selctOptions, currentValue } = this.state;
        return (
            <div className="panel_set_mode">
                <FormControl className="panel_select_wrap">
                    <InputLabel htmlFor={`panel_select${identify}`}>{label}</InputLabel>
                    <Select
                        value={currentValue}
                        inputProps={{
                            name: "age",
                            id: `panel_select${identify}`,
                        }}
                        onChange={this.handleChange}
                    >
                        {selctOptions.map(item => (
                            <MenuItem key={item} value={item}>{item}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
        );
    }
}

export default connect()(SizeControl);
