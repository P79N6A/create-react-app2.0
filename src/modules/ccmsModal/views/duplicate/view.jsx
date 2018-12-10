import { FormControl, Divider } from "@material-ui/core";
import { TextField } from "modules/common";
import { GroupSelecter, GroupCreator } from "../move/statics";
import React from "react";
import { connect } from "react-redux";
import { REDUCER_NAME } from "../../funcs/constants";
import store from "commons/store";
import * as actions from "../../funcs/actions";
import { filterFirstSpace } from "../../funcs/constants";

const defaultProps = {};
const propTypes = {};

class DuplicateContent extends React.Component {
    state = {
        id: "",
        name: "",
        desc: "",
        group: [],
        status: "2002",
        validate: false,
        addGroup: false,
        selectedGroups: []
    };
    componentDidMount = () => {
        this.props.onRender(this);
    };
    handleChange = (event, options) => {
        switch (event.target.name) {
            case "status":
                this.setState({
                    [event.target.name]: event.target.checked ? event.target.value : "2001"
                });
                return;
            case "group":
                this.setState({
                    [event.target.name]: event.target.value,
                    selectedGroups: options
                });
                break;
            default:
                this.setState({
                    [event.target.name]: filterFirstSpace(event.target.value)
                });
                break;
        }
    };
    submit = () => {
        const { app, pageId } = this.props;
        const appid = app && app["address.iotTopologyId"];
        const { name, id, desc, status, selectedGroups } = this.state;
        if (name === "" && id === "") return this.setState({ validate: true });
        store.dispatch(actions.lockDialog(true));
        store.dispatch(actions.clonePage(pageId, name, selectedGroups, id, desc, status, appid));
    };
    close = () => {};
    switchContent = () => {
        this.setState({
            addGroup: !this.state.addGroup,
            selectedGroups: [],
            validate: false,
            status: "2002",
            group: [],
            desc: "",
            id: ""
        });
    };
    render = () => {
        const { name, addGroup, group, validate, status, id, desc } = this.state;
        const { groups } = this.props;
        return (
            <FormControl fullWidth>
                <TextField
                    required
                    name="name"
                    label="Dashboard Name"
                    value={name}
                    onChange={this.handleChange}
                    error={validate && name === ""}
                />
                <Divider
                    style={{
                        height: 16,
                        background: "transparent"
                    }}
                />
                {addGroup ? (
                    <GroupCreator
                        name={id}
                        desc={desc}
                        status={status}
                        validate={validate}
                        onChange={this.handleChange}
                    />
                ) : (
                    <GroupSelecter
                        groups={groups}
                        validate={validate}
                        selectedGroup={group}
                        onChange={this.handleChange}
                    />
                )}
            </FormControl>
        );
    };
}

DuplicateContent.defaultProps = defaultProps;
DuplicateContent.propTypes = propTypes;

const mapStateToProps = state => {
    return {
        groups: state[REDUCER_NAME] && state[REDUCER_NAME].groups
    };
};

export default connect(
    mapStateToProps,
    null
)(DuplicateContent);
