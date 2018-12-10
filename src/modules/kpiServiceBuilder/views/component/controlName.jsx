import React from "react";
// import PropTypes from "prop-types";
import { TextField } from "modules/common";

const NameControl = props => {
    let { name, identify, onPropertyChange } = props;
    return (
        <TextField
            label="Name*"
            defaultValue={name}
            onChange={event => {
                event.nativeEvent.stopImmediatePropagation();
                onPropertyChange&&onPropertyChange(identify, "name", event.target.value);
            }}
            margin="normal"
        />
    );
};

export default NameControl;
