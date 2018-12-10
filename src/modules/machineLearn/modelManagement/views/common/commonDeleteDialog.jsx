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
import DialogContentText from "@material-ui/core/DialogContentText";

import Slide from "@material-ui/core/Slide";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { REDUCER_NAME } from "../../funcs/constants";
import { setDeleteDialog, setDeleteModel } from "../../funcs/actions";
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

class CommonDeleteDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleClose = () => {
        this.props.handleClearSelect();
        this.props.onSetDeleteDialog(false);
    };

    handleComfirm = () => {
        const { selected, identify } = this.props;

        if (identify === "model") {
            //delete job schedule
            this.props.onSetDeleteModel(selected);
        }

        this.props.handleClearData();
        this.props.onSetDeleteDialog(false);
    };

    render() {
        const { classes, identify } = this.props;
        return (
            <div>
                <Dialog
                    open={this.props.isDeleteDialog}
                    TransitionComponent={Transition}
                    disableBackdropClick
                    keepMounted
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                    PaperProps={{
                        style: {
                            maxWidth: maxWidth,
                            minWidth: minWidth
                        }
                    }}
                >
                    <DialogTitle id="alert-dialog-slide-title">
                        {identify === "model" ? "Delete Model" : "Delete"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            Are you sure you want to delete? Do you wish to proceed ?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions className={classes.buttonAction}>
                        <Button onClick={this.handleClose}>Cancel</Button>
                        <Button onClick={this.handleComfirm} color="secondary" variant="contained">
                            Comfirm
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

CommonDeleteDialog.defaultProps = {
    isDeleteDialog: false
};

const mapStateToProps = (state, ownProps) => {
    if (state[REDUCER_NAME]) {
        return {
            isDeleteDialog: state[REDUCER_NAME].isDeleteDialog
        };
    }
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onSetDeleteDialog: open => {
            dispatch(setDeleteDialog(open, props.identify));
        },
        onSetDeleteModel: modelId => {
            dispatch(setDeleteModel(modelId, props.identify));
        }
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(CommonDeleteDialog));
