/*
 * =========================================================================
 *  Copyright (C)2015 NCS Pte. Ltd. All Rights Reserved
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
 * Created by @Luo Jia alex on 29/05/15.
 */

/**
 * @fileOverview Here need the description for this file
 * @module DIALOG
 * @author LUOJIA
 * @exports {
 *  Dialogs
 * }
 */
import React from "react";
import PropTypes from "prop-types";
import { Button, Dialog, DialogTitle, IconButton, Icon } from "@material-ui/core";
import { DialogActions, DialogContent, Slide } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
// import { theme } from "modules/theme";
import { I18n } from "react-i18nify";
// import classnames from "classnames";
// import HeaderBar from "./HeaderBar";

const styles = theme => ({
    dialog: {
        flex: "1 1 auto",
        padding: "0px",
        overflowY: "hidden",
        minWidth: 600
    },
    headerPadding: {
        padding: theme.spacing.unit * 2
    },
    foot: {
        margin: "0px",
        padding: "8px 4px"
    },
    HeaderBar: {
        background: theme.palette.primary.dark
    },
    headIcon: {
        marginLeft: "auto"
    },
    headerRoot: {
        "& h6": {
            display: "flex"
        }
    },
    root: { paddingLeft: "0px", paddingRight: "0px", overflow: "hidden" }
});

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

/**
 * Call server API based on HTTP DELETE
 * @example
 *  <BottomButton
        handleClose={this.handleClose}
        submitHandle={this.submitHandle}
        cancleText={cancleText}
        submitText={submitText}
    />
 *
 * @param {string} cancleText
 * @param {string} submitText
 * @param {function} handleClose
 * @param {function} submitHandle
 * @returns Component
 */
const BottomButton = ({ handleClose, classes, isDisabled, submitHandle, cancleText, submitText }) => {
    return (
        <React.Fragment>
            <Button onClick={handleClose} color="secondary">
                {cancleText.toUpperCase()}
            </Button>
            <Button onClick={submitHandle} disabled={isDisabled} color="secondary">
                {submitText.toUpperCase()}
            </Button>
        </React.Fragment>
    );
};

const Action = ({ classes, icons }) => {
    return (
        <div className={classes.headIcon}>
            {icons.map((item, i) => {
                return (
                    <IconButton
                        color="inherit"
                        key={i}
                        size="small"
                        style={{ margin: "0 8px" }}
                        onClick={item.func ? item.func : this.getBtnClick}
                    >
                        <Icon color="inherit">{item.name}</Icon>
                    </IconButton>
                );
            })}
        </div>
    );
};

class Dialogs extends React.Component {
    static defaultProps = {
        title: "",
        open: false,
        subTitle: "",
        cancleText: "",
        submitText: "",
        icons: [],
        noPadding: false,
        onClose: false,
        cancle: () => {},
        submit: () => {},
        maxWidth: "600px",
        minWidth: "600px"
    };
    state = {
        open: false,
        icons: [],
        isDisabled: false,
        isFooter: false
    };
    handleClose = () => {
        this.props.onCancle();
    };
    submitHandle = () => {
        this.props.onSubmit();
    };
    componentWillReceiveProps(nextProps) {
        this.setState({
            open: nextProps.open,
            icons: nextProps.icons,
            isDisabled: nextProps.isDisabled,
            isFooter: nextProps.isFooter
        });
    }

    render() {
        const { open, isDisabled, icons, isFooter } = this.state;
        const { title, cancleText, submitText, classes, noPadding, onClose, maxWidth, minWidth } = this.props;
        const cancle = cancleText || I18n.t("modal.buttonText.left");
        const submit = submitText || I18n.t("modal.buttonText.right");
        const action = icons.length ? <Action classes={classes} icons={icons} /> : null;
        return (
            // <MuiThemeProvider theme={theme}>
            <Dialog
                open={open}
                className="repaireLine"
                onClose={onClose ? this.handleClose : () => {}}
                TransitionComponent={Transition}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                PaperProps={{
                    style: {
                        maxWidth: maxWidth,
                        minWidth: 600
                    }
                }}
            >
                <DialogTitle classes={{ root: classes.headerRoot }} id="alert-dialog-title">
                    {title}
                    {action}
                </DialogTitle>
                <DialogContent
                    classes={{
                        root: noPadding ? classes.root : ""
                    }}
                >
                    {this.props.children}
                </DialogContent>
                {!isFooter ? (
                    <DialogActions>
                        <BottomButton
                            classes={classes}
                            handleClose={this.handleClose}
                            submitHandle={this.submitHandle}
                            cancleText={cancle}
                            submitText={submit}
                            isDisabled={isDisabled}
                        />
                    </DialogActions>
                ) : null}
            </Dialog>
            // </MuiThemeProvider>
        );
    }
}
Dialogs.propTypes = {
    title: PropTypes.string,
    open: PropTypes.bool,
    cancleText: PropTypes.string,
    submitText: PropTypes.string,
    cancle: PropTypes.func,
    submit: PropTypes.func
};

export default withStyles(styles)(Dialogs);
