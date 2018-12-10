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
import React from "react";
import PropTypes from "prop-types";
import { TextField } from "modules/common";
import { withStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
// import { theme } from "modules/theme";
const styles = theme => ({
    paddingRight: theme.spacing.unit * 2
});

/**
 * TextInput component
 * @example
 *
 *
 * @param {string} label
 * @param {string} type
 * @param {string} value
 * @param {func} onChange
 * @param {string} margin
 * @param {boolean} disabled
 * @param {string} name
 * @param {boolean} error
 * @param {boolean} required
 * @returns Component
 */
class TextInput extends React.Component {
    // shouldComponentUpdate(nextProps) {
    //     if (nextProps.value === this.props.value) return false;
    //     return true;
    // }
    state = {
        code: "",
        number: "",
        status: false
    };
    codeOnChange = (name, status) => e => {
        let value = e.target.value;
        const { code } = this.state;
        this.setState({
            code: value
        });
        this.props.onChange(name, code + value, status)(e);
    };
    numberOnChange = (name, status) => e => {
        let value = e.target.value;
        const { number } = this.state;
        this.setState({
            code: value
        });
        this.props.onChange(name, value + number, status)(e);
    };
    render() {
        const { label, type, value, codeValue, classes,  margin, disabled, name, required } = this.props;
        const { error } = this.props;
        // const { status } = this.state;
        return (
            <Grid container spacing={24}>
                <Grid item xs={8} sm={4} className={classes.paddingRight}>
                    <TextField
                        required={!!required}
                        label={label}
                        InputLabelProps={{
                            shrink: true
                        }}
                        type={type}
                        className={classes.textField}
                        value={codeValue || ""}
                        margin={margin ? margin : "normal"}
                        // helperText={error.msg}
                        {...this.props}
                        // error={!error.status}
                        onChange={this.codeOnChange(name, error.status)}
                        disabled={disabled}
                    />
                </Grid>
                <Grid item xs={16} sm={8}>
                    <TextField
                        required={!!required}
                        label={""}
                        InputLabelProps={{
                            shrink: false
                        }}
                        type={type}
                        className={classes.textField}
                        value={value || ""}
                        margin={margin ? margin : "normal"}
                        // helperText={error.msg}
                        {...this.props}
                        // error={!error.status}
                        onChange={this.numberOnChange(name, error.status)}
                        disabled={disabled}
                    />
                </Grid>
            </Grid>
        );
    }
}
TextInput.propTypes = {
    classes: PropTypes.object.isRequired
};
TextInput.defaultProps = {};
export default withStyles(styles)(TextInput);
