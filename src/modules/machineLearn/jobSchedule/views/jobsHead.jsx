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
import TableSortLabel from "@material-ui/core/TableSortLabel";
import TableHead from "@material-ui/core/TableHead";
import Checkbox from "@material-ui/core/Checkbox";
import TableCell from "@material-ui/core/TableCell";
import Tooltip from "@material-ui/core/Tooltip";
import TableRow from "@material-ui/core/TableRow";

const styles = Theme => ({
    head: {
        position: "sticky",
        top: 0,
        background: Theme.palette.background.paper,
        zIndex: 1
    },
    selectHead: {
        top: 0
    }
});

class JobsHead extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };

    render() {
        const { onSelectAllClick, order, orderBy, numSelected, rowCount, columns, classes } = this.props;
        //const { classes, order, orderBy, columns } = this.props;
        return (
            <TableHead>
                <TableRow>
                    <TableCell
                        padding="checkbox"
                        className={classNames(classes.head, { [classes.selectHead]: numSelected })}
                    >
                        <Checkbox
                            indeterminate={numSelected > 0 && numSelected < rowCount}
                            checked={numSelected === rowCount}
                            onChange={onSelectAllClick}
                        />
                    </TableCell>
                    {columns &&
                        columns.map(column => {
                            return column.defaultSelect ? (
                                column.isSort ? (
                                    <TableCell
                                        key={column.key}
                                        //className={classNames(column.key, classes.head)}
                                        sortDirection={orderBy === column.key ? order : false}
                                        className={classNames(classes.head, { [classes.selectHead]: numSelected })}
                                    >
                                        <Tooltip title={column.title} enterDelay={300}>
                                            <TableSortLabel
                                                active={orderBy === column.key}
                                                direction={order}
                                                onClick={this.createSortHandler(column.key)}
                                            >
                                                {column.title}
                                            </TableSortLabel>
                                        </Tooltip>
                                    </TableCell>
                                ) : (
                                    <TableCell
                                        key={column.key}
                                        //className={classNames(column.key, classes.head)}
                                        className={classNames(classes.head, { [classes.selectHead]: numSelected })}
                                    >
                                        {column.title}
                                    </TableCell>
                                )
                            ) : null;
                        }, this)}
                </TableRow>
            </TableHead>
        );
    }
}

JobsHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired
};

export default withStyles(styles)(JobsHead);
