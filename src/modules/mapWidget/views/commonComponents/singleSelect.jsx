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
 * Created by Xiaolong on 28/05/2018.
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import { Select } from "modules/common";

export default class PanelSelect extends Component {
    static defaultProps = {
        title: "Select Some",
        selctOptions: [],
        defaultValue: "Default Title",
        disabled: false,
    };
    static propTypes = {
        title: PropTypes.string,
        selctOptions: PropTypes.array,
        defaultValue: PropTypes.string,
        onSelect: PropTypes.func.isRequired,
        disabled: PropTypes.bool,
    };
    state = {
        name: this.props.defaultValue,
        currentValue: this.props.defaultValue,
    };
    handleChange = e => {
        const { value } = e.target;
        this.setState({ name: value, currentValue: value });
        this.props.onSelect(value);
    };
    render() {
        const { selctOptions } = this.props;
        const { name, currentValue } = this.state;
        return (
            <div className="panel_set_mode">
                <FormControl className="select_wrap" style={{width: "100%"}}>
                    <InputLabel htmlFor="panel_select">{currentValue}</InputLabel>
                    <Select
                        value={name}
                        inputProps={{
                            name: "age",
                            id: "panel_select",
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
