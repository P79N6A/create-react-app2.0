import React from "react";
import { Switch, FormControlLabel } from "./importForm";

class StringEditor extends React.Component {
    componentDidMount() {
        const { path, defaultValue } = this.props.schema;
        this.setState({
            value: defaultValue
        });
        this.props.updateValue(defaultValue, path);
    }
    onChange(event) {
        let checked = event.target.checked;
        const { path } = this.props.schema;
        this.setState(
            {
                value: checked
            },
            () => {
                this.props.updateValue(checked, path);
            }
        );
    }
    render() {
        const { value } = this.state;
        const { header } = this.props.schema;
        return (
            <FormControlLabel
                control={<Switch checked={value} onChange={this.onChange} value={value} />}
                label={header}
            />
        );
    }
}

export default StringEditor;
