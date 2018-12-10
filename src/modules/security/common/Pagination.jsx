import React from "react";
import { TablePagination } from "./index";
import { TableFooter, TableRow, Table } from "@material-ui/core";
const Pagination = ({
    backend,
    count,
    rowsPerPage,
    page,
    onChangePage,
    onChangeRowsPerPage,
    rowsPerPageOptions,
    ...otherProps
}) => {
    return (
        <Table>
            <TableFooter>
                <TableRow>
                    <TablePagination
                        // colSpan={5}
                        count={count}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={onChangePage}
                        onChangeRowsPerPage={onChangeRowsPerPage}
                        rowsPerPageOptions={rowsPerPageOptions}
                        {...otherProps}
                        // ActionsComponent={TablePaginationActionsWrapped}
                    />
                </TableRow>
            </TableFooter>
        </Table>
    );
};

export default Pagination;
