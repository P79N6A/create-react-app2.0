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
// import FilterListIcon from "@material-ui/icons/FilterList";
// import RefreshIcon from "@material-ui/icons/Refresh";
import { withStyles } from "@material-ui/core/styles";
// import DefaultSearchInput from "./defaultSearchInput";
import ColumnsFilter from "./columnsFilter";
import ExpandFilters from "./expandFilters";
import Collapse from "@material-ui/core/Collapse";
import Card from "@material-ui/core/Card";
import { reducerName as topoReducerName } from "modules/application/applicationGrid";
import CardHeader from "@material-ui/core/CardHeader";
import { searchDeviceType, refreshTopology } from "../funcs/actions";
import { predicateChanged } from "../funcs/actions";
import { CreatedPredicate } from "../funcs/createPredicate";
import FilterConfig from "../filterConfig";
// import TextureIcon from "@material-ui/icons/Texture";
// import ListIcon from "@material-ui/icons/FormatListBulleted";
// import ViewModuleIcon from "@material-ui/icons/ViewModule";
// import TopologyConfig from "../../topologyConfig";
// import AddIcon from "@material-ui/icons/Add";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import _ from "lodash";
import { reducerName as appTreeReducer } from "modules/application/topologyTree";

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
            refresh: false,
            disableAdd: false
        };
    }

    componentWillMount() {
        this.props.searchDeviceType(this.props.identify);
        let currentFilterArr = this.props.filterArr || [];
        let filterConfig = this.props.filterConfig;
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
            if (allFilters[j].defaultValue.length && allFilters[j].defaultValue) {
                var { predicate, filterArr } = CreatedPredicate(
                    allFilters[j].defaultValue,
                    allFilters[j].filterConfigType,
                    currentFilterArr
                );
            }
        }
        this.props.predicateChanged(this.props.identify, predicate, filterArr);
    }

    handleExpandFilters() {
        this.setState({ expanded: !this.state.expanded });
    }

    handleRefreshClick() {
        this.props.refreshTopology(this.props.identify, true);
    }

    handleAddClick() {
        this.props.topoMgmtAdd(this.props.identify);
    }

    componentWillReceiveProps(nextProps) {
        if (_.isEqual(nextProps, this.props)) {
            return;
        }
        const { selectedData } = nextProps || {},
            { resourcetype } = selectedData || {},
            disableAdd = resourcetype === "device" ? true : false;
        this.setState({
            columnConfig: nextProps.columnConfig,
            disableAdd
        });
        if (nextProps.refreshTopologySuccess) {
            this.props.refreshTopology(this.props.identify, false);
        }
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
        const { disableAdd } = this.state;
        // const type = this.props.topoDisplayType === "List" ? "Table" : "List";
        return (
            <Card>
                <CardHeader
                    action={
                        <div style={{ display: "-ms-flexbox" }}>
                            {/* <div className="right-item" style={{display:"-ms-flexbox"}}>
                                {this.state.expanded ? null : (
                                    <DefaultSearchInput
                                        identify={this.props.identify}
                                        filterArr={this.props.filterArr}
                                    />
                                )}
                            </div> */}
                            <div className="right-item">
                                <Tooltip title="Add Application">
                                    <IconButton
                                        aria-label="Add"
                                        onClick={this.handleAddClick.bind(this)}
                                        disabled={disableAdd}
                                    >
                                        <FontAwesomeIcon icon={faPlus} size="xs" />
                                        {/* <AddIcon /> */}
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
                                <Tooltip title="Refresh">
                                    <IconButton aria-label="Refresh" onClick={this.handleRefreshClick.bind(this)}>
                                        <RefreshIcon />
                                    </IconButton>
                                </Tooltip>
                            </div> */}
                        </div>
                    }
                    title={this.props.title}
                    subheader={this.props.subTitle}
                />
                <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                    <ExpandFilters
                        identify={this.props.identify}
                        filterArr={this.props.filterArr}
                        open={this.state.expanded}
                    />
                </Collapse>
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
        selectedData: filterProps(state, identify, appTreeReducer, "selectedNode"),
        topoDisplayType: filterProps(state, identify, topoReducerName, "topoDisplayType") || ownProps.topoDisplayType
        // refreshTopologySuccess: filterProps(state, identify, topoReducerName, "refreshTopologySuccess")
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
