import { Checkbox, CircularProgress, FormControlLabel, Grow, Icon, IconButton, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, Radio, Switch } from "@material-ui/core";
import LOGO from "modules/img/images/logo-ncs.png";
import PropTypes from "prop-types";
import React from "react";

export const ListImage = ({ image }) => {
    return (
        <div
            style={{
                width: 128,
                height: 72,
                background: "#000"
            }}
            src={image}
            alt="thumbnail"
        />
    );
};

export const Template = ({ templates, category, seqId: checkedId, onDelete, onSelect }) => {
    return (
        <section
            style={{
                maxHeight: "40vh",
                overflow: "hidden auto",
                margin: "16px -16px 0 0"
            }}
        >
            <List
                component="nav"
                disablePadding
                style={{
                    paddingRight: 10
                }}
            >
                {templates.length ? (
                    templates.map((template, i) => {
                        const { id, value, seqId } = template;
                        const { desc, pageConfig } = value;
                        const { configValue } = pageConfig;
                        const { thumbnail } = configValue;
                        return (
                            <Grow in timeout={i * 300} key={i}>
                                <ListItem
                                    button
                                    onClick={() => {
                                        onSelect(template);
                                    }}
                                >
                                    {category === "user" && (
                                        <ListItemIcon>
                                            <IconButton onClick={() => onDelete(template)}>
                                                <Icon>delete</Icon>
                                            </IconButton>
                                        </ListItemIcon>
                                    )}
                                    <ListImage image={LOGO} />
                                    <ListItemText primary={id} secondary={desc} />
                                    <ListItemSecondaryAction>
                                        <Radio checked={checkedId === seqId} onClick={() => onSelect(template)} />
                                    </ListItemSecondaryAction>
                                </ListItem>
                            </Grow>
                        );
                    })
                ) : (
                    <CircularProgress
                        style={{
                            position: "fixed",
                            left: "50%"
                        }}
                        size={20}
                        color="secondary"
                    />
                )}
            </List>
        </section>
    );
};
Template.defaultProps = {
    templates: [],
    category: "default"
};
Template.propTypes = {
    templates: PropTypes.array,
    category: PropTypes.oneOf(["default", "user"])
};

export const PrivacySwitcher = ({ status, onChange }) => {
    return (
        <FormControlLabel
            label="Privacy"
            control={<Switch checked={status === "2001"} name="status" onChange={onChange} />}
        />
    );
};

PrivacySwitcher.defaultProps = {
    status: "2002",
    onChange: () => {}
};

PrivacySwitcher.propTypes = {
    status: PropTypes.string,
    onChange: PropTypes.func
};

export const PriorityCheckbox = ({ priority, onChange }) => {
    return (
        <FormControlLabel
            control={<Checkbox onChange={onChange} check={priority} name="priority" value="high" />}
            label="Set As High Priority"
        />
    );
};

PriorityCheckbox.defaultProps = {
    priority: "default",
    onChange: () => {}
};

PriorityCheckbox.propTypes = {
    priority: PropTypes.string,
    onChange: PropTypes.func
};
