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
 * Created by Chen Ling on 19/07/2018.
 */
import React, { Component } from "react";
import "../styles/sop.less";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import PropTypes from "prop-types";
import Checkbox from "@material-ui/core/Checkbox";
import Tooltip from "@material-ui/core/Tooltip";
// import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { I18n } from "react-i18nify";
// import { columnSortChanged } from "../funcs/actions";
// import {REDUCER_NAME as sopListReducer} from "../funcs/constants";
const SopListTableHeadStyles = Theme => ({
    tableHead: {
        position: "sticky",
        top: 0,
        // position: "fixed",
        // position: "absolute",
        zIndex: 999,
        background: Theme.palette.background.paper
    },
});
class SopListTableHead extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         // clearAllColumns: false
    //     };
    // };
    state = {
        // order: "asc",
        // orderBy: "",
        selected: [],
        select: false
    };
    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };
    render() {
        const { onSelectAllClick, orderDirection, columnData, orderDisplayName, width, numSelected, rowCount, classes} = this.props;
        // console.log(this.props);
        return (
            <TableHead>
                <TableRow>
                    {columnData.map(column => {
                        if(column.show && column.indexKey!=="multipleSelect" && column.label!=="Action"){
                            return (
                                <TableCell
                                    className={classes.tableHead}
                                    style={{ width: width }}
                                    key={I18n.t(`sop.common.${column.label}`)}
                                    // {column.indexKey}
                                    numeric={column.numeric}
                                    padding="default"
                                    sortDirection={orderDisplayName === column.label ? orderDirection : false}
                                >   
                                    <Tooltip
                                        title={I18n.t(`sop.common.${column.label}`)}
                                        // {column.label}
                                        
                                        placement={column.numeric ? "bottom-end" : "bottom-start"}
                                        enterDelay={300}
                                    >
                                        <TableSortLabel
                                            active={orderDisplayName === column.label}
                                            direction={orderDirection}
                                            onClick={this.createSortHandler(column.label)}
                                        >
                                            {I18n.t(`sop.common.${column.label}`)}
                                            {/* {column.label} */}
                                        </TableSortLabel>
                                    </Tooltip>

                                </TableCell>
                            );
                        } else if (column.show && column.indexKey ==="multipleSelect"){
                            return (
                                <TableCell
                                    className={classes.tableHead} 
                                    style={{maxWidth: "50px"}}
                                    key={column.indexKey}
                                    padding="checkbox"
                                >
                                    <Checkbox
                                        color="secondary"
                                        indeterminate={numSelected > 0 && numSelected < rowCount}
                                        checked={numSelected === rowCount}
                                        onChange={onSelectAllClick}
                                    />
                                </TableCell>
                            );
                        }else if (column.show && column.indexKey ==="action"){
                            return(
                                <TableCell className={classes.tableHead} style={{ width: width }}
                                    key={column.indexKey}
                                >
                                    {/* {column.label} */}
                                    {I18n.t(`sop.common.${column.label}`)}
                                </TableCell>
                            );
                        }
                        else{
                            return null;
                        }
                    }, this)}
                </TableRow>
            </TableHead>
        );
    }
}

SopListTableHead.defaultProps = {
};
SopListTableHead.propTypes = {
    columnData: PropTypes.array,
    onSelectAllClick: PropTypes.func,
};

export default withStyles(SopListTableHeadStyles)(SopListTableHead);
// export default SopListTableHead;
