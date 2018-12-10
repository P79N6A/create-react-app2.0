import React from "react";
import PropTypes from "prop-types";
import Darwer from "../../common/drawer";
import { I18n } from "react-i18nify";
import ViewGroup from "./groupForm/viewGroup";
import AddGroup from "./groupForm/addGroup";
import EditGroup from "./groupForm/editGroup";

const getView = ({ ...props }, getFormData) => {
    const { editMode, currGroupData } = props;
    switch (editMode) {
        case "view":
            return <ViewGroup {...props}/>;
        case "add":
            return <AddGroup editMode={editMode} getFormData={getFormData} />;
        case "edit":
            return <EditGroup currGroupData={currGroupData} editMode={editMode} getFormData={getFormData} />;
        default:
            return <ViewGroup {...props} />;
    }
};

const getTitle = editMode => {
    // console.log("i18n",  I18n.t("account.ViewAccount"));
    switch (editMode) {
        case "view":
            return I18n.t("security.userGroups.ViewUserGroup");
        case "add":
            return I18n.t("security.userGroups.AddUserGroup");
        case "edit":
            return I18n.t("security.userGroups.EditUserGroup");
        default:
            return I18n.t("security.userGroups.ViewUserGroup");
    }
};

class Dawers extends React.Component {
    state = {
        formDatas: {},
        validationRst: false
    };
    getFormData = (values, validationRst) => {
        const { formDatas } = this.state;
        this.setState({
            formDatas: Object.assign({}, formDatas, values),
            validationRst
        });
    };
    onClickHandle = () => {
        const { formDatas } = this.state;
        const { searchData } = this.props;
        const { visualizations, editApplication, applicationidArr, editMode, currGroupData } = this.props;
        let { ...groups } = formDatas;
        let rootApplicationidArr = applicationidArr.map(n => {
            const { displayname, ...other } = n;
            return other;
        });
        let postData = Object.assign({}, formDatas, groups, { visualizations, applications: rootApplicationidArr });
        if (editMode === "edit") {
            postData.grpid = currGroupData.grpid;
            postData.applications = editApplication || rootApplicationidArr;
            this.props.updateGroup(postData, searchData);
        } else if (editMode === "add") {
            this.props.addGroup(postData, searchData);
        }
    };
    closeHandle = () => {
        this.props.reset({ drawerOpen: false, group: {}, users: [] });
    };
    render() {
        const { drawerLoading = false, applicationidArr = [], drawerOpen = false, editMode } = this.props;
        const { validationRst } = this.state;
        return (
            <Darwer
                width={590}
                disabled={!validationRst || !applicationidArr.length}
                // footerTitle={footerTitle}
                formTitle={getTitle(editMode)}
                onClickHandle={this.onClickHandle}
                open={drawerOpen}
                closeHandle={this.closeHandle}
                saveButton={editMode !== "view"}
                isLoading={drawerLoading}
            >
                {getView(this.props, this.getFormData)}
            </Darwer>
        );
    }
}
Dawers.defaultProps = {};
Dawers.propTypes = {
    classes: PropTypes.object
};
export default Dawers;
