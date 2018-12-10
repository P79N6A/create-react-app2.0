import React from "react";
import PropTypes from "prop-types";
import { Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import * as actions from "../../funcs/actions";
import store from "commons/store";

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
        const { deletePage, pageKey, app } = this.props;
        store.dispatch(actions.lockDialog(true));
        deletePage(pageKey, app && app["address.iotTopologyId"]);
    };
    close = () => {
        console.log("cancal delete");
    };
    render = () => {
        const { name, classes } = this.props;
        return (
            <React.Fragment>
                <Typography
                    classes={{
                        root: classes.typographyRoot
                    }}
                >
                    You are about to delete {<strong>{name}</strong>}, Do you wish to process ?
                </Typography>
            </React.Fragment>
        );
    };
}

DeleteContent.defaultProps = defaultProps;
DeleteContent.propTypes = propTypes;

const mapDispatchToProps = dispatch => {
    return {
        // delete dashboard by pageKey
        deletePage: (pageKey, appid) => {
            dispatch(actions.deletePage(pageKey, appid));
        }
    };
};

export default connect(
    null,
    mapDispatchToProps
)(withStyles(styles)(DeleteContent));
