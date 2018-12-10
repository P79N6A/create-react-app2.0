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
 * Created by KaiDi on 08/10/2018.
 */

import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import { I18n } from "react-i18nify";
import { TextField, Select, InputLabel } from "modules/common";
import { FormControl, Switch, FormControlLabel, MenuItem, IconButton, Icon } from "@material-ui/core";

const initialReadingLabel = {
        reading: "",
        label: ""
    },
    langPath = "chart.editView.readingLabel.";

class ReadingLabel extends React.Component {
    static propTypes = {
        isLoading: PropTypes.bool,
        predicates: PropTypes.object,
        readingLabel: PropTypes.array,
        combineYaxis: PropTypes.array,
        customizeReading: PropTypes.array,
        identify: PropTypes.string.isRequired,
        onChangeProperty: PropTypes.func.isRequired
    };
    state = {
        checked: false,
        readingLabel: [],
        readingList: []
    };
    componentWillMount() {
        const { readingLabel } = this.props;
        const readingList = this.getReadingList(this.props, readingLabel);
        this.setState({ checked: !_.isEmpty(readingLabel), readingLabel, readingList });
    }
    componentWillReceiveProps(nextProps) {
        const { readingLabel, predicates, customizeReading } = nextProps,
            { keyList } = predicates,
            isKeylistChanged = !_.isEqual(keyList, this.props.predicates.keyList),
            checked = isKeylistChanged || _.isEmpty(keyList) || _.isEmpty(readingLabel) ? false : true;
        if (this.state.checked !== checked) {
            this.handleSwitch();
        } else if (isKeylistChanged || !_.isEqual(customizeReading, this.props.customizeReading)) {
            const readingList = this.getReadingList(nextProps, this.state.readingLabel);
            this.setState({ readingList });
        }
    }
    getReadingList = (props, readingLabel) => {
        const { predicates, customizeReading, combineYaxis } = props,
            { keyList } = predicates;
        if (_.isEmpty(keyList)) {
            return [];
        }
        const properList = _.isEmpty(combineYaxis) ? keyList : combineYaxis,
            exsistReadings = _.map(readingLabel, item => item.reading),
            combinedList = _.isEmpty(customizeReading) ? properList : [...properList, ...customizeReading];
        const readingList = _.filter(combinedList, item => {
            return exsistReadings.indexOf(item.name || item.displayName) === -1;
        });
        return readingList;
    };
    onChange = (index, value) => {
        const { onChangeProperty, identify } = this.props;
        let result = _.cloneDeep(this.state.readingLabel);
        result[index] = value;
        const readingList = this.getReadingList(this.props, result);
        this.setState({ readingLabel: result, readingList }, () => {
            onChangeProperty(identify, { readingLabel: result });
        });
    };
    onDelete = index => {
        const { onChangeProperty, identify } = this.props;
        const result = _.filter(this.state.readingLabel, (m, i) => {
            return i === index ? false : true;
        });
        const readingList = this.getReadingList(this.props, result);
        this.setState({ readingLabel: result, readingList }, () => {
            onChangeProperty(identify, { readingLabel: result });
        });
    };
    onAdd = () => {
        const result = [...this.state.readingLabel, initialReadingLabel];
        this.setState({ readingLabel: result });
    };
    handleSwitch = () => {
        const { checked } = this.state,
            { onChangeProperty, identify } = this.props,
            result = !checked ? [initialReadingLabel] : undefined,
            readingList = this.getReadingList(this.props, result);
        this.setState({ checked: !checked, readingLabel: result, readingList }, () => {
            !this.state.checked && onChangeProperty(identify, { readingLabel: result || [] });
        });
    };
    render() {
        const { readingLabel, checked, readingList } = this.state,
            { predicates, isLoading } = this.props,
            { keyList } = predicates;
        return (
            <React.Fragment>
                {!_.isEmpty(keyList) && (
                    <div
                        className="chart-plugin-switch"
                        style={{ display: "inline-flex", verticalAlign: "middle", alignItems: "center" }}
                    >
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={checked}
                                    disabled={isLoading}
                                    onChange={this.handleSwitch}
                                    value="checked"
                                />
                            }
                            label={I18n.t(langPath + "switchTitle")}
                        />
                        {checked && (
                            <IconButton onClick={this.onAdd} disabled={isLoading || _.isEmpty(readingList)}>
                                <Icon>add</Icon>
                            </IconButton>
                        )}
                    </div>
                )}
                {checked &&
                    _.map(readingLabel, (m, index) => {
                        return (
                            <SingleReadingLabel
                                // customizeReading={customizeReading}
                                // predicates={predicates}
                                isLoading={isLoading}
                                readingList={readingList}
                                value={m}
                                key={index}
                                index={index}
                                onDelete={this.onDelete}
                                onChange={this.onChange}
                            />
                        );
                    })}
            </React.Fragment>
        );
    }
}

