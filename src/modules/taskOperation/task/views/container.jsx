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
// import PropTypes from "prop-types";
// import { view as WorkFlowGraph } from "modules/taskOperation/flowChart";
// import TaskHead from "./taskHeader";
import Task from "./task";
import TaskTabs from "./taskTabs";
// import { MuiThemeProvider } from "@material-ui/core/styles";
// import { theme } from "modules/theme";
import {REDUCER_NAME as taskListReducer} from "../funcs/constants";
import {checkTask} from "../funcs/actions";
import { view as TaskFloatTabPage } from "modules/taskOperation/taskFloatTab";
import "../styles/container.less";
import {connect} from "react-redux";
import { I18n } from "react-i18nify";
import { withStyles } from "@material-ui/core/styles";
const styles = theme => ({
    paper: {
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary
    }
});

class WorkflowContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTask: this.props.checkTask,
            taskList: this.props.taskList,
            tabValue: 0,
            tabName: I18n.t("workflow.task.taskTabName"),
            tabNames: {
                0: I18n.t("workflow.task.taskTabName"),
                1: I18n.t("workflow.task.BackgroundJobName")
            },
            open: false,
            columnData: this.props.columnData,
            alarmids: ""
        };
        // console.log(this.state);
    };
    // componentWillMount(){
    //     getAbleWorkflow();
    //     console.log(getAbleWorkflow());
    // };
    componentWillReceiveProps(nextProps) {
        // console.log(nextProps);
        if(nextProps.checkTask){
            this.setState({
                currentTask: nextProps.checkTask,
            });
        };
    };
    handleChange=(event, value)=>{
        // console.log(event, value);
        let tabNames = this.state.tabNames;
        this.setState({
            tabValue: value,
            tabName: tabNames[value],
            currentTask: {}
        });
    };
    // toggleDrawerShow = ()=>{

    // };
    onCheckTask = (item) => {
        // console.log(item);
        this.setState({
            open: true
        });
        if (item) {
            this.setState({
                alarmids: item.alarmids
            });
            this.props.onCheckTask(this.props.identify, item);
        }
    };
    close=()=> {
        this.setState({
            open: false,
            alarmids: ""
        });
    };
    columnsChanged=()=>{

    }
    render() {
        // const { checkTask } = this.state.currentTask;
        // console.log(this.state);
        const {
            // classes, 
            // identify, 
            columnData, 
            // subTitle, 
            // title
        } = this.props;
        const {open} = this.state;
        return (
            // <MuiThemeProvider theme={theme}>
            <div className="workflowContainer" style={styles.paper}>

                <div className="taskBox">
                    <div className="taskList">

                        {/* <TaskHead 
                            identify = {identify}
                            subTitle = {subTitle}
                            title = {title}
                            classes = {classes}
                            refresh={this.refresh}
                            columnConfig= {this.props.columnData}
                            columnsChanged= {this.columnsChanged}
                        /> */}

                        <TaskTabs 
                            handleChange = {this.handleChange}
                            tabValue = {this.state.tabValue}
                        />

                        {this.state.tabName === I18n.t("workflow.task.taskTabName") ?
                            <Task 
                                identify={this.props.identify}
                                onCheckTask = {this.onCheckTask}
                                columnConfig= {columnData}
                            /> : null
                        }
                        
                    </div>
                    
                    {/* <div className="currentTaskBox">
                        <CurrentTaskPage
                            identify={this.props.identify}
                            workData = {this.state.currentTask}
                            // show = {this.state.show}
                        />
                    </div> */}
                    <TaskFloatTabPage
                        identify={this.props.identify}
                        alarmids = {this.state.alarmids}
                        toggleDrawerShow = {open}
                        // show = {this.state.show}
                        handleClose = {this.close.bind(this)}
                        alarmDetail = {false}
                    />

                </div>
            </div>
            // </MuiThemeProvider>
        );
    }
};
WorkflowContainer.propTypes = {
    // currentTask: PropTypes.object
};
const filterProps = (state, identify, reducerName, props) => {
    // console.log(state);
    // console.log(identify);
    // console.log(props);
    if (state[reducerName] && state[reducerName][identify]) {
        return state[reducerName][identify][props];
    }
};
const mapStateToProps = (state, ownProps) => {
    // console.log(ownProps);
    let identify = ownProps.identify;
    if(state[taskListReducer] && state[taskListReducer][identify]){
        return {
            identify: identify,
            checkTask: filterProps(state, identify, taskListReducer, "checkTask") || ownProps.checkTask,
            taskList: filterProps(state, identify, taskListReducer, "taskList") || ownProps.taskList,
            columnData: filterProps(state, identify, taskListReducer, "columnConfig") || ownProps.columnConfig,
            subTitle: filterProps(state, identify, taskListReducer, "subTitle") || ownProps.subTitle || "",
            title: filterProps(state, identify, taskListReducer, "title") || ownProps.title || I18n.t("workflow.task.taskTabName"),
        };
    }else{
        return {
            checkTask: {}
        };
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        onCheckTask: (identify, content) => {
            dispatch(checkTask(identify, content));
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(WorkflowContainer));
