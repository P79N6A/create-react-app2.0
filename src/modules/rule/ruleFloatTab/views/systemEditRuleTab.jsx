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
import "../styles/style.less";
import SystemRuleCondition from "./systemRuleCondition";
import RuleAction from "./ruleAction";
import SystemRuleInfo from "./systemRuleInfo";
import { connect } from "react-redux";
import { changeTab, saveConfigsFunc } from "../funcs/actions";
import { REDUCER_NAME as ruleFloatTabReducer } from "../funcs/constants";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { I18n } from "react-i18nify";
class FloatTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabs: [],
            currentTab: "",
            anchor: "right"
        };
    }

    componentDidMount() {
        if (!this.props.tabTypes) {
            return;
        }
        let tabs = [];
        this.props.tabTypes.map((item, index) => {
            if (this.props.defaultTabLists[item]) {
                tabs.push(this.props.defaultTabLists[item]);
            }
            return null;
        });
        this.setState({
            currentTab: this.props.currentTab,
            tabs: tabs
        });
    }

    componentWillReceiveProps(newProps) {
        if (!newProps.tabTypes) {
            return;
        }
        let tabs = [];
        newProps.tabTypes.map((item, index) => {
            if (newProps.defaultTabLists[item]) {
                tabs.push(newProps.defaultTabLists[item]);
            }
            return null;
        });
        this.setState({
            currentTab: newProps.currentTab,
            tabs: tabs
        });
    }

    tabPaneClick(event, checkedTab) {
        this.props.changeTab(checkedTab, this.props.identify);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.showFloatTab ? true : false;
    }

    render() { 
        return (
            <div style={{ height: "calc(100% - 72px)" }}>
                <Tabs
                    id="rule-tab"
                    value={this.state.currentTab}
                    onChange={this.tabPaneClick.bind(this)}
                    indicatorColor="secondary"
                    textColor="secondary"
                >
                    {this.state.tabs.map((item, index) => {
                        return <Tab key={index} label={item.tabDisName} />;
                    })}
                </Tabs>
                {this.state.currentTab === 0 ?<SystemRuleInfo index={0} {...this.props} /> : null}
                {this.state.currentTab === 1 ? <SystemRuleCondition index={1} {...this.props} /> : null}
                {this.state.currentTab === 2 ? <RuleAction index={2} {...this.props} /> : null}
            </div>
        );
    }
}

FloatTab.propTypes = {
    defaultTab: PropTypes.number.isRequired,
    tabTypes: PropTypes.array.isRequired
};

FloatTab.defaultProps = {
    title: "Detail Tab",
    showFloatTab: false,
    defaultTab: 0,
    currentTab: 0,
    tabTypes: ["Info", "Conditions", "Actions"],
    defaultTabLists: {
        Info: {
            type: "Info",
            tabDisName: I18n.t("rule.common.ruleInfo")
        },
        Conditions: {
            type: "Conditions",
            tabDisName: I18n.t("rule.common.conditions")
        },
        Actions: {
            type: "Actions",
            tabDisName: I18n.t("rule.common.actions")
        }
    }
};

const mapStateToProps = (state, ownProps) => {
    let identify = ownProps.identify;
    return {
        currentTab:
            state[ruleFloatTabReducer] &&
            state[ruleFloatTabReducer][identify] &&
            state[ruleFloatTabReducer][identify].currentTab,
        
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeTab: (checkedTab, idenfity) => {
            dispatch(changeTab(checkedTab, idenfity));
        },
        saveConfigsFunc: (configs, identify) => {
            dispatch(saveConfigsFunc(configs, identify));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FloatTab);