class SingleReadingLabel extends React.Component {
    static propTypes = {
        index: PropTypes.number,
        value: PropTypes.object,
        isLoading: PropTypes.bool,
        readingList: PropTypes.array,
        onDelete: PropTypes.func.isRequired,
        onChange: PropTypes.func.isRequired
    };
    state = { value: {} };
    componentWillMount() {
        const { value } = this.props;
        this.setState({ value });
    }
    componentWillReceiveProps(nextProps) {
        const { value } = nextProps;
        if (_.isEqual(value, this.props.value)) {
            return;
        }
        this.setState({ value });
    }
    checkCollection = collection => {
        return _.every(collection, (item, key) => {
            return item ? true : false;
        });
    };
    onChange = (name, value) => {
        const { onChange, index } = this.props;
        let vals = _.cloneDeep(this.state.value);
        vals[name] = value;
        this.setState({ value: vals }, () => {
            const { value } = this.state;
            this.checkCollection(value) && onChange(index, value);
        });
    };
    render() {
        const { reading, label } = this.state.value,
            { isLoading, readingList, index, onDelete } = this.props;
        return (
            <div style={{ display: "flex" }}>
                <Reading
                    value={reading}
                    name="reading"
                    label={I18n.t(langPath + "readingSelect")}
                    onChange={this.onChange}
                    readingList={readingList}
                    // predicates={predicates}
                    // customizeReading={customizeReading}
                    isLoading={isLoading}
                />
                <Input
                    value={label}
                    name="label"
                    label={I18n.t(langPath + "labelInput")}
                    onChange={this.onChange}
                    isLoading={isLoading}
                />
                <div style={{ width: "25%" }}>
                    <Delete
                        onClick={() => {
                            onDelete(index);
                        }}
                    />
                </div>
            </div>
        );
    }
}

class Reading extends React.Component {
    static propTypes = {
        name: PropTypes.string,
        value: PropTypes.string,
        isLoading: PropTypes.bool,
        readingList: PropTypes.array,
        onChange: PropTypes.func.isRequired
    };
    render() {
        const { isLoading, readingList, value, name, label } = this.props,
            list = value ? [...readingList, { name: value }] : readingList;
        // const { keyList } = predicates;
        return (
            <FormControl disabled={isLoading} style={{ width: "45%", marginRight: "20px" }}>
                <InputLabel htmlFor="type-helper">{label}</InputLabel>
                <Select
                    value={value || ""}
                    onChange={event => {
                        event.nativeEvent.stopImmediatePropagation();
                        this.props.onChange(name, event.target.value);
                    }}
                    inputProps={{
                        name: "type",
                        id: "type-helper"
                    }}
                >
                    {_.map(list, (item, index) => {
                        const name = item.name || item.displayName;
                        return (
                            <MenuItem key={index} value={name}>
                                {name}
                            </MenuItem>
                        );
                    })}
                </Select>
            </FormControl>
        );
    }
}

class Input extends React.Component {
    static propTypes = {
        name: PropTypes.string,
        value: PropTypes.string,
        label: PropTypes.string,
        isLoading: PropTypes.bool,
        onChange: PropTypes.func.isRequired
    };
    state = { value: "" };
    timer = null;
    componentWillMount() {
        const { value } = this.props;
        this.setState({ value });
    }
    onChange = value => {
        const { onChange, name } = this.props;
        this.setState(
            {
                value
            },
            () => {
                clearTimeout(this.timer);
                this.timer = setTimeout(() => {
                    onChange(name, this.state.value);
                }, 500);
            }
        );
    };
    render() {
        const { isLoading, label, InputProps } = this.props,
            { value } = this.state;
        return (
            <FormControl className="chart-halfplugin" style={{ width: "45%" }}>
                <TextField
                    disabled={isLoading}
                    label={label}
                    style={{ marginTop: 0 }}
                    // defaultValue={min}
                    value={value || ""}
                    onChange={event => {
                        event.nativeEvent.stopImmediatePropagation();
                        // const value = { ...markLine, min: event.target.value };
                        this.onChange(event.target.value);
                    }}
                    InputLabelProps={{
                        shrink: true
                    }}
                    InputProps={InputProps}
                    margin="normal"
                />
            </FormControl>
        );
    }
}

class Delete extends React.Component {
    static propTypes = {
        onClick: PropTypes.func.isRequired
    };
    render() {
        // const { value, onChange, name } = this.props;
        return (
            <IconButton onClick={this.props.onClick}>
                <Icon>delete</Icon>
            </IconButton>
        );
    }
}

export default ReadingLabel;
