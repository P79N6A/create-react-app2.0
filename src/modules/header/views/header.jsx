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
import React, { Component } from "react";
import { actions as NAVBAR } from "modules/navbar";
import * as authActions from "modules/auth/funcs/actions";
import ChangePassword from "./changePassword";
// import classnames from "classnames";
import { HeaderUser, UserPanel } from "./headerStatic";
import { AppBar, Toolbar, Collapse, ClickAwayListener, IconButton, Icon, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import store from "commons/store";
import { logoutRequest } from "modules/auth/funcs/actions";
import "../styles/static.less";
import { TOKEN_KEY } from "commons/constants/const";
import { connect } from "react-redux";
import { reducerName } from "..";
import WeatherContainer from "modules/ccms/components/views/weatherContainer";
// import { I18n } from "react-i18nify";
import { actions as themeAction } from "modules/theme";
// import { userActions } from "modules/security/user";
import token from "commons/utils/tokenHelper";
import encode16Bit from "commons/utils/encode16bit";
import * as headerActions from "../funcs/actions";
import { initialState, CONSITIONS_SESSION_KEY } from "modules/dashboardLibrary";
import LOGO from "modules/navbar/images/SURF_Landscape-RWH.png";
import * as actions from "../funcs/actions";
import "../styles/static.less";
import * as msg from "commons/utils/messageBus";
import { INITAL_STATE } from "../funcs/constants";

import PermissionComponent from "commons/components/permissionComponent";

const styles = Theme => {
    console.log("Theme", Theme);
    return {
        collapse_container: {
            position: "absolute",
            right: Theme.spacing.unit,
            top: Theme.spacing.unit * 8,
            width: 260,
            background: Theme.palette.background.paper,
            borderRadius: 4,
            boxShadow: Theme.shadows[10]
        },
        collapse_wrapperInner: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            padding: Theme.spacing.unit * 2
        },
        button_logout: {
            width: Theme.spacing.unit * 15 + 10
        },
        user_infos: {
            marginBottom: Theme.spacing.unit * 1.5,
            marginTop: Theme.spacing.unit * 1.5
        },
        user_infos_overflow_ellipsis: {
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis"
        },
        userinfo_head_pic: {
            width: 80,
            height: 80
        },
        user_infos_logout_list: {
            padding: 0
        },
        user_infos_text_indent: {
            textIndent: Theme.spacing.unit,
            width: 160
        },
        header_menu_button: {
            color: Theme.palette.headericoncolor
        },
        headeruser_docked: {
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 98,
            position: "fixed",
            touchAction: "none"
        },
        toolbar_regular: {
            padding: "0 16px 0 16px"
        },
        list_nopadding: {
            padding: 0,
            "& span": {
                color: Theme.palette.secondary.main
            }
        },
        icon_color: {
            color: Theme.palette.secondary.main
        },
        weather: {
            width: "290px",
            display: "inline-block",
            margin: "0 10px",
            "& .weather-left": {
                position: "relative"
                // top: "3px"
            },
            "& .weatherCard-card": {
                height: "auto!important"
            },
            "& .weatherCard-btm": {
                display: "none!important"
            }
        },
        listItem_root: {
            padding: "0 !important"
        },
        appbar_colorPrimary: {
            background: Theme.palette.primary.dark,
            zIndex: 1101
        },
        lightColor: {
            color: Theme.palette.common.white + "!important"
        },
        headericoncolor: {
            color: Theme.palette.headericoncolor
        },
        svg: {
            width: 24,
            height: 24,
            // marginRight: Theme.spacing.unit * 2,
            color: Theme.palette.secondary.main + "!important"
        },
        headerSubtitle: {
            position: "absolute",
            left: Theme.spacing.unit * 10,
            top: Theme.spacing.unit * 6 - 3
        },
        logoContainer: {
            width: 160,
            height: 64,
            padding: "8px 0px",
            textAlign: "center"
        }
    };
};

