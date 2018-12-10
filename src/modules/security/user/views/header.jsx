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
import { Header, ColumnFilter, Search } from "../../common/index";
import { columnDatas } from "../funcs/constants";
import { I18n } from "react-i18nify";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
const Headers = ({
    checkColumn = [],
    searchHandle,
    reset,
    checkHandleClick,
    editModeFunc,
    searchData,
    getAcountList
}) => {
    const icons = [
        {
            content: () => {
                return (
                    <Search
                        key={"search"}
                        placeholder={I18n.t("security.users.SearchByUserID")}
                        searchHandle={searchHandle}
                    />
                );
            }
        },
        {
            // name: "add",
            awesome: faPlus,
            func: () => {
                reset({ openDrawer: true, drawerLoading: false });
                editModeFunc("add");
            }
        },
        {
            content: () => {
                return (
                    <ColumnFilter
                        key={"filter"}
                        icon="view_week"
                        checked={checkColumn}
                        checkClick={checkHandleClick}
                        options={columnDatas.map(n => n.label)}
                    />
                );
            }
        }
    ];
    return (
        <Header
            title={I18n.t("security.UserManagement")}
            icons={icons}
            style={{ boxShadow: "none", zIndex: 0 }}
            minwidth="auto"
        />
    );
};
Headers.propTypes = {
    classes: PropTypes.object
};
Headers.defaultProps = {
    editModeFunc: () => {}
};
export default Headers;
