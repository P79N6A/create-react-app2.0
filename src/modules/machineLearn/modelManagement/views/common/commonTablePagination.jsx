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
 * Created by HL on 22/06/2018.
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { TablePagination } from "modules/common";
//import { I18n } from "react-i18nify";

class CommonTablePagination extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleChangePage = (event, pagination) => {
        this.props.searchMachineFunc(pagination + 1, this.props.pagination.rowsPerpage);
    };

    handleChangeRowsPerPage = event => {
        this.props.searchMachineFunc(this.props.pagination.page, event.target.value);
    };

    render() {
        const { pagination } = this.props;
        return (
            <TablePagination
                component="div"
                count={pagination.totalNum}
                rowsPerPage={pagination.rowsPerpage}
                page={pagination.page - 1}
                backIconButtonProps={{
                    "aria-label": "Previous Page"
                }}
                nextIconButtonProps={{
                    "aria-label": "Next Page"
                }}
                rowsPerPageOptions={this.props.rowsPerPageOptions}
                onChangePage={this.handleChangePage.bind(this)}
                onChangeRowsPerPage={this.handleChangeRowsPerPage.bind(this)}
            />
        );
    }
}

CommonTablePagination.propTypes = {
    rowsPerPageOptions: PropTypes.array
};

CommonTablePagination.defaultProps = {
    rowsPerPageOptions: [20, 30, 50],
    pagination: {
        page: 1,
        rowsPerpage: 20,
        totalNum: 0
    }
};

export default CommonTablePagination;
