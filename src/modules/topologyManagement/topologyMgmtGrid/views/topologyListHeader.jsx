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
 * Created by xulu on 20/05/2018.
 */
import React, { Component } from "react";
import "../styles/style.less";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import PropTypes from "prop-types";
import Checkbox from "@material-ui/core/Checkbox";
import { connect } from "react-redux";
import { columnSortChanged } from "../funcs/actions";
import { reducerName as topoReducerName } from "modules/topologyManagement/topologyMgmtGrid";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";

const styles = Theme => ({
    head: {
        position: "sticky",
        top: 0,
        background: Theme.palette.background.paper,
        zIndex: 1
    },
    selectHead: {
        top: "64px"
    }
});

class TopoEnhancedTableHead extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clearAllColumns: false
        };
    }

    componentWillReceiveProps(nextProps) {
        let defaultColumns = nextProps.defaultColumns;
        if (!defaultColumns.length) {
            this.setState({ clearAllColumns: true });
        } else {
            this.setState({ clearAllColumns: false });
        }
    }
    createSortHandler(column) {
        if (column.id !== this.props.orderBy) {
            this.props.columnSortChanged(this.props.identify, column.id, column.label, this.props.orderDirection);
        } else {
            let orderDirection = "";
            if (this.props.orderDirection === "asc") {
                orderDirection = "desc";
            } else {
                orderDirection = "asc";
            }
            this.props.columnSortChanged(this.props.identify, column.id, column.label, orderDirection);
        }
    }

    render() {
        const {
            onSelectAllClick,
            numSelected,
            rowCount,
            multipleSelect,
            orderDisplayName,
            orderDirection,
            classes,
            pagination,
            checkAll
        } = this.props;
        const { clearAllColumns } = this.state;
        return (
            <TableHead>
                <TableRow>
                    {clearAllColumns || !multipleSelect ? null : (
                        <TableCell
                            padding="checkbox"
                            className={classNames(classes.head, { [classes.selectHead]: numSelected })}
                        >
                            <Checkbox
                                indeterminate={numSelected > 0 && numSelected < rowCount}
                                checked={checkAll[pagination.currentpage - 1]}
                                onChange={onSelectAllClick}
                            />
                        </TableCell>
                    )}

                    {this.props.defaultColumns &&
                        this.props.defaultColumns.map(column => {
                            return column.sort === false ? (
                                <TableCell
                                    key={column.id}
                                    className={classNames(classes.head, { [classes.selectHead]: numSelected })}
                                >
                                    {column.label}
                                </TableCell>
                            ) : (
                                <TableCell
                                    key={column.id}
                                    className={classNames(classes.head, { [classes.selectHead]: numSelected })}
                                >
                                    <TableSortLabel
                                        active={orderDisplayName === column.label}
                                        direction={orderDirection}
                                        onClick={this.createSortHandler.bind(this, column)}
                                    >
                                        {column.label}
                                    </TableSortLabel>
                                </TableCell>
                            );
                        }, this)}
                </TableRow>
            </TableHead>
        );
    }
}

TopoEnhancedTableHead.defaultProps = {
    // orderBy: "physical.name",
    // orderDirection: "asc"
};

TopoEnhancedTableHead.propTypes = {
    columnConfig: PropTypes.array
};

const filterProps = (state, identify, reducerName, props) => {
    if (state[reducerName] && state[reducerName][identify]) {
        return state[reducerName][identify][props];
    }
};

const mapStateToProps = (state, ownProps) => {
    let identify = ownProps.identify;
    return {
        orderBy: filterProps(state, identify, topoReducerName, "orderBy"),
        orderDirection: filterProps(state, identify, topoReducerName, "orderDirection"),
        orderDisplayName: filterProps(state, identify, topoReducerName, "orderDisplayName")
    };
};

const mapDispatchToProps = dispatch => {
    return {
        columnSortChanged: (identify, orderBy, orderDisplayName, orderDirection) => {
            dispatch(columnSortChanged(identify, orderBy, orderDisplayName, orderDirection));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(TopoEnhancedTableHead));
