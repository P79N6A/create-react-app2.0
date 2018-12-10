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
import { FormControl, Input, InputAdornment, IconButton, Icon } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
// import { theme as themes } from "modules/theme";
import classnames from "classnames";
const styles = theme => ({
    underlines: {
        color: theme.palette.text.primary + "!important",
        "&:before": {
            borderBottom: "1px solid "+theme.palette.text.primary 
        },
        "&:after": {
            borderBottom: "2px solid "+theme.palette.text.primary 
        },
        verticalAlign: "middle"
    },
    margin: {
        marginRight: theme.spacing.unit * 2,
        verticalAlign: "middle"
    }
});
const Search = ({ classes, handleChange, keydownHandle, search, searchHandle }) => {
    return (
        // <MuiThemeProvider theme={themes}>
        <FormControl className={classnames(classes.root, classes.margin, classes.textField)}>
            <Input
                // id="adornment-search"
                placeholder="Search"
                value={search}
                onChange={handleChange}
                onKeyDown={keydownHandle}
                className={classes.underlines}
                name="search"
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            // size="small"
                            // style={{ height: "32px", width: "32px" }}
                            onClick={searchHandle}
                            // onMouseDown={this.handleMouseDownPassword}
                        >
                            <Icon>search</Icon>
                        </IconButton>
                    </InputAdornment>
                }
            />
        </FormControl>
        // </MuiThemeProvider>
    );
};

export default withStyles(styles)(Search);
