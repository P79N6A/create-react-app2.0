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
 * Created by HuLin on 03/08/2018.
 */
import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { REDUCER_NAME } from "../../funcs/constants";
import { setOpenDialog, setCreateModel, setReFreshModel, setUpdateModel } from "../../funcs/actions";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Radio from "@material-ui/core/Radio";
import { Input, InputLabel, Button, Select } from "modules/common";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import CircularProgress from "@material-ui/core/CircularProgress";
import OutputDeviceParameter from "./modelOutputDeviceParameter";
import { Upload, Icon } from "antd";
import { ISC_ACCOUNT_INFO } from "commons/constants/const";
const sitename = sessionStorage.getItem(ISC_ACCOUNT_INFO) && JSON.parse(sessionStorage.getItem(ISC_ACCOUNT_INFO)).displayname;
const { groups, userid } = JSON.parse(sessionStorage.getItem("ISC-CURRENT-USER") || "{}");
const modelUserId = groups && groups.includes("Administrator") ? "admin" : userid;

//get swagger content
let fileSwagger = {};
const maxWidth = 600;
const minWidth = 600;
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 550
        }
    }
};
const styles = theme => ({
    formControl: {
        margin: theme.spacing.unit,
        width: "100%"
    },
    textError: {
        color: "#f44336"
    },
    buttonAction: {
        marginRight: theme.spacing.unit * 3
    },
    button: {
        marginLeft: theme.spacing.unit * 2
    },
    file: {
        display: "none"
    },
    Upload: {
        marginLeft: 400
    },
    uploadPrompt: {
        color: "#02bad1"
    }
});
function Transition(props) {
    return <Slide direction="up" {...props} />;
}
class ModelsDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modelName: "",
            modelNameFlag: false,
            description: "",
            descriptionFlag: false,
            modelType: "webserviceApi",
            fileSwagger: {},
            pickleValue: "",
            pickleValueFlag: false,
            selectJsonType: "azure",
            selectedValue: "modelAPI",
            modelIdInfo: {},
            swaggerFileType: false,
            swaggerJson: "",
            fileList: [],
            fileSwaggerOutput: {},
            isFirstEnter: true,
            venderName: "",
            deviceTypeName: "",
            outputParameters: {},
            judgeSuccess: false
        };
    }
    beforeUpload = file => {
        let reader = new FileReader();
        let _this = this;
        reader.readAsText(file, "gb2312");
        reader.onload = function() {
            fileSwagger = this.result;
        };
        reader.onloadend = function() {
            _this.setState(
                Object.assign(_this.state, {
                    fileSwaggerOutput: fileSwagger
                })
            );
        };
    };
    componentWillReceiveProps(nextProps) {
        if (nextProps.modelIdInfo && nextProps.modelIdInfo !== "{}") {
            const { commonEditId } = this.props;
            if (commonEditId !== "" && nextProps.commonEditId === commonEditId) {
                this.setState({
                    modelIdInfo: nextProps.modelIdInfo,
                    modelName: nextProps.modelIdInfo.modelName,
                    description: nextProps.modelIdInfo.description,
                    modelType: nextProps.modelIdInfo.type,
                    swaggerJson: nextProps.modelIdInfo.swaggerJson
                });
            } else if (nextProps.commonEditId === "" && commonEditId === "" && this.props.isFirstEnter) {
                this.setState({
                    fileList: [],
                    modelName: "",
                    description: "",
                    modelType: "webserviceApi",
                    swaggerJson: "",
                    isFirstEnter: false
                });
            }
        }
    }
    handleClose = () => {
        this.props.onSetOpenDialog(false, this.props.identify);
        fileSwagger = {};
        this.setState({
            fileList: [],
            fileSwaggerOutput: {},
            modelName: "",
            modelNameFlag: false,
            description: "",
            descriptionFlag: false,
            modelType: "webserviceApi",
            swaggerJson: "",
            isFirstEnter: true
        });
    };
    handleComfirm = () => {
        const { modelName, description, modelType, modelIdInfo, swaggerJson, deviceTypeName, venderName, outputParameters } = this.state;
        const { identify, pagination, commonEditId, applicationId } = this.props;
        if (commonEditId !== "") {
            let resultJson = {};
            if (JSON.stringify(fileSwagger) === "{}") {
                resultJson = swaggerJson;
            } else {
                resultJson = fileSwagger;
            }
            //update
            this.props.onSetUpdateModel(modelIdInfo.modelId, modelName, description, modelType, resultJson, identify);
        } else {
            let basicTypeInstances = {
                basicTypeInstances: [
                ]
            };
            let additionalProperty = {
                additionalProperty: {
                    icon: "default",
                    manufacturer: "manu",
                    description: "this is a model",
                    timeout: "120"
                }
            };
            let deviceProperty = {
                deviceProperty: {}
            };
            let outputParamter = [];
            if (JSON.parse(fileSwagger) !== "{}") {
                outputParamter = JSON.parse(fileSwagger).definitions.output1Item.required;
            }
            for (let i = 0; i < outputParamter.length; i++) {
                deviceProperty.deviceProperty[outputParamter[i]] = {
                    displayname: outputParamter[i].replace(/\s+/g, ""),
                    mandatory: true,
                    operations: null,
                    multiselect: "single",
                    enum: null,
                    valueerror: "Support a-z and A-Z",
                    valueregex: "a-zA-Z",
                    size: 12,
                    defaultvalue: null,
                    datatype: "string"
                };
            }
            //create
            this.props.onSetCreateModel(
                modelName,
                description,
                modelType,
                fileSwagger,
                venderName,
                deviceTypeName,
                outputParameters,
                applicationId,
                basicTypeInstances,
                additionalProperty,
                deviceProperty,
                sitename,
                modelUserId,
                identify
            );
        }
        this.props.onSetOpenDialog(false, identify);
        //refresh model table
        setTimeout(() => {
            this.props.onSetReFreshModel(pagination.page, pagination.rowsPerpage, pagination.orderBy, pagination.order, identify);
            //clear fileSwagger
            fileSwagger = {};
            this.setState({
                fileList: [],
                fileSwaggerOutput: {},
                modelName: "",
                modelNameFlag: false,
                description: "",
                descriptionFlag: false,
                modelType: "webserviceApi",
                swaggerJson: "",
                isFirstEnter: true
            });
        }, 2000);
    };
    handleCheckbox = name => event => {
        this.setState({ [name]: event.target.checked });
    };
    handleChange = name => event => {
        let value = event.target.value;
        this.setState({
            [name]: value
        });
        let flag = `${name}Flag`;
        let reg = /[\w]{3,50}/;
        if (value && reg.test(value)) {
            this.setState({ [flag]: false });
        } else {
            this.setState({ [flag]: true });
        }
    };
    handleFile = name => event => {
        let value = event.target.value;
        let flag = `${name}Flag`;
        let displayValue = `${name}Display`;
        if (value) {
            this.setState({
                [name]: value,
                [displayValue]: value,
                [flag]: false
            });
        } else {
            this.setState({
                [name]: value,
                [displayValue]: value,
                [flag]: true
            });
        }
    };
    handleUploadFileType = info => {
        if (info.file.status === "uploading") {
            if (info.file.name.split(".")[1] === "json") {
                this.setState({ swaggerFileType: true });
            }
        }

        let fileList = info.fileList;
        fileList = fileList.slice(-1);
        this.setState({ fileList });
    };
    judgeSuccess = (judge, venderName, deviceTypeName, outputParameters) => {
        this.setState({
            judgeSuccess: judge,
            venderName: venderName,
            deviceTypeName: deviceTypeName,
            outputParameters: outputParameters
        });
    };
    render() {
        const { classes, refreshCommonInfoSuccess, commonEditId } = this.props;
        const {
            modelName,
            modelNameFlag,
            description,
            descriptionFlag,
            modelType,
            selectedValue,
            pickleValue,
            pickleValueFlag,
            selectJsonType,
            swaggerFileType
        } = this.state;
        const props = {
            action: "//jsonplaceholder.typicode.com/posts/",
            onChange: this.handleUploadFileType,
            multiple: true
        };
        return (
            <Dialog
                open={this.props.isOpenDialog}
                TransitionComponent={Transition}
                disableBackdropClick
                keepMounted
                onClose={this.handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
                PaperProps={{
                    style: {
                        maxWidth: maxWidth,
                        minWidth: minWidth
                    }
                }}
            >
                <DialogTitle id="alert-dialog-slide-title">
                    {commonEditId === "" ? "Register a Model" : "Edit model"}
                </DialogTitle>
                <DialogContent style={{ height: "100%" }}>
                    {!refreshCommonInfoSuccess && commonEditId !== "" ? (
                        <div style={{ textAlign: "center" }}>
                            <CircularProgress color="secondary" />
                        </div>
                    ) : (
                        <div
                            style={{
                                width: "100%",
                                height: "100%"
                            }}
                        >
                            <FormControl className={classes.formControl}>
                                <InputLabel>Model Name</InputLabel>
                                <Input
                                    type="text"
                                    error={modelNameFlag}
                                    value={modelName}
                                    onChange={this.handleChange("modelName")}
                                    disabled={ commonEditId !== "" }
                                    style={{ width: "95%" }}
                                />
                                {modelNameFlag ? (
                                    <FormHelperText className={classes.textError}>Please Model Name</FormHelperText>
                                ) : null}
                            </FormControl>

                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="select-multiple">Model Type</InputLabel>
                                <Select
                                    value={modelType}
                                    onChange={this.handleChange("modelType")}
                                    input={<Input id="select-multiple" />}
                                    MenuProps={MenuProps}
                                    style={{ width: "95%" }}
                                >
                                    <MenuItem value="webserviceApi">WEBSERVICE API</MenuItem>
                                    <MenuItem value="pickle">PICKLE</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl className={classes.formControl}>
                                <FormGroup row>
                                    <FormControlLabel
                                        control={
                                            <Radio
                                                checked={selectedValue === "model"}
                                                onChange={this.handleChange("selectedValue")}
                                                value="model"
                                                name="model"
                                                aria-label="Model"
                                                disabled
                                            />
                                        }
                                        label="Model"
                                    />

                                    <FormControlLabel
                                        control={
                                            <Radio
                                                checked={selectedValue === "modelAPI"}
                                                onChange={this.handleChange("selectedValue")}
                                                value="modelAPI"
                                                name="model"
                                                aria-label="Model API"
                                            />
                                        }
                                        label="Model API"
                                    />
                                </FormGroup>
                            </FormControl>

                            {selectedValue === "model" ? (
                                <FormControl className={classes.formControl}>
                                    <label htmlFor="pickle-file">
                                        <Input
                                            id="pickle-file"
                                            type="file"
                                            onChange={this.handleFile("pickleValue")}
                                            value={pickleValue}
                                            className={classes.file}
                                        />

                                        <Input
                                            type="text"
                                            value={pickleValue}
                                            onChange={this.handleChange("pickleValue")}
                                            style={{ width: "78%" }}
                                            placeholder="Upload Pickle"
                                            readOnly
                                        />

                                        <Button color="secondary" component="span" className={classes.button}>
                                            Upload
                                        </Button>
                                    </label>

                                    {pickleValueFlag ? (
                                        <FormHelperText className={classes.textError}>
                                            Please upload pickle
                                        </FormHelperText>
                                    ) : null}
                                </FormControl>
                            ) : (
                                <div>
                                    <FormControl className={classes.formControl}>
                                        <InputLabel>ModelAPI Description</InputLabel>
                                        <Input
                                            type="text"
                                            error={descriptionFlag}
                                            value={description}
                                            onChange={this.handleChange("description")}
                                            style={{ width: "95%" }}
                                        />
                                        {descriptionFlag ? (
                                            <FormHelperText className={classes.textError}>
                                                Please enter your description
                                            </FormHelperText>
                                        ) : null}
                                    </FormControl>

                                    <FormControl className={classes.formControl}>
                                        <FormGroup row>
                                            <FormControlLabel
                                                control={
                                                    <Radio
                                                        checked={selectJsonType === "azure"}
                                                        onChange={this.handleChange("selectJsonType")}
                                                        value="azure"
                                                        name="json_format"
                                                        aria-label="Model API"
                                                    />
                                                }
                                                label="AZURE"
                                            />

                                            <FormControlLabel
                                                control={
                                                    <Radio
                                                        checked={selectJsonType === "aws"}
                                                        onChange={this.handleChange("selectJsonType")}
                                                        value="aws"
                                                        name="json_format"
                                                        aria-label="Model API"
                                                        disabled
                                                    />
                                                }
                                                label="AWS"
                                            />

                                            <FormControlLabel
                                                control={
                                                    <Radio
                                                        checked={selectJsonType === "other"}
                                                        onChange={this.handleChange("selectJsonType")}
                                                        value="other"
                                                        name="json_format"
                                                        aria-label="other"
                                                        disabled
                                                    />
                                                }
                                                label="OTHER"
                                            />
                                        </FormGroup>
                                    </FormControl>

                                    <FormControl className={classes.formControl}>
                                        <Upload
                                            {...props}
                                            beforeUpload={this.beforeUpload}
                                            fileList={this.state.fileList}
                                        >
                                            <Button disabled={ !modelName || modelNameFlag }>
                                                <Icon type="upload" />
                                                Upload
                                            </Button>
                                        </Upload>
                                        {!swaggerFileType ? (
                                            <FormHelperText className={classes.uploadPrompt}>
                                                Please upload a file in JSON format.
                                            </FormHelperText>
                                        ) : null}
                                    </FormControl>
                                </div>
                            )}

                            {JSON.stringify(this.state.fileSwaggerOutput) !== "{}" ? (
                                <OutputDeviceParameter
                                    fileSwagger={this.state.fileSwaggerOutput}
                                    modelName = { modelName }
                                    judgeSuccess={this.judgeSuccess}
                                />
                            ) : null}
                        </div>
                    )}
                </DialogContent>
                <DialogActions className={classes.buttonAction}>
                    <Button onClick={this.handleClose}>Cancel</Button>
                    {commonEditId !== "" ? (
                        <Button
                            disabled={!modelName || modelNameFlag || !description || descriptionFlag}
                            onClick={this.handleComfirm}
                            color="secondary"
                            variant="contained"
                        >
                            update
                        </Button>
                    ) : (
                        <Button
                            disabled={
                                !modelName ||
                                modelNameFlag ||
                                !description ||
                                descriptionFlag ||
                                !swaggerFileType ||
                                Boolean(this.state.fileList.length === 0) ||
                                !this.state.judgeSuccess
                            }
                            onClick={this.handleComfirm}
                            color="secondary"
                            variant="contained"
                        >
                            comfirm
                        </Button>
                    )}
                </DialogActions>
            </Dialog>
        );
    }
}

