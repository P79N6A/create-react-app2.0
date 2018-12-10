import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import Forgot from "./forgot";
import DialogContent from "@material-ui/core/DialogContent";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { I18n } from "react-i18nify";
import { DialogTitle, DialogActions, Button } from "@material-ui/core";

function Transition(props) {
    return <Slide direction="up" {...props} />;
}
const styles = theme => ({
    headerRoot: {
        "& h6": {
            display: "flex",
            flex: 1,
            alignItems: "center"
        }
    },
    actionButton: {
        margin: theme.spacing.unit * 3,
        marginTop: theme.spacing.unit
    },
    button: {
        marginLeft: theme.spacing.unit * 2
    },
    paperScrollPaper: {
        maxWidth: 360
    }
});
class FullScreenDialog extends React.Component {
    state = {
        formDatas: {}
    };
    handleClose = e => {
        const open = false;
        this.props.onForgotEvent(open);
    };
    onClick = () => {
        const { formDatas } = this.state;
        const { email, code, captchaToken } = formDatas;
        this.props.forgotPassword(email, code, captchaToken);
    };
    getDatas = datas => {
        this.setState({
            formDatas: datas
        });
    };
    render() {
        const { open, isCodeValidatePass = false } = this.props;
        const { classes, ...otherProps } = this.props;
        return (
            <Dialog
                open={open}
                classes={{ paperScrollPaper: classes.paperScrollPaper }}
                TransitionComponent={Transition}
                className="dialog-forgot"
            >
                <DialogTitle classes={{ root: classes.headerRoot }} id="alert-dialog-title">
                    <div
                        variant="h2"
                        style={{
                            flex: 1
                        }}
                    >
                        {I18n.t("login.forgotPasswordTitle")}
                    </div>
                    <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent style={{ height: "100%" }}>
                    {!isCodeValidatePass ? (
                        <Forgot {...otherProps} getDatas={this.getDatas} />
                    ) : (
                        <Typography style={{ width: "80%" }}>{I18n.t("login.sentEmail")}</Typography>
                    )}
                </DialogContent>
                <DialogActions classes={{ root: classes.actionButton }}>
                    {!isCodeValidatePass ? (
                        <React.Fragment>
                            <Button
                                variant="outlined"
                                onClick={this.handleClose}
                                color="secondary"
                                className={classes.button}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="outlined"
                                color="secondary"
                                onClick={this.onClick}
                                className={classes.button}
                            >
                                Submit
                            </Button>
                        </React.Fragment>
                    ) : (
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={this.handleClose}
                            className={classes.button}
                        >
                            Ok
                        </Button>
                    )}
                </DialogActions>
            </Dialog>
        );
    }
}

FullScreenDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired
};
FullScreenDialog.defaultProps = {
    open: false
};

export default withStyles(styles)(FullScreenDialog);
