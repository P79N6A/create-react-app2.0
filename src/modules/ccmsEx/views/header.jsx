import React from "react";
import PropTypes from "prop-types";
import { AppBar, Toolbar, IconButton, Typography, Icon, CircularProgress } from "@material-ui/core";
import PermissionComponent from "commons/components/permissionComponent";
import { withStyles } from "@material-ui/core/styles";

const styles = Theme => {
    return {
        appbarRoot: {
            background: Theme.palette.primary.dark
        },
        typographyRoot: {
            flex: 1
        }
    };
};

const Header = ({ actions, title, onClick, classes, editMode, loading }) => {
    return (
        <AppBar
            position="absolute"
            classes={{
                root: classes.appbarRoot
            }}
        >
            <Toolbar>
                {loading ? (
                    [
                        <CircularProgress key="circle" color="secondary" size={20} />,
                        <Typography
                            key="ty"
                            classes={{
                                root: classes.typographyRoot
                            }}
                        />
                    ]
                ) : (
                    <Typography
                        variant="h5"
                        classes={{
                            root: classes.typographyRoot
                        }}
                    >
                        {title}
                    </Typography>
                )}
                {actions &&
                    actions.map((item, index) => {
                        return editMode === !!item.state ? (
                            <PermissionComponent key={index} materialKey={item["material-key"]}>
                                <IconButton onClick={() => onClick(item.name)} title={item.tooltip}>
                                    <Icon>{item.icon}</Icon>
                                </IconButton>
                            </PermissionComponent>
                        ) : null;
                    })}
                <PermissionComponent key="exit" materialKey="ISC_WEB_COMP_C_CCMS_ACTION_EXIT">
                    <IconButton onClick={() => onClick("exit")} title="EXIT EDIT MODE">
                        <Icon>exit_to_app</Icon>
                    </IconButton>
                </PermissionComponent>
            </Toolbar>
        </AppBar>
    );
};

Header.propTypes = {
    actions: PropTypes.array,
    title: PropTypes.string,
    onClick: PropTypes.func
};

Header.defaultProps = {
    actions: [
        {
            "material-key": "ISC_WEB_COMP_C_CCMS_ACTION_DOWNLOAD_CSV",
            icon: "cloud_download",
            name: "download",
            tooltip: "DOWNLOAD",
            state: 1
        },
        // {
        //     "material-key": "ISC_WEB_COMP_C_CCMS_ACTION_SAVE_AS_TEMPLATE",
        //     icon: "add_to_queue",
        //     name: "template",
        //     tooltip: "SAVE AS TEMPLATE",
        //     state: 1
        // },
        {
            "material-key": "ISC_WEB_COMP_C_CCMS_ACTION_EDIT",
            icon: "edit",
            name: "edit",
            tooltip: "EDIT",
            state: 1
        },
        {
            "material-key": "ISC_WEB_COMP_C_CCMS_ACTION_SAVE",
            icon: "save",
            name: "save",
            tooltip: "SAVE",
            state: 1
        },
        {
            "material-key": "ISC_WEB_COMP_C_CCMS_ACTION_EXIT",
            icon: "exit_to_app",
            name: "exit",
            tooltip: "EXIT EDIT MODE",
            state: 1
        }
    ],
    title: "",
    onClick: () => {}
};

export default withStyles(styles)(Header);
