import React from "react";
// import PropTypes from "prop-types";
import { Modal, Slide } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const styles = Theme => {
    return {
        modalRoot: {
            paddingTop: Theme.spacing.unit * 8,
            zIndex: Theme.zIndex.modal - 1
        }
    };
};

export default withStyles(styles)(({ children, open = false, classes }) => {
    return (
        <Slide in={open} direction="up">
            <Modal
                disablePortal
                keepMounted
                classes={{
                    root: classes.modalRoot
                }}
                open={open}
            >
                {children}
            </Modal>
        </Slide>
    );
});
