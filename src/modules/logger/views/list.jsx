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
 * Created by Luo Jia on 25/05/2018.
 * Modified by Luo Jia on 25/05/2018.
 */
import React from "react";
import PropTypes from "prop-types";
import * as actions from "../funcs/action";
import { Breadcrumb } from "antd";
import { Header, Select, Pagination, Drawer, TablePaginationActions, Progress, Search } from "../common/index";
import { Typography, ListItemIcon, Icon, CircularProgress, FormControlLabel, Switch } from "@material-ui/core";
// import { Drawer } from "modules/common/index";
import { REDUCER_NAME } from "../funcs/constants";
import _ from "lodash";
import { connect } from "react-redux";
import classnames from "classnames";
import { withStyles, Collapse, Paper, ListItem, ListItemText, List, Divider } from "@material-ui/core";
import { I18n } from "react-i18nify";
// import CardHead from "./cardHead";
import { theme as themes } from "modules/theme";
import { selectsDatas } from "../funcs/constants";
const loggerSetting = JSON.parse(sessionStorage.getItem("ISC-SETTINGS")).logger;
const styles = theme => ({
    table: {
        height: "calc(100% - 64px)",
        backgroundColor: theme.palette.background.paper
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary
    },
    slide: {
        position: "absolute",
        zIndex: 1300,
        boxShadow:
            "0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)",
        top: "60px",
        right: "20px"
    },
    rootPadding: {
        padding: theme.spacing.unit * 2,
        width: "600px",
        display: "flex",
        flexWrap: "wrap"
    },
    formControl: {
        width: "46%",
        margin: "0px 10px"
    },
    list: {
        height: "calc(100% - 56px)",
        overflow: "auto"
    },
    fullDialog: {
        width: "100%",
        height: "100%",
        position: "absolute",
        left: 0,
        top: 0,
        zIndex: 1099
    },
    circle: {
        "&>div": {
            margin: "0 auto"
        }
    },
    bread: {
        margin: "0 auto",
        "& span": {
            color: theme.palette.text.primary
        }
    },
    switch: {
        marginLeft: 0,
        marginBottom: 0
    }
});

const listStyle = theme => ({
    listRoot: {
        backgroundColor: theme.palette.background.paper,
        height: "100%",
        width: "100%"
    },
    center: {
        textAlign: "center"
    },
    deactiveroot: {
        // borderLeftWidth: "6px",
        borderLeft: "6px solid " + theme.palette.background.paper,
        paddingLeft: "24px",
        backgroundColor: "none"
    },
    activeroot: {
        borderLeftWidth: "6px",
        paddingLeft: "18px",
        backgroundColor: theme.palette.action.hover
    },
    sub: {
        height: "20px",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        "& p": {
            height: "20px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap"
        }
    },
    progress: {
        margin: "0 auto"
    },
    hightLight: {
        borderRight: "6px solid " + theme.palette.secondary.main
    }
});

const dawerStyle = theme => ({
    root: {
        zIndex: 1111
    },
    content: {
        color: theme.palette.text.primary,
        wordBreak: "break-all"
    }
});

const actionsStyles = theme => ({
    root: {
        flexShrink: 0,
        color: theme.palette.text.secondary,
        marginLeft: themes.spacing.unit * 2.5
    }
});

const Selects = ({ selectData, classes }) => {
    return (
        <React.Fragment>
            {selectData.map(n => {
                return <Select formControl={classes.formControl} key={n.name} {...n} />;
            })}
        </React.Fragment>
    );
};

const DataList = withStyles(listStyle)(
    ({ dataSource = [], titleKey, textKey, classes, active, clickItem, criteria, totalpages, currentpage }) => {
        const flag = criteria === "ALL";
        return (
            <List dense={false} classes={{ root: classes.listRoot }}>
                {dataSource.length ? (
                    dataSource.map((n, i) => {
                        let currtitle = n[titleKey].trim();
                        let hightLight = n.hightLight;
                        return (
                            <React.Fragment key={i}>
                                <ListItem
                                    button
                                    onClick={clickItem(i, n)}
                                    title={n[textKey]}
                                    classes={{ root: i === active ? classes.activeroot : classes.deactiveroot }}
                                    className={hightLight ? classes.hightLight : ""}
                                    style={{
                                        // borderLeft:
                                        //     true && currtitle !== "INFO"
                                        //         ? "6px solid " +
                                        //           (loggerSetting[currtitle] || themes.palette.secondary.main)
                                        //         : "none"
                                        borderLeft:
                                            flag && currtitle !== "INFO"
                                                ? "6px solid " +
                                                  (loggerSetting[currtitle] || themes.palette.secondary.main)
                                                : "none"
                                    }}
                                >
                                    <ListItemIcon>
                                        {/* <Icon>{n.icon}</Icon> */}
                                        <Icon className={classes.icon}>{n.icon}</Icon>
                                    </ListItemIcon>
                                    <ListItemText
                                        classes={{ secondary: classes.sub }}
                                        primary={n[titleKey]}
                                        secondary={n[textKey]}
                                    />
                                </ListItem>
                                {i !== dataSource.length - 1 && <Divider />}
                            </React.Fragment>
                        );
                    })
                ) : (
                    <ListItem button>
                        <ListItemText className={classes.center} primary={I18n.t("rule.common.emptyMsg")} />
                    </ListItem>
                )}
                {totalpages === currentpage && dataSource.length !== 0 ? (
                    <ListItem key="circle" button>
                        <CircularProgress className={classes.progress} color="secondary" />
                    </ListItem>
                ) : null}
            </List>
        );
    }
);

