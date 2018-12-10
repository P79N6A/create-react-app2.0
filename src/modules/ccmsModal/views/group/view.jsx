import { withStyles } from "@material-ui/core/styles";
import store from "commons/store";
import _ from "lodash";
import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import * as actions from "../../funcs/actions";
import { filterFirstSpace, REDUCER_NAME } from "../../funcs/constants";
import GroupTable from "./groupTable";
import { AddGroup, GroupDelete, GroupDetails } from "./statics";

const styles = Theme => {
    return {
        typographyRoot: {
            flex: 1,
            fontSize: "1rem"
        }
    };
};

const defaultProps = {
    groups: []
};
const propTypes = {
    groups: PropTypes.array
};

// using lodash forEach
const groupByCount = (collections, count) => {
    let n = 0;
    let groups = [];
    _.forEach(collections, (c, i) => {
        if (i % count === 0 && i !== 0) n = n + 1;
        groups[n] ? groups[n].push(c) : (groups[n] = [c]);
    });
    return groups;
};

const getSorting = (order, orderBy) => {
    return order === "desc"
        ? (a, b) => (b[orderBy] < a[orderBy] ? -1 : 1)
        : (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1);
};

class GroupContent extends React.Component {
    state = {
        page: 0,
        count: 0,
        status: "2001",
        name: "",
        desc: "",
        groups: [],
        order: "asc",
        orderBy: "id",
        rowsPerPage: 5,
        validate: false,
        currentIndex: 0
    };
    componentDidMount = () => {
        this.props.onRender(this);
    };
    static getDerivedStateFromProps(nextProps, prevState) {
        const { groups } = nextProps;
        const { rowsPerPage, page, order, orderBy } = prevState;
        const count = (groups && groups.length) || 0;
        const groupByCounts = groupByCount(groups.sort(getSorting(order, orderBy)), rowsPerPage);
        return {
            count,
            page,
            rowsPerPage,
            allGroups: groupByCounts,
            groups: groupByCounts[page]
        };
    }
    sortHandler = property => event => {
        if (property === "actions") return;
        const { order } = this.state;
        this.setState({
            orderBy: property,
            order: order === "desc" ? "asc" : "desc"
        });
    };
    handleConditionChange = info => {
        const { groups } = this.props;
        const { page } = this.state;
        const { id, count } = info;
        switch (id) {
            case "rowsPerPage":
                let counts = Number(count.key);
                let allGroups = groupByCount(groups, counts);
                this.setState({
                    allGroups,
                    [id]: counts,
                    groups: allGroups[page]
                });
                break;
            default:
                this.setState({
                    [id]: count
                });
                break;
        }
    };
    handleActionClick = (action, group) => event => {
        const { id } = action;
        const { id: name, desc, page, seqId, pages } = group;
        switch (id) {
            case "edit":
                this.setState({
                    name,
                    desc,
                    pages,
                    currentIndex: 3,
                    selectedGroupSeqId: seqId
                });
                this.props.parent.switchHeaderActionState(1);
                this.props.parent.switchActionState(3);
                break;
            case "delete":
                this.setState({
                    name,
                    currentIndex: 2,
                    pageCount: page,
                    selectedGroupSeqId: seqId
                });
                this.props.parent.switchHeaderActionState(1);
                this.props.parent.switchActionState(2);
                break;
            default:
                break;
        }
    };
    getContent = () => {
        const {
            currentIndex,
            count,
            rowsPerPage,
            page,
            order,
            orderBy,
            groups,
            name,
            desc,
            pageCount,
            validate,
            status
        } = this.state;
        // const { groups } = this.props;
        switch (currentIndex) {
            case 0:
                return (
                    <GroupTable
                        page={page}
                        count={count}
                        groups={groups}
                        order={order}
                        orderBy={orderBy}
                        rowsPerPage={rowsPerPage}
                        sortHandler={this.sortHandler}
                        onActions={this.handleActionClick}
                        onSearchChange={this.handleConditionChange}
                    />
                );
            case 1:
                return (
                    <AddGroup
                        name={name}
                        desc={desc}
                        status={status}
                        validate={validate}
                        onChange={this.handleChange}
                    />
                );
            case 2:
                return <GroupDelete name={name} count={pageCount} />;
            case 3:
                return (
                    <GroupDetails
                        name={name}
                        desc={desc}
                        status={status}
                        validate={validate}
                        onChange={this.handleChange}
                    />
                );
            default:
                break;
        }
    };
    handleChange = event => {
        const { status } = this.state;
        if (event.target.name === "status")
            return this.setState({
                status: status === "2001" ? "2002" : "2001"
            });
        this.setState({
            [event.target.name]: filterFirstSpace(event.target.value)
        });
    };
    searchByInput = value => {};
    submit = () => {
        const { app } = this.props;
        const appid = app["address.iotTopologyId"];
        const { currentIndex, name, desc, status, pages, selectedGroupSeqId } = this.state;
        if (name === "")
            return this.setState({
                validate: true
            });
        // TODO: lock dialog, not allow actions during process
        store.dispatch(actions.lockDialog(true));
        switch (currentIndex) {
            case 1:
                // TODO: create dashboard
                store.dispatch(actions.createGroup(name, [], status, desc, appid));
                break;
            case 2:
                // TODO: delete dashboard
                store.dispatch(actions.deleteGroup(selectedGroupSeqId, appid));
                break;
            case 3:
                // TODO: modify dashboard
                store.dispatch(actions.updateGroup(selectedGroupSeqId, name, status, desc, pages, appid));
                break;
            default:
                break;
        }
        this.setState({ currentIndex: 0 }, () => {
            this.props.parent.switchHeaderActionState(0);
            this.props.parent.switchActionState(0);
        });
    };
    close = () => {
        const { currentIndex } = this.state;
        if (currentIndex !== 0) this.setState({ currentIndex: 0 });
    };
    // TODO: switch dialog content, reset dashboard information
    switchContent = currentIndex => {
        this.setState({
            currentIndex,
            name: "",
            desc: "",
            status: "2001",
            validate: currentIndex === 0 && false
        });
    };
    render = () => {
        return <React.Fragment>{this.getContent()}</React.Fragment>;
    };
}

GroupContent.defaultProps = defaultProps;
GroupContent.propTypes = propTypes;

const mapStateToProps = state => {
    return {
        groups: state && state[REDUCER_NAME] && state[REDUCER_NAME].groups
    };
};

export default connect(
    mapStateToProps,
    null
)(withStyles(styles)(GroupContent));