ModelsDialog.defaultProps = {
    refreshCommonInfoSuccess: false,
    isOpenDialog: false,
    modelIdInfo: {},
    pagination: {
        page: 1,
        rowsPerpage: 10,
        orderBy: "modelName",
        order: "desc"
    }
};

const mapStateToProps = (state, ownProps) => {
    if (state[REDUCER_NAME]) {
        return {
            isOpenDialog: state[REDUCER_NAME].isOpenDialog,
            refreshCommonInfoSuccess: state[REDUCER_NAME].refreshCommonInfoSuccess,
            modelIdInfo: state[REDUCER_NAME].model.modelIdInfo,
            applicationId: state[REDUCER_NAME].applicationId || null
        };
    }
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onSetOpenDialog: (open, identify) => {
            dispatch(setOpenDialog(open, identify));
        },
        onSetCreateModel: (modelName, description, modelType, fileSwagger, venderName, deviceTypeName, outputParameters, appid, basicTypeInstances, additionalProperty, deviceProperty, sitename, modelUserId, identify) => {
            dispatch(setCreateModel(modelName, description, modelType, fileSwagger, venderName, deviceTypeName, outputParameters, appid, basicTypeInstances,  additionalProperty,  deviceProperty, sitename,  modelUserId, identify));
        },
        onSetReFreshModel: (page, rowsPerpage, orderBy, order, identify) => {
            dispatch(setReFreshModel(page, rowsPerpage, orderBy, order, identify));
        },
        onSetUpdateModel: (modelId, modelName, description, modelType, fileSwagger, identify) => {
            dispatch(setUpdateModel(modelId, modelName, description, modelType, fileSwagger, identify));
        }
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(ModelsDialog));
