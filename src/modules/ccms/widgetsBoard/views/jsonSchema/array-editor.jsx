import React from "react";
import { Select, FormControl, InputLabel, MenuItem, Input, Checkbox, ListItemText } from "./importForm";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250
        }
    }
};

// multiple
const Mul = ({ classes, header, value, source, onChange }) => {
    return (
        <FormControl className={classes.formControl}>
            <InputLabel htmlFor="select-multiple-checkbox">{header}</InputLabel>
            <Select
                multiple
                value={value}
                onChange={onChange}
                input={<Input id={"select-multiple-checkbox" + header} />}
                renderValue={selected => selected.join(", ")}
                MenuProps={MenuProps}
            >
                {source.map(name => (
                    <MenuItem key={name} value={name}>
                        <Checkbox checked={value.indexOf(name) > -1} />
                        <ListItemText primary={name} />
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

// radio select
const Single = ({ classes, header, value, source, onChange }) => {
    return (
        <FormControl className={classes.formControl}>
            <InputLabel htmlFor="age-simple">Age</InputLabel>
            <Select value={value} onChange={onChange}>
                {source.map((name, i) => {
                    return (
                        <MenuItem key={i} value={name}>
                            {name}
                        </MenuItem>
                    );
                })}
            </Select>
        </FormControl>
    );
};

class ArrayEditor extends React.Component {
    componentDidMount() {
        const { path, defaultValue } = this.props.schema;
        this.setState({
            value: defaultValue
        });
        this.props.updateValue(defaultValue, path);
    }

    onChange = event => {
        let value = event.target.value;
        const { path } = this.props.schema;
        this.setState({ value: value });
        this.props.updateValue(value, path);
    };

    render() {
        const classes = {};
        // theme = {};
        const { source, header, multiple } = this.props.schema;
        const { value } = this.state;
        if (multiple) {
            return <Mul classes={classes} header={header} source={source} value={value} />;
        } else {
            return <Single classes={classes} header={header} source={source} value={value} />;
        }
    }
}

export default ArrayEditor;
