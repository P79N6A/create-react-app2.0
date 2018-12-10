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
import { Select, InputLabel } from "modules/common";
import { withStyles } from "@material-ui/core/styles";

const styles = () => ({
    wrapper: {},
    list_wrapper: {
        height: "206px",
        overflowY: "scroll"
    }
});

class FilterSelect extends Component {
    static defaultProps = {
        label: "Select Some",
        selctOptions: [],
        defaultValue: "Default Title",
        disabled: false
    };
    static propTypes = {
        label: PropTypes.string,
        selctOptions: PropTypes.array,
        defaultValue: PropTypes.string,
        onSelect: PropTypes.func.isRequired,
        disabled: PropTypes.bool
    };
    state = {
        currentValue: this.props.defaultValue
    };
    componentWillReceiveProps(nextProps) {
        const { defaultValue } = nextProps;
        this.setState({
            currentValue: defaultValue
        });
    }
    handleChange = e => {
        const { value } = e.target;
        this.setState({ name: value, currentValue: value });
        this.props.onSelect(value);
    };
    render() {
        const { selctOptions, label } = this.props;
        const { currentValue } = this.state;
        return (
            <FormControl style={{ flex: "1", paddingRight: "15px" }}>
                <InputLabel htmlFor="select">{label}</InputLabel>
                <Select
                    value={currentValue}
                    inputProps={{
                        name: "age",
                        id: "select"
                    }}
                    onChange={this.handleChange}
                    MenuProps={{
                        PaperProps: {
                            style: {
                                maxHeight: 206
                            }
                        }
                    }}
                >
                    {selctOptions.map(item => (
                        <MenuItem key={item} value={item}>
                            {item}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        );
    }
}

export default withStyles(styles)(FilterSelect);
