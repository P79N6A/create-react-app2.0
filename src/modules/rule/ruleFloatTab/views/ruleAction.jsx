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
import { withStyles } from "@material-ui/core/styles";
import { Button } from "modules/common";
import { REDUCER_NAME as authName } from "modules/auth/funcs/constants";
import { updateRule, updateNotification, getActionContent, controlNotificationConfig, controlWorkflowConfig } from "../funcs/actions";
import { REDUCER_NAME as ruleFloatTabReducer } from "../funcs/constants";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import classnames from "classnames";
import EmailMapping from "./emailMapping";
import SMSMapping from "./smsMapping";
import ActionApi from "./actionApi";
import ApiActionMapping from "./apiActionMapping";
import DashboardMapping from "./dashboardMapping";
import $ from "jquery";
import { I18n } from "react-i18nify";
import { REDUCER_NAME as ccmsExReducer } from "modules/ccmsEx";
const styles = theme => ({
    root: {
        width: "100%",
        height: "calc(100% - 48px)"
    },
    button: {
        marginRight: theme.spacing.unit
    },
    instructions: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
        height: "calc(100% - 72px)",
        overflowY: "auto",
        padding: "0 24px"
    },
    textColor: {
        color: theme.palette.secondary.main
    },
    ruleGeneral: {
        height: "100%"
    }
});

class RuleAction extends React.Component {
    static propTypes = {
        classes: PropTypes.object
    };

    state = {
        action: { sms: {}, email: {}, api: {} },
        saveFlag: true,
        dashboard: {},
        // dashboardList: []
    };

