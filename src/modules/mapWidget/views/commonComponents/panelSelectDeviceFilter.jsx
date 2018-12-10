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
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import { Select } from "modules/common"; 

export default class PanelSelectDeviceFilter extends Component {
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
        name: []
    };
    handleChange = event => {
        const { value } = event.target;
        this.setState({ name: event.target.value });
        console.log(value);
        let data = [];
        value.forEach(item => {
            data.push(item);
        });
        this.props.onSelect(data); 
    };
    render() {
        const { title, selctOptions } = this.props;
        return (
            <div
                className="panel_set_mode"
                style={{marginTop: "10px"}}
                ref={(node) => this.container = node}
            >
                <div className="title">{title}</div>
                <FormControl className="select_wrap">
                    <InputLabel htmlFor="select_multiplea">{title}</InputLabel>
                    <Select
                        multiple
                        value={this.state.name}
                        onChange={this.handleChange}
                        input={<Input id="select_multiplea" />}
                    >
                        {selctOptions.map(name => (
                            <MenuItem
                                key={name.resource}
                                value={name.resource}
                            >
                                {name.resource}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
        );
    }
}
