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
import { getWorkflowGraph } from "../funcs/actions";
import "../styles/workflow.less";
import Flow from "./flow";
// import { MuiThemeProvider } from "@material-ui/core/styles";
// import { theme } from "modules/theme";
import {REDUCER_NAME as flowChartReducer} from "../funcs/constants";
import {REDUCER_NAME as currentReducer} from "modules/taskOperation/currentTask/funcs/constants";
import {connect} from "react-redux";
// import Theme from "commons/components/theme";

class WorkFlow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            taskList: this.props.taskList,
            xml: this.props.xml,
            // request: false
        };
        // console.log(this.state);
    };
    getWorkflowGraph (identify, processdefinitionid) {
        // console.log("getWorkflowGraph");
        if (!processdefinitionid) return;
        this.props.getGraph(identify, processdefinitionid);
    };
    // componentDidMount(){

    //     this.props.getGraph(this.props.identify, this.props.workData);
    // };
    componentWillReceiveProps(nextProps){
        // console.log("componentWillReceiveProps:", nextProps);
        // console.log("props", this.props);
        let identify = nextProps.identify;
        let processdefinitionid = nextProps.processdefinitionid;
        // console.log(processdefinitionid);
        if(nextProps.xml === undefined){
            // let processdefinitionid = nextProps.processdefinitionid;
            this.getWorkflowGraph(identify, processdefinitionid);
        }   
        if(nextProps.xml !== this.props.xml){
            // let processdefinitionid = nextProps.processdefinitionid;
            // console.log(checkTask);
            this.getWorkflowGraph(identify, processdefinitionid);
        } 
    };
    // componentDidUpdate() {
    //     // console.log("componentDidUpdate");
    //     if (this.props.workData) {
    //         let checkTask = this.props.workData;
    //         // console.log(id);
    //         this.getWorkflowGraph(checkTask);
    //     }
    // };
    render() {
        // console.log(this.props);
        return (
            <div className="flowChartCon">

                {this.props.taskList !== undefined && this.props.taskList.length ? <Flow
                    list = {this.props.taskList} 
                    xml = {this.props.xml}
                    alarm = {this.props.alarmids} 
                    alarmDetail = {this.props.alarmDetail}
                /> : <div className="workflow-xml">
                        No flow chart to display.
                </div>
                }
                {/* {this.props.xml === "" || this.props.xml ===  undefined ?
                     : null
                } */}
            </div>
        );
    }
};
const mapStateToProps = (state, ownProps) => {
    // console.log(state);
    // console.log(ownProps);
    let identify = ownProps.identify;
    // console.log(state);
    if(state[flowChartReducer]&&state[flowChartReducer][identify]){
        return {
            xml: state[flowChartReducer][identify].modelXml !== undefined ? state[flowChartReducer][identify].modelXml : "",
            taskList: state[currentReducer] !== undefined ? state[currentReducer][identify].tasks:[]
        };
    }else{
        return {
            // xml: "",
            // taskList: []
        };
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        getGraph: (identify, processdefinitionid) => {
            dispatch(getWorkflowGraph(identify, processdefinitionid));
        }
        // getCurrentTaskList: (identify, currentTask) => {
        //     dispatch(getCurrentTaskList(identify, currentTask));
        // },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(WorkFlow);
