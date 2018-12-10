import React from "react";
import { TextField } from "modules/common";
import PropTypes from "prop-types";
// import { theme } from "modules/theme";
import { DatePicker, Radio, Select, Selects } from "../../common/index";
import { withStyles } from "@material-ui/core/styles";
const styles = theme => ({
    textField: {
        marginLeft: 0,
        marginRight: 0,
        width: "100%"
    }
});

// const reg = {
//     required: /^\s+/g,
//     email: /^[a-z\d\._]+@[a-z\d\._]+\.[a-z\d\._]+$/g
// };

// const validate = (value, type) => {
//     return reg[type].test(value);
// };

function genaratorForm(item, handleChange, onChange, radioChange, value, classes, margin) {
    // const { classes, margin } = this.props;
    item.property = item.property || {};
    switch (item.type) {
        case "date":
            return (
                <DatePicker onChange={onChange(item.name)} label={item.label} defaultDate={value} {...item.property} />
            );
        case "radio":
            return (
                <Radio
                    name={item.name}
                    checked={value}
                    handleChange={radioChange}
                    label={item.label}
                    margin={margin}
                    {...item.property}
                />
            );
        case "select":
            if (item.multiple) {
                return (
                    <Selects
                        name={item.name}
                        value={value}
                        handleChange={handleChange}
                        label={item.label}
                        items={item.items}
                        margin={margin}
                        {...item.property}
                    />
                );
            } else {
                return (
                    <Select
                        name={item.name}
                        value={value}
                        handleChange={handleChange}
                        label={item.label}
                        items={item.items}
                        margin={margin}
                        {...item.property}
                    />
                );
            }
        default:
            if (item.multiline) {
                return (
                    <TextField
                        label={item.label}
                        InputLabelProps={{
                            shrink: true
                        }}
                        multiline
                        rows={2}
                        rowsMax={6}
                        disabled={item.readOnly}
                        type={item.type ? item.type : "text"}
                        className={classes.textField}
                        value={value}
                        onChange={handleChange(item.name)}
                        margin={margin ? margin : "normal"}
                        {...item.property}
                    />
                );
            } else {
                return (
                    <TextField
                        label={item.label}
                        InputLabelProps={{
                            shrink: true
                        }}
                        disabled={item.readOnly}
                        type={item.type ? item.type : "text"}
                        className={classes.textField}
                        value={value}
                        onChange={handleChange(item.name)}
                        margin={margin ? margin : "normal"}
                        {...item.property}
                    />
                );
            }
    }
}

class Form extends React.Component {
    state = Object.assign.apply(
        {},
        this.props.columns.map(item => {
            return { [item.name]: item.value };
        })
    );

    handleChange = name => event => {
        this.setState(
            {
                [name]: event.target.value
            },
            () => {
                this.props.getFormData(this.state);
            }
        );
    };
    onChange = name => (date, dateString) => {
        this.setState(
            {
                [name]: dateString
            },
            () => {
                this.props.getFormData(this.state);
            }
        );
    };
    radioChange = name => () => {
        let reverse = !this.state[name];
        this.setState(
            {
                [name]: reverse
            },
            () => {
                this.props.getFormData(this.state);
            }
        );
    };

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
        const { columns, classes, margin } = this.props;
        return (
            <React.Fragment>
                {columns.map((item, i) => {
                    return (
                        <React.Fragment key={i}>
                            {genaratorForm(
                                item,
                                this.handleChange,
                                this.onChange,
                                this.radioChange,
                                this.state[item.name],
                                classes,
                                margin
                            )}
                        </React.Fragment>
                    );
                    // return <React.Fragment>{this.switch(item, i)}</React.Fragment>;
                })}
            </React.Fragment>
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
