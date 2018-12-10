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
 * Created by Krishalee on 16/11/18.
 */
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deviceImportRequest, getFileHistory } from "../funcs/actions";
import { REDUCER_NAME } from "../funcs/constants";
import { Upload, Button, Icon } from "antd";
import { withStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import MUIButton from "@material-ui/core/Button";
import MUIIcon from "@material-ui/core/Icon";
import _ from "lodash";
import { actions as msg } from "modules/messageCenter";
import { I18n } from "react-i18nify";
import { SearchSelect } from "../../common/index";
// import MappingComp from "./mappingComp";

const styles = theme => ({
    container: {
        display: "flex",
        flexWrap: "wrap"
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit
    },
    // dense: {
    //     marginTop: 19,
    // },
    root: {
        height: "calc(100% - 70px)"
        // width: "100%",
        // maxWidth: 550,
        // backgroundColor: theme.palette.background.paper,
    },
    content: {
        padding: theme.spacing.unit * 2,
        height: "calc(100% - 128px)",
        overflowY: "auto"
        // width:"100%"
    },
    footer: {
        textAlign: "right"
    },
    button: {
        margin: theme.spacing.unit,
        marginLeft: "auto"
    }
    // textField:{
    //     backgroundColor: theme.palette.background.paper,
    // }
});

const types = [
    {
        value: "All",
        label: "All"
    },
    {
        value: "DeviceTypes",
        label: "Device Types"
    },
    {
        value: "Applications",
        label: "Applications"
    },
    {
        value: "Address",
        label: "Address"
    },
    {
        value: "Devices",
        label: "Devices"
    }
];

class Uploadfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fileList: [],
            file: null,
            type: "All",
            acceptedfileTypes: ["xls", "xlsx", "xlsm"]
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.job !== this.props.job) {
            console.log(nextProps);
            this.closeHandle();
            this.props.getFileHistory(this.props.postData);
        }
    }

    handleSubmit = event => {
        // const { fileList } = this.state;
        this.props.fileUpload(this.state.file, { inputSheetsToLoad: this.state.type }, this.props.postData);
        //add a loading
    };

    handleRemove = file => {
        this.setState(({ fileList }) => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            return {
                fileList: newFileList
            };
        });
    };

    handlebeforeUpload = file => {
        this.setState(({ fileList }) => ({
            fileList: [...fileList, file]
        }));
        return false;
    };

    fileChangedHandler = event => {
        //check the file type
        let filename = event.file.name;
        let fileType = filename.split(".")[1];
        if (_.lastIndexOf(this.state.acceptedfileTypes, fileType) !== -1) {
            this.setState({
                file: event.file
            });
        } else {
            this.handleRemove(event.file);
            this.closeHandle();
            this.props.warnMessage("Only allows 'xls', 'xlsx', 'xlsm' types.", "Invalid file type!");
        }
    };

    handleChange = type => event => {
        this.setState({
            [type]: event.value
        });
    };

    closeHandle = () => {
        this.props.onClose();
    };

    render() {
        const { fileList, file } = this.state;
        const { classes } = this.props;

        return (
            <div className="importDrawer">
                <CardHeader
                    action={
                        <IconButton onClick={this.closeHandle.bind(this)}>
                            <MUIIcon>close</MUIIcon>
                        </IconButton>
                    }
                    title="Import file"
                    subheader=""
                />
                <Divider />
                <div className={classes.content}>
                    <form className={classes.container} noValidate autoComplete="off">
                        <SearchSelect
                            className="searchSelect"
                            // onSearch={this.handleSearch.bind(this)}
                            placeholder="Select Type"
                            onChange={this.handleChange("type")}
                            defaultValue={this.state.type}
                            // label="Select Tenant"
                            selectProps={{
                                isLoading: false,
                                multi: false,
                                openOnFocus: true
                            }}
                            options={types}
                        />
                        <Upload
                            className="importButton"
                            action=""
                            onRemove={this.handleRemove}
                            beforeUpload={this.handlebeforeUpload}
                            fileList={fileList}
                            file={file}
                            onChange={this.fileChangedHandler.bind(this)}
                            // accept={["xlsx", ".xls", "xlsm"]}        //API supports string not array
                            margin="normal"
                            fullWidth
                        >
                            <Button>
                                <Icon type="upload" /> Select File
                            </Button>
                        </Upload>
                    </form>
                </div>
                <div className={classes.footer}>
                    <MUIButton
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        onClick={this.closeHandle.bind(this)}
                    >
                        {I18n.t("common.Cancel")}
                    </MUIButton>
                    <MUIButton
                        disabled={this.state.fileList.length === 0}
                        onClick={this.handleSubmit.bind(this)}
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                    >
                        {/* {footerTitle || I18n.t("common.Save")} */}
                        Submit
                    </MUIButton>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownedProps) => {
    return state[REDUCER_NAME] || {};
};

const mapDispatchToProps = dispatch => {
    return {
        fileUpload: (file, uploadtype, postData) => {
            dispatch(deviceImportRequest(file, uploadtype, postData));
        },
        warnMessage: (val, name) => {
            dispatch(msg.warn(val, name));
        },
        getFileHistory: param => {
            dispatch(getFileHistory(param));
        }
    };
};

Uploadfile.propTypes = {
    classes: PropTypes.object
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(Uploadfile));
