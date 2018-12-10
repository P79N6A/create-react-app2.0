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
import { columnsChanged, predicateChanged } from "../funcs/actions";
import { connect } from "react-redux";
import CardContent from "@material-ui/core/CardContent";
import { reducerName as topoMgmtFilterReducerName } from "modules/topologyManagement/topologyMgmtEnhanceFilter";
import FilterConfig from "../filterConfig";
import ExpandFilterInput from "./expandFilterInput";
import ExpandFilterSelect from "./expandFilterSelect";
// import DefaultSearchInput from "./defaultSearchInput";
import { reducerName as topoMgmteducerName } from "modules/topologyManagement/topologyMgmtGrid";

class ExpandFilters extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allFilters: []
        };
    }

    componentWillMount() {
        if (!this.props.filterConfig) {
            return;
        }
        this.renderFilters(this.props);
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.filterConfig) {
            return;
        }
        if (this.props.currentTab !== nextProps.currentTab) {
            this.renderFilters(nextProps);
        }
    }

    renderFilters(props) {
        let filterConfig = !props.currentTab ? props.filterConfig : props.deviceTypeFilterConfig;
        let allFilters = [];
        for (let i = 0; i < filterConfig.length; i++) {
            let expandFilter = {};
            if (FilterConfig.filterConfigs[filterConfig[i].filterName]) {
                expandFilter = {
                    filterConfigType: filterConfig[i].filterName,
                    filterType: FilterConfig.filterConfigs[filterConfig[i].filterName].filterType,
                    defaultValue: filterConfig[i].defaultValue,
                    values: FilterConfig.filterConfigs[filterConfig[i].filterName].values,
                    filterDisplayName: FilterConfig.filterConfigs[filterConfig[i].filterName].filterDisplayName
                };
                allFilters.push(expandFilter);
            }
        }
        this.setState({
            allFilters: allFilters
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (
            JSON.stringify(this.state.allFilters) !== JSON.stringify(nextState.allFilters) ||
            JSON.stringify(this.props.topoTypeDatas) !== JSON.stringify(nextProps.topoTypeDatas) ||
            JSON.stringify(this.props.filterArr) !== JSON.stringify(nextProps.filterArr) ||
            JSON.stringify(this.props.open) !== JSON.stringify(nextProps.open) ||
            this.props.currentTab !== nextProps.currentTab
        ) {
            return true;
        } else {
            return false;
        }
    }

    render() {
        return (
            <CardContent>
                <ul style={{ padding: 0 }}>
                    {/* {this.props.open ? (
                        <li
                            className="filter-list"
                            style={{
                                listStyle: "none",
                                display: "inline-block",
                                maxWidth: "227px",
                                marginRight: "5px"
                            }}
                        >
                            <DefaultSearchInput identify={this.props.identify} filterArr={this.props.filterArr} />
                        </li>
                    ) : null} */}
                    {this.state.allFilters &&
                        this.state.allFilters.map((filter, index) => {
                            return (
                                <li
                                    key={index}
                                    className="filter-list"
                                    style={{
                                        listStyle: "none",
                                        display: "inline-block",
                                        maxWidth: "227px"
                                    }}
                                >
                                    {filter.filterType === "select" ? (
                                        <ExpandFilterSelect
                                            identify={this.props.identify}
                                            filter={filter}
                                            topoTypeDatas={this.props.topoTypeDatas}
                                            filterArr={this.props.filterArr}
                                            filterConfig={this.props.filterConfig}
                                        />
                                    ) : null}
                                    {filter.filterType === "input" && filter.filterConfigType !== "Application ID" ? (
                                        <ExpandFilterInput
                                            identify={this.props.identify}
                                            filter={filter}
                                            filterArr={this.props.filterArr}
                                            filterConfig={this.props.filterConfig}
                                        />
                                    ) : null}
                                </li>
                            );
                        })}
                </ul>
            </CardContent>
        );
    }
}

ExpandFilters.defaultProps = {
    deviceTypeFilterConfig: [
        {
            defaultValue: [],
            filterName: "searchByDevicetype"
        },
        {
            defaultValue: [],
            filterName: "Search By Device Type"
        }
    ]
};

const filterProps = (state, identify, reducerName, props) => {
    if (state[reducerName] && state[reducerName][identify]) {
        return state[reducerName][identify][props];
    }
};

const mapStateToProps = (state, ownProps) => {
    let identify = ownProps.identify;
    return {
        filterConfig: filterProps(state, identify, topoMgmtFilterReducerName, "filterConfig"),
        topoTypeDatas: filterProps(state, identify, topoMgmtFilterReducerName, "topoTypeDatas"),
        filterArr: filterProps(state, identify, topoMgmtFilterReducerName, "filterArr"),
        currentTab:
            state[topoMgmteducerName] &&
            state[topoMgmteducerName][identify] &&
            state[topoMgmteducerName][identify].currentTab
    };
};

const mapDispatchToProps = dispatch => {
    return {
        columnsChanged: (identify, currentCheck) => {
            dispatch(columnsChanged(identify, currentCheck));
        },
        predicateChanged: (identify, predicate, filterArr) => {
            dispatch(predicateChanged(identify, predicate, filterArr));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ExpandFilters);
