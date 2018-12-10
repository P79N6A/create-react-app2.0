import React, { Component } from "react";
import PropTypes from "prop-types";
// import { connect } from "react-redux";
import { anchorOrigin, containerSize } from "../funcs/constants";
import {
    Snackbar,
    IconButton,
    SnackbarContent,
    Checkbox,
    FormControlLabel,
    Tooltip,
    Typography
} from "@material-ui/core";
import {
    CheckCircle as CheckCircleIcon,
    Error as ErrorIcon,
    Info as InfoIcon,
    Warning as WarningIcon,
    Close as CloseIcon
} from "@material-ui/icons";
import classNames from "classnames";
import { green, amber, indigo } from "@material-ui/core/colors";
// import amber from "@material-ui/core/colors/amber";
import { withStyles } from "@material-ui/core/styles";

const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon
};

const stylesForContent = Theme => {
    const { messageCenter, common, error } = Theme.palette;
    return {
        root: {
            width: containerSize.width + "px",
            height: containerSize.height + "px",
            color: common.white
        },
        typoColor: {
            color: common.white
        },
        success: {
            backgroundColor: messageCenter ? messageCenter.success : green[600]
        },
        error: {
            backgroundColor: messageCenter ? messageCenter.error : error.dark
        },
        info: {
            backgroundColor: messageCenter ? messageCenter.info : indigo[700]
        },
        warning: {
            backgroundColor: messageCenter ? messageCenter.warning : amber[700]
        },
        icon: {
            fontSize: 20
        },
        iconVariant: {
            opacity: 0.9,
            marginRight: Theme.spacing.unit
        },
        msg:{
            overflow: "hidden",
            height: "40px",
            "& span": {
                width: "100%"
            }
        },
        messageCon: {
            textOverflow: "ellipsis",
            display: "-webkit-box",
            boxOrient: "vertical",
            overflow: "hidden",
            width: "252px"
        },
        msgClamp: {
            wordBreak: "break-word",
            lineClamp: 2
        },
        titleClamp: {
            whiteSpace: "nowrap",
            lineClamp: 1
        },
        action: {
            width: "100%",
            paddingLeft: 0,
            marginLeft: 0,
            justifyContent: "space-between"
        },
        FormControlLabelRoot: {
            marginBottom: 0
        }
    };
};

const stylesForSnack = Theme => ({
    anchorOriginTopRight: {
        top: "70px"
    }
});

const Content = props => {
    const { classes, source, className, message, onClose, variant, mute, onMute, ...other } = props;
    const Icon = variantIcon[variant];
    return (
        <SnackbarContent
            className={classNames(classes[variant], className, classes.root)}
            aria-describedby="client-snackbar"
            message={
                <Tooltip title={message} placement="bottom">
                    <div>
                        {source && (
                            <Typography
                                variant="subtitle1"
                                classes={{ subtitle1: classes.typoColor }}
                                className={classNames(classes.messageCon, classes.titleClamp)}
                            >
                                <Icon className={classNames(classes.icon, classes.iconVariant)} />
                                {source}
                            </Typography>
                        )}
                        <div className={classes.msg}>
                            <span className={classNames(classes.messageCon, classes.msgClamp)}>{message}</span>
                        </div>
                    </div>
                </Tooltip>
            }
            classes={{
                action: classes.action
            }}
            action={
                <React.Fragment>
                    <FormControlLabel
                        classes={{ root: classes.FormControlLabelRoot, label: classes.typoColor }}
                        control={
                            <Checkbox
                                classes={{ root: classes.typoColor }}
                                checked={mute}
                                onChange={e => {
                                    onMute(e.target.checked);
                                }}
                                value="mute"
                            />
                        }
                        label="Mute 10 Mins"
                    />
                    <IconButton
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        className={classes.close}
                        onClick={onClose}
                    >
                        <CloseIcon className={classes.icon} />
                    </IconButton>
                </React.Fragment>
            }
            {...other}
        />
    );
};
const ContentWrapper = withStyles(stylesForContent)(Content);

class Snackbars extends Component {
    onClose = (event, reason) => {
        let { id, onClose, open } = this.props;
        reason !== "clickaway" && open && onClose(id);
    };
    render() {
        let { classes, type, source, message, open, mute, autoHideDuration, onMute, zIndex } = this.props;
        return (
            <div className="isc-Snackbar">
                <Snackbar
                    anchorOrigin={anchorOrigin}
                    open={open}
                    onClose={this.onClose}
                    autoHideDuration={autoHideDuration}
                    style={{ zIndex: zIndex + 1400 }}
                    classes={{
                        anchorOriginTopRight: classes.anchorOriginTopRight
                    }}
                >
                    <ContentWrapper
                        onClose={this.onClose}
                        variant={type}
                        source={source}
                        message={message}
                        mute={mute}
                        onMute={onMute}
                    />
                </Snackbar>
            </div>
        );
    }
}

Snackbars.propTypes = {
    message: PropTypes.string,
    onClose: PropTypes.func.isRequired,
    type: PropTypes.oneOf(["success", "error", "warning", "info"]).isRequired,
    id: PropTypes.number.isRequired,
    open: PropTypes.bool,
    onMute: PropTypes.func
};

export default withStyles(stylesForSnack)(Snackbars);
