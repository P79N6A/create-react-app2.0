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
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import DialogContentText from "@material-ui/core/DialogContentText";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { REDUCER_NAME } from "../funcs/constants";
import { setOpenDialog, setMachineDelete } from "../funcs/actions";

import { Button } from "modules/common";

const maxWidth = 600;
const minWidth = 600;

const styles = theme => ({
    buttonAction: {
        marginRight: theme.spacing.unit * 3
    }
});

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class DeleteDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleClose = () => {
        this.props.handleClearSelect();
        this.props.onSetOpenDialog(false);
    };

    handleDelete = () => {
        const { selected } = this.props;
        //delete job schedule
        this.props.onSetMachineDelete(selected);
        //clear data
        this.props.handleClearData();
        //close dialog
        this.props.onSetOpenDialog(false);
    };

    render() {
        const { classes } = this.props;
        return (
            <Dialog
                open={this.props.isOpenDialog}
                TransitionComponent={Transition}
                disableBackdropClick
                keepMounted
                onClose={this.handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
                PaperProps={{
                    style: {
                        maxWidth: maxWidth,
                        minWidth: minWidth
                    }
                }}
            >
                <DialogTitle id="alert-dialog-slide-title">Delete Job Schedule</DialogTitle>
                <DialogContent style={{ height: "100%" }}>
                    <DialogContentText id="alert-dialog-slide-description">
                        Are you sure you want to delete? Do you wish to proceed ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions className={classes.buttonAction}>
                    <Button onClick={this.handleClose}>Cancel</Button>
                    <Button onClick={this.handleDelete} color="secondary" variant="contained">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    if (state[REDUCER_NAME]) {
        return {
            isOpenDialog: state[REDUCER_NAME].machineLearn.isOpenDialog,
            pagination: state[REDUCER_NAME].machineLearn.pagination
        };
    }
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onSetOpenDialog: open => {
            dispatch(setOpenDialog(open, props.identify));
        },
        onSetMachineDelete: taskId => {
            dispatch(setMachineDelete(taskId, props.identify));
        }
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(DeleteDialog));
