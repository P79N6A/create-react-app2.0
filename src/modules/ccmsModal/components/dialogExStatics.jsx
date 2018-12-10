import React from "react";
import { Button, IconButton, Icon, Slide } from "@material-ui/core";
import { InputAdornment, Input } from "modules/common";

export const DialogActionButtons = ({ actions, onClick, actionState }) => {
    return (
        <React.Fragment>
            {actions.map(action => {
                return (
                    (action.state === undefined ||
                        actionState === action.state ||
                        (Array.isArray(action.state) && action.state.includes(actionState))) && (
                        <Button
                            color="secondary"
                            variant={action.variant || "text"}
                            disabled={!action.active}
                            key={action.id}
                            onClick={() => onClick(action)}
                        >
                            {action.text}
                        </Button>
                    )
                );
            })}
        </React.Fragment>
    );
};

export const DialogHeaderActions = ({ actions, onClick, searchInput, actionState }) => {
    return (
        <div className="buttonGroup">
            {actions.map(action => {
                return (
                    (action.state === undefined ||
                        actionState === action.state ||
                        (Array.isArray(action.state) && action.state.includes(actionState))) &&
                    (action.id === "search" ? (
                        <Input
                            type="text"
                            name="search-input"
                            value={searchInput}
                            id="dialog-search-input"
                            onChange={event => onClick(action, event)}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton>
                                        <Icon>{action.icon}</Icon>
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    ) : (
                        <IconButton disabled={!action.active} key={action.id} onClick={() => onClick(action)}>
                            <Icon>{action.icon}</Icon>
                        </IconButton>
                    ))
                );
            })}
        </div>
    );
};

export const TranstionComponent = props => {
    return <Slide direction="up" {...props} />;
};

export const Mask = ({ open = false }) => {
    return open ? (
        <div
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 1330,
                cursor: "not-allowed"
            }}
        />
    ) : null;
};
