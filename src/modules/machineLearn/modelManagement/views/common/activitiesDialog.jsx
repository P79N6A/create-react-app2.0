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
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { REDUCER_NAME } from "../../funcs/constants";
import { setOpenDialog } from "../../funcs/actions";

import FormControl from "@material-ui/core/FormControl";
import { Input, InputLabel, Button } from "modules/common";
// import FormHelperText from "@material-ui/core/FormHelperText";

// import ListItemText from "@material-ui/core/ListItemText";

const maxWidth = 600;
const minWidth = 600;

const styles = theme => ({
    formControl: {
        margin: theme.spacing.unit,
        //marginBottom: 16,
        width: "100%"
    },
    textError: {
        color: "#f44336"
    },
    buttonAction: {
        marginRight: theme.spacing.unit * 3
    }
});

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class ActivitiesDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sourceSubType: []
        };
    }

    handleClose = () => {
        this.props.onSetOpenDialog(false);
    };

    handleChange = name => event => {
        let value = event.target.value;
        this.setState({
            [name]: value
        });
        let flag = `${name}Flag`;
        let reg = /[\w]{2,50}/;
        if (value && reg.test(value)) {
            this.setState({ [flag]: false });
        } else {
            this.setState({ [flag]: true });
        }
    };

    render() {
        const { classes } = this.props;
        return (
            <div>
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
                    <DialogTitle id="alert-dialog-slide-title">Activities</DialogTitle>
                    <DialogContent style={{ height: "100%" }}>
                        <div
                            style={{
                                width: "100%",
                                height: "100%"
                            }}
                        >
                            <FormControl className={classes.formControl}>
                                <InputLabel>Activities Name</InputLabel>
                                <Input type="text" value="123" />
                            </FormControl>
                        </div>
                    </DialogContent>
                    <DialogActions className={classes.buttonAction}>
                        <Button onClick={this.handleClose}>Cancel</Button>
                        <Button onClick={this.handleClose} color="secondary" variant="contained">
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    if (state[REDUCER_NAME]) {
        return {
            isOpenDialog: state[REDUCER_NAME].isOpenDialog
        };
    }
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onSetOpenDialog: open => {
            dispatch(setOpenDialog(open, props.identify));
        }
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(ActivitiesDialog));
