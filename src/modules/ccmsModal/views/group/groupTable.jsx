import { Icon, IconButton, Table, TableBody, TableCell, TableFooter, TableHead, TableRow, TableSortLabel } from "@material-ui/core";
import _ from "lodash";
import { TablePagination } from "modules/common";
import moment from "moment";
import PropTypes from "prop-types";
import React from "react";

const TABLE_HEAD = [
    {
        text: "Groups",
        order: true,
        id: "id"
    },
    {
        text: "Date Created",
        order: true,
        id: "createDt"
    },
    {
        text: "No. of Dashboard",
        order: true,
        id: "page"
    },
    {
        text: "Actions",
        order: false,
        id: "actions"
    }
];
const EMPTY_MESSAGE = "No data display";
const ROWS_PER_PAGE_OPTIONS = [5];
const TEXT_COUNT = "20";

const defaultProps = {
    page: 1,
    count: 5,
    groups: [],
    rowsPerpage: 0,
    onSearchChange: () => {}
};

const propTypes = {
    groups: PropTypes.array
};

const emptyArray = length => {
    let empty = [];
    for (let i = 0; i < length; i++) {
        empty[i] = "";
    }
    return empty;
};

const sliceString = (str, length) => {
    if (_.isString(str) && str.length > length) return String(str).slice(0, length) + "...";
    return str;
};

function formatDate(d) {
    moment(d)
        .toString()
        .match(/\s([a-zA-Z]+)\s(\d+)\s(\d+)/g);
    return [RegExp.$2, RegExp.$1, RegExp.$3].join("-");
}

class GroupTable extends React.Component {
    state = {};
    handleChangePage = (event, page) => {
        this.props.onSearchChange({
            id: "page",
            count: page
        });
    };
    handleChangeRowsPerPage = (event, rowsPerPage) => {
        this.props.onSearchChange({
            id: "rowsPerPage",
            count: rowsPerPage
        });
    };
    render = () => {
        // const { orderBy, order } = this.state;
        const { count, rowsPerPage, page, groups, orderBy, order } = this.props;
        const tableDatas = groups.map(g => {
            const { id, createDt, page, desc, seqId } = g;
            return {
                id,
                desc,
                seqId,
                createDt: formatDate(createDt),
                page: page.length,
                pages: page,
                actions: [
                    {
                        id: "delete",
                        icon: "delete"
                    },
                    {
                        id: "edit",
                        icon: "edit_icon"
                    }
                ]
            };
        });

        return (
            <Table>
                <TableHead>
                    <TableRow>
                        {TABLE_HEAD.map(head => {
                            return (
                                <TableCell
                                    padding="dense"
                                    sortDirection={orderBy === head.id && head.order ? order : false}
                                    key={head.id}
                                >
                                    {head.order ? (
                                        <TableSortLabel
                                            active={orderBy === head.id}
                                            direction={order}
                                            onClick={this.props.sortHandler(head.id)}
                                        >
                                            {head.text}
                                        </TableSortLabel>
                                    ) : (
                                        head.text
                                    )}
                                </TableCell>
                            );
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tableDatas.map(t => {
                        return (
                            <TableRow hover key={t.id}>
                                {TABLE_HEAD.map(j => {
                                    let key = j.id;
                                    if (key === "actions")
                                        return (
                                            <TableCell key={key} padding="dense" sortDirection="desc">
                                                <div
                                                    style={{
                                                        display: "flex"
                                                    }}
                                                >
                                                    {t[key].map(a => {
                                                        return (
                                                            <IconButton key={a.id} onClick={this.props.onActions(a, t)}>
                                                                <Icon>{a.icon}</Icon>
                                                            </IconButton>
                                                        );
                                                    })}
                                                </div>
                                            </TableCell>
                                        );
                                    return (
                                        <TableCell key={key} padding="dense" title={t[key]}>
                                            {sliceString(t[key], TEXT_COUNT)}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        );
                    })}
                    {tableDatas.length === 0 &&
                        emptyArray(5).map((v, i) => {
                            if (i === 0)
                                return (
                                    <TableRow key={i}>
                                        <TableCell
                                            colSpan={TABLE_HEAD.length}
                                            style={{
                                                textAlign: "center"
                                            }}
                                        >
                                            {EMPTY_MESSAGE}
                                        </TableCell>
                                    </TableRow>
                                );
                            return <TableRow key={i} />;
                        })}
                    {tableDatas.length !== 0 && tableDatas.length < rowsPerPage
                        ? emptyArray(rowsPerPage - tableDatas.length).map((v, i) => {
                            return <TableRow key={i} />;
                        })
                        : null}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            page={page}
                            count={count}
                            rowsPerPage={rowsPerPage}
                            colSpan={TABLE_HEAD.length || 0}
                            onChangePage={this.handleChangePage}
                            rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
                            onChangeRowsPerPage={this.handleChangeRowsPerPage}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        );
    };
}

GroupTable.defaultProps = defaultProps;
GroupTable.propTypes = propTypes;

export default GroupTable;
