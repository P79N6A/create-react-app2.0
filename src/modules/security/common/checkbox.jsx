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
/**
 * this is a Radio component
 * @example
 *
 *
 * @param {string} name
 * @param {boolean} checked
 * @param {func} handleChange
 * @param {string} label
 * @param {string} margin
 * @param {boolean} disabled
 * @returns Component
 */
import React from "react";
import { FormControlLabel, Checkbox } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
    normal: {
        padding: "0px",
        marginTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 1
    },
    dense: {
        padding: "0px",
        marginTop: theme.spacing.unit * 1,
        marginBottom: theme.spacing.unit * 0.5
    }
});

class CheckBoxs extends React.Component {
    state = {
        checked: this.props.checked
    };
    componentWillReceiveProps(nextProps) {
        const { checked } = nextProps;
        if (checked === this.props.checked) return;
        this.setState({
            checked: checked
        });
    }
    handleChange = name => e => {
        let checked = e.target.checked;
        this.setState({
            checked
        });
        this.props.handleChange(name, checked);
    };
    render() {
        const { checked = false } = this.state;
        const { name, label, classes, margin, disabled } = this.props;
        return (
            <FormControlLabel
                className={margin === "dense" ? classes.dense : classes.normal}
                control={
                    <Checkbox
                        color="secondary"
                        checked={!!checked}
                        onChange={this.handleChange(name)}
                        disabled={disabled}
                        value=""
                        // {...this.props}
                    />
                }
                label={label}
            />
        );
    }
}

// const CheckBoxs = ({ name, checked = false, handleChange, label, classes, margin, disabled }) => {
//     return (

//     );
// };

export default withStyles(styles)(CheckBoxs);
