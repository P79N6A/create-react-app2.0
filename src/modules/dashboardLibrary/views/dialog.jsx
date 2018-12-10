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
import { Button, Dialog, DialogTitle, IconButton, Icon, CircularProgress } from "@material-ui/core";
import { DialogActions, DialogContent, Slide } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
// import { theme } from "modules/theme";
import { I18n } from "react-i18nify";
import PermissionComponent from "commons/components/permissionComponent";
// import classnames from "classnames";
// import HeaderBar from "./HeaderBar";

const styles = Theme => ({
    progress: {
        margin: Theme.spacing.unit * 2,
        position: "absolute",
        top: "calc(50% - 20px)",
        left: "calc(50% - 20px)",
        color: Theme.palette.secondary.main,
        zIndex: 1
    },
    progressDialog: {
        width: "100%",
        height: "200%",
        top: "-150px",
        position: "fixed",
        background: "rgba(0,0,0,0.3)",
        zIndex: 1
    },
    dialog: {
        flex: "1 1 auto",
        padding: "0px",
        overflowY: "auto"
    },
    headerPadding: {
        padding: Theme.spacing.unit * 2
    },
    foot: {
        margin: "0px",
        padding: "8px 4px"
    },
    HeaderBar: {
        background: Theme.palette.primary.dark
    },
    headIcon: {
        marginLeft: "auto",
        position: "relative",
        right: "-10px"
    },
    headerRoot: {
        "& h6": {
            display: "flex",
            flex: 1,
            alignItems: "center"
        }
    },
    root: {
        // paddingLeft: "0px",
        // paddingRight: "0px",
        padding: "0px",
        overflow: "auto"
        // overflow: "hidden!important"
    }
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

const Action = ({ classes, icons, iconContent }) => {
    return (
        <div className={classes.headIcon}>
            {iconContent}
            {icons.map((item, i) => {
                if (item.visible && !item.visible) {
                    return null;
                } else {
                    return (
                        <PermissionComponent key={i} material-key={item["material-key"]}>
                            {item.content ? (
                                item.content()
                            ) : (
                                <IconButton
                                    color="inherit"
                                    key={i}
                                    size="small"
                                    style={{ margin: "0 8px" }}
                                    onClick={item.func || this.getBtnClick}
                                >
                                    <Icon color="inherit">{item.name}</Icon>
                                </IconButton>
                            )}
                        </PermissionComponent>
                    );
                }
            })}
        </div>
    );
};

class Dialogs extends React.Component {
    static defaultProps = {
        title: "",
        subTitle: "",
        cancleText: "",
        submitText: "",
        icons: [],
        width: "",
        height: "",
        noPadding: false,
        iconContent: null,
        onClose: false,
        cancle: () => {},
        submit: () => {}
    };
    state = {
        loading: false,
        open: false,
        icons: [],
        onClose: true,
        isDisabled: false,
        isFooter: false
    };
    handleClose = () => {
        this.props.cancle();
    };
    submitHandle = () => {
        this.props.submit();
    };
    componentWillReceiveProps(nextProps) {
        this.setState({
            // onClose: nextProps.onClose,
            open: nextProps.open,
            icons: nextProps.icons,
            isDisabled: nextProps.isDisabled,
            isFooter: nextProps.isFooter,
            iconContent: nextProps.iconContent,
            loading: nextProps.loading
        });
    }

    render() {
        const { open, isDisabled, icons, isFooter, loading } = this.state;
        const { title, cancleText, submitText, classes, noPadding, width, height, iconContent } = this.props;
        const cancle = cancleText || I18n.t("modal.buttonText.left");
        const submit = submitText || I18n.t("modal.buttonText.right");
        const isLoading = loading ? (
            <div>
                <CircularProgress
                    color="secondary"
                    // style={{
                    //     color: theme.palette.secondary.main
                    // }}
                    className={classes.progress}
                />
                <div className={classes.progressDialog} />
            </div>
        ) : null;
        return (
            <Dialog
                disablePortal
                open={open}
                nopadding={noPadding.toString()}
                className="repaireLine"
                // onClose={onClose ? this.handleClose : () => {}}
                TransitionComponent={Transition}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                PaperProps={{
                    style: {
                        maxWidth: "700px",
                        minWidth: "600px",
                        width: width ? width : "auto",
                        height: height ? height : "auto"
                    }
                }}
            >
                {isLoading}
                <DialogTitle classes={{ root: classes.headerRoot }} id="alert-dialog-title">
                    <div
                        // headlineMapping={{ body1: "p" }}
                        variant="h2"
                        style={{
                            flex: 1
                        }}
                    >
                        {title || " "}
                    </div>
                    <Action classes={classes} iconContent={iconContent} icons={icons} />
                    {/* {!onClose && ( */}
                    <IconButton size="small" style={{ margin: "0 8px" }} onClick={this.handleClose}>
                        <Icon>close</Icon>
                    </IconButton>
                    {/* )} */}
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
