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
 * Created by Jia Luo on 27/07/2018.
 */
import React from "react";
// import { TextField } from "modules/common";
import PropTypes from "prop-types";
import { DatePicker, Radio, Select, Selects, TextInput as TextField, Checkbox, CodePhone } from "./index";
import { withStyles } from "@material-ui/core/styles";
import { validator } from "./validator";
import { Grid } from "@material-ui/core";
import classnames from "classnames";
import { I18n } from "react-i18nify";
const styles = theme => ({
    textField: {
        marginLeft: 0,
        marginRight: 0,
        width: "100%"
    },
    paper: {
        paddingLeft: theme.spacing.unit * 2,
        paddingRight: theme.spacing.unit * 2
    },
    padding0: {
        paddingTop: 0,
        paddingBottom: 0
    },
    paddingLeft: { paddingLeft: theme.spacing.unit * 2 },
    paddingRight: { paddingRight: theme.spacing.unit * 2 }
});

/**
 * the genaratorForm can speed fast generator form item and bind the events
 * @example
 *
 *
 * @param {object} item
 * @param {func} handleChange
 * @param {func} onChange
 * @param {func} radioChange
 * @param {any} value
 * @param {object} classes
 * @param {string} margin
 * @param {boolean} readOnly
 * @param {boolean} validate
 * @param {func} reportError
 * @returns Component
 */
function genaratorForm(
    item,
    handleChange,
    onChange,
    radioChange,
    checkboxChange,
    value,
    classes,
    margin,
    readOnly,
    validate,
    reportError,
    columns
) {
    // const { classes, margin } = this.props;
    if (item && item.parent) {
        let root = columns.find(n => n.name === item.parent);
        if (root && root.value === false) return null;
    }
    item.property = item.property || {};
    let error = validate ? validator(item.rules, value, columns, item) : { status: true, msg: "" };
    error.msg = error.msg ? I18n.t(error.msg) : "";
    let required =
        typeof item.rules === "string"
            ? item.rules === "required"
            : Array.isArray(item.rules)
                ? !!~item.rules.indexOf("required")
                : false;
    // reportError(item.name, error.status);
    switch (item.type) {
        case "date":
            return (
                <DatePicker
                    required={required}
                    dateRange={item.dateRange}
                    onChange={onChange(item.name, error)}
                    label={item.label}
                    defaultDate={value}
                    {...item.property}
                    disabled={readOnly || item.readOnly}
                />
            );

        case "radio":
            return (
                <Radio
                    required={required}
                    name={item.name}
                    checked={value}
                    handleChange={radioChange}
                    label={item.label}
                    margin={margin}
                    {...item.property}
                    disabled={readOnly || item.readOnly}
                />
            );
        case "checkbox":
            return (
                <Checkbox
                    required={required}
                    name={item.name}
                    checked={value}
                    handleChange={checkboxChange}
                    label={item.label}
                    margin={margin}
                    {...item.property}
                    disabled={readOnly || item.readOnly}
                />
            );
        case "select":
            if (item.multiple) {
                return (
                    <Selects
                        required={required}
                        error={error}
                        name={item.name}
                        value={value}
                        handleChange={handleChange}
                        label={item.label}
                        items={item.items}
                        margin={margin}
                        {...item.property}
                        disabled={readOnly || item.readOnly}
                    />
                );
            } else {
                return (
                    <Select
                        required={required}
                        error={error}
                        name={item.name}
                        value={value}
                        handleChange={handleChange}
                        label={item.label}
                        items={item.items}
                        margin={margin}
                        {...item.property}
                        disabled={readOnly || item.readOnly}
                    />
                );
            }
        case "codephone":
            return (
                <CodePhone
                    required={required}
                    error={error}
                    label={item.label}
                    InputLabelProps={{
                        shrink: true
                    }}
                    type={item.type ? item.type : "text"}
                    className={classes.textField}
                    value={value}
                    name={item.name}
                    onChange={handleChange}
                    margin={margin ? margin : "normal"}
                    {...item.property}
                    disabled={readOnly || item.readOnly ? true : false}
                />
            );
        default:
            if (item.multiline) {
                return (
                    <TextField
                        required={required}
                        error={error}
                        label={item.label}
                        InputLabelProps={{
                            shrink: true
                        }}
                        inputProps={{
                            maxLength: 65535,
                            minLength: 0
                        }}
                        multiline
                        rows={2}
                        rowsMax={6}
                        type={item.type ? item.type : "text"}
                        className={classes.textField}
                        value={value}
                        name={item.name}
                        onChange={handleChange}
                        margin={margin ? margin : "normal"}
                        {...item.property}
                        disabled={readOnly || item.readOnly}
                    />
                );
            } else {
                return (
                    <TextField
                        required={required}
                        error={error}
                        label={item.label}
                        InputLabelProps={{
                            shrink: true
                        }}
                        type={item.type ? item.type : "text"}
                        className={classes.textField}
                        value={value}
                        name={item.name}
                        onChange={handleChange}
                        margin={margin ? margin : "normal"}
                        {...item.property}
                        disabled={readOnly || item.readOnly ? true : false}
                    />
                );
            }
    }
}

