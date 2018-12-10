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
import { connect } from "react-redux";
import { REDUCER_NAME as topoFloatTabReducer } from "../funcs/constants";

class CommonTableHead extends Component {
    createSortHandler(column) {
        let orderDisplayName =
            this.props.searchType === "alarm" ? this.props.alarmOrderDisplayName : this.props.eventOrderDisplayName;
        let orderDirection =
            this.props.searchType === "alarm" ? this.props.alarmOrderDirection : this.props.eventOrderDirection;
        if (column.label !== orderDisplayName) {
            this.props.sortDataFunc(column.sort, column.label, orderDirection);
        } else {
            let direction = "";
            if (orderDirection === "asc") {
                direction = "desc";
            } else {
                direction = "asc";
            }
            this.props.sortDataFunc(column.sort, column.label, direction);
        }
    }

    render() {
        const {
            searchType,
            alarmOrderDirection,
            eventOrderDirection,
            alarmOrderDisplayName,
            eventOrderDisplayName
        } = this.props;
        const orderDisplayName = searchType === "alarm" ? alarmOrderDisplayName : eventOrderDisplayName;
        const orderDirection = searchType === "alarm" ? alarmOrderDirection : eventOrderDirection;
        return (
            <TableHead>
                <TableRow>
                    {this.props.defaultColumns &&
                        this.props.defaultColumns.map(column => {
                            return (
                                <TableCell key={column.id}>
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

CommonTableHead.propTypes = {
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
        alarmOrderDirection: filterProps(state, identify, topoFloatTabReducer, "alarmOrderDirection"),
        eventOrderDirection: filterProps(state, identify, topoFloatTabReducer, "eventOrderDirection"),
        alarmOrderDisplayName: filterProps(state, identify, topoFloatTabReducer, "alarmOrderDisplayName"),
        eventOrderDisplayName: filterProps(state, identify, topoFloatTabReducer, "eventOrderDisplayName")
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // columnSortChanged: (identify, orderBy, orderDisplayName, orderDirection) => {
        //     dispatch(columnSortChanged(identify, orderBy, orderDisplayName, orderDirection));
        // }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CommonTableHead);
