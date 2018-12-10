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
 * Created by Chen Ling on 23/10/2018.
 */
import React, { Component } from "react";
// impo rt PropTypes from "prop-types";
// import Icon from "@material-ui/core/Icon";
// import Button from "@material-ui/core/Button";
// import IconButton from "@material-ui/core/IconButton";
import "../styles/recordList.less";
// import { MuiThemeProvider } from "@material-ui/core/styles";
// import { theme } from "modules/theme";
import Table from "@material-ui/core/Table";
import Typography from "@material-ui/core/Typography";
import TableHead from "./listHead";
import TableBody from "./listBody";
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
        minHeight: "48px",
        lineHeight: "48px",
        textAlign: "center",
        color: theme.palette.text.secondary,
    },
    recordListCont: {
        height: "350px",
        margin: "24px 0",
        boxShadow: theme.shadows[1]
    },
    head: {
        padding: "12px",
        textAlign: "left",
        borderBottom: `1px solid ${theme.palette.primary.light}`
    }
});
class RecordListTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            identify: this.props.identify,
            recordList: this.props.recordList
            // isLoading: true,
        };
    }
    componentWillReceiveProps(nextProps) {
        
        if(nextProps.recordList !== this.props.recordList ){
            this.setState({
                recordList: nextProps.recordList,
            });
            // this.getBpmFiles(this.props.identify, nextProps.recordList);
        }
        
    };
    getRecordListData=()=>{
        let taskList = this.props.taskList;
        let recordList = [];
        if(taskList !== undefined && taskList.length > 1){

            recordList = taskList.slice();
            recordList.pop();
            console.log(recordList);
            return recordList;
        }
    };
    // getFileByTaskId=(taskId)=>{
    //     console.log(taskId);
    // }
    render() {
        const {classes, columnData, datas} = this.props;
        // console.log(this.props);
        return (
            // <MuiThemeProvider theme={theme}>
            <div className={classes.recordListCont} 
            >
                {/* "recordList" */}
                <div className={classes.head} >
                    <Typography variant="h5" className="sopTitle" component="h3" gutterBottom>
                        {I18n.t("workflow.recordList.listTitle")}
                    </Typography>
                </div>
                <Table className="">
                    <TableHead
                        columnData = {columnData}
                    />

                    {datas.length > 0 &&<TableBody
                        columnData = {columnData}
                        datas = {datas}
                        getFileByTaskId={this.props.getFileByTaskId}
                    />
                    }
                </Table>
                {datas.length === 0 &&
                    <Typography variant="caption" gutterBottom align="center" className={classes.noData}>
                        No data to display.
                    </Typography>  
                }
            </div>
            // </MuiThemeProvider>
        );
    }
};

RecordListTable.propTypes = {
    
};
RecordListTable.defaultProps = {
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
        // {
        //     "label": "Action",
        //     "indexKey": "action",
        //     "show": true
        // },
        // {
        //     "label": "Basic Info",
        //     "indexKey": "assigneeName",
        //     "show": true
        // }
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
const mapDispatchToProps = (dispatch) =>{
    return {
        // uploadFile: (identify, workData, file)=>{
        //     dispatch(uploadFile(identify, workData, file));
        // },
        // getBpmFiles: (identify, alarmId)=>{
        //     dispatch(getBpmFiles(identify, alarmId));
        // },
        // removeFile: (identify, alarm, fileId)=>{
        //     dispatch(removeFile(identify, alarm, fileId));
        // },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(RecordListTable));