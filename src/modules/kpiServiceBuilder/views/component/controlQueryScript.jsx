import React from "react";
// import PropTypes from "prop-types";
import { TextField } from "modules/common";

const QueryScriptControl = props => {
    let { queryScript, identify, onPropertyChange } = props;
    return (
        <TextField
            label="queryScript*"
            multiline
            defaultValue={queryScript}
            InputLabelProps={{
                shrink: true
            }}
            onChange={event => {
                event.nativeEvent.stopImmediatePropagation();
                onPropertyChange&&onPropertyChange(identify, "queryScript", event.target.value);
            }}
            placeholder="Input Your Query Script"
            fullWidth
            margin="normal"
        />
    );
};

export default QueryScriptControl;