/**
 * the Form component integration select(s) | radio | textField | date range ,
 *can report form validation result (true|false), but only limit the current component
 * @example
 *
 *
 * @param {array} columns
 * @param {object} classes
 * @param {string} margin
 * @param {boolean} readOnly
 * @param {boolean} validate
 * @returns Component
 */
class Form extends React.Component {
    state =
        Object.assign.apply(
            {},
            this.props &&
                this.props.columns &&
                this.props.columns.map(item => {
                    return { [item.name]: typeof item.value !== "string" ? item.value : item.value || "" };
                })
        ) || {};
    componentDidMount() {
        this.props.getFormData(Object.assign({}, this.state));
    }
    handleChange = (name, validateResult) => event => {
        this.setState(
            {
                [name]: event.target.value
            }
            // () => {
            //     const { tempState, ...formData } = this.state;
            //     this.props.getFormData(Object.assign({}, formData), this.reportError(tempState, formData));
            // }
        );
        this.props.getFormData(Object.assign({}, this.state, { [name]: event.target.value }));
    };
    onChange = name => (date, dateString) => {
        this.setState(
            {
                [name]: dateString
            }
            // () => {
            //     const { tempState, ...formData } = this.state;
            //     this.props.getFormData(Object.assign({}, formData), this.reportError());
            // }
        );
        this.props.getFormData(Object.assign({}, this.state, { [name]: dateString }));
    };
    radioChange = name => () => {
        let reverse = !this.state[name];
        this.setState(
            {
                [name]: reverse
            },
            () => {
                const { ...formData } = this.state;
                this.props.getFormData(Object.assign({}, formData), this.reportError());
            }
        );
        this.props.getFormData(Object.assign({}, this.state, { [name]: reverse }));
    };
    checkboxChange = (name, checked) => {
        this.setState(
            {
                [name]: checked
            },
            () => {
                const { ...formData } = this.state;
                this.props.getFormData(Object.assign({}, formData), this.reportError());
            }
        );
        this.props.getFormData(Object.assign({}, this.state, { [name]: checked }));
    };

    reportError() {
        const { columns, validate } = this.props;
        const { ...formData } = this.state;
        let root = columns.filter(item => {
            return item.rules;
        });
        for (let i = 0; i < root.length; i++) {
            let item = root[i];
            let error = validate ? validator(item.rules, formData[item.name]) : { status: true, msg: "" };
            if (error && !error.status) return false;
        }
        return true;
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     if (_.isEqual(this.state, nextState)) return false;
    //     return true;
    // }

    componentWillReceiveProps(nextProps) {
        let newState = Object.assign.apply(
            {},
            nextProps.columns.map(item => {
                return { [item.name]: item.value };
            })
        );
        this.setState({
            ...newState
        });
    }

    render() {
        const { columns, classes, margin, readOnly, validate, spacing = 24 } = this.props;
        return (
            <Grid container spacing={spacing}>
                {columns.map((item, i) => {
                    item.value = this.state[item.name] || item.value;
                    const { layout = {} } = item;
                    const {
                        xs = spacing / 2,
                        // sm = spacing/2,
                        // padding = false,
                        paddingLeft = false,
                        paddingRight = false
                    } = layout;
                    return (
                        <Grid
                            item
                            xs={xs}
                            // sm={sm}
                            style={{
                                paddingTop: 0,
                                paddingBottom: 0
                            }}
                            className={classnames(
                                classes.padding0,
                                paddingLeft && classes.paddingLeft,
                                paddingRight && classes.paddingRight
                            )}
                            key={i}
                        >
                            {genaratorForm(
                                item,
                                this.handleChange,
                                this.onChange,
                                this.radioChange,
                                this.checkboxChange,
                                this.state[item.name],
                                classes,
                                margin,
                                readOnly,
                                validate,
                                this.reportError,
                                columns
                            )}
                        </Grid>
                    );
                    // return <React.Fragment>{this.switch(item, i)}</React.Fragment>;
                })}
            </Grid>
        );
    }
}
Form.propTypes = {
    classes: PropTypes.object.isRequired,
    columns: PropTypes.array.isRequired
};
Form.defaultProps = {
    getFormData: () => {}
};
export default withStyles(styles)(Form);
