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
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import { Button, StepLabel } from "modules/common";
import { addRule, updateNotification } from "../funcs/actions";
import { REDUCER_NAME as authName } from "modules/auth/funcs/constants";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import MappingComp from "./mappingComp";
import EmailMapping from "./emailMapping";
import SMSMapping from "./smsMapping";
import ActionApi from "./actionApi";
import ApiActionMapping from "./apiActionMapping";
import DashboardMapping from "./dashboardMapping";
import SystemSchema from "../funcs/systemSchema.json";
import { controlNotificationConfig, controlWorkflowConfig } from "../funcs/actions";
import $ from "jquery";
import { I18n } from "react-i18nify";
import classnames from "classnames";
// const GENERAL = "general";
const styles = theme => ({
    root: {
        width: "100%",
        height: "calc(100% - 145px)"
    },
    instructions: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
        height: "calc(100% - 72px)",
        overflowY: "auto",
        padding: "0 24px"
    },
    textColor: {
        color: theme.typography.caption.color
    }
});

class AddRule extends React.Component {
    static propTypes = {
        classes: PropTypes.object
    };

    state = {
        activeStep: 0,
        config: {},
        action: {},
        saveFlag: false,
        regexValidate: {},
        dashboardList: []
    };

    componentWillMount() {
        this.inital(this.props);
    }
    componentWillReceiveProps(nextProps) {
        this.inital(nextProps);
    }
    inital(props) {
        let { config } = this.state;
        let ruleSchema = SystemSchema.ruleSchema;
        const { actionSchema } = props;
        config = this.getConfigData(ruleSchema, actionSchema);
        let action = {};
        for (let i in actionSchema) {
            if (i.includes("action") && !i.includes("dashboard")) {
                const key = i.split("action")[0];
                action[key] = action[key] ? action[key] : {};
                action[key][i] = actionSchema[i].default;
            }
        }
        this.setState({
            activeStep: 0,
            config,
            action,
            regexValidate: {}
        });
    }
    getConfigData(ruleSchema, actionSchema) {
        let config = {};
        config["configvalue"] = {};
        for (let key in ruleSchema) {
            config[key] = "";
        }
        config["configvalue"]["condition"] = "";
        for(let key in actionSchema){
            if(key.includes("action") && key.includes("dashboard")){
                config["configvalue"]["dashboard"] = {[key]: actionSchema[key].default};
            }
        }
        return config;
    }

    generateConfigData(type, configname, Subject, subject) {
        const value = type === "list" ? (subject && subject.join())||Subject.configvals[0].configval  : (subject || Subject.configvals[0].configval);
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
        if (List) {
            configs.push(this.generateConfigData("list", configname, List, list));
        }
        if (SubjectList) {
            configs.push(this.generateConfigData("subject", configname, SubjectList, subject));
        }
        if (Template) {
            configs.push(this.generateConfigData("template", configname, Template, null));
        }
        return configs;
    }
    confirmSave = () => {
        const { config, action, dashboardList } = this.state;
        const { userid, sitename, identify, pageLimit, actionContent, modulename } = this.props;
        const emailSubjectList = actionContent["emailsubject-general"];
        const emailList = actionContent["mailinglist-general"];
        const emailTemplate = actionContent["emailtemplate-general"];
        const smsList = actionContent["recipients-list-general"];
        const smsTemplate = actionContent["message-template-general"];
        const bpmTemplate = actionContent["api-config-general"];
        const configName = config.name;
        const configvaldesc = config.description;
        const configvalue = config.configvalue;
        let notificationConfigs = {};
        // if (action["email"].emailaction) {
        notificationConfigs["emailConfigs"] = this.formatData(
            configName,
            emailList,
            action["email"].emaillist,
            emailTemplate,
            emailSubjectList,
            action["email"].emailsubject
        );

        notificationConfigs["smsConfigs"] = this.formatData(
            configName,
            smsList,
            action["sms"].smslist,
            smsTemplate,
            null,
            null
        );
        this.props.controlNotificationConfig(notificationConfigs, "", identify);

        let result = {};
        for (let i in action) {
            for (let j in action[i]) {
                if (j.includes("action") && !i.includes("dashboard")) {
                    result[j] = action[i][j];
                }
            }
        }
        let dashboard = {};
        dashboardList.forEach(item=>{
            if(item.pageKey === configvalue["dashboard"]["dashboardlist"]){
                dashboard = {dashboardaction: configvalue["dashboard"]["dashboardaction"], pagekey: item.pageKey, name: item.name, thumbnail: item.thumbnail, des: item.des};
            }
        });
        configvalue.action = result;
        configvalue["dashboard"] = dashboard;
        let configValue = JSON.stringify(configvalue);
        this.props.onAddRule(sitename, modulename, this.props.submodulename, configName, configvaldesc, configValue, userid, pageLimit, identify);

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
        } else {
            apiAction =
                bpmTemplate &&
                bpmTemplate.configvals &&
                bpmTemplate.configvals[0] &&
                bpmTemplate.configvals[0].configval;
        }
        let workflowConfig = {
            sitename,
            rulename: configName,
            configval: apiAction
        };
        this.props.controlWorkflowConfig(workflowConfig, "create", identify);

