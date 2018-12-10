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
 * Created by Krishalee on 03/12/2018
 */
import React from "react";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { withStyles } from "@material-ui/core/styles";
import "../styles/style.less";

const styles = Theme => ({
    root: {
        position: "sticky",
        top: 0,
        background: Theme.palette.background.paper,
        zIndex: 1
    }
});

class ListHeader extends React.Component {
    render() {
        return (
            <TableHead className="list-header">
                <TableRow className="listheader-row">
                    <TableCell className="filenameCell">File Name</TableCell>
                    <TableCell className="uploadtimeCell">Upload Time</TableCell>
                    <TableCell className="modifiedtimeCell">Last Modified Time</TableCell>
                    <TableCell className="statusCell">Status</TableCell>
                    <TableCell className="remarksCell">Remarks</TableCell>
                </TableRow>
            </TableHead>
        );
    }
}

export default withStyles(styles)(ListHeader);
