/*
 * @Author: wplei
 * @Date: 2018-11-14 18:39:43
 * @Last Modified by: wplei
 * @Last Modified time: 2018-12-07 18:27:35
 */

import { withStyles } from "@material-ui/core/styles";
import store from "commons/store";
import _ from "lodash";
import FloatActionButton from "modules/applicationLibrary/components/FloatActionButton";
import { actions as MODALS } from "modules/ccmsModal";
import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import * as actions from "../funcs/actions";
import { REDUCER_NAME } from "../funcs/constants";
import DashboardList from "./dashboardList";
import SearchBar from "./searchBar";
import { Loading, WrapperScrollBar } from "./statics";

const groupByCount = (collections, count) => {
    let n = 0;
    let groups = [];
    _.forEach(collections, (c, i) => {
        if (i % count === 0 && i !== 0) n = n + 1;
        groups[n] ? groups[n].push(c) : (groups[n] = [c]);
    });
    return groups;
};

const INCRESE_COUNT = 10;

const defaultProps = {
    dashboards: []
};
const propTypes = {
    dashboards: PropTypes.array
};

const styles = Theme => {
    return {};
};

class View extends React.Component {
    // static getDerivedStateFromProps = (props, state) => {
    //     const { counts, searchOptions } = props;
    //     const { optionCounts } = searchOptions;
    // };
    state = {
        loadCount: 15,
        pageLimit: 1,
        groupSorted: []
    };

    componentDidMount = () => {
        const { currentApplicationInfo: app } = this.props;
        const appid = app && app["address.iotTopologyId"];
        store.dispatch(actions.getDashboardSuccess([]));
        store.dispatch(actions.groupRequest(appid));
    };

    handleClick = action => {
        const { id } = action;
        store.dispatch(
            MODALS.toggleModal(true, {
                mode: id,
                args: {}
            })
        );
    };

    handleScroll = height => event => {
        event.stopPropagation();
        let element = event.target;
        const { groupSorted } = this.state;
        // if (element.scrollTop === 0) return this.setState({ page: this.state.page > 0 ? this.state.page - 1 : 0 });
        if (element.scrollTop + element.clientHeight !== element.scrollHeight) return false;
        const totalPageCount = groupSorted.length;
        const nextPage = this.state.pageLimit + 1;
        const pageLimit = nextPage < totalPageCount ? nextPage : totalPageCount || 1;
        this.setState({
            pageLimit
        });
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        const { dashboards } = nextProps;
        const { loadCount } = prevState;
        if (_.isEqual(dashboards, prevState.totalDashboards)) return null;
        const groupSorted = groupByCount(dashboards, loadCount);
        return {
            dashboards,
            groupSorted
        };
    }

    render = () => {
        const {
            listOptions,
            currentApplicationInfo: app,
            searchOptions,
            // dashboards,
            isLoading,
            counts,
            actionButtons
        } = this.props;
        const { pageLimit, groupSorted } = this.state;
        const dashboards = groupSorted.slice(0, pageLimit);
        const appid = app && app["address.iotTopologyId"];
        return (
            <main
                style={{
                    height: "100%"
                }}
            >
                <SearchBar {...searchOptions} app={appid} counts={counts} />
                <WrapperScrollBar
                    padding={[0]}
                    margin={[8, 0, 0, -8]}
                    height={"calc(100% - 47px - 8px)"}
                    onScroll={this.handleScroll}
                >
                    <DashboardList dashboards={dashboards} app={app} {...listOptions} />
                </WrapperScrollBar>
                <Loading open={isLoading} />
                <FloatActionButton show actions={actionButtons} onMenuClick={this.handleClick} />
            </main>
        );
    };
}

View.defaultProps = defaultProps;
View.propTypes = propTypes;

const mapStateToProps = (state, ownedProps) => {
    return {
        dashboards: state[REDUCER_NAME] && state[REDUCER_NAME].dashboards,
        isLoading: state[REDUCER_NAME] && state[REDUCER_NAME].isLoading,
        counts: state[REDUCER_NAME] && state[REDUCER_NAME].counts
    };
};

export default connect(
    mapStateToProps,
    null
)(withStyles(styles)(View));