        this.props.handleFloatTabClose();
        this.setState({ activeStep: 0 });
    };
    handleDeleteClick(apis) {
        let { action } = this.state;
        action.api.apis = apis.apis;
        this.setState({ action });
    }
    isSave(saveFlag){
        this.setState({saveFlag});
    }
    saveDashboardConfig(dashboard, dashboardList){
        let { config } = this.state;
        config["configvalue"]["dashboard"] = dashboard;
        this.setState({config, dashboardList});
    }
    getRuleInfoConfig(data, regexValidate) {
        let { config } = this.state;
        config = Object.assign({}, config, data);
        this.setState({ config, regexValidate });
        for(let validate in regexValidate){
            if(regexValidate[validate]){
                this.setState({saveFlag:false});
                return;
            }
        }
        this.setState({saveFlag:true});
    }
    
    getActionConfig(data) {
        let { action } = this.state;
        if(Object.keys(data).length>0 && Object.keys(data)[0]!=="api"){
            action = Object.assign({}, action, data);
        }else{
            action = $.extend(true, {}, action, data);
        }
        this.setState({ action });
    }
    generateCondition() {
        const { config } = this.state;
        const conditionSchema = SystemSchema.conditionSchema;
        let result = [];
        for (let i in conditionSchema) {
            result.push(
                <ListItem key={i}>
                    <MappingComp
                        data={conditionSchema[i]}
                        label={i}
                        getRuleInfoConfig={this.getRuleInfoConfig.bind(this)}
                        ruleInfoConfig={config}
                        identify={this.props.identify}
                        sitename={this.props.sitename}
                    />
                </ListItem>
            );
        }
        return <List className="rule-group">{result}</List>;
    }
    generateRuleSchema() {
        let ruleSchema = SystemSchema.ruleSchema;
        const { config } = this.state;
        if (!config || !ruleSchema) {
            return;
        }
        let result = [];
        for (let i in ruleSchema) {
            result.push(
                <ListItem key={i}>
                    <MappingComp
                        data={ruleSchema[i]}
                        label={i}
                        getRuleInfoConfig={this.getRuleInfoConfig.bind(this)}
                        ruleInfoConfig={config}
                        identify={this.props.identify}
                        sitename={this.props.sitename}
                    />
                </ListItem>
            );
        }
        return result;
    }
    generateGeneral() {
        return <List className="rule-group">{this.generateRuleSchema()}</List>;
    }

    generateAction() {
        return <List className="rule-group action-group">{this.generateActionSchema()}</List>;
    }
    generateActionSchema() {
        const { actionSchema, actionContent } = this.props;
        const { action, config } = this.state;
        if (!actionSchema || !actionContent) {
            return;
        }
        const actionConfig = action;
        const dashboardConfig = config["configvalue"] && config["configvalue"]["dashboard"];
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
            }  else if (i.includes("dashboard")) {
                schema["dashboard"][i] = actionSchema[i];
            } else {
                schema["api"][i] = actionSchema[i];
            }
        }
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
        let result = [];
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
                        emailSubject={actionContent && actionContent["emailsubject-general"]}
                        emailList={actionContent && actionContent["mailinglist-general"]}
                        emailTemplate={actionContent && actionContent["emailtemplate-general"]}
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
                        isSave={this.isSave.bind(this)}
                        getActionConfig={this.getActionConfig.bind(this)}
                        actionConfig={actionConfig["sms"]}
                        identify={this.props.identify}
                        smsList={actionContent && actionContent["recipients-list-general"]}
                        smsTemplate={actionContent && actionContent["message-template-general"]}
                    />
                </ListItem>
            );
        }
        result.push(
            <ListItem key="apiaction">
                <ApiActionMapping
                    data={currentSchema["api"]["apiaction"]}
                    label="apiaction"
                    isSave={this.isSave.bind(this)}
                    getActionConfig={this.getActionConfig.bind(this)}
                    actionConfigs={actionConfig["api"]}
                    identify={this.props.identify}
                    apiSchema={currentSchema["api"]}
                    apiConfig={actionContent && actionContent["api-config-general"]}
                />
            </ListItem>
        );
        let currentschema = currentSchema["api"];
        delete currentschema["apiaction"];
        Object.keys(currentschema).length > 0 &&
            result.push(
                <ActionApi
                    key="apis"
                    apiSchema={currentschema}
                    getActionConfig={this.getActionConfig.bind(this)}
                    actionConfigs={actionConfig["api"] && actionConfig["api"]["apis"]}
                    identify={this.props.identify}
                    isSave={this.isSave.bind(this)}
                    handleDeleteClick={this.handleDeleteClick.bind(this)}
                    apiConfig={actionContent && actionContent["api-config-general"]}
                />
            );
        return result;
    }
    getStepContent(stepIndex) {
        switch (stepIndex) {
            case 0:
                return this.generateGeneral();
            case 1:
                return this.generateCondition();
            case 2:
                return this.generateAction();
            default:
                return "Uknown stepIndex";
        }
    }
    isStepOptional = step => {
        return step === 1;
    };

    isStepFailed = step => {
        return step === 1;
    };

    handleNext = () => {
        const { activeStep } = this.state;
        this.setState({
            activeStep: activeStep + 1
        });
    };

    handleBack = () => {
        const { activeStep } = this.state;
        this.setState({
            activeStep: activeStep - 1
        });
    };

    render() {
        const { classes } = this.props;
        const steps = [I18n.t("rule.common.ruleInfo"), I18n.t("rule.common.conditions"), I18n.t("rule.common.actions")];
        const { activeStep, config, saveFlag } = this.state;
        return (
            <div className={classes.root}>
                <Stepper activeStep={activeStep} className="rule-step">
                    {steps.map((label, index) => {
                        return (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
                <div className="ruleGeneral">
                    {activeStep === steps.length ? (
                        this.confirmSave()
                    ) : (
                        <div className="ruleGeneral-content">
                            <div className={classes.instructions}>{this.getStepContent(activeStep)}</div>
                            <div className="ruleGeneral-action">
                                <Button disabled={activeStep === 0} onClick={this.handleBack} color="secondary">
                                    {I18n.t("common.Back")}
                                </Button>
                                <Button disabled={!config["name"] || !saveFlag } color="secondary" onClick={this.handleNext}>
                                    {activeStep === steps.length - 1 ? I18n.t("common.Save") : I18n.t("common.Next")}
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        userid: state[authName].userid
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAddRule: (sitename, modulename, submodulename, configName, configvaldesc, configValue, userid, pageLimit, identify) => {
            dispatch(addRule(sitename, modulename, submodulename, configName, configvaldesc, configValue, userid, pageLimit, identify));
        },
        updateNotification: (sitename, modules, configname, userid, mode, pageLimit, identify) => {
            dispatch(updateNotification(sitename, modules, configname, userid, mode, pageLimit, identify));
        },
        controlNotificationConfig: (notificationConfig, type, identify) => {
            dispatch(controlNotificationConfig(notificationConfig, type, identify));
        },
        controlWorkflowConfig: (workflowConfig, type, identify) => {
            dispatch(controlWorkflowConfig(workflowConfig, type, identify));
        }
    };
};
AddRule.defaultProps = {
    userid: "admin"
};
AddRule.propTypes = {
    userid: PropTypes.string
};
export default withStyles(styles)(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(AddRule)
);
