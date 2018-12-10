import React from "react";
import { TableBody, TableRow, TableHead, Icon, Table, TableSortLabel, IconButton } from "@material-ui/core";
import { TableCell } from "../../../common/index";
import { TablePagination } from "../../../common/index";
import { columnData } from "../../funcs/constants";
import moment from "moment";
// import SimpleDialog from "./simpleDialog";

function formatDate(d) {
    moment(d)
        .toString()
        .match(/\s([a-zA-Z]+)\s(\d+)\s(\d+)/g);
    return [RegExp.$2, RegExp.$1, RegExp.$3].join("-");
}

/**
 * Call server API based on HTTP DELETE
 * @example
 *  <TableBodyContent
        tableData={[1, 2, 3, 4]}
        handleClick={this.handleClick}
        classes={classes}
    />
 *
 * @param {array} tableData
 * @param {function} handleClick
 * @param {oject} classes
 * @returns Component
 */
const TableBodyContent = function({ tableData, deleteHandle, editHandle, status, radioChange, handleClick, classes }) {
    return tableData.length ? (
        tableData.map((item, i) => {
            let date = formatDate(item.createDt);
            return (
                <TableRow
                    hover
                    onClick={event => handleClick(event, i)}
                    // role="checkbox"
                    tabIndex={-1}
                    key={i}
                >
                    <TableCell title={item.id} classes={{ root: classes.tableFirstCellRoot }}>
                        {item.id}
                    </TableCell>
                    <TableCell title={date} classes={{ root: classes.tableCellRoot }}>
                        {date}
                    </TableCell>
                    <TableCell title={item.page.length} classes={{ root: classes.tableCellRoot }}>
                        {item.page.length}
                    </TableCell>
                    <TableCell numeric className={classes.buttonLayout} classes={{ root: classes.tableCellRootLast }}>
                        <IconButton onClick={deleteHandle(item.seqId)}>
                            <Icon>delete</Icon>
                        </IconButton>
                        <IconButton onClick={editHandle(item.id, item.seqId)}>
                            <Icon>edit_icon</Icon>
                        </IconButton>
                    </TableCell>
                </TableRow>
            );
        })
    ) : (
        <TableRow>
            <TableCell classes={{ root: classes.tdCenter }} colSpan={4}>
                No data display
            </TableCell>
        </TableRow>
    );
};

const TableHeads = ({ order, createSortHandler, orderBy, numSelected, rowCount, classes }) => {
    return (
        <TableHead>
            <TableRow>
                {columnData.map((column, index) => {
                    return (
                        <TableCell
                            key={column.id}
                            className={classes.numeric}
                            sortDirection={orderBy === column.id ? order : false}
                        >
                            <TableSortLabel
                                // classes={{icon: orderBy === column.id ? classes.svgBlock : classes.svgNone}}
                                active={orderBy === column.id}
                                direction={order}
                                onClick={createSortHandler(column.id)}
                            >
                                {column.label}
                            </TableSortLabel>
                        </TableCell>
                    );
                }, this)}
                <TableCell style={{ textAlign: "right" }}>Actions</TableCell>
            </TableRow>
        </TableHead>
    );
};

const GroupTable = ({
    classes,
    selected,
    order,
    orderBy,
    groupData,
    status,
    rootData,
    emptyRows,
    rowsPerPage,
    page,
    createSortHandler,
    handleRequestSort,
    radioChange,
    handleClick,
    deleteHandle,
    editHandle,
    handleChangeRowsPerPage,
    handleChangePage
}) => {
    return (
        <React.Fragment>
            <div className={classes.tableWrapper}>
                <Table className={classes.table} aria-labelledby="tableTitle">
                    <TableHeads
                        createSortHandler={createSortHandler}
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                        rowCount={groupData.length}
                        classes={classes}
                    />
                    <TableBody>
                        <TableBodyContent
                            status={status}
                            radioChange={radioChange}
                            tableData={rootData}
                            handleClick={handleClick}
                            classes={classes}
                            deleteHandle={deleteHandle}
                            editHandle={editHandle}
                        />
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 49 * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className={classes.tableFooter}>
                <TablePagination
                    colSpan={3}
                    component="div"
                    count={groupData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                    //   ActionsComponent={TablePaginationActionsWrapped}
                />
            </div>
        </React.Fragment>
    );
};

export default GroupTable;
