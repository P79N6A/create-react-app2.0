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
import { Header, ColumnFilter, Search } from "../common/index";
import { columnDatas } from "../funcs/constant";
import { I18n } from "react-i18nify";
import { faPlus, faSort } from "@fortawesome/free-solid-svg-icons";
const Headers = ({
    checkColumn = [],
    reset,
    checkHandleClick,
    searchHandle,
    editModeFunc,
    searchData,
    getAcountList
}) => {
    const icons = [
        // {
        //     content: () => {
        //         return (
        //             <Search
        //                 key={"search"}
        //                 placeholder={I18n.t("account.searchByAccountName")}
        //                 searchHandle={searchHandle}
        //             />
        //         );
        //     }
        // },
        {
            // name: "add",
            awesome: faPlus,
            func: () => {
                reset({ drawerOpen: true, account: {} });
                editModeFunc("add");
            }
        },
        {
            // name: "sort_by_alpha",
            awesome: faSort,
            func: () => {
                let sort = searchData.sort === "asc" ? "desc" : "asc";
                let searchDatas = Object.assign({}, searchData, { sort });
                reset({ searchData: searchDatas });
                getAcountList(searchDatas);
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
            title={I18n.t("account.Accounts")}
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