const defaultProps = {
    title: "",
    subTitle: "",
    left: [
        {
            id: "menuIcon",
            "material-key": "ISC_WEB_FUNCS_R_HEADER_LEFT_MENU_ICON"
        }
    ],
    center: [
        {
            id: "logo",
            "material-key": "ISC_WEB_FUNCS_R_HEADER_CENTER_LOGO"
        }
    ],
    right: [
        {
            id: "weather",
            "material-key": "ISC_WEB_FUNCS_R_HEADER_RIGHT_USER_INFOMATION_WEATHER"
        },
        {
            id: "user",
            "material-key": "ISC_WEB_FUNCS_R_HEADER_RIGHT_USER_INFOMATION_USER_AVATAR"
        },
        {
            id: "userPanel",
            "material-key": "ISC_WEB_FUNCS_R_HEADER_RIGHT_USER_INFOMATION_USER_PANEL",
            menus: [
                {
                    "material-key": "ISC_WEB_FUNCS_C_HEADER_USER_CHANGE_THEME",
                    id: "changeTheme",
                    icon: "dark",
                    label: "Switch Theme",
                    theme: "LIGHT_THEME",
                    state: 0
                },
                {
                    "material-key": "ISC_WEB_FUNCS_C_HEADER_USER_CHANGE_THEME",
                    id: "changeTheme",
                    icon: "light",
                    label: "Switch Theme",
                    theme: "DARK_THEME",
                    state: 1
                },
                {
                    "material-key": "ISC_WEB_FUNCS_U_HEADER_USER_CHANGE_PASSWORD",
                    id: "changePassword",
                    icon: "lock",
                    label: "Change Password"
                },
                {
                    "material-key": "ISC_WEB_FUNCS_C_HEADER_USER_LOGOUT",
                    id: "logout",
                    icon: "input",
                    label: "Logout"
                }
            ]
        }
    ]
};

const propTypes = {};

class Header extends Component {
    state = {
        username: "",
        userheader: "",
        tenant: "",
        userInfoOpen: false,
        settingOpen: false,
        themeId: "DARK_THEME",
        themeNum: 0
    };

    componentDidMount = () => {
        const { accountinfo = {} } = this.props;
        const { displayname = "", logo = "" } = accountinfo;
        const userInfo = JSON.parse(sessionStorage.getItem("ISC-CURRENT-USER") || "{}");
        const themeInfo = JSON.parse(sessionStorage.getItem("ISC-THEME") || "{}");
        const { application } = this.props;
        let { username, image } = userInfo;
        if (image) {
            this.props.getAvatar(image + encode16Bit.ascii2hex(token.get()));
        } else {
            store.dispatch(headerActions.getUserHeaderSuccess([]));
        }
        if (logo) {
            this.props.getLogo(logo + encode16Bit.ascii2hex(token.get()));
        } else {
            store.dispatch(headerActions.getLogoSuccess(""));
        }
        this.setState(
            Object.assign(
                {
                    username,
                    tenant: displayname,
                    subTitle: (application && application["address.displayName"]) || ""
                },
                themeInfo
            ),
            () => {
                const { themeId } = themeInfo;
                store.dispatch(themeAction.changeTheme(themeId || this.state.themeId));
            }
        );
    };

    componentWillMount() {
        this.props.headerReset(INITAL_STATE);
    }

