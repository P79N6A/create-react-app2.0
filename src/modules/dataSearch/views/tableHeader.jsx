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
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import { I18n } from "react-i18nify";


const columnData = [
    { id: "name", numeric: false, disablePadding: false, label: I18n.t("dataExport.exportTableHead.taskID") },
    { id: "Submit Time", numeric: true, disablePadding: false, label: I18n.t("dataExport.exportTableHead.submitTime") },
    { id: "Submit By", numeric: true, disablePadding: false, label: I18n.t("dataExport.exportTableHead.submitBy") },
    { id: "Status", numeric: true, disablePadding: false, label: I18n.t("dataExport.exportTableHead.status") },
    { id: "View Result", numeric: true, disablePadding: false, label: I18n.t("dataExport.exportTableHead.viewResult") },
];


const styles = theme => ({ 
    head: {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.background.paper,
        position: "sticky",
        top: 0,
        zIndex: 1
    }
});
  
class EnhancedTableHead extends React.Component {
    render() {
        const { classes } = this.props;

        return (
            <TableHead>
                <TableRow>
                    {columnData.map(column => {
                        return (
                            <TableCell
                                className={classes.head}
                                key={column.id}
                                numeric={column.numeric}
                                padding={column.disablePadding ? "none" : "default"}
                            >
                                {column.label}
                            </TableCell>
                        );
                    }, this)}
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
    rowCount: PropTypes.number.isRequired,
};

export default withStyles(styles)(EnhancedTableHead);

