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
import { Typography, AppBar, Toolbar } from "@material-ui/core";
import { Action } from "./index";
import { withStyles } from "@material-ui/core/styles";
const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        // paddingTop: theme.spacing.unit * 2,
        // paddingBottom: theme.spacing.unit * 2,
        padding: "0px!important",
        display: "flex",
        marginLeft: "auto"
    },
    title: {
        marginRight: "auto"
    },
    headerRoot: {
        padding: "4px 0px!important",
        background: theme.palette.background.paper
    },
    headIcon: {
        marginLeft: "auto",
        display: "-ms-flexbox"
    },
    font: {
        fontSize: "1.5rem",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        color: theme.palette.text.main
    }
});

const Header = ({ title, classes, icons = [], Middle=null, children, minwidth= 350, ...other }) => {
    return (
        <div className={classes.root}>
            <AppBar position="static" color="primary" classes={{ root: classes.headerRoot }} {...other}>
                <Toolbar>
                    <Typography variant="h6" title={title} className={classes.font} style={{minWidth:!!Middle ? minwidth: "auto"}} >
                        {title}
                    </Typography>
                    {!!Middle && <Middle/> }
                    <div style={{ minWidth:minwidth, marginLeft: !!Middle ? 0 : "auto" }}>
                        <Action classes={classes} icons={icons} />
                    </div>
                    <div>{children}</div>
                </Toolbar>
            </AppBar>
        </div>
    );
};
Header.prototype = {
    classes: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired
};
export default withStyles(styles)(Header);
