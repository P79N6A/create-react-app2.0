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
import { FormControl, Input, MenuItem, Checkbox, ListItemText, FormHelperText } from "@material-ui/core";
import { InputLabel, Select } from "modules/common/index";
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
 * Select muiltple component
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
const Selects = ({ name, classes, value, handleChange, label, items = [], margin, disabled, error, required }) => {
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
            disabled={disabled || false}
            className={classnames(classes.formControl, margin === "dense" ? classes.dense : classes.normal)}
            error={!error.status}
        >
            <InputLabel required={required} htmlFor="select-multiple">
                {label}
            </InputLabel>
            <Select
                multiple
                value={value}
                onChange={handleChange(name)}
                input={<Input id="select-multiple-checkbox" />}
                renderValue={selected =>
                    items
                        .filter(n => ~selected.indexOf(n.value))
                        .map(m => m.label)
                        .join(", ")
                }
                MenuProps={MenuProps}
            >
                {items.map((item, i) => (
                    <MenuItem key={i} value={item.value}>
                        <Checkbox checked={value.indexOf(item.value) > -1} />
                        <ListItemText primary={item.label} />
                    </MenuItem>
                ))}
            </Select>
            {!error.status && <FormHelperText>{error.msg}</FormHelperText>}
        </FormControl>
    );
};

export default withStyles(styles)(Selects);
