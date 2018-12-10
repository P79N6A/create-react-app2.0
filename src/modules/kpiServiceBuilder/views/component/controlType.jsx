import React from "react";
// import PropTypes from "prop-types";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import { Select, InputLabel } from "modules/common";
import _ from "lodash";

const TypeControl = props => {
    let { type, identify, dbList, onPropertyChange } = props;
    return (
        <FormControl className="kpiQuery-row">
            <InputLabel htmlFor="type-helper">Type*</InputLabel>
            <Select
                value={type || ""}
                onChange={event => {
                    onPropertyChange&&onPropertyChange(identify, "type", event.target.value);
                }}
                inputProps={{
                    name: "type",
                    id: "type-helper"
                }}
            >
                {_.map(dbList || [], (item, i) => (
                    <MenuItem key={item.configname} value={item.configname}>
                        {item.configname}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default TypeControl;
