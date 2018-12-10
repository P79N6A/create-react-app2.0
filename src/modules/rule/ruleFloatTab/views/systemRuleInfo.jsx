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
import { REDUCER_NAME as ruleFloatTabReducer } from "../funcs/constants";
import { REDUCER_NAME as authName } from "modules/auth/funcs/constants";
import {
    getConfigDetail,
    updateRule
} from "../funcs/actions";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import classnames from "classnames";
import MappingComp from "./mappingComp";
// import moment from "moment";
import _ from "lodash";
import { I18n } from "react-i18nify";
import SystemSchema from "../funcs/systemSchema.json";
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

class RuleInfo extends React.Component {
    static propTypes = {
        classes: PropTypes.object
    };

    state = {
        config: {},
        showTime: false,
        regexValidate: {},
        saveFlag: false
    };
    componentWillReceiveProps(nextProps) {
        if(nextProps.saveConfigs && nextProps.saveConfigs["ruleInfo"]){
            this.setState({config: nextProps.saveConfigs["ruleInfo"]});
            return;
        }
        this.generateConfigData(nextProps);
        this.searchDeviceDetail(nextProps);
    }
    componentWillMount() {
        if(this.props.saveConfigs && this.props.saveConfigs["ruleInfo"]){
            this.setState({config: this.props.saveConfigs["ruleInfo"]});
            return;
        }
        this.searchDeviceDetail(this.props);
        if (!this.props.configData) {
            return;
        }
        this.generateConfigData(this.props);
    }
    componentWillUnmount() {
        const {config} = this.state;
        const configs = {ruleInfo: config};
        this.props.saveConfigsFunc(configs, this.props.identify);
    }
    generateConfigData(props) {
        if (
            (!props.configData && _.isEqual(props.configData, this.props.configData)) ||
            props.selectConfigname !== props.configData.configname
        ) {
            return;
        }
        let { config } = this.state;
        config["name"] = props.configData.configname;
        config["description"] = props.configData.configvals && props.configData.configvals[0].configvaldesc;
        config["configvalue"] = this.getConfigData(props.configData);
        this.setState({ config, regexValidate: {} });
    }
    searchDeviceDetail(props) {
        if (props.index !== parseInt(props.currentTab, 10) || props.getDetailSuccess) {
            return;
        }
        let configname = props.selectConfigname;
        if (!configname) {
            return;
        }
        this.props.getConfigDetail(props.sitename, props.modulename, props.submodulename, configname, props.identify);
    }
    getConfigData(configData) {
        const { ruleSchema } = SystemSchema.ruleSchema;
        let config = {};
        if (!configData) {
            return;
        }
        const configValue = configData.configvals && configData.configvals[0] && configData.configvals[0].configval && JSON.parse(configData.configvals[0].configval);
        for (let key in ruleSchema) {
            if (key !== "name" || key !== "description") {
                config[key] = "";
            }
        }
        config["condition"] = configValue["condition"];
        config["action"] = configValue["action"];
        return config;
    }
    confirmSave = () => {
        const { configData, userid, identify, pageLimit, sitename, modulename,pageNo} = this.props;
        const { config } = this.state;
        const configName = config.name || configData.configname;
        const configvaldesc = config.description;
        const configValue = JSON.stringify(config.configvalue);
        this.props.onUpdateRule(sitename, modulename, this.props.submodulename, configName, configvaldesc, configValue, userid, pageLimit, pageNo, identify);
        this.props.handleFloatTabClose();
    };
    getRuleInfoConfig(data, regexValidate) {
        let { config } = this.state;
        let configvalue = Object.assign({}, config, data);
        this.setState({ config: configvalue, regexValidate });
        for(let validate in regexValidate){
            if(regexValidate[validate]){
                this.setState({saveFlag:true});
                return;
            }
        }
        this.setState({saveFlag:false});
    }
    RuleInfoSchema() {
        let ruleSchema = SystemSchema.ruleSchema;
        const { config, regexValidate } = this.state;
        
        let result = [];
        for (let i in ruleSchema) {
            result.push(
                <ListItem key={i}>
                    <MappingComp
                        data={ruleSchema[i]}
                        label={i}
                        getRuleInfoConfig={this.getRuleInfoConfig.bind(this)}
                        ruleInfoConfig={config}
                        updateFlag={true}
                        handleShowTime={this.handleShowTime.bind(this)}
                        identify={this.props.identify}
                        sitename={this.props.sitename}
                        regexValidate={regexValidate}
                    />
                </ListItem>
            );
        }
        return result;
    }
    generateGeneral() {
        return (
            <List className="rule-group">
                {this.RuleInfoSchema()}
            </List>
        );
    }
    handleCancel = () => {
        this.props.handleFloatTabClose();
    };
    handleShowTime = e =>{
        this.setState({showTime: e});
    }
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <div className={classnames("ruleGeneral", "ruleGeneral-update")}>
                    <div className="ruleGeneral-content">
                        <div className={classes.instructions}>{this.generateGeneral()}</div>
                        <div className="ruleGeneral-action">
                            <Button color="secondary" onClick={this.handleCancel} className={classes.button}>
                                {I18n.t("common.Cancel")}
                            </Button>
                            <Button color="secondary" disabled={this.state.saveFlag} onClick={this.confirmSave.bind(this)} className={classes.button}>
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
        configData: filterProps(state, identify, "configData"),
        getDetailSuccess: filterProps(state, identify, "getDetailSuccess"),
        userid: state[authName].userid,
        saveConfigs: filterProps(state, identify, "saveConfigs")
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getConfigDetail: (sitename, modulename, submodulename, configname, identify) => {
            dispatch(getConfigDetail(sitename, modulename, submodulename, configname, identify));
        },
        onUpdateRule: (sitename, modulename, submodulename, configname, configvaldesc, configval, user, pageLimit, pageNo, identify) => {
            dispatch(updateRule(sitename, modulename, submodulename, configname, configvaldesc, configval, user, pageLimit, pageNo, identify));
        }
    };
};

export default withStyles(styles)(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(RuleInfo)
);
