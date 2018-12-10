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
 * Created by Krishalee on 16/11/18.
 */
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { getFileHistory } from "../funcs/actions";
import { REDUCER_NAME } from "../funcs/constants";
// import { reducerName as topoimportReducerName } from "modules/deviceImport";
import { TablePagination } from "modules/common";
import _ from "lodash";
import DateUtility from "commons/utils/dateUtility.js";
import moment from "moment";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import ListHeader from "./tableHeader";
import "../styles/style.less";

//inprogress color rgba(255, 255, 255, 0.08)

const styles = theme => ({
    root: {
        width: "100%",
        marginTop: theme.spacing.unit * 3,
        overflowX: "auto"
    },
    table: {
        minWidth: 700
    },
    listPanel: {
        // position: relative,
        width: "100%",
        height: "calc(100% - 200px)"
        // overflowX: auto,
        // overflowY: scroll
    }
});

class Filelist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fileList: [],
            totalItems: 0,
            rowsPerPage: this.props.pageLimit,
            page: this.props.pageNo,
            pageSize: this.props.pageSize,
            postData: this.props.postData,
            searchText: "",
            datePredicate: this.props.datePredicate,
            isLoading: false
        };
    }

    callFileHistory = (page, limit) => {
        this.state.postData.paginator.pageno = page;
        this.state.postData.paginator.limit = limit;

        this.setState({
            isLoading: true
        });

        let currentDatetime = new Date();
        let toDatetime = moment(currentDatetime).format("YYYY-MM-DD HH:mm:ss.SSS");
        let fromDatetime = moment(new Date(currentDatetime - 6.04e8)).format("YYYY-MM-DD HH:mm:ss.SSS");

        this.state.postData.predicate = this.state.datePredicate;
        this.state.postData.predicate.values = [fromDatetime, toDatetime];
        this.props.getFileHistory(this.state.postData);
    };

    componentDidMount = () => {
        const { page, rowsPerPage } = this.state;
        this.callFileHistory(page, rowsPerPage);
    };

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        this.setState({
            fileList: nextProps.files,
            totalItems: nextProps.pagination.totalrecords,
            rowsPerPage: nextProps.pagination.limit,
            page: nextProps.pagination.currentpage
        });

        if (_.findLastIndex(nextProps.files, ["fileStatus", "FILE_IMPORT_IN_PROGRESS"]) !== -1) {
            this.props.handleProgress(true);
        } else {
            this.props.handleProgress(false);
        }
    }

    handleChangePage = (event, page) => {
        // this.setState({ page });
        this.setState({ page: page }, () => {
            this.handleSearchCriteria();
        });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value }, () => {
            this.handleSearchCriteria();
        });
    };

    handleSearchCriteria = () => {
        this.callFileHistory(this.state.page + 1, this.state.rowsPerPage);
    };

    searchHandle = value => {
        console.log(value);
    };

    render() {
        const { fileList, totalItems, rowsPerPage, page, pageSize, isLoading } = this.state;
        const { classes } = this.props;

        return (
            <Paper className="list-container">
                <div className="listPanel">
                    <Table className={classes.table}>
                        <ListHeader />
                        <TableBody>
                            {fileList &&
                                fileList.map(row => {
                                    return (
                                        <TableRow key={row.id}>
                                            <TableCell component="th" scope="row" className="filenameCell">
                                                {row.fileName}
                                            </TableCell>
                                            <TableCell className="uploadtimeCell">
                                                {DateUtility(row.creationTime)}
                                            </TableCell>
                                            <TableCell className="modifiedtimeCell">
                                                {DateUtility(row.lastModiedTime)}
                                            </TableCell>
                                            <TableCell className="statusCell">{row.fileStatus}</TableCell>
                                            <TableCell className="remarksCell">{row.remarks}</TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                    {!isLoading ? (
                        <div className="progress-panel">
                            <CircularProgress color="secondary" />
                        </div>
                    ) : fileList && fileList.length > 0 ? null : (
                        <div className="progress-panel">
                            <Typography variant="caption" gutterBottom align="center">
                                No data to display.
                            </Typography>
                        </div>
                    )}
                </div>
                <TablePagination
                    component="div"
                    count={totalItems}
                    rowsPerPage={rowsPerPage}
                    page={page - 1}
                    rowsPerPageOptions={pageSize}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
            </Paper>
        );
    }
}

const mapStateToProps = (state, ownedProps) => {
    return state[REDUCER_NAME] || {};
};

const mapDispatchToProps = dispatch => {
    return {
        getFileHistory: param => {
            dispatch(getFileHistory(param));
        }
    };
};

Filelist.propTypes = {
    classes: PropTypes.object
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(Filelist));
