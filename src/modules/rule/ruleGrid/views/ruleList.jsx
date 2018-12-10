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
import PropTypes from "prop-types";
import Table from "@material-ui/core/Table";
import RuleListHeader from "./ruleListHeader";
import RuleListPagination from "./ruleListPagination";
import { prepareDefaultColumns, prepareRenderDatas } from "../funcs/renderListColumnsFunc";
import RuleListBody from "./ruleListBody";
import { reducerName as ruleReducerName } from "modules/rule/ruleGrid";
import { connect } from "react-redux";
import { reducerName as ruleFloatTabReducer } from "modules/rule/ruleFloatTab";
import SelectedRowInfo from "./selectedRowInfo";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import { I18n } from "react-i18nify"; 

class RuleList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            datas: [],
            defaultColumns: [],
            pagination: this.props.pagination,
            selected: [],
            multipleSelect: this.props.multipleSelect
        };
    }

    componentWillMount() {
        this.componentWillReceiveProps(this.props);
    }

    componentWillReceiveProps(nextProps) {
        let arrayData = nextProps.datas;
        let columnConfig = nextProps.columnConfig;
        let selected = nextProps.selected || [];
        let multipleSelect = nextProps.multipleSelect;
        if (!arrayData || !columnConfig || !selected) { 
            // (!nextProps.checkedTab && nextProps.searchType !== "userRule") ||
            // (nextProps.checkedTab && nextProps.searchType !== "systemRule")) {
            return;
        }
        this.prepareDataAndColumns(arrayData, columnConfig, nextProps.pagination);
        this.setState(
            Object.assign(this.state, {
                selected: selected,
                multipleSelect: multipleSelect
            })
        );
    }

    prepareDataAndColumns(arrayData, columnConfig, pagination) {
        let defaultColumns = prepareDefaultColumns(columnConfig);
        let datas = prepareRenderDatas(arrayData, defaultColumns);

        this.setState(
            Object.assign(this.state, {
                datas: datas,
                defaultColumns: defaultColumns,
                pagination: pagination
            })
        );
    }
    
    handleSelectAllClick = (event, checked) => {
        if (checked) {
            this.setState(
                Object.assign(this.state, {
                    selected: this.state.datas.map(data => data.key)
                })
            );
            return;
        }
        this.setState(
            Object.assign(this.state, {
                selected: []
            })
        );
    };
    handleDeleteRule(selected){
        this.props.deleteRule(selected);
    }
    render() {
        const { datas, defaultColumns, pagination, selected, multipleSelect } = this.state;
        const { refreshRuleSuccess, refreshRuleFloatSuccess } = this.props;
        return (
            <div className="rule-list">
                <div className="rule-list-wrap">
                    {selected.length > 0 && multipleSelect ? <SelectedRowInfo selected={selected} deleteRule={this.handleDeleteRule.bind(this)}/> : null}
                    <Table className="rule-list-table">
                        {defaultColumns ? (
                            <RuleListHeader
                                identify={this.props.identify}
                                defaultColumns={defaultColumns}
                                onSelectAllClick={this.handleSelectAllClick.bind(this)}
                                numSelected={selected.length}
                                rowCount={datas.length}
                                multipleSelect={multipleSelect}
                                changeAddMode={this.props.changeAddMode}
                            />
                        ) : null}
                        {datas && defaultColumns ? (
                            <RuleListBody
                                identify={this.props.identify}
                                datas={datas}
                                defaultColumns={defaultColumns}
                                checked={selected}
                                multipleSelect={multipleSelect}
                                pagination={pagination}
                                changeAddMode={this.props.changeAddMode}
                            />
                        ) : null}
                    </Table>
                    {!refreshRuleSuccess || (refreshRuleFloatSuccess!==undefined && !refreshRuleFloatSuccess)? (
                        <div className="progress-cont">
                            <CircularProgress color="secondary" />
                        </div>
                    ) :datas && datas.length > 0 ? null : (
                        <Typography variant="caption" gutterBottom align="center" className="no-data">
                            {I18n.t("rule.common.emptyMsg")}
                        </Typography>
                    )}
                </div>
                {pagination ? (
                    <RuleListPagination
                        identify={this.props.identify}
                        pagination={pagination}
                        searchRuleFunc={this.props.searchRuleFunc}
                    />
                ) : null}
            </div>
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
        selected: filterProps(state, identify, ruleReducerName, "multipleSelected"),
        refreshRuleSuccess: filterProps(state, identify, ruleReducerName, "refreshRuleSuccess"),
        refreshRuleFloatSuccess: filterProps(state, identify, ruleFloatTabReducer, "refreshRuleFloatSuccess"),
        // searchType: filterProps(state, identify, ruleReducerName, "searchType")
    };
};
RuleList.defaultProps = {
    selected:[],
    refreshRuleSuccess: true,
    refreshRuleFloatSuccess: true
};
RuleList.propTypes = {
    selected: PropTypes.array,
    refreshRuleSuccess: PropTypes.bool,
    refreshRuleFloatSuccess: PropTypes.bool
};

export default connect(
    mapStateToProps,
    null
)(RuleList);
