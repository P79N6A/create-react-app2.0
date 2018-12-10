import React, { Component } from "react";
import PropTypes from "prop-types";
import { MenuHeader, MenuList, MenuLogo } from "./navbarStatic";
import { Drawer, Divider } from "@material-ui/core";
import "../styles/basenav.less";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import * as actions from "../funcs/actions";
import { REDUCER_NAME } from "../funcs/constants";
import store from "commons/store";
import { actions as HEADER } from "modules/header";

const styles = theme => {
    return {
        drawer_root: {
            width: 340
        },
        drawer_docked: {
            backgroundColor: theme.palette.action.disabledBackground
        }
    };
};

const defaultProps = {
    state: 0,
    open: false,
    menuList: [
        {
            id: "back",
            text: "Back To Applications",
            icon: "reply",
            state: 1
        },
        {
            id: "appLib",
            text: "Applications",
            uri: "/",
            icon: "dashboard",
            state: 0,
            "material-key": "DASHBOARD_LIBRARY_MGMT_PAGE"
        },
        {
            id: "dashboard",
            text: "Dashboards",
            uri: "/dashboards",
            icon: "dashboard",
            state: 1,
            "material-key": "DASHBOARD_LIBRARY_MGMT_PAGE"
        },
        {
            id: "device",
            text: "Devices",
            icon: "device_hub",
            state: 1,
            "material-key": "DEVICE_MGMT_PAGE",
            subs: [
                {
                    id: "device",
                    text: "Device Provisioning",
                    uri: "/deviceProvision",
                    icon: "show_chart",
                    state: 1,
                    "material-key": "DEVICE_MGMT_PAGE"
                },
                {
                    id: "deviceControl",
                    text: "Device Control Status",
                    uri: "/deviceControlStatus",
                    icon: "widgets",
                    state: 1,
                    "material-key": "DEVICE_MGMT_PAGE"
                }
            ]
        },
        {
            id: "rule",
            text: "Rules",
            uri: "/rules",
            icon: "poll",
            state: 1,
            "material-key": "RULE_MGMT_PAGE"
        },
        {
            id: "events",
            text: "Events",
            uri: "/events",
            icon: "format_list_bulleted",
            state: 1,
            "material-key": "EVENT_MGMT_PAGE"
        },
        {
            id: "alarm",
            text: "Alarms",
            uri: "/alarms",
            icon: "warning",
            state: 1,
            "material-key": "ALARM_MGMT_PAGE"
        },
        {
            id: "app",
            text: "App Management",
            uri: "/application",
            icon: "apps",
            state: 0,
            "material-key": "SETTING_APPLICATION_CONFIG_PAGE"
        },
        {
            id: "users",
            text: "Users",
            uri: "/security",
            icon: "people_outline",
            state: [0],
            "material-key": "SECURITY_MGMT_PAGE"
        },
        {
            id: "dataExport",
            text: "Big Data Export",
            uri: "/dataSearch",
            icon: "exit_to_app",
            state: 0,
            "material-key": "DATA_DATASEARCH_PAGE"
        },
        {
            id: "account",
            text: "Accounts",
            uri: "/account",
            icon: "account_circle",
            state: 0,
            "material-key": "ACCOUNTS_PAGE"
        },
        {
            id: "machineLearn",
            text: "Machine Learning",
            uri: "/machineLearn",
            icon: "perm_data_setting",
            state: 1,
            // "material-key": "ISC_WEB_PAGE_MACHINE_LEARNING"
        },
        {
            id: "reports",
            text: "Reports",
            icon: "assignment",
            state: 0,
            // "material-key": "DEVICE_MGMT_PAGE",
            subs: [
                {
                    id: "usage",
                    text: "Usage",
                    uri: "/usage",
                    icon: "show_chart",
                    state: 0
                    // "material-key": "ISC_WEB_PAGE_LOGGER_MGMT"
                }
            ]
        },
       
        {
            id: "log",
            text: "Logs",
            uri: "/logger",
            icon: "event_note",
            state: 0,
            "material-key": "LOGGER_PAGE"
        },
        {
            id: "importexport",
            text: "Device Import/Export",
            icon: "import_export",
            state: 0,
            "material-key": "DEVICE_IMPORTEXPORT_MENU",
            subs: [
                {
                    id: "deviceImport",
                    text: "Import Devices",
                    uri: "/deviceImport",
                    icon: "perm_device_information",
                    "material-key": "BULKDEVICE_IMPORT_PAGE",
                    state: 0
                }
            ]
        }
    ]
};

const propTypes = {
    state: PropTypes.number,
    open: PropTypes.bool,
    menuList: PropTypes.array
};

class Navbar extends Component {
    state = {};
    componentDidMount = () => {
        const { application } = this.props;
        const id = application ? application["address.iotTopologyId"] : 0;
        store.dispatch(actions.changeNavbarState(id ? 1 : 0));
    };
    handleClick = (type, options) => {
        store.dispatch(actions.switchNavbarState(false));
        switch (type) {
            case "close":
                break;
            case "menuClick":
                const { uri, id } = options;
                if (id !== "back") return (window.location.hash = uri);
                window.location.hash = "/";
                sessionStorage.removeItem("ISC-APPLICATION-ID");
                sessionStorage.removeItem("ISC-APPLICATION-INFO");
                store.dispatch(actions.changeNavbarState(0));
                store.dispatch(HEADER.changeHeaderTitle());
                break;
            default:
                break;
        }
    };
    render = () => {
        const { classes, open, menuList, state, materialKeys={} } = this.props;
        return (
            <Drawer
                anchor="left"
                open={open}
                variant="temporary"
                onClose={() => this.handleClick("close")}
                classes={{
                    paper: classes.drawer_root,
                    docked: classes.drawer_docked
                }}
            >
                <MenuHeader openFlag={open} onCloseClick={this.handleClick} />
                <React.Fragment>
                    <Divider />
                    <div
                        style={{
                            width: "100%",
                            height: "100px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        <MenuLogo />
                    </div>
                    <Divider />
                </React.Fragment>
                <MenuList lists={menuList} materialKeys={materialKeys} state={state} onItemClick={this.handleClick} />
            </Drawer>
        );
    };
}

Navbar.defaultProps = defaultProps;
Navbar.propTypes = propTypes;

const mapStateToProps = state => {
    return {
        materialKeys: state && state.identify && state.identify.materialKeys,
        open: state && state[REDUCER_NAME] && state[REDUCER_NAME].menuOpen,
        // menuList: state && state[REDUCER_NAME] && state[REDUCER_NAME].menuList,
        state: state && state[REDUCER_NAME] && state[REDUCER_NAME].state
    };
};

const mapDispatchToProps = () => {
    return {};
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(Navbar));
