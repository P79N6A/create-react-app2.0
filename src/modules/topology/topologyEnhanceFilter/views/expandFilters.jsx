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
import { columnsChanged } from "../funcs/actions";
import { connect } from "react-redux";
import CardContent from "@material-ui/core/CardContent";
import { reducerName as topoFilterReducerName } from "modules/topology/topologyEnhanceFilter";
import FilterConfig from "../filterConfig";
import ExpandFilterInput from "./expandFilterInput";
import ExpandFilterSelect from "./expandFilterSelect";
// import DefaultSearchInput from "./defaultSearchInput";
import _ from "lodash";

class ExpandFilters extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allFilters: []
        };
    }

    renderFilters(index, filter) {}
    componentWillMount() {
        if (!this.props.filterConfig) {
            return;
        }
        let filterConfig = _.cloneDeep(this.props.filterConfig);
        let defaultSearchFilter = _.cloneDeep(this.props.defaultSearchFilter);
        let newFilterArr = defaultSearchFilter.concat(filterConfig);
        let allFilters = [];
        for (let i = 0; i < newFilterArr.length; i++) {
            let expandFilter = {};
            let filter = newFilterArr[i];
            if (FilterConfig.filterConfigs[filter.filterName]) {
                expandFilter = {
                    filterConfigType: filter.filterName,
                    filterType: FilterConfig.filterConfigs[filter.filterName].filterType,
                    defaultValue: filter.defaultValue,
                    values: FilterConfig.filterConfigs[filter.filterName].values,
                    filterDisplayName: FilterConfig.filterConfigs[filter.filterName].filterDisplayName
                };
                //FilterConfig.filterConfigs[filterConfig[i].filterName].values
                allFilters.push(expandFilter);
            }
        }
        this.setState({
            allFilters: allFilters
        });
    }
    componentWillReceiveProps(nextProps) {
        if (!nextProps.filterConfig) {
            return;
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (
            JSON.stringify(this.state.allFilters) !== JSON.stringify(nextState.allFilters) ||
            JSON.stringify(this.props.topoTypeDatas) !== JSON.stringify(nextProps.topoTypeDatas) ||
            JSON.stringify(this.props.filterArr) !== JSON.stringify(nextProps.filterArr) ||
            JSON.stringify(this.props.open) !== JSON.stringify(nextProps.open)
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
    defaultSearchFilter: [
        {
            filterName: "searchByPathandName",
            filterType: "input",
            values: [],
            defaultValue: ""
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
        filterConfig: filterProps(state, identify, topoFilterReducerName, "filterConfig"),
        topoTypeDatas: filterProps(state, identify, topoFilterReducerName, "topoTypeDatas"),
        filterArr: filterProps(state, identify, topoFilterReducerName, "filterArr")
    };
};

const mapDispatchToProps = dispatch => {
    return {
        columnsChanged: (identify, currentCheck) => {
            dispatch(columnsChanged(identify, currentCheck));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ExpandFilters);
