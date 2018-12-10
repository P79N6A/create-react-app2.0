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
//import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import { Icon } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

import { setOpenDrawer, setOpenDialog, setModelInfo, setCommonDisplayInfo } from "../../funcs/actions";
import { REDUCER_NAME } from "../../funcs/constants";
import ComputeDialog from "./computeDialog";
import ModelsDialog from "./modelsDialog";
import ImagesDialog from "./imagesDialog";
import DeploymentDialog from "./deploymentDialog";
import ActivitiesDialog from "./activitiesDialog";
import CommonDrawer from "./commonDrawer";
import CommonTableHead from "./commonTableHead";
import CommonTableToolbar from "./commonTableToobar";
import CommonSelectAll from "./commonSelectAll";
import CommonTablePagination from "./commonTablePagination";

const listHeight = 100;
const listTable = 312;

const styles = {
    table: {
        minWidth: 1200
    },
    selectCheckbox: {
        //Style height after checkbox is selected
        height: `calc(${listHeight}% - ${listTable}px) !important`
    }
};

class CommonTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
            currentCheck: [],
            order: this.props.pagination.order,
            orderBy: this.props.pagination.orderBy,
            selected: [],
            refreshSuccess: this.props.refreshSuccess,
            commonEditId: ""
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
        if (
            nextProps.data &&
            nextProps.data.length &&
            nextProps.pagination &&
            nextProps.pagination.page !== "undefined" &&
            nextProps.pagination.rowsPerpage !== "undefined" &&
            nextProps.pagination.orderBy !== "undefined" &&
            nextProps.pagination.order !== "undefined"
        ) {
            this.setState({
                data: nextProps.data,
                pagination: nextProps.pagination
            });
        }
    }

    componentWillUpdate(nextProps) {
        if (nextProps.refreshSuccess !== this.props.refreshSuccess) {
            this.setState({
                refreshSuccess: nextProps.refreshSuccess
            });
        }
    }

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = "desc";

        if (this.state.orderBy === property && this.state.order === "desc") {
            order = "asc";
        }

        this.setState(
            Object.assign(this.state, {
                order,
                orderBy
            })
        );

        this.props.handleRequestCommonSort(orderBy, order);
    };

    handleSelectAllClick = event => {
        let modeleId = this.props.identify + "Id";
        if (event.target.checked) {
            this.setState(state => ({ selected: state.data.map(n => n[modeleId]) }));
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
        this.props.onSetCommonDisplayInfo(id);
        this.props.onSetOpenDrawer(true);
    };

    handleClearSelect = () => {
        this.setState({
            selected: []
        });
    };

    handleClearData = () => {
        this.setState({
            selected: [],
            data: [],
            refreshSuccess: false
        });
        this.props.handleClearData();
    };

    handleCommonEdit = (event, id) => {
        event.preventDefault();
        event.stopPropagation();
        this.setState({
            commonEditId: id
        });
        this.props.onSetModelInfo(id);
        this.props.onSetOpenDialog(true);
    };

    onClickAddButton = () => {
        this.setState({
            commonEditId: ""
        });
    };

    render() {
        const { classes, columnConfig, pagination, identify, modelIdInfo, ...other } = this.props;
        const { currentCheck, order, orderBy, selected, data, refreshSuccess, commonEditId } = this.state;
        const emptyRows = pagination.rowsPerpage - Math.min(pagination.rowsPerpage, data.length);
        return (
            <div className="table-root">
                <CommonTableToolbar
                    {...other}
                    currentCheck={currentCheck}
                    columnConfig={columnConfig}
                    handleSelectColumns={this.handleSelectColumns.bind(this)}
                    handleClearData={this.handleClearData}
                    onClickAddButton={this.onClickAddButton.bind(this)}
                />
                {identify === "compute" ? (
                    <ComputeDialog />
                ) : identify === "model" ? (
                    <ModelsDialog identify={identify} modelIdInfo={modelIdInfo} commonEditId={commonEditId} />
                ) : identify === "images" ? (
                    <ImagesDialog />
                ) : identify === "deployments" ? (
                    <DeploymentDialog />
                ) : identify === "activities" ? (
                    <ActivitiesDialog />
                ) : null}

                <CommonDrawer identify={identify} />

                {selected.length > 0 ? (
                    <CommonSelectAll
                        {...other}
                        identify={identify}
                        handleClearSelect={this.handleClearSelect}
                        handleClearData={this.handleClearData}
                        selected={selected}
                        numSelected={selected.length}
                    />
                ) : null}

                <div className={classNames("table-wrap", { [classes.selectCheckbox]: selected.length })}>
                    {currentCheck && currentCheck.length > 0 ? (
                        <Table className={classes.table} aria-labelledby="tableTitle">
                            <CommonTableHead
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={this.handleSelectAllClick}
                                onRequestSort={this.handleRequestSort}
                                rowCount={data && data.length}
                                columns={columnConfig}
                            />
                            <TableBody>
                                {data.map(items => {
                                    let modeleId = this.props.identify + "Id";
                                    const isSelected = this.isSelected(items[modeleId]);
                                    return (
                                        <TableRow
                                            hover
                                            key={items[modeleId]}
                                            onClick={event => this.handleTableRowClick(event, items[modeleId])}
                                            tabIndex={-1}
                                            selected={isSelected}
                                        >
                                            {currentCheck.length > 0 ? (
                                                <TableCell padding="checkbox">
                                                    <Checkbox
                                                        checked={isSelected}
                                                        onClick={event =>
                                                            this.handleClickCheckbox(event, items[modeleId])
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
                                                            {action && (
                                                                <IconButton
                                                                    onClick={event =>
                                                                        this.handleCommonEdit(event, items[modeleId])
                                                                    }
                                                                >
                                                                    <Icon>edit</Icon>
                                                                </IconButton>
                                                            )}

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

                    {!refreshSuccess ? (
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
                {pagination ? (
                    <CommonTablePagination
                        identify={this.props.identify}
                        pagination={pagination}
                        searchMachineFunc={this.props.searchMachineFunc}
                    />
                ) : null}
            </div>
        );
    }
}

CommonTable.propTypes = {
    classes: PropTypes.object.isRequired
};

CommonTable.defaultProps = {
    refreshSuccess: false,
    modelIdInfo: {}
};

const mapStateToProps = (state, ownProps) => {
    if (state[REDUCER_NAME] && state[REDUCER_NAME].model) {
        return {
            refreshSuccess: state[REDUCER_NAME].refreshSuccess || false,
            modelIdInfo: state[REDUCER_NAME].model.modelIdInfo || {}
        };
    }
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onSetOpenDrawer: open => {
            dispatch(setOpenDrawer(open, props.identify));
        },
        onSetOpenDialog: open => {
            dispatch(setOpenDialog(open, props.identify));
        },
        onSetModelInfo: modelId => {
            dispatch(setModelInfo(modelId, props.identify));
        },
        onSetCommonDisplayInfo: commonId => {
            dispatch(setCommonDisplayInfo(commonId, props.identify));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(CommonTable));
