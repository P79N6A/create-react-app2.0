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
 * Created by HuLin on 03/08/2018.
 */

import React from "react";
//import classNames from "classnames";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
// import Table from "@material-ui/core/Table";
// import Checkbox from "@material-ui/core/Checkbox";
// import TableBody from "@material-ui/core/TableBody";
// import TableCell from "@material-ui/core/TableCell";
// import TablePagination from "@material-ui/core/TablePagination";
// import TableRow from "@material-ui/core/TableRow";
// import Typography from "@material-ui/core/Typography";

// import JobsHead from "./jobsHead";
// import JobsToolbar from "./jobsToolbar";
// import AddNewJobs from "./addNewJobs";
// import SelectAllCheckbox from "./selectAllCheckbox";
// import SelectTableRow from "./selectTableRow";
// import IconButton from "@material-ui/core/IconButton";
// import { Icon } from "@material-ui/core";

import CommonTable from "./common/commonTable";
const styles = {
    table: {}
};

class Activities extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    id: 1,
                    activityName: "activities",
                    type: "activity",
                    status: "active",
                    started: "running"
                }
            ],
            currentCheck: [],
            order: "name",
            orderBy: "desc",
            selected: [],
            pagination: {
                page: 1,
                rowsPerPage: 10,
                totalrecords: 1
            }
        };
    }

    // componentWillMount = () => {
    //     let columnConfig = this.props.columnConfig;
    //     let currentCheck = [];
    //     for (let i = 0; i < columnConfig.length; i++) {
    //         if (columnConfig[i].defaultSelect) {
    //             currentCheck.push(columnConfig[i]);
    //         }
    //     }
    //     this.setState({
    //         currentCheck: currentCheck
    //     });
    // };

    // handleRequestSort = (event, property) => {
    //     const orderBy = property;
    //     let order = "desc";

    //     if (this.state.orderBy === property && this.state.order === "desc") {
    //         order = "asc";
    //     }

    //     this.setState(
    //         Object.assign(this.state, {
    //             order,
    //             orderBy
    //         })
    //     );
    // };

    // handleSelectAllClick = event => {
    //     if (event.target.checked) {
    //         this.setState(state => ({ selected: state.data.map(n => n.id) }));
    //         return;
    //     }
    //     this.setState({ selected: [] });
    // };

    handleClickCheckbox = (event, id) => {
        event.preventDefault();
        event.stopPropagation();
        const { selected } = this.state;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }

        this.setState({ selected: newSelected });
    };

    handleSelectColumns = selectedColumn => {
        this.setState(
            Object.assign(this.state, {
                currentCheck: selectedColumn
            })
        );
    };

    // handleChangePage = (event, page) => {
    //     this.setState({ page });

    //     this.props.handlePage(page);
    // };

    // handleChangeRowsPerPage = event => {
    //     this.setState({ rowsPerPage: event.target.value });

    //     this.props.handleRowsPerPage(event.target.value);
    // };

    searchMachineFunc = (currentPage, rowsPerPage) => {
        this.setState({
            pagination: {
                page: currentPage,
                rowsPerPage: rowsPerPage,
                totalrecords: 12
            }
        });
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    render() {
        // const { classes, columnConfig } = this.props;
        // const { currentCheck, order, orderBy, selected, data, rowsPerPage, page } = this.state;
        // const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length);
        const { order, orderBy, selected, data, pagination } = this.state;
        return (
            <CommonTable
                {...this.props}
                identify={this.props.identify}
                data={data}
                order={order}
                orderBy={orderBy}
                selected={selected}
                rowsPerPage={pagination.rowsPerPage}
                searchMachineFunc={this.searchMachineFunc.bind(this)}
                pagination={pagination}
            />
        );
    }
}

Activities.propTypes = {
    classes: PropTypes.object.isRequired
};

Activities.defaultProps = {
    pagination: {
        page: 1,
        rowsPerPage: 5,
        totalrecords: 12
    }
};

export default withStyles(styles)(Activities);
