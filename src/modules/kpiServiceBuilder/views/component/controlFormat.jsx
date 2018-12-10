import React from "react";
// import PropTypes from "prop-types";
import { TextField } from "modules/common";

const FormatControl = props => {
    let { format, identify, onPropertyChange } = props;
    return (
        <TextField
            label="Format*"
            defaultValue={format}
            onChange={event => {
                event.nativeEvent.stopImmediatePropagation();
                onPropertyChange&&onPropertyChange(identify, "format", event.target.value);
            }}
            margin="normal"
        />
    );
};

export default FormatControl;
