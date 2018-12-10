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
 * Created by xulu on 01/11/2018.
 */
import React from "react";
// import "../styles/style.less";
import { connect } from "react-redux";
import { REDUCER_NAME as topoFloatTabReducer } from "../funcs/constants";
// import { MapApplication } from "modules/map";
import { uploadImgRequest } from "../funcs/actions";
import { Upload } from "antd";
import { Icon } from "@material-ui/core";
import token from "commons/utils/tokenHelper";
import encode16Bit from "commons/utils/encode16bit";
import { getFile } from "api/security";
import CardMedia from "@material-ui/core/CardMedia";
import { withStyles } from "@material-ui/core/styles";
// import { TextField } from "modules/common";
// import Tooltip from "@material-ui/core/Tooltip";
import _ from "lodash";

const styles = theme=>({
    cardMediaRoot:{
        height:"100%",
        width:"100%",
        backgroundSize:"contain"
    }
});

const UploadButton = props => {
    const { imageUrl, disableEdit,classes } = props;
    const noImage = _.isEmpty(imageUrl);
    return (
        <div className="upload-content">
            {!noImage && (
                <div style={{ position: "absolute", zIndex: 1,width:"100%",height:"100%" }}>
                    <CardMedia
                        alt="Application Cover"
                        image={imageUrl}
                        title="avatar"
                        classes={{root:classes.cardMediaRoot}}
                    />
                    {/* <img src={imageUrl} alt="avatar" style={{ width: "100%", height: "188px" }} /> */}
                </div>
            )}
            {!disableEdit && (
                <div className="upload-content-action" style={{ position: "absolute" }}>
                    <div>
                        <Icon>add</Icon>
                        <div className="ant-upload-text">Upload</div>
                    </div>
                </div>
            )}
            {noImage &&
                disableEdit && (
                    <div>
                        <div className="ant-upload-text">No Cover</div>
                    </div>
                )}
        </div>
    );
};

class ImageComp extends React.Component {
    state = { imageUrl: "" };
    componentDidMount() {
        const { imageId } = this.props;
        this.getImg(imageId);
    }
    componentWillReceiveProps(nextProps) {
        const { imageId } = nextProps;
        if (imageId === this.props.imageId) {
            return;
        }
        this.getImg(imageId);
        this.handleImageChange(imageId);
    }
    handleImageChange = imageId => {
        const { schemaKey, handleImageChange, disableEdit } = this.props;
        !disableEdit && handleImageChange && handleImageChange(schemaKey, imageId);
    };
    getImg = async imgid => {
        if (_.isEmpty(imgid) || (!_.isEmpty(imgid) && imgid.length > 200)) {
            return;
        }
        const url = imgid + encode16Bit.ascii2hex(token.get());
        const imageUrl = await getFile(url);
        this.setState({
            imageUrl: imageUrl[1].url
        });
    };
    handleChange = ({ file, fileList }) => {
        const { identify } = this.props;
        this.props.uploadImg(identify, file);
    };
    render() {
        const { disableEdit,classes } = this.props;
        const { imageUrl } = this.state;
        return (
            <React.Fragment>
                <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    disabled={disableEdit}
                    showUploadList={false}
                    action=""
                    beforeUpload={() => false}
                    onChange={this.handleChange}
                >
                    <UploadButton imageUrl={imageUrl} disableEdit={disableEdit} classes={classes}/>
                </Upload>
            </React.Fragment>
        );
    }
}

ImageComp.defaultProps = {};

const filterProps = (state, identify, reducerName, props) => {
    if (state[reducerName] && state[reducerName][identify]) {
        return state[reducerName][identify][props];
    }
};

const mapStateToProps = (state, ownProps) => {
    const { identify, imageId } = ownProps;
    return {
        imageId: filterProps(state, identify, topoFloatTabReducer, "imageId") || imageId
    };
};
const mapDispatchToProps = dispatch => {
    return {
        uploadImg: (identify, file) => {
            dispatch(uploadImgRequest(identify, file));
        }
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(ImageComp));
