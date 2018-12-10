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
import { FormControl, MenuItem, FormHelperText } from "@material-ui/core";
import { InputLabel, Select } from "modules/common/index";
// import { theme } from "modules/theme";
import classnames from "classnames";
import { withStyles } from "@material-ui/core/styles";
const styles = theme => ({
    root: {
        display: "flex",
        flexWrap: "wrap"
    },
    formControl: {
        width: "100%"
    },
    normal: {
        marginTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 1
    },
    dense: {
        marginTop: theme.spacing.unit * 1,
        marginBottom: theme.spacing.unit * 0.5
    },
    none: {
        margin: "0"
    },
    chips: {
        display: "flex",
        flexWrap: "wrap"
    },
    chip: {
        margin: theme.spacing.unit / 4
    }
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250
        }
    }
};

/**
 * Select component
 * @example
 *
 *
 * @param {string} name
 * @param {string} value
 * @param {func} handleChange
 * @param {string} label
 * @param {array} items
 * @param {string} margin
 * @param {boolean} disabled
 * @param {object} error
 * @param {boolean} required
 * @returns Component
 */
const Selects = ({
    formControl,
    name,
    classes,
    value,
    handleChange,
    label,
    items = [],
    margin,
    disabled = false,
    error = {
        status: true
    },
    required = false
}) => {
    items = items.map(item => {
        if (typeof item === "string") {
            return {
                label: item,
                value: item
            };
        }
        return item;
    });
    return (
        <FormControl
            error={!error.status}
            disabled={disabled || false}
            className={classnames(
                formControl || classes.formControl,
                margin === "none" ? classes.none : margin === "dense" ? classes.dense : classes.normal
            )}
        >
            {margin !== "none" && (
                <InputLabel required={required} htmlFor="age-simple">
                    {label}
                </InputLabel>
            )}
            <Select value={value} onChange={handleChange(name)} MenuProps={MenuProps}>
                {items.map((item, i) => {
                    return (
                        <MenuItem key={i} title={item.label} value={item.value}>
                            {item.label}
                        </MenuItem>
                    );
                })}
            </Select>
            {(!error.status || margin !== "none") && <FormHelperText>{error.msg}</FormHelperText>}
        </FormControl>
    );
};

export default withStyles(styles)(Selects);
