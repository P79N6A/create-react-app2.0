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
 * Created by Jia Luo on 27/07/2018.
 */
import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Action as Actions, TableRow } from "./index";
import { TablePagination } from "./index";
import {
    Icon,
    Tooltip,
    Table,
    TableBody,
    TableCell,
    TableHead,
    // TablePagination,
    Typography,
    IconButton,
    Checkbox,
    Paper,
    Toolbar,
    TableSortLabel,
    // TableRow,
    Radio
} from "@material-ui/core";
import { I18n } from "react-i18nify";
import _ from "lodash";

const headerStyles = Theme => ({
    head: {
        position: "sticky",
        top: 0,
        background: Theme.palette.background.paper,
        zIndex: 1
    },
    action: {
        top: 0,
        position: "sticky",
        background: Theme.palette.background.paper,
        zIndex: 1
    }
});

/**
 * the EnhancedTableHead is a tale head component
 * @example
 *
 *
 * @param {func} onSelectAllClick
 * @param {string} order
 * @param {string} orderBy
 * @param {number} numSelected
 * @param {number} rowCount
 * @param {array} columnData
 * @param {boolean} select
 * @param {number} width
 * @param {boolean} action
 * @param {boolean} actionNumeric
 * @returns Component
 */
class EnhancedTableHead extends React.Component {
    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };

    render() {
        const {
            onSelectAllClick,
            order,
            orderBy,
            numSelected,
            rowCount,
            columnData,
            select,
            width,
            action,
            actionNumeric,
            selectType,
            classes
        } = this.props;

        return (
            <TableHead>
                <TableRow>
                    {select && columnData.length ? (
                        <TableCell padding="checkbox" className={classes.head}>
                            {selectType === "radio" ? null : (
                                <Checkbox
                                    indeterminate={numSelected > 0 && numSelected < rowCount}
                                    checked={numSelected === rowCount}
                                    onChange={onSelectAllClick}
                                />
                            )}
                        </TableCell>
                    ) : null}

                    {columnData.map(column => {
                        return (
                            <TableCell
                                // classes={{ body: classes.body }}
                                className={classes.head}
                                style={{ width: width, minWidth: width, maxWidth: "200px" }}
                                key={column.id}
                                numeric={column.numeric}
                                padding={column.disablePadding ? "none" : "default"}
                                sortDirection={orderBy === column.id ? order : "asc"}
                                {...column.property}
                            >
                                {column.orderby === false ? (
                                    <React.Fragment>{column.label}</React.Fragment>
                                ) : (
                                    <TableSortLabel
                                        active={orderBy === column.id}
                                        direction={order}
                                        onClick={this.createSortHandler(column.id)}
                                    >
                                        {column.label}
                                    </TableSortLabel>
                                )}
                            </TableCell>
                        );
                    }, this)}
                    {action && (
                        <TableCell
                            className={classes.action}
                            padding="checkbox"
                            // classes={{ body: classes.body }}
                            // style={{ width: width, minWidth: width, maxWidth: "200px" }}
                            numeric={actionNumeric}
                        >
                            {I18n.t("common.TableActions")}
                        </TableCell>
                    )}
                </TableRow>
            </TableHead>
        );
    }
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired
};

const EnhancedTableHeads = withStyles(headerStyles)(EnhancedTableHead);

const toolbarStyles = theme => ({
    root: {
        paddingRight: theme.spacing.unit,
        backgroundColor: "inherit"
    },
    blankTable: { textAlign: "center", height: "48px" },
    highlight: {
        // color: theme.palette.type === "light" ? theme.palette.secondary.main : theme.palette.text.primary,
        // backgroundColor: theme.palette.background.paper
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.main
    },
    spacer: {
        flex: "1 1 100%"
    },
    actions: {
        color: theme.palette.text.secondary
    },
    title: {
        flex: "0 0 auto"
    },
    headIcon: {
        display: "flex"
    }
});

/**
 * EnhancedTableToolbar component
 * @example
 *
 * @param {number} numSelected
 * @param {func} deleteHandle
 * @param {array} icons
 * @returns Component
 */
