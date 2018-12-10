/*
* =========================================================================
*  Copyright (C)2015 NCS Pte. Ltd. All Rights Reserved
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
 * Created by @Luo Jia alex on 29/05/15.
 */
import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Icon, Paper, Typography } from "@material-ui/core";
// import { theme } from "modules/theme";
import { splitString } from "../funcs/util";

const styles = theme => ({
    fontColor: {
        color: theme.palette.countcolor
    },
    root: {
        height: "48px",
        padding: "0px 25px",
        marginRight: theme.spacing.unit * 2 + "px",
        display: "inline-block",
        // minWidth: "174px",
        textAlign: "center"
    },
    icon: {
        fontSize: "30px",
        marginBottom: "6px",
        color: theme.palette.countcolor
    },
    inlineText: {
        display: "inline-block"
    },
    inlineIcon: {
        display: "inline-block",
        marginRight: "13px"
    },
    littleFont: {
        color: theme.palette.countcolor,
        textAlign: "left"
    },
    bigFont: {
        fontSize: "1.5rem",
        color: theme.palette.countcolor,
        position: "relative",
        bottom: "6px",
        textAlign: "left"
    }
});

function StateCount(props) {
    const { classes } = props;
    return (
        <Paper className={classes.root} elevation={4}>
            <Typography className={classes.inlineIcon}>
                <Icon className={classes.icon}>{props.icon}</Icon>
            </Typography>
            <div className={classes.inlineText}>
                <Typography className={classes.littleFont}>{props.status}</Typography>
                <Typography className={classes.bigFont}>{splitString(props.count)}</Typography>
            </div>
        </Paper>
    );
}

StateCount.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(StateCount);
