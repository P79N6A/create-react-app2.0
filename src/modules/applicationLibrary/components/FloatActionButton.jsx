/*
 * =========================================================================
 *  Copyright (C)2018 NCS Pte. Ltd. All Rights Reserved
 *
 *  This software is confidential and proprietary to NCS Pte. Ltd. You shall
 *  use this software only in accordance with the terms of the license
 *  agreement you entered into with NCS.  No aspect or part or all of this
 *  software may be reproduced, modified or disclosed without full and
 *  direct written authorisation from NCS.
 *
 *  NCS SUPPLIES THIS SOFTWARE ON AN "AS IS" BASIS. NCS MAKES NO
 *  REPRESENTATIONS OR WARRANTIES, EITHER EXPRESSLY OR IMPLIEDLY, ABOUT THE
 *  SUITABILITY OR NON-INFRINGEMENT OF THE SOFTWARE. NCS SHALL NOT BE LIABLE
 *  FOR ANY LOSSES OR DAMAGES SUFFERED BY LICENSEE AS A RESULT OF USING,
 *  MODIFYING OR DISTRIBUTING THIS SOFTWARE OR ITS DERIVATIVES.
 *
 *  =========================================================================
 */
/**
 * Created by @wplei on 25/05/18.
 */
import React from "react";
// import { Icon } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import PropTypes from "prop-types";
import { ClickAwayListener } from "@material-ui/core";
import { Delete, ImportantDevices, Dashboard, MoveToInbox, ArrowBackIos } from "@material-ui/icons";
// import PermissionComponent from "commons/components/permissionComponent";

const styles = Theme => {
    return {
        dial_root: {
            position: "absolute",
            bottom: Theme.spacing.unit * 7,
            right: Theme.spacing.unit * 8
        },
        speedDialActionButton: {
            background: Theme.palette.grey["300"],
            "&:hover": {
                background: Theme.palette.grey["200"]
            }
        }
    };
};

const iconMapping = {
    delete: <Delete />,
    important_devices: <ImportantDevices />,
    dashboard: <Dashboard />,
    move_to_inbox: <MoveToInbox />,
    arrow_back_ios: <ArrowBackIos />
};

const defaultProps = {
    actions: [],
    onMenuClick: () => {},
    open: false
};

const propTypes = {
    actions: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string,
            action: PropTypes.func,
            icon: PropTypes.string
        })
    ),
    onMenuClick: PropTypes.func,
    open: PropTypes.bool
};

class ActionButton extends React.Component {
    state = {
        open: false
    };
    handleClick = (type, action) => {
        switch (type) {
            case "away":
                this.setState({
                    open: false
                });
                break;
            case "toggle":
                this.setState({
                    open: !this.state.open
                });
                break;
            case "menu":
                this.setState({
                    open: false
                });
                this.props.onMenuClick(action);
                break;
            default:
                break;
        }
    };
    render = () => {
        const { open } = this.state;
        const { actions, show, classes } = this.props;
        return (
            <ClickAwayListener onClickAway={() => this.handleClick("away")}>
                <SpeedDial
                    classes={{
                        root: classes.dial_root
                    }}
                    open={open}
                    hidden={!show}
                    ariaLabel="dashboardLibraryActions"
                    icon={<SpeedDialIcon />}
                    onClick={() => this.handleClick("toggle")}
                    direction="up"
                    ButtonProps={{ color: "secondary" }}
                >
                    {actions.map((action, j) => {
                        return (
                            <SpeedDialAction
                                tooltipOpen
                                delay={j * 400}
                                key={action.label}
                                tooltipTitle={action.label}
                                icon={iconMapping[action.icon]}
                                ButtonProps={{
                                    classes: {
                                        root: classes.speedDialActionButton
                                    }
                                }}
                                onClick={() => this.handleClick("menu", action)}
                            />
                        );
                    })}
                </SpeedDial>
            </ClickAwayListener>
        );
    };
}

ActionButton.defaultProps = defaultProps;
ActionButton.propTypes = propTypes;

export default withStyles(styles)(ActionButton);
