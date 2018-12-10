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
 * Created by SongCheng on 20/05/2018.
 */
import React, { Component } from "react";
import "../styles/style.less";
// import EnhancedTableToolbar from "./tableToolbar";
import EnhancedTableHead from "./tableHead";
import { getSorterType } from "./../funcs/eventSorter";
import { connect } from "react-redux";
import { REDUCER_NAME } from "../funcs/constants";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import { TableRow, TablePagination } from "modules/common";
// import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import CardContent from "@material-ui/core/Card";

class EventTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sortordersArr: [],
            selected: []
        };
    }

    componentDidMount() {
        const { itemsData, rowsPerPage } = this.props.preState;
        this.props.getItemsSearch(1, rowsPerPage, itemsData);
    }

    //handle item click
    handleClick = (event, id) => {
        let arr = [];
        arr.push(id);
        this.setState({
            selected: arr
        });
        this.props.DrawerToggle(true, "right", id, arr);
    };

    //checkbox selected
    handleClickCheckbox = (event, id) => {
        event.stopPropagation();
        event.nativeEvent.stopImmediatePropagation();

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
    handleSelectAllClick = (event, checked) => {
        if (checked) {
            this.setState({ selected: this.props.preState.data.map(n => n.key) });
            return;
        }
        this.setState({ selected: [] });
    };
    isSelected = id => this.props.preState.isActive.indexOf(id) !== -1;

    //handle sort
    handleRequestSort = (event, property) => {
        let order = "desc";
        if (this.props.preState.orderBy === property && this.props.preState.order === "desc") {
            order = "asc";
        }

        let sortersArr = [];
        if (property && order) {
            const sortorderObj = {
                ascending: order === "asc",
                sortfield: getSorterType(property)
            };
            sortersArr.push(sortorderObj);
        }

        this.setState(
            {
                orderBy: property,
                order: order,
                sortordersArr: sortersArr
            },
            () => {
                this.props.handleSortData(property, order, sortersArr);
            }
        );
    };

    //handle page
    handleChangePage = (event, page) => {
        this.setState({ rowsPerPage: this.props.preState.rowsPerPage, page: page }, () => {
            this.handleSearchCriteria();
        });
    };
    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value, page: 0 }, () => {
            this.handleSearchCriteria();
        });
    };
    handleSearchCriteria = () => {
        const { itemsData } = this.props.preState;
        this.props.getItemsSearch(this.state.page + 1, this.state.rowsPerPage, itemsData);
    };

    render() {
        const { identify, pageSize } = this.props;
        const identifyData = this.props[identify];
        const { selected } = this.state;
        const { data, rowsPerPage, page, totalItems, order, orderBy, loading, columns } = this.props.preState;
        const columnConfig = identifyData && identifyData.columnConfig;
        return (
            <CardContent className="eventTable">
                {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
                <div className="tableBox">
                    {columns && columns.length ? (
                        <Table>
                            <EnhancedTableHead
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={this.handleSelectAllClick}
                                onRequestSort={this.handleRequestSort}
                                rowCount={data && data.length}
                                columns={columnConfig}
                                isSort={true}
                            />
                            <TableBody className="eventList">
                                {data &&
                                    data.map(n => {
                                        const isSelected = this.isSelected(n.id);
                                        return (
                                            <TableRow
                                                hover
                                                onClick={event => this.handleClick(event, n.id)}
                                                role="checkbox"
                                                aria-checked={isSelected}
                                                tabIndex={-1}
                                                key={n.id}
                                                selected={isSelected}
                                            >
                                                {/* <TableCell padding="checkbox" className="selectCheckbox">
                                                <Checkbox
                                                    checked={isSelected}
                                                    onClick={event => this.handleClickCheckbox(event, n.key)}
                                                />
                                            </TableCell> */}
                                                {columnConfig &&
                                                    columnConfig.map(item => {
                                                        return item.defaultSelect ? (
                                                            <TableCell
                                                                title={n[item.key] ? n[item.key] : "unknown"}
                                                                className={item.key}
                                                                key={item.key}
                                                            >
                                                                {item.key === "severity" ? (
                                                                    <i className={"s" + n["severityNum"]} />
                                                                ) : (
                                                                    n[item.key]
                                                                )}
                                                            </TableCell>
                                                        ) : null;
                                                    })}
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                    ) : (
                        <div className="progressBox">
                            <Typography variant="caption" gutterBottom align="center">
                                No Columns Selected...
                            </Typography>
                        </div>
                    )}
                    {!loading ? (
                        <div className="progressBox">
                            <CircularProgress color="secondary" />
                        </div>
                    ) : data && data.length > 0 ? null : (
                        <div className="noData">
                            <Typography variant="caption" gutterBottom align="center">
                                No data to display...
                            </Typography>
                        </div>
                    )}
                </div>
                <TablePagination
                    component="div"
                    count={totalItems}
                    rowsPerPage={rowsPerPage}
                    page={page - 1}
                    backIconButtonProps={{
                        "aria-label": "Previous Page"
                    }}
                    nextIconButtonProps={{
                        "aria-label": "Next Page"
                    }}
                    rowsPerPageOptions={pageSize}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
            </CardContent>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return state[REDUCER_NAME] || {};
};

export default connect(
    mapStateToProps,
    null
)(EventTable);
