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
 * Created by wplei on 25/05/18.
 */
import React, { Component } from "react";
import { Modal, Icon, Upload, message } from "antd";
import { Typography } from "@material-ui/core";

const allowFileType = ["image/png", "image/jpg", "image/jpeg"];
const beforeUpload = file => {
    if (!allowFileType.includes(file.type)) {
        message.error("Error file type!");
        return false;
    }
    const isLt2M = file.size / 1024 / 1024 < 5;
    if (!isLt2M) {
        message.error("Image must smaller than 5MB!");
    }
    return isLt2M;
};

class UploadContainer extends Component {
    state = {
        previewImage: "",
        previewVisible: false,
        fileList: []
    };
    handleCancel = () => {
        this.setState({
            previewVisible: false
        });
    };
    handlePreview = file => {
        this.setState({
            previewImage: file.img || file.thumbUrl,
            previewVisible: true
        });
    };
    handleUploadChange = ({ fileList }) => {
        if (!allowFileType.includes((fileList[0] && fileList[0].type) || "")) {
            return false;
        }
        if (fileList.length > 1) {
            fileList.shift();
        }
        this.setState({
            fileList
        });
        this.props.handleChange(fileList);
    };
    render = () => {
        let { fileList, previewVisible, previewImage } = this.state;
        return (
            <div className="upload-container">
                <Upload
                    name="img"
                    listType="picture-card"
                    className="img-uploader"
                    fileList={fileList}
                    action={this.state.action}
                    beforeUpload={beforeUpload}
                    onChange={this.handleUploadChange}
                    onPreview={this.handlePreview}
                >
                    <div>
                        <Icon type="plus" />
                        <Typography className="ant-upload-text">Upload</Typography>
                    </div>
                </Upload>
                <Modal width="50%" visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="Preview" style={{ width: "100%" }} src={previewImage} />
                </Modal>
            </div>
        );
    };
}

export default UploadContainer;
