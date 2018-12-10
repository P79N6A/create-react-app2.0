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
// import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import FindInPageIcon from "@material-ui/icons/FindInPage";
import NotesIcon from "@material-ui/icons/Notes";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
// import LinkIcon from "@material-ui/icons/Link";
import LinkOffIcon from "@material-ui/icons/LinkOff";

class AssociationsDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    closeView = () => {
        this.props.viewAssociation();
    };
    dissociateItem = obj => {
        this.props.dissociateItem(obj, "dissociate");
        this.props.viewAssociation();
    };

    render() {
        const { assDetail } = this.props;
        return (
            <div className="assDetail">
                {!assDetail ? null : (
                    <div style={{ paddingBottom: "24px" }}>
                        <CardHeader
                            action={
                                <div>
                                    <IconButton onClick={this.dissociateItem.bind(this, assDetail)}>
                                        <LinkOffIcon fontSize="small" />
                                    </IconButton>
                                    <IconButton onClick={this.closeView}>
                                        <CloseIcon fontSize="small" />
                                    </IconButton>
                                </div>
                            }
                            className="topBar"
                        />
                        <ListItem className="listLi" title="Alarm Type">
                            <Typography variant="subtitle1">{assDetail["alarmtype"]}</Typography>
                        </ListItem>
                        <ListItem className="listLi">
                            <ListItemIcon className="icon" title="Severity">
                                <TrendingUpIcon />
                            </ListItemIcon>
                            <ListItemText className="content" primary={assDetail["severity"]} />
                        </ListItem>
                        <ListItem className="listLi">
                            <ListItemIcon className="icon" title="Send Time">
                                <AccessTimeIcon />
                            </ListItemIcon>
                            <ListItemText className="content" primary={assDetail["sentdatetime"]} />
                        </ListItem>
                        <ListItem className="listLi">
                            <ListItemIcon className="icon" title="Source">
                                <FindInPageIcon />
                            </ListItemIcon>
                            <ListItemText className="content" primary={assDetail["source"]} />
                        </ListItem>
                        <ListItem className="listLi">
                            <ListItemIcon className="icon" title="Note">
                                <NotesIcon />
                            </ListItemIcon>
                            <ListItemText className="content" primary={assDetail["note"]} />
                        </ListItem>
                    </div>
                )}
            </div>
        );
    }
}

export default AssociationsDetail;
