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
import { Select, InputLabel } from "modules/common";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import {
    getTopologyListData,
    getTopologyModelListData,
    getRuleConditionConfig,
    getTopologyModelInfoSuccess
} from "../funcs/actions";
import ConditionConfig from "./conditionConfig";
import { Filter as TopologySearch } from "modules/filter/topologyFilter";
import { Filter as TopologyDeviceModelSearch } from "modules/filter/topologyDeviceModelSearch";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import { I18n } from "react-i18nify";
const styles = theme => ({});
class ConditonRule extends React.Component {
    constructor() {
        super();
        this.state = {
            config: {},
            mode: "deviceid",
            defaultValue: undefined
        };
    }
    componentWillReceiveProps(nextProps) {
        if (
            (nextProps.conditionSchema && Object.keys(nextProps.conditionSchema).length > 0) ||
            nextProps.deviceConfig
        ) {
            const config = nextProps.deviceConfig;
            const mode = config && Object.keys(config) && Object.keys(config)[0];
            let defaultV = [];
            if (mode) {
                defaultV = config[mode];
                this.setState({ config, defaultValue: defaultV, mode: mode });
            } else {
                this.setState({ config, defaultValue: undefined });
            }
        }
    }
    componentWillMount() {
        const config = this.props.deviceConfig;
        const mode = config && Object.keys(config) && Object.keys(config)[0];
        let defaultV = [];
        if (mode) {
            defaultV = config[mode];
            this.setState({ config, defaultValue: defaultV, mode: mode });
        } else {
            this.setState({ config, mode: "deviceid", defaultValue: undefined });
        }
    }
    handleChangeMode(e) {
        const { identify } = this.props;
        let config = {};
        this.setState({ config, defaultValue: undefined, mode: e.target.value });
        this.props.getTopologyModelInfoSuccess(undefined, identify, "");
        this.props.getDeviceConfig(config);
    }
    getConfigData(conditionSchema, conConfig) {
        for (let key in conditionSchema) {
            let item = conditionSchema[key];
            let result = {};
            const enumData = item.enum && item.enum.split(",");
            if (enumData && enumData.length > 0) {
                enumData.map(itememun => {
                    result[itememun] = itememun;
                    return result;
                });
                conConfig[key] = this.getConfig(item.displayName, "select", result);
            } else {
                conConfig[key] = this.getConfig(item.displayName, item.dataType || "string");
            }
        }
        return conConfig;
    }
    getConditionSchema(conditionSchema) {
        let conConfig = {};
        if (conditionSchema instanceof Array) {
            for (let i = 0; i < conditionSchema.length; i++) {
                conConfig = this.getConfigData(conditionSchema[i], conConfig);
            }
        } else {
            conConfig = this.getConfigData(conditionSchema, conConfig);
        }

        if (Object.keys(conConfig).length > 0) {
            ConditionConfig.fields = conConfig;
        } else {
            ConditionConfig.fields = {};
        }
        this.props.getRuleConditionConfig(ConditionConfig, this.props.identify);
    }
    getTopologyChoosedData = e => {
        const { identify, sitename } = this.props;
        let { config } = this.state;
        if (!e) {
            config = {};
            this.props.getTopologyModelInfoSuccess(undefined, identify, "");
        } else {
            config = { deviceid: e };
        }
        this.setState({ config, defaultValue: e });
        this.props.getDeviceConfig(config);
        e && this.props.getTopologyListData(sitename, e, identify);
    };

