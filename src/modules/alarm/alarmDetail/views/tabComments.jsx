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
import { withStyles } from "@material-ui/core/styles";
import "../styles/style.less";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Avatar from "@material-ui/core/Avatar";
import { TextField } from "modules/common";
import Button from "@material-ui/core/Button";
import moment from "moment";
import { Upload } from "antd";
import ImageIcon from "@material-ui/icons/Image";
import DescriptionIcon from "@material-ui/icons/Description";
import AttachmentIcon from "@material-ui/icons/Attachment";
import { getFile } from "api/security";
import encode16bit from "commons/utils/encode16bit";
import tokenHelper from "commons/utils/tokenHelper";
import CircularProgress from "@material-ui/core/CircularProgress";
import DefaultImg from "../styles/user_default.jpg";

const styles = theme => ({
    dark: {
        background: "theme.palette.background.paper"
    },
    inputMultiline: {
        height: "100% !important"
    }
});

class HeaderImg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mediaUrl: ""
        };
    }
    componentWillMount = async () => {
        const { imageHeader } = this.props;

        let tokenNew = encode16bit.ascii2hex(tokenHelper.get());
        let downloadId = imageHeader + tokenNew;
        let mediaUrl = await getFile(downloadId);
        this.setState({
            mediaUrl: mediaUrl[1].url
        });
    };
    render() {
        let { mediaUrl } = this.state;
        return <Avatar src={mediaUrl} className="img" />;
    }
}

class TabComments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fileList: [],
            file: {}
        };
    }

    componentWillUpdate() {
        if (this.state.lock) {
            this.setState({
                value: "",
                lock: false
            });
        }
    }
    handleInputChanged = event => {
        this.setState({
            value: event.target.value
        });
    };

    handleChange = ({ file, fileList }) => {
        let preFile = this.state.file;
        if (preFile.uid !== file.uid) {
            this.setState(
                Object.assign(this.state, {
                    file
                })
            );
            //if file's uid is new, post originFileObj
            this.props.handleUploadFile(fileList[0].originFileObj);
        }
        this.setState({
            fileList: []
        });
    };

    post = () => {
        this.props.handlePostComments(this.state.value);
        this.setState({
            lock: true
        });
    };
    downLoad = fileId => {
        this.props.handleMedia(fileId);
    };

    checkCommentsData = commentsData => {
        let arr = [];
        commentsData.map(item => {
            return item.mimetype && item.mimetype !== "" ? arr.push(item) : null;
        });
        return arr;
    };

    render() {
        const { commentsData, dateStyle, classes } = this.props;
        const { fileList } = this.state;
        return (
            <div className="comments">
                {/* if mimetype is text or file  */}
                <List className="list">
                    {!commentsData ? (
                        <div className="loading">
                            <CircularProgress color="secondary" />
                        </div>
                    ) : this.checkCommentsData(commentsData).length > 0 ? (
                        this.checkCommentsData(commentsData).map((item, index) => {
                            return (
                                <ListItem className="item" key={index}>
                                    {!item.userimage || item.userimage === "" ? (
                                        <Avatar src={DefaultImg} className="img" />
                                    ) : (
                                        <HeaderImg imageHeader={item.userimage} />
                                    )}
                                    <div className="right">
                                        <Typography variant="subtitle2" className="time">
                                            {moment(item.date).format(dateStyle)}
                                        </Typography>
                                        <Typography variant="subtitle1" className="name">
                                            {item.userid ? item.userid : "-"}
                                        </Typography>

                                        {item.mimetype.indexOf("cm/text") !== -1 && item.mimetype !== "" ? (
                                            <div className="wordBox">
                                                {item.description.split("\n").map((item2, index2) => {
                                                    return (
                                                        <Typography variant="body2" className="content" key={index2}>
                                                            {item2}
                                                        </Typography>
                                                    );
                                                })}
                                            </div>
                                        ) : (
                                            <ListItem button className="itemFile">
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
                                        )}
                                    </div>
                                </ListItem>
                            );
                        })
                    ) : (
                        <div className="loading">
                            <Typography variant="caption">No data to display.</Typography>
                        </div>
                    )}
                </List>
                <div className="postBar">
                    <TextField
                        multiline={true}
                        id="commentInput"
                        className="inputEnter"
                        placeholder="Enter a comment"
                        value={this.state.value}
                        onChange={this.handleInputChanged.bind(this)}
                        inputProps={{
                            maxLength: 400
                        }}
                        InputProps={{ classes: { inputMultiline: classes.inputMultiline } }}
                    />
                    <Upload
                        className="uploadBox"
                        action=""
                        listType="text"
                        fileList={fileList}
                        beforeUpload={() => false}
                        onChange={this.handleChange}
                    >
                        <Button size="small" variant="contained" color="secondary">
                            <AttachmentIcon />
                        </Button>
                    </Upload>

                    {/* <Button size="small" variant="contained" color="secondary" onClick={this.upLoad}>
                        @
                    </Button> */}
                    <Button size="small" variant="contained" color="secondary" onClick={this.post}>
                        Submit
                    </Button>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(TabComments, HeaderImg);
