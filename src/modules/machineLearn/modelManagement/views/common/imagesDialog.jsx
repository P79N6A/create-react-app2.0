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
import { setOpenDialog } from "../../funcs/actions";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

import FormControl from "@material-ui/core/FormControl";
import { Input, InputLabel, Button, Select } from "modules/common";
import FormHelperText from "@material-ui/core/FormHelperText";
import MenuItem from "@material-ui/core/MenuItem";

const maxWidth = 600;
const minWidth = 600;

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 500
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
    file: {
        display: "none"
    }
});

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class ImagesDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            enableGPU: false,
            name: "",
            nameFlag: false,
            selectModel: [],
            runtime: [],
            scoringFile: "",
            scoringFileFlag: false,
            condaFile: "",
            condaFileFlag: false
        };
    }

    handleClose = () => {
        this.props.onSetOpenDialog(false);
    };

    handleChange = name => event => {
        let value = event.target.value;
        if (name === "enableGPU") {
            this.setState({
                enableGPU: event.target.checked
            });
        } else {
            this.setState({
                [name]: value
            });
        }
       
        let flag = `${name}Flag`;
        let reg = /[\w]{2,50}/;
        if (value && reg.test(value)) {
            this.setState({ [flag]: false });
        } else {
            this.setState({ [flag]: true });
        }
    };

    handleFile = name => event => {
        let value = event.target.value;
        let flag = `${name}Flag`;
        if (value) {
            this.setState({
                [name]: value,
                [flag]: false
            });
        } else {
            this.setState({
                [name]: value,
                [flag]: true
            });
        }
    };

    render() {
        const { classes } = this.props;
        const { name, nameFlag, selectModel, description, runtime, enableGPU, scoringFile, condaFile } = this.state;
        return (
            <div>
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
                    <DialogTitle id="alert-dialog-slide-title">Images</DialogTitle>
                    <DialogContent style={{ height: "100%" }}>
                        <div
                            style={{
                                width: "100%",
                                height: "100%"
                            }}
                        >
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="select-multiple">Select Model</InputLabel>
                                <Select
                                    value={selectModel}
                                    name="selectModel"
                                    onChange={this.handleChange("selectModel")}
                                    MenuProps={MenuProps}
                                    style={{ width: "95%" }}
                                >
                                    <MenuItem value="VirtualMachine">Virtual Machine</MenuItem>
                                    <MenuItem value="AzureBatchAI">Azure Batch AI</MenuItem>
                                    <MenuItem value="AzureKubernetesServiceAKS">Azure Kubernetes Service AKS</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl className={classes.formControl}>
                                <InputLabel>Images Name</InputLabel>
                                <Input
                                    type="text"
                                    error={nameFlag}
                                    value={name}
                                    onChange={this.handleChange("name")}
                                    style={{ width: "95%" }}
                                />
                                {nameFlag ? (
                                    <FormHelperText className={classes.textError}>Please enter name</FormHelperText>
                                ) : null}
                            </FormControl>

                            <FormControl className={classes.formControl}>
                                <InputLabel>Images Description</InputLabel>
                                <Input
                                    type="text"
                                    value={description}
                                    onChange={this.handleChange("description")}
                                    style={{ width: "95%" }}
                                />
                            </FormControl>

                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="select-multiple">Runtime</InputLabel>
                                <Select
                                    value={runtime}
                                    name="runtime"
                                    onChange={this.handleChange("runtime")}
                                    MenuProps={MenuProps}
                                    style={{ width: "95%" }}
                                >
                                    <MenuItem value="5">5s</MenuItem>
                                    <MenuItem value="30">30s</MenuItem>
                                    <MenuItem value="45">45s</MenuItem>
                                    <MenuItem value="60">60s</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl className={classes.formControl}>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={enableGPU}
                                            onChange={this.handleChange("enableGPU")}
                                            value="enableGPU"
                                            color="secondary"
                                        />
                                    }
                                    label="Enable GPU"
                                />
                            </FormControl>

                            <FormControl className={classes.formControl}>
                                <label htmlFor="scoring-file">
                                    <Input
                                        id="scoring-file"
                                        multiple
                                        type="file"
                                        onChange={this.handleFile("scoringFile")}
                                        value={scoringFile}
                                        className={classes.file}
                                    />

                                    <Input
                                        type="text"
                                        value={scoringFile}
                                        onChange={this.handleChange("scoringFile")}
                                        style={{ width: "78%" }}
                                        readOnly
                                        placeholder="Scoring File"
                                        //error={ !Boolean(scoringFile) }
                                    />

                                    <Button color="secondary" component="span" className={classes.button}>
                                        Browse
                                    </Button>
                                </label>

                                {/* {!Boolean(scoringFile) ? (
                                    <FormHelperText className={classes.textError}>Please select file</FormHelperText>
                                ) : null} */}
                            </FormControl>

                            <FormControl className={classes.formControl}>
                                <label htmlFor="conda-file">
                                    <Input
                                        id="conda-file"
                                        multiple
                                        type="file"
                                        onChange={this.handleFile("condaFile")}
                                        value={condaFile}
                                        className={classes.file}
                                    />

                                    <Input
                                        type="text"
                                        value={condaFile}
                                        onChange={this.handleChange("condaFile")}
                                        style={{ width: "78%" }}
                                        //error={ !Boolean(condaFile) }
                                        readOnly
                                        placeholder="Conda File"
                                    />

                                    <Button color="secondary" component="span" className={classes.button}>
                                        Browse
                                    </Button>
                                </label>

                                {/* {!Boolean(condaFile) ? (
                                    <FormHelperText className={classes.textError}>Please select file</FormHelperText>
                                ) : null} */}
                            </FormControl>
                        </div>
                    </DialogContent>
                    <DialogActions className={classes.buttonAction}>
                        <Button onClick={this.handleClose}>Cancel</Button>
                        <Button onClick={this.handleClose} color="secondary" variant="contained">
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    if (state[REDUCER_NAME]) {
        return {
            isOpenDialog: state[REDUCER_NAME].isOpenDialog
        };
    }
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onSetOpenDialog: open => {
            dispatch(setOpenDialog(open, props.identify));
        }
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(ImagesDialog));
