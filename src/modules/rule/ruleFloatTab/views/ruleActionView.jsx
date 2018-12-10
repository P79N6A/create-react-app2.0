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
import { getActionContent } from "../funcs/actions";
import { REDUCER_NAME as ruleFloatTabReducer } from "../funcs/constants";
import List from "@material-ui/core/List";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { ListItem, ListItemText } from "@material-ui/core";
import DrawImage from "./drawImage";
import classnames from "classnames";
import _ from "lodash";
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
        padding: "0"
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
        values: {},
        dashboard: {}
    };

    componentWillMount() {
        let { action } = this.state;
        action = this.getConfigData(this.props);
        const { configData, sitename, identify } = this.props;
        const configvalue =
            configData &&
            configData.configvals &&
            configData.configvals[0] &&
            configData.configvals[0].configval &&
            JSON.parse(configData.configvals[0].configval);
        let dashboardconfig = configvalue["dashboard"];
        let currentdashboard = {dashboardaction: false};
        this.props.dashboardList.forEach(item =>{
            if(dashboardconfig && item.pageKey === dashboardconfig.pagekey){
                currentdashboard = configvalue["dashboard"];
                return;
            }
        });
        this.setState({ action, dashboard: currentdashboard });
        const configName = configData.configname;
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
    // shouldComponentUpdate(){
    //     const { actionContent } = this.props;
    //     if(actionContent && Object.keys(actionContent).length>=5){
    //         return true;
    //     }
    //     return false;
    // }
    componentWillReceiveProps(nextProps) {
        let { action, values } = this.state;
        action = this.getConfigData(nextProps);
        const { actionContent } = nextProps;
        const mapping = { emaillist: "mailinglist", emailsubject: "emailsubject", emailtemplate: "emailtemplate", smslist: "recipients-list", smstemplate: "message-template", apiconfig: "api-config" };
        for (let i in mapping) {
            values[i] = actionContent && actionContent[mapping[i]] && actionContent[mapping[i]].configvals && actionContent[mapping[i]].configvals[0] && actionContent[mapping[i]].configvals[0].configval;
        }
        this.setState({ action, values });
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
            if (i.includes("action") && !i.includes("dashboard")) {
                const key = i.split("action")[0];
                action[key] = action[key] ? action[key] : {};
                action[key][i] = (configvalue && configvalue.action[i]) || false;
            }
        }
        config = action;
        return config;
    }

    showAction = (actionFlag, schema, values, actionName) => {
        if (!actionFlag) {
            return (
                <ListItem button key={actionName}>
                    <ListItemText
                        primary={<span>{"false"}</span>}
                        secondary={schema[actionName].displayname}
                        title={schema[actionName].displayname}
                        style={{ wordBreak: "break-all" }}
                    />
                </ListItem>
            );
        }
        const result = _.map(schema, (config, index) => {
            return (
                <ListItem button key={index}>
                    <ListItemText
                        primary={<span>{!index.includes("action") ? (values[index] || "") : "true"}</span>}
                        secondary={config.displayname}
                        title={config.displayname}
                        style={{ wordBreak: "break-all" }}
                    />
                </ListItem>
            );
        });
        return result;
    }
    renderSubApi = (item, displayname, index) => {
        return <ExpansionPanel defaultExpanded={false} className="expand-card" key={index}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{displayname}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className="expand-card-cont">
                {_.map(item, (subItem, i) => {
                    return (<div style={{ display: "flex" }}>
                        <ListItem button key="Key">
                            <ListItemText
                                primary={<span>{i}</span>}
                                secondary={I18n.t("rule.common.key")}
                                title={I18n.t("rule.common.key")}
                                style={{ wordBreak: "break-all" }}
                            />
                        </ListItem>
                        <ListItem button key="Value">
                            <ListItemText
                                primary={<span>{subItem}</span>}
                                secondary={I18n.t("rule.common.value")}
                                title={I18n.t("rule.common.value")}
                                style={{ wordBreak: "break-all" }}
                            />
                        </ListItem>
                    </div>);
                })}
            </ExpansionPanelDetails>
        </ExpansionPanel>;
        // return (<ListItem button key={index} style={{width: "100%"}}>{result}</ListItem>);
    }
    renderApi = (actionFlag, schema, values, actionName) => {
        const apiconfig = values["apiconfig"] && JSON.parse(values["apiconfig"]) && JSON.parse(values["apiconfig"]).apis;
        let result = [];
        result.push(
            <ListItem button key={actionName}>
                <ListItemText
                    primary={<span>{actionFlag.toString()}</span>}
                    secondary={schema[actionName].displayname}
                    title={schema[actionName].displayname}
                    style={{ wordBreak: "break-all" }}
                />
            </ListItem>
        );
        if (apiconfig) {
            actionFlag && result.push(apiconfig.map((config, i) => {
                let res = [];
                _.map(config, (item, index) => {
                    if (typeof item === "object") {
                        res.push(this.renderSubApi(item, schema[index].displayname, index));
                    } else {
                        res.push(
                            <ListItem button key={index}>
                                <ListItemText
                                    primary={<span>{item || ""}</span>}
                                    secondary={schema[index].displayname}
                                    title={schema[index].displayname}
                                    style={{ wordBreak: "break-all" }}
                                />
                            </ListItem>
                        );
                    }
                });
                return res;
            }));
        }
        return result;
    }
    renderDashboard = (actionFlag, schema, values, actionName) => {
        if (!actionFlag) {
            return (
                <ListItem button key={actionName}>
                    <ListItemText
                        primary={<span>{"false"}</span>}
                        secondary={schema[actionName].displayname}
                        title={schema[actionName].displayname}
                        style={{ wordBreak: "break-all" }}
                    />
                </ListItem>
            );
        }
        const result = _.map(schema, (config, index) => {
            return <ListItem button key={index}>
                {index.includes("action") && <ListItemText
                    primary={<span>{"true"}</span>}
                    secondary={config.displayname}
                    title={config.displayname}
                    style={{ wordBreak: "break-all" }}
                />}
                {!index.includes("action") &&
                    <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
                        <ListItemText
                            primary={<span>{(values["name"] || "")}</span>}
                            secondary={config.displayname}
                            title={config.displayname}
                            style={{ wordBreak: "break-all" }}
                        /> 
                        <DrawImage file={values.thumbnail} des={values.des} />
                    </div>}
            </ListItem>;
        });
        return result;
    }
    generateActionSchema() {
        const { actionSchema } = this.props;
        const { values, action, dashboard } = this.state;
        let schema = {};
        schema["email"] = schema["email"] ? schema["email"] : {};
        schema["sms"] = schema["sms"] ? schema["sms"] : {};
        schema["api"] = schema["api"] ? schema["api"] : {};
        schema["dashboard"] = schema["dashboard"] ? schema["dashboard"] : {};
        for (let i in actionSchema) {
            if (i.includes("email")) {
                schema["email"][i] = actionSchema[i];
            } else if (i.includes("sms")) {
                schema["sms"][i] = actionSchema[i];
            } else if (i.includes("dashboard")) {
                schema["dashboard"][i] = actionSchema[i];
            } else {
                schema["api"][i] = actionSchema[i];
            }
        }
        delete schema["email"]["emailinput"];
        delete schema["sms"]["smsinput"];
        return <ul style={{ padding: 0 }}>
            {Object.keys(schema["dashboard"]).length > 0 && this.renderDashboard(dashboard["dashboardaction"], schema["dashboard"], dashboard, "dashboardaction")}
            {Object.keys(schema["email"]).length > 0 && this.showAction(action["email"] && action["email"]["emailaction"], schema["email"], values, "emailaction")}
            {Object.keys(schema["sms"]).length > 0 && this.showAction(action["sms"] && action["sms"]["smsaction"], schema["sms"], values, "smsaction")}
            {Object.keys(schema["api"]).length > 0 && this.renderApi(action["api"] && action["api"]["apiaction"], schema["api"], values, "apiaction")}
        </ul>;
    }

    generateAction() {
        return <List className="rule-group action-group">{this.generateActionSchema()}</List>;
    }
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <div className={classnames("ruleGeneral", "ruleGeneral-update")}>
                    <div className="ruleGeneral-content">
                        <div className={classes.instructions}>{this.generateAction()}</div>
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
        configData: filterProps(state, identify, "configData"),
        actionContent: filterProps(state, identify, "actionContent"),
        dashboardList: state[ccmsExReducer]["customizedDashboards"] || []
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getActionContent: (sitename, module, submodule, config, alarmType, identify) => {
            dispatch(getActionContent(sitename, module, submodule, config, alarmType, identify));
        },
    };
};

export default withStyles(styles)(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(RuleAction)
);
