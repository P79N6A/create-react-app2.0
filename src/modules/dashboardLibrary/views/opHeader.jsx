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
 * @operator Header
 * @module OpHeader
 * @author LUOJIA
 * @exports {
 *  OpHeader
 * }
 */
import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
// import { theme } from "modules/theme";
import StateCount from "./stateCount";
import { Button, Paper, FormControl, MenuItem, Grow } from "@material-ui/core";
import { Select, TextField } from "../../common/index";
import { connect } from "react-redux";
import { filterDashboard, getCount, dashboardRequest, restCurrItem, getDashboardSuccess } from "../funcs/actions";
import { REDUCER_NAME as topoReducer, CONSITIONS_SESSION_KEY } from "../funcs/constants";
import { Search, initialState } from "../funcs/constants";
import classnames from "classnames";
import store from "commons/store";

const styles = themes => {
    return {
        root: {
            flexGrow: 1,
            justifyContent: "space-between",
            display: "flex",
            // padding: theme.spacing.unit * 1.5 + "px",
            padding: `0px 0 ${themes.spacing.unit}px 0`,
            position: "relative",
            // background: themes.palette.primary.main,
            zIndex: 1
        },
        leftBox: {
            height: "48px"
        },
        buttonBox: {
            background: "rgba(255,255,255,0)"
        },
        input: {
            display: "none"
        },
        layout: {
            flexGrow: "0.5",
            justifyContent: "space-between",
            display: "flex"
        },
        MR: {
            marginRight: "10px",
            color: themes.palette.primary.contrastText,
            flexGrow: "1"
        },
        marginRight: {
            marginRight: themes.spacing.unit * 3 + "px"
        },
        layoutR: {
            padding: "0px " + themes.spacing.unit * 3 + "px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
            // lineHeight: "48px"
        },
        textField: {
            margin: "0px",
            width: 200,
            // marginTop: 8,
            // maxWidth: 200,
            marginRight: themes.spacing.unit * 3 + "px"
        },
        formControl: {
            width: 150,
            maxWidth: 150
            // marginTop: 8
        },
        buttonMarginBottom: {
            // marginBottom: "4px"
        }
    };
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250
        }
    }
};

/**
 * wgenerator grid-layout
 * @example
 *  <ShowStatistics statusDatas={statusDatas} />
 *
 * @param {array} statusDatas
 * @returns Component List
 */
const ShowStatistics = ({ statusDatas, animate, total }) => {
    return statusDatas.map((item, index) => (
        <Grow key={index} in={animate} timeout={(index + 1) * 300}>
            <div style={{ display: "inline-block" }}>
                <StateCount
                    key={index}
                    icon={item.icon}
                    status={item.status}
                    count={index === 0 ? total : item.count}
                />
            </div>
        </Grow>
    ));
};

