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
import React, { Component }from "react";
import PropTypes from "prop-types";
// import { withStyles } from "@material-ui/core/styles";
import "../styles/taskList.less";
// import Theme from "commons/components/theme";
import Paper from "@material-ui/core/Paper";
import TaskItem from "./taskItem";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
// import {checkTask, searchTextChange} from "../funcs/actions";
// import {REDUCER_NAME as workflowReducer} from "../funcs/constants";
// import {connect} from "react-redux";


// const TaskList = ({tasks, onCheckTask})=>
class TaskList extends Component{
   
    render(){
        const { tasks, loading} = this.props;
        // let tasks = this.props.tasks;
        // if(tasks){
        //     this.sortCreateDate(tasks);
        // };
        // console.log(tasks);
        return (
            <div>
                <Paper className="usertask-content">
                    <div className="items">
                        {tasks && tasks.map( item => {
                            return (
                                <TaskItem 
                                    task={item} 
                                    key={item.id} 
                                    onCheck ={()=> this.props.onCheckTask(item)}
                                />
                            );
                        })}
                        {/* {tasks === undefined || tasks.length === 0 ? <div className="tasks-list">
                            No data to display.
                        </div> : null
                        } */}
                        
                    </div>
                    {loading ? 
                        <div className="progress-cont">
                            <CircularProgress color="secondary" />
                        </div>
                        : tasks && tasks.length > 0 ? null : 
                            <Typography variant="caption" gutterBottom align="center" className="progress-cont">
                                No data to display.
                            </Typography>
                    
                    }
                </Paper>
            </div>
        );
    }
};

TaskList.propTypes = {
    tasks: PropTypes.array,
    onCheckTask: PropTypes.func
};



export default TaskList;
