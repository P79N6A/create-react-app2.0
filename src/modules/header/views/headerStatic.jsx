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
import Wrap from "commons/components/wrapComponent";
// import propTypes from "prop-types";
import {
    Typography,
    Avatar,
    Icon,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Divider,
    // MenuItem,
    SvgIcon
} from "@material-ui/core";
// import { Select } from "modules/common";
import classnames from "classnames";
import { I18n } from "react-i18nify";
import { LightOn, LightOff } from "../funcs/constants";

const MAPPING = {
    dark: LightOn,
    light: LightOff
};

// const ThemeSelector = ({ onThemeChange, themeId }) => {
//     return (
//         <Select value={themeId} onChange={event => onThemeChange("changeTheme", { event })} fullWidth>
//             <MenuItem value="DARK_THEME">{"DARK"}</MenuItem>
//             <MenuItem value="LIGHT_THEME">{"LIGHT"}</MenuItem>
//             <MenuItem value="RED_THEME">{"RED"}</MenuItem>
//         </Select>
//     );
// };

export const HeaderUserDock = ({ classes, onDockClick }) => {
    return <div className={classes.headeruser_docked} onClick={onDockClick} />;
};

// export const HeaderMenuIcon = ({ onButtonClick, classes, icon }) => {
//     return (
//         <IconButton className={classes.header_menu_button} onClick={onButtonClick}>
//             <Icon>menu</Icon>
//         </IconButton>
//     );
// };

export const HeaderTitle = ({ title, classes }) => {
    return (
        <Typography variant="h6" className={classnames("header-title", classes.lightColor)}>
            {title}
        </Typography>
    );
};

// export const HeaderIcon = ({ uri, alt }) => {
//     return <img src={uri} alt={alt} />;
// };

export const HeaderUser = ({ name, header, tenant, onAvatarClick, classes, styles, ...otherProps }) => {
    return (
        <Wrap>
            <div
                style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    flexDirection: "column"
                    // alignItems: ""
                }}
            >
                <Typography variant="h6" classes={{ root: classes.lightColor }} className="user-name">
                    {name}
                </Typography>
                <Typography  classes={{ root: classes.lightColor }} className="user-name">
                    {`${tenant} ${I18n.t("header.account")}`}
                </Typography>
            </div>
            {header ? (
                <Avatar className="user_head_avatar" src={header} onClick={onAvatarClick} />
            ) : (
                <Avatar
                    className="user_head_avatar"
                    children={<Typography component="p">{((name && name[0]) || "").toUpperCase()}</Typography>}
                    onClick={onAvatarClick}
                />
            )}
            {/* <Avatar className="user_head_avatar" src={header} onClick={onAvatarClick} /> */}
        </Wrap>
    );
};

export const UserPanel = ({
    classes,
    header,
    username,
    tenant,
    icons,
    onThemeChange,
    onMenuClick,
    themeId,
    themeNum
}) => {
    return (
        <React.Fragment>
            <div className={classes.collapse_wrapperInner}>
                {header ? (
                    <Avatar className={classes.userinfo_head_pic} src={header} />
                ) : (
                    <Avatar
                        className={classes.userinfo_head_pic}
                        children={
                            <Typography component="p">{((username && username[0]) || "").toUpperCase()}</Typography>
                        }
                    />
                )}
                <div className={classes.user_infos_text_indent}>
                    <Typography
                        className={classnames(classes.user_infos, classes.user_infos_overflow_ellipsis)}
                        variant="h6"
                        title={username}
                    >
                        {username}
                    </Typography>
                    <Typography
                        className={classnames(classes.user_infos, classes.user_infos_overflow_ellipsis)}
                        title={tenant}
                    >{`${tenant} Tenant`}</Typography>
                </div>
            </div>
            <List className={classes.user_infos_logout_list} component="nav">
                {icons &&
                    icons.map(n => {
                        return n.state === undefined ||
                            n.state === themeNum ||
                            (Array.isArray(n.state) && n.state.includes(themeNum)) ? (
                                <React.Fragment key={n.id}>
                                    <Divider />
                                    <ListItem button onClick={() => onMenuClick(n.id, n)}>
                                        <ListItemIcon>
                                            {MAPPING[n.icon] ? (
                                                <SvgIcon className={classes.svg}>
                                                    <path d={MAPPING[n.icon]} />
                                                </SvgIcon>
                                            ) : (
                                                <Icon className={classes.icon_color}>{n.icon}</Icon>
                                            )}
                                        </ListItemIcon>
                                        <ListItemText
                                            classes={{
                                                root: classes.listItem_root
                                            }}
                                        >
                                            <Typography component="p" variant="subtitle1" color="secondary">
                                                {n.label}
                                            </Typography>
                                        </ListItemText>
                                    </ListItem>
                                </React.Fragment>
                            ) : null;
                    })}
            </List>
        </React.Fragment>
    );
};
