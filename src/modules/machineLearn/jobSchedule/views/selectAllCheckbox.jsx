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
 * Created by HuLin on 03/08/2018.
 */

import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
//import Theme from "commons/components/theme";
import DeleteIcon from "@material-ui/icons/Delete";
import { connect } from "react-redux";
import { setMachineDelete, setOpenDialog } from "../funcs/actions";
import { REDUCER_NAME } from "../funcs/constants";
import DeleteDialog from "./deleteDialog";

const styles = theme => ({
    highlight: {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark
    },
    spacer: {
        flex: "1 1 100%"
    },
    actions: {
        display: "flex",
        color: theme.palette.text.primary
    },
    title: {
        flex: "0 0 auto"
    }
});

class SelectAllCheckbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: this.props.selected
        };
    }

    handleDelete = () => {
        this.props.onSetOpenDialog(true);
    };

    handleClearSelect = () => {
        this.props.handleClearSelect();
    };

    handleClearData = () => {
        this.props.handleClearData();
    };

    render() {
        const { classes, numSelected, ...other } = this.props;
        const { selected } = this.state;
        return (
            <Toolbar
                className={classNames(classes.root, {
                    [classes.highlight]: numSelected > 0
                })}
            >
                {numSelected > 0 ? (
                    <div className={classes.title}>
                        <Typography color="textPrimary" variant="subtitle2">
                            {numSelected} selected
                        </Typography>
                    </div>
                ) : null}

                <div className={classes.spacer} />

                <div className={classes.actions}>
                    {numSelected > 0 ? (
                        <Tooltip title="Delete">
                            <IconButton aria-label="Delete" onClick={this.handleDelete}>
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    ) : null}
                </div>
                <DeleteDialog
                    {...other}
                    handleClearSelect={this.handleClearSelect}
                    handleClearData={this.handleClearData}
                    selected={selected}
                />
            </Toolbar>
        );
    }
}

SelectAllCheckbox.propTypes = {
    classes: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
    if (state[REDUCER_NAME]) {
        return {
            isOpenDialog: state[REDUCER_NAME].machineLearn.isOpenDialog
        };
    }
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onSetMachineDelete: taskId => {
            dispatch(setMachineDelete(taskId, props.identify));
        },
        onSetOpenDialog: open => {
            dispatch(setOpenDialog(open, props.identify));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(SelectAllCheckbox));
