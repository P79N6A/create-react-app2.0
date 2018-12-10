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
import { REDUCER_NAME as authName } from "modules/auth/funcs/constants";
import { Button } from "modules/common";
import { withStyles } from "@material-ui/core/styles";
import { updateRule } from "../funcs/actions";
import classnames from "classnames";
import ListItem from "@material-ui/core/ListItem";
import { I18n } from "react-i18nify";
import MappingComp from "./mappingComp";
import SystemSchema from "../funcs/systemSchema.json";
import _ from "lodash";
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
            config: {}
        };
    }
    componentWillMount() {
        let { config } = this.state;
        if(_.isEqual(config, this.props.saveConfigs["ruleCondition"]) && this.props.saveConfigs && this.props.saveConfigs["ruleCondition"]){
            this.setState({config: this.props.saveConfigs["ruleCondition"]});
            return;
        }
        const { configData } = this.props;
        if (Object.keys(configData).length > 0) {
            config = configData.configvals && configData.configvals[0] && configData.configvals[0].configval && JSON.parse(configData.configvals[0].configval);
        }
        this.setState({ config });
    }
    // componentWillReceiveProps(nextProps) {
    //     if(_.isEqual(this.props.selectConfigname, nextProps.selectConfigname) && nextProps.saveConfigs && nextProps.saveConfigs["ruleCondition"]){
    //         this.setState({config: nextProps.saveConfigs["ruleCondition"]});
    //         return;
    //     }
    //     let { config } = this.state;
    //     const { configData } = nextProps;
    //     if (Object.keys(configData).length > 0) {
    //         config = configData.configvals && configData.configvals[0] && configData.configvals[0].configval && JSON.parse(configData.configvals[0].configval);
    //     }
    //     this.setState({ config });
    // }
    componentWillUnmount() {
        const {config} = this.state;
        const configs = {ruleCondition: config};
        this.props.saveConfigsFunc(configs, this.props.identify);
    }
    confirmSave = () => {
        const { userid, identify, configData, pageLimit, sitename, modulename, pageNo } = this.props;
        const configName = configData.configname;
        const configvaldesc =
            configData.configvals && configData.configvals[0] && configData.configvals[0].configvaldesc;

        const { config } = this.state;
        let configvalue = JSON.stringify(config);
        this.props.onUpdateRule(sitename, modulename, this.props.submodulename, configName, configvaldesc, configvalue, userid, pageLimit, pageNo, identify);
        this.props.handleFloatTabClose();
    };

    handleCancel = event => {
        this.props.handleFloatTabClose();
    };

    getRuleInfoConfig(data) {
        let { config } = this.state;
        config = Object.assign({}, config, data.configvalue);
        this.setState({ config });
    }
    generateCondition() {
        const conditionSchema = SystemSchema.conditionSchema;
        let result = [];
        const { config } = this.state;
        let configvalue = {};
        configvalue["configvalue"] = config.configvalue ? config.configvalue : config ;
        for (let i in conditionSchema) {
            result.push(
                <ListItem key={i}>
                    <MappingComp
                        data={conditionSchema[i]}
                        label={i}
                        getRuleInfoConfig={this.getRuleInfoConfig.bind(this)}
                        ruleInfoConfig={configvalue}
                        identify={this.props.identify}
                        sitename={this.props.sitename}
                    />
                </ListItem>
            );
        }
        return result;
    }
    renderParamtersList() {
        const { classes } = this.props;
        return (
            <div className={classnames("ruleGeneral", "ruleGeneral-update")}>
                <div className="ruleGeneral-content">
                    <div className={classes.instructions}>
                        {this.generateCondition()}
                    </div>
                    <div className="ruleGeneral-action">
                        <Button color="secondary" onClick={this.handleCancel.bind(this)} className={classes.button}>
                            {I18n.t("common.Cancel")}
                        </Button>
                        <Button color="secondary" onClick={this.confirmSave.bind(this)} className={classes.button}>
                            {I18n.t("common.Save")}
                        </Button>
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
    userid: PropTypes.string
};

RuleCondition.defaultProps = {
    configData: {},
    userid: "admin"
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
        userid: state[authName].userid,
        saveConfigs: filterProps(state, identify, "saveConfigs")
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onUpdateRule: (sitename, modulename, submodulename, configname, configvaldesc, configval, user, pageLimit, pageNo, identify) => {
            dispatch(updateRule(sitename, modulename, submodulename, configname, configvaldesc, configval, user, pageLimit,  pageNo, identify));
        }
    };
};

export default withStyles(styles)(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(RuleCondition)
);
