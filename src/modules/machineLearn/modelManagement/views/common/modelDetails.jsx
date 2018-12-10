import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import { connect } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import { REDUCER_NAME } from "../../funcs/constants";

const styles = theme => ({
    root: {
        width: "100%",
        backgroundColor: theme.palette.background.paper,
        position: "relative",
        overflow: "auto",
        height: "100%"
    },
    listSection: {
        backgroundColor: "inherit"
    },
    ul: {
        backgroundColor: "inherit",
        padding: 0
    }
});

class ModelDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modelInfoKey: ["Model Name", "Model Description", "Model Type", "Model Created On", "Model Version", "Model State"],
            modelInfoValue: []
        };
    }

    componentWillReceiveProps(nextProps) {
        if (
            nextProps.commonDisplayInfo !== this.props.commonDisplayInfo &&
            JSON.stringify(nextProps.commonDisplayInfo) !== "{}"
        ) {
 
            let modelValue = [];
            modelValue[0] = nextProps.commonDisplayInfo["modelName"];
            modelValue[1] = nextProps.commonDisplayInfo["description"];
            modelValue[2] = nextProps.commonDisplayInfo["type"];
            modelValue[3] = nextProps.commonDisplayInfo["createOn"];
            modelValue[4] = nextProps.commonDisplayInfo["version"];
            modelValue[5] = nextProps.commonDisplayInfo["state"];

            this.setState({
                modelInfoValue: modelValue
            });
        }
    }

    render() {
        const { classes, refreshCommonSuccess } = this.props;
        const { modelInfoKey, modelInfoValue } = this.state;
        return (
            <List className={classes.root} subheader={<li />}>
                {!refreshCommonSuccess ? (
                    <div className="progress-cont">
                        <CircularProgress color="secondary" />
                    </div>
                ) : (
                    modelInfoKey &&
                    modelInfoKey.map((items, indexs) => (
                        <li key={indexs} className={classes.listSection}>
                            <ul className={classes.ul}>
                                <ListSubheader>{items}</ListSubheader>
                                {modelInfoValue &&
                                    modelInfoValue.map((item, index) =>
                                        index === indexs ? (
                                            <ListItem key={index}>
                                                <ListItemText primary={item} />
                                            </ListItem>
                                        ) : null
                                    )}
                            </ul>
                        </li>
                    ))
                )}
            </List>
        );
    }
}

ModelDetails.propTypes = {
    classes: PropTypes.object.isRequired
};

ModelDetails.defaultProps = {
    refreshCommonSuccess: false,
    commonDisplayInfo: {}
};

const mapStateToProps = (state, ownProps) => {
    if (state[REDUCER_NAME]) {
        return {
            refreshCommonSuccess: state[REDUCER_NAME].refreshCommonSuccess || false,
            commonDisplayInfo: state[REDUCER_NAME].commonDisplayInfo || {}
        };
    }
};

export default connect(
    mapStateToProps,
    null
)(withStyles(styles)(ModelDetails));
