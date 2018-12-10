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
import "../styles/currentTask.less";
// import WorkflowTool from "./workflowTool";
import CurrentContentTask from "./current";
// import { MuiThemeProvider } from "@material-ui/core/styles";
// import { theme } from "modules/theme";

import WorkflowTabs from "./workflowTab";

import { view as FlowChart } from "modules/taskOperation/flowChart";
import { view as RecordList } from "modules/taskOperation/recordList";
// import { view as ReassignList } from "modules/taskOperation/reassign";

// import MessagePage from "./message";
// import Theme from "commons/components/theme";
// import { LinearProgress } from "@material-ui/Progress";
import {taskChange, taskSubmit } from "../funcs/actions";
// import {CardWithTitleAction} from "modules/basicCardComps";
// import { success, error} from "modules/messageCenter/funcs/actions";
import {currentTaskList, getTaskPdfFile} from "../funcs/actions";
import {REDUCER_NAME as currentTaskReducer} from "../funcs/constants";
import {connect} from "react-redux";
import { I18n } from "react-i18nify";
import { withStyles } from "@material-ui/core/styles";
const styles = theme => ({
    currentTaskRecordList:{
        width: "100%",
        height: "calc(100% - 232px)",
        padding: "0 24px",
        overflow: "auto",
        color: theme.palette.text.primary
    },
    noData: {
        // height: "100%",
        fontSize: "12px",
        paddingTop: "5%",
        color: "#959595",
        textAlign: "center"
    },
    workflowTabs: {
        marginBottom: "3px",
        boxShadow: theme.shadows[1]
    }
});
class CurrentTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            workflowTitle: I18n.t("workflow.currentTask.workflowName"),
            identify: this.props.identify,
            alarmids: this.props.alarmids,
            currentTask: {},
            selectedRadio: this.props.selectedRadio,
            errorMessagess: "",
            workflowShow: false,
            taskList: [],
            tabValue: 0,
            tabNames: {
                0: I18n.t("workflow.task.taskTabName"),
                1: I18n.t("workflow.recordList.name"),
                2: I18n.t("workflow.task.escalateTabName"),
                3: I18n.t("workflow.task.reassignTabName")
            },
            tabTypes: [I18n.t("workflow.task.taskTabName"), I18n.t("workflow.recordList.name")
                // I18n.t("workflow.task.escalateTabName"), I18n.t("workflow.task.reassignTabName")
            ],
            processdefinitionid: "",
            closed: false
        };
    }
    getWorkflowGraph (identify, alarmids) {
        // console.log("any");
        this.props.getGraph(identify, alarmids);
    };
    componentDidMount() {
        let identify = this.props.identify;
        let alarmids = this.props.alarmids;
        this.getWorkflowGraph(identify, alarmids);
    };
    // componentDidUpdate(){
    //     this.getWorkflowGraph(this.props.identify, this.state.workData);
    // };
    componentWillReceiveProps(nextProps) {
        // console.log(nextProps);
        if(nextProps.alarmids !== this.props.alarmids){
            this.setState({
                alarmids: nextProps.alarmids,
                taskList: nextProps.taskList
            });
            let alarmids = nextProps.alarmids;
            this.getWorkflowGraph(this.props.identify, alarmids);
        }
        if(nextProps.taskList !== undefined && nextProps.taskList.length > 0){
            let taskData = nextProps.taskList;
            taskData.map(n=>{
                if(n.status === "open"){
                    return this.setState({
                        currentTask: n,
                        taskId: n.id
                    });
                }else{
                    return this.setState({
                        currentTask:{
                            status: "closed",
                            taskId: ""
                        },
                    });
                }
            });
            taskData.filter(item=>{
                if(item.status === "open"){
                    this.setState({
                        closed: false,
                    });
                }else{
                    this.setState({
                        closed: true,
                        currentTask: taskData[taskData.length - 1]
                    });
                }
                return true;
            });
            this.setState({
                selectedRadio: nextProps.selectedRadio,
                workflowShow: true,
                taskList: nextProps.taskList,
                processdefinitionid: taskData[0].processdefinitionid
            });
        } else {
            this.setState({
                currentTask: {},
                workflowShow: false,
                taskList: nextProps.taskList
            });
        }
        // console.log(this.state);
        if(nextProps.message !== undefined && nextProps.message !== this.props.message){
            if(nextProps.message.type === "success"){
                this.props.changeSuccessMessageBox(nextProps.message.message);
            }else if(nextProps.message.type === "error"){
                this.setState({
                    errorMessagess: nextProps.message.message,
                    workflowShow: false
                });
                // this.props.changeErrorMessageBox(nextProps.message.message);
            }
        }
        if(nextProps.taskList !== undefined && nextProps.taskList !== this.props.taskList && nextProps.taskList.length === 1){
            let fileIds = [nextProps.taskList[0].file_id3.file_id, nextProps.taskList[0].file_id4.file_id];
            // console.log(fileIds);
            this.props.getTaskPdfFile(this.props.identify, fileIds);
            this.setState({
                taskList: nextProps.taskList,
                tabValue: 0
            });
        }
        this.setState({
            tabValue: 0
        });
    };
    onContentSubmit(identify, currentTask){
        this.props.onContentSubmit(identify, currentTask);   
    };
    // getTaskData(){
    //     let taskData = this.props.currentTask;
    //     taskData.map(n=>{
    //         if(n.status === "open"){
    //             return this.setState({
    //                 currentTask: n
    //             });
    //         }else{
    //             return this.setState({
    //                 currentTask:{
    //                     status: "closed"
    //                 },
    //             });
    //         }
    //     });
    // };
    closeWorkflow=()=>{
        this.setState({
            workflowShow: false
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
    render() {
        // console.log(this.state);
        // let opt = {
        //     // buttons:[
        //     //     {
        //     //         name: (currentTask && currentTask.l_b_submit) || "SUBMIT"
        //     //     }
        //     // ],
        //     // expandContent: true,
        //     border: true,
        //     dark: false,
        //     title: "",
        //     // iconClickParentHandle: this.iconClickParentHandle(),
        // };
        // console.log(this.state);
        let taskOperationShow = this.state.currentTask!==undefined ? this.state.currentTask.status === "open" ? "open" : "" : "";
        // let workflowShow = this.state.alarmids !==undefined ? Object.keys(this.state.workData).length === 0 || this.state.workData.alarmids === undefined ||!this.state.workflowShow ? false : true : false;
        let workflowShow = this.state.alarmids === "" ? false : true;
        // console.log(this.state);
        const {classes} =this.props;
        // let ableWorkflow = sessionStorage.getItem("ISC-SETTINGS").sopAction;
        // console.log(ableWorkflow);
        // console.log(this.props);
        let ableWorkflow = JSON.parse(sessionStorage.getItem("ISC-SETTINGS")).sopAction.ableWorkflow;
        // console.log(ableWorkflow);
        return (
            ableWorkflow && <div className="current-content">
                {/* <CardWithTitleAction 
            //     className="current-content" 
            //     {...opt}
            // > */}
                {/* {workflowShow &&
                <div className="WorkflowTool">
                    <WorkflowTool
                        title = {this.state.workflowTitle}
                        closeWorkflow = {this.closeWorkflow}
                    />
                </div>
                
                } */}
                {workflowShow ? <div className="currentTask">

                    <div className="currentFlowChart">
                        <FlowChart
                            identify={this.state.identify}
                            alarmids = {this.props.alarmids}
                            processdefinitionid = {
                                this.state.processdefinitionid
                            }
                            // taskList = {this.state.taskList}
                        />
                    </div>
                    
                    <div className={classes.workflowTabs}>
                        <WorkflowTabs 
                            handleChange = {this.handleChange}
                            tabValue = {this.state.tabValue}
                            tabTypes = {this.state.tabTypes}
                        />        
                    </div>
                    
                    {(taskOperationShow === "open" &&  this.state.tabValue === 0) ?
                        <div className="currentTaskOperation">
                            <CurrentContentTask
                                identify = {this.state.identify}
                                currentTask={this.state.currentTask}
                                selectedRadio={
                                    this.state.selectedRadio
                                }
                                onContentSubmit = {
                                    this.onContentSubmit.bind(this)
                                }
                                onChangeTask = {
                                    this.props.onChangeTask
                                }
                                // errorMessagess = {this.state.errorMessagess}
                                alarm = {this.state.alarmids}
                                // show = {this.props.show}
                                intialFileList = {this.props.intialFileList}
                                alarmDetail = {this.props.alarmDetail}

                            /> 
                        </div> : this.state.tabValue === 0 &&
                        <div className={classes.noData}> 
                            No steps to complete.
                        </div>
                    }
                    {this.state.tabValue === 1 &&
                        <div className={classes.currentTaskRecordList}>
                            <RecordList 
                                identify = {this.state.identify}

                                alarmids = {this.props.alarmids}
                                
                                taskList = {this.state.taskList}

                                currentTask = {this.state.currentTask}

                                alarmDetail = {this.props.alarmDetail}
                            />
                        </div>
                    }
                    {/* {(this.state.tabValue === 3 && this.state.taskId) &&
                        <div className={classes.currentTaskReassignList}>

                            <ReassignList 
                                identify = {this.state.identify} taskId = {this.state.taskId}
                            />

                        </div> 
                    } */}
                </div> : (this.state.alarmids === "" || this.state.errorMessagess === "") ? 
                    <div className="current-content">
                    Please select task to view the detail
                    </div> : <div className="current-content">{this.state.errorMessagess}
                    </div>
                }
                {/* // </CardWithTitleAction> */}
            </div>
        );
    }
};

CurrentTask.propTypes = {
};
const mapStateToProps = (state, ownProps) => {
    let identify = ownProps.identify;
    if(state[currentTaskReducer] && state[currentTaskReducer][identify]){
        // let length = state[currentTaskReducer].tasks.length;
        return {
            selectedRadio: state[currentTaskReducer][identify].selectedRadio || "true",
            taskList: state[currentTaskReducer][identify].tasks,
            intialFileList: state[currentTaskReducer][identify].intialFileList,
            message: state[currentTaskReducer] !== undefined ? (state[currentTaskReducer][identify] !== undefined ? (state[currentTaskReducer][identify].message!=="" ? state[currentTaskReducer][identify].message : "") : "") : ""
        };
    }else{
        return {
            // selectedRadio: {},
            currentTask: [],
        };
    }
};
const mapDispatchToProps = (dispatch) =>{
    return {
        getGraph:(identify, alarmids) => {
            dispatch(currentTaskList(identify, alarmids));
        },
        onContentSubmit:(identify, content) =>{
            dispatch(taskSubmit(identify, content));
        },
        onChangeTask:(identify, value)=>{
            dispatch(taskChange(identify, value));
        },
        getTaskPdfFile: (identify, fileId)=>{
            dispatch(getTaskPdfFile(identify, fileId));
        },
        // getXml: (identify, content) => {
        //     dispatch(getCurrentTaskXml(identify, content));
        // },
        // changeErrorMessageBox: (message) => {
        //     dispatch(error(message));
        // },
        // changeSuccessMessageBox: (message) => {
        //     dispatch(success(message));
        // }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CurrentTask));