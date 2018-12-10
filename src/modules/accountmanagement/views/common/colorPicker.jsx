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
import { List, ListItem, ListItemText, ListItemSecondaryAction } from "@material-ui/core";
import { ColorPicker } from "../../common/index";
import { withStyles } from "@material-ui/core/styles";
const styles = theme => ({
    icon: {
        right: 8
    },
    text: {
        paddingLeft: 0
    }
});
const ColorPickers = ({
    dense = false,
    className = "",
    classes,
    icon,
    clickListItemHandle,
    title = "",
    subtitle = "",
    initColor = null,
    pickColor
}) => (
    <List dense={dense} className={className}>
        <ListItem className={classes.text}>
            <ListItemText primary={title} secondary={subtitle} />
            <ListItemSecondaryAction className={classes.icon}>
                <ColorPicker initColor={initColor || "red"} onSelect={pickColor} />
            </ListItemSecondaryAction>
        </ListItem>
    </List>
);
ColorPickers.defaultProps = {};
ColorPickers.propTypes = {
    classes: PropTypes.object
};
export default withStyles(styles)(ColorPickers);
