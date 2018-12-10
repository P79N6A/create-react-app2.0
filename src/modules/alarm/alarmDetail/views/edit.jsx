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
 * Created by SongCheng on 10/26/2018.
 */
import React, { Component } from "react";
import "../styles/style.less";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { TextField, InputLabel, Select } from "modules/common";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Radio from "@material-ui/core/Radio";
import TablePagination from "@material-ui/core/TablePagination";
import { Typography } from "@material-ui/core";
import Store from "commons/store";

class TabFavourite extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dateStyle: ["minutes", "hours", "days", "months"],
            stateType: ["owned", "unowned", "closed"],
            // urgencyType: ["immediate", "expected", "future", "past", "unknown"],
            defaultTime: "hours",
            expanded: false,
            change: {},
            rowsPerPage: 10,
            page: 0,
            count: 0,
            column: [
                {
                    key: "",
                    title: ""
                },
                {
                    key: "userid",
                    title: "User Id"
                },
                {
                    key: "username",
                    title: "Name"
                }
            ]
        };
    }
    componentWillMount = () => {
        let { detail, severityKey } = this.props;
        this.setState(
            {
                id: detail[0]["id"],
                severityValue: detail[0]["severity"],
                severityName: severityKey[detail[0]["severity"]],
                state: detail[0]["state"],
                urgency: detail[0].infos[0]["urgency"],
                owner: !detail[0]["owner"] ? " " : detail[0]["owner"],
                change: {
                    id: detail[0]["id"]
                }
            },
            () => {
                this.props.saveEditData(this.state);
            }
        );
    };

    handlePeriodChanged = (name, event) => {
        let { severityKey, detail } = this.props;
        if ("severityName" === name) {
            let key = this.getKey(severityKey, event.target.value);
            this.setState(
                Object.assign(this.state, {
                    severityValue: key,
                    change: Object.assign(this.state.change, {
                        severityNew: key === detail[0]["severity"] ? null : key,
                        severityNameNew: event.target.value
                    })
                })
            );
        } else if ("urgency" === name) {
            this.setState(
                Object.assign(this.state, {
                    change: Object.assign(this.state.change, {
                        urgencyNew: event.target.value === detail[0].infos[0]["urgency"] ? null : event.target.value
                    })
                })
            );
        } else {
            this.setState(
                Object.assign(this.state, {
                    // [name]: event.target.value,
                    change: Object.assign(this.state.change, {
                        [name + "New"]: event.target.value === detail[0][name] ? null : event.target.value
                    })
                })
            );

            if ("state" === name && this.state.owner === " " && !this.state.change.ownerNew) {
                let ownerNew = Store.getState().identify.userid;
                // console.log("Store.getState().identify:", Store.getState().identify);
                this.setState(
                    Object.assign(this.state, {
                        change: Object.assign(this.state.change, {
                            ownerNew: ownerNew
                        })
                    })
                );
            }
        }
        if ("owner" === name) {
            this.closeView();
        }

        this.props.saveEditData(this.state.change);
    };

    getKey = (severityKey, value) => {
        for (var i in severityKey) {
            if (severityKey[i] === value) {
                return i;
            }
        }
    };
    severityArr = a => {
        let arr = [];
        for (var i in a) {
            arr.push(a[i]);
        }
        return arr;
    };

    //handle page
    handleChangePage = (event, page) => {
        let rowsPerPage = this.state.rowsPerPage;
        this.setState({ rowsPerPage: rowsPerPage, page: page }, () => {
            this.getUserList();
        });
    };
    //handle RowsPerPage
    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value, page: 0 }, () => {
            this.getUserList();
        });
    };
    getUserList = () => {
        this.props.handleUserData(this.state.page + 1, this.state.rowsPerPage);
    };

    openView = () => {
        this.getUserList();
        this.setState({
            expanded: true
        });
    };
    closeView = () => {
        this.setState({
            expanded: false
        });
    };

    render() {
        const { severityKey, userList, userPagination } = this.props;
        // const { severityName, state, urgency, stateType, urgencyType, owner, column } = this.state;
        const { severityName, state, stateType, owner, column, count, rowsPerPage, page } = this.state;
        let { stateNew, ownerNew, severityNameNew } = this.state.change;
        stateNew = stateNew ? stateNew : state;
        ownerNew = ownerNew ? ownerNew : owner;
        severityNameNew = severityNameNew ? severityNameNew : severityName;
        return (
            <div className="edit">
                <List>
                    <ListItem style={{ paddingLeft: 0, paddingRight: 0 }}>
                        <FormControl style={{ width: "100%" }}>
                            <InputLabel>State</InputLabel>
                            <Select value={stateNew} onChange={this.handlePeriodChanged.bind(this, "state")}>
                                {stateType.map(item => (
                                    <MenuItem
                                        key={item}
                                        value={item}
                                        disabled={
                                            (state === "unowned" && item !== "owned") ||
                                            // (state === "unowned" && item === "unowned" && !!ownerNew) ||
                                            (state === "owned" && item === "owned") ||
                                            (state === "closed" && item !== "unowned")
                                                ? true
                                                : false
                                        }
                                    >
                                        {item}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </ListItem>
                    <ListItem style={{ paddingLeft: 0, paddingRight: 0 }}>
                        <TextField
                            id="owner"
                            label="Owner"
                            value={ownerNew}
                            onClick={this.openView}
                            InputProps={{
                                readOnly: true
                            }}
                            fullWidth
                        />
                        <Fade
                            className="fadeBox"
                            in={this.state.expanded}
                            {...(this.state.expanded
                                ? { style: { display: "block" } }
                                : { style: { display: "none" } })}
                        >
                            <Paper>
                                <CardHeader
                                    action={
                                        <IconButton onClick={this.closeView}>
                                            <CloseIcon fontSize="small" />
                                        </IconButton>
                                    }
                                    title="Select Owner"
                                    className="topBar"
                                />
                                <div className="userBox">
                                    <div className="userTable">
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    {column.map(item => {
                                                        return <TableCell key={item.key}>{item.title}</TableCell>;
                                                    })}
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {!!userList &&
                                                    userList.map(row => {
                                                        return (
                                                            <TableRow key={row.userid}>
                                                                <TableCell>
                                                                    <Radio
                                                                        className="userRadio"
                                                                        checked={ownerNew === row.userid}
                                                                        onChange={this.handlePeriodChanged.bind(
                                                                            this,
                                                                            "owner"
                                                                        )}
                                                                        value={row.userid}
                                                                        name="radio-button-demo"
                                                                        aria-label="A"
                                                                    />
                                                                </TableCell>
                                                                <TableCell>{row.userid}</TableCell>
                                                                <TableCell>{row.username}</TableCell>
                                                            </TableRow>
                                                        );
                                                    })}
                                            </TableBody>
                                        </Table>
                                        {!userList ? (
                                            <Typography variant="caption" gutterBottom align="center">
                                                loading...
                                            </Typography>
                                        ) : userList.length > 0 ? null : (
                                            <Typography variant="caption" gutterBottom align="center">
                                                No data to display...
                                            </Typography>
                                        )}
                                    </div>

                                    <TablePagination
                                        component="div"
                                        count={(userPagination && userPagination.totalrecords) || count}
                                        rowsPerPage={(userPagination && userPagination.limit) || rowsPerPage}
                                        page={(userPagination && userPagination.currentpage - 1) || page}
                                        onChangePage={this.handleChangePage}
                                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                    />
                                </div>
                            </Paper>
                        </Fade>
                    </ListItem>
                    <ListItem style={{ paddingLeft: 0, paddingRight: 0 }}>
                        <FormControl style={{ width: "100%" }}>
                            <InputLabel>Severity</InputLabel>
                            <Select
                                value={severityNameNew}
                                onChange={this.handlePeriodChanged.bind(this, "severityName")}
                            >
                                {this.severityArr(severityKey).map((item, index) => (
                                    <MenuItem key={item} value={item} name={index}>
                                        {item}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </ListItem>
                    {/* <ListItem style={{ paddingLeft: 0, paddingRight: 0 }}>
                        <FormControl style={{ width: "100%" }}>
                            <InputLabel>Urgency</InputLabel>
                            <Select value={urgency} onChange={this.handlePeriodChanged.bind(this, "urgency")}>
                                {urgencyType.map(item => (
                                    <MenuItem key={item} value={item}>
                                        {item}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </ListItem> */}
                </List>
            </div>
        );
    }
}

export default TabFavourite;
