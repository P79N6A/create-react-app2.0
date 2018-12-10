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
 * Created by wplei on 25/05/18.
 */

import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
// import { theme as themes } from "modules/theme";
import { connect } from "react-redux";
import { REDUCER_NAME as reducerName } from "../../widgetsBoard/funcs/constants";
import { Typography, Icon, IconButton, MenuItem, Menu, Paper, AppBar, Toolbar, Fade } from "@material-ui/core";
// import ActionButton from "./actionButton";

const styles = themes => {
    return {
        widget_container_root: {
            width: "100%",
            height: "100%"
        },
        container_content: {
            position: "relative",
            width: "100%",
            height: "100%",
            overflowX: "auto",
            overflowY: "hidden"
        },
        appbar_root: {
            cursor: "move",
            alignItems: "center",
            flexDirection: "row"
        }
    };
};

const WidgetContainerContent = ({ component, classes, editMode }) => {
    return (
        <div
            id="widget_container_content"
            className={classes.container_content}
            style={{
                pointerEvents: editMode ? "none" : "all",
                cursor: editMode ? "not-allowed" : "default"
            }}
        >
            {component}
        </div>
    );
};

class WidgetContainerHeader extends React.Component {
    state = {
        menuOpen: false,
        currentAnchorEl: null,
        widgetId: this.props.widgetId
    };
    static defaultProps = {
        onWidgetDelete: () => {},
        onWidgetEdit: () => {},
        actions: [
            {
                icon: "edit",
                id: "edit",
                label: "EDIT",
                mk: "ISC_WEB_COMP_U_WIDGET_CONTAINER_BUTTON_EDIT"
            },
            {
                icon: "delete",
                id: "delete",
                label: "DELETE",
                mk: "ISC_WEB_COMP_U_WIDGET_CONTAINER_BUTTON_DELETE"
            }
        ]
    };
    static propTypes = {
        onWidgetDelete: PropTypes.func,
        onWidgetEdit: PropTypes.func,
        actions: PropTypes.arrayOf(
            PropTypes.shape({
                icon: PropTypes.string,
                id: PropTypes.string,
                label: PropTypes.string,
                mk: PropTypes.string
            })
        )
    };
    handleBtnClick = event => {
        const { widgetId, menuOpen } = this.state;
        const { onWidgetEdit, onWidgetDelete, onWidgetFullView } = this.props;
        switch (event.target.textContent) {
            case "edit":
                onWidgetEdit(widgetId);
                break;
            case "delete":
                onWidgetDelete(widgetId);
                break;
            case "fullscreen":
                onWidgetFullView(widgetId);
                this.setState({
                    menuOpen: !menuOpen,
                    currentAnchorEl: event.currentTarget
                });
                break;
            // case "more_vert":
            //     this.setState({
            //         menuOpen: !menuOpen,
            //         currentAnchorEl: event.currentTarget
            //     });
            //     break;
            default:
                break;
        }
    };
    handleMenuClick = () => {
        this.setState({
            menuOpen: !this.state.menuOpen
        });
    };
    render = () => {
        const { title, actions, classes, editMode, showHeader } = this.props;
        const { menuOpen, currentAnchorEl } = this.state;
        return (
            <Fade in={editMode && showHeader}>
                <AppBar
                    position="absolute"
                    classes={{
                        root: classes.appbar_root
                    }}
                >
                    <Toolbar
                        style={{
                            flex: 1
                        }}
                    >
                        <Typography variant="h5">{title}</Typography>
                    </Toolbar>
                    {actions &&
                        actions.map((btn, index) => {
                            return (
                                <React.Fragment key={index}>
                                    <IconButton name={btn.id} title={btn.label} onClick={this.handleBtnClick}>
                                        <Icon>{btn.icon}</Icon>
                                    </IconButton>
                                    {btn.menus && (
                                        <Menu
                                            open={menuOpen}
                                            name="action_menu"
                                            anchorEl={currentAnchorEl}
                                            onClick={this.handleBtnClick}
                                            onClose={this.handleMenuClick}
                                        >
                                            {btn.menus.map((menu, index) => {
                                                return <MenuItem key={index}>{menu.label}</MenuItem>;
                                            })}
                                        </Menu>
                                    )}
                                </React.Fragment>
                            );
                        })}
                </AppBar>
            </Fade>
        );
    };
}

// const WidgetContainerFooter = ({ classes }) => {
//     return (
//         <div id="widget_container_footer" className={classes.container_footer}>
//             3
//         </div>
//     );
// };

class WidgetContainer extends React.Component {
    state = {
        showHeader: false
    };
    static defaultProps = {
        dragArea: "header", //(header|body),
        headerProps: {}
    };
    getActions = () => {
        return [
            {
                label: "Edit",
                action: () => {},
                icon: "edit"
            },
            {
                label: "Delete",
                action: () => {},
                icon: "delete"
            },
            {
                label: "Full Screen",
                action: () => {},
                icon: "fullscreen"
            }
        ];
    };
    handleMouseEvent = event => {
        event.stopPropagation();
        event.preventDefault();
        switch (event.type) {
            case "mouseleave":
                this.setState({
                    showHeader: false
                });
                break;
            case "mouseenter":
                this.setState({
                    showHeader: true
                });
                break;
            case "mouseover":
                break;
            default:
                break;
        }
    };
    render = () => {
        const {
            children,
            classes,
            editMode,
            // title,
            widgetId,
            onWidgetDelete,
            onWidgetEdit,
            onWidgetFullView
        } = this.props;
        const { showHeader } = this.state;
        return (
            <Paper
                elevation={6}
                onMouseEnter={this.handleMouseEvent}
                onMouseLeave={this.handleMouseEvent}
                className={classes.widget_container_root}
            >
                {editMode && showHeader && (
                    <WidgetContainerHeader
                        classes={classes}
                        widgetId={widgetId}
                        editMode={editMode}
                        showHeader={showHeader}
                        onWidgetEdit={onWidgetEdit}
                        onWidgetDelete={onWidgetDelete}
                        onWidgetFullView={onWidgetFullView}
                    />
                )}
                <WidgetContainerContent component={children} editMode={editMode} classes={classes} />
            </Paper>
        );
    };
}

const mapStateToProps = state => {
    return {
        editMode: state[reducerName] && state[reducerName].editMode
    };
};

export default connect(
    mapStateToProps,
    null
)(withStyles(styles)(WidgetContainer));
