import React, { Component } from "react";
import { connect } from "react-redux";
// import PropTypes from "prop-types";
import { REDUCER_NAME as reducerName } from "../funcs/constants";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableFooter from "@material-ui/core/TableFooter";
import {TablePagination} from "modules/common";
import _ from "lodash";

import "../styles/style.less";

class Preview extends Component {
    state = {
        page: 0,
        rowsPerPage: 10
    };
    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };
    render() {
        const { rowsPerPage, page } = this.state;
        let { preview, columns } = this.props;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, preview.length - page * rowsPerPage);
        return (
            <div className="kpiQuery-all">
                <Table>
                    <TableHead>
                        <TableRow>{_.map(columns, (item, i) => <TableCell key={i}>{item}</TableCell>)}</TableRow>
                    </TableHead>
                    <TableBody>
                        {_.map(preview.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage), (n, i) => {
                            return (
                                <TableRow key={i}>
                                    {_.map(columns, (item, index) => <TableCell key={index}>{n[item]}</TableCell>)}
                                </TableRow>
                            );
                        })}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 48 * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                colSpan={columns.length}
                                count={preview.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onChangePage={this.handleChangePage}
                                onChangeRowsPerPage={this.handleChangeRowsPerPage}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>
        );
    }
}

//=============================================================================================
const mapStateToProps = (state, ownProps) => {
    let identify = ownProps.identify;
    return {
        preview: (state[reducerName] && state[reducerName][identify] && state[reducerName][identify].preview) || [],
        columns: (state[reducerName] && state[reducerName][identify] && state[reducerName][identify].columns) || []
    };
};

export default connect(mapStateToProps)(Preview);