const SelectsGroup = ({ classes, value, handleChange, name, items }) => {
    return (
        <FormControl className={classnames(classes.formControl, classes.marginRight, "responseScale")}>
            <Select name={name} value={value} onChange={handleChange} MenuProps={MenuProps}>
                <MenuItem kay={-1} value="All Dashboards" title="All Dashboards">
                    All Dashboards
                </MenuItem>
                {items.map((item, index) => (
                    <MenuItem key={index} title={item.id} value={item.id}>
                        {item.id}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

const Selects = ({ classes, value, handleChange, name, items }) => {
    return (
        <FormControl className={classnames(classes.formControl, classes.marginRight, "responseScale")}>
            <Select name={name} value={value} onChange={handleChange}>
                {items.map((item, index) => (
                    <MenuItem key={index} title={item.text} value={item.value}>
                        {item.text}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

class OpHeader extends React.Component {
    static defaultProps = {
        countData: []
    };
    state = {
        search: "",
        type: "",
        el: null,
        sort: "",
        groups: Search.groups,
        group: Search.group,
        orderBys: Search.orderBys,
        orderBy: Search.orderBy,
        groupData: [],
        statusDatas: Search.statusDatas,
        animate: false,
        total: 0
    };

    search = () => {
        let searchData = JSON.parse(sessionStorage.getItem(CONSITIONS_SESSION_KEY));
        searchData.group = searchData.group === "All Dashboards" ? "" : searchData.group;
        store.dispatch(getDashboardSuccess([]));
        this.props.dashboardRequest(searchData);
    };

    componentWillReceiveProps(nextProps) {
        const { groupData, total, searchData } = nextProps;
        const { name, group, sortOrders } = searchData;
        this.setState({
            groupData,
            total,
            search: name,
            group: group ? group : "All Dashboards",
            orderBy: sortOrders.length ? sortOrders[0].field : "Sort By"
        });
        if (nextProps.countData.length) {
            this.setState({
                animate: true
            });
        } else {
            this.setState({
                animate: false
            });
        }
    }

    componentDidMount() {
        const { application } = this.props;
        const appName = application["address.name"];
        this.props.getCount(appName);
    }

    handleChange = e => {
        let name = e.target.name;
        this.setState(
            {
                [name]: e.target.value
            },
            () => {
                let { orderBy, group, search } = this.state;
                let { searchData } = initialState;
                let pageable = Object.assign({}, searchData.pageable, { pageno: 0 });
                const appid = sessionStorage.getItem("ISC-APPLICATION-ID");
                let sortOrders =
                    orderBy === "priority"
                        ? [
                            {
                                field: orderBy,
                                asc: false
                            }
                        ]
                        : [
                            {
                                field: orderBy,
                                asc: false
                            },
                            {
                                field: "priority",
                                asc: false
                            }
                        ];
                let postData = {
                    pageable: pageable,
                    sortOrders,
                    group: group === "All Dashboards" ? "" : group,
                    name: search,
                    applicationId: appid
                };
                this.props.restCurrItem({ searchData: Object.assign({}, postData) });
                sessionStorage.setItem(CONSITIONS_SESSION_KEY, JSON.stringify(Object.assign({}, postData)));
                if (name !== "search") {
                    this.search();
                }
            }
        );
    };

    keyDownHandle = e => {
        if (e.keyCode === 13) {
            this.search();
        }
    };

    render() {
        const { classes, countData } = this.props;
        const { statusDatas, search, group, groupData, orderBys, orderBy, animate, total } = this.state;
        const countDatas = countData.map((count, index) => {
            statusDatas[index].count = count;
            return statusDatas[index];
        });
        return (
            // <MuiThemeProvider theme={theme}>
            <div className={classnames(classes.root, "headerSty")}>
                <div className={classnames(classes.leftBox, "headerCount")}>
                    <ShowStatistics statusDatas={countDatas} animate={animate} total={total} />
                </div>

                <Paper className={classnames(classes.layoutR, "headerSearch")}>
                    <TextField
                        label=""
                        type="search"
                        name="search"
                        value={search}
                        placeholder={"Search Dashboard"}
                        className={classnames(
                            classes.textField,
                            classes.marginRight,
                            "getSearchElement",
                            "responseScale"
                        )}
                        margin="normal"
                        onChange={this.handleChange}
                        onKeyDown={this.keyDownHandle}
                    />
                    <SelectsGroup
                        classes={classes}
                        value={group}
                        handleChange={this.handleChange}
                        name="group"
                        items={groupData}
                    />
                    <Selects
                        classes={classes}
                        value={orderBy}
                        handleChange={this.handleChange}
                        name="orderBy"
                        items={orderBys}
                    />
                    <Button onClick={this.search} className={classes.buttonMarginBottom} size="large" color="secondary">
                        SEARCH
                    </Button>
                </Paper>
            </div>
            // </MuiThemeProvider>
        );
    }

    componentWillMount() {
        const { el } = this.state;
        el && el[0] && el[0].removeEventListener("keydown", this.search);
    }
}

OpHeader.propTypes = {
    classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
    return {
        countData: state[topoReducer] && state[topoReducer].countData,
        groupData: state[topoReducer] && state[topoReducer].groupData,
        total: state[topoReducer] && state[topoReducer].total,
        searchData: state[topoReducer] && state[topoReducer].searchData
    };
};

const mapDispatchToProps = dispatch => {
    return {
        filterDashboard: text => {
            dispatch(filterDashboard(text));
        },
        getCount: appName => {
            dispatch(getCount(appName));
        },
        dashboardRequest: searchData => {
            dispatch(dashboardRequest(searchData));
        },
        restCurrItem: async searchData => {
            dispatch(restCurrItem(searchData));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(OpHeader));
