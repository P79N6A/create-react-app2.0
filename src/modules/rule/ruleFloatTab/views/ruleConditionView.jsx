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
 * Created by Wangrui on 22/06/2018.
 */
import React from "react";
import PropTypes from "prop-types";
import "../styles/style.less";
import { connect } from "react-redux";
import { REDUCER_NAME as ruleFloatTabReducer } from "../funcs/constants";
// import { REDUCER_NAME as authName } from "modules/auth/funcs/constants";
import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { ListItem, ListItemText } from "@material-ui/core";
import classnames from "classnames";
import dateUtility from "commons/utils/dateUtility";
import _ from "lodash";
import { I18n } from "react-i18nify";
import ConditionConfig from "./conditionConfig";
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
class RuleCondition extends React.Component {
    constructor() {
        super();
        this.state = {
            config: {},
            expanded: null
        };
    }
    componentWillMount() {
        if (this.props.saveConfigs && this.props.saveConfigs["ruleCondition"]) {
            this.setState({ config: this.props.saveConfigs["ruleCondition"] });
            return;
        }
        let { config } = this.state;
        const { configData } = this.props;
        if (Object.keys(configData).length > 0) {
            config = configData.configvals && configData.configvals[0] && configData.configvals[0].configval && JSON.parse(configData.configvals[0].configval);
        }
        this.setState({ config });
    }

    handleChange = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false,
        });
    };
    renderInnerContent(operator, value) {
        if (operator && operator.includes("between")) {
            return <div className="inner">
                <div><span className="inner-content">{I18n.t("rule.startFrom")}</span><span>{`: ${dateUtility(value[0])}`}</span></div>
                <div><span className="inner-content">{I18n.t("rule.until")}</span><span>{`: ${dateUtility(value[1])}`}</span></div>
            </div>;
        } else {
            return <span>{value.join()}</span>;
        }
    }
    generateCondition = (generateConfig) => {
        if (!generateConfig || !generateConfig.children1) {
            return;
        }
        const { expanded } = this.state;
        let result = [];
        _.map(generateConfig.children1, (children, index) => {
            if (!children.properties.field) {
                return;
            }
            let operator = ConditionConfig.operators[children.properties.operator];
            result.push(
                <ExpansionPanel expanded={expanded === children.id} className="expand-card" key={children.id} onChange={this.handleChange(children.id)}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>{children.properties.field}</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className="expand-card-cont">
                        <ListItem button key="Operator">
                            <ListItemText
                                primary={<span>{operator.label}</span>}
                                secondary={I18n.t("rule.common.operator")}
                                title={I18n.t("rule.common.operator")}
                                style={{ wordBreak: "break-all" }}
                            />
                        </ListItem>
                        <ListItem button key="Value">
                            <ListItemText
                                primary={this.renderInnerContent(children.properties.operator, children.properties.value)}
                                secondary={I18n.t("rule.common.value")}
                                title={I18n.t("rule.common.value")}
                                style={{ wordBreak: "break-all" }}
                            />
                        </ListItem>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            );
        });
        return result;
    }
    renderDevice = (deviceConfig) => {
        const { deviceModelName } = this.props;
        const devicemodel =
            (deviceConfig && deviceConfig.devicemodel && deviceConfig.devicemodel[0].label) || deviceModelName;
        let deviceid =
            deviceConfig &&
            deviceConfig.deviceid &&
            deviceConfig.deviceid.map(item => {
                return item.label;
            });
        deviceid = deviceid && deviceid.join();
        let result = [];
        if (deviceid) {
            result.push(<ListItem button key="deviceid">
                <ListItemText
                    primary={<span className="rule-pre">{deviceid}</span>}
                    secondary={I18n.t("rule.common.device")}
                    title={I18n.t("rule.common.device")}
                    style={{ wordBreak: "break-all" }}
                />
            </ListItem>);
        } else if (devicemodel) {
            result.push(<ListItem button key="devicemodel">
                <ListItemText
                    primary={<span className="rule-pre">{devicemodel}</span>}
                    secondary={I18n.t("rule.common.deviceType")}
                    title={I18n.t("rule.common.deviceType")}
                    style={{ wordBreak: "break-all" }}
                />
            </ListItem>);
        } else {
            result.push(
                <Typography className="empty-condition" key="empty-condition">{I18n.t("rule.common.emptyMsg")}</Typography>
            );
        }
        return result;
    }
    renderParamtersList() {
        const { config } = this.state;
        const { classes } = this.props;
        return (
            <div className={classnames("ruleGeneral", "ruleGeneral-update")}>
                <div className="ruleGeneral-content">
                    <div className={classes.instructions}>
                        {this.renderDevice(config && config.device)}
                        {this.generateCondition(config && config.condition)}
                    </div>
                </div>
            </div>
        );
    }
    render() {
        const { classes } = this.props;
        return <div className={classes.root}>{this.renderParamtersList()}</div>;
    }
}

RuleCondition.propTypes = {
    configData: PropTypes.object,
    deviceModelName: PropTypes.string
};

RuleCondition.defaultProps = {
    configData: {},
    deviceModelName: "",
};

const filterProps = (state, identify, props) => {
    if (state[ruleFloatTabReducer] && state[ruleFloatTabReducer][identify]) {
        return state[ruleFloatTabReducer][identify][props];
    }
};

const mapStateToProps = (state, ownProps) => {
    let identify = ownProps.identify;
    return {
        configData: filterProps(state, identify, "configData"),
        deviceModelName: filterProps(state, identify, "deviceModelName"),
    };
};


export default withStyles(styles)(
    connect(
        mapStateToProps,
        null
    )(RuleCondition)
);
