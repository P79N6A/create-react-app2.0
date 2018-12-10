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
* Created by Wangrui on 08/06/2018.
 */
import React from "react";
import PropTypes from "prop-types";
import Snackbar from "@material-ui/core/Snackbar";
import SnackBarContent from "./snackbarContent";
import { withStyles } from "@material-ui/core/styles";
import { REDUCER_NAME as reducerName } from "../funcs/constants";
import { connect } from "react-redux";
import { clearSnackbar } from "../funcs/actions";
import _ from "lodash";
const styles = theme => ({
    margin: {
        margin: theme.spacing.unit,
        width: 300,
        height: 150
    }
});

class Snackbars extends React.Component {
    state = {
        open: false
    };
    shouldComponentUpdate(nextProps, nextState) {
        if (_.isEqual(nextProps, this.props)) {
            this.props.onClearSnackbar();
            return false;
        }
        return true;
    }
    componentWillReceiveProps(newProps) {
        this.setState({ open: newProps.open });
    }
    handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        this.setState({ open: false });
    };

    render() {
        if (!this.state.open) {
            return null;
        }
        const { classes, status, message } = this.props;
        return (
            <div>
                <Snackbar
                    anchorOrigin={{
                        vertical: "top",
                        horizontal: "right"
                    }}
                    open={this.state.open}
                    autoHideDuration={5000}
                    onClose={this.handleClose}
                >
                    <SnackBarContent
                        onClose={this.handleClose}
                        variant={status}
                        className={classes.margin}
                        message={message}
                    />
                </Snackbar>
            </div>
        );
    }
}
const mapStateToProps = (state, ownedProps) => {
    return {
        status: state[reducerName] && state[reducerName].message && state[reducerName].message.status,
        message: state[reducerName] && state[reducerName].message && state[reducerName].message.message,
        open: state[reducerName] && state[reducerName].message && state[reducerName].message.open
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onClearSnackbar: () => {
            dispatch(clearSnackbar());
        }
    };
};
Snackbars.propTypes = {
    classes: PropTypes.object.isRequired,
    status: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired
};
Snackbars.defaultProps = {
    status: "error",
    message: "login test",
    open: false
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(Snackbars));
