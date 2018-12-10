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
 * Created by chenling on 02/08/2018.
 */
import React from "react";
import PropTypes from "prop-types";
import ColumnsFilter from "./columnsFilter";
import { Paper, Typography, IconButton } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import RefreshIcon from "@material-ui/icons/Refresh";
import { Action } from "./common/index";

// import { theme } from "modules/theme";
import { withStyles } from "@material-ui/core/styles";
// import { MuiThemeProvider } from "@material-ui/core/styles";
const styles = theme => ({
    headPaper: {
        // ...theme.mixins.gutters(),
        height: "72px",
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        display: "flex"
    }
    // action: {
    //     verticalAlign: "middle"
    // }
    // title: {
    //     maxWidth: "120px",
    //     marginRight: "auto",
    //     overFlow: "hidden",
    //     textOverflow: "ellipsis",
        
    // }
});

const Header = ({ subTitle, title, classes, icons = [], columnConfig, listShow, refresh, handleAllClearClick, columnsChanged }) => {
    // console.log(columnConfig);
    return (
        // <MuiThemeProvider theme={theme}>
        <Paper className={classes.headPaper} elevation={1}>
            <Typography variant="h5" className="sopTitle" component="h3">
                {title}
                <span className="subTitle">{subTitle}</span>
            </Typography>
            
            <Action classes={classes} icons={icons} />

            <ColumnsFilter 
                columnConfig = {columnConfig}
                columnsChanged = { columnsChanged }
            />
            <Tooltip title="Refresh">
                <IconButton
                    // color="inherit"
                    // size="small"
                    // style={{ height: "32px", width: "32px", margin: "0 8px" }}
                    onClick={refresh} 
                >
                    <RefreshIcon />
                </IconButton>
            </Tooltip>
            
        </Paper>
        // </MuiThemeProvider>
    );
};
Header.prototype = {
    classes: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired
};
export default withStyles(styles)(Header);


