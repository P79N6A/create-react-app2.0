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
 * Created by Jia Luo on 27/07/2018.
 */
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Table, Search, Form } from "../../common/index";
import { columnDatas } from "../funcs/constants";
import { theme } from "modules/theme";
import * as actions from "../funcs/actions";
import { withStyles } from "@material-ui/core/styles";
import { List, ListItem, ListItemText } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { reportError } from "../../common/validator";
import { Header } from "../../common/index";
import Darwer from "../../common/drawer";
import { groupFields } from "../funcs/constants";
import DeleteDialog from "./deleteDialog";
import { Loading, ColumnFilter } from "../../common/index";
import TabView from "./tabView";
import _ from "lodash";
import { REDUCER_NAME } from "../funcs/constants";
import { REDUCER_NAME as ResourcePath_ReducerName } from "../../resource_path/funcs/constants";
// import { REDUCER_NAME as User_ReducerName } from "../../user/funcs/constants";
import * as UserActions from "../../user/funcs/actions";
import "../styles/list.less";
import store from "commons/store";
import { actions as message } from "modules/messageCenter";
import classnames from "classnames";
import { I18n } from "react-i18nify";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
const addGroupField = _.cloneDeep(groupFields);
// const originField = _.cloneDeep(groupFields);
const styles = theme => ({
    formargin: {
        margin: theme.spacing.unit * 2 + "px 0px " + theme.spacing.unit + "px"
    },
    listStyle: {
        paddingLeft: 0,
        paddingRight: 0,
        "& span": {
            whiteSpace: "pre",
            wordBreak: "break-all",
            fontSize: "1rem!important"
        },
        "& p": {
            fontSize: "0.875rem!important"
        }
    },
    "progress-cont-bgcolor": {
        backgroundColor: theme.palette.background.paper
    }
});
/**
 * GroupList component table component
 * @example
 *
 *
 * @param {array} groupDatas
 * @param {array} roleDatas
 * @param {array} userDatas
 * @returns Component
 */
