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
 * Created by wangrui on 22/06/2018.
 */
import React from "react";
import "../styles/style.less";
import { connect } from "react-redux";
import { REDUCER_NAME as ruleFilterReducer } from "../funcs/constants";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import RefreshIcon from "@material-ui/icons/Refresh";
import { withStyles } from "@material-ui/core/styles";
import DefaultSearchInput from "./defaultSearchInput";
import ColumnsFilter from "./columnsFilter";
import ExpandFilters from "./expandFilters";
// import Collapse from "@material-ui/core/Collapse";
import Card from "@material-ui/core/Card";
import { reducerName as ruleReducerName } from "modules/rule/ruleGrid";
import CardHeader from "@material-ui/core/CardHeader";
import { predicateChanged, refreshRule } from "../funcs/actions";
import { CreatedPredicate } from "../funcs/createPredicate";
import FilterConfig from "../filterConfig";
import { I18n } from "react-i18nify"; 
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import _ from "lodash";
import classnames from "classnames";
import { FullScreenButton } from "modules/ccms/components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faPlus } from "@fortawesome/free-solid-svg-icons";

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
            columnConfig: this.props.columnConfig
        };
    }

    componentWillMount(nextProps) {
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
    handleAddRules() {
        const addMode = true;
        this.props.changeAddMode(addMode, this.props.identify);
        this.props.openAddFloatTab(this.props.identify);
    }
    handleRefreshClick() {
        this.props.refreshRule(this.props.identify, true);
    }
    componentWillReceiveProps(nextProps) {
        this.setState(
            Object.assign(this.state, {
                columnConfig: nextProps.columnConfig
            })
        );
        if (nextProps.refreshRuleSuccess) {
            this.props.refreshRule(this.props.identify, false);
        }
        if (this.props.filterConfig !== nextProps.filterConfig) {
            this.componentWillMount(nextProps);
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }

    render() {
        const { classes, ruleDisplayType } = this.props;
        return (
            <Card>
                <CardHeader
                    action={
                        <div style={{ display: "-ms-flexbox" }}>
                            <div className="right-item" style={{ display: "-ms-flexbox" }}>
                                <DefaultSearchInput identify={this.props.identify} filterArr={this.props.filterArr} />
                            </div>
                            <div className={classnames("addRule", "right-item")} style={{ display: "-ms-flexbox" }}>
                                <Tooltip title={I18n.t("rule.common.addRule")} >
                                    <IconButton aria-label={I18n.t("rule.common.addRule")} onClick={event => this.handleAddRules()}>
                                        <FontAwesomeIcon icon={faPlus} size="xs" />
                                        {/* <AddIcon /> */}
                                    </IconButton>
                                </Tooltip>
                            </div>
                            {/* <div className="right-item">
                                <Tooltip title="Filter list">
                                    <IconButton aria-label="Filter list" onClick={this.handleExpandFilters.bind(this)}>
                                        <FilterListIcon />
                                    </IconButton>
                                </Tooltip>
                            </div> */}
                            <div className="right-item">
                                {ruleDisplayType === "List" ? (
                                    <ColumnsFilter
                                        style={{ display: "inline-block" }}
                                        className={classes.actions}
                                        identify={this.props.identify}
                                        columnConfig={this.state.columnConfig}
                                    />
                                ) : null}
                            </div>
                            <div className={classnames("filters", "right-item")} style={{ display: "inline-block" }}>
                                <Tooltip title={I18n.t("rule.common.refresh")}>
                                    <IconButton aria-label={I18n.t("rule.common.refresh")} onClick={this.handleRefreshClick.bind(this)}>
                                        {/* <RefreshIcon /> */}
                                        <FontAwesomeIcon icon={faFilter} size="xs" />
                                    </IconButton>
                                </Tooltip>
                            </div>
                            {this.props.fullScreen && <div className={classnames("full", "right-item")} style={{ display: "inline-block" }}>
                                <Tooltip title={I18n.t("rule.common.fullScreen")}>
                                    <FullScreenButton {...this.props} />
                                </Tooltip>
                            </div>}
                        </div>
                    }
                    title={this.props.title}
                    subheader={this.props.subTitle}
                />
                {/* <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                    <ExpandFilters identify={this.props.identify} filterArr={this.props.filterArr} />
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
        filterArr: filterProps(state, identify, ruleFilterReducer, "filterArr"),
        columnConfig: filterProps(state, identify, ruleReducerName, "columnConfig"),
        filterConfig: filterProps(state, identify, ruleReducerName, "filterConfig")
    };
};

const mapDispatchToProps = dispatch => {
    return {
        predicateChanged: (identify, predicate, filterArr) => {
            dispatch(predicateChanged(identify, predicate, filterArr));
        },
        refreshRule: (identify, refresh) => {
            dispatch(refreshRule(identify, refresh));
        }
    };
};

export default connect(
    mapStateToProps.bind(this),
    mapDispatchToProps
)(withStyles(toolbarStyles)(enhanceHeaderFilter));
