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
 * Created by SongCheng on 20/05/2018.
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import "../styles/style.less";

import { connect } from "react-redux";
import { REDUCER_NAME } from "../funcs/constants";

import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/Card";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import { TableRow } from "modules/common";
import EnhancedTableHead from "./tableHead";
import CircularProgress from "@material-ui/core/CircularProgress";

class EventCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...this.props.preState
        };
    }

    componentDidMount() {
        this.props.handleStreamRequest();
    }

    //handle item click
    handleClick = (event, id) => {
        let arr = [];
        arr.push(id);
        this.setState({
            selected: arr
        });
        this.props.DrawerToggle(true, "right", id, arr);
    };
    isSelected = id => this.props.preState.isActive.indexOf(id) !== -1;

    render() {
        const { identify } = this.props;
        const identifyData = this.props[identify];
        const { streamingData, order, orderBy, columns, loading2 } = this.props.preState;
        const columnConfig = identifyData && identifyData.columnConfig;

        return (
            <CardContent className="eventTable">
                <div className="tableBox cardBox">
                    {columns && columns.length ? (
                        <Table>
                            <EnhancedTableHead
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={this.handleSelectAllClick}
                                onRequestSort={this.handleRequestSort}
                                rowCount={streamingData && streamingData.length}
                                columns={columnConfig}
                                isSort={false}
                            />
                            <TableBody className="eventList">
                                {streamingData &&
                                    streamingData.map(n => {
                                        const isSelected = this.isSelected(n.id);
                                        return (
                                            <TableRow
                                                hover
                                                onClick={event => this.handleClick(event, n.id)}
                                                aria-checked={isSelected}
                                                tabIndex={-1}
                                                key={n.id}
                                                selected={isSelected}
                                            >
                                                {columnConfig &&
                                                    columnConfig.map(item => {
                                                        return item.defaultSelect ? (
                                                            <TableCell
                                                                title={n[item.key] ? n[item.key] : "unknown"}
                                                                className={item.key}
                                                                key={item.key}
                                                            >
                                                                {item.key === "severity" ? (
                                                                    <i className={"s" + n["severityNum"]} />
                                                                ) : (
                                                                    n[item.key]
                                                                )}
                                                            </TableCell>
                                                        ) : null;
                                                    })}
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                    ) : (
                        <div className="progressBox">
                            <Typography variant="caption" gutterBottom align="center">
                                No Columns Selected...
                            </Typography>
                        </div>
                    )}

                    {!loading2 ? (
                        <div className="progressBox">
                            <CircularProgress color="secondary" />
                        </div>
                    ) : streamingData && streamingData.length > 0 ? null : (
                        <div className="noData">
                            <Typography variant="caption" gutterBottom align="center">
                                No data to display...
                            </Typography>
                        </div>
                    )}
                </div>
            </CardContent>
        );
    }
}

EventCard.propTypes = {
    pageNo: PropTypes.number.isRequired,
    pageLimit: PropTypes.number.isRequired
};

EventCard.defaultProps = {
    pageNo: 0,
    pageLimit: 10
};

const mapStateToProps = (state, ownProps) => {
    return state[REDUCER_NAME] || {};
};

export default connect(
    mapStateToProps,
    null
)(EventCard);
