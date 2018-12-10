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
 * Created by Chen Ling on 26/10/2018.
 */
import React, { Component } from "react";
// import "../styles/taskFloatTab.less";
// import {uploadFile, getBpmFiles, removeFile, getBpmFilesByTaskId} from "../funcs/actions";
// import UploadFilePage from "./uploadFile";
import { CardWithTitle } from "modules/basicCardComps";
import { view as CurrentTaskPage } from "modules/taskOperation/currentTask";
// import {REDUCER_NAME as taskFloatTabReducer} from "../funcs/constants";
import {Drawer} from "modules/common";
import {connect} from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { I18n } from "react-i18nify";
const drawerWidth = 700;
const styles = theme => ({
    drawerPaper: {
        backgroundColor: theme.palette.background.paper,
        position: "absolute",
        width: drawerWidth,
        height: "100%",
        transform: `translate(${drawerWidth}px, 0px)`,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    button: {
        margin: theme.spacing.unit,
        border: "none"
    },
    input: {
        display: "none",
    },
});

class taskFloatTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentWillReceiveProps(nextProps) {
        
        
    };
    render() {
        const { classes, identify, alarmids} = this.props;
        // console.log(this.state.isLoading);
        return (
            <Drawer 
                variant="persistent"
                anchor="right"
                classes={{
                    paper: classes.drawerPaper
                }} 
                open={this.props.toggleDrawerShow}

            >
                <CardWithTitle 
                    asContainer 
                    title={I18n.t("workflow.currentTask.workflowName")} 
                    handleCloseClick={this.props.handleClose} dark
                >
                    <CurrentTaskPage 
                        identify={identify}
                        alarmids = {alarmids}
                        alarmDetail = {false}
                    />
                </CardWithTitle>
            </Drawer>
            // </MuiThemeProvider>
        );
    }
};

taskFloatTab.propTypes = {
    
};
// const mapStateToProps = (state, ownProps) => {
//     // let identify = ownProps.identify;
//     // // console.log(state[attachmentsReducer]);
//     // // console.log( state[attachmentsReducer][identify]);
//     // if(state[attachmentsReducer] && state[attachmentsReducer][identify]){
//     //     return {
//     //         isLoading: state[attachmentsReducer][identify].isLoading,
//     //         files: state[attachmentsReducer][identify].files,
//     //         bpmfiles: state[attachmentsReducer][identify].bpmfiles,
//     //         isUploadFile: state[attachmentsReducer][identify].isUploadFile,
//     //         // bpmfiles: state[attachmentsReducer][identify].bpmfiles,
//     //     };
//     // }else{
//     //     return {
//     //     };
//     // }
// };
// const mapDispatchToProps = (dispatch) =>{
//     // return {
//     //     uploadFile: (identify, workData, file)=>{
//     //         dispatch(uploadFile(identify, workData, file));
//     //     },
//     //     getBpmFiles: (identify, alarmId)=>{
//     //         dispatch(getBpmFiles(identify, alarmId));
//     //     },
//     //     removeFile: (identify, alarm, fileId)=>{
//     //         dispatch(removeFile(identify, alarm, fileId));
//     //     },
//     //     getBpmFilesByTaskId: (identify, taskId)=>{
//     //         dispatch(getBpmFilesByTaskId(identify, taskId));
//     //     },
//     // };
// };
export default connect(null, null)(withStyles(styles)(taskFloatTab));