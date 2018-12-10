import React from "react";
import PropTypes from "prop-types";
import { FormControl, MenuItem, Checkbox, ListItemText, Switch, FormControlLabel, Divider } from "@material-ui/core";
import { Select, InputLabel } from "modules/common";
import { TextField } from "../../../common";

export const GroupSelecter = ({ groups, selectedGroup, active, onChange }) => {
    return (
        <FormControl fullWidth disabled={!active}>
            <InputLabel>{"Move To"}</InputLabel>
            <Select
                value={selectedGroup}
                multiple
                renderValue={selected => selected.join(", ")}
                onChange={event =>
                    onChange(
                        event,
                        (() => {
                            return groups.filter(g => {
                                return event.target.value.includes(g.id);
                            });
                        })()
                    )
                }
                native={false}
                name="group"
            >
                {groups &&
                    groups.map((group, i) => {
                        const { id } = group;
                        return (
                            <MenuItem key={i} value={id}>
                                <Checkbox checked={selectedGroup.includes(id)} />
                                <ListItemText primary={id} />
                            </MenuItem>
                        );
                    })}
            </Select>
        </FormControl>
    );
};

GroupSelecter.defaultProps = {
    groups: [],
    active: true,
    selectedGroup: []
};

GroupSelecter.propTypes = {
    groups: PropTypes.array,
    active: PropTypes.bool,
    selectedGroup: PropTypes.array
};

export const GroupCreator = ({ status, name, desc, validate, onChange }) => {
    return (
        <FormControl fullWidth>
            <TextField
                required
                name="id"
                value={name}
                label="New Group Name"
                onChange={onChange}
                error={validate && name === ""}
            />
            <Divider
                style={{
                    height: 16,
                    background: "transparent"
                }}
            />
            <TextField name="desc" multiline rows={4} value={desc} label="Group Description" onChange={onChange} />
            <Divider
                style={{
                    height: 16,
                    background: "transparent"
                }}
            />
            <FormControlLabel
                label="Privacy"
                control={<Switch checked={status === "2002"} value="2002" name="status" onChange={onChange} />}
            />
        </FormControl>
    );
};

GroupCreator.defaultProps = {
    checked: false,
    onChange: () => {}
};
GroupCreator.propTypes = {
    checked: PropTypes.bool,
    onChange: PropTypes.func
};
