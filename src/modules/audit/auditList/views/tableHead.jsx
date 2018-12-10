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
 * Created by SongCheng on 31/08/2018.
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import "../styles/style.less";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Tooltip from "@material-ui/core/Tooltip";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";

const styles = Theme => ({
    head: {
        position: "sticky",
        top: 0,
        background: Theme.palette.background.paper
    }
});

class EnhancedTableHead extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };

    render() {
        const { order, orderBy, classes } = this.props;
        return (
            <TableHead>
                <TableRow>
                    {this.props.columns &&
                        this.props.columns.map(column => {
                            return column.defaultSelect ? (
                                <TableCell
                                    key={column.key}
                                    className={classNames(column.key, classes.head)}
                                    sortDirection={orderBy === column.key ? order : false}
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
                            ) : null;
                        }, this)}
                </TableRow>
            </TableHead>
        );
    }
}

EnhancedTableHead.propTypes = {
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired
};

export default withStyles(styles)(EnhancedTableHead);