class GroupList extends React.Component {
    state = {
        formTitle: "Add User Group",
        footerTitle: "",
        groupDatas: [],
        userDatas: [],
        roleDatas: [],
        search: "",
        open: false,
        validate: true,
        deleteOpen: false,
        loading: false,
        readOnly: false,
        groupId: "",
        addGroupField: [],
        OrigiField: [],
        groupCurr: {},
        groupName: "",
        deleteGrpID: "",
        fieldValue: {},
        validateResult: true,
        editMode: "view",
        selected: [],
        clomunCheck: [],
        columnDatas: columnDatas
    };
    formDatas = {};
    componentDidMount() {
        this.setState({
            OrigiField: [].concat.apply([], addGroupField),
            addGroupField: addGroupField
        });
    }
    searchHandle = value => {
        let searchData = Object.assign({}, this.props.searchData, { grpname: value, pageno: 1 });
        this.setState({
            search: value
        });
        this.props.reset({ seachValue: value, searchData: searchData });
        this.props.getGroup(searchData);
    };
    actionContent = () => {
        return [
            {
                icon: "edit_icon",
                func: (n, i) => e => {
                    e.stopPropagation();
                    if (!n.editable) {
                        store.dispatch(
                            message.warn(I18n.t("security.group.notAllowEditMessage"), I18n.t("security.moduleName"))
                        );
                        return;
                    }
                    this.props.getGroupFromId(n.grpid);
                    const { roles, users } = n;
                    this.props.reset({ currGroupData: n, application: n.application || "", drawerOpen: true });
                    const { userSearchData } = this.props;
                    let userSearchDatas = Object.assign({}, userSearchData, {
                        grpid: n.grpid,
                        limit: 10,
                        pageno: 1,
                        username: ""
                    });
                    this.props.reset({ userSearchData: userSearchDatas });
                    this.props.getUserFromGrpId(userSearchDatas);
                    this.setState({
                        highlight: i,
                        formTitle: I18n.t("security.userGroups.EditUserGroup"),
                        groupId: n.grpid,
                        open: true,
                        readOnly: false,
                        validate: true,
                        editMode: "edit",
                        groupCurr: n,
                        footerTitle: "",
                        addGroupField: this.state.addGroupField.map(item => {
                            if (typeof item.value === "string" || typeof item.value === "undefined") {
                                item.value = n[item.name];
                            } else if (item.name === "users") {
                                item.value = users.map(i => i.userid);
                            } else if (item.name === "roles") {
                                item.value = roles.map(i => i.roleid);
                            } else {
                                item.value = n[item.name];
                            }
                            return item;
                        })
                    });
                }
            }
        ];
    };
    componentWillReceiveProps(nextProps) {
        const { groupDatas, currGroupData, loading } = nextProps;
        if (
            _.isEqual(loading, this.state.loading) &&
            _.isEqual(groupDatas, this.props.groupDatas) &&
            _.isEqual(currGroupData, this.props.currGroupData)
        )
            return;
        const { OrigiField, editMode } = this.state;
        let rootAddGroupField =
            editMode !== "add"
                ? _.cloneDeep(OrigiField).map(item => {
                      item.value = currGroupData[item.name] || "";
                      return item;
                  })
                : this.state.addGroupField;

        this.setState({
            loading,
            groupDatas,
            addGroupField: rootAddGroupField
        });
    }
    checkClick = checked => {
        this.setState({
            columnDatas: columnDatas.filter(n => ~checked.indexOf(n.label))
        });
    };
    getIcons = () => {
        return [
            {
                visible: !this.state.mode,
                content: () => {
                    return (
                        <Search
                            key={"search"}
                            placeholder={I18n.t("security.userGroups.SearchByGroupName")}
                            searchHandle={this.searchHandle}
                        />
                    );
                }
            },
            {
                // name: "add",
                awesome: faPlus,
                func: () => {
                    const { addGroupField } = this.state;
                    this.props.reset({ drawerOpen: true });
                    this.setState({
                        formTitle: I18n.t("security.userGroups.AddUserGroup"),
                        groupId: "",
                        editMode: "add",
                        open: true,
                        groupCurr: {},
                        readOnly: false,
                        validate: true,
                        footerTitle: "",
                        addGroupField: addGroupField.map(item => {
                            const { readOnly, ...data } = item;
                            if (typeof data.value === "string" || typeof data.value === "undefined") {
                                data.value = "";
                            } else {
                                data.value = [];
                            }
                            return data;
                        })
                    });
                }
            },
            {
                content: () => {
                    return (
                        <ColumnFilter
                            key={"filter"}
                            icon="view_week"
                            checked={[]}
                            checkClick={this.checkClick}
                            options={columnDatas.map(n => n.label)}
                        />
                    );
                }
            }
        ];
    };
    clickRow = (data, i) => {
        const { userSearchData } = this.props;
        const { roles, users } = data;
        this.props.reset({ currGroupData: data, application: data.application || "", drawerOpen: true });
        this.props.getGroupFromId(data.grpid);
        let userSearchDatas = Object.assign({}, userSearchData, {
            grpid: data.grpid,
            limit: 10,
            pageno: 1,
            username: ""
        });
        this.props.reset({ userSearchData: userSearchDatas });
        this.props.getUserFromGrpId(userSearchDatas);
        this.setState({
            formTitle: I18n.t("security.userGroups.ViewUserGroup"),
            open: true,
            readOnly: true,
            editMode: "view",
            validate: false,
            groupCurr: data,
            footerTitle: "cancel",
            highlight: i,
            addGroupField: this.state.addGroupField.map(item => {
                if (typeof item.value === "string" || typeof data.value === "undefined") {
                    item.value = data[item.name];
                } else if (item.name === "users") {
                    item.value = users.map(i => i.userid);
                } else if (item.name === "roles") {
                    item.value = roles.map(i => i.roleid);
                } else {
                    item.value = data[item.name];
                }
                return item;
            })
        });
    };
    onClickHandle = () => {
        const { groupCurr, editMode, addGroupField } = this.state;
        let formDatas = this.formDatas;
        const { searchData } = this.props;
        const { visualizations, editApplication, applicationidArr } = this.props;
        let { roles, users, ...groups } = formDatas;
        let rootApplicationidArr = applicationidArr.map(n => {
            const { displayname, ...other } = n;
            return other;
        });
        let postData = Object.assign({}, groups, { visualizations, applications: rootApplicationidArr });
        if (editMode === "edit") {
            postData.grpid = groupCurr.grpid;
            postData.applications = editApplication || rootApplicationidArr;
            this.props.updateGroup(postData, searchData);
        } else if (editMode === "add") {
            this.props.addGroup(postData, searchData);
        }
        let root = addGroupField.map(n => ({ [n.name]: formDatas[n.name] }));
        this.setState({
            open: false,
            addUserField: root
        });
    };
    closeHandle = () => {
        this.props.reset({ drawerOpen: false, group: {}, users: [] });
    };
    getFormData = (values, validateResult) => {
        const { addGroupField } = this.state;
        let rootField = addGroupField.map(field => {
            field.value = values[field.name];
            return field;
        });
        this.formDatas = Object.assign({}, this.formDatas, values);
        this.setState({
            addGroupField: rootField,
            fieldValue: Object.assign({}, this.state.fieldValue, values),
            validateResult: !validateResult
        });
    };
    onCancel = () => {
        this.setState({
            deleteOpen: false
        });
    };
    onSubmit = () => {
        const { currGroup } = this.state;
        const { searchData } = this.props;
        this.props.deleteGroup(currGroup, searchData);
        this.setState({
            deleteOpen: false,
            currGroup: []
        });
    };
    deleteHandle = selected => {
        const { groupDatas } = this.state;
        this.setState({
            deleteOpen: true,
            currGroup: selected.map(n => {
                return { grpid: n };
            }),
            selected,
            groupName: groupDatas
                .filter(n => ~selected.indexOf(n.grpid))
                .map(n => n.grpname)
                .join(", ")
        });
    };
    handleChangePage = page => {
        let searchData = Object.assign({}, this.props.searchData, { pageno: page + 1 });
        this.props.reset({ searchData: searchData, drawerOpen: false, group: {} });
        this.props.getGroup(searchData);
    };
    handleChangeRowsPerPage = event => {
        let limit = +event;
        let searchData = Object.assign({}, this.props.searchData, { limit });
        this.props.reset({ searchData: searchData, drawerOpen: false, group: {} });
        this.props.getGroup(searchData);
    };
    sort = (order, sortkey) => {
        sortkey = sortkey === "grpname" ? "grpName" : sortkey === "grpdescription" ? "grpDescription" : "";
        order = order === "asc" ? true : false;
        let searchData = Object.assign({}, this.props.searchData, { sortkey, asc: order });
        this.props.reset({ searchData: searchData, drawerOpen: false, group: {} });
        this.props.getGroup(searchData);
    };
    shouldComponentUpdate(nextProps, nextState) {
        if (_.isEqual(nextProps, this.props) && _.isEqual(nextState, this.state)) return false;
        return true;
    }
    render() {
        const { pagination = {}, classes, drawerOpen = false } = this.props;
        const { currentpage = 1, limit = 20, totalrecords = 0 } = pagination;
        const {
            groupDatas,
            addGroupField,
            formTitle,
            groupName,
            deleteOpen,
            loading,
            readOnly,
            footerTitle,
            validate,
            // validateResult,
            editMode,
            columnDatas
        } = this.state;
        let validateResult = !reportError(
            true,
            addGroupField,
            addGroupField.length ? Object.assign.apply({}, addGroupField.map(n => ({ [n.name]: n.value || "" }))) : {}
        );
        const { drawerLoading = false, applicationidArr } = this.props;
        return (
            <div style={{ height: "calc(100%)", position: "relative", overflow: "hidden" }}>
                {loading && <Loading />}
                <DeleteDialog name={groupName} open={deleteOpen} onCancel={this.onCancel} onSubmit={this.onSubmit} />
                <Darwer
                    width={590}
                    disabled={validateResult || !applicationidArr.length}
                    readOnly={readOnly}
                    footerTitle={footerTitle}
                    formTitle={formTitle}
                    onClickHandle={this.onClickHandle}
                    open={drawerOpen}
                    closeHandle={this.closeHandle}
                    saveButton={editMode !== "view"}
                    isLoading={drawerLoading}
                >
                    <div className={classes.formargin}>
                        {addGroupField.length ? (
                            editMode === "view" ? (
                                addGroupField.map(n => (
                                    <List classes={{ root: classes.ulStyle }} key={n.name} dense={true}>
                                        <ListItem button classes={{ root: classes.listStyle }}>
                                            <ListItemText primary={n.value} secondary={n.label} />
                                        </ListItem>
                                    </List>
                                ))
                            ) : (
                                <Form
                                    readOnly={readOnly}
                                    validate={validate}
                                    columns={addGroupField}
                                    getFormData={this.getFormData}
                                />
                            )
                        ) : null}
                    </div>
                    <TabView editMode={editMode} />
                </Darwer>
                {/* <Header
                    title={I18n.t("security.UserManagement")}
                    icons={this.getIcons()}
                    style={{ boxShadow: "none", zIndex: 0 }}
                /> */}
                {this.props.inset}
                <div
                    style={{
                        height: "calc(100% - 120px)",
                        position: "relative",
                        backgroundColor: theme.palette.background.paper
                    }}
                >
                    {columnDatas.length === 0 ? (
                        <div className={classnames("progress-cont", classes["progress-cont-bgcolor"])}>
                            <Typography variant="caption" gutterBottom align="center" className="no-data">
                                {I18n.t("common.NoColumnsSelected")}
                            </Typography>
                        </div>
                    ) : (
                        <Table
                            deleteHandle={this.deleteHandle}
                            select
                            selectField="grpid"
                            icons={[]}
                            columnData={columnDatas.filter(n => n.label !== "Actions")}
                            tableData={groupDatas}
                            clickRow={this.clickRow}
                            action={!!columnDatas.find(n => n.label === "Actions")}
                            actionContent={this.actionContent()}
                            actionNumeric={true}
                            page={currentpage - 1}
                            rowsPerPage={limit}
                            count={totalrecords}
                            backendPagination={true}
                            handleChangePage={this.handleChangePage}
                            handleChangeRowsPerPage={this.handleChangeRowsPerPage}
                            highlight={drawerOpen && editMode !== "add" ? this.state.highlight : false}
                            sort={this.sort}
                        />
                    )}
                </div>
            </div>
        );
    }
}
GroupList.propTypes = {
    classes: PropTypes.object.isRequired
};
GroupList.defaultProps = {};

