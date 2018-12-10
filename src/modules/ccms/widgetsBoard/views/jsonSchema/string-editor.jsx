import React from "react";
import { TextField } from "./importForm";

class StringEditor extends React.Component {
    componentDidMount() {
        const { path, defaultValue } = this.props.schema;
        this.setState({
            value: defaultValue
        });
        this.props.updateValue(defaultValue, path);
    }
    onChange(event) {
        let value = event.target.value;
        const { path } = this.props.schema;
        this.setState(
            {
                value: value
            },
            () => {
                this.props.updateValue(value, path);
            }
        );
    }
    render() {
        const { value } = this.state;
        const { header } = this.props.schema;
        return (
            <TextField
                // error={error}
                label={header}
                name={header}
                margin="dense"
                value={value}
                onChange={this.onChange}
            />
        );
    }
}

export default StringEditor;