    componentWillMount() {
    //    if(this.props.saveConfigs && this.props.saveConfigs["ruleAction"]){
    //         this.setState({action: this.props.saveConfigs["ruleAction"]});
    //         return;
    //     }
        let { action } = this.state;
        action = this.getConfigData(this.props);
        const { configData, sitename, identify } = this.props;
        this.setState({ action });
        const configName = configData && configData.configname;
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
                confignames.forEach(configname => {
                    this.props.getActionContent(sitename, i, submodulename, configname, configName, identify);
                });
            }
        }
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.saveConfigs && nextProps.saveConfigs["ruleAction"]){
            this.setState({action: nextProps.saveConfigs["ruleAction"]});
            return;
        }
        let { action } = this.state;
        action = this.getConfigData(nextProps);
        this.setState({ action });
    }
    componentWillUnmount() {
        const {action} = this.state;
        const configs = {ruleAction: action};
        this.props.saveConfigsFunc(configs, this.props.identify);
    }
    getConfigData(props) {
        const { actionSchema, configData } = props;
        let config = {};
        if (!actionSchema || !configData) {
            return;
        }
        const configvalue =
            configData.configvals &&
            configData.configvals[0] &&
            configData.configvals[0].configval &&
            JSON.parse(configData.configvals[0].configval);
        let action = {};
        for (let i in actionSchema) {
            if (i.includes("action")) {
                const key = i.split("action")[0];
                action[key] = action[key] ? action[key] : {};
                action[key][i] = (configvalue && configvalue.action[i]) || false;
            }else if(i.includes("dashboard")) {
                let dashboardconfig = configvalue && configvalue.dashboard;
                let currentdashboard = {dashboardaction: false};
                this.props.dashboardList.forEach(item =>{
                    if(item.pageKey === dashboardconfig.pagekey){
                        currentdashboard = {dashboardaction: dashboardconfig.dashboardaction, dashboardlist: dashboardconfig.pagekey};
                        return;
                    }
                });
                this.setState({dashboard: currentdashboard});
            }
        }
        config = action;
        return config;
    }
    handleDeleteClick(apis) {
        let {action} = this.state;
        action.api.apis = apis.apis;
        this.setState({ action });
    }
    generateConfigData(type, configname, Subject, subject) {
        const value = type === "list" ? subject && subject.join() : subject || Subject.configvals[0].configval;
        const oldName = Subject.configname && Subject.configname.split(".")[0];
        const name = `${oldName}.${configname}`;
        let config = {
            configName: name,
            configVals: [
                {
                    configValName: name,
                    configVal: value
                }
            ]
        };
        return config;
    }
    formatData(configname, List, list, Template, SubjectList, subject) {
        let configs = [];
        if (List && list) {
            configs.push(this.generateConfigData("list", configname, List, list));
        }
        if (SubjectList && subject) {
            configs.push(this.generateConfigData("subject", configname, SubjectList, subject));
        }
        return configs;
    }
    
    confirmSave = () => {
        let { action, dashboard} = this.state;
        const { actionContent } = this.props;
        // let modules = [];
        const { userid, configData, modulename, sitename } = this.props;
        const emailSubjectList = actionContent["emailsubject"];
        const emailList = actionContent["mailinglist"];
        const smsList = actionContent["recipients-list"];
        let notificationConfigs = {};
        const configName = configData.configname;
        const configvaldesc = configData.configvals && configData.configvals[0].configvaldesc;
        if (action["email"].emailaction) {
            notificationConfigs["emailConfigs"] = this.formatData(
                configName,
                emailList,
                action["email"].emaillist,
                null,
                emailSubjectList,
                action["email"].emailsubject
            );
        }

        if (action["sms"].smsaction) {
            notificationConfigs["smsConfigs"] = this.formatData(
                configName,
                smsList,
                action["sms"].smslist,
                null,
                null,
                null
            );
        }
        this.props.controlNotificationConfig(notificationConfigs, "update", this.props.identify);
        
        let result = {};
        for (let i in action) {
            for (let j in action[i]) {
                if (j.includes("action")) {
                    result[j] = action[i][j];
                }
            }
        }
        let configValue = JSON.parse(
            configData.configvals && configData.configvals[0] && configData.configvals[0].configval
        );
        configValue.action = result;
        this.props.dashboardList.forEach(item=>{
            if(item.pageKey === dashboard["dashboardlist"]){
                dashboard = {dashboardaction: dashboard["dashboardaction"], pagekey: item.pageKey, name: item.name, thumbnail: item.thumbnail, des: item.des};
            }
        });
        configValue.dashboard = dashboard;
        let configval = JSON.stringify(configValue);
        this.props.onUpdateRule(sitename, modulename, this.props.submodulename, configName, configvaldesc, configval, userid, this.props.pageLimit, this.props.pageNo, this.props.identify, this.props.checked);
        let apiAction = "";
        if (action["api"].apiaction && Object.keys(action["api"]).length > 1) {
            let apis = [];
            for (let num in action.api.apis) {
                let currentApi = action.api.apis[num];
                for(let key in currentApi){
                    if(currentApi[key] instanceof Object){
                        const obj = currentApi[key];
                        let currentObj = {};
                        for(let j in obj){
                            currentObj[obj[j].key] = obj[j].value;
                        }
                        currentApi[key] = currentObj;
                    }
                }
                apis.push(currentApi);
            }
            const test = {
                apis: apis
            };
            apiAction = JSON.stringify(test);
        }
        let workflowConfig = {
            sitename,
            submodulename: "action-api",
            confignames: [`api-config.${configName}`], 
            configval: apiAction
        };
        apiAction && this.props.controlWorkflowConfig(workflowConfig, "update", this.props.identify);
        this.props.handleFloatTabClose();
    };
   
    getActionConfig(data) {
        let { action } = this.state;
        if(Object.keys(data).length>0 && Object.keys(data)[0]!=="api"){
            action = Object.assign({}, action, data);
        }else{
            action = $.extend(true, {}, action, data);
        }
        this.setState({ action });
    }
    saveDashboardConfig = (dashboard, dashboardList) =>{
        this.setState({dashboard, dashboardList});
    }
    isSave(saveFlag){
        this.setState({saveFlag});
    }
    generateActionSchema() {
        const { actionSchema, actionContent } = this.props;
        const { action, dashboard } = this.state;
        if (!action || !actionSchema || !actionContent) {
            return;
        }
        let result = [];
        const actionConfig = action;
        const dashboardConfig = dashboard;
        let schema = {};
        let currentSchema = {};
        schema["email"] = schema["email"] ? schema["email"] : {};
        schema["sms"] = schema["sms"] ? schema["sms"] : {};
        schema["api"] = schema["api"] ? schema["api"] : {};
        schema["dashboard"] = schema["dashboard"] ? schema["dashboard"] : {};
        for (let i in actionSchema) {
            if (i.includes("email")) {
                schema["email"][i] = actionSchema[i];
            } else if (i.includes("sms")) {
                schema["sms"][i] = actionSchema[i];
            } else if(i.includes("dashboard")){
                schema["dashboard"][i] = actionSchema[i];
            } else {
                schema["api"][i] = actionSchema[i];
            }
        }
        // const data = ["email", "sms", "api", "dashboard"];
        // data.forEach(item =>{
        //     if (!action[item].emailaction) {
        //         currentSchema[item] = { [`${item}action`]: actionSchema[`${item}action`] };
        //     } else {
        //         currentSchema[item] = schema[item];
        //     }
        // });
        if (!action.email.emailaction) {
            currentSchema["email"] = { emailaction: actionSchema["emailaction"] };
        } else {
            currentSchema["email"] = schema["email"];
        }
        if (!action.sms.smsaction) {
            currentSchema["sms"] = { smsaction: actionSchema["smsaction"] };
        } else {
            currentSchema["sms"] = schema["sms"];
        }
        if (!action.api.apiaction) {
            currentSchema["api"] = { apiaction: actionSchema["apiaction"] };
        } else {
            currentSchema["api"] = schema["api"];
        }
        if (dashboardConfig && !dashboardConfig.dashboardaction) {
            currentSchema["dashboard"] = { dashboardaction: actionSchema["dashboardaction"] };
        } else {
            currentSchema["dashboard"] = schema["dashboard"];
        }
        for (let dashboard in currentSchema["dashboard"]) {
            result.push(
                <ListItem key={dashboard}>
                    <DashboardMapping
                        data={currentSchema["dashboard"][dashboard]}
                        label={dashboard}
                        saveDashboardConfig={this.saveDashboardConfig.bind(this)}
                        dashboardConfig={dashboardConfig}
                        identify={this.props.identify}
                        isSave={this.isSave.bind(this)}
                        dashboardList={this.props.dashboardList}
                    />
                </ListItem>
            );
        }
        for (let email in currentSchema["email"]) {
            result.push(
                <ListItem key={email} className={classnames(email==="emailinput"?"email-action":"", "rule-action-item")}>
                    <EmailMapping
                        data={currentSchema["email"][email]}
                        label={email}
                        getActionConfig={this.getActionConfig.bind(this)}
                        actionConfig={actionConfig["email"]}
                        identify={this.props.identify}
                        emailSubject={actionContent && actionContent["emailsubject"]}
                        emailList={actionContent && actionContent["mailinglist"]}
                        emailTemplate={actionContent && actionContent["emailtemplate"]}
                        isSave={this.isSave.bind(this)}
                    />
                </ListItem>
            );
        }
        for (let sms in currentSchema["sms"]) {
            result.push(
                <ListItem key={sms} className={classnames(sms==="smsinput"?"sms-action":"", "rule-action-item")}>
                    <SMSMapping
                        data={currentSchema["sms"][sms]}
                        label={sms}
                        getActionConfig={this.getActionConfig.bind(this)}
                        actionConfig={actionConfig["sms"]}
                        identify={this.props.identify}
                        smsList={actionContent && actionContent["recipients-list"]}
                        smsTemplate={actionContent && actionContent["message-template"]}
                        isSave={this.isSave.bind(this)}
                    />
                </ListItem>
            );
        }
        result.push(
            <ListItem key="apiaction">
                <ApiActionMapping
                    data={currentSchema["api"]["apiaction"]}
                    label="apiaction"
                    getActionConfig={this.getActionConfig.bind(this)}
                    actionConfigs={actionConfig["api"]}
                    identify={this.props.identify}
                    apiSchema={currentSchema["api"]}
                    apiConfig={actionContent["api-config"]}
                    isSave={this.isSave.bind(this)}
                />
            </ListItem>
        );
        let currentschema = currentSchema["api"];
        delete currentschema["apiaction"];
        Object.keys(currentschema).length>0 && result.push(
            <ActionApi
                key="api"
                apiSchema={currentschema}
                getActionConfig={this.getActionConfig.bind(this)}
                isSave={this.isSave.bind(this)}
                actionConfigs={actionConfig["api"] && actionConfig["api"]["apis"]}
                identify={this.props.identify}
                handleDeleteClick={this.handleDeleteClick.bind(this)}
                apiConfig={actionContent["api-config"]}
            />
        );
        return result;
    }

    generateAction() {
        return <List className="rule-group action-group">{this.generateActionSchema()}</List>;
    }
    handleCancel = () => {
        this.props.handleFloatTabClose();
    };
    render() {
        const { classes } = this.props;
        const { saveFlag } = this.state;
        return (
            <div className={classes.root}>
                <div className={classnames("ruleGeneral", "ruleGeneral-update")}>
                    <div className="ruleGeneral-content">
                        <div className={classes.instructions}>{this.generateAction()}</div>
                        <div className="ruleGeneral-action">
                            <Button color="secondary" onClick={this.handleCancel} className={classes.button}>
                                {I18n.t("common.Cancel")}
                            </Button>
                            <Button color="secondary"  disabled={!saveFlag} onClick={this.confirmSave.bind(this)} className={classes.button}>
                                {I18n.t("common.Save")}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
const filterProps = (state, identify, props) => {
    if (state[ruleFloatTabReducer] && state[ruleFloatTabReducer][identify]) {
        return state[ruleFloatTabReducer][identify][props];
    }
};
const mapStateToProps = (state, ownProps) => {
    let identify = ownProps.identify;
    return {
        userid: state[authName].userid,
        configData: filterProps(state, identify, "configData"),
        actionContent: filterProps(state, identify, "actionContent"),
        saveConfigs: filterProps(state, identify, "saveConfigs"),
        dashboardList: state[ccmsExReducer]["customizedDashboards"] || []
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onUpdateRule: (sitename, modulename, submodulename, configname, configvaldesc, configval, user, pageLimit, pageNo, identify) => {
            dispatch(updateRule(sitename, modulename, submodulename, configname, configvaldesc, configval, user, pageLimit, pageNo, identify));
        },
        updateNotification: (sitename, modules, configname, userid, mode, pageLimit, identify) => {
            dispatch(updateNotification(sitename, modules, configname, userid, mode, pageLimit, identify));
        },
        getActionContent: (sitename, module, submodule, config, alarmType, identify) => {
            dispatch(getActionContent(sitename, module, submodule, config, alarmType, identify));
        },
        controlNotificationConfig: (notificationConfig, type, identify) => {
            dispatch(controlNotificationConfig(notificationConfig, type, identify));
        },
        controlWorkflowConfig: (workflowConfig, type, identify) => {
            dispatch(controlWorkflowConfig(workflowConfig, type, identify));
        }
    };
};

export default withStyles(styles)(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(RuleAction)
);