    getTopologyModelChoosedData = e => {
        const { identify, sitename } = this.props;
        let { config } = this.state;
        if (!e) {
            config = {};
            this.props.getTopologyModelInfoSuccess(undefined, identify, "");
        } else {
            config = { devicemodel: e };
        }
        e && this.props.getTopologyModelListData(sitename, e.value, identify, e.label);
        this.setState({ config, defaultValue: e });
        this.props.getDeviceConfig(config);
    };
    getConfig(displayname, key, enumlist) {
        const configs = {
            datetime: {
                label: displayname,
                type: "datetime",
                valueSources: ["value"]
            },
            time: {
                label: displayname,
                type: "time",
                valueSources: ["value"]
            },
            double: {
                label: displayname,
                type: "number",
                fieldSettings: {
                    min: 0
                }
            },
            integer: {
                label: displayname,
                type: "number",
                fieldSettings: {
                    min: 0
                }
            },
            string: {
                label: displayname,
                type: "text",
                // operators: ["equal", "not_equal", "contains", "start_with", "end_with"],
                // defaultOperator: "equal",
                mainWidgetProps: {
                    formatValue: (val, fieldDef, wgtDef, isForDisplay) => "__" + JSON.stringify(val),
                    valueLabel: displayname,
                    valuePlaceholder: "Enter" + displayname,
                    validateValue: (val, fieldDef) => {
                        return val !== "test2";
                    }
                }
            },
            select: {
                label: displayname,
                type: "select",
                defaultOperator: "select_equals",
                operators: ["select_equals", "select_not_equals"],
                listValues: enumlist
            }
        };
        return configs[key];
    }
    generateCondition() {
        const { mode, defaultValue } = this.state;
        const { data } = this.props;
        const mapping = { deviceid: I18n.t("rule.common.device"), devicemodel: I18n.t("rule.common.deviceType") };
        return (
            <div style={{ width: "100%" }}>
                <FormControl style={{width: "100%"}}>
                    <InputLabel htmlFor="mode-simple" color="secondary">{data.displayname}</InputLabel>
                    <Select
                        value={mode}
                        onChange={this.handleChangeMode.bind(this)}
                        fullWidth
                        inputProps={{
                            name: "mode",
                            id: "mode-simple"
                        }}
                    >
                        {data.enum &&
                            data.enum.map(item => {
                                let key = item.toLowerCase().replace(/\s*/g, "")+"id";
                                key = key !== "deviceid" ? "devicemodel" : key;
                                return <MenuItem value={key} key={key}>{item}</MenuItem>;
                            })}
                    </Select>
                </FormControl>
                <FormControl style={{width: "100%", padding: "12px 0"}}>
                    {/* <InputLabel htmlFor="mode-simple" color="secondary">{data.displayname}</InputLabel> */}
                    <Typography variant="caption">{`${I18n.t("rule.common.select")} ${mapping[mode]}`}</Typography>
                    {mode === "deviceid" ? (
                        <TopologySearch
                            getChoosedData={this.getTopologyChoosedData.bind(this)}
                            placeholder={I18n.t("rule.common.searchDevice")}
                            // defaultValue={defaultValue}
                            isMulti={false}
                            value={defaultValue}
                            identify={this.props.identify}
                            style={{ width: "100%" }}
                        />
                    ) : (
                        <TopologyDeviceModelSearch
                            getChoosedData={this.getTopologyModelChoosedData.bind(this)}
                            placeholder={I18n.t("rule.common.searchDeviceType")}
                            // defaultValue={defaultValue}
                            isMulti={false}
                            value={defaultValue}
                            identify={this.props.identify}
                            style={{ width: "100%" }}
                        />
                    )}
                </FormControl>
            </div>
        );
    }

    render() {
        const { conditionSchema } = this.props;
        this.getConditionSchema(conditionSchema);
        return this.generateCondition();
    }
}

ConditonRule.propTypes = {
    conditionSchema: PropTypes.object
};

ConditonRule.defaultProps = {
    conditionSchema: {}
};

const filterProps = (state, identify, props) => {
    if (state[ruleFloatTabReducer] && state[ruleFloatTabReducer][identify]) {
        return state[ruleFloatTabReducer][identify][props];
    }
};

const mapStateToProps = (state, ownProps) => {
    let identify = ownProps.identify;
    return {
        conditionSchema: filterProps(state, identify, "conditionSchema")
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getTopologyListData: (sitename, ids, identify) => {
            dispatch(getTopologyListData(sitename, ids, identify));
        },
        getTopologyModelListData: (sitename, deviceModelId, identify, deviceModelName) => {
            dispatch(getTopologyModelListData(sitename, deviceModelId, identify, deviceModelName));
        },
        getRuleConditionConfig: (conditionConfig, identify) => {
            dispatch(getRuleConditionConfig(conditionConfig, identify));
        },
        getTopologyModelInfoSuccess: (conditionSchema, identify, deviceModelName) => {
            dispatch(getTopologyModelInfoSuccess( conditionSchema, identify, deviceModelName));
        }
    };
};

export default withStyles(styles)(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(ConditonRule)
);
