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
import { columnDatas, UserDetailField, addUserFields, editUserFields, viewUserFields } from "../funcs/constants";
import { Search } from "../../common/index";
// import { theme } from "modules/theme";
import * as actions from "../funcs/actions";
import { connect } from "react-redux";
import { REDUCER_NAME, getDate } from "../funcs/constants";
import { Table, Drawer, Header, ColumnFilter } from "../../common/index";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import DeleteDialog from "./deleteDialog";
// import AddUserForm from "./AddUserForm";
import { reportError } from "../../common/validator";
import ResetPassword from "./resetPassword";
import { resourcePathReducerName } from "../../resource_path/index";
import { groupReducerName } from "../../group/index";
import { Loading } from "../../common/index";
import _ from "lodash";
import "../styles/list.less";
import token from "commons/utils/tokenHelper";
import encode16Bit from "commons/utils/encode16bit";
import ViewUserForm from "./userFormView/viewUserForm";
import AddUserForm from "./userFormView/addUserForm";
const originField = _.cloneDeep(UserDetailField);

const getRootField = (data = {}, addUserField, editMode, groupDatas) => {
    const { groups = [] } = data;
    return _.cloneDeep(addUserField).map((item, i) => {
        if (editMode === "add") {
            const { readOnly, ...other } = item;
            item = other;
        }
        if (typeof item.value === "string" && item.name !== "groups") {
            item.value = data[item.name] || "";
        } else if (item.name === "groups") {
            item.value = groups.map(i => i.grpid);
            item.items = groupDatas.map(n => {
                return { value: n.grpid, label: n.grpname };
            });
        } else if (item.name === "timerange") {
            item.value = [
                data.timerange ? data.timerange[0] : getDate(),
                data.timerange ? data.timerange[1] : getDate()
            ];
        } else {
            item.value = data[item.name];
        }
        if (editMode === "edit") {
            item.readOnly = originField[i].readOnly;
        }
        return item;
    });
};

const styles = theme => ({ root: { ...theme.mixins.gutters(), wrapper: { width: "100%" } } });

