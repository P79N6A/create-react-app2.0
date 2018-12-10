import React from "react";
import PropTypes from "prop-types";
import { Dialog } from "../../common/index";
import {} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({});

class AddUser extends React.Component {
    state = {};
    cancle = () => {};
    submit = () => {};
    getIcons = () => {};
    render() {
        // const { classes } = this.props;
        return (
            <Dialog
                title={"Add User"}
                cancle={this.cancle}
                submit={this.submit}
                open={true}
                icons={this.getIcons()}
                onClose={false}
            >
                XXXXXXXXX
            </Dialog>
        );
    }
}
AddUser.propTypes = {
    classes: PropTypes.object.isRequired
};
AddUser.defaultProps = {};
export default withStyles(styles)(AddUser);
