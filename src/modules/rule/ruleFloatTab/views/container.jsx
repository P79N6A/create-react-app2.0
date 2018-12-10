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
import { Drawer } from "modules/common";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import EditRuleTab from "./editRuleTab";
import ViewRuleTab from "./viewRuleTab";
import SystemAddRule from "./systemAddRule";
import SystemEditRuleTab from "./systemEditRuleTab";
import SystemViewRuleTab from "./systemViewRuleTab";
import { setRuleFloatTab, initRuleFloatTab } from "../funcs/actions";
import { reducerName as ruleReducerName } from "modules/rule/ruleGrid";
import AddRule from "./addRule";
import FloatTabHeader from "./floatTabHeader";
import { I18n } from "react-i18nify";

class FloatTabCont extends React.Component {
    componentDidMount() {
        this.identify = this.props.identify;
        this.props.initRuleFloatTab(this.identify);
    }
    componentWillReceiveProps(nextProps) {
        let deviceId = nextProps.selectConfigname;
        this.props.setRuleFloatTab(deviceId, nextProps.defaultTab, this.props.identify);
    }
    shouldComponentUpdate(nextProps) {
        if (
            this.props.showFloatTab !== nextProps.showFloatTab ||
            this.props.selectConfigname !== nextProps.selectConfigname ||
            this.props.floatTabType !== nextProps.floatTabType
        ) {
            return true;
        } else {
            return false;
        }
    }
    renderByType(checkedTab, addMode, floatTabType){
        if(!checkedTab){
            if(addMode){
                return <AddRule {...this.props} />;
            }else if(floatTabType === "edit"){
                return <EditRuleTab {...this.props} />;
            }else if(floatTabType === "view"){
                return <ViewRuleTab {...this.props} />;
            }
        }else{
            if(addMode){
                return <SystemAddRule {...this.props} />;
            }else if(floatTabType === "edit"){
                return <SystemEditRuleTab {...this.props} />;
            }else if(floatTabType === "view"){
                return <SystemViewRuleTab {...this.props} />;
            }
        }
    }
    render() {
        const { addMode, floatTabType, checkedTab } = this.props;
        let { anchor, selectConfigname } = this.props;
        let obj = {};
        obj["classes"] = {};
        this.props = Object.assign({}, this.props, obj);
        return (
            <Drawer
                variant="persistent"
                anchor={anchor}
                open={this.props.showFloatTab}
                // showFloatTab={this.props.showFloatTab}
                // classes={{
                //     paper: classes.drawerPaper
                // }}
            >
                <div className="floatTab-container">
                    <FloatTabHeader
                        identify={this.props.identify}
                        handleFloatTabClose={this.props.handleFloatTabClose}
                        currentTitle={selectConfigname || I18n.t("rule.common.newRule")}
                    />
                    {this.props.showFloatTab && this.renderByType(checkedTab, addMode, floatTabType)}
                </div>
            </Drawer>
        );
    }
}

FloatTabCont.propTypes = {
    showFloatTab: PropTypes.bool
};

FloatTabCont.defaultProps = {
    showFloatTab: false,
    defaultTab: 0,
    anchor: "right",
    pageLimit: 10,
    addMode: false
};

const filterProps = (state, identify, reducerName, props) => {
    if (state[reducerName] && state[reducerName][identify]) {
        return state[reducerName][identify][props];
    }
};

const mapStateToProps = (state, ownProps) => {
    let identify = ownProps.identify;
    return {
        showFloatTab: filterProps(state, identify, ruleReducerName, "showFloatTab"),
        selectConfigname: filterProps(state, identify, ruleReducerName, "selectConfigname"),
        pageLimit: filterProps(state, identify, ruleReducerName, "pageLimit"),
        addMode: filterProps(state, identify, ruleReducerName, "addMode"),
        floatTabType: filterProps(state, identify, ruleReducerName, "floatTabType"),
        checkedTab: filterProps(state, identify, ruleReducerName, "currentTab"),
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setRuleFloatTab: (deviceId, defaultTab, identify) => {
            dispatch(setRuleFloatTab(deviceId, defaultTab, identify));
        },
        initRuleFloatTab: identify => {
            dispatch(initRuleFloatTab(identify));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FloatTabCont);
