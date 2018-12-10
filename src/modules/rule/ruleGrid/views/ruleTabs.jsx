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
import PropTypes from "prop-types";
import "../styles/style.less";
import { connect } from "react-redux";
import { changeTab, openFloatTab } from "../funcs/actions";
import { reducerName as ruleReducerName } from "modules/rule/ruleGrid";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import CardContent from "@material-ui/core/Card";
import AppBar from "@material-ui/core/AppBar";
import { withStyles } from "@material-ui/core/styles";
import RuleList from "./ruleList";

const styles = theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary
    }
});

class RuleTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabs: [],
            currentTab: 0,
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
            currentTab: this.props.defaultTab,
            tabs: tabs
        });
    }

    componentWillReceiveProps(newProps) {
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
            currentTab: newProps.currentTab,
            tabs: tabs
        });
    }

    tabPaneClick(event, checkedTab) {
        this.props.changeTab(this.props.identify, checkedTab, this.props.columnConfig);
    }

    shouldComponentUpdate(nextProps, nextState) {
        // return nextProps.showFloatTab ? true : false;
        return true;
    }

    handleAddButtonClick(addMode) {
        this.props.changeAddMode(addMode, this.props.identify);
    }

    render() {
        const {classes} = this.props;
        return (
            <div className="rule-tab" style={{ height: "100%" }}>
                <AppBar position="static" className={classes.root}>
                    <Tabs
                        value={this.state.currentTab}
                        onChange={this.tabPaneClick.bind(this)}
                    >
                        {this.state.tabs.map((item, index) => {
                            return <Tab style={{ minWidth: "100px" }} key={index} label={item.tabDisName} />;
                        })}
                    </Tabs>
                </AppBar>
                <CardContent className="detail-cont" style={{ height: "calc(100% - 48px)" }}>
                    <RuleList
                        index={0}
                        identify={this.props.identify}
                        columnConfig={this.props.columnConfig}
                        datas={this.props.datas}
                        pagination={this.props.pagination}
                        searchRuleFunc={this.props.searchRuleFunc}
                        multipleSelect={this.props.multipleSelect}
                        deleteRule={this.props.deleteRule}
                        changeAddMode={this.props.changeAddMode}
                        checkedTab={this.state.currentTab}
                    />
                </CardContent>
            </div>
        );
    }
}

RuleTab.propTypes = {
    defaultTab: PropTypes.number.isRequired,
    tabTypes: PropTypes.array.isRequired
};

RuleTab.defaultProps = {
    defaultTab: 0,
    currentTab: 0,
    tabTypes: ["userDefined", "systemDefined"],
    defaultTabLists: {
        userDefined: {
            type: "userDefined",
            tabDisName: "User Defined"
        },
        systemDefined: {
            type: "systemDefined",
            tabDisName: "System Defined"
        }
    },
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
    ]
};

const mapStateToProps = (state, ownProps) => {
    let identify = ownProps.identify;
    return {
        currentTab:
            state[ruleReducerName] && state[ruleReducerName][identify] && state[ruleReducerName][identify].currentTab
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeTab: (identify, checkedTab, columnConfig) => {
            dispatch(changeTab(identify, checkedTab, columnConfig));
        },
        openFloatTab: (identify, floatTabType) => {
            dispatch(openFloatTab(identify, floatTabType));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(RuleTab));
