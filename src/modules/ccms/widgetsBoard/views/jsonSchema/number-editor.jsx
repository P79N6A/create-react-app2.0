import React from "react";
import { TextField } from "./importForm";

class NumberEditor extends React.Component {
    componentDidMount() {
        const { path, defaultValue } = this.props.schema;
        this.setState({
            value: +defaultValue
        });
        this.props.updateValue(+defaultValue, path);
    }
    onChange(event) {
        let value = +event.target.value;
        const { path } = this.props.schema;
        this.setState(
            {
                value: +value,
                error: !/d+/g.test(value)
            },
            () => {
                this.props.updateValue(value, path);
            }
        );
    }
    render() {
        const { error, value } = this.state;
        const { header } = this.props.schema;
        return (
            <TextField
                error={error}
                label={header}
                name={header}
                margin="dense"
                value={String(value)}
                onChange={this.onChange}
            />
        );
    }
}

export default NumberEditor;