class Management extends React.Component {
    state = {
        userDatas: [],
        groupDatas: [],
        roleDatas: [],
        fileList: [],
        base64: [],
        userData: {},
        search: "",
        formTitle: "",
        open: false,
        deleteOpen: false,
        readOnly: false,
        addUserField: [],
        originField: [],
        currUser: [],
        userName: "",
        validate: true,
        fieldValue: {},
        validateResult: true,
        resetPassword: false,
        editMode: "view",
        selected: [],
        clomunCheck: [],
        columnDatas: columnDatas,
        groups: []
    };
    formDatas = {};
    componentDidMount() {
        this.setState({
            addUserField: _.cloneDeep(addUserFields)
        });
    }
    componentWillReceiveProps(nextProps) {
        const { currUserData, groupDatas, avator = [] } = nextProps;
        let { editMode } = this.state;
        if (!_.isEqual(avator, this.props.avator) && avator.length) {
            this.setState({
                fileList: [
                    {
                        uid: "-1",
                        name: "tempPic001.png",
                        status: "done",
                        url: avator[1].url
                    }
                ]
            });
        }
        if (_.isEqual(currUserData, this.props.currUserData) && _.isEqual(groupDatas, this.props.groupDatas)) return;
        if (currUserData && currUserData.userimage) {
            this.props.getAvator(currUserData.userimage + encode16Bit.ascii2hex(token.get()));
        } else {
            this.props.reset({ avator: [] });
        }
        if (editMode !== "add" && !_.isEqual(currUserData, this.props.currUserData)) {
            const { userstartdate, userexpiredate } = currUserData;
            currUserData.timerange = [userstartdate, userexpiredate];
            let addUserField = getRootField(Object.assign({}, currUserData), editUserFields, editMode, groupDatas);
            this.setState({
                addUserField
            });
            this.formDatas = addUserField.length
                ? Object.assign.apply({}, addUserField.map(n => ({ [n.name]: n.value })))
                : {};
        }
    }
    searchHandle = value => {
        const { searchData } = this.props;
        this.props.combineSearchData(Object.assign({}, searchData, { likesearchuserid: value, pageno: 1 }));
        this.props.reset({ seachValue: value, openDrawer: false, currUserData: {}, avator: [] });
        this.props.getUser(Object.assign({}, this.props.searchData, { likesearchuserid: value, pageno: 1 }));
    };
    getIcons = () => {
        return [
            {
                visible: !this.state.mode,
                content: () => {
                    return <Search key={"search"} searchHandle={this.searchHandle} />;
                }
            },
            {
                name: "add",
                func: () => {
                    // const { grpid } = this.props.currGroupData;
                    this.props.reset({ openDrawer: true });
                    this.setState({
                        formTitle: "Add User",
                        editMode: "add",
                        fileList: [],
                        base64: [],
                        userData: {},
                        readOnly: false,
                        footerTitle: "save",
                        validate: true,
                        addUserField: _.cloneDeep(addUserFields),
                        open: true
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
        this.props.getUserFromId(data.userid);
        this.props.reset({ openDrawer: true });
        this.setState({
            formTitle: "View User",
            editMode: "view",
            userData: data,
            readOnly: true,
            validate: false,
            footerTitle: "reset password",
            highlight: i,
            addUserField: _.cloneDeep(viewUserFields),
            fileList: [],
            base64: []
        });
    };
    actionContent = () => {
        return [
            {
                icon: "edit_icon",
                func: (n, i) => e => {
                    e.stopPropagation();
                    this.props.getUserFromId(n.userid);
                    this.props.reset({ openDrawer: true });
                    this.setState({
                        highlight: i,
                        fileList: [],
                        base64: [],
                        validate: true,
                        formTitle: "Edit User",
                        editMode: "edit",
                        readOnly: false,
                        footerTitle: "ok",
                        userData: n,
                        addUserField: _.cloneDeep(editUserFields)
                    });
                }
            }
        ];
    };
    getFormData = values => {
        this.formDatas = Object.assign({}, this.formDatas, values);
        const { groupDatas } = this.props;
        const { addUserField, editMode } = this.state;
        let root = getRootField(this.formDatas, addUserField, editMode, groupDatas);
        this.setState({ addUserField: root });
    };
    checkClick = checked => {
        this.setState({
            columnDatas: columnDatas.filter(n => ~checked.indexOf(n.label))
        });
    };
    onClickHandle = () => {
        const { userData, editMode, fileList } = this.state;
        const { searchData, currGroupData } = this.props;
        const { grpid } = currGroupData;
        const { groups, password, confirmpassword, timerange, ...userDatas } = this.formDatas;
        userDatas.userstartdate = timerange[0].split(" ")[0].replace(/\//g, "-") + "T00:00:00.000+0000";
        userDatas.userexpiredate = timerange[1].split(" ")[0].replace(/\//g, "-") + "T23:59:59.000+0000";
        userDatas.userpassword = password;
        userDatas.userconfirmpassword = confirmpassword;
        let groupData = [];
        let searchUserData = Object.assign({}, searchData, { grpid });
        if (editMode === "view") {
            this.setState({
                resetPassword: true
            });
            return;
        }
        this.props.reset({ isLoading: true });
        if (userData && userData.userid) {
            // edit user
            let arr = groups ? groups.map(n => ({ grpid: n })) : [];
            groupData = [{ userid: userData.userid, groups: arr }];
            let postUserData = userDatas;
            postUserData.userimage = "";
            // postUserData.userimage = base64.length ? base64[0] : userData.userimage;
            // groupData.push({ userid: userData.userid, updatetype: "add", groups: add });
            this.props.updateUser(postUserData, groupData, searchUserData, fileList.length ? fileList[0] : null);
        } else {
            // add user
            const { userid } = userDatas;
            let { tempState, ...postData } = userDatas;
            groupData = [
                {
                    userid: userid,
                    groups: groups ? groups.map(n => ({ grpid: n })) : []
                }
            ];
            let postUserData = {
                ...postData,
                userimage: ""
                // userimage: base64.length ? base64[0] : ""
            };
            this.props.addUser(postUserData, groupData, searchUserData, fileList.length ? fileList[0] : null);
        }
        let root = getRootField(
            Object.assign({}, this.props.currUserData, this.formDatas),
            editMode !== "add" ? editUserFields : addUserFields,
            editMode,
            this.props.groupDatas
        );
        this.setState({
            open: false,
            addUserField: root
        });
    };
    closeHandle = () => {
        this.props.reset({ openDrawer: false, currUserData: {}, avator: [] });
        this.setState({ open: false });
    };
    onCancel = () => {
        this.setState({
            currUser: [],
            deleteOpen: false
        });
    };
    onSubmit = () => {
        const { currUser } = this.state;
        const { searchData } = this.props;
        if (!currUser.length) return;
        this.props.deleteUser(currUser, searchData);
        this.setState({
            currUser: {},
            deleteOpen: false
        });
    };
    deleteHandle = selected => {
        const { userDatas = [] } = this.props;
        this.setState({
            deleteOpen: true,
            currUser: selected.map(n => {
                return { userid: n };
            }),
            selected,
            userName: userDatas
                .filter(n => ~selected.indexOf(n.userid))
                .map(n => n.username)
                .join(", ")
        });
    };
    getFiles = (fileList, base64) => {
        this.setState({
            fileList,
            base64
        });
    };
    resetPasswordDialog = resetPassword => {
        this.setState({
            resetPassword
        });
    };
    handleChangePage = page => {
        let searchData = Object.assign({}, this.props.searchData, { pageno: page + 1 });
        this.props.reset({ searchData: searchData, openDrawer: false, currUserData: {}, avator: [] });
        this.props.getUser(searchData);
    };
    handleChangeRowsPerPage = event => {
        let limit = +event;
        let searchData = Object.assign({}, this.props.searchData, { limit });
        this.props.reset({ searchData: searchData, openDrawer: false, currUserData: {}, avator: [] });
        this.props.getUser(searchData);
    };
    sort = (order, sortkey) => {
        let searchData = Object.assign({}, this.props.searchData, { sortkey, order });
        this.props.reset({ searchData: searchData, openDrawer: false, currUserData: {}, avator: [] });
        this.props.getUser(searchData);
    };
    getGroupValue = groups => {
        this.formDatas = Object.assign({}, this.formDatas, { groups });
        this.setState({
            groups
        });
    };
    componentWillUnmount() {
        this.props.reset({ openDrawer: false });
    }
    render() {
        const { loading, pagination = {}, openDrawer = false, userDatas = [] } = this.props;
        const { currentpage = 1, limit = 20, totalrecords = 0 } = pagination;
        let {
            formTitle,
            addUserField,
            userName,
            deleteOpen,
            footerTitle,
            readOnly,
            validate,
            fileList,
            resetPassword,
            userData,
            columnDatas,
            editMode
        } = this.state;
        let validateResult = !reportError(
            true,
            addUserField,
            addUserField.length ? Object.assign.apply({}, addUserField.map(n => ({ [n.name]: n.value }))) : {}
        );
        const { drawerLoading = false } = this.props;
        const { groups = [] } = this.formDatas;
        return (
            <div style={{ height: "calc(100%)", position: "relative", overflow: "hidden" }}>
                <DeleteDialog name={userName} open={deleteOpen} onCancel={this.onCancel} onSubmit={this.onSubmit} />
                <ResetPassword
                    open={resetPassword}
                    dataSource={userData}
                    resetPasswordDialog={this.resetPasswordDialog}
                />
                {loading && <Loading />}
                <Drawer
                    width={550}
                    readOnly={readOnly}
                    formTitle={formTitle}
                    footerTitle={footerTitle}
                    onClickHandle={this.onClickHandle}
                    open={openDrawer}
                    closeHandle={this.closeHandle}
                    disabled={!groups.length || validateResult}
                    isLoading={drawerLoading}
                >
                    {addUserField.length &&
                        (editMode === "view" ? (
                            <ViewUserForm
                                editMode={editMode}
                                getGroupValue={this.getGroupValue}
                                getFiles={this.getFiles}
                                fileList={fileList}
                                reportError={this.reportError}
                                readOnly={readOnly}
                                validate={validate}
                                columns={addUserField}
                                getFormData={this.getFormData}
                                opts={this.props.groupDatas}
                            />
                        ) : (
                            <AddUserForm
                                editMode={editMode}
                                getGroupValue={this.getGroupValue}
                                getFiles={this.getFiles}
                                fileList={fileList}
                                reportError={this.reportError}
                                readOnly={readOnly}
                                validate={validate}
                                columns={addUserField}
                                getFormData={this.getFormData}
                                opts={this.props.groupDatas}
                            />
                        ))}
                </Drawer>
                <Header title="User Management" icons={this.getIcons()} style={{ boxShadow: "none", zIndex: 0 }} />
                {this.props.inset}
                <div style={{ height: "calc(100% - 120px)", position: "relative" }}>
                    <Table
                        deleteHandle={this.deleteHandle}
                        select
                        selectField="userid"
                        icons={[]}
                        columnData={columnDatas.filter(n => n.label !== "Actions")}
                        tableData={userDatas}
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
                        highlight={openDrawer && editMode !== "add" ? this.state.highlight : false}
                        sort={this.sort}
                    />
                    {columnDatas.length === 0 ? (
                        <div className="progress-cont">
                            <Typography variant="caption" gutterBottom align="center" className="no-data">
                                No Columns Selected.
                            </Typography>
                        </div>
                    ) : null}
                </div>
            </div>
        );
    }
}

Management.propTypes = {
    classes: PropTypes.object.isRequired
};
Management.defaultProps = {};

const mapStateToProps = state => {
    return {
        userData: state[REDUCER_NAME] && state[REDUCER_NAME].userData,
        currUserData: state[REDUCER_NAME] && state[REDUCER_NAME].currUserData,
        groups: state[REDUCER_NAME] && state[REDUCER_NAME].payload,
        searchData: state[REDUCER_NAME] && state[REDUCER_NAME].searchData,
        loading: state[REDUCER_NAME] && state[REDUCER_NAME].loading,
        groupDatas: state[REDUCER_NAME] && state[REDUCER_NAME].groupAllList,
        pagination: state[REDUCER_NAME] && state[REDUCER_NAME].pagination,
        openDrawer: state[REDUCER_NAME] && state[REDUCER_NAME].openDrawer,
        drawerLoading: state[REDUCER_NAME] && state[REDUCER_NAME].drawerLoading,
        applicationId: state[resourcePathReducerName] && state[resourcePathReducerName].radioSelected,
        currGroupData: state[groupReducerName] && state[groupReducerName].currGroupData
    };
};

const mapDispatchToProps = dispatch => {
    return {
        selectUser: userData => {
            dispatch(actions.selectUser(userData));
        },
        getUser: searchData => {
            dispatch(actions.getUser(searchData));
        },
        addUser: (userData, groupData, searchData, fileObj) => {
            dispatch(actions.addUser(userData, groupData, searchData, fileObj));
        },
        updateUser: (userData, groupData, searchData, fileObj) => {
            dispatch(actions.updateUser(userData, groupData, searchData, fileObj));
        },
        deleteUser: (userIds, searchData) => {
            dispatch(actions.deleteUser(userIds, searchData));
        },
        combineSearchData: async searchData => {
            dispatch(actions.combineSearchData(searchData));
        },
        reset: reset => {
            dispatch(actions.reset(reset));
        },
        getUserFromId: userid => {
            dispatch(actions.getUserFromId(userid));
        },
        getAvator: mediaFileId => {
            dispatch(actions.getAvator(mediaFileId));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(Management));
