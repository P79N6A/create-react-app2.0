import React from "react";
import { TextField } from "modules/common";
import { Divider, Typography, FormControlLabel, Switch } from "@material-ui/core";

export const PrivacySwitcher = ({ status, onChange }) => {
    return (
        <FormControlLabel
            label="Privacy"
            control={<Switch checked={status === "2001"} name="status" onChange={onChange} />}
        />
    );
};

export const GroupDetails = ({ name, desc, onChange, validate }) => {
    return (
        <React.Fragment>
            <TextField
                fullWidth
                required
                value={name}
                label="Name"
                name="name"
                onChange={onChange}
                error={validate && name === ""}
            />
            <Divider
                style={{
                    height: 16,
                    background: "transparent"
                }}
            />
            <TextField
                multiline
                rows={4}
                rowsMax={6}
                fullWidth
                name="desc"
                label="Description"
                value={desc}
                onChange={onChange}
            />
        </React.Fragment>
    );
};

export const GroupDelete = ({ name, count }) => {
    return (
        <React.Fragment>
            <Typography>{`You are about to delete "${name}" group, containing ${count} dashboards.`}</Typography>
            <Typography>All dashboards will be retained.</Typography>
            <Typography>You can't undo this action.</Typography>
            <Typography>Do you wish to proceed ?</Typography>
        </React.Fragment>
    );
};

export const AddGroup = ({ name, desc, status, onChange, validate }) => {
    return (
        <React.Fragment>
            <GroupDetails name={name} desc={desc} onChange={onChange} validate={validate} />
            <PrivacySwitcher status={status} onChange={onChange} />
        </React.Fragment>
    );
};
