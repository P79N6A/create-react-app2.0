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
import "../styles/style.less";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { REDUCER_NAME as dataSearch } from "../funcs/constants";
import { setExportParams, setDefaultTableData, setDownload, setReflush } from "../funcs/actions";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import { TablePagination } from "modules/common";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";

import EnhancedTableHead from "./tableHeader";
import EnhancedTableToolbar from "./tableToolbar";
import TableDialog from "./tableDialog";
import { I18n } from "react-i18nify";
import IconButton from "@material-ui/core/IconButton";
import RefreshIcon from "@material-ui/icons/Refresh";

const styles = theme => ({
    background: {
        backgroundColor: theme.palette.background.paper,
        margin: "0px",
        color: theme.palette.text.primary + " !important"
    },
    color: {
        color: theme.palette.text.primary + " !important"
    },
    button: {
        color: theme.palette.secondary.main
    },
    disabled: {
        color: theme.palette.text.disabled + " !important"
    }
});

let counter = 0;

function createData(taskId, submitTime, submitBy, status) {
    counter += 1;
    return { id: counter, taskId, submitTime, submitBy, status };
}

function countProperties(obj) {
    var count = 0;
    for (var property in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, property)) {
            count++;
        }
    }
    return count;
}

class EnhancedTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            order: "asc",
            open: false,
            downloadUrl: "",
            orderBy: "TASK ID",
            status: "starting",
            getDefaultData: [],
            selected: [],
            data: [],
            page: 0,
            rowsPerPage: 20
        };
    }

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = "desc";

        if (this.state.orderBy === property && this.state.order === "desc") {
            order = "asc";
        }

        this.setState({ order, orderBy });
    };

    handleSelectAllClick = (event, checked) => {
        if (checked) {
            this.setState(state => ({ selected: state.data.map(n => n.id) }));
            return;
        }
        this.setState({ selected: [] });
    };

    handleChangePage = (event, page) => {
        let obj = {
            page: page,
            rowSize: this.state.rowsPerPage
        };

        this.setState({ page: page, data: [] }, () => {
            this.props.onSetDefaultTableData(obj);
        });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
        let obj = {
            page: this.state.page,
            rowSize: event.target.value
        };
        this.props.onSetDefaultTableData(obj);
    };

    //isSelected = id => this.state.selected.indexOf(id) !== -1;

    componentWillMount() {
        //default pagination
        let obj = {
            page: this.state.page,
            rowSize: this.state.rowsPerPage
        };

        this.props.onSetDefaultTableData(obj);
    }

    componentDidMount() {
        //default exportId
        this.props.onSetExportParams();
    }

    componentDidUpdate(prevProps) {
        let getDefaultData = this.props.getDefaultData;

        let contentLength = countProperties(getDefaultData.content);
        if (prevProps.getDefaultData !== this.props.getDefaultData) {
            let data = [];

            for (let i = 0; i < contentLength; i++) {
                data.push(
                    createData(
                        getDefaultData.content[i].taskId,
                        getDefaultData.content[i].startJobTime,
                        getDefaultData.content[i].triggerUser,
                        getDefaultData.content[i].jobStatus
                    )
                );
            }

            if (this.props.getDefaultData.length !== 0) {
                this.setState(
                    Object.assign(this.state, {
                        page: getDefaultData.number,
                        rowsPerPage: getDefaultData.size,
                        data: data,
                        getDefaultData: getDefaultData
                    })
                );
            }
        }

        if (this.props.taskStatus !== prevProps.taskStatus) {
            if (this.props.taskStatus.status === "success" || this.props.taskStatus.status === "dead") {
                let getDefaultData = this.props.getDefaultData;
                let obj = {
                    page: getDefaultData.number,
                    rowSize: getDefaultData.size
                };
                this.props.onSetDefaultTableData(obj);
            }
        }
    }

    handleOpen = taskId => event => {
        this.props.onSetDownload(taskId);

        this.setState({
            open: true
        });
    };

    handleRefreshClick = (event, taskId) => {
        this.props.onSetReflush(taskId);
    };

    closeChildren = flag => {
        this.setState({ open: flag });
    };

    render() {
        const { classes, jobResult, refreshSuccess, taskStatus } = this.props;
        const { data, getDefaultData, order, orderBy, selected, rowsPerPage, page } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length);
        return (
            <Paper className="data-list">
                <EnhancedTableToolbar
                    numSelected={selected.length}
                    startTime={this.props.startTime}
                    endTime={this.props.endTime}
                    page={this.state.page}
                    rowsPerPage={this.state.rowsPerPage}
                    isClick={this.props.DataRight}
                />
                <div className="data-table-wrap">
                    <Table className="data-table">
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={this.handleSelectAllClick}
                            onRequestSort={this.handleRequestSort}
                            rowCount={data.length}
                        />
                        <TableBody className="data-list-body">
                            {data &&
                                data.map(n => {
                                    return (
                                        <TableRow hover tabIndex={-1} key={n.id}>
                                            <TableCell className={classes.color} component="th" scope="row">
                                                {n.taskId}
                                            </TableCell>
                                            <TableCell className={classes.color} numeric>
                                                {n.submitTime}
                                            </TableCell>
                                            <TableCell className={classes.color} numeric>
                                                {n.submitBy}
                                            </TableCell>
                                            <TableCell className={classes.color} numeric>
                                                {n.status === "starting" || n.status === "running" ? (
                                                    <IconButton aria-label="reflush">
                                                        <RefreshIcon
                                                            className={classes.color}
                                                            onClick={event => this.handleRefreshClick(event, n.taskId)}
                                                        />
                                                    </IconButton>
                                                ) : (
                                                    ""
                                                )}

                                                {taskStatus.taskId === n.taskId ? taskStatus.status : n.status}
                                            </TableCell>

                                            <TableCell className={classes.color} numeric>
                                                {n.status === "success" ? (
                                                    <div>
                                                        <Button
                                                            color="primary"
                                                            className={classes.button}
                                                            onClick={this.handleOpen(n.taskId)}
                                                        >
                                                            {I18n.t("dataExport.view")}
                                                        </Button>
                                                        {this.state.open === true &&
                                                        n.taskId === jobResult.taskViewId ? (
                                                                !refreshSuccess ? (
                                                                    <div className="progress-cont">
                                                                        <CircularProgress color="secondary" />
                                                                    </div>
                                                                ) : jobResult.jobResult["File URL"] ===
                                                                    "No file exported" ? (
                                                                        <TableDialog
                                                                            open={this.state.open}
                                                                            jobResultFileUrl={jobResult.jobResult["File URL"]}
                                                                            closeChildren={this.closeChildren.bind(this)}
                                                                        />
                                                                    ) : (
                                                                        <TableDialog
                                                                            open={this.state.open}
                                                                            jobResultFileUrl={jobResult.jobResult["File URL"]}
                                                                            closeChildren={this.closeChildren.bind(this)}
                                                                        />
                                                                    )
                                                            ) : null}
                                                    </div>
                                                ) : (
                                                    <Button disabled color="secondary" className={classes.disabled}>
                                                        {I18n.t("dataExport.view")}
                                                    </Button>
                                                )}
                                            </TableCell>
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
                    {!refreshSuccess ? (
                        <div className="progress-cont">
                            <CircularProgress color="secondary" />
                        </div>
                    ) : data && data.length > 0 ? null : (
                        <Typography variant="caption" gutterBottom align="center" className="no-data">
                            {I18n.t("dataExport.noDataToDisplay")}
                        </Typography>
                    )}
                </div>
                {getDefaultData.length !== 0 ? (
                    <TablePagination
                        component="div"
                        count={getDefaultData.totalElements}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        className={classes.background}
                        rowsPerPageOptions={this.props.rowsPerPageOptions}
                        backIconButtonProps={{
                            "aria-label": "Previous Page"
                        }}
                        nextIconButtonProps={{
                            "aria-label": "Next Page"
                        }}
                        onChangePage={this.handleChangePage}
                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    />
                ) : null}
            </Paper>
        );
    }
}

EnhancedTable.propTypes = {
    classes: PropTypes.object.isRequired,
    rowsPerPageOptions: PropTypes.array
};

EnhancedTable.defaultProps = {
    rowsPerPageOptions: [20, 30, 50]
};

const mapStateToProps = (state, ownProps) => {
    if (state[dataSearch] && state[dataSearch].configvalname) {
        return {
            dataSearch: state[dataSearch].configvalname || [],
            getDefaultData: state[dataSearch].getDefaultData || [],
            jobResult: state[dataSearch].jobResult || {},
            taskStatus: state[dataSearch].taskStatus || [],
            refreshSuccess: state[dataSearch].refreshSuccess || false
        };
    } else {
        return {
            dataSearch: [],
            getDefaultData: [],
            jobResult: {},
            taskStatus: [],
            refreshSuccess: false
        };
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onSetExportParams: () => {
            dispatch(setExportParams());
        },
        onSetDefaultTableData: obj => {
            dispatch(setDefaultTableData(obj));
        },
        onSetDownload: taskId => {
            dispatch(setDownload(taskId));
        },
        onSetReflush: obj => {
            dispatch(setReflush(obj));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(EnhancedTable));