    handleThemeChange = event => {
        const themeId = event.target.value;
        this.setState(
            {
                themeId
            },
            () => {
                store.dispatch(themeAction.changeTheme(themeId));
            }
        );
    };
    handleClick = (type, options) => {
        switch (type) {
            case "changePassword":
                this.props.reset({ isOpenPassword: true });
                this.setState({
                    userInfoOpen: false
                });
                break;
            case "logout":
                let token = sessionStorage[TOKEN_KEY];
                sessionStorage.setItem(CONSITIONS_SESSION_KEY, JSON.stringify(initialState.searchData));
                store.dispatch(logoutRequest(token));
                store.dispatch(actions.changeHeaderTitle(""));
                store.dispatch(msg.disconnect("GUI logout."));
                break;
            case "userPanel":
                const { open } = options || { open: undefined };
                this.setState({
                    userInfoOpen: open !== undefined ? open : !this.state.userInfoOpen
                });
                break;
            case "changeTheme":
                // const { event } = options;
                // const themeId = event.target.value;
                const { theme, state } = options;
                this.setState(
                    {
                        themeId: theme,
                        themeNum: !state ? 1 : 0
                    },
                    () => {
                        sessionStorage.setItem(
                            "ISC-THEME",
                            JSON.stringify({
                                themeId: theme,
                                themeNum: !state ? 1 : 0
                            })
                        );
                        store.dispatch(themeAction.changeTheme(theme));
                    }
                );
                break;
            case "changeTitle":
                store.dispatch(NAVBAR.switchNavbarState(true));
                break;
            default:
                break;
        }
    };
    getRightComponent = (type, options) => {
        const { username, userInfoOpen, tenant, themeId, themeNum } = this.state;
        const { classes, avatarUrl } = this.props;
        switch (type) {
            case "weather":
                return (
                    <div id="weather" className={classes.weather}>
                        <WeatherContainer />
                    </div>
                );
            case "user":
                return (
                    <HeaderUser
                        id="user"
                        name={username}
                        header={avatarUrl}
                        tenant={tenant}
                        classes={classes}
                        onAvatarClick={() => this.handleClick("userPanel")}
                    />
                );
            case "userPanel":
                const { menus } = options;
                return (
                    <ClickAwayListener
                        onClickAway={() =>
                            this.handleClick("userPanel", {
                                open: false
                            })
                        }
                    >
                        <Collapse
                            id="userPanel"
                            in={userInfoOpen}
                            classes={{
                                container: classes.collapse_container
                            }}
                            component="div"
                        >
                            <UserPanel
                                classes={classes}
                                header={avatarUrl}
                                username={username}
                                tenant={tenant}
                                icons={menus}
                                onMenuClick={this.handleClick}
                                onThemeChange={this.handleClick}
                                themeId={themeId}
                                themeNum={themeNum}
                            />
                        </Collapse>
                    </ClickAwayListener>
                );
            default:
                return null;
        }
    };
    render = () => {
        const { subTitle } = this.state;

        const { title = "", classes, left, center, right, logoUrl = "" } = this.props;
        return (
            <React.Fragment>
                <ChangePassword
                    name={"Change Password"}
                    open={true}
                    onCancel={this.handleClick}
                    onSubmit={this.handleClick}
                />
                <AppBar position="absolute" classes={{ colorPrimary: classes.appbar_colorPrimary }}>
                    <Toolbar
                        disableGutters
                        classes={{
                            regular: classes.toolbar_regular
                        }}
                    >
                        {left && (
                            <div
                                id="left"
                                style={{
                                    flex: 1,
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}
                            >
                                <IconButton
                                    className={classes.header_menu_button}
                                    onClick={() => this.handleClick("changeTitle")}
                                >
                                    <Icon>menu</Icon>
                                </IconButton>
                                <Typography
                                    variant="h6"
                                    classes={{ root: classes.lightColor }}
                                    className="header-title"
                                >
                                    {title}
                                </Typography>
                                <Typography variant="caption" classes={{ root: classes.headerSubtitle }}>
                                    {subTitle}
                                </Typography>
                            </div>
                        )}
                        {center && (
                            <div id="center" className={classes.logoContainer}>
                                <img
                                    src={logoUrl || LOGO}
                                    alt="surf logo"
                                    style={{
                                        // width: "100%"
                                        width: "auto",
                                        height: "100%"
                                    }}
                                />
                            </div>
                        )}
                        {right && (
                            <div
                                id="right"
                                style={{
                                    flex: 1,
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    alignItems: "center"
                                }}
                            >
                                {right.map((item, index) => {
                                    return (
                                        <PermissionComponent key={item.id} materialKey={item["material-key"]}>
                                            {this.getRightComponent(item.id, item)}
                                        </PermissionComponent>
                                    );
                                })}
                            </div>
                        )}
                    </Toolbar>
                </AppBar>
            </React.Fragment>
        );
    };
}

const mapStateToProps = (state, ownedProps) => {
    return {
        avatarUrl: state && state[reducerName] && state[reducerName].avatarUrl,
        logoUrl: state && state[reducerName] && state[reducerName].logoUrl,
        accountinfo: state && state.identify && state.identify.accountinfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        reset: reset => {
            dispatch(authActions.reset(reset));
        },
        getAvatar: mediaId => {
            dispatch(headerActions.getUserHeader(mediaId));
        },
        getLogo: mediaId => {
            dispatch(headerActions.getLogoHeader(mediaId));
        },
        headerReset: reset => {
            dispatch(headerActions.reset(reset));
        }
    };
};

Header.defaultProps = defaultProps;
Header.propTypes = propTypes;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(Header));
