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
 * Created by Chen Ling on 15/10/2018.
 */
import React, { Component } from "react";
// import "../styles/sop.less";
// import PropTypes from "prop-types";
import TablePagination from "@material-ui/core/TablePagination";
// import { connect } from "react-redux";
// import {REDUCER_NAME as sopListReducer} from "../funcs/constants";
class TaskListTablePagination extends Component {
    constructor(props) {
        super(props);
        this.handleChangePage = this.handleChangePage.bind(this);
        this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
    };
    handleChangePage = (event, pagination) => {
        // event.stopPropagation();
        // event.nativeEvent.stopImmediatePropagation();
        // console.log("handleChangePage");
        this.props.searchTopoFunc(pagination + 1, this.props.pagination.limit);
    };

    handleChangeRowsPerPage = event => {
        // event.stopPropagation();
        // event.nativeEvent.stopImmediatePropagation();
        // console.log("handleChangeRowsPerPage", event.target.value);
        let currentpage = this.props.pagination.currentpage;
        this.props.searchTopoFunc(currentpage, event.target.value);
    };

    render() {
        const { pagination, rowsPerPageOptions} = this.props;
        // console.log(pagination, rowsPerPageOptions);
        // console.log(parseInt(pagination.limit)
        return (
            <TablePagination 
                component="div"
                count={pagination.totalrecords}
                rowsPerPage={pagination.limit}
                page={pagination.currentpage-1}
                backIconButtonProps={{
                    "aria-label": "Previous Page"
                }}
                nextIconButtonProps={{
                    "aria-label": "Next Page"
                }}
                rowsPerPageOptions={rowsPerPageOptions}
                onChangePage={this.handleChangePage}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
            />
        );
    }
}

TaskListTablePagination.propTypes = {
    // rowsPerPageOptions: PropTypes.array
};
TaskListTablePagination.defaultProps = {
    // rowsPerPageOptions: [3, 10, 20, 50, 100, 200],
    // pagination: {
    //     totalrecords: 0,
    //     limit: 10,
    //     currentpage: 1
    // }
};

export default TaskListTablePagination;
