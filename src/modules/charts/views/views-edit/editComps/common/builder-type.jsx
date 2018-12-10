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
import { basicOpt } from "modules/charts/funcs/constants";
import { FormControl, MenuItem, FormControlLabel, Switch } from "@material-ui/core";

const langPath = "chart.editView.type.",
    { typeList } = basicOpt;

class Type extends React.Component {
    static propTypes = {
        source: PropTypes.string,
        isLoading: PropTypes.bool,
        predicates: PropTypes.object,
        customizeReading: PropTypes.array,
        identify: PropTypes.string.isRequired,
        onChangeProperty: PropTypes.func.isRequired,
        type: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
    };
    state = { checked: false };
    componentWillMount() {
        const { type } = this.props;
        this.setState({ checked: _.isPlainObject(type) });
    }
    setDefaultValue = (props, checked) => {
        const { predicates, onChangeProperty, identify, customizeReading } = props,
            { keyList } = predicates || {};
        const obj = _.reduce(
            _.concat(keyList || [], customizeReading || []),
            (sum, n) => {
                const name = n.displayName || n.name;
                return name ? { [name]: "line", ...sum } : sum;
            },
            {}
        );
        this.setState({ checked }, () => {
            onChangeProperty(identify, { type: this.state.checked ? obj : "line" });
        });
    };
    componentWillReceiveProps(nextProps) {
        const { type, predicates, customizeReading } = nextProps,
            { aggregation } = predicates || {};
        if (
            _.isEqual(this.props.predicates.keyList, predicates.keyList) &&
            _.isEqual(this.props.customizeReading, customizeReading) &&
            _.isEqual(this.props.predicates.aggregation, aggregation)
        ) {
            return;
        }
        this.setDefaultValue(nextProps, _.isPlainObject(type) && aggregation === "COUNT");
    }
    handleSwitch = () => {
        this.setDefaultValue(this.props, !this.state.checked);
    };
    render() {
        const { source, isLoading, predicates, type } = this.props,
            { aggregation } = predicates || {},
            { checked } = this.state;
        const disable = source !== "event" || aggregation === "COUNT";
        return (
            <React.Fragment>
                {!disable && (
                    <FormControlLabel
                        className="chart-plugin-switch"
                        control={
                            <Switch
                                value="checked"
                                checked={checked}
                                onChange={this.handleSwitch}
                                disabled={isLoading || disable}
                            />
                        }
                        label={I18n.t(langPath + "switchTitle")}
                    />
                )}
                {checked || _.isPlainObject(type) ? (
                    <ParameterSelect {...this.props} />
                ) : (
                    <CommonType {...this.props} />
                )}
            </React.Fragment>
        );
    }
}

class ParameterSelect extends React.Component {
    onSelectChange = (name, value) => {
        const { onChangeProperty, identify, type } = this.props,
            result = { ...type, [name]: value };
        onChangeProperty(identify, { type: result });
    };
    render() {
        const { type, predicates, customizeReading } = this.props,
            { keyList } = predicates || {};
        return (
            <div className="chart-query">
                {_.concat(
                    _.map(keyList, (item, key) => {
                        const value = type[item.displayName];
                        return (
                            <IndividualSelect
                                name={item.displayName}
                                key={item.displayName}
                                value={value}
                                onChange={this.onSelectChange}
                                {...this.props}
                            />
                        );
                    }),
                    _.map(customizeReading, item => {
                        const value = type[item.name];
                        return item.name ? (
                            <IndividualSelect
                                name={item.name}
                                key={item.name}
                                value={value}
                                onChange={this.onSelectChange}
                                {...this.props}
                            />
                        ) : null;
                    })
                )}
            </div>
        );
    }
}

const IndividualSelect = props => {
    const { isLoading, value, name, onChange } = props;
    return (
        <FormControl disabled={isLoading}>
            <InputLabel htmlFor="type-helper">{name + "-" + I18n.t(langPath + "selectTitle")}</InputLabel>
            <Select
                value={value || ""}
                onChange={event => {
                    onChange(name, event.target.value);
                }}
                inputProps={{
                    name: "type",
                    id: "type-helper"
                }}
            >
                {_.map(typeList.individual || [], (item, i) => (
                    <MenuItem key={item.value} value={item.value}>
                        {I18n.t(langPath + item.label)}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

const CommonType = props => {
    const { type, identify, chartType, onChangeProperty, isLoading } = props;
    return (
        <div className="chart-query">
            <FormControl disabled={isLoading}>
                <InputLabel htmlFor="type-helper">{I18n.t(langPath + "selectTitle")}</InputLabel>
                <Select
                    value={type || ""}
                    onChange={event => {
                        const value = event.target.value;
                        onChangeProperty(identify, { type: value });
                    }}
                    inputProps={{
                        name: "type",
                        id: "type-helper"
                    }}
                >
                    {_.map(typeList[chartType] || typeList.default || [], (item, i) => (
                        <MenuItem key={item.value} value={item.value}>
                            {I18n.t(langPath + item.label)}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
};

CommonType.propTypes = {
    type: PropTypes.string,
    isLoading: PropTypes.bool,
    chartType: PropTypes.string,
    identify: PropTypes.string.isRequired,
    onChangeProperty: PropTypes.func.isRequired
};

export default Type;
