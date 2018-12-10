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
import { Drawer } from "../common/index";
import AddAccountForm from "./forms/addAccountForm";
import ViewAccountForm from "./forms/viewAccountForm";
import EditAccountForm from "./forms/editAccountForm";
import { getDate } from "../funcs/constant";
import { I18n } from "react-i18nify";

const getView = (
    editMode,
    reflectFormData,
    account,
    open,
    accountGroupDatas,
    groupSearchData,
    getAccountGroupList,
    fileListFun,
    logo
) => {
    switch (editMode) {
        case "view":
            return <ViewAccountForm reflectFormData={reflectFormData} account={account} logo={logo} />;
        case "add":
            return (
                <AddAccountForm
                    reflectFormData={reflectFormData}
                    open={open}
                    accountGroupDatas={accountGroupDatas}
                    groupSearchData={groupSearchData}
                    getAccountGroupList={getAccountGroupList}
                    fileListFun={fileListFun}
                />
            );
        case "edit":
            return (
                <EditAccountForm
                    reflectFormData={reflectFormData}
                    account={account}
                    open={open}
                    accountGroupDatas={accountGroupDatas}
                    getAccountGroupList={getAccountGroupList}
                    fileListFun={fileListFun}
                    logo={logo}
                />
            );
        default:
            return <ViewAccountForm reflectFormData={reflectFormData} account={account} logo={logo} />;
    }
};

const getTitle = editMode => {
    // console.log("i18n",  I18n.t("account.ViewAccount"));
    switch (editMode) {
        case "view":
            return I18n.t("account.ViewAccount");
        case "add":
            return I18n.t("account.AddAccount");
        case "edit":
            return I18n.t("account.EditAccount");
        default:
            return I18n.t("account.ViewAccount");
    }
};

class Dawers extends React.Component {
    state = {
        fileList: [],
        formData: {},
        isDisable: true,
        uitheme: this.props.accountInfo.uitheme || "Default-NCS"
    };
    reflectFormData = (formData, isDisable) => {
        const { uitheme = "Default-NCS", group, othergroup } = formData;
        if (uitheme) {
            this.props.resetTheme({ uitheme: uitheme });
        }
        let root = true;
        if (group === "Add a new group") {
            root = !!othergroup;
        } else if (!group) {
            root = false;
        }
        this.setState({
            formData,
            isDisable: root && isDisable
        });
    };
    // componentWillReceiveProps(nextProps) {
    //     const { account = {}, logo } = nextProps;
    //     if (account.logo) {
    //         this.props.getLogo(account.logo + encode16Bit.ascii2hex(token.get()));
    //     } else {
    //         this.props.reset({ avator: [] });
    //     }
    // }
    closeHandle = () => {
        this.props.reset({ drawerOpen: false, account: {} });
    };
    fileList = fileList => {
        this.setState({
            fileList
        });
    };
    onClickHandle = e => {
        const { formData, fileList } = this.state;
        const { editMode, searchData, account } = this.props;
        const { id, othergroup, center, zoom, layer, ...otherData } = formData;
        let dateofexpiry = formData.dateofexpiry.replace(/\//g, "-") || getDate();
        let isNewGroup = formData.group === "Add a new group";
        let group = formData.group === "Add a new group" ? othergroup : formData.group;
        let trialaccount = formData.trialaccount === "true" ? String(formData.trialaccount) : "false";
        dateofexpiry = trialaccount === "true" ? "2999-12-31" : dateofexpiry;
        let status = formData.status ? 1 : 0;
        let location = JSON.stringify({
            center,
            zoom,
            layer
        });
        let secondarycontact = {
            salutation: "",
            name: "",
            jobtitle: "",
            address: "",
            email: "",
            countrycode: "",
            phone: ""
        };

        if (formData.secondarycontact && !!formData.secondarycontact.name) {
            secondarycontact = formData.secondarycontact;
        }
        let postData = Object.assign({}, otherData, {
            dateofexpiry,
            group,
            trialaccount,
            status,
            secondarycontact,
            location,
            iotgateway: "IoThub"
        });
        let accountgroup = [
            {
                configvals: [
                    {
                        configvalname: othergroup,
                        configvaldesc: othergroup,
                        configvalformat: othergroup,
                        configval: othergroup,
                        modifiedby: "admin"
                    }
                ],
                configname: othergroup,
                modifiedby: "admin"
            }
        ];
        if (editMode === "add") {
            this.props.saveAccount(
                [postData],
                searchData,
                isNewGroup ? accountgroup : null,
                fileList.length ? fileList[0] : null
            );
        } else if (editMode === "edit") {
            const { id } = account;
            postData = Object.assign({}, postData, {
                id
            });
            this.props.updateAccount(
                [postData],
                searchData,
                isNewGroup ? accountgroup : null,
                fileList.length ? fileList[0] : null
            );
        }
    };
    render() {
        const { isDisable } = this.state;
        const {
            width = 500,
            footerTitle,
            open = false,
            drawerLoading,
            editMode,
            account = {},
            accountGroupDatas = [],
            groupSearchData,
            getAccountGroupList,
            logo = []
        } = this.props;
        return (
            <Drawer
                disabled={!isDisable}
                width={width}
                footerTitle={footerTitle}
                formTitle={getTitle(editMode)}
                onClickHandle={this.onClickHandle}
                open={open}
                closeHandle={this.closeHandle}
                saveButton={editMode !== "view"}
                isLoading={drawerLoading}
            >
                {getView(
                    editMode,
                    this.reflectFormData,
                    account,
                    open,
                    accountGroupDatas,
                    groupSearchData,
                    getAccountGroupList,
                    this.fileList,
                    logo
                )}
            </Drawer>
        );
    }
}

Dawers.propTypes = {
    classes: PropTypes.object
};
Dawers.defaultProps = {};
export default Dawers;
