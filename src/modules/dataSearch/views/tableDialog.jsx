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
 * Created by HuLin on 05/08/2018.
 */
import React from "react";
import "../styles/style.less";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { REDUCER_NAME as dataSearch } from "../funcs/constants";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { I18n } from "react-i18nify";

import Slide from "@material-ui/core/Slide";

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

function copyContainer() {
    
    const range = document.createRange();
    let nodeName = document.getElementById("Container");
    range.selectNode(nodeName);
    const selection = window.getSelection();
    if (selection.rangeCount > 0) 
        selection.removeAllRanges(); 
    selection.addRange(range);
    document.execCommand("copy");
     
        
}

function copyFile() {
    
    const range = document.createRange();
    let nodeName = document.getElementById("FileSASURL");
    range.selectNode(nodeName);
    const selection = window.getSelection();
    if (selection.rangeCount > 0) 
        selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand("copy");
}


function copyPath() {
    
    const range = document.createRange();
    let nodeName = document.getElementById("PathFolder");
    range.selectNode(nodeName);
    const selection = window.getSelection();
    if (selection.rangeCount > 0) 
        selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand("copy");
}


const styles = theme => ({
    background: {
        backgroundColor: theme.palette.background.paper,
        margin: "0px",
        color: theme.palette.text.primary +" !important"
    },
    color: {
        color: theme.palette.text.primary +" !important"
    },
    button: {
        color: theme.palette.secondary.main
    },
    copyButton: {
        background: theme.palette.background.paper,
        border: "0px",
        color: theme.palette.text.secondary,
        cursor: "pointer"
    },
});

class TableDialog extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: this.props.open
        };
    }

    handleContainer = () =>  {
        copyContainer();   
    }

    handlePath = () =>  {

        copyPath();   
    }

    handleFile = () =>  {

        copyFile();   
    }

    handleClose = () => {
        this.setState({ open: !this.state.open });

        let flag = !this.state.open;

        this.props.closeChildren(flag);
    };

    render () {
        const { classes, jobResult, jobResultFileUrl } = this.props;
        return (
            <Dialog
                open={this.state.open}
                TransitionComponent={Transition}
                disableBackdropClick
                onClose={this.handleClose.bind(this)}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title" className= {classes.background}>
                    <span className={classes.color}>
                        {I18n.t("dataExport.dialog.viewOrDownloadFile")}
                    </span> 
                </DialogTitle>

                {   jobResultFileUrl &&
                    jobResultFileUrl === "No file exported" ?
                    <DialogContent className= {classes.background}>
                        <DialogContentText id="alert-dialog-slide-description" className= {classes.background}>
                            {I18n.t("dataExport.dialog.noFileExported")}
                        </DialogContentText>                                                                 
                    </DialogContent>
                    :
                    <DialogContent className= {classes.background}>
                        <DialogContentText id="alert-dialog-slide-description" className= {classes.background}>
                            { jobResult.jobResult.Description }
                        </DialogContentText>
                           
                        <DialogContentText id="alert-dialog-slide-description" className= {classes.background}>
                            <span className="text">
                                <span className={classes.button}>
                                    {I18n.t("dataExport.dialog.containerSasUrl")} 
                                </span>
                                <textarea className = "folder" cols="50" rows="1" id="Container" value={jobResult.jobResult["Container SAS URL"]} readOnly>
                                </textarea> 
                                <button onClick={this.handleContainer}  className={classes.copyButton}> 
                                    {I18n.t("dataExport.dialog.copyButton")}
                                </button>
                            </span>  
                        </DialogContentText> 

                        <DialogContentText id="alert-dialog-slide-description" className= {classes.background}>
                            <span className="text">
                                <span className={classes.button}>
                                    {I18n.t("dataExport.dialog.pathFolder")} 
                                </span>
                                <textarea className = "folder" cols="50" rows="1" id="PathFolder" value={ jobResult.jobResult.Folder } readOnly>    
                                </textarea>  
                                <button onClick={this.handlePath} className={classes.copyButton} > 
                                    {I18n.t("dataExport.dialog.copyButton")} 
                                </button>     
                            </span>                 
                        </DialogContentText> 

                        <DialogContentText id="alert-dialog-slide-description" className= {classes.background}>        
                            <span className="text">
                                <span className={classes.button}>
                                    {I18n.t("dataExport.dialog.fileSasUrl")} 
                                </span>
                                <textarea className = "folder" id="FileSASURL" cols="50" rows="1" value={ jobResult.jobResult["File URL"] }  readOnly>    
                                </textarea>
                                <button onClick={this.handleFile}  className={classes.copyButton}> 
                                    {I18n.t("dataExport.dialog.copyButton")} 
                                </button>
                                <a href={jobResult.jobResult["File URL"]} > 
                                    {I18n.t("dataExport.dialog.download")}
                                </a>
                            </span>              
                        </DialogContentText>                                 
                    </DialogContent>                         
                }  
                <DialogActions className= {classes.background}>
                    <Button onClick={this.handleClose.bind(this)} className={classes.button}>
                        {I18n.t("dataExport.dialog.close")}
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    if(state[dataSearch] &&  state[dataSearch].configvalname){
        return {
            jobResult: state[dataSearch].jobResult || {},
        };
    }else{
        return {
            jobResult: {},
        };
    }
};

export default connect(
    mapStateToProps,
    null
)(withStyles(styles)(TableDialog));