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
 * Created by xulu on 25/05/2018.
 */
import React from "react";
import PropTypes from "prop-types";
import "../styles/style.less";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { connect } from "react-redux";

class CommonListBody extends React.Component {
    render() {
        const { datas, defaultColumns } = this.props;
        return (
            <TableBody className="topology-list-body" style={{ height: "calc(100% - 56px)", overflowY: "auto" }}>
                {datas &&
                    datas.map(topoData => {
                        return (
                            <TableRow hover tabIndex={-1} key={topoData.key}>
                                {defaultColumns.map(column => {
                                    return (
                                        <TableCell title={topoData[column.label]} key={column.label}>
                                            {topoData[column.label]}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        );
                    })}
            </TableBody>
        );
    }
}

CommonListBody.propTypes = {
    datas: PropTypes.array.isRequired,
    defaultColumns: PropTypes.array.isRequired
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(
    null,
    mapDispatchToProps
)(CommonListBody);
