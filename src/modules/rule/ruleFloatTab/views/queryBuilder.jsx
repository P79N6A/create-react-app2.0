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
import { withStyles } from "@material-ui/core/styles";
import { Query, Builder } from "react-awesome-query-builder";
import ConditionConfig from "./conditionConfig";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { TextField } from "modules/common";
import Immutable from "immutable";
import { I18n } from "react-i18nify";
import _ from "lodash";
// const Immutable = require("immutable");
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
    },
    "@global":{
        ".query-builder .action--ADD-RULE": {
            backgroundColor: theme.palette.secondary.main
        },
        ".query-builder .action--ADD-GROUP": {
            backgroundColor: theme.palette.secondary.main
        },
        ".query-builder .group-or-rule-container .group--conjunctions .ant-btn-group .ant-btn-primary": {
            backgroundColor: theme.palette.secondary.main,
            color: "#fff",
            border: "none"
        },
        ".query-builder .ant-btn-icon-only": {
            backgroundColor: theme.palette.secondary.main
        },
        ".query-builder .group-or-rule-container .group--conjunctions .ant-btn": {
            backgroundColor: theme.palette.background.paper,
            border: "none",
            color: "#999999"
        },
        ".query-builder .group":{
            backgroundColor: theme.palette.background.default,
            border: "1px solid",
            borderColor: theme.palette.background.default
        },
        ".query-builder .rule": {
            backgroundColor: theme.palette.background.paper,
            border: "1px solid transparent",
            padding: "10px"
        },
        ".query-builder .group-or-rule-container > .group-or-rule:before": {
            borderColor: "#666666"
        },
        ".query-builder .ant-btn-danger": {
            color: theme.palette.text.primary
        },
        ".query-builder .ant-btn-group>.ant-btn":{
            color: theme.palette.text.primary
        },
        ".query-builder .qb-drag-handler":{
            color: theme.palette.action.active
        },
        ".query-builder .qb-placeholder":{
            border: "1px dashed",
            borderColor: theme.palette.action.active
        },
        ".query-builder .widget--sep":{
            color: theme.palette.text.primary
        },
        ".query-builder .conjunction label":{
            color: theme.palette.text.primary
        }

    }
});
class QueryBuilder extends React.Component {
    constructor() {
        super();
        this.state = {
            config: {}
        };
        this.handleConditionChange = this.handleConditionChange.bind(this);
    }
    componentWillMount() {
        const {getconditionSuccess, generateConfig} = this.props;
        if(!getconditionSuccess){
            return;
        }
        const config = generateConfig;
        this.setState({ config });
    }

    componentWillReceiveProps(nextProps) {
        const {getconditionSuccess, generateConfig} = nextProps;
        if(!getconditionSuccess && _.isEqual(generateConfig, this.props.generateConfig)){
            return;
        }
        const config = generateConfig;
        this.setState({ config });
    }
    handleConditionChange = tree => {
        let treeConfig = JSON.parse(JSON.stringify(tree, undefined, 2));
        if (treeConfig && treeConfig.children1 && Object.keys(treeConfig.children1).length === 0) {
            treeConfig = {};
        }
        this.setState({ config: treeConfig });
        this.props.getConditionConfig(treeConfig);
    };
    generateQueryBuilder() {
        const { ...config_props } = this.props.conditionConfig;
        const { config } = this.state;
        let treeCondtion = {};
        if (config && Object.keys(config).length > 0) {
            treeCondtion = Immutable.fromJS(config);
        } 
        else {
            if (config_props.fields && Object.keys(config_props.fields).length > 0) {
                const inital = {
                    type: "group",
                    id: "9a99988a-0123-4456-b89a-b1607f326fd8",
                    children1: {
                        "a98ab9b9-cdef-4012-b456-71607f326fd9": {
                            type: "rule",
                            id: "a98ab9b9-cdef-4012-b456-71607f326fd9",
                            properties: {
                                field: "sensorstatus",
                                operator: "select_equals",
                                value: ["Online"],
                                valueSrc: ["value"],
                                operatorOptions: null,
                                valueType: ["select"]
                            }
                        }
                    },
                    properties: {
                        conjunction: "AND"
                    }
                };
                treeCondtion = Immutable.fromJS(inital);
            }
        }
        if (treeCondtion.size > 0) {
            return (
                <Query
                    value={treeCondtion}
                    {...config_props}
                    get_children={this.getChildren}
                    onChange={this.handleConditionChange}
                />
            );
        } else {
            return (
                <Query
                    {...config_props}
                    get_children={this.getChildren}
                    onChange={this.handleConditionChange}
                />
            );
        }
        
    }
    getChildren(props) {
        return (
            <div className="query-builder">
                <Builder {...props} />
            </div>
        );
    }

    render() {
        const { deviceConfig, deviceModelName } = this.props;
        const devicemodel =
            (deviceConfig && deviceConfig.devicemodel && deviceConfig.devicemodel.label) || deviceModelName;
        let deviceid =
            deviceConfig &&
            deviceConfig.deviceid &&
            deviceConfig.deviceid.label;
        return (
            <div>
                <List className="rule-group">
                    {devicemodel && (
                        <ListItem>
                            <TextField
                                label={I18n.t("rule.common.deviceType")} 
                                fullWidth
                                multiline
                                defaultValue={devicemodel}
                                InputLabelProps={{
                                    shrink: true
                                }}
                                disabled
                                style={{ cursor: "default" }}
                            />
                        </ListItem>
                    )}
                    {deviceid && (
                        <ListItem>
                            <TextField
                                label={I18n.t("rule.common.device")} 
                                fullWidth
                                multiline
                                InputLabelProps={{
                                    shrink: true
                                }}
                                disabled
                                defaultValue={deviceid}
                                style={{ cursor: "default" }}
                            />
                        </ListItem>
                    )}
                </List>
                {this.generateQueryBuilder()}
            </div>
        );
    }
}

QueryBuilder.propTypes = {
    conditionConfig: PropTypes.object,
    deviceModelName: PropTypes.string,
    getconditionSuccess: PropTypes.bool
};

QueryBuilder.defaultProps = {
    conditionConfig: ConditionConfig,
    deviceModelName: "",
    getconditionSuccess: false
};

const filterProps = (state, identify, props) => {
    if (state[ruleFloatTabReducer] && state[ruleFloatTabReducer][identify]) {
        return state[ruleFloatTabReducer][identify][props];
    }
};

const mapStateToProps = (state, ownProps) => {
    let identify = ownProps.identify;
    return {
        conditionConfig: filterProps(state, identify, "conditionConfig"),
        deviceModelName: filterProps(state, identify, "deviceModelName"),
        getconditionSuccess: filterProps(state, identify, "getconditionSuccess")
    };
};


export default withStyles(styles)(
    connect(
        mapStateToProps,
        null
    )(QueryBuilder)
);
