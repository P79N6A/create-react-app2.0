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
import PropTypes from "prop-types";
import CardContent from "@material-ui/core/Card";
import "../styles/style.less";
import { connect } from "react-redux";
import { ruleRequest, deleteRule} from "../funcs/actions";
import { controlNotificationConfig, controlWorkflowConfig } from "modules/rule/ruleFloatTab/funcs/actions";
import { reducerName as ruleReducerName } from "modules/rule/ruleGrid";
import { reducerName as ruleFilterReducerName } from "modules/rule/ruleEnhanceFilter";
import RuleTab from "./ruleTabs";
class RuleCont extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            columnConfig: this.props.columnConfig
        };
        if (!this.props.isPending) {
            let currentOrderBy = {orderBy: this.props.orderBy, sort: this.props.orderDirection};
            this.props.searchRuleData(
                this.props.pageNo,
                this.props.pageLimit,
                this.props.sitename,
                "cep-rules",
                this.props.submodulename,
                this.props.identify,
                this.props.predicates,
                currentOrderBy,
                this.props.orderDisplayName,
                this.props.orderDirection
            );
        }
    }
    handleDeleteRule(selected){
        const { identify, sitename, modulename, pageLimit, orderDirection, orderDisplayName } = this.props;
        let emailConfig = [];
        let smsConfig = [];
        let bpmConfig = [];
        let ruleConfig = [];
        for(let i=0; i<selected.length;i++){
            // this.props.deleteRule(sitename, selected[i], pageLimit, orderDirection, orderDisplayName, identify);
            ruleConfig = ruleConfig.concat(selected[i]);
            emailConfig = emailConfig.concat(`emailsubject.${selected[i]}`,`emailtemplate.${selected[i]}`,`mailinglist.${selected[i]}`);
            smsConfig = smsConfig.concat(`message-template.${selected[i]}`,`recipients-list.${selected[i]}`);
            bpmConfig = bpmConfig.concat(`api-config.${selected[i]}`);
        }
        const emailConfigs = emailConfig;
        const smsConfigs = smsConfig;
        const notificationConfigs = {emailConfigs,smsConfigs};
        const bpmConfigs = {
            sitename:this.props.sitename,
            submodulename: "action-api",
            confignames: bpmConfig
        };
        const ruleConfigs = {"configs":ruleConfig};
        this.props.controlNotificationConfig(notificationConfigs, "delete", identify);
        this.props.controlWorkflowConfig(bpmConfigs, "delete", identify);
        this.props.deleteRule(sitename, modulename, this.props.submodulename, ruleConfigs, pageLimit, orderDirection, orderDisplayName, identify);
    }
    searchRuleFunc(pageNo, pageLimit) {
        if (this.props.isPending) {
            return;
        }
        let currentOrderBy = {orderBy: this.props.orderBy, sort: this.props.orderDirection};
        this.props.searchRuleData(
            pageNo,
            pageLimit,
            this.props.sitename,
            this.props.modulename,
            this.props.submodulename,
            this.props.identify,
            this.props.predicates,
            currentOrderBy,
            this.props.orderDisplayName,
            this.props.orderDirection
        );
    }

    componentWillReceiveProps(nextProps) {
        if (
            this.props.pageNo !== nextProps.pageNo ||
            this.props.pageLimit !== nextProps.pageLimit ||
            JSON.stringify(this.props.predicates) !== JSON.stringify(nextProps.predicates) ||
            this.props.multipleSelect !== nextProps.multipleSelect ||
            this.props.orderBy !== nextProps.orderBy ||
            this.props.orderDirection !== nextProps.orderDirection ||
            (this.props.refreshRule !== nextProps.refreshRule && nextProps.refreshRule) ||
            this.props.currentTab !== nextProps.currentTab
        ) {
            let currentOrderBy = {orderBy: nextProps.orderBy, sort: nextProps.orderDirection};
            this.checkSearchFunc(
                nextProps.pageNo,
                nextProps.pageLimit,
                this.props.sitename,
                this.props.identify,
                nextProps.predicates,
                currentOrderBy,
                nextProps.orderDisplayName,
                nextProps.orderDirection,
                nextProps.currentTab
            );
        }

        if (this.props.currentCheckColumns !== nextProps.currentCheckColumns) {
            this.setState({
                columnConfig: JSON.parse(nextProps.currentCheckColumns)
            });
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (
            this.props.pageNo !== nextProps.pageNo ||
            this.props.pageLimit !== nextProps.pageLimit ||
            this.props.predicates !== nextProps.predicates ||
            this.props.multipleSelect !== nextProps.multipleSelect ||
            this.props.datas !== nextProps.datas ||
            this.props.currentCheckColumns !== nextProps.currentCheckColumns ||
            this.props.orderBy !== nextProps.orderBy ||
            this.props.orderDirection !== nextProps.orderDirection ||
            (this.props.refreshRule !== nextProps.refreshRule && nextProps.refreshRule)
        ) {
            return true;
        } else {
            return false;
        }
    }
    checkSearchFunc(
        pageNo,
        pageLimit,
        sitename,
        identify,
        predicate,
        sortConfig,
        orderDisplayName,
        orderDirection,
        currentTab
    ) {
        // let props = nextProps ? nextProps : this.props;
        if (!currentTab) {
            this.props.searchRuleData(
                pageNo,
                pageLimit,
                sitename,
                "cep-rules",
                this.props.submodulename,
                identify,
                predicate,
                sortConfig,
                orderDisplayName,
                orderDirection
            );
        } else {
            this.props.searchRuleData(
                pageNo,
                pageLimit,
                sitename,
                "cep-system-rules",
                this.props.submodulename,
                identify,
                predicate,
                sortConfig,
                orderDisplayName,
                orderDirection
            );
        }
    }
    render() {
        return (
            <CardContent className="rule-lists">
                {this.props.ruleDisplayType === "List" ? (
                    <RuleTab
                        identify={this.props.identify}
                        columnConfig={this.state.columnConfig}
                        datas={this.props.datas}
                        pagination={this.props.pagination}
                        searchRuleFunc={this.searchRuleFunc.bind(this)}
                        multipleSelect={this.props.multipleSelect}
                        deleteRule={this.handleDeleteRule.bind(this)}
                        changeAddMode={this.props.changeAddMode}
                    />
                ) : null}
            </CardContent>
        );
    }
}

