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
import { Switch, ListItem, ListItemText } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
    listItem: {
        padding: "0px"
    },
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

const Radio = ({ name, checked, handleChange, label, classes, margin, disabled }) => {
    return (
        <ListItem
            classes={{ root: margin === "dense" ? classes.dense : classes.normal }}
            button
            onClick={disabled ? () => {} : handleChange(name)}
        >
            <ListItemText primary={label} />
            <Switch
                disabled={disabled}
                checked={!!checked}
                color="secondary"
                onChange={handleChange(name)}
                value="2002"
                name={name}
            />
        </ListItem>
    );
};

export default withStyles(styles)(Radio);
