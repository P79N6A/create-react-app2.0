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
 * Created by xulu on 25/05/2018.
 */
import React from "react";
import "../styles/style.less";
import classNames from "classnames";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import NoteIcon from "@material-ui/icons/Note";

const styles = Theme => ({
    highlight: {
        color: Theme.palette.text.primary,
        backgroundColor: Theme.palette.secondary.dark
    },
    spacer: {
        flex: "1 1 100%"
    },
    actions: {
        display: "flex",
        color: Theme.palette.text.primary
    },
    title: {
        flex: "0 0 auto"
    },
    root: {
        position: "sticky",
        top: 0,
        zIndex: 1
    }
});

class SelectedRowInfo extends React.Component {
    handleDeleteClick() {
        console.log("delete click, do this func later.");
    }

    handleDetailsClick() {
        console.log("details multiple click, do this func later.");
    }

    render() {
        const { classes, selected } = this.props;
        return (
            <Toolbar
                className={classNames(classes.root, {
                    [classes.highlight]: selected.length > 0
                })}
            >
                <div className={classes.title}>
                    {selected.length > 0 ? (
                        <Typography color="inherit" variant="subtitle1">
                            {selected.length} selected
                        </Typography>
                    ) : null}
                </div>
                <div className={classes.spacer} />
                <div className={classes.actions}>
                    {selected.length > 0 ? (
                        <Tooltip title="Details">
                            <IconButton aria-label="Details" onClick={this.handleDetailsClick.bind(this)}>
                                <NoteIcon />
                            </IconButton>
                        </Tooltip>
                    ) : null}
                    {selected.length > 0 ? (
                        <Tooltip title="Delete">
                            <IconButton aria-label="Delete" onClick={this.handleDeleteClick.bind(this)}>
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    ) : null}
                </div>
            </Toolbar>
        );
    }
}

SelectedRowInfo.defaultProps = {};

export default withStyles(styles)(SelectedRowInfo);
