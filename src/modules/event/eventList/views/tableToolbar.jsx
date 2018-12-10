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
 * Created by SongCheng on 20/05/2018.
 */
import React, { Component } from "react";
import "../styles/style.less";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import NoteIcon from "@material-ui/icons/Note";
import { actions } from "modules/ccms/dataTransmit";
// import { reducerName } from "modules/mapWidget";
import store from "commons/store";

const toolbarStyles = theme => ({
    root: {
        paddingRight: theme.spacing.unit
    },
    highlight: {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark
    },
    spacer: {
        flex: "1 1 100%"
    },
    actions: {
        color: theme.palette.text.secondary
    },
    title: {
        flex: "0 0 auto"
    }
});

class EnhancedTableToolbar extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    handleDetailsClick() {
        // console.log("details multiple click, do this func later... ");
        store.dispatch(actions.transmit("event_location", { message: "BeiJing" }));
        setTimeout(() => {
            store.dispatch(actions.destory("event_location"));
        }, 5000);
    }

    render() {
        const { numSelected, classes } = this.props;
        return (
            <div>
                {numSelected > 0 ? (
                    <Toolbar className={classNames("toolBar", classes.highlight)}>
                        <div className={classes.title}>
                            <Typography color="inherit" variant="subtitle1">
                                {numSelected} selected
                            </Typography>
                        </div>
                        <div className={classes.spacer} />
                        <div className={classes.actions}>
                            <Tooltip title="Details">
                                <IconButton aria-label="Details" onClick={this.handleDetailsClick.bind(this)}>
                                    <NoteIcon />
                                </IconButton>
                            </Tooltip>
                        </div>
                    </Toolbar>
                ) : null}
            </div>
        );
    }
}

export default withStyles(toolbarStyles)(EnhancedTableToolbar);
