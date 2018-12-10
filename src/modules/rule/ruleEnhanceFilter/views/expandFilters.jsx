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
import { columnsChanged } from "../funcs/actions";
import { connect } from "react-redux";
import CardContent from "@material-ui/core/CardContent";
import { reducerName as ruleFilterReducerName } from "modules/rule/ruleEnhanceFilter";
import FilterConfig from "../filterConfig";
import ExpandFilterInput from "./expandFilterInput";
import ExpandFilterSelect from "./expandFilterSelect";
import DefaultSearchInput from "./defaultSearchInput";
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
        let filterConfig =  _.cloneDeep(this.props.filterConfig);
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
            JSON.stringify(this.props.ruleTypeDatas) !== JSON.stringify(nextProps.ruleTypeDatas) || 
            JSON.stringify(this.props.filterArr) !== JSON.stringify(nextProps.filterArr)
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
                    {this.props.open ? (
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
                    ) : null}
                    {this.state.allFilters &&
                        this.state.allFilters.map((filter, index) => {
                            let isName = filter.filterConfigType === "Rule Name" ? true : false;
                            return (
                                <li
                                    key={index}
                                    style={{ listStyle: "none", display: "inline-block", maxWidth: isName ? "237px" : "227px" }}
                                >
                                    {filter.filterType === "select" ? (
                                        <ExpandFilterSelect
                                            identify={this.props.identify}
                                            filter={filter}
                                            ruleTypeDatas={this.props.ruleTypeDatas}
                                            filterArr={this.props.filterArr}
                                            filterConfig={this.props.filterConfig}
                                        />
                                    ) : null}
                                    {filter.filterType === "input" ? (
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

const filterProps = (state, identify, reducerName, props) => {
    if (state[reducerName] && state[reducerName][identify]) {
        return state[reducerName][identify][props];
    }
};

const mapStateToProps = (state, ownProps) => {
    let identify = ownProps.identify;
    return {
        filterConfig: filterProps(state, identify, ruleFilterReducerName, "filterConfig"),
        ruleTypeDatas: filterProps(state, identify, ruleFilterReducerName, "ruleTypeDatas"),
        filterArr: filterProps(state, identify, ruleFilterReducerName, "filterArr")
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
