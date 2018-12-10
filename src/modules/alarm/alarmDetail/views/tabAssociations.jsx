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
import { CardHeader } from "modules/common";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import { Typography } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import AssociationsSearch from "./tabAssociationsSearch";
import AssociationsDetail from "./tabAssociationsDetail";
import LinkOffIcon from "@material-ui/icons/LinkOff";
import DescriptionIcon from "@material-ui/icons/Description";
import { checkAssociationClass } from "../funcs/checkClass";

class Associations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            expanded2: false,
            assDetail: null,
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
                    key: "class",
                    title: "Class"
                },
                {
                    key: "owner",
                    title: "Owner"
                },
                {
                    key: "actions",
                    title: "Actions"
                }
            ]
        };
    }

    handleOpen = () => {
        // let state = this.state.expanded;
        // if true, close

        this.setState({
            expanded: !this.state.expanded
        });
    };
    viewAssociation = obj => {
        this.setState({
            expanded2: !this.state.expanded2,
            assDetail: obj
        });
    };

    handleAssociationItem = (obj, state) => {
        this.props.handleAssociationItem(obj, state);
    };
    associationSearch = (number, period, paginator, applicationid) => {
        this.props.handleAssociationSearch(number, period, paginator, applicationid);
    };

    render() {
        const { associationsData, assSearchData, assSearchPagination, detail, applicationid } = this.props;
        const leave = checkAssociationClass(detail[0]);
        return (
            <div className="associations">
                <CardHeader
                    action={
                        leave === 1 ? null : (
                            <IconButton onClick={this.handleOpen}>
                                <Icon>add</Icon>
                            </IconButton>
                        )
                    }
                    title={<Typography variant="subtitle1">Associated Alarms</Typography>}
                    classes={{
                        title: {
                            paddingBottom: "0"
                        }
                    }}
                />
                <div className="table">
                    <Table>
                        <TableHead>
                            <TableRow>
                                {this.state.column.map((item, index) => {
                                    return <TableCell key={index}>{item.title}</TableCell>;
                                })}
                            </TableRow>
                        </TableHead>
                        {associationsData && associationsData.length > 0 ? (
                            <TableBody>
                                {associationsData.map(row => {
                                    return (
                                        <TableRow key={row.id}>
                                            <TableCell className="sendtime">{row.sentdatetime}</TableCell>
                                            <TableCell>{row.alarmtype}</TableCell>
                                            <TableCell>
                                                <span className="class">{row.class}</span>
                                            </TableCell>
                                            <TableCell>{row.owner}</TableCell>
                                            <TableCell>
                                                <span className="button" title="Alarm Details">
                                                    <DescriptionIcon
                                                        fontSize="small"
                                                        onClick={this.viewAssociation.bind(this, row)}
                                                    />
                                                </span>
                                                <span className="button" title="Alarm Disassociate">
                                                    <LinkOffIcon
                                                        fontSize="small"
                                                        onClick={this.handleAssociationItem.bind(
                                                            this,
                                                            row,
                                                            "dissociate"
                                                        )}
                                                    />
                                                </span>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        ) : null}
                    </Table>

                    {!associationsData ? (
                        <div className="loading">
                            <Typography variant="caption">Loading...</Typography>
                        </div>
                    ) : associationsData.length > 0 ? null : (
                        <div className="loading">
                            <Typography variant="caption">No data to display.</Typography>
                        </div>
                    )}
                </div>

                <Fade
                    className="fadeBox"
                    in={this.state.expanded}
                    {...(this.state.expanded ? { style: { display: "block" } } : { style: { display: "none" } })}
                >
                    <Paper>
                        <AssociationsSearch
                            associationSearch={this.associationSearch.bind(this)}
                            assSearchData={assSearchData}
                            assSearchPagination={assSearchPagination}
                            associateItem={this.handleAssociationItem.bind(this)}
                            applicationid={applicationid}
                        />
                    </Paper>
                </Fade>
                <Fade
                    className="fadeBox2"
                    in={this.state.expanded2}
                    {...(this.state.expanded2 ? { style: { display: "block" } } : { style: { display: "none" } })}
                >
                    <Paper>
                        <AssociationsDetail
                            assDetail={this.state.assDetail}
                            viewAssociation={this.viewAssociation}
                            dissociateItem={this.handleAssociationItem.bind(this)}
                        />
                    </Paper>
                </Fade>
            </div>
        );
    }
}

export default Associations;
