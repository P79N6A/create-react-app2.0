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
 * Created by Deng Xiaolong on 28/05/2018.
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import { withStyles } from "@material-ui/core/styles";
import { Select, InputLabel } from "modules/common";

const styles = theme => {
    return {
        select_wrap: {
            width: "100%",
            margin: "10px 0"
        }
    };
};

class SingleSelect extends Component {
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
        currentValue: this.props.defaultValue,
    };
    handleChange = e => {
        const { value } = e.target;
        this.setState({ name: value, currentValue: value });
        this.props.onSelect(value);
    };
    render() {
        const { selctOptions, title, defaultValue, classes } = this.props;
        return (
            <FormControl className={classes.select_wrap}>
                <InputLabel htmlFor="panel_select">{title}</InputLabel>
                <Select
                    value={defaultValue}
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
        );
    }
}

export default withStyles(styles)(SingleSelect);
