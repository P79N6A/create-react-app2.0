import React from "react";
import PropTypes from "prop-types";
import { Upload, Modal } from "antd";
import * as message from "modules/messageCenter/funcs/actions";
import { Button } from "@material-ui/core";
import "./style/upload.less";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { I18n } from "react-i18nify";
import formatter from "commons/utils/formatterUrlParam";
import classnames from "classnames";
const styles = theme => {
    return {
        button: { width: 143, padding: 8 },
        ".clearfix .ant-upload-list-picture-card .ant-upload-list-item": {
            borderRadius: "50%!important"
        },
        ".clearfix .ant-upload-list-picture-card .ant-upload-list-item-info": {
            borderRadius: "50%!important"
        }
    };
};

async function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
}

class Uploads extends React.Component {
    state = {
        previewVisible: false,
        previewImage: "",
        fileList: []
    };

    componentWillReceiveProps(nextProps) {
        const { fileList } = nextProps;
        this.setState({
            fileList: fileList || []
        });
    }

    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = file => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true
        });
    };

    handleChange = ({ fileList }) => {
        let base64 = [];
        const { maxSize } = this.props;
        for (let i = 0, len = fileList.length; i < len; i++) {
            let file = fileList[i];
            if (file.size / 1024 > maxSize) {
                let msg = I18n.t("security.limitSize");
                this.props.warn(formatter(msg, maxSize), "User");
                return;
            }
            getBase64(file.originFileObj, imageUrl => {
                base64.push(imageUrl);
            });
        }
        this.props.getFiles(fileList, base64);
    };
    render() {
        const { size, classes, replace, isUpload, type = "circle" } = this.props;
        const { previewVisible, previewImage, fileList } = this.state;
        return (
            <div className={classnames("clearfix", type === "circle" ? "clearfix-circle" : "")}>
                {!fileList.length && replace}
                <Upload
                    action=""
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                    {...this.props}
                >
                    {/* {fileList.length >= 3 ? null : uploadButton} */}
                    {fileList.length >= size || !isUpload ? null : (
                        <Button className={classes.button} variant="contained" color="secondary">
                            {I18n.t("security.users.UploadPhoto")}
                        </Button>
                    )}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: "100%" }} src={previewImage} />
                </Modal>
            </div>
        );
    }
}
Uploads.propTypes = {
    classes: PropTypes.object
};
Uploads.defaultProps = {
    getFile: () => {},
    size: 1,
    maxSize: 200,
    isUpload: false,
    replace: null
};

const mapDispatchToProps = dispatch => {
    return {
        warn: msg => {
            dispatch(message.warn(msg));
        }
    };
};
export default connect(
    null,
    mapDispatchToProps
)(withStyles(styles)(Uploads));
