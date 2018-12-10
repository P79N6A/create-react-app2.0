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
 * Created by Luo Jia on 25/05/2018.
 * Modified by Luo Jia on 25/05/2018.
 */
import React from "react";
import PropTypes from "prop-types";
import { FormControl, IconButton, withStyles, FormHelperText } from "@material-ui/core";
import { InputLabel, InputAdornment, Input } from "modules/common";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import classNames from "classnames";
const styles = theme => ({
    margin: {
        marginTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit,
        width: "100%"
    }
});
class Password extends React.Component {
    state = {
        value: "",
        showPassword: false
    };
    handleClickShowPassword = () => {
        const { showPassword } = this.state;
        this.setState({
            showPassword: !showPassword
        });
    };
    handleChange = name => e => {
        let value = e.target.value;
        this.setState({
            value
        });
        this.props._updatevalue(value, name);
    };
    render() {
        const { classes, schema, error = {} } = this.props;
        const { value } = this.state;
        const { name, displayname, mandatory } = schema;
        const { errorreg = false, errormsg = "" } = error;
        return (
            <FormControl className={classNames(classes.margin, classes.textField)}>
                <InputLabel htmlFor="adornment-password">{`${displayname} ${mandatory?"*":""}`}</InputLabel>
                <Input
                    error={!errorreg && !!value}
                    type={this.state.showPassword ? "text" : "password"}
                    value={this.state.value}
                    onChange={this.handleChange(name)}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton aria-label="Toggle password visibility" onClick={this.handleClickShowPassword}>
                                {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    }
                />
                {!errorreg && !!value && (
                    <FormHelperText error={!errorreg} id="weight-helper-text">
                        {errormsg}
                    </FormHelperText>
                )}
            </FormControl>
        );
    }
}
Password.defaultProps = {};
Password.propTypes = {
    classes: PropTypes.object
};
export default withStyles(styles)(Password);
