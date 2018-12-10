import React from "react";
import PropTypes from "prop-types";
import { Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import store from "commons/store";
import { actions as CCMSEX } from "modules/ccmsEx";
import { actions as MODALS } from "modules/ccmsModal";

const styles = Theme => {
    return {
        typographyRoot: {
            flex: 1,
            fontSize: "1rem"
        }
    };
};

const defaultProps = {
    name: "",
    classes: {}
};

const propTypes = {
    name: PropTypes.string,
    classes: PropTypes.object
};

class DeleteContent extends React.Component {
    componentWillMount = () => {
        this.props.onRender(this);
    };
    submit = () => {
        store.dispatch(CCMSEX.showModal(false));
        store.dispatch(MODALS.toggleModal(false));
        store.dispatch(CCMSEX.getCustomizedDashboards());
    };
    close = () => {
        console.log("cancel exit");
    };
    render = () => {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <Typography
                    classes={{
                        root: classes.typographyRoot
                    }}
                >
                    Are you sure you want to discard the changes? All your work on your dashboard will be lost.
                </Typography>
            </React.Fragment>
        );
    };
}

DeleteContent.defaultProps = defaultProps;
DeleteContent.propTypes = propTypes;

export default withStyles(styles)(DeleteContent);
