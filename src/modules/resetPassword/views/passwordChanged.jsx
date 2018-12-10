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
    paperScrollPaper: {
        maxWidth: 360
    }
});
class PasswordChanged extends React.Component {
    handleClose = () => {
        this.props.reset({ logincondition: null, isValid: false });
        invalidToken();
    };
    render() {
        const { open = true, classes } = this.props;
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
                        {"Password Changed"}
                    </div>
                    <Link to="/login">
                        <IconButton size="small" style={{ margin: "0 8px" }} onClick={this.handleClose}>
                            <Icon>close</Icon>
                        </IconButton>
                    </Link>
                </DialogTitle>
                <DialogContent>
                    <Typography>
                        Your password has been changed successfully changed.you will now be redirected to the login page
                        where you can login login with new password.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Link to="/login">
                        <Button onClick={this.handleClose} color="secondary" autoFocus>
                            Ok
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
