/*
 * @Author: wplei
 * @Date: 2018-11-14 18:39:43
 * @Last Modified by: wplei
 * @Last Modified time: 2018-12-03 17:52:27
 */

import { Button, FormControl, MenuItem, Paper } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import store from "commons/store";
import _ from "lodash";
import { REDUCER_NAME as MODAL_REDUCER_NAME } from "modules/ccmsModal";
import { Input, Select } from "modules/common";
import React from "react";
import { connect } from "react-redux";
import * as actions from "../funcs/actions";
import { DEFAULT_SEARCH_CONDITION, SESSION_CONDITION_KEY } from "../funcs/constants";

const defaultProps = {
    groups: [],
    orderBys: [
        { text: "Newly Added", value: "createDt" },
        { text: "Last Edited", value: "updateDt" },
        { text: "Most Viewed", value: "callNum" }
    ]
};
const propTypes = {};

const styles = Theme => {
    return {
        paperRoot: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "0 16px"
        },
        formControl: {
            marginRight: 16
        },
        selectRoot: {
            width: Theme.spacing.unit * 20
        }
    };
};

class View extends React.Component {
    state = {
        // default sort by create date
        sortOrders: "createDt",
        group: "",
        name: "",
        interruptSearch: false
    };
    componentDidMount = () => {
        let { app } = this.props;
        // TODO: get search condition from session-storage
        let cahceSearchConditionsStr = sessionStorage.getItem("ISC-DASHBOARD-SEARCH-CONDITIONS");
        let cahceSearchConditions = cahceSearchConditionsStr
            ? JSON.parse(cahceSearchConditionsStr)
            : DEFAULT_SEARCH_CONDITION;
        const { sortOrders, group } = cahceSearchConditions;

        this.setState({
            group,
            sortOrders: sortOrders[1].field
        });
        store.dispatch(actions.toggleLoadingState(true));
        store.dispatch(
            actions.dashboardRequest(
                Object.assign({}, DEFAULT_SEARCH_CONDITION, {
                    applicationId: app
                })
            )
        );
    };
    getSnapshotBeforeUpdate = (props, state) => {
        // handle consition change
        if (_.isEqual(state, this.state))
            return {
                interval: 0
            };
        let interval = null;
        let updateTime = new Date();
        interval = this.updateTime ? updateTime - this.updateTime : 10000;
        this.updateTime = updateTime;
        return {
            interval
        };
    };
    componentDidUpdate = (prevProps, prevState, snapshot) => {
        const { interruptSearch } = this.state;
        if (interruptSearch) return;
        const { app, searchInterval } = prevProps;
        const { interval } = snapshot;
        if (!interval) return;
        // clear prev timer. set a new timer
        if (interval < searchInterval) clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            const { sortOrders: newSortOrders, group, name } = this.state;
            const { sortOrders } = DEFAULT_SEARCH_CONDITION;
            sortOrders.splice(1, 1);
            const sort = [
                {
                    field: newSortOrders,
                    asc: false
                }
            ];
            const searchConditions = Object.assign({}, DEFAULT_SEARCH_CONDITION, {
                name,
                group,
                applicationId: app,
                sortOrders: [...sortOrders, ...sort]
            });
            sessionStorage.setItem(SESSION_CONDITION_KEY, JSON.stringify(searchConditions));
            store.dispatch(actions.toggleLoadingState(true));
            store.dispatch(actions.getDashboardSuccess([]));
            store.dispatch(actions.dashboardRequest(searchConditions));
        }, searchInterval);
    };
    handleConditionChange = event => {
        this.setState({
            [event.target.name]: event.target.value,
            interruptSearch: event.target.name === "name"
        });
    };
    render = () => {
        const { name, group, sortOrders } = this.state;
        const { groups, orderBys, classes } = this.props;
        return (
            <Paper
                elevation={8}
                classes={{
                    root: classes.paperRoot
                }}
            >
                <FormControl
                    classes={{
                        root: classes.formControl
                    }}
                >
                    <Input
                        placeholder="Search By Name..."
                        name="name"
                        value={name}
                        onChange={this.handleConditionChange}
                    />
                </FormControl>
                <FormControl
                    classes={{
                        root: classes.formControl
                    }}
                >
                    <Select
                        classes={{
                            root: classes.selectRoot
                        }}
                        value={group}
                        name="group"
                        onChange={this.handleConditionChange}
                    >
                        <MenuItem key={"all"} value="">
                            <em>All Dashboards</em>
                        </MenuItem>
                        {groups.map(g => {
                            return (
                                <MenuItem key={g.id} value={g.id}>
                                    {g.id}
                                </MenuItem>
                            );
                        })}
                    </Select>
                </FormControl>
                <FormControl
                    classes={{
                        root: classes.formControl
                    }}
                >
                    <Select
                        classes={{
                            root: classes.selectRoot
                        }}
                        name="sortOrders"
                        value={sortOrders}
                        onChange={this.handleConditionChange}
                    >
                        {orderBys.map(o => {
                            return (
                                <MenuItem key={o.text} value={o.value}>
                                    {o.text}
                                </MenuItem>
                            );
                        })}
                    </Select>
                </FormControl>
                <Button
                    color="secondary"
                    onClick={() => this.handleConditionChange({ target: { name: "mockUpdate", value: "true" } })}
                >
                    search
                </Button>
            </Paper>
        );
    };
}

View.defaultProps = defaultProps;
View.propTypes = propTypes;

const mapStateToProps = (state, ownedProps) => {
    return {
        groups: state[MODAL_REDUCER_NAME] && state[MODAL_REDUCER_NAME].groups
    };
};

export default connect(
    mapStateToProps,
    null
)(withStyles(styles)(View));