RuleCont.propTypes = {
    pageNo: PropTypes.number.isRequired,
    pageLimit: PropTypes.number.isRequired,
    ruleDisplayType: PropTypes.string.isRequired,
    datas: PropTypes.array.isRequired,
    pagination: PropTypes.object.isRequired,
    columnConfig: PropTypes.array
};

RuleCont.defaultProps = {
    pageNo: 1,
    pageLimit: 10,
    orderDisplayName: "Rule Name",
    datas: [],
    pagination: {
        totalrecords: 0,
        limit: 10,
        currentpage: 1
    }
};

const filterProps = (state, identify, reducerName, props) => {
    if (state[reducerName] && state[reducerName][identify]) {
        return state[reducerName][identify][props];
    }
};

const mapStateToProps = (state, ownProps) => {
    let identify = ownProps.identify;
    return {
        predicates: filterProps(state, identify, ruleFilterReducerName, "predicate"),
        currentCheckColumns: filterProps(state, identify, ruleFilterReducerName, "currentCheckColumns"),
        refreshRule: filterProps(state, identify, ruleFilterReducerName, "refreshRule"),
        datas: filterProps(state, identify, ruleReducerName, "arrayData"),
        pagination: filterProps(state, identify, ruleReducerName, "pagination"),
        isPending: filterProps(state, identify, ruleReducerName, "isPending"),
        pageLimit: filterProps(state, identify, ruleReducerName, "pageLimit")|| ownProps.pageLimit,
        orderBy: filterProps(state, identify, ruleReducerName, "orderBy")|| ownProps.orderBy,
        orderDirection: filterProps(state, identify, ruleReducerName, "orderDirection")||ownProps.orderDirection,
        orderDisplayName:
            filterProps(state, identify, ruleReducerName, "orderDisplayName") || ownProps.orderDisplayName,
        currentTab: filterProps(state, identify, ruleReducerName, "currentTab")
    };
};

const mapDispatchToProps = dispatch => {
    return {
        searchRuleData: (pageNo, pageLimit, sitename, modulename, submodulename, identify, predicate, sortConfig, orderDisplayName, orderDirection) => {
            dispatch(ruleRequest(pageNo, pageLimit, sitename, modulename, submodulename, identify, predicate, sortConfig, orderDisplayName, orderDirection));
        },
        deleteRule: (sitename, modulename, submodulename, config, pageLimit, orderDirection, orderDisplayName, identify) => {
            dispatch(deleteRule(sitename, modulename, submodulename, config, pageLimit, orderDirection, orderDisplayName, identify));
        },
        // mutilDeleteRule: (sitename, config, pageLimit, orderDirection, orderDisplayName, identify) => {
        //     dispatch(mutilDeleteRule(sitename, config, pageLimit, orderDirection, orderDisplayName, identify));
        // },
        controlNotificationConfig: (notificationConfig, type, identify) => {
            dispatch(controlNotificationConfig(notificationConfig, type, identify));
        },
        controlWorkflowConfig: (workflowConfig, type, identify) => {
            dispatch(controlWorkflowConfig(workflowConfig, type, identify));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RuleCont);
