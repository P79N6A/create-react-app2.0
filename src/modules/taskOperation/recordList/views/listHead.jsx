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
 * Created by Chen Ling on 18/10/2018.
 */
import React, { Component } from "react";
import "../styles/recordList.less";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import PropTypes from "prop-types";
// import Checkbox from "@material-ui/core/Checkbox";
import Tooltip from "@material-ui/core/Tooltip";
// import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { I18n } from "react-i18nify";
// import { columnSortChanged } from "../funcs/actions";
// import {REDUCER_NAME as sopListReducer} from "../funcs/constants";
const styles = Theme => ({
    root: {
        heigth:" 48px !import",
    },
    title: {
        heigth:" 48px !import",
    },
    row:{
        heigth:" 48px",
    },
    tableHead: {
        // position: "sticky",
        // top: 0,
        // zIndex: 999,
        heigth:" 48px",
        background: Theme.palette.background.paper
    },
});
class RecordListTableHead extends Component {
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
    // createSortHandler = property => event => {
    //     this.props.onRequestSort(event, property);
    // };
    render() {
        const { orderDirection, columnData, orderDisplayName, width, classes} = this.props;
        // console.log(this.props);
        return (
            <TableHead className={classes.title}>
                <TableRow className={classes.row}>
                    {columnData.map(column => {
                        // if(column.show && column.indexKey!=="multipleSelect" && column.label!=="Action"){
                        return (
                            <TableCell
                                className={classes.tableHead}
                                style={{ width: width }}
                                key={I18n.t(`workflow.recordList.${column.label}`)}
                                // {column.indexKey}
                                // numeric={column.numeric}
                                // padding="default"
                                // sortDirection={orderDisplayName === column.label ? orderDirection : false}
                            >   
                                <Tooltip
                                    title={I18n.t(`sop.common.${column.label}`)}
                                    // {column.label}
                                    
                                    placement={column.numeric ? "bottom-end" : "bottom-start"}
                                    enterDelay={300}
                                >
                                    <TableSortLabel
                                        // active={orderDisplayName === column.label}
                                        direction={orderDirection}
                                        // onClick={this.createSortHandler(column.label)}
                                    >
                                        {I18n.t(`sop.common.${column.label}`)}
                                        {/* {column.label} */}
                                    </TableSortLabel>
                                </Tooltip>

                            </TableCell>
                        );
                        // }
                        // else{
                        //     return null;
                        // }
                    }, this)}
                </TableRow>
            </TableHead>
        );
    }
}

RecordListTableHead.defaultProps = {
};
RecordListTableHead.propTypes = {
    columnData: PropTypes.array,
    onSelectAllClick: PropTypes.func,
};

export default withStyles(styles)(RecordListTableHead);
// export default SopListTableHead;
