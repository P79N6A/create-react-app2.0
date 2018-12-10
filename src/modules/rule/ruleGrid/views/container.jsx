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
import { connect } from "react-redux";
import "../styles/style.less";
import RuleCont from "./ruleCont";
import { view as FloatTab } from "modules/rule/ruleFloatTab";
import {
    ccmsControl,
    closeFloatTab,
    storeColumnsAndFilters,
    openAddFloatTab,
    changeAddMode,
    getRuleSchema,
    getActionSchema,
    initAllRedux,
    getActionContent
} from "../funcs/actions";
import Card from "@material-ui/core/Card";
import { view as RuleEnhanceFilter } from "modules/rule/ruleEnhanceFilter";
import { reducerName as ruleReducerName } from "modules/rule/ruleGrid";
import _ from "lodash";
import { ISC_ACCOUNT_INFO } from "commons/constants/const";
let sitename;

class Rule extends React.Component {
    componentWillMount() {
        this.props.closeFloatTab(this.props.identify);
        sitename = JSON.parse(sessionStorage.getItem(ISC_ACCOUNT_INFO)).displayname;
        const { identify, columnConfig, filterConfig } = this.props;
        this.props.initAllRedux(identify);
        this.props.storeColumnsAndFilters(identify, columnConfig, _.cloneDeep(filterConfig));
        this.props.getRuleSchema(sitename, identify);
        this.props.getActionSchema(sitename, identify);
        this.submodulename = this.props.currentApplicationInfo && this.props.currentApplicationInfo["address.name"];
        const modules = {
            notification_config: {
                "email-config": ["mailinglist", "emailsubject", "emailtemplate"],
                "sms-config": ["recipients-list", "message-template"]
            },
            workflow: {
                "action-api": ["api-config"]
            }
        };
        for (let i in modules) {
            const submodules = modules[i];
            for (let key in submodules) {
                const submodulename = key;
                const confignames = submodules[key];
                for (let j = 0; j < confignames.length; j++) {
                    this.props.getActionContent(sitename, i, submodulename, confignames[j], "general", identify);
                }
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        this.props.ccmsControl(this.props.identify);
    }
    handleFloatTabClose() {
        this.props.closeFloatTab(this.props.identify);
    }
    render() {
        return (
            <div className="ruleGrid-container">
                <Card className="rule-cont">
                    <RuleEnhanceFilter
                        identify={this.props.identify}
                        title={this.props.title}
                        subTitle={this.props.subTitle}
                        filterConfig={this.props.filterConfig}
                        ruleDisplayType={this.props.ruleDisplayType}
                        openAddFloatTab={this.props.openAddFloatTab}
                        changeAddMode={this.props.changeAddMode}
                        refreshRuleSuccess={this.props.refreshRuleSuccess}
                        onFullScreen={this.props.onFullScreen}
                        onFullScreenExit={this.props.onFullScreenExit}
                        full={this.props.full}
                        fullScreen={this.props.fullScreen}
                    />
                    <RuleCont
                        identify={this.props.identify}
                        ruleDisplayType={this.props.ruleDisplayType}
                        columnConfig={this.props.columnConfig}
                        multipleSelect={this.props.multipleSelect}
                        pageLimit={this.props.pageLimit}
                        orderBy={this.props.orderBy}
                        orderDisplayName={this.props.orderDisplayName}
                        orderDirection={this.props.orderDirection}
                        changeAddMode={this.props.changeAddMode}
                        sitename={sitename}
                        modulename={this.props.modulename}
                        submodulename={this.submodulename}
                    />
                </Card>
                <FloatTab
                    identify={this.props.identify}
                    tabTypes={this.props.tabTypes}
                    handleFloatTabClose={this.handleFloatTabClose.bind(this)}
                    ruleSchema={this.props.ruleSchema}
                    actionSchema={this.props.actionSchema}
                    sitename={sitename}
                    pageNo={this.props.pageNo}
                    actionContent={this.props.actionContent}
                    modulename={this.props.modulename}
                    submodulename={this.submodulename}
                />
            </div>
        );
    }
}

Rule.propTypes = {
    identify: PropTypes.string,
    columnConfig: PropTypes.array
};

Rule.defaultProps = {
    title: "List of Rules",
    subTitle: "Sub rule",
    identify: "rule",
    columnConfig: [
        {
            columnName: "Rule Name",
            defaultSelect: true
        },
        {
            columnName: "Description",
            defaultSelect: true
        },
        {
            columnName: "Modified By",
            defaultSelect: true
        },
        {
            columnName: "Last Modified",
            defaultSelect: true
        },
        {
            columnName: "Action",
            defaultSelect: true
        }
    ],
    tabTypes: ["Info", "Conditions", "Actions"],
    filterConfig: [
        {
            filterName: "Rule Name",
            defaultValue: []
        }
    ],
    ruleDisplayType: "List",
    multipleSelect: true,
    orderBy: "configname",
    orderDisplayName: "Rule Name",
    orderDirection: "asc"
};

const filterProps = (state, identify, reducerName, props) => {
    if (state[reducerName] && state[reducerName][identify]) {
        return state[reducerName][identify][props];
    }
};

const mapStateToProps = (state, ownProps) => {
    let identify = ownProps.identify || "rule";
    return {
        title: filterProps(state, identify, ruleReducerName, "title") || ownProps.title,
        subTitle: filterProps(state, identify, ruleReducerName, "subTitle") || ownProps.subTitle,
        refreshRuleSuccess:
            filterProps(state, identify, ruleReducerName, "refreshRuleSuccess") || ownProps.refreshRuleSuccess,
        columnConfig: filterProps(state, identify, ruleReducerName, "columnConfig"),
        multipleSelect: filterProps(state, identify, ruleReducerName, "multipleSelect"),
        ruleSchema: filterProps(state, identify, ruleReducerName, "ruleSchema") || ownProps.ruleSchema,
        actionSchema: filterProps(state, identify, ruleReducerName, "actionSchema") || ownProps.actionSchema,
        actionContent: filterProps(state, identify, ruleReducerName, "actionContent") || ownProps.actionContent,
        pageNo: filterProps(state, identify, ruleReducerName, "pageNo") || ownProps.pageNo,
        modulename: filterProps(state, identify, ruleReducerName, "modulename") || ownProps.modulename
    };
};

const mapDispatchToProps = dispatch => {
    return {
        ccmsControl: (identify, columnConfig, filterConfig) => {
            dispatch(ccmsControl(identify, columnConfig, filterConfig));
        },
        closeFloatTab: identify => {
            dispatch(closeFloatTab(identify));
        },
        storeColumnsAndFilters: (identify, columnConfig, filterConfig) => {
            dispatch(storeColumnsAndFilters(identify, columnConfig, filterConfig));
        },
        addRule: identify => {
            dispatch(closeFloatTab(identify));
        },
        openAddFloatTab: identify => {
            dispatch(openAddFloatTab(identify));
        },
        changeAddMode: (addMode, identify) => {
            dispatch(changeAddMode(addMode, identify));
        },
        getRuleSchema: (sitename, identify) => {
            dispatch(getRuleSchema(sitename, identify));
        },
        getActionSchema: (sitename, identify) => {
            dispatch(getActionSchema(sitename, identify));
        },
        getActionContent: (sitename, module, submodule, config, alarmType, identify) => {
            dispatch(getActionContent(sitename, module, submodule, config, alarmType, identify));
        },
        initAllRedux: identify => {
            dispatch(initAllRedux(identify));
        },
        // getFiles: (applicationId, identify) => {
        //     dispatch(getDashboards(applicationId, identify));
        // }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Rule);
