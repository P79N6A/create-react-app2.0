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
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Icon } from "@material-ui/core";
// import { theme as themes } from "modules/theme";
import { withStyles } from "@material-ui/core/styles";
const styles = theme => ({
    icon: {
        right: 8
    },
    text: {
        paddingLeft: 0
    },
    formtitle: {
        "& spam": {
            fontSize: "0.8rem!important",
            color: theme.palette.text.primary + "!important"
        }
    }
});
const Lists = ({
    dense = false,
    className = "",
    classes,
    icon,
    clickListItemHandle,
    title = "",
    subtitle = "",
    formtitle = false
}) => (
    <List dense={dense} className={className}>
        <ListItem className={classes.text}>
            <ListItemText primary={title} className={formtitle ? classes.formtitle : null} secondary={subtitle} />
            <ListItemSecondaryAction className={classes.icon}>
                {!!icon && (
                    <IconButton aria-label="icon" onClick={clickListItemHandle}>
                        <Icon>{icon}</Icon>
                    </IconButton>
                )}
            </ListItemSecondaryAction>
        </ListItem>
    </List>
);
Lists.defaultProps = {
    clickListItemHandle: () => {}
};
Lists.propTypes = {
    classes: PropTypes.object
};
export default withStyles(styles)(Lists);
