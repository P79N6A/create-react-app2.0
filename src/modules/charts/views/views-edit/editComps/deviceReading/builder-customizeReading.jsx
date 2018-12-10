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
 * Created by KaiDi on 25/05/2018.
 */

import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import { I18n } from "react-i18nify";
import { Select, InputLabel } from "modules/common";
import { FormControl, MenuItem, FormControlLabel, Switch } from "@material-ui/core";

const operationList = ["+", "-", "×", "÷"],
    defaultValue = [
        {
            name: "",
            readings: [],
            operation: ""
        }
    ],
    langPath = "chart.editView.customizeReading.";

class Customize extends React.Component {
    static propTypes = {
        source: PropTypes.string,
        isLoading: PropTypes.bool,
        predicates: PropTypes.object,
        customizeReading: PropTypes.array,
        identify: PropTypes.string.isRequired,
        onChangeProperty: PropTypes.func.isRequired
    };
    state = {
        checked: false,
        values: []
    };
    componentWillMount() {
        const { customizeReading } = this.props;
        this.setState({ checked: !_.isEmpty(customizeReading), values: customizeReading });
    }
    componentWillReceiveProps(nextProps) {
        const { customizeReading, predicates } = nextProps,
            { keyList, aggregation } = predicates;
        let checked;
        if (
            !_.isEqual(keyList, this.props.predicates.keyList) ||
            _.isEmpty(keyList) ||
            _.isEmpty(customizeReading) ||
            aggregation !== "None"
        ) {
            checked = false;
        } else {
            checked = true;
        }
        this.state.checked !== checked && this.handleSwitch();
    }

    sendToProp = readings => {
        const { identify, onChangeProperty } = this.props,
            flag = _.every(readings, m => m.name);
        flag && onChangeProperty(identify, { customizeReading: readings || [] });
    };

    onChange = (key, value) => {
        const { values } = this.state;
        let result = _.cloneDeep(values);
        result[key] = value;
        this.setState({ values: result }, () => {
            this.sendToProp(this.state.values);
        });
        // onChangeProperty(identify, "customizeReading", result);
    };
    handleSwitch = () => {
        this.setState({ checked: !this.state.checked, values: !this.state.checked ? defaultValue : undefined }, () => {
            this.sendToProp(this.state.values);
        });
    };
    render() {
        const { isLoading, source, predicates } = this.props,
            { keyList, aggregation } = predicates,
            { checked, values } = this.state;
        return (
            <React.Fragment>
                <FormControlLabel
                    className="chart-plugin-switch"
                    control={
                        <Switch
                            checked={checked}
                            onChange={this.handleSwitch}
                            value="checked"
                            disabled={
                                isLoading ||
                                source !== "event" ||
                                aggregation !== "None" ||
                                _.isEmpty(keyList) ||
                                keyList.length === 1
                            }
                        />
                    }
                    label={I18n.t(langPath + "switchTitle")}
                />
                {_.map(values, (item, index) => (
                    <Selections
                        config={item}
                        isLoading={isLoading}
                        keyList={keyList}
                        key={index}
                        index={index}
                        onChange={this.onChange}
                    />
                ))}
            </React.Fragment>
        );
    }
}

class Selections extends React.Component {
    static propTypes = {
        index: PropTypes.number,
        keyList: PropTypes.array,
        config: PropTypes.object,
        onChange: PropTypes.func.isRequired
    };
    onChange = (name, value) => {
        const { index, onChange, config } = this.props,
            result = { ...config, [name]: value };
        if (result.operation && result.readings && result.readings.length === 2) {
            result.name = result.readings[0] + result.operation + result.readings[1];
        } else {
            result.name = "";
        }
        onChange(index, result);
    };
    render() {
        const { operation, readings } = this.props.config,
            { keyList } = this.props;
        return (
            <div style={{ width: "100%" }}>
                <Reading name="readings" index="0" value={readings} keyList={keyList} onChange={this.onChange} />
                <Operations name="operation" value={operation} onChange={this.onChange} />
                <Reading name="readings" index="1" value={readings} keyList={keyList} onChange={this.onChange} />
            </div>
        );
    }
}

class Reading extends React.Component {
    static propTypes = {
        name: PropTypes.string,
        value: PropTypes.array,
        index: PropTypes.string,
        keyList: PropTypes.array,
        isLoading: PropTypes.bool,
        onChange: PropTypes.func.isRequired
    };
    onChange = newvalue => {
        const { value, index } = this.props;
        let result = _.cloneDeep(value);
        result[index] = newvalue;
        this.props.onChange(this.props.name, result);
    };
    render() {
        const { isLoading, value, keyList, index } = this.props,
            reading = value[index] || undefined;
        return (
            <FormControl disabled={isLoading} style={{ width: "40%" }}>
                <InputLabel htmlFor="type-helper">{I18n.t(langPath + "readingSelect")}</InputLabel>
                <Select
                    value={reading || ""}
                    onChange={event => {
                        this.onChange(event.target.value);
                    }}
                    inputProps={{
                        name: "type",
                        id: "type-helper"
                    }}
                >
                    {_.map(
                        _.filter(keyList || [], key => {
                            const i = index === "1" ? 0 : 1;
                            return key.displayName !== value[i];
                        }),
                        (item, i) => (
                            <MenuItem key={item.displayName} value={item.displayName}>
                                {item.displayName}
                            </MenuItem>
                        )
                    )}
                </Select>
            </FormControl>
        );
    }
}

class Operations extends React.Component {
    static propTypes = {
        name: PropTypes.string,
        value: PropTypes.string,
        isLoading: PropTypes.bool,
        onChange: PropTypes.func.isRequired
    };
    onChange = value => {
        this.props.onChange(this.props.name, value);
    };
    render() {
        const { isLoading, value } = this.props;
        return (
            <FormControl disabled={isLoading} style={{ width: "20%" }}>
                <InputLabel htmlFor="type-helper">{I18n.t(langPath + "oprationSelect")}</InputLabel>
                <Select
                    value={value || ""}
                    onChange={event => {
                        this.onChange(event.target.value);
                    }}
                    inputProps={{
                        name: "type",
                        id: "type-helper"
                    }}
                >
                    {_.map(operationList || [], (item, i) => (
                        <MenuItem key={item} value={item}>
                            {item}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        );
    }
}

export default Customize;
