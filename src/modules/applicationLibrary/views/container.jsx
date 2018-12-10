/*
 * =========================================================================
 *  Copyright (C)2018 NCS Pte. Ltd. All Rights Reserved
 *
 *  This software is confidential and proprietary to NCS Pte. Ltd. You shall
 *  use this software only in accordance with the terms of the license
 *  agreement you entered into with NCS.  No aspect or part or all of this
 *  software may be reproduced, modified or disclosed without full and
 *  direct written authorisation from NCS.
 *
 *  NCS SUPPLIES THIS SOFTWARE ON AN "AS IS" BASIS. NCS MAKES NO
 *  REPRESENTATIONS OR WARRANTIES, EITHER EXPRESSLY OR IMPLIEDLY, ABOUT THE
 *  SUITABILITY OR NON-INFRINGEMENT OF THE SOFTWARE. NCS SHALL NOT BE LIABLE
 *  FOR ANY LOSSES OR DAMAGES SUFFERED BY LICENSEE AS A RESULT OF USING,
 *  MODIFYING OR DISTRIBUTING THIS SOFTWARE OR ITS DERIVATIVES.
 *
 *  =========================================================================
 */
/**
 * Created by LWP on 16/10/2018.
 */
/*
 * @Author: wplei
 * @Date: 2018-11-13 11:16:32
 * @Last Modified by:   wplei
 * @Last Modified time: 2018-11-13 11:16:32
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import AppList from "./appList";
import SearchBar from "./searchBar";
import { REDUCER_NAME } from "../funcs/constants";
import * as Actions from "../funcs/actions";
import store from "commons/store";
import { connect } from "react-redux";
import FloatActionButton from "../components/FloatActionButton";
import { actions as NAVBAR } from "modules/navbar";
import { LoadingModal as Loading } from "./libraryStatics";
import { withStyles } from "@material-ui/core/styles";
import { actions as HEADER } from "modules/header";
import { publish } from "commons/utils/messageBus";
import { WrapperScrollBar } from "modules/ccmsLibrary/views/statics";
import _ from "lodash";

const styles = Theme => {
    return {
        modalRoot: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        },
        listContent: {
            height: "calc(100% - 60px)",
            overflowY: "auto",
            overflowX: "hidden",
            borderRadius: 4
        },
        backDropRootShow: {
            top: Theme.spacing.unit * 17,
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "center"
        },
        backDropRootHide: {},
        typographyColorSecondary: {
            color: Theme.palette.text.hint
        },
        gridListTileTile: {
            overflow: "initial"
        }
    };
};

const defaultProps = {
    open: true, //float action button
    load: true,
    datas: []
};

const propTypes = {
    open: PropTypes.bool.isRequired,
    load: PropTypes.bool.isRequired,
    datas: PropTypes.array.isRequired
};

const groupByCount = (collections, count) => {
    let n = 0;
    let groups = [];
    _.forEach(collections, (c, i) => {
        if (i % count === 0 && i !== 0) n = n + 1;
        groups[n] ? groups[n].push(c) : (groups[n] = [c]);
    });
    return groups;
};

class Container extends Component {
    state = {
        pageLimit: 1,
        loadCount: 15,
        groupedApps: [],
        applications: []
    };
    static getDerivedStateFromProps(nextProps, prevState) {
        const { datas } = nextProps;
        const { loadCount, applications } = prevState;
        if (_.isEqual(datas, applications)) return null;
        const groupedApps = groupByCount(datas, loadCount);
        return {
            groupedApps,
            applications: datas
        };
    }
    componentDidMount = () => {
        store.dispatch(Actions.loadingControl(true));
        store.dispatch(Actions.appRequest());
    };
    componentWillUnmount = () => {
        store.dispatch(Actions.requestSuccess([]));
    };
    handleAppCardActions = (type, options) => {
        switch (type) {
            case "enter":
                // enter application
                const { id, title, app } = options;
                window.location.hash = "/dashboards";
                store.dispatch(NAVBAR.changeNavbarState(1));
                store.dispatch(HEADER.changeHeaderTitle(title));
                store.dispatch(publish("ISC_MSG_BUS", "ISC_MSG_BUS", {}, "messageBus", app["address.name"]));
                sessionStorage.setItem("ISC-APPLICATION-ID", id);
                sessionStorage.setItem("ISC-APPLICATION-INFO", JSON.stringify(app));
                break;
            default:
        }
    };
    handleFloatActions = action => {};
    handleSearch = conditions => {
        const predicates = [];
        for (let key in conditions) {
            predicates.push({
                field: key,
                operator: "LIKE",
                value: conditions[key]
            });
        }
        store.dispatch(Actions.requestSuccess([]));
        store.dispatch(Actions.loadingControl(true));
        store.dispatch(Actions.appRequest(predicates));
    };
    handleScroll = () => event => {
        event.stopPropagation();
        let element = event.target;
        const { groupedApps } = this.state;
        // if (element.scrollTop === 0) return this.setState({ page: this.state.page > 0 ? this.state.page - 1 : 0 });
        if (element.scrollTop + element.clientHeight !== element.scrollHeight) return false;
        const totalPageCount = groupedApps.length;
        const nextPage = this.state.pageLimit + 1;
        const pageLimit = nextPage < totalPageCount ? nextPage : totalPageCount || 1;
        this.setState({
            pageLimit
        });
    };
    render = () => {
        // const { props } = this;
        const { pageLimit, groupedApps } = this.state;
        const { load, classes, cardActions } = this.props;
        const datas = groupedApps.slice(0, pageLimit);
        return (
            <React.Fragment>
                <SearchBar onSearch={this.handleSearch} />
                <WrapperScrollBar
                    padding={[0]}
                    margin={[0, 0, 0, -8]}
                    height={"calc(100% - 64px - 8px)"}
                    onScroll={this.handleScroll}
                >
                    <AppList
                        load={load}
                        datas={datas}
                        classes={classes}
                        cardActions={cardActions}
                        onCardActions={this.handleAppCardActions}
                    />
                </WrapperScrollBar>
                <FloatActionButton
                    show={false}
                    actions={this.props.actionButtons}
                    onMenuClick={this.handleFloatActions}
                />
                <Loading open={load} classes={classes} />
            </React.Fragment>
        );
    };
}
Container.defaultProps = defaultProps;
Container.propTypes = propTypes;

const mapStateToProps = (state, ownedProps) => {
    return {
        datas: state && state[REDUCER_NAME] && state[REDUCER_NAME].datas,
        load: state && state[REDUCER_NAME] && state[REDUCER_NAME].load
    };
};
const mapDIspatchToProps = dispatch => {
    return {};
};

export default connect(
    mapStateToProps,
    mapDIspatchToProps
)(withStyles(styles)(Container));
