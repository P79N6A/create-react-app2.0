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
 * Created by KaiDi on 25/05/2018.
 */

import React from "react";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
// import { theme as themes } from "modules/theme";
import _ from "lodash";
import classNames from "classnames";

const styles = Theme => ({
    underline: {
        "&:before": {
            borderBottom: "1px solid " + Theme.typography.caption.color
        },
        "&:after": {
            borderBottomColor: Theme.palette.secondary.main
        }
    },
    input: {
        color: Theme.palette.text.primary,
        // color: Theme.typography.caption.color,
        // borderBottom: "1px solid " + Theme.typography.caption.color,
        "&:after": {
            borderBottomColor: Theme.palette.secondary.main
        }
    },
    focused: {
        color: Theme.palette.secondary.main + " !important"
    },
    inputMultiline: {
        padding: "3px 0"
    },
    disabled: {
        borderBottom: "none"
    }
});
const deleteList = ["input", "underline", "focused", "inputMultiline", "disabled"];

const TextFields = props => {
    const { classes } = props;
    const cls = _.omit(classes, deleteList);
    const inputClasses = props.InputProps && props.InputProps.classes ? props.InputProps.classes : {};
    const defaultInputProps = {
        maxLength: 128,
        minLength: 0
    };
    const { inputProps } = props;
    let inputData = {};
    if (inputProps) {
        inputData = Object.assign({}, defaultInputProps, inputProps);
    } else {
        inputData = defaultInputProps;
    }
    return (
        <TextField
            {...props}
            classes={cls}
            InputProps={{
                ...props.InputProps,
                classes: {
                    ...inputClasses,
                    underline: classes.underline,
                    input: classes.input,
                    inputMultiline: classNames(classes.inputMultiline, inputClasses.inputMultiline),
                    disabled: classes.disabled
                }
            }}
            InputLabelProps={{
                ...props.InputLabelProps,
                FormLabelClasses: {
                    focused: classes.focused
                }
            }}
            inputProps={inputData}
        />
    );
};

export default withStyles(styles)(TextFields);
