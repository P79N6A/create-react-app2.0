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
import { Button, Icon, List, ListItem, Paper, Collapse, Grow, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import propTypes from "prop-types";
// import { theme as themes } from "modules/theme";
import PermissionComponent from "commons/components/permissionComponent";

const styles = theme => {
    return {
        actionfabbutton: {
            position: "absolute",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            zIndex: 1101,
            opacity: "1!important",
            transform: "scale(1,1)!important",
            bottom: 60,
            right: 35
        },
        actionMenuItems: {
            display: "flex",
            justifyContent: "flex-end",
            paddingRight: `${theme.spacing.unit}px !important`,
            paddingTop: `${theme.spacing.unit}px !important`,
            paddingBottom: `${theme.spacing.unit}px !important`
        },
        actionmenuitem_button: {
            marginLeft: theme.spacing.unit * 2
        },
        paper_root: {
            background: theme.palette.grey["50"],
            paddingTop: theme.spacing.unit / 2,
            paddingBottom: theme.spacing.unit / 2,
            paddingLeft: theme.spacing.unit,
            paddingRight: theme.spacing.unit,
            color: theme.palette.grey["A700"],
            userSelect: "none"
        },
        typography_root: {
            color: "black"
        },
        button_root: {
            color: theme.palette.grey["A700"] + "!important",
            background: theme.palette.grey["50"]
        },
        dialog: {
            width: "100%",
            height: "200%",
            position: "fixed",
            top: "-100%",
            opacity: 0,
            background: "#333",
            zIndex: 1100
        },
        actionLabel_style: {
            color: theme.palette.grey["A700"]
        },
        button_sizeSmall: {
            minHeight: 32,
            minWidth: 32
        },
        button_sizeLarge: {
            minHeight: 64,
            minWidth: 64
        }
    };
};

class ActionButton extends React.Component {
    state = {
        actionButtonOpen: false
    };
    static defaultProps = {
        actions: [],
        top: 8 * 5 + 6,
        right: 8,
        // medium|small|large
        size: "medium",
        onMenuClick: () => {}
    };
    static propTypes = {
        actions: propTypes.arrayOf(
            propTypes.shape({
                label: propTypes.string,
                action: propTypes.func,
                icon: propTypes.string
            })
        )
    };
    handleButtonClick = () => {
        this.setState({
            actionButtonOpen: !this.state.actionButtonOpen
        });
    };
    handleMenuClick = item => {
        this.props.onMenuClick(item);
        this.handleButtonClick();
        // this.setState({
        //     actionButtonOpen: !this.state.actionButtonOpen
        // });
    };
    closeDialog = () => {
        this.setState({
            actionButtonOpen: false
        });
    };
    render = () => {
        const { classes, actions, editMode, size } = this.props;
        const { actionButtonOpen } = this.state;
        return (
            // <MuiThemeProvider theme={themes}>
            <React.Fragment>
                {actionButtonOpen && <div onClick={this.closeDialog} className={classes.dialog} />}
                <Grow
                    in={!!editMode}
                    timeout={{
                        enter: 200,
                        exit: 200
                    }}
                >
                    <div className={classes.actionfabbutton}>
                        {actionButtonOpen && (
                            <Collapse in={actionButtonOpen} timeout={{ enter: 200, exit: 200 }}>
                                <List>
                                    {actions &&
                                        actions.map((item, index) => {
                                            return (
                                                <PermissionComponent key={index} material-key={item["material-key"]}>
                                                    <ListItem className={classes.actionMenuItems} key={index}>
                                                        <Paper classes={{ root: classes.paper_root }}>
                                                            <Typography
                                                                component="p"
                                                                classes={{
                                                                    root: classes.actionLabel_style
                                                                }}
                                                            >
                                                                {item.label}
                                                            </Typography>
                                                        </Paper>
                                                        <Button
                                                            mini
                                                            variant="fab"
                                                            classes={{ root: classes.button_root }}
                                                            className={classes.actionmenuitem_button}
                                                            onClick={() => this.handleMenuClick(item)}
                                                        >
                                                            <Icon>{item.icon}</Icon>
                                                        </Button>
                                                    </ListItem>
                                                </PermissionComponent>
                                            );
                                        })}
                                </List>
                            </Collapse>
                        )}
                        <Button
                            onClick={this.handleButtonClick}
                            size={size}
                            variant="fab"
                            color="secondary"
                            classes={{
                                sizeSmall: classes.button_sizeSmall,
                                sizeLarge: classes.button_sizeLarge
                            }}
                        >
                            <Icon>{actionButtonOpen ? "close" : "add"}</Icon>
                        </Button>
                    </div>
                </Grow>
            </React.Fragment>
            // </MuiThemeProvider>
        );
    };
}

export default withStyles(styles)(ActionButton);
