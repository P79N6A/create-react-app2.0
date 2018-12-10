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
 * Created by SongCheng on 10/18/2018.
 */
import React, { Component } from "react";
import "../styles/style.less";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { TextField, InputLabel, Select } from "modules/common";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
// import InputAdornment from "@material-ui/core/InputAdornment";
// import SearchIcon from "@material-ui/icons/Search";
import { Typography } from "@material-ui/core";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import LinkIcon from "@material-ui/icons/Link";
// import DescriptionIcon from "@material-ui/icons/Description";
import TablePagination from "@material-ui/core/TablePagination";

class AssociationsSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchVal: "",
            dateStyle: ["minutes", "hours", "days", "months"],
            defaultNum: 7,
            defaultTime: "hours",
            rowsPerPage: 10,
            page: 0,
            count: 0,
            column: [
                {
                    key: "sentdatetime",
                    title: "Send Time"
                },
                {
                    key: "alarmtype",
                    title: "Alarm Type"
                },
                {
                    key: "owner",
                    title: "Owner"
                },
                {
                    key: "state",
                    title: "State"
                },
                {
                    key: "actions",
                    title: "Actions"
                }
            ]
        };
    }
    // handleInputChanged = event => {
    // console.log("val::", event.target.value);
    // };

    //handle duration changed
    handleDurationChanged = event => {
        this.setState(
            Object.assign(this.state, {
                defaultNum: event.target.value
            })
        );
    };

    //handle period changed
    handlePeriodChanged = event => {
        this.setState(
            Object.assign(this.state, {
                defaultTime: event.target.value
            })
        );
    };

    checkTime = () => {
        let paginator = {
            pageno: this.state.page + 1,
            limit: this.state.rowsPerPage
        };

        this.props.associationSearch(
            this.state.defaultNum,
            this.state.defaultTime,
            paginator,
            this.props.applicationid
        );
    };
    associateItem = obj => {
        this.props.associateItem(obj, "associate");
    };

    //handle page
    handleChangePage = (event, page) => {
        let rowsPerPage = this.props.assSearchPagination.limit;
        this.setState({ rowsPerPage: rowsPerPage, page: page }, () => {
            this.checkTime();
        });
    };
    //handle RowsPerPage
    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value, page: 0 }, () => {
            this.checkTime();
        });
    };

    //reset
    reset = () => {
        this.setState(
            {
                defaultNum: 7,
                defaultTime: "hours",
                rowsPerPage: 10,
                page: 0
            },
            () => {
                this.checkTime();
            }
        );
    };

    render() {
        const { assSearchData, assSearchPagination } = this.props;
        const { rowsPerPage, page, count } = this.state;
        return (
            <div style={{ height: "100% " }}>
                <List>
                    {/* <ListItem style={{ padding: 0 }}>
                        <TextField
                            id="input-with-icon-textfield"
                            label="Search Alarm"
                            defaultValue={this.state.searchVal}
                            onChange={this.handleInputChanged.bind(this)}
                            fullWidth
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon color="action" />
                                    </InputAdornment>
                                )
                            }}
                        />
                    </ListItem> */}
                    <ListItem style={{ paddingLeft: 0, paddingRight: 0 }}>
                        <FormControl className="filterItemPer">
                            <InputLabel>Sort by</InputLabel>
                            <Select
                                value="is in last"
                                // onChange={this.handleInputSelectChanged.bind(this, "pageLimit")}
                            >
                                <MenuItem value="is in last">is in last</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl className="filterItemPer">
                            <TextField
                                id="durationTime"
                                label="Duration"
                                defaultValue={this.state.defaultNum}
                                value={this.state.defaultNum}
                                onChange={this.handleDurationChanged.bind(this)}
                            />
                        </FormControl>
                        <FormControl className="filterItemPer">
                            <InputLabel>Period</InputLabel>
                            <Select value={this.state.defaultTime} onChange={this.handlePeriodChanged.bind(this)}>
                                {this.state.dateStyle.map(item => (
                                    <MenuItem key={item} value={item}>
                                        {item}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl className="filterItemBtn">
                            <Button variant="contained" color="secondary" onClick={this.checkTime}>
                                APPLY FILTER
                            </Button>
                            <Button variant="contained" color="secondary" onClick={this.reset}>
                                RESET
                            </Button>
                        </FormControl>
                    </ListItem>
                </List>
                <div className="resultTable">
                    <div className="tableBox">
                        <Table>
                            <TableHead>
                                <TableRow>
                                    {this.state.column.map((item, index) => {
                                        return <TableCell key={index}>{item.title}</TableCell>;
                                    })}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {assSearchData && assSearchData.length > 0
                                    ? assSearchData.map(row => {
                                        return (
                                            <TableRow key={row.id}>
                                                <TableCell className="sentdatetime">{row.sentdatetime}</TableCell>
                                                <TableCell>{row.alarmtype}</TableCell>
                                                <TableCell>{row.owner}</TableCell>
                                                <TableCell>{row.state}</TableCell>
                                                <TableCell className="actions">
                                                    {/* <span className="button" title="Alarm Details">
                                        <DescriptionIcon
                                            fontSize="small"
                                            //   onClick={this.viewAssociation.bind(this, row)}
                                        />
                                    </span> */}
                                                    {row.classKey === 0 && row.state !== "closed" ? (
                                                        <span className="button" title="Alarm Association">
                                                            <LinkIcon
                                                                fontSize="small"
                                                                onClick={this.associateItem.bind(this, row)}
                                                            />
                                                        </span>
                                                    ) : null}
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })
                                    : null}
                            </TableBody>
                        </Table>
                        {assSearchData && assSearchData.length > 0 ? null : (
                            <Typography variant="caption" gutterBottom align="center">
                                No data to display...
                            </Typography>
                        )}
                    </div>

                    <TablePagination
                        component="div"
                        count={(assSearchPagination && assSearchPagination.totalrecords) || count}
                        rowsPerPage={(assSearchPagination && assSearchPagination.limit) || rowsPerPage}
                        page={(assSearchPagination && assSearchPagination.currentpage - 1) || page}
                        onChangePage={this.handleChangePage}
                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    />
                </div>
            </div>
        );
    }
}

export default AssociationsSearch;
