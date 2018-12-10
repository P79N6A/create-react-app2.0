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
import classNames from "classnames";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import Checkbox from "@material-ui/core/Checkbox";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";

import JobsHead from "./jobsHead";
import JobsToolbar from "./jobsToolbar";
import AddNewJobs from "./addNewJobs";
import SelectAllCheckbox from "./selectAllCheckbox";
import SelectTableRow from "./selectTableRow";
import UpdateDialog from "./updateStatus";
import IconButton from "@material-ui/core/IconButton";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Icon } from "@material-ui/core";
import { connect } from "react-redux";
import { REDUCER_NAME } from "../funcs/constants";
import { setReflashJobSchedule, setOpenDialog, setDataProcessInfo } from "../funcs/actions";
import ScheduleTablePagination from "./scheduleTablePagination";

const listHeight = 100;
const listTable = 264;
const styles = {
    selectCheckbox: {
        //Style height after checkbox is selected
        height: `calc(${listHeight}% - ${listTable}px) !important`
    }
};

class JobsTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
            currentCheck: [],
            order: this.props.pagination.order,
            orderBy: this.props.pagination.orderBy,
            pagination: this.props.pagination,
            selected: [],
            showFloatTab: false,
            isAddOpenDrawer: false,
            machineTaskId: "",
            machineStatus: ""
        };
    }

    componentWillMount = () => {
        let columnConfig = this.props.columnConfig;
        let currentCheck = [];

        for (let i = 0; i < columnConfig.length; i++) {
            if (columnConfig[i].defaultSelect) {
                currentCheck.push(columnConfig[i]);
            }
        }
        this.setState({
            currentCheck: currentCheck
        });
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.data && nextProps.data.length) {
            this.setState({
                data: nextProps.data
            });
        }
    }

    handleRequestSort = (event, property) => {
        const orderBy = property;
        const { pagination } = this.state;
        let order = "desc";
        if (this.state.orderBy === property && this.state.order === "desc") {
            order = "asc";
        }

        this.setState({
            order,
            orderBy,
            data: []
        });

        this.props.onSetReflashJobSchedule(pagination.page, pagination.rowsPerpage, orderBy, order);
    };

    handleSelectAllClick = event => {
        if (event.target.checked) {
            this.setState(state => ({ selected: state.data.map(n => n.taskId) }));
            return;
        }
        this.setState({ selected: [] });
    };

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

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    handleTableRowClick = (event, id) => {
        this.props.onSetDataProcessInfo(id);
        this.setState(
            Object.assign(this.state, {
                showFloatTab: true
            })
        );
    };

    getDrawerValue = value => {
        this.setState(
            Object.assign(this.state, {
                showFloatTab: value
            })
        );
    };

    getAddValue = value => {
        this.setState(
            Object.assign(this.state, {
                isAddOpenDrawer: value
            })
        );
    };

    searchMachineFunc = (page, rowsPerpage) => {
        const { orderBy, order } = this.state;
        this.setState({
            data: [],
            selected: []
        });

        this.props.onSetReflashJobSchedule(page, rowsPerpage, orderBy, order);
    };

    handleClearSelect = () => {
        this.setState({
            selected: []
        });
    };

    handleClearData = () => {
        const { pagination } = this.state;
        this.setState({
            selected: [],
            data: []
        });

        setTimeout(() => {
            this.props.onSetReflashJobSchedule(1, pagination.rowsPerpage, pagination.orderBy, pagination.order);
        }, 2000);
    };

    handleUpdateStatus = (event, taskId, status) => {
        event.preventDefault();
        event.stopPropagation();
        this.props.onSetOpenDialog(true);
        this.setState({
            machineTaskId: taskId,
            machineStatus: status
        });
    };

    render() {
        const { classes, columnConfig, reflashSuccess, pagination, ...other } = this.props;
        const { currentCheck, selected, order, orderBy, data, machineTaskId, machineStatus } = this.state;
        const emptyRows = pagination.rowsPerpage - Math.min(pagination.rowsPerpage, data.length);
        return (
            <div className="table-root">
                <JobsToolbar
                    {...other}
                    currentCheck={currentCheck}
                    columnConfig={columnConfig}
                    handleSelectColumns={this.handleSelectColumns.bind(this)}
                    handleClearSelect={this.handleClearSelect}
                />
                {selected.length > 0 ? (
                    <SelectAllCheckbox
                        {...other}
                        handleClearSelect={this.handleClearSelect}
                        selected={selected}
                        numSelected={selected.length}
                        handleClearData={this.handleClearData}
                    />
                ) : null}

                <SelectTableRow
                    {...other}
                    showFloatTab={this.state.showFloatTab}
                    getDrawerValue={this.getDrawerValue.bind(this)}
                />

                <UpdateDialog
                    {...other}
                    isOpenDialog={this.props.isOpenDialog}
                    machineTaskId= {machineTaskId}
                    machineStatus={machineStatus}
                    pagination= {pagination}
                />

                <AddNewJobs
                    {...other}
                    isAddOpenDrawer={this.state.isAddOpenDrawer}
                    getAddValue={this.getAddValue.bind(this)}
                />

                <div className={classNames("table-wrap", { [classes.selectCheckbox]: selected.length })}>
                    {currentCheck && currentCheck.length > 0 ? (
                        <Table style={{
                            minWidth: 1200
                        }}>
                            <JobsHead
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={this.handleSelectAllClick}
                                onRequestSort={this.handleRequestSort}
                                rowCount={data && data.length}
                                columns={columnConfig}
                            />
                            <TableBody>
                                {data &&
                                    data.map(items => {
                                        const isSelected = this.isSelected(items.taskId);
                                        return (
                                            <TableRow
                                                hover
                                                onClick={event => this.handleTableRowClick(event, items.taskId)}
                                                tabIndex={-1}
                                                key={items.taskId}
                                                selected={isSelected}
                                            >
                                                {currentCheck.length > 0 ? (
                                                    <TableCell padding="checkbox">
                                                        <Checkbox
                                                            checked={isSelected}
                                                            onClick={event =>
                                                                this.handleClickCheckbox(event, items.taskId)
                                                            }
                                                        />
                                                    </TableCell>
                                                ) : null}

                                                {currentCheck &&
                                                    currentCheck.map(item => {
                                                        let action = false;
                                                        if (item.key === "action") {
                                                            action = !action;
                                                        }
                                                        return item.defaultSelect ? (
                                                            <TableCell key={item.key}>
                                                                {action && items["jobStatus"] === "running" ? (
                                                                    <IconButton
                                                                        onClick={event => {
                                                                            this.handleUpdateStatus(
                                                                                event,
                                                                                items["taskId"],
                                                                                "close"
                                                                            );
                                                                        }}
                                                                    >
                                                                        <Icon>pause</Icon>
                                                                    </IconButton>
                                                                ) : action && items["jobStatus"] === "cancelled" ? (
                                                                    <IconButton
                                                                        onClick={event => {
                                                                            this.handleUpdateStatus(
                                                                                event,
                                                                                items["taskId"],
                                                                                "open"
                                                                            );
                                                                        }}
                                                                    >
                                                                        <Icon>play_arrow</Icon>
                                                                    </IconButton>
                                                                ) : null}

                                                                {!action ? items[item.key] : null}
                                                            </TableCell>
                                                        ) : null;
                                                    })}
                                            </TableRow>
                                        );
                                    })}
                                {emptyRows > 0 && (
                                    <TableRow style={{ height: 49 * emptyRows }}>
                                        <TableCell colSpan={6} style={{ borderBottom: "none" }} />
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    ) : (
                        <div className="progressBox">
                            <Typography variant="caption" gutterBottom align="center">
                                No Columns Selected...
                            </Typography>
                        </div>
                    )}
                    {!reflashSuccess ? (
                        <div className="progress-cont">
                            <CircularProgress color="secondary" />
                        </div>
                    ) : data && data.length > 0 ? null : (
                        <div className="progressBox">
                            <Typography variant="caption" gutterBottom align="center">
                                No data display...
                            </Typography>
                        </div>
                    )}
                </div>
                {pagination && JSON.stringify(pagination) !== "{}" ? (
                    <ScheduleTablePagination pagination={pagination} searchMachineFunc={this.searchMachineFunc} />
                ) : null}
            </div>
        );
    }
}

JobsTable.propTypes = {
    classes: PropTypes.object.isRequired
};

JobsTable.defaultProps = {
    data: [],
    rowsPerPageOptions: [10, 20, 50, 100],
    pagination: {
        page: 1,
        rowsPerpage: 10,
        orderBy: "taskName",
        order: "desc",
        totalNum: 0
    }
};

const mapStateToProps = (state, ownProps) => {
    if (state[REDUCER_NAME] && state[REDUCER_NAME].machineLearn) {
        return {
            pagination: state[REDUCER_NAME].machineLearn.pagination,
            data: state[REDUCER_NAME].machineLearn.jobScheduleTable || [],
            reflashSuccess: state[REDUCER_NAME].machineLearn.reflashSuccess || false,
            isOpenDialog: state[REDUCER_NAME].machineLearn.isOpenDialog || false
        };
    }
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onSetReflashJobSchedule: (page, rowsPerPage, orderBy, order) => {
            dispatch(setReflashJobSchedule(page, rowsPerPage, orderBy, order, props.identify));
        },
        onSetOpenDialog: open => {
            dispatch(setOpenDialog(open, props.identify));
        },
        onSetDataProcessInfo: taskId => {
            dispatch(setDataProcessInfo(taskId, props.identify));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(JobsTable));
