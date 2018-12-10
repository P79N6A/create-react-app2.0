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
import { ColorPicker } from "modules/common";
import NumberFormat from "react-number-format";
import { TextField, Select, InputLabel } from "modules/common";
import { FormControl, Switch, FormControlLabel, MenuItem, Icon, IconButton } from "@material-ui/core";

const initialMarkLine = {
        reading: "",
        name: "",
        value: null,
        color: "#fff"
    },
    langPath = "chart.editView.markLine.";

const TextMaskCustom = props => {
    const { inputRef, ...other } = props;
    return <NumberFormat ref={inputRef} {...other} />;
};

class MarkLine extends React.Component {
    static propTypes = {
        isLoading: PropTypes.bool,
        markLines: PropTypes.array,
        predicates: PropTypes.object,
        customizeReading: PropTypes.array,
        identify: PropTypes.string.isRequired,
        onChangeProperty: PropTypes.func.isRequired
    };
    state = {
        checked: false,
        markLines: []
    };
    componentWillMount() {
        const { markLines } = this.props;
        this.setState({ checked: !_.isEmpty(markLines), markLines: markLines });
    }
    componentWillReceiveProps(nextProps) {
        const { markLines, predicates } = nextProps,
            { keyList } = predicates;
        let checked;
        if (!_.isEqual(keyList, this.props.predicates.keyList) || _.isEmpty(keyList) || _.isEmpty(markLines)) {
            checked = false;
        } else {
            checked = true;
        }
        this.state.checked !== checked && this.handleSwitch();
    }
    onChange = (index, value) => {
        const { onChangeProperty, identify } = this.props;
        let result = _.cloneDeep(this.state.markLines);
        result[index] = value;
        this.setState({ markLines: result }, () => {
            onChangeProperty(identify, { markLines: result });
        });
    };
    onDelete = index => {
        const { onChangeProperty, identify } = this.props;
        const result = _.filter(this.state.markLines, (m, i) => {
            return i === index ? false : true;
        });
        this.setState({ markLines: result }, () => {
            onChangeProperty(identify, { markLines: result });
        });
    };
    onAdd = () => {
        const result = [...this.state.markLines, initialMarkLine];
        this.setState({ markLines: result });
    };
    handleSwitch = () => {
        const { checked } = this.state,
            { onChangeProperty, identify } = this.props;
        const result = !checked ? [initialMarkLine] : undefined;
        this.setState({ checked: !checked, markLines: result }, () => {
            !this.state.checked && onChangeProperty(identify, { markLines: result || [] });
        });
    };
    render() {
        const { markLines, checked } = this.state,
            { predicates, isLoading, customizeReading } = this.props,
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
                                    value="checked"
                                    checked={checked}
                                    disabled={isLoading}
                                    onChange={this.handleSwitch}
                                />
                            }
                            label={I18n.t(langPath + "switchTitle")}
                        />
                        {checked && (
                            <IconButton onClick={this.onAdd} disabled={isLoading}>
                                <Icon>add</Icon>
                            </IconButton>
                        )}
                    </div>
                )}
                {checked &&
                    _.map(markLines, (m, index) => {
                        return (
                            <SingleMarkLine
                                value={m}
                                key={index}
                                index={index}
                                isLoading={isLoading}
                                predicates={predicates}
                                onDelete={this.onDelete}
                                onChange={this.onChange}
                                customizeReading={customizeReading}
                            />
                        );
                    })}
            </React.Fragment>
        );
    }
}

class SingleMarkLine extends React.Component {
    static propTypes = {
        value: PropTypes.object,
        index: PropTypes.number,
        isLoading: PropTypes.bool,
        predicates: PropTypes.object,
        customizeReading: PropTypes.array,
        onChange: PropTypes.func.isRequired,
        onDelete: PropTypes.func.isRequired
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
        const { color, reading, value, name } = this.state.value,
            { isLoading, predicates, customizeReading, index, onDelete } = this.props;
        return (
            <div style={{ display: "flex" }}>
                <Reading
                    name="reading"
                    label={I18n.t(langPath + "readingTitle")}
                    value={reading}
                    isLoading={isLoading}
                    predicates={predicates}
                    onChange={this.onChange}
                    customizeReading={customizeReading}
                />
                <Input value={name} name="name" label="Name" onChange={this.onChange} isLoading={isLoading} />
                <Input
                    name="value"
                    label={I18n.t(langPath + "valueTitle")}
                    value={value}
                    isLoading={isLoading}
                    onChange={this.onChange}
                    InputProps={{ inputComponent: TextMaskCustom }}
                />
                <div style={{ maxWidth: "25%" }}>
                    <Color value={color} name="color" onChange={this.onChange} isLoading={isLoading} />
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
        predicates: PropTypes.object,
        customizeReading: PropTypes.array,
        onChange: PropTypes.func.isRequired
    };
    render() {
        const { isLoading, predicates, customizeReading, value, name, label } = this.props,
            { keyList } = predicates;
        return (
            <FormControl disabled={isLoading} style={{ width: "25%", marginRight: "5px" }}>
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
                    {_.concat(
                        _.map(keyList || [], (item, i) => (
                            <MenuItem key={item.displayName} value={item.displayName}>
                                {item.displayName}
                            </MenuItem>
                        )),
                        _.map(customizeReading, item => (
                            <MenuItem key={item.name} value={item.name}>
                                {item.name}
                            </MenuItem>
                        ))
                    )}
                </Select>
            </FormControl>
        );
    }
}
class Input extends React.Component {
    static propTypes = {
        name: PropTypes.string,
        label: PropTypes.string,
        isLoading: PropTypes.bool,
        InputProps: PropTypes.object,
        onChange: PropTypes.func.isRequired,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
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
            <FormControl className="chart-halfplugin" style={{ width: "25%", marginRight: "5px" }}>
                <TextField
                    label={label}
                    value={value || ""}
                    disabled={isLoading}
                    style={{ marginTop: 0 }}
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

class Color extends React.Component {
    static propTypes = {
        name: PropTypes.string,
        value: PropTypes.string,
        onChange: PropTypes.func.isRequired
    };
    render() {
        const { value, onChange, name } = this.props;
        return (
            <ColorPicker
                initColor={value}
                onSelect={value => {
                    onChange(name, value);
                }}
            />
        );
    }
}

class Delete extends React.Component {
    static propTypes = {
        onClick: PropTypes.func.isRequired
    };
    render() {
        return (
            <IconButton onClick={this.props.onClick}>
                <Icon>delete</Icon>
            </IconButton>
        );
    }
}

export default MarkLine;