const mapStateToProps = state => {
    return {
        currGroupData: state[REDUCER_NAME] && state[REDUCER_NAME].currGroupData,
        visualizations: state[REDUCER_NAME] && state[REDUCER_NAME].visualizations,
        editApplication: state[REDUCER_NAME] && state[REDUCER_NAME].editApplication,
        radioSelected: state[ResourcePath_ReducerName] && state[ResourcePath_ReducerName].radioSelected,
        applicationidArr: state[REDUCER_NAME] && state[REDUCER_NAME].applicationidArr,
        pagination: state[REDUCER_NAME] && state[REDUCER_NAME].pagination,
        searchData: state[REDUCER_NAME] && state[REDUCER_NAME].searchData,
        userSearchData: state[REDUCER_NAME] && state[REDUCER_NAME].userSearchData,
        drawerOpen: state[REDUCER_NAME] && state[REDUCER_NAME].drawerOpen,
        drawerLoading: state[REDUCER_NAME] && state[REDUCER_NAME].drawerLoading
        // radioSelected: state[User_ReducerName] && state[User_ReducerName].radioSelected
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGroup: (searchData, flag) => {
            dispatch(actions.getGroup(searchData, flag));
        },
        getUser: (searchData, flag) => {
            dispatch(UserActions.getUser(searchData, flag));
        },
        addGroup: (group, searchData) => {
            dispatch(actions.addGroup(group, searchData));
        },
        updateGroup: (group, searchData) => {
            dispatch(actions.updateGroup(group, searchData));
        },
        deleteGroup: (groupId, searchData) => {
            dispatch(actions.deleteGroup(groupId, searchData));
        },
        reset: reset => {
            dispatch(actions.reset(reset));
        },
        getGroupFromId: grpid => {
            dispatch(actions.getGroupFromId(grpid));
        },
        getUserFromGrpId: userSearchData => {
            dispatch(actions.getUserFromGrpId(userSearchData));
        }
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(GroupList));
