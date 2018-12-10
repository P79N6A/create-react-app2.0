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
 * Created by xulu on 20/05/2018.
 */
import React, { Component } from "react";
import "../styles/style.less";
import PropTypes from "prop-types";
import { TablePagination } from "modules/common";

class TopologyTablePagination extends Component {
    handleChangePage = (event, pagination) => {
        this.props.searchTopoFunc(pagination + 1, this.props.pagination.limit);
    };

    handleChangeRowsPerPage = event => {
        this.props.searchTopoFunc(this.props.pagination.currentpage, event.target.value);
    };

    render() {
        const { pagination } = this.props;
        return (
            <TablePagination
                component="div"
                count={pagination.totalrecords}
                rowsPerPage={pagination.limit}
                page={pagination.currentpage - 1}
                rowsPerPageOptions={this.props.rowsPerPageOptions}
                onChangePage={this.handleChangePage.bind(this)}
                onChangeRowsPerPage={this.handleChangeRowsPerPage.bind(this)}
            />
        );
    }
}

TopologyTablePagination.propTypes = {
    rowsPerPageOptions: PropTypes.array
};

TopologyTablePagination.defaultProps = {
    rowsPerPageOptions: [10, 20, 50, 100, 200],
    pagination: {
        totalrecords: 0,
        limit: 10,
        currentpage: 1
    }
};

export default TopologyTablePagination;