const Dawers = withStyles(dawerStyle)(
    ({ open, closeHandle, title, content, toggleDrawer, dataSource, classes, ...other }) => (
        <Drawer {...other} root={classes.root} formTitle={title} open={open} closeHandle={closeHandle}>
            <Typography className={classes.content} component="p">
                {content}
            </Typography>
        </Drawer>
    )
);

const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(TablePaginationActions);
class Lists extends React.Component {
    state = {
        container: null,
        loggerList: [],
        module: "",
        moduleChild: "",
        moduleList: [],
        moduleChildList: [],
        websocket: null,
        clickItemData: {},
        isOpen: false,
        criteria: "",
        pageSize: 50,
        currPage: 1,
        value: "",
        hightMode: false
    };
    componentWillReceiveProps(nextProps) {
        const { moduleList, module, moduleChild, moduleChildList, criteria, payload } = nextProps;
        let { active, pageSize = 50 } = this.state;
        if (module !== this.props.module && module) {
            this.props.getModuleChild(module);
        }
        if ((criteria !== this.props.criteria || moduleChild !== this.props.moduleChild) && moduleChild && criteria) {
            let searchData = {
                logName: moduleChild,
                currPage: 1,
                pageSize: pageSize,
                criteria: criteria || "ALL"
            };
            this.props.getLogList(searchData);
        }
        let flag = _.isEqual(payload, this.props.payload);
        this.setState({
            active: flag ? active : "",
            criteria,
            moduleList,
            moduleChildList,
            module: module,
            moduleChild: moduleChild
        });
    }
    handleChange = name => e => {
        let value = e.target.value;
        this.setState(
            {
                [name]: value
            },
            () => {
                this.props.reset({
                    [name]: value
                });
                const { moduleChild, criteria, pageSize } = this.state;
                if (name === "moduleChild" && criteria && moduleChild && pageSize) {
                    let searchData = {
                        logName: moduleChild,
                        currPage: 1,
                        pageSize: pageSize,
                        criteria: criteria || "ALL"
                    };
                    this.props.getLogList(searchData);
                }
            }
        );
    };
    getSelect = () => {
        const { module, moduleChild, moduleList, moduleChildList, criteria } = this.state;
        return selectsDatas.map(n => {
            if (n.name === "module") {
                n.value = module || "";
                n.label = "Module Name";
                n.items = moduleList || [];
            } else if (n.name === "moduleChild") {
                n.value = moduleChild || "";
                n.label = "File Name";
                n.items = moduleChildList || [];
            } else {
                n.label = "Log Level";
                n.value = criteria || "ALL";
            }
            n.handleChange = this.handleChange;
            return n;
        });
    };
    handleChangePage = (event, page) => {
        const { moduleChild, criteria, pageSize } = this.state;
        this.setState({
            currPage: page + 1
        });
        let searchData = {
            logName: moduleChild,
            currPage: page + 1,
            pageSize: pageSize,
            criteria: criteria || "ALL"
        };
        this.props.getLogList(searchData);
    };
    handleChangeRowsPerPage = event => {
        const { moduleChild, criteria } = this.state;
        this.setState({
            currPage: 1,
            pageSize: +event.target.value
        });
        let searchData = {
            logName: moduleChild,
            currPage: 1,
            pageSize: +event.target.value,
            criteria: criteria
        };
        this.props.getLogList(searchData);
    };
    searchHandle = value => {
        this.setState({
            value
        });
    };
    hightModeChange = name => e => {
        this.setState({
            [name]: e.target.checked
        });
    };
    getIcons = () => {
        const { classes } = this.props;
        return [
            {
                content: () => {
                    return (
                        <FormControlLabel
                            key="action"
                            classes={{ root: classes.switch }}
                            control={
                                <Switch
                                    checked={this.state.hightMode}
                                    onChange={this.hightModeChange("hightMode")}
                                    value="checkedA"
                                />
                            }
                            label="HightLight Mode"
                        />
                    );
                }
            },
            {
                content: () => {
                    return (
                        <Search
                            key={"search"}
                            placeholder={"Search & highlight text"}
                            searchHandle={this.searchHandle}
                        />
                    );
                }
            },
            {
                name: "filter_list",
                func: () => {
                    this.setState({
                        isShowPanel: !this.state.isShowPanel
                    });
                }
            },
            {
                name: "cloud_download",
                func: () => {
                    const { moduleChild } = this.state;
                    if (!moduleChild) return;
                    this.props.downLoadFile(moduleChild);
                    // window.open(
                    //     window.location.host + "/isc-logger-api/logger/downloadLogFile/" + moduleChild,
                    //     "_blank"
                    // );
                    // this.props.downLoadFile(moduleChild);
                }
            }
        ];
    };
    clickItem = (active, n) => e => {
        this.setState({
            active,
            isOpen: true,
            clickItemData: n
        });
    };
    closeHandle = () => {
        this.setState({
            isOpen: false
        });
    };
    closeConditionPanel = () => {
        this.setState({
            isShowPanel: false
        });
    };
    render() {
        let { classes = {}, payload = [], isLoading, criteria, module, moduleChild } = this.props;
        const { isShowPanel, active, isOpen, clickItemData, value, hightMode } = this.state;
        const { totalrecords = 0, limit = 50, currentpage = 1, totalpages = 0 } = this.props.paginations;
        let rootpayload = payload;
        if (value && value !== "\\") {
            let rootValue = value.replace(/\\/g, "\\");
            let reg = new RegExp(rootValue, "g"),
                keywordBGColor = loggerSetting.keywordBGColor,
                keywordTextColor = loggerSetting.keywordTextColor,
                html = `<em style="background-color: ${keywordBGColor} ; color: ${keywordTextColor}">${value}</em>`;

            rootpayload = _.cloneDeep(payload).map(n => {
                // n.title = n.title.replace(reg, html);
                n.hightLight = reg.test(n.text) && hightMode;
                n.text = <span dangerouslySetInnerHTML={{ __html: n.text.replace(reg, html) }} />;
                return n;
            });
        }
        const Middle = () => (
            <div className={classes.bread}>
                <Breadcrumb>
                    <Breadcrumb.Item>{module}</Breadcrumb.Item>
                    <Breadcrumb.Item>{moduleChild}</Breadcrumb.Item>
                    <Breadcrumb.Item>{criteria}</Breadcrumb.Item>
                </Breadcrumb>
            </div>
        );

        return (
            <React.Fragment>
                <Header title={I18n.t("logger.Logger")} Middle={Middle} icons={this.getIcons()} minwidth="360px">
                    <div className={classes.slide}>
                        <Collapse in={isShowPanel}>
                            <Paper elevation={4} className={classes.paper} classes={{ root: classes.rootPadding }}>
                                <Selects classes={classes} selectData={this.getSelect()} />
                            </Paper>
                        </Collapse>
                    </div>
                </Header>
                {isShowPanel && <div onClick={this.closeConditionPanel} className={classes.fullDialog} />}
                {isLoading && <Progress />}
                <div className={classes.table}>
                    <div>
                        <Dawers
                            open={isOpen}
                            saveButton={false}
                            title={clickItemData.title}
                            content={clickItemData.text}
                            closeHandle={this.closeHandle}
                        />
                    </div>
                    <div id="Logger-Hightlight" className={classnames(classes.list, "Logger-Hightlight")}>
                        <DataList
                            criteria={criteria}
                            dataSource={rootpayload}
                            clickItem={this.clickItem}
                            active={isOpen ? active : false}
                            titleKey="title"
                            textKey="text"
                            totalpages={totalpages}
                            currentpage={currentpage}
                        />
                    </div>
                    <Pagination
                        count={+totalrecords || 0}
                        rowsPerPage={+limit}
                        page={+currentpage - 1}
                        onChangePage={this.handleChangePage}
                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                        rowsPerPageOptions={[50, 100, 200]}
                        ActionsComponent={TablePaginationActionsWrapped}
                    />
                    {/* <Table icons={this.getIcons()} toolBar columnData={columnDatas} tableData={[]} /> */}
                </div>
            </React.Fragment>
        );
    }
}
Lists.propTypes = {
    classes: PropTypes.object
};
Lists.defaultProps = {
    paginations: {}
};

const mapStateToProps = state => {
    return {
        moduleList: state[REDUCER_NAME] && state[REDUCER_NAME].moduleList,
        module: state[REDUCER_NAME] && state[REDUCER_NAME].module,
        moduleChildList: state[REDUCER_NAME] && state[REDUCER_NAME].secondModuleList,
        moduleChild: state[REDUCER_NAME] && state[REDUCER_NAME].moduleChild,
        criteria: state[REDUCER_NAME] && state[REDUCER_NAME].criteria,
        payload: state[REDUCER_NAME] && state[REDUCER_NAME].payload,
        paginations: state[REDUCER_NAME] && state[REDUCER_NAME].paginations,
        isLoading: state[REDUCER_NAME] && state[REDUCER_NAME].isLoading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getModuleChild: name => {
            dispatch(actions.getModuleChild(name));
        },
        getLogList: searchData => {
            dispatch(actions.getLogList(searchData));
        },
        reset: reset => {
            dispatch(actions.reset(reset));
        },
        downLoadFile: filename => {
            dispatch(actions.downLoadFile(filename));
        },
        publishMSG: (topic, category, args, streamid) => {
            dispatch(actions.publishMSG(topic, category, args, streamid));
        }
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(Lists));
