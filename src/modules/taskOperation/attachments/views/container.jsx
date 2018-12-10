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
import React, { Component } from "react";
// impo rt PropTypes from "prop-types";
// import Icon from "@material-ui/core/Icon";
// import Button from "@material-ui/core/Button";
// import IconButton from "@material-ui/core/IconButton";
import "../styles/attachments.less";
// import { MuiThemeProvider } from "@material-ui/core/styles";
// import { theme } from "modules/theme";
// import {CardWithTitle} from "modules/basicCardComps";
import {uploadFile, getBpmFiles, removeFile, getBpmFilesByTaskId} from "../funcs/actions";
import UploadFilePage from "./uploadFile";
import {REDUCER_NAME as attachmentsReducer} from "../funcs/constants";
import {connect} from "react-redux";
class Attachments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            identify: this.props.identify,
            alarm: {},
            alarmId: "",
            isLoading: false,
            fileInfoList: []
            // bpmfiles: []
        };
    }
    componentWillMount() {
        let identify = this.props.identify;
        let alarmId = this.props.alarmids;
        // let bpmevents = this.props.bpmevents;
        // if(!this.props.isUploadFile) return false;
        if(alarmId !== undefined) {
            this.getBpmFiles(identify, alarmId);
        }
    };
    getBpmFiles=(identify, alarmId)=>{
        // console.log("getBpmFiles");
        this.setState({
            isLoading: true
        });
        this.props.getBpmFiles(identify, alarmId);
    };
    getBpmFilesByTaskId=(identify, taskId)=>{
        this.setState({
            isLoading: true
        });
        this.props.getBpmFilesByTaskId(identify, taskId);
    }
    componentWillReceiveProps(nextProps) {
        // console.log("attachments", nextProps);
        // if(nextProps.isLoading !== undefined){
        // }
        if(nextProps.taskList !== undefined && nextProps.taskList !== this.props.taskList &&nextProps.taskList.length === 2){
            // this.setState({
            //     attatchmentsIsLoading: nextProps.attatchmentsIsLoading,
            // });
            let alarmId = nextProps.currentTask.alarmids;
            // let bpmevents = nextProps.alarm.bpmevents; 
            this.getBpmFiles(this.props.identify, alarmId);
        }
        if(Object.keys(nextProps.recordData).length === 0){
            // console.log("recordData");
            let taskId = -1;
            this.getBpmFilesByTaskId(this.props.identify, taskId);
        }
        if(nextProps.recordData !== undefined && (nextProps.recordData !== this.props.recordData)){
            // this.setState({
            //     attatchmentsIsLoading: nextProps.attatchmentsIsLoading,
            // });
            // let alarmId = nextProps.alarm.alarmids;
            // let bpmevents = nextProps.alarm.bpmevents; 
            if(nextProps.recordData.id){
                this.getBpmFilesByTaskId(this.props.identify, nextProps.recordData.id);
            }else{
                let taskId = -1;
                this.getBpmFilesByTaskId(this.props.identify, taskId);
            }
        }
        if(nextProps.currentTask !== this.props.currentTask){
            this.setState({
                // alarm: nextProps.alarm,
                alarmId: nextProps.alarmids,
                // bpmevents: nextProps.bpmevents
                // attatchmentsIsLoading: nextProps.attatchmentsIsLoading
            });
            let alarmId = nextProps.alarmids;
            // let bpmevents = nextProps.alarm.bpmevents; 
            this.getBpmFiles(this.props.identify, alarmId);
        }
        // if(nextProps.files && nextProps.bpmfiles){
        let files = nextProps.files;
        let bpmfiles = nextProps.bpmfiles;
        // console.log(files);
        // console.log(bpmfiles);
        let filterBpmFiles = [];
        if(bpmfiles === undefined || Object.keys(nextProps.recordData) === 0){
            this.setState({
                fileInfoList: files
            });
        }else if( bpmfiles.length === 0){
            this.setState({
                fileInfoList: []
            });
        }else{
            bpmfiles.map(fileId=>{
                files.filter(item=>{
                    if(item.fileid === fileId){
                        // console.log(item);
                        filterBpmFiles.push(item);
                    }
                    return true;
                });
                return true;
            });
            // console.log(filterBpmFiles);
            this.setState({
                fileInfoList: filterBpmFiles
            });
        }
        
        this.setState({
            isLoading: nextProps.isLoading
        });
        // }
    };
    uploadFile=(file)=>{
        // console.log(file);
        this.setState({
            isLoading: true
        });
        let {identify, currentTask} = this.props;
        // if(currentTask === "") return false;
        
        this.props.uploadFile(identify, currentTask, file);
    };
    removeFile=(fileId)=>{
        const {identify, allBpmfiles} = this.props; 
        let alarm = {};
        allBpmfiles.map(item=>{
            if(item.fileid === fileId){
                alarm = item;
            }
            return true;
        });
        // console.log(alarm);
        this.setState({
            isLoading: true
        });
        this.props.removeFile(identify, alarm, fileId);
    };
    downloadFile=(downUrl)=>{
        window.open(downUrl, "_self");
    };
    render() {
        const { identify } = this.props;
        // console.log(this.state.isLoading);
        return (
            // <MuiThemeProvider theme={theme}>
            <div className="attachemnts">
                {/* <CardWithTitle title="Attachments" dark> */}
                    
                <UploadFilePage
                    identify = {identify}
                    uploadFile = {
                        this.uploadFile
                    }
                    fileList = {this.state.fileInfoList}
                    removeFile = {this.removeFile}
                    downloadFile = {this.downloadFile}
                    loading = {this.state.isLoading}
                    isUploadFile = {this.props.isUploadFile}
                    recordData = {this.props.recordData}
                    filterFileAll = {this.props.filterFileAll}
                />
                {/* </CardWithTitle> */}
            </div>
            // </MuiThemeProvider>
        );
    }
};

Attachments.propTypes = {
    
};
const mapStateToProps = (state, ownProps) => {
    let identify = ownProps.identify;
    // console.log(state[attachmentsReducer]);
    // console.log( state[attachmentsReducer][identify]);
    if(state[attachmentsReducer] && state[attachmentsReducer][identify]){
        return {
            isLoading: state[attachmentsReducer][identify].isLoading,
            files: state[attachmentsReducer][identify].files,
            bpmfiles: state[attachmentsReducer][identify].bpmfiles,
            isUploadFile: state[attachmentsReducer][identify].isUploadFile,
            allBpmfiles: state[attachmentsReducer][identify].allFiles,
        };
    }else{
        return {
        };
    }
};
const mapDispatchToProps = (dispatch) =>{
    return {
        uploadFile: (identify, currentTask, file)=>{
            dispatch(uploadFile(identify, currentTask, file));
        },
        getBpmFiles: (identify, alarmId)=>{
            dispatch(getBpmFiles(identify, alarmId));
        },
        removeFile: (identify, currentTask, fileId)=>{
            dispatch(removeFile(identify, currentTask, fileId));
        },
        getBpmFilesByTaskId: (identify, taskId)=>{
            dispatch(getBpmFilesByTaskId(identify, taskId));
        },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Attachments);