let EnhancedTableToolbar = props => {
    const { numSelected, classes, icons, deleteHandle } = props;
    return (
        <Toolbar
            className={classNames(classes.root, {
                [classes.highlight]: numSelected > 0
            })}
        >
            <div className={classes.title}>
                {numSelected > 0 ? (
                    <Typography classes={{ subtitle1: classes.highlight }} variant="subtitle1">
                        {numSelected} {I18n.t("common.Selected")}
                    </Typography>
                ) : (
                    <Typography variant="h6" id="tableTitle">
                        {/* Nutrition */}
                    </Typography>
                )}
            </div>
            <div className={classes.spacer} />
            <div className={classes.actions}>
                {numSelected > 0 ? (
                    <IconButton title="delete" aria-label="Delete" onClick={deleteHandle}>
                        <Icon>delete</Icon>
                    </IconButton>
                ) : (
                    <Actions classes={classes} icons={icons} />
                )}
            </div>
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = theme => ({
    root: {
        height: "100%",
        width: "100%"
        // marginTop: theme.spacing.unit * 3
    },
    table: {
        // minWidth: 1020
    },
    tableWrapper: {
        overflowX: "hidden",
        height: "calc(100% - 56px)",
        overflowY: "auto"
    },
    blankTable: { textAlign: "center", height: "48px" },
    body: {
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        overflow: "hidden"
    }
});

/**
 * table combine component
 * @example
 *
 *
 * @param {func} deleteHandle
 * @param {boolean} select
 * @param {string} selectField
 * @param {array} icons
 * @param {array} columnData
 * @param {array} tableData
 * @param {func} clickRow
 * @param {boolean} action
 * @param {object} actionContent
 * @param {boolean} actionNumeric
 * @returns Component
 */
class EnhancedTable extends React.Component {
    static defaultProps = {
        deleteHandle: () => {},
        columnData: [],
        handleChangeRowsPerPage: () => {},
        handleChangePage: () => {},
        sort: () => {},
        radioHandle: () => {}
    };
    state = {
        radioSelected: "",
        randomId: "",
        selectType: "",
        order: "asc",
        orderBy: "",
        selected: [],
        select: false,
        data: [],
        page: 0,
        rowsPerPage: 20,
        count: 0,
        selectField: "",
        icons: [],
        backendPagination: false
    };

    static defaultProps = {
        clickRow: n => () => {}
    };

    componentDidMount() {
        this.setState({
            randomId: "ID" + +new Date(),
            data: this.props.tableData,
            select: !!this.props.select
        });
    }

    componentWillReceiveProps(nextProps) {
        const { tableData, page, rowsPerPage, count, backendPagination, selectType, radioSelected } = nextProps;
        // let curr = columnData.length ? columnData[0].id : "";
        this.setState({
            radioSelected,
            selectType,
            backendPagination: backendPagination,
            data: tableData,
            select: !!this.props.select,
            selectField: nextProps.selectField || "id",
            icons: nextProps.icons || [],
            // orderBy: orderBy ,
            page: page === 0 || page ? page : this.state.page,
            rowsPerPage: rowsPerPage || this.state.rowsPerPage,
            count: count || tableData.length
        });
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     const { data, orderBy, order, rowsPerPage } = this.state;
    //     if (
    //         _.isEqual(data, nextState.data) &&
    //         _.isEqual(orderBy, nextState.orderBy) &&
    //         _.isEqual(order, nextState.order) &&
    //         _.isEqual(rowsPerPage, nextState.rowsPerPage)
    //     )
    //         return false;
    //     return true;
    // }

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = "desc";

        if (this.state.orderBy === property && this.state.order === "desc") {
            order = "asc";
        }
        this.setState({ order, orderBy }, () => {
            this.props.sort && this.props.sort(order, orderBy);
        });
    };

    handleSelectAllClick = (event, checked) => {
        const { selectField } = this.state;
        if (checked) {
            this.setState(state => ({ selected: state.data.map(n => n[selectField]) }));
            return;
        }
        this.setState({ selected: [] });
    };

    handleClick = (event, id) => {
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

    handleChangePage = (event, page) => {
        // this.setState({ page });
        this.props.handleChangePage && this.props.handleChangePage(page);
        this.setState({
            selected: []
        });
    };

    handleChangeRowsPerPage = event => {
        // this.setState({ rowsPerPage: event.target.value });
        this.props.handleChangeRowsPerPage && this.props.handleChangeRowsPerPage(event.target.value);
        this.setState({
            selected: []
        });
    };
    deleteHandle = e => {
        e.stopPropagation();
        this.props.deleteHandle(this.state.selected);
        this.setState({
            selected: []
        });
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;
    clickRow = (n, i) => e => {
        e.stopPropagation();
        const { selectType, selectField } = this.state;
        if (selectType === "radio") {
            this.setState({
                radioSelected: n[selectField]
            });
            this.props.radioHandle(n[selectField]);
        }
        this.setState({
            highlight: i
        });
        this.props.clickRow(n, i);
    };
    handleChangeRadio = event => {
        this.setState({ radioSelected: event.target.value });
        this.props.radioHandle(event.target.value);
    };
    render() {
        const {
            classes,
            columnData,
            action,
            actionContent,
            actionNumeric,
            toolBar,
            icons = [],
            isPagination = true,
            rowsPerPageOptions = [20, 30, 50]
        } = this.props;
        let {
            order,
            orderBy,
            select,
            data,
            selected,
            rowsPerPage,
            page,
            selectField,
            count,
            backendPagination,
            selectType
        } = this.state;
        const clomuns = columnData.length;
        const width = (1 / clomuns) * 100 + "%";
        const MAX_WIDTH = "100px";
        let currentData = backendPagination
            ? data
            : _.orderBy(data, [orderBy, ...columnData.map(n => n.id)], [order]).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
            );
        // try {
        //     orderBy = orderBy || columnData[0].id;
        // } catch (error) {
        //     orderBy = "";
        // }
        return (
            <Paper className={classes.root}>
                {(select || toolBar) && selected.length ? (
                    <EnhancedTableToolbar
                        numSelected={selected.length}
                        icons={icons}
                        deleteHandle={this.deleteHandle}
                    />
                ) : null}
                <div
                    className={classes.tableWrapper}
                    style={{
                        height: selected.length ? "calc(100% - 120px)" : !isPagination ? "100%" : "calc(100% - 56px)"
                    }}
                >
                    <Table className={classNames(classes.table)} aria-labelledby="tableTitle">
                        <EnhancedTableHeads
                            selectType={selectType}
                            action={action}
                            width={width}
                            select={select}
                            columnData={columnData}
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            selectField={selectField}
                            onSelectAllClick={this.handleSelectAllClick}
                            onRequestSort={this.handleRequestSort}
                            rowCount={data.length}
                            actionNumeric={actionNumeric}
                        />
                        <TableBody>
                            {currentData.length ? (
                                currentData.map((n, i) => {
                                    const isSelected = this.isSelected(n[selectField]);
                                    return (
                                        <TableRow
                                            key={i}
                                            hover
                                            onClick={this.clickRow(n, i)}
                                            role="checkbox"
                                            aria-checked={isSelected}
                                            tabIndex={-1}
                                            selected={i === this.props.highlight}
                                        >
                                            {select && columnData.length ? (
                                                <TableCell key={"select"} padding="checkbox">
                                                    {selectType === "radio" ? (
                                                        <Radio
                                                            checked={this.state.radioSelected === n[selectField]}
                                                            onChange={this.handleChangeRadio}
                                                            value={n[selectField]}
                                                            name="radioSelected"
                                                        />
                                                    ) : (
                                                        <Checkbox
                                                            onClick={event => this.handleClick(event, n[selectField])}
                                                            checked={isSelected}
                                                        />
                                                    )}
                                                </TableCell>
                                            ) : null}

                                            {columnData.map((item, m) => {
                                                return (
                                                    <TableCell
                                                        classes={{ body: classes.body }}
                                                        style={{
                                                            minWidth: width,
                                                            maxWidth: MAX_WIDTH,
                                                            width: width
                                                            // padding: "0px 8px"
                                                        }}
                                                        key={m}
                                                        title={String(n[item.id] === undefined ? "" : n[item.id])}
                                                        numeric={!!item.contentAlign}
                                                        {...item.property}
                                                    >
                                                        {String(n[item.id] === undefined ? "" : n[item.id])}
                                                    </TableCell>
                                                );
                                            })}
                                            {action && (
                                                <TableCell
                                                    classes={{ body: classes.body }}
                                                    padding="checkbox"
                                                    // style={{
                                                    //     minWidth: width,
                                                    //     maxWidth: MAX_WIDTH,
                                                    //     width: width
                                                    // }}
                                                    numeric={actionNumeric}
                                                >
                                                    {actionContent.map((item, index) => {
                                                        const {
                                                            visible = () => {
                                                                return true;
                                                            },
                                                            title = ""
                                                        } = item;
                                                        return (
                                                            <React.Fragment key={index}>
                                                                {visible(n) ? (
                                                                    <Tooltip title={title} enterDelay={300}>
                                                                        <IconButton
                                                                            key={index}
                                                                            onClick={item.func(n, i)}
                                                                        >
                                                                            <Icon>{item.icon}</Icon>
                                                                        </IconButton>
                                                                    </Tooltip>
                                                                ) : null}
                                                            </React.Fragment>
                                                        );
                                                    })}
                                                </TableCell>
                                            )}
                                        </TableRow>
                                    );
                                })
                            ) : (
                                <TableRow style={{ height: 48, textAlign: "center" }}>
                                    <TableCell
                                        className={classes.blankTable}
                                        colSpan={columnData.length + (action ? 1 : 0) + (select ? 1 : 0)}
                                    >
                                        {I18n.t("common.NoColumnsSelected")}
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                {isPagination ? (
                    <TablePagination
                        component="div"
                        count={count}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        rowsPerPageOptions={rowsPerPageOptions}
                        backIconButtonProps={{
                            "aria-label": "Previous Page"
                        }}
                        nextIconButtonProps={{
                            "aria-label": "Next Page"
                        }}
                        onChangePage={this.handleChangePage.bind(this)}
                        onChangeRowsPerPage={this.handleChangeRowsPerPage.bind(this)}
                    />
                ) : null}
            </Paper>
        );
    }
}

EnhancedTable.propTypes = {
    classes: PropTypes.object.isRequired,
    columnData: PropTypes.array.isRequired,
    tableData: PropTypes.array.isRequired,
    select: PropTypes.bool
};

export default withStyles(styles)(EnhancedTable);
