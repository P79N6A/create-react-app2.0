/*
 * =========================================================================
 *  Copyright (C)2015 NCS Pte. Ltd. All Rights Reserved
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
 * Created by @Luo Jia alex on 29/05/15.
 */
/**
 * @fileOverview Here need the description for this file
 * @module DashaboardListView
 * @author LUOJIA
 * @exports {
 *  DashaboardListView
 * }
 */
import React from "react";
import SimpleCard from "./simpleCard";
import { withStyles } from "@material-ui/core/styles";
import EditDashboard from "./editDashboard";
import DashboardGroup from "./dashboardGroup";
import ActionButtom from "../../ccms/components/views/actionButton";
import AddboardItem from "./addDashboard";
// import { theme } from "modules/theme";
// import ExportCSV from "./export";
import { connect } from "react-redux";
import { dashboardRequest, getDahboardItem, restDashboardItem, restCurrItem } from "../funcs/actions";
import { REDUCER_NAME as topoReducer, CONSITIONS_SESSION_KEY } from "../funcs/constants";
import { CircularProgress, Grow } from "@material-ui/core";
import { initialState } from "../funcs/constants";
import classnames from "classnames";
import _ from "lodash";
import "../styles/litView.less";
// import { actions as NAVBAR } from "modules/navbar";
// import store from "commons/store";

const styles = theme => ({
    progress: {
        margin: theme.spacing.unit * 2,
        position: "absolute",
        top: "calc(50% - 25px)",
        left: "calc(50% - 25px)",
        // color: theme.palette.secondary.main,
        zIndex: "30000"
    },
    progressDialog: {
        width: "100%",
        height: "200%",
        top: "-150px",
        left: 0,
        position: "fixed",
        background: "rgba(0,0,0,0.3)",
        zIndex: 30000
    },
    root: {
        width: "100%",
        height: "calc(100% - 56px)",
        overflowY: "scroll",
        padding: 8
        // marginTop: "-6px",
        // paddingLeft: theme.spacing.unit * 1.5 - 6 + "px"
        // padding: "0 " + (theme.spacing.unit * 1.5 - 6) + "px"
    },
    animationBox: {
        display: "inline-block",
        width: "calc(20% - 12px)",
        margin: "0 12px 12px 0",
        minWidth: "325px",
        height: "370px"
    }
});

/**
 * wgenerator grid-layout
 * @example
 *  <GridLayout
        layouts={layouts}
        dashboardData={dashboardData}
        handlerClick={this.handlerClick}
        viewDashboard={this.viewDashboard}
    />
 *
 * @param {array} dashboardData
 * @param {function} handlerClick
 * @returns Component
 */
const CardList = ({ dashboardData, isGrow, handlerClick }) => {
    return dashboardData.map((item, i) => {
        return (
            <Grow in={isGrow} key={dashboardData[i].name} timeout={((i + 1) % 20) * 300}>
                <div className={"animationBox"}>
                    <SimpleCard
                        dashboardItem={dashboardData[i]}
                        handlerClick={handlerClick}
                        title={dashboardData[i].name}
                        subtitle={item.groups ? item.groups.join(",") : ""}
                        content={""}
                    />
                </div>
            </Grow>
        );
    });
};

class DashaboardListView extends React.Component {
    static defaultProps = {
        scroll: false,
        dashboardData: [],
        currItem: {},
        searchData: initialState.searchData
    };

    state = {
        loading: true,
        mode: "",
        key: "",
        editOpen: false,
        addOpen: false,
        groupOpen: false,
        renameOpen: false,
        dashboardData: [],
        checked: false,
        isGrow: false,
        el: null
    };

    componentDidMount() {
        let { application } = this.props;
        let that = this;
        let el = document.getElementsByClassName("dashboardListLibrary")[0];
        this.setState({
            el
        });
        const appid = application["address.iotTopologyId"];
        let searchData = Object.assign({}, initialState.searchData, {
            applicationId: appid
        });
        let searchStr = sessionStorage.getItem(CONSITIONS_SESSION_KEY);
        if (searchStr) {
            searchData = Object.assign({}, searchData, JSON.parse(searchStr), {
                applicationId: appid
            });
            // this.props.restCurrItem({searchData})
        }
        this.props.dashboardRequest(searchData, true);
        el.addEventListener(
            "scroll",
            _.throttle(e => {
                if (el.scrollTop + el.clientHeight === el.scrollHeight) {
                    that.getRequest();
                    // console.log("到底了.....");
                }
            }, 500)
        );
    }

