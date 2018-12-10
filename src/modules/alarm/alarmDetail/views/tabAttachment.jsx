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
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import DescriptionIcon from "@material-ui/icons/Description";
import ImageIcon from "@material-ui/icons/Image";
import moment from "moment";

const styles = {};

class TabAttachments extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    downLoad = fileId => {
        this.props.handleMedia(fileId);
    };

    checkCommentsData = commentsData => {
        let arr = [];
        commentsData.map(item => {
            return item.mimetype !== "cm/text/plain" && item.mimetype !== "" ? arr.push(item) : null;
        });
        return arr;
    };

    render() {
        const { commentsData, dateStyle } = this.props;
        return (
            <div className="attachment">
                {!commentsData ? (
                    <div className="loading">
                        <CircularProgress color="secondary" />
                    </div>
                ) : this.checkCommentsData(commentsData).length > 0 ? (
                    <List component="nav">
                        {commentsData.map((item, index) => {
                            return (
                                <div>
                                    {item.mimetype && item.mimetype !== "cm/text/plain" ? (
                                        <ListItem className="item" key={index}>
                                            <ListItemIcon>
                                                {item.mimetype.indexOf("image") !== -1 ? (
                                                    <ImageIcon />
                                                ) : (
                                                    <DescriptionIcon />
                                                )}
                                            </ListItemIcon>
                                            <div>
                                                <Typography variant="body2">
                                                    {item.description}{" "}
                                                    <span>
                                                        (
                                                        {item.size < 1024 * 1024
                                                            ? Math.ceil(item.size / 1024) + "KB"
                                                            : Math.ceil(item.size / 1024 / 1024) + "MB"}
                                                        )
                                                    </span>
                                                </Typography>
                                                <Typography variant="caption">
                                                    Uploaded by: {item.userid ? item.userid : "-"}
                                                </Typography>
                                                <Typography variant="caption">
                                                    {moment(item.date).format(dateStyle)}
                                                </Typography>
                                                <div>
                                                    <Typography
                                                        variant="caption"
                                                        className="button"
                                                        color="secondary"
                                                        onClick={this.downLoad.bind(this, item.uri)}
                                                    >
                                                        Download
                                                    </Typography>{" "}
                                                    {/* |{" "}
                                                    <Typography variant="caption" className="button" color="secondary">
                                                        View
                                                    </Typography> */}
                                                </div>
                                            </div>
                                        </ListItem>
                                    ) : null}
                                </div>
                            );
                        })}
                    </List>
                ) : (
                    <div className="loading">
                        <Typography variant="caption" align="center">
                            No data to display.
                        </Typography>
                    </div>
                )}
            </div>
        );
    }
}
TabAttachments.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TabAttachments);
