import React, { Component } from "react";
// import { connect } from "react-redux";
// import PropTypes from "prop-types";
// import { getServiceListRequest } from "../funcs/actions";
import { showList } from "../funcs/constants";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableFooter from "@material-ui/core/TableFooter";
import { TablePagination } from "modules/common";
// import TablePagination from "@material-ui/core/TablePagination";
import _ from "lodash";

import "../styles/style.less";

class ServiceTable extends Component {
    constructor(props){
        super(props);
        this.handleRowClick = this.handleRowClick.bind(this);
    }
    static defaultProps = {
        data: []
    };
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
    handleRowClick(event, data) {
        let { onPropertyChange, identify } = this.props;
        if(onPropertyChange){
            onPropertyChange(identify,"serviceDetail",data.configvals);
            onPropertyChange(identify, "showDetail", true);
        }
    }
    render() {
        const { rowsPerPage, page } = this.state;
        let { serviceList } = this.props;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, serviceList.length - page * rowsPerPage);
        return (
            <div className="KpiQuery-all">
                <Paper>
                    <Table>
                        <TableHead>
                            <TableRow>{_.map(showList, (item, i) => <TableCell key={i}>{item}</TableCell>)}</TableRow>
                        </TableHead>
                        <TableBody>
                            {_.map(serviceList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage), (n, i) => {
                                return (
                                    <TableRow
                                        key={i}
                                        onClick={e => {
                                            this.handleRowClick(e, n);
                                        }}
                                    >
                                        {_.map(showList, (item, index) => <TableCell key={index}>{n[item]}</TableCell>)}
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
                                    colSpan={showList.length}
                                    count={serviceList.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onChangePage={this.handleChangePage}
                                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </Paper>
            </div>
        );
    }
}

export default ServiceTable;
