import { withStyles } from "@material-ui/core/styles";
import store from "commons/store";
import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import * as actions from "../../funcs/actions";
import { filterFirstSpace, REDUCER_NAME } from "../../funcs/constants";
import { GroupCreator, GroupSelecter } from "./statics";

const styles = Theme => {
    return {
        typographyRoot: {
            flex: 1,
            fontSize: "1rem"
        }
    };
};

class MoveContent extends React.Component {
    state = {
        id: "",
        desc: "",
        addGroup: false,
        status: "2002",
        group: [],
        validate: false,
        selectedGroups: []
    };
    componentDidMount = () => {
        this.props.onRender(this);
        let group = [];
        const { groups, pageId } = this.props;
        groups.filter(g => {
            return g.page && g.page.includes(pageId) && group.push(g.id);
        });
        this.setState({
            group
        });
    };
    componentWillReceiveProps = nextProps => {
        if (_.isEqual(nextProps, this.props)) return;
        let group = [];
        const { pageId, groups } = nextProps;
        groups.filter(g => {
            return g.page && g.page.includes(pageId) && group.push(g.id);
        });
        this.setState({
            group
        });
    };
    switchContent = () => {
        this.setState({
            addGroup: !this.state.addGroup,
            selectedGroups: [],
            group: [],
            validate: false,
            id: "",
            desc: ""
        });
    };
    submit = () => {
        const { group } = this.state;
        const { pageId, app } = this.props;
        const appid = app["address.iotTopologyId"];
        let { addGroup, id, desc, status, selectedGroups } = this.state;
        const pages = [pageId];
        if (addGroup) {
            if (id === "") return this.setState({ validate: true });
            this.props.parent.switchHeaderActionState(0);
            this.props.parent.switchActionState(0);
            this.setState({
                addGroup: !this.state.addGroup
            });
            return store.dispatch(actions.createGroup(id, pages, status, desc, appid));
        }
        const postdatas = {
            page: pageId,
            groups: []
        };
        if (selectedGroups && Array.isArray(selectedGroups) && !selectedGroups.length) selectedGroups = group;
        selectedGroups.forEach(g => {
            const { id, seqId } = g;
            postdatas.groups.push({
                id,
                seqId
            });
        });
        store.dispatch(actions.lockDialog(true));
        store.dispatch(actions.updatePageGroup(postdatas, appid));
    };
    close = () => {
        const { addGroup } = this.state;
        if (addGroup) {
            this.setState(
                {
                    addGroup: false
                },
                () => {
                    this.props.parent.switchActionState(0);
                    this.props.parent.switchHeaderActionState(0);
                }
            );
        }
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
                    selectedGroups: options,
                    [event.target.name]: event.target.value
                });
                return;
            default:
                this.setState({
                    [event.target.name]: filterFirstSpace(event.target.value)
                });
                break;
        }
    };
    render = () => {
        const { addGroup, status, group, id, desc, validate } = this.state;
        const { classes, groups } = this.props;
        return (
            <React.Fragment>
                {addGroup ? (
                    <GroupCreator
                        name={id}
                        desc={desc}
                        status={status}
                        validate={validate}
                        onChange={this.handleChange}
                    />
                ) : (
                    <GroupSelecter groups={groups} selectedGroup={group} onChange={this.handleChange} />
                )}
            </React.Fragment>
        );
    };
}

const mapStateToProps = state => {
    return {
        groups: state[REDUCER_NAME] && state[REDUCER_NAME].groups
    };
};

export default connect(
    mapStateToProps,
    null
)(withStyles(styles)(MoveContent));
