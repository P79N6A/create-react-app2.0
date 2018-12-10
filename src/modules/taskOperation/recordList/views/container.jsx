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
 * Created by Chen Ling on 18/10/2018.
 */
import React, { Component } from "react";
// impo rt PropTypes from "prop-types";
import "../styles/recordList.less";
import RecordListTable from "./recordTable";
import RecordTab from "./recordTab";
import { view as Attachments } from "modules/taskOperation/attachments";
import BasicInfo from "./basicInfo";
// import {CardWithTitle} from "modules/basicCardComps";
// import {uploadFile, getBpmFiles, removeFile} from "../funcs/actions";
// import UploadFilePage from "./uploadFile";
import {REDUCER_NAME as recordListReducer} from "../funcs/constants";
import {connect} from "react-redux";
import { I18n } from "react-i18nify";
import { withStyles } from "@material-ui/core/styles";
const styles = theme => ({
    noData: {
        width: "100%",
        fontSize: "12px",
        minHeight: "48px",
        lineHeight: "48px",
        textAlign: "center",
        color: theme.palette.text.secondary
    },
    attchments: {
        height: "calc(100% - 350px)",
        marginBottom: "10px",
        boxShadow: theme.shadows[1]
    }
});
class RecordList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            identify: this.props.identify,
            recordList: this.props.recordList,
            record: this.props.taskList !==undefined ? this.props.taskList.length > 1 ? this.props.taskList[0] : {} : {},
            attachmentsRecord: {},
            // fileFilter: false,
            // taskId: 0,
            // isLoading: true,
            tabValue: 1,
            tabNames: {
                0: I18n.t("workflow.recordList.recordInfoName"),
                1: I18n.t("workflow.attachments.name")
            }
        };
    }
    componentWillReceiveProps(nextProps) {
        // console.log(nextProps);
        this.setState({
            tabValue: 1,
            attachmentsRecord: {}
        });
        if(nextProps.taskList !== this.props.taskList ){
            if(nextProps.taskList.length > 1){
                this.setState({
                    record: nextProps.taskList[0]
                });
            }else{
                this.setState({
                    record: {},
                });
            }
        }
            
        //     // this.getBpmFiles(this.props.identify, nextProps.recordList);
        // }
        
    };
    getRecordListData=()=>{
        let taskList = this.props.taskList;
        let recordList = [];
        if(taskList !== undefined && taskList.length > 1){
            taskList.map(item=>{
                if(item.status === "closed"){
                    // return item;
                    recordList.push(item);
                }
                return recordList;
            });
            // console.log(recordList);
            // recordList = taskList.slice();
            // recordList.pop();
            // console.log(recordList);
            return recordList;
        }else{
            return recordList;
        }
    };
    getFileByTaskId=(record)=>{
        // console.log(record);
        this.setState({
            // taskId: record.id,
            record: record,
            attachmentsRecord: record
            // fileFilter: true
        });
    };
    handleChange=(event, value)=>{
        // console.log(event, value);
        let tabNames = this.state.tabNames;
        this.setState({
            tabValue: value,
            tabName: tabNames[value],
            // currentTask: {}
        });
    };
    filterFileAll = ()=>{
        // console.log("filterFileAll");
        this.setState({
            record: {},
            attachmentsRecord: {}
        });
    }
    render() {
        const {classes, columnData} = this.props;
        // console.log(this.props);
        return (
            // <MuiThemeProvider theme={theme}>
            <div className="recordList"
            >
                {/* "recordList" */}
                <RecordListTable className="record-list-table"
                    columnData = {columnData}

                    datas = {this.getRecordListData()}
                    selected = {this.state.selected}
                    getFileByTaskId={this.getFileByTaskId.bind(this)}
                />
                <div className= {classes.attchments} >
                    <RecordTab
                        handleChange = {this.handleChange}
                        tabValue = {this.state.tabValue}
                        // tabTypes = {this.state.tabNames}
                    />
                    {this.state.tabValue === 0 && <div className="currentTaskBasicInfo">
                        {(this.state.record === undefined || Object.keys(this.state.record).length === 0) ? <div className={classes.noData}>
                            No data to display.
                        </div> : <BasicInfo 
                            identify = {this.props.identify}
                            recordData = {this.state.record}
                        />
                        }
                    </div>
                    }
                    {this.state.tabValue === 1 &&this.props.currentTask !== undefined ? Object.keys(this.props.currentTask).length ?  <div className="currentTaskAttachments">
                        <Attachments 
                            identify = {this.props.identify}
                            currentTask = {this.props.currentTask}
                            taskList = {this.props.taskList}
                            recordData = {this.state.attachmentsRecord}
                            // isFilter = {this.state.fileFilter}
                            filterFileAll = {
                                this.filterFileAll.bind(this)
                            }
                            alarmids = {this.props.alarmids}

                            alarmDetail = {this.props.alarmDetail}
                        />
                    </div> : this.state.tabValue === 1 && <div className="attachmentNoData">No file to display.</div> : null
                    }
                </div>
                
            </div>
            // </MuiThemeProvider>
        );
    }
};

RecordList.propTypes = {
    
};
RecordList.defaultProps = {
    columnData: [
        {
            "label": "Name",
            "indexKey": "assignee",
            "show": true
        },
        {
            "label": "Description",
            "indexKey": "name",
            "show": true
        },
        {
            "label": "Action Date",
            "indexKey": "enddate",
            "show": true
        }
    ]
};
const mapStateToProps = (state, ownProps) => {
    let identify = ownProps.identify;
    // console.log( state[attachmentsReducer][identify]);
    if(state[recordListReducer] && state[recordListReducer][identify]){
        return {
            // isLoading: state[recordListReducer][identify].isLoading,
            // fileInfoList: state[recordListReducer][identify].files,
            // isUploadFile: state[recordListReducer][identify].isUploadFile,
            columnData: state[recordListReducer].columnData
        };
    }else{
        return {
        };
    }
};
// const mapDispatchToProps = (dispatch) =>{
//     return {
//         // uploadFile: (identify, workData, file)=>{
//         //     dispatch(uploadFile(identify, workData, file));
//         // },
//         // getBpmFiles: (identify, alarmId)=>{
//         //     dispatch(getBpmFiles(identify, alarmId));
//         // },
//         // removeFile: (identify, alarm, fileId)=>{
//         //     dispatch(removeFile(identify, alarm, fileId));
//         // },
//     };
// };
export default connect(mapStateToProps, null)(withStyles(styles)(RecordList));