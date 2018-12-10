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
import "../styles/style.less";
import moment from "moment";
// import CircularProgress from "@material-ui/core/CircularProgress";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
// import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import FindInPageIcon from "@material-ui/icons/FindInPage";
import NotesIcon from "@material-ui/icons/Notes";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

class GeneralPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            defaultArr: ["alarmtype", "severity", "sentdatetime", "source", "note"],
            expanded: true
        };
    }
    onChange = () => {
        let state = !this.state.expanded;
        this.setState({
            expanded: state
        });
    };

    render() {
        const { dateStyle, severityKey, detail } = this.props;
        const { expanded } = this.state;
        return (
            <div className="general">
                <ExpansionPanel expanded={expanded}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon onClick={this.onChange} />}>
                        <Typography variant="subtitle1" className="title" title="Alarm Type">
                            {!detail || detail.length === 0 ? "--/--" : detail[0]["alarmtype"]}
                        </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails
                        style={{
                            display: "block",
                            padding: "0 0 24px 0"
                        }}
                    >
                        <ListItem className="listLi">
                            <ListItemIcon className="icon" title="Severity">
                                {/* <TrendingUpIcon /> */}
                                <span className={"severity s" + detail[0]["severity"]} />
                            </ListItemIcon>
                            <ListItemText
                                className="content"
                                primary={!detail || detail.length === 0 ? "--/--" : severityKey[detail[0]["severity"]]}
                            />
                        </ListItem>
                        <ListItem className="listLi">
                            <ListItemIcon className="icon" title="Send Time">
                                <AccessTimeIcon />
                            </ListItemIcon>
                            <ListItemText
                                className="content"
                                primary={
                                    !detail || detail.length === 0
                                        ? "--/--"
                                        : moment(detail[0]["sentdatetime"]).format(dateStyle)
                                }
                            />
                        </ListItem>
                        <ListItem className="listLi">
                            <ListItemIcon className="icon" title="Source">
                                <FindInPageIcon />
                            </ListItemIcon>
                            <ListItemText
                                className="content"
                                primary={!detail || detail.length === 0 ? "--/--" : detail[0]["source"]}
                            />
                        </ListItem>
                        <ListItem className="listLi">
                            <ListItemIcon className="icon" title="Note">
                                <NotesIcon />
                            </ListItemIcon>
                            <ListItemText
                                className="content"
                                // title={!detail || detail.length === 0 ? "--/--" : detail[0]["note"]}
                                primary={!detail || detail.length === 0 ? "--/--" : detail[0]["note"]}
                            />
                        </ListItem>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        );
    }
}

export default GeneralPanel;
