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
import React, {Component}from "react";
import PropTypes from "prop-types";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";
import Moment from "moment";
import Button from "@material-ui/core/Button";
import "../styles/taskItem.less";
// import Theme from "commons/components/theme";
class TaskItem extends Component {
// const TaskItem = ({task, onCheck})=>{
    // console.log(task)
    getTaskSeverity = (value)=>{
        // console.log(value);
        if(value === "1"){
            return "critical";
        } else if(value === "2"){
            return "major";
        }else if(value === "3"){
            return "minor";
        }else if(value === "4"){
            return "info";
        }else if(value === "5"){
            return "clear";
        }else if(value === "6"){
            return "reading";
        }else{
            return "unknown";
        }

    }
    render(){
        const{task, onCheck} = this.props;
        return (
            <ExpansionPanel className="task">
                <ExpansionPanelSummary 
                    className="tasksummary" 
                    expandIcon={
                        <Icon className="arrow_down">
                            keyboard_arrow_down 
                        </Icon>
                    }
                >
                    {/* <div className="taskSeverity">
                        <i className={this.getTaskSeverity(task.alarmseverity)}>
                        </i>
                    </div> */}
                    <i className={this.getTaskSeverity(task.alarmseverity)}>
                    </i>
                    <Typography>
                        {task.name}
                    </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className="taskList-p">
                    <div className="itemBox">
                        <Typography component="p">
                            Name:{task.assignee}
                        </Typography>
                        <Typography component="p">Description:{task.name}</Typography>
                        <Typography component="p">
                        Action Date:{Moment(task.createtime).format("hh:mm:ss DD-MM-YYYY")}</Typography>
                    </div>
                    <Button size="small" onClick={onCheck}>Check</Button>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        );
    }
};
TaskItem.propTypes = {
    task: PropTypes.object.isRequired,
    onCheck: PropTypes.func.isRequired
};
export default TaskItem;