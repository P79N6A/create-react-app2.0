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
import { Table } from "../common/index";
import { Typography } from "@material-ui/core";
import "../styles/non-column.less";
class Tables extends React.Component {
    state = { highlight: -1 };
    clickRow = (n, i) => {
        this.ClickRowAction(n, i);
        this.props.editModeFunc("view");
        this.props.reset({ logo: [] });
    };
    actionContent = () => {
        return [
            {
                icon: "edit_icon",
                func: (n, i) => e => {
                    e.stopPropagation();
                    this.ClickRowAction(n, i);
                    this.props.editModeFunc("edit");
                    this.props.reset({ logo: [] });
                }
            }
        ];
    };
    ClickRowAction = (n, i) => {
        if (n && n.id) {
            this.props.reset({ drawerOpen: true });
            this.props.getAccountFromID(n.id);
            this.setState({
                highlight: i
            });
        }
    };
    deleteHandle = selected => {
        this.props.reset({
            deleteOpen: true,
            deleteData: selected
        });
    };
    handleChangePage = page => {
        let searchData = Object.assign({}, this.props.searchData, { pageno: page + 1 });
        this.props.reset({ searchData: searchData, drawerOpen: false, account: {} });
        this.props.getAcountList(searchData);
    };
    handleChangeRowsPerPage = event => {
        let limit = +event;
        let searchData = Object.assign({}, this.props.searchData, { limit, pageno: 1 });
        this.props.reset({ searchData: searchData, drawerOpen: false, account: {} });
        this.props.getAcountList(searchData);
    };
    render() {
        const { accountList = [], paginations = {}, columnDatas = [], drawerOpen, editMode } = this.props;
        const { highlight } = this.state;
        const { currentpage = 1, limit = 20, totalrecords = 0 } = paginations;
        return (
            <div style={{ height: "calc(100% - 72px)", position: "relative" }}>
                {columnDatas.length ? (
                    <Table
                        deleteHandle={this.deleteHandle}
                        select
                        selectField="id"
                        icons={[]}
                        columnData={columnDatas.filter(n => n.label !== "Actions")}
                        tableData={accountList}
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
                        highlight={drawerOpen && editMode !== "add" ? highlight : false}
                        sort={this.sort}
                    />
                ) : null}

                {columnDatas.length === 0 ? (
                    <div className="progress-cont">
                        <Typography variant="caption" gutterBottom align="center" className="no-data">
                            No Columns Selected.
                        </Typography>
                    </div>
                ) : null}
            </div>
        );
    }
}
Tables.propTypes = {
    classes: PropTypes.object
};
Tables.defaultProps = {
    editModeFunc: () => {}
};
export default Tables;
