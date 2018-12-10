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
import { REDUCER_NAME as ruleFloatTabReducer } from "../funcs/constants";
import {
    getConfigDetail,
} from "../funcs/actions";
import { ListItem, ListItemText } from "@material-ui/core";
import classnames from "classnames";
import _ from "lodash";
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
        padding: "0"
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
        config: {}
    };
    componentWillReceiveProps(nextProps) {
        this.searchDeviceDetail(nextProps);
        let configValue = this.getConfigData(nextProps);
        this.setState({ config: configValue });
    }
    componentWillMount() {
        this.searchDeviceDetail(this.props);
        if (!this.props.configData) {
            return;
        }
        let configValue = this.getConfigData(this.props);
        this.setState({ config: configValue });
    }
    shouldComponentUpdate(nextProps, nextStates) {
        return !_.isEqual(this.state, nextStates) || !_.isEqual(this.props, nextProps);
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
    getConfigData(props) {
        let ruleSchema = SystemSchema.ruleSchema;
        const { configData } = props;
        let config = {};
        if (!configData) {
            return;
        }
        config["name"] = props.configData.configname;
        config["description"] = props.configData.configvals && props.configData.configvals[0].configvaldesc;
        const configValue = configData.configvals && configData.configvals[0] && configData.configvals[0].configval && JSON.parse(configData.configvals[0].configval);
        for (let key in ruleSchema) {
            if (key !== "name" && key !== "description") {
                const value = configValue[key];
                config[key] = value;
            }
        }
        return config;
    }

    render() {
        const { classes } = this.props;
        let ruleSchema = SystemSchema.ruleSchema;
        let { config } = this.state;
        return (
            <div className={classnames("ruleGeneral", "ruleGeneral-update")}>
                <div className="ruleGeneral-content">
                    <div className={classes.instructions}>
                        <ul style={{ padding: 0 }}>
                            {_.map(ruleSchema, (item, index) => {
                                config[index] = config[index];
                                return (
                                    <ListItem button key={index}>
                                        <ListItemText
                                            primary={<span className="rule-pre">{(config && config[index]) || ""}</span>}
                                            secondary={item.displayname}
                                            title={item.displayname}
                                            style={{ wordBreak: "break-all" }}
                                        />
                                    </ListItem>
                                );
                            })}
                        </ul>
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getConfigDetail: (sitename, modulename, submodulename, configname, identify) => {
            dispatch(getConfigDetail(sitename, modulename, submodulename, configname, identify));
        }
    };
};

export default withStyles(styles)(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(RuleInfo)
);
