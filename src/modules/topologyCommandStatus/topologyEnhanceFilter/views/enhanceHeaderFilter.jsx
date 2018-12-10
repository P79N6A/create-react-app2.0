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
 * Created by xulu on 25/05/2018.
 */
import React from "react";
import "../styles/style.less";
import { connect } from "react-redux";
import { REDUCER_NAME as topoFilterReducer } from "../funcs/constants";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import FilterListIcon from "@material-ui/icons/FilterList";
import RefreshIcon from "@material-ui/icons/Refresh";
import { withStyles } from "@material-ui/core/styles";
import DefaultSearchInput from "./defaultSearchInput";
import ColumnsFilter from "./columnsFilter";
import ExpandFilters from "./expandFilters";
// import Collapse from "@material-ui/core/Collapse";
import Card from "@material-ui/core/Card";
import { reducerName as topoReducerName } from "../../topologyGrid";
import CardHeader from "@material-ui/core/CardHeader";
import { searchDeviceType, refreshTopology } from "../funcs/actions";
import { predicateChanged } from "../funcs/actions";
import { CreatedPredicate } from "../funcs/createPredicate";
import FilterConfig from "../filterConfig";
// import TextureIcon from "@material-ui/icons/Texture";
// import ListIcon from "@material-ui/icons/FormatListBulleted";
// import ViewModuleIcon from "@material-ui/icons/ViewModule";
import TopologyConfig from "../../topologyConfig";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import _ from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faRedo } from "@fortawesome/free-solid-svg-icons";

const toolbarStyles = theme => ({
    root: {
        paddingRight: theme.spacing.unit
    },
    spacer: {
        flex: "1 1 100%"
    },
    actions: {
        color: theme.palette.text.secondary
    },
    title: {
        flex: "0 0 auto"
    }
});

class enhanceHeaderFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            columnConfig: this.props.columnConfig,
            refresh: false
        };
    }

    componentWillMount(nextProps) {
        // this.props.searchDeviceType(this.props.identify);
        let props = nextProps ? nextProps : this.props;
        let currentFilterArr = props.filterArr || [];
        let filterConfig = _.cloneDeep(props.filterConfig);
        let allFilters = [];
        for (let i = 0; i < filterConfig.length; i++) {
            let expandFilter = {};
            if (FilterConfig.filterConfigs[filterConfig[i].filterName]) {
                expandFilter = {
                    filterConfigType: filterConfig[i].filterName,
                    filterType: FilterConfig.filterConfigs[filterConfig[i].filterName].filterType,
                    defaultValue: filterConfig[i].defaultValue,
                    values: FilterConfig.filterConfigs[filterConfig[i].filterName].values
                };
                allFilters.push(expandFilter);
            }
        }
        for (let j = 0; j < allFilters.length; j++) {
            var { predicate, filterArr } = CreatedPredicate(
                allFilters[j].defaultValue,
                allFilters[j].filterConfigType,
                currentFilterArr,
                true
            );
        }
        this.props.predicateChanged(this.props.identify, predicate, filterArr);
    }

    handleExpandFilters() {
        this.setState({ expanded: !this.state.expanded });
    }

    handleRefreshClick() {
        this.props.refreshTopology(this.props.identify, true);
    }

    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(this.props.columnConfig) !== JSON.stringify(nextProps.columnConfig)) {
            this.setState(
                Object.assign(this.state, {
                    columnConfig: nextProps.columnConfig
                })
            );
        }
        if (nextProps.refreshTopologySuccess) {
            this.props.refreshTopology(this.props.identify, false);
        }
        if (this.props.filterConfig !== nextProps.filterConfig) {
            this.componentWillMount(nextProps);
        }
    }

    handleToggleViewClick() {
        let topoDisplayType = "";
        let widgetTitle = "";
        let viewConfig = TopologyConfig.topologyView;

        if (this.props.topoDisplayType === "List") {
            topoDisplayType = "Table";
        } else if (this.props.topoDisplayType === "Table") {
            topoDisplayType = "List";
        }
        for (let i = 0; i < viewConfig.length; i++) {
            if (topoDisplayType === viewConfig[i].topoDisplayType) {
                widgetTitle = viewConfig[i].viewDisplayName;
            }
        }
        this.props.changeTopoDisplayType(this.props.identify, topoDisplayType, widgetTitle);
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     if (
    //         JSON.stringify(this.props) !== JSON.stringify(nextProps) ||
    //         JSON.stringify(this.state) !== JSON.stringify(nextState)
    //     ) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }

    render() {
        const { classes, topoDisplayType } = this.props;
        // const type = this.props.topoDisplayType === "List" ? "Table" : "List";
        return (
            <Card>
                <CardHeader
                    action={
                        <div style={{ display: "-ms-flexbox" }}>
                            <div className="right-item" style={{ display: "-ms-flexbox" }}>
                                {this.state.expanded ? null : (
                                    <DefaultSearchInput
                                        identify={this.props.identify}
                                        filterArr={this.props.filterArr}
                                    />
                                )}
                            </div>
                            <div className="right-item">
                                <Tooltip title="Filter list">
                                    <IconButton aria-label="Filter list" onClick={this.handleExpandFilters.bind(this)}>
                                        {/* <FilterListIcon /> */}
                                        <FontAwesomeIcon icon={faFilter} size="xs" />
                                    </IconButton>
                                </Tooltip>
                            </div>
                            <div className="right-item">
                                {topoDisplayType === "List" ? (
                                    <ColumnsFilter
                                        style={{ display: "inline-block" }}
                                        className={classes.actions}
                                        identify={this.props.identify}
                                        columnConfig={this.state.columnConfig}
                                    />
                                ) : null}
                            </div>
                            {/* <div className="right-item">
                                <Tooltip title={`Toggle ${type}`}>
                                    <IconButton
                                        aria-label={`Toggle ${type}`}
                                        onClick={this.handleToggleViewClick.bind(this)}
                                    >
                                        {type === "List" ? <ListIcon /> : <ViewModuleIcon />}
                                    </IconButton>
                                </Tooltip>
                            </div> */}
                            <div className="right-item">
                                <Tooltip title="Refresh">
                                    <IconButton aria-label="Refresh" onClick={this.handleRefreshClick.bind(this)}>
                                        {/* <RefreshIcon /> */}
                                        <FontAwesomeIcon icon={faRedo} size="xs" />
                                    </IconButton>
                                </Tooltip>
                            </div>
                        </div>
                    }
                    title={this.props.title}
                    subheader={this.props.subTitle}
                />
                {/* <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                    <ExpandFilters
                        identify={this.props.identify}
                        filterArr={this.props.filterArr}
                        open={this.state.expanded}
                    />
                </Collapse> */}

                <Fade
                    className="fadeBox"
                    in={this.state.expanded}
                    {...(this.state.expanded ? { style: { display: "block" } } : { style: { display: "none" } })}
                >
                    <Paper>
                        <ExpandFilters
                            identify={this.props.identify}
                            filterArr={this.props.filterArr}
                            open={this.state.expanded}
                        />
                    </Paper>
                </Fade>
            </Card>
        );
    }
}

enhanceHeaderFilter.defaultProps = {};

const filterProps = (state, identify, reducerName, props) => {
    if (state[reducerName] && state[reducerName][identify]) {
        return state[reducerName][identify][props];
    }
};

const mapStateToProps = (state, ownProps) => {
    let identify = ownProps.identify;
    return {
        filterArr: filterProps(state, identify, topoFilterReducer, "filterArr"),
        columnConfig: filterProps(state, identify, topoReducerName, "columnConfig"),
        topoDisplayType: filterProps(state, identify, topoReducerName, "topoDisplayType") || ownProps.topoDisplayType,
        filterConfig: filterProps(state, identify, topoReducerName, "filterConfig"),
        refreshTopologySuccess: filterProps(state, identify, topoReducerName, "refreshTopologySuccess")
    };
};

const mapDispatchToProps = dispatch => {
    return {
        searchDeviceType: identify => {
            dispatch(searchDeviceType(identify));
        },
        predicateChanged: (identify, predicate, filterArr) => {
            dispatch(predicateChanged(identify, predicate, filterArr));
        },
        refreshTopology: (identify, refresh) => {
            dispatch(refreshTopology(identify, refresh));
        }
    };
};

export default connect(
    mapStateToProps.bind(this),
    mapDispatchToProps
)(withStyles(toolbarStyles)(enhanceHeaderFilter));
