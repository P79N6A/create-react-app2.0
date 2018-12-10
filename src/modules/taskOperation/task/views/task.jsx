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
// import Paper from "@material-ui/core/Paper";
import {REDUCER_NAME as workflowReducer} from "../funcs/constants";
import {CardWithTitle} from "modules/basicCardComps";

import TaskList from "./taskList";
import TaskFilter from "./taskFilter";
import TaskPagination from "./taskPagination";
import { searchTextChange} from "../funcs/actions";
import {connect} from "react-redux";
import { withStyles } from "@material-ui/core/styles";
// import { MuiThemeProvider } from "@material-ui/core/styles";
const styles = theme => ({
    root: {
        // ...theme.mixins.gutters(),
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
    }
});
// const sortCreateDate = (data) => {
//   data.sort(function (a, b) {
//       return Date.parse(b.enddate||new Date()) - Date.parse(a.enddate||new Date());
//   });
// };

// const TaskList = ({tasks, onCheckTask})=>
class Task extends Component{
    constructor(props) {
        super(props);
        this.state = {
            loading: this.props.loading,
            tasks: [],
            keyWord: "",
            identify: this.props.identify,
            pagination: this.props.pagination === undefined ? {
                totalrecords: 0,
                totalpages: 0,
                limit: 10,
                currentpage: 1,
            } : this.props.pagination,
            rowsPerPageOptions: this.props.rowsPerPageOptions === undefined ? [3, 10, 20, 50, 100, 200] : this.props.rowsPerPageOptions,
        };
        // this.sortCreateDate = this.sortCreateDate.bind(this);
        // this.onCheckTask = this.onCheckTask.bind(this);
        this.searchChange = this.searchChange.bind(this);
        // this.sendCurrentTask = this.sendCurrentTask.bind
    };
    componentDidMount() {
        // let searchText = this.state.keyWord;
        let identify = this.state.identify;
        this.setState({
            loading: true,
        });
        let postData = {
            keyWord: this.state.keyWord,
            paginator: this.state.pagination,
        };
        this.props.searchTextChange(identify, postData);
    };
    componentWillReceiveProps(nextProps) {
        // console.log(nextProps);
        // let tasksListData = nextProps.tasks;
        this.setState({
            loading: nextProps.loading,
            tasks: nextProps.tasks,
            pagination: nextProps.pagination,
            rowsPerPageOptions: nextProps.rowsPerPageOptions,
        });
    };
    searchChange = event => {
        let  searchText = event.target.value;
        if (!searchText.trim()) return;
        this.setState({
            loading: true,
            keyWord: searchText.trim(),
        });
        let postData = {
            keyWord: this.state.keyWord,
            paginator: this.state.pagination,
        };
        setTimeout(this.props.searchTextChange(this.state.identify, postData), 5000);
    };
    onCheckTask = (item) => {
        // console.log(item);
        if (item) {
            this.props.onCheckTask(item);
        }
    };
    searchTopoFunc = (currentpage, limit) =>{
        // console.log(currentpage, limit);
        this.setState({
            loading: true,
        });
        let pagination = {
            ...this.state.pagination,
            currentpage: currentpage,
            limit: limit,
        };
        let postData = {
            keyWord: this.state.keyWord,
            paginator: pagination,
        };
        // console.log(postData);
        this.props.searchTextChange(this.state.identify, postData);
    };
    render(){
        const {pagination, rowsPerPageOptions, tasks, loading} = this.state;
        // console.log(this.state);
        return (
            <CardWithTitle title="" dark 
                className="taskListContainer"
                style = {styles.root}
            >

                <div className="taskMainContainer">
                    {/* <TaskFilter 
                        searchChange={this.searchChange}
                    /> */}
                    <TaskList
                        // className="taskList"
                        // {...this.props.tasks}
                        loading = {loading}
                        tasks = {tasks}
                        onCheckTask = {this.onCheckTask}
                    />
                </div>
                
                {pagination !==undefined &&<TaskPagination
                    searchTopoFunc = {this.searchTopoFunc}
                    pagination = {pagination}
                    rowsPerPageOptions = {rowsPerPageOptions}
                />
                }
            </CardWithTitle>
        );
    }
};

TaskList.propTypes = {
    tasks: PropTypes.array,
    onCheckTask: PropTypes.func,
    keyWord: PropTypes.string
};

const mapStateToProps = (state, ownProps) => {
    // console.log(state[workflowReducer]);
    let identify = ownProps.identify;
    if(state[workflowReducer] && state[workflowReducer][identify]){
        return {
            loading: state[workflowReducer] && state[workflowReducer][identify].loading,
            tasks: state[workflowReducer] && state[workflowReducer][identify].taskList,
            pagination: state[workflowReducer] && state[workflowReducer][identify].pagination,
            rowsPerPageOptions: state[workflowReducer] && state[workflowReducer][identify].rowsPerPageOptions,
        };
    }else{
        return {
            tasks: []
        };
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        // onCheckTask: (identify, content) => {
        //     dispatch(checkTask(identify, content));
        // },
        searchTextChange: (identify, postData) => {
            dispatch(searchTextChange(identify, postData));
        }
    };
};

export default connect(mapStateToProps,  mapDispatchToProps)(withStyles(styles)(Task));
