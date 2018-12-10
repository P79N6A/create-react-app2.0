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
import "../styles/style.less";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Theme from "commons/components/theme";
import DateUtility from "commons/utils/dateUtility";
import TopologyConfig from "../topologyConfig";
import Collapse from "@material-ui/core/Collapse";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { withStyles } from "@material-ui/core/styles";
import classnames from "classnames";
import jp from "jsonpath";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const styles = theme => ({
    card: {
        maxWidth: 400
    },
    actions: {
        display: "flex"
    },
    expand: {
        transform: "rotate(0deg)",
        transition: theme.transitions.create("transform", {
            duration: theme.transitions.duration.shortest
        }),
        marginLeft: "auto"
    },
    expandOpen: {
        transform: "rotate(180deg)"
    }
});

class DataGridView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            details: {}
        };
    }

    componentWillMount() {
        this.renderDetailData(this.props.data, this.props.type);
    }

    renderDetailData(data, type) {
        let details = {};
        let keyConfig =
            type === "alarm" ? TopologyConfig.alarmDetailDisplayKeys : TopologyConfig.eventDetailDisplayKeys;
        for (let i = 0; i < keyConfig.length; i++) {
            let item = keyConfig[i];
            details[item.displayName] = jp.query(data, item["JSONPath"]);
        }
        this.setState(
            Object.assign(this.state, {
                details: details
            })
        );
    }

    renderSeverityColor(severityColor, type) {
        let severityKey = type === "alarm" ? TopologyConfig.alarmSeverityKey : TopologyConfig.eventSeverityKey;
        if (!severityKey[severityColor]) {
            return;
        }
        return (
            <div
                title={severityKey[severityColor].label}
                style={{
                    backgroundColor: severityKey[severityColor].color
                }}
                className="severity-div"
            >
                <span
                    style={{
                        borderTop: `8px solid ${severityKey[severityColor].color}`
                    }}
                    className="severity-span"
                />
            </div>
        );
    }

    handleExpandClick = () => {
        this.setState(state => ({ expanded: !state.expanded }));
    };

    render() {
        let { data, type } = this.props;
        const { classes } = this.props;
        return (
            <Card className={classes.card} style={{ marginBottom: "24px", position: "relative" }}>
                {data.severity && this.renderSeverityColor(data.severity, type)}
                <CardContent>
                    <Typography component="p">{data["note"] || data["eventtype"]}</Typography>
                </CardContent>
                <CardActions className={classes.actions} disableActionSpacing>
                    <Typography component="p" style={{ paddingLeft: "12px" }}>
                        {DateUtility(data["sentdatetime"])}
                    </Typography>
                    <IconButton
                        className={classnames(classes.expand, {
                            [classes.expandOpen]: this.state.expanded
                        })}
                        onClick={this.handleExpandClick}
                        aria-expanded={this.state.expanded}
                        aria-label="Show more"
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                </CardActions>
                <Collapse
                    in={this.state.expanded}
                    timeout="auto"
                    unmountOnExit
                    style={{ backgroundColor: Theme.palette.primary.light }}
                >
                    <CardContent style={{ padding: 0 }}>
                        <ul style={{ padding: 0 }}>
                            {Object.keys(this.state.details).map(key => {
                                return (
                                    <ListItem button key={key}>
                                        <ListItemText
                                            primary={<span className="topology-pre">{this.state.details[key]}</span>}
                                            secondary={key}
                                            title={this.state.details[key]}
                                            style={{ wordBreak: "break-all" }}
                                        />
                                    </ListItem>
                                );
                            })}
                        </ul>
                    </CardContent>
                </Collapse>
            </Card>
        );
    }
}

export default withStyles(styles)(DataGridView);
