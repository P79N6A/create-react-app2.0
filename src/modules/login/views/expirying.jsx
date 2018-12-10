import React from "react";
import PropTypes from "prop-types";
import {
    DialogActions,
    DialogContent,
    Dialog,
    Button,
    Typography,
    DialogTitle,
    IconButton,
    Icon,
    withStyles
} from "@material-ui/core";
import Link from "react-router-dom/Link";
import invalidToken from "commons/utils/invalidToken";
import Slide from "@material-ui/core/Slide";
const styles = theme => ({
    headerRoot: {
        "& h6": {
            display: "flex",
            flex: 1,
            alignItems: "center"
        }
    },
    paperScrollPaper: {
        maxWidth: 470
    },
    graph: {
        marginTop: theme.spacing.unit * 2
    }
});
function Transition(props) {
    return <Slide direction="up" {...props} />;
}
const getLoginInfo = type => {
    switch (type) {
        case "FIRST_TIME_LOGIN":
            return {
                title: "Your Password is Expirying Soon",
                content:
                    "Your password will expiry in 3 days.Once your password expires, you will not able to log in until your password is reset.",
                changeNow: "Do you want to change your password now?",
                notNow: "Not Now",
                changePassword: "Change my password"
            };

        default:
            return {
                title: "Your Password Has Expired",
                content: "You will not able to log in until your password is changed.",
                changeNow: "Do you want to change your password now?",
                notNow: "Not Now",
                changePassword: "Change my password"
            };
    }
};
class PasswordChanged extends React.Component {
    state = {
        open: this.props.open,
        logincondition: this.props.logincondition
    };
    handleClose = () => {
        this.props.reset({ logincondition: null, isValid: false });
        invalidToken();
    };
    expiryHandle = e => {
        this.props.changePasswordHandle(true);
    };

    componentWillReceiveProps(nextProps) {
        const { logincondition, open } = nextProps;
        if (open !== this.props.open || logincondition !== this.props.logincondition) {
            this.setState({
                logincondition,
                open
            });
        }
    }
    render() {
        const { classes } = this.props;
        const { logincondition = null, open } = this.state;
        const messages = getLoginInfo(logincondition);
        return (
            <Dialog
                open={open}
                TransitionComponent={Transition}
                classes={{ paperScrollPaper: classes.paperScrollPaper }}
            >
                <DialogTitle classes={{ root: classes.headerRoot }}>
                    <div
                        style={{
                            flex: 1
                        }}
                    >
                        {messages.title}
                    </div>
                    <IconButton size="small" style={{ margin: "0 8px" }} onClick={this.handleClose}>
                        <Icon>close</Icon>
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <Typography>{messages.content}</Typography>
                    <Typography className={classes.graph}>{messages.changeNow}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="secondary" autoFocus>
                        {messages.notNow}
                    </Button>
                    <Link to="/user_expiry">
                        <Button onClick={this.expiryHandle} color="secondary" autoFocus>
                            {messages.changePassword}
                        </Button>
                    </Link>
                </DialogActions>
            </Dialog>
        );
    }
}
PasswordChanged.defaultProps = {};
PasswordChanged.propTypes = {
    classes: PropTypes.object
};
export default withStyles(styles)(PasswordChanged);
