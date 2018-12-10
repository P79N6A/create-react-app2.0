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
 * Created by Chen Ling on 15/10/2018.
 */
import React, {Component} from "react";
import Card from "@material-ui/core/Card";
import { withStyles } from "@material-ui/core/styles";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
// import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import moment from "moment";
import { I18n } from "react-i18nify";
const styles = {
    card: {
        width: "auto",
        // height: "240px",
        margin: "12px",
        textAlign: "left",
        position: "relative",
        fontSize: "12px",
        backgroundColor: "#464644",
        display: "flex",
        justifyContent: "flex-start",
        flexWrap: "nowrap",
    },
    media: {    
        // ⚠️ object-fit is not supported by IE11.
        width: "120px",
        height: "120px",
        objectFit: "cover",
        padding: "2%",
        textOverflow: "ellipsis",
        overFlow: "hidden",
        textAlign: "center"
        // paddingTop: "56.25%" // 16:9
    },
    cardContent: {
        paddingTop: "10px",
        paddingBottom: "0px",
        paddingLeft: "12px"
    },
    title: {
        fontSize: "14px",
        color: "rgba(255, 255, 255, 0.8)"
    },
    size: {
        fontSize: "14px",
        color: "rgba(255, 255, 255, 0.54)"
    },
    filename: {
        fontSize: "12px",

    },
    cardActions: {
        fontSize: "12px",
        padding: "0px",
        textAlign: "center",
    },
    button: {
        fontSize: "12px",
        textDecoration: "#03acb4"
    }
};
class FileCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fileName: "",
            fileSize: "",
            uploadTime: "",
            fileList: this.props.fileList
        };
    };
    removeButtoIsShow=(file)=>{
        // console.log(file);
        if(file.filename === "First File for Process.pdf" || file.filename === "Second File for Process.pdf" || file.filename === "First File for Task.pdf" || file.filename === "Second File for Task.pdf"){
            return false;
        }else{
            return true;
        }
    };
    getFileType=(type)=>{
        // console.log(type);
        if(type === undefined) return;
        let fileType = type.split(".")[1];
        if(fileType === "jpg" || fileType === "JPG" || fileType === "png" || fileType === "jpeg" || fileType === "PNG"){
            return "image";
        }else if(fileType === "pdf"){
            return "picture_as_pdf";
        }
    }
    render() {
        const {file, classes} = this.props;
        // console.log(file);
        return(
            <Card  className={classes.card} onClick={event =>event.stopPropagation()}>
                {/* <CardMedia className={classes.media} width="100%" component="p" title={`${file.filename}  ${(file.size / 1024).toFixed(1)}KB`} /> */}
                <div>
                    <i className="material-icons">
                        {this.getFileType(file.filename)}
                    </i>
                </div>
                <div>
                    <CardContent className={classes.cardContent}>
                        {/* <Typography className={classes.filename} component="p" title={file.filename}>
                            {file.filename ? file.filename : "--/--"}
                        </Typography> */}
                        {/* <Typography color="textSecondary">size: {(file.size / 1024).toFixed(1)}KB</Typography> */}
                        

                        {/* <div> */}
                        <div className={classes.title}>
                            {file.filename ? file.filename : "--/--"}&nbsp;&nbsp;
                            {/* <span className={classes.size}></span> */}
                            <span className={classes.size}> ({(file.size / 1024).toFixed(1)}KB)</span>
                        </div>


                        <Typography color="textSecondary"> Added by:{file.useid}</Typography>

                        <Typography color="textSecondary"> {moment(file.uploadtime).format("HH:mm:ss YYYY-MM-DD")}</Typography>
                        {/* </div> */}
                    </CardContent>
                    <CardActions  className={classes.cardActions}>
                        <Button
                            className={classes.button}
                            size="small"
                            color="secondary"
                            onClick={event =>this.props.downloadFile( file.urlDown)}
                            // disabled={file.filename ? false : true}
                        >
                            {/* Download */}
                            {I18n.t("workflow.attachments.Download")}
                        </Button>
                        {this.removeButtoIsShow(file)&&
                        <span style={{color: "rgba(255, 255, 255, 0.8)"}}> | </span>
                        }
                        {this.removeButtoIsShow(file)&&<Button
                            className={classes.button}
                            size="small"
                            color="secondary"
                            onClick={event =>this.props.removeFile(file.fileid)}
                            // disabled={file.filename ? false : true}
                        >
                            
                            {/* Remove */}
                            {I18n.t("workflow.attachments.Remove")}
                        </Button>
                        }
                    </CardActions>
                </div>
            </Card>
        );
    }
}
export default withStyles(styles)(FileCard);