    getRequest = () => {
        let { searchData, dashboardRequest, total } = this.props;
        if (this.props.dashboardData.length !== total) {
            let newPageable = Object.assign({}, searchData.pageable, {
                pageno: searchData.pageable.pageno + 1
            });
            let rootData = Object.assign({}, searchData, { pageable: newPageable });
            dashboardRequest(rootData, true);
        }
    };

    componentWillReceiveProps(nextProps) {
        this.setState({
            dashboardData: nextProps.dashboardData,
            loading: nextProps.loading
        });
        if (nextProps.dashboardData.length) {
            this.setState({
                dashboardData: nextProps.dashboardData,
                isGrow: Boolean(nextProps.dashboardData.length)
                // loading: false
            });
        } else {
            this.setState({
                isGrow: Boolean(nextProps.dashboardData.length)
            });
        }
    }

    handlerClick = (pagekey, clickText, pageName) => {
        this.action()[clickText](pagekey, pageName);
    };

    action = () => {
        return {
            "Move Dashboard": (key, pageName) => {
                this.setState({
                    pageName,
                    key: key,
                    mode: "Move",
                    editOpen: true
                });
            },
            "Duplicate Dashboard": (key, pageName) => {
                this.setState({
                    pageName: pageName,
                    key: key,
                    mode: "Duplicate",
                    editOpen: true
                });
            }
        };
    };

    getIconList() {
        return [
            {
                label: "Add New Dashboard",
                action: () => {
                    this.setState({
                        addOpen: true
                    });
                },
                icon: "dashboard",
                "material-key": null
            },
            {
                label: "Manage Dashboard Groups",
                action: () => {
                    this.setState({
                        groupOpen: true
                    });
                },
                icon: "move_to_inbox",
                "material-key": null
            }
        ];
    }

    onMenuClick = item => {
        item.action();
    };

    closeModalDialog = name => {
        this.setState(
            {
                [name]: !this.state[name]
            },
            () => {
                this.props.restDashboardItem();
            }
        );
    };

    render() {
        const {
            mode,
            editOpen,
            addOpen,
            groupOpen,
            dashboardData,
            key,
            // loading,
            checked,
            pageName,
            isGrow
        } = this.state;
        const { classes, loading, application } = this.props;
        const icons = this.getIconList();
        const isLoading = loading ? (
            <div>
                <CircularProgress
                    // style={{
                    //     color: theme.palette.secondary.main
                    // }}
                    className={classes.progress}
                    color="secondary"
                    size={50}
                />
                <div className={classes.progressDialog} />
            </div>
        ) : null;
        return (
            // <MuiThemeProvider theme={theme}>
            <div className={classnames(classes.root, "dashboardListLibrary")}>
                {isLoading}
                <CardList
                    classes={classes}
                    checked={checked}
                    isGrow={isGrow}
                    dashboardData={dashboardData}
                    handlerClick={this.handlerClick}
                />
                <ActionButtom actions={icons} onMenuClick={this.onMenuClick} />
                {/* <ExportCSV open={true} /> */}
                <EditDashboard
                    closeModalDialog={this.closeModalDialog}
                    pageName={pageName}
                    pageKey={key}
                    app={application}
                    open={editOpen}
                    mode={mode}
                />
                <AddboardItem app={application} closeModalDialog={this.closeModalDialog} pageKey={key} open={addOpen} />
                <DashboardGroup
                    app={application}
                    closeModalDialog={this.closeModalDialog}
                    pageKey={key}
                    open={groupOpen}
                />
            </div>
            // </MuiThemeProvider>
        );
    }
}

const mapStateToProps = state => {
    return {
        dashboardData: state[topoReducer] && state[topoReducer].payload,
        loading: state[topoReducer] && state[topoReducer].loading,
        searchData: state[topoReducer] && state[topoReducer].searchData,
        total: state[topoReducer] && state[topoReducer].total
    };
};

const mapDispatchToProps = dispatch => {
    return {
        dashboardRequest: (searchData, flag) => {
            dispatch(dashboardRequest(searchData, flag));
        },
        getDahboardItem: key => {
            dispatch(getDahboardItem(key));
        },
        restDashboardItem: () => {
            dispatch(restDashboardItem());
        },
        restCurrItem: async searchData => {
            dispatch(restCurrItem(searchData));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(DashaboardListView));
