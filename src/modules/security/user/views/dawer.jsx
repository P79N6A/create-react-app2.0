import React from "react";
import PropTypes from "prop-types";
import { Drawer } from "../../common/index";
import ViewUserForm from "./userFormView/viewUserForm";
import AddUserForm from "./userFormView/addUserForm";
import EditUserForm from "./userFormView/editUserForm";
import encode16Bit from "commons/utils/encode16bit";
import token from "commons/utils/tokenHelper";
import ResetPassword from "./resetPassword";
import _ from "lodash";
import { I18n } from "react-i18nify";
import moment from "moment";

const getTitle = editMode => {
    switch (editMode) {
        case "view":
            return I18n.t("security.users.ViewUser");
        case "add":
            return I18n.t("security.users.AddUser");
        case "edit":
            return I18n.t("security.users.EditUser");
        default:
            return I18n.t("security.users.ViewUser");
    }
};

export function getDate() {
    return moment().format("YYYY-MM-DD");
}
class Dawers extends React.Component {
    state = {
        formDatas: {},
        fileList: [],
        base64: [],
        userData: {},
        search: "",
        formTitle: "",
        open: false,
        deleteOpen: false,
        currUser: [],
        validateResult: true,
        resetPassword: false,
        editMode: "view"
    };
    formDatas = {};
    componentWillReceiveProps(nextProps) {
        const { currUserData } = nextProps;
        if (_.isEqual(currUserData, this.props.currUserData)) return;
        if (currUserData && currUserData.userimage) {
            this.props.getAvator(currUserData.userimage + encode16Bit.ascii2hex(token.get()));
        } else {
            this.props.reset({ avator: [] });
        }
        const { userstartdate, userexpiredate, groups = [] } = currUserData;
        currUserData.timerange = [userstartdate, userexpiredate];
        this.setState({
            fileList: [],
            groups: groups.map(n => n.grpid)
        });
    }
    onClickHandle = () => {
        const { fileList, formDatas } = this.state;
        const { searchData, currGroupData, editMode, currUserData } = this.props;
        if (editMode === "view") {
            this.setState({
                resetPassword: true
            });
            return;
        }
        if (currUserData.editable === false && editMode !== "view") {
            this.props.warn(I18n.t("security.users.notAllowEditMessage"), "User");
            return;
        }
        const { grpid } = currGroupData;
        const { group: groups, password, confirmpassword, timerange, dateofexpiry, ...userDatas } = formDatas;
        let start = timerange[0].split(" ")[0].replace(/\//g, "-");
        let end = timerange[1].split(" ")[0].replace(/\//g, "-");
        let startTime = "T000:00:00.000+0000"; 
        let endTime = "T023:59:59.000+0000";
        // userDatas.userstartdate = start.substring(0, 10) + startTime;
        // userDatas.userexpiredate = end.substring(0, 10) + endTime;
        userDatas.userstartdate = (!dateofexpiry ? start.substring(0, 10) : getDate()) + startTime;
        userDatas.userexpiredate = (!dateofexpiry ? end.substring(0, 10) : "2999-12-31") + endTime;
        // userDatas.userpassword = password;
        // userDatas.userconfirmpassword = confirmpassword;
        let groupData = [];
        let searchUserData = Object.assign({}, searchData, { grpid });
        this.props.reset({ isLoading: true });
        if (currUserData && currUserData.userid) {
            // edit user
            let arr = groups ? groups.map(n => ({ grpid: n })) : [];
            groupData = [{ userid: currUserData.userid, groups: arr }];
            const { active, ...removeAcitveData } = userDatas;
            let postUserData = removeAcitveData;
            postUserData.userimage = currUserData.userimage;
            if (currUserData && currUserData.userstatus !== "0") {
                postUserData = Object.assign({}, postUserData, { active });
            }
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
            };

            this.props.addUser(postUserData, groupData, searchUserData, fileList.length ? fileList[0] : null);
        }
    };
    closeHandle = () => {
        this.props.reset({ openDrawer: false, currUserData: {}, avator: [] });
        this.setState({ fileList: [] });
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
    getFormData = (values, validationRst) => {
        let datas = Object.assign({}, this.formDatas, values);
        this.formDatas = datas;
        this.setState({ formDatas: values, validateResult: validationRst });
    };
    render() {
        const { openDrawer = false, drawerLoading = false, groupDatas = [], editMode, currUserData } = this.props;
        let { fileList, resetPassword, validateResult, formDatas } = this.state;
        const { group = [] } = formDatas;
        return (
            <React.Fragment>
                <ResetPassword
                    open={resetPassword}
                    dataSource={currUserData}
                    resetPasswordDialog={this.resetPasswordDialog}
                />
                <Drawer
                    width={550}
                    readOnly={false}
                    formTitle={getTitle(editMode)}
                    footerTitle={editMode === "view" ? I18n.t("security.users.ResetPassword") : I18n.t("common.Save")}
                    onClickHandle={this.onClickHandle}
                    open={openDrawer}
                    closeHandle={this.closeHandle}
                    disabled={(!group.length || !validateResult) && editMode !== "view"}
                    isLoading={drawerLoading}
                >
                    {editMode === "view" ? (
                        <ViewUserForm
                            editMode={editMode}
                            getGroupValue={this.getGroupValue}
                            getFiles={this.getFiles}
                            fileList={fileList}
                            reportError={this.reportError}
                            readOnly={true}
                            validate={true}
                            getFormData={this.getFormData}
                            opts={groupDatas}
                        />
                    ) : editMode === "add" ? (
                        <AddUserForm
                            editMode={editMode}
                            getGroupValue={this.getGroupValue}
                            getFiles={this.getFiles}
                            fileList={fileList}
                            reportError={this.reportError}
                            readOnly={false}
                            validate={true}
                            getFormData={this.getFormData}
                            opts={groupDatas}
                        />
                    ) : (
                        <EditUserForm
                            editMode={editMode}
                            getGroupValue={this.getGroupValue}
                            getFiles={this.getFiles}
                            fileList={fileList}
                            reportError={this.reportError}
                            readOnly={false}
                            validate={true}
                            getFormData={this.getFormData}
                            opts={groupDatas}
                        />
                    )}
                </Drawer>
            </React.Fragment>
        );
    }
}
Dawers.propTypes = {
    classes: PropTypes.object
};
Dawers.defaultProps = {};
export default Dawers;
