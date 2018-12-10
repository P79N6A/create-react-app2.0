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
import PropTypes from "prop-types";
// import AppBar from "@material-ui/core/AppBar";
// import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
// import Icon from "@material-ui/core/Icon";
// import IconButton from "@material-ui/core/IconButton";
import "../styles/currentTask.less";
// import Theme from "commons/components/theme";
import Paper from "@material-ui/core/Paper";
// import { LinearProgress } from "@material-ui/Progress";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
// import {CardWithTitleAction} from "modules/basicCardComps";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Icon from "@material-ui/core/Icon";
import { withStyles } from "@material-ui/core/styles";
// import { theme } from "modules/theme";
// import { view as FlowChart } from "modules/taskOperation/flowChart";
// import { view as Attachments } from "modules/taskOperation/attachments";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import { FormControl, FormControlLabel } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
// import TextField from "@material-ui/core/TextField";
// import {taskChange, taskSubmit} from "../funcs/actions";
// import {REDUCER_NAME as currentTaskReducer} from "../funcs/constants";
import {connect} from "react-redux";

// console.log(theme);
const styles = theme => ({
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        height: "36px",
    },
    "textField:focus": {
        "border-color": theme.palette.action.active,
    },
    dense: {
        marginTop: 16,
    },
    menu: {
        width: 200,
    },
    radio: {
        marginLeft: "8px"
    }
});
class CurrentContentTask extends Component {
    state={
        buttonShow: true,
        currentTask: this.props.currentTask,
        verification: true,
        textValue: "",
        spf: false,
        scdf: false,
    }
    componentWillReceiveProps(nextProps){
        // console.log(nextProps);
        if(nextProps.currentTask.status === "open"){
            this.setState({
                buttonShow: true,
                currentTask: nextProps.currentTask,
                textValue: "",
            });
        }else{
            this.setState({
                buttonShow: false,
                currentTask: nextProps.currentTask,
                textValue: "",
            });
        }
    };
    // iconClickParentHandle=()=>{
    //     // console.log(this.props.currentTask);
    //     if (this.props.currentTask === undefined) return;
    //     let data = this.props.currentTask;
    //     let task = this.props.currentTask;
    //     let re = /^[a-zA-Z0-9]*_{1}[a-zA-Z0-9]*$/;
    //     for(let k in task){
    //         if (re.test(k)) {
    //             var arr = k.split("_");
    //             switch (arr[0]) {
    //                 case "tb":
    //                     data[k] = 
    //                     this.generateTextDom;
    //                     break;
    //                 case "rb":
    //                     data[k][this.props.selectedRadio] = 
    //                         this.props.selectedRadio;
    //                     break;
    //                 default:
    //                     break;
    //             }
    //         }
    //     };
    //     // this.props.onContentSubmit(identify, task);
    // };
    handleChange=(event)=>{
        event.preventDefault();
        let identify = this.props.identify;
        this.setState({
            verification: event.target.value
        });
        this.props.onChangeTask(identify, event.target.value);
    };
    textValueChange=(event)=>{
        // console.log(event.target.value);
        event.preventDefault();
        this.setState({
            textValue: event.target.value
        });
    }
    generateTextDom=()=>{
        const {classes} = this.props;
        return(
            // <textarea ref="textValue" />
            // <TextField
            //     // fullWidth
            //     defaultValue={this.state.textValue}
            //     // label="Bootstrap"
            //     id="bootstrap-input"
            //     onChange={this.textValueChange}
            //     InputProps={{
            //         disableUnderline: true,
            //         classes: {
            //             root: classes.bootstrapRoot,
            //             input: classes.bootstrapInput,
            //         },
            //     }}
            //     InputLabelProps={{
            //         shrink: true,
            //         className: classes.bootstrapFormLabel,
            //     }}
            // />
            <TextField
                id="outlined-bare"
                className={classes.textField}
                defaultValue={this.state.textValue}
                margin="normal"
                variant="outlined"
                onChange={this.textValueChange}
            />
        );
    };
    generateRadioDom(){
        // console.log("generateRadioDom");
        // console.log(this.props.currentTask);
        this.rb_confirmalarm_true = this.props.currentTask && this.props.currentTask.rb_confirmalarm["true"];
        this.rb_confirmalarm_false = this.props.currentTask && this.props.currentTask.rb_confirmalarm["false"];
        const {classes} = this.props;
        // console.log(this.rb_confirmalarm_true);
        // console.log( this.rb_confirmalarm_false);
        if(this.rb_confirmalarm_true === undefined || this.rb_confirmalarm_false === undefined) return;
        return(
            <FormControl component="fieldset" className={classes.radio} required>
                {/* <FormLabel component="legend">Gender</FormLabel> */}
                <RadioGroup
                    name="gender1"
                    onChange={this.handleChange.bind(this)}
                    value = {(this.props.selectedRadio)|| this.rb_confirmalarm_true}
                >
                    <FormControlLabel 
                        value={this.rb_confirmalarm_true} 
                        control={<Radio />} 
                        label={this.rb_confirmalarm_true ?this.rb_confirmalarm_true: true} 
                        className="radioLabel"
                    />
                    <FormControlLabel 
                        value= {this.rb_confirmalarm_false}
                        control={<Radio />} 
                        label={this.rb_confirmalarm_false?this.rb_confirmalarm_false: false} 
                        className="radioLabel"
                    />                
                </RadioGroup>
            </FormControl>
        );
    };
    checkBoxhandleChange= name => event =>{
        // console.log(name);
        // console.log(event.target.checked);
        this.setState({
            [name]: event.target.checked
        });
    };
    generateSelectionDom=()=>{
        // console.log("generateSelectionDom");
        // console.log(this.state.spf);
        return(
            <div>
                <FormControlLabel
                    control={
                        <Checkbox
                            className="checkBox"
                            checked={this.state.spf}
                            onClick={this.checkBoxhandleChange("spf")}
                            value="spf"
                            color="primary"
                        />
                    }
                    label="SPF"
                />
                <FormControlLabel   
                    control={
                        <Checkbox
                            className="checkBox"
                            checked={this.state.scdf}
                            onClick={this.checkBoxhandleChange("scdf")}
                            value="scdf"
                            color="primary"
                        />
                    }
                    label="SCDF"
                />
            </div>
        );
    };
    generateDom(){
        // console.log(this.props.currentTask);
        var task = this.props.currentTask;
        var re = /^[a-zA-Z0-9]*_{1}[a-zA-Z0-9]*$/;
        var generateDom;
        for(let k in task){
            if (re.test(k)) {
                var arr = k.split("_");
                switch (arr[0]) {
                    case "tb":
                        generateDom = this.generateTextDom();
                        break;
                    case "rb":
                        generateDom = this.generateRadioDom();
                        // generateDom = this.generateTextDom();
                        break;
                    case "chk":
                        generateDom = this.generateSelectionDom();
                        break;  
                    default:
                        break;
                }
            }
        }
        return generateDom;
    };
    downTaskFile =(fileId)=>{
        console.log(fileId);
        let fileList = this.props.intialFileList;
        if(fileList.length === 0 || fileList ===undefined) return false;
        console.log(fileList);
        fileList.map(item=>{
            if(item.fileid === fileId){
                window.open(item.urlDown, "_self");
            }
            return true;
        });
    };
    getFileType=(type)=>{
        // console.log(type);
        let m;
        if(type === undefined){
            m = "undefined";
        } else{
            let t = type.split(".")[1];
            // console.log(t);
            m = `application/${t}`;
        }
        return m;
    }
    getFileById =(fileId, fileName)=>{
        // console.log(fileId);
        let fileList = this.props.intialFileList;
        let file = {};
        if(fileList === undefined) {
            file = {
                filename: undefined,
                fileid: undefined,
                size: undefined,
                urlDown: undefined
            };
            // this.setState({
            //     file: file
            // });
            // return file;
        };
        if(fileList){
            fileList.map(item=>{
                if(item.fileid === fileId){
                    file = item;
                }
                // console.log(file);
                // return file;
                // this.setState({
                //     file: file
                // });
                return true;
            });
        }
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
                    <Typography>
                        {fileName}
                    </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className="taskList-p">
                    <div className="itemBox">
                        <Typography component="p">
                            Filename: &nbsp;{file.filename !== undefined ? file.filename : "undefined"}
                        </Typography>

                        <Typography component="p">Filetype: &nbsp;{file.filename !== undefined ?this.getFileType(file.filename) : "undefined"}</Typography>

                        <Typography className="fileDown" component="p">
                        
                            <span>
                                Filesize: &nbsp;{file.size !== undefined ?`${(file.size/1024).toFixed(2)}KB(byte)` : "undefined"}
                            </span>

                            {file.urlDown !== undefined && <i className="material-icons" onClick={event =>this.downTaskFile(file.fileid)}>
                            vertical_align_bottom
                            </i>}
                        </Typography>
                        
                    </div>
                    
                </ExpansionPanelDetails>
            </ExpansionPanel>
        );
    }

    generateCurrentTask_open=()=>{
        const {buttonShow} = this.state;
        const {classes} = this.props;
        return (
            <Paper className="currentTask-content">
                <div className="currentTask-operation"> 
                    <div className="title">
                        <Typography component="p">                  {this.props.currentTask.description}
                        </Typography>
                        
                        {this.props.currentTask.l_file_id3 !==undefined && this.getFileById(this.props.currentTask.file_id3.file_id, this.props.currentTask.l_file_id3)}

                        {this.props.currentTask.l_file_id4 !==undefined &&this.getFileById(this.props.currentTask.file_id4.file_id, this.props.currentTask.l_file_id4)}
                        
                        <Typography component="p">       
                            {this.props.currentTask.name}
                        </Typography>
                    </div>
                    <div className="action-section">   
                        {this.generateDom()}
                    </div>
                </div>
                { buttonShow && 
                <div className="current-submit">
                    <Button variant="contained" color="secondary" className={classes.button}
                        onClick={this.handleExpandClick}
                    >
                        SUBMIT
                    </Button>
                </div>
                } 
            </Paper>);
    };
    generateCurrentTask_closed(){
        return (
            <Paper className="currentTask_closed">
                <Typography component="p">
                    All process are prepared.
                </Typography>
            </Paper>
        );
    };
    generateCurrentTask(){
        return (
            <Paper>
                <Typography component="p">
                </Typography>
            </Paper>
        );
    };
    handleExpandClick=()=>{
        // event.preventDefault();
        // console.log(this.state.textValue);
        // console.log("handleExpandClick");
        let identify = this.props.identify;
        let currentTask = this.state.currentTask;
        if(currentTask.rb_confirmalarm !== undefined){
            currentTask.rb_confirmalarm = {
                [this.state.verification]: this.state.verification
            };
        }else if(currentTask.tb_repmes !== undefined){
            currentTask.tb_repmes = this.state.textValue;
        }else if(currentTask.tb_closemessage !== undefined){
            currentTask.tb_closemessage = this.state.textValue;
        }
        else if(currentTask.chk_disinfo !== undefined){
            let SPF = this.state.spf;
            let SCDF = this.state.scdf;
            if(SPF && SCDF){
                currentTask.chk_disinfo = {
                    SPF,
                    SCDF
                };
            }else if(SPF){
                currentTask.chk_disinfo = {
                    SPF
                };
            }else{
                currentTask.chk_disinfo = {
                    SCDF
                };
            }
            
        }
        
        this.props.onContentSubmit(identify, currentTask);
        this.setState({
            textValue: ""
        });
        // console.log(this.state.data);
    }
    render() {
        const { currentTask, alarm} = this.props;
        // console.log(this.props);
        // let opt = {
        //     // buttons:[
        //     //     {
        //     //         name: (currentTask && currentTask.l_b_submit) || "SUBMIT"
        //     //     }
        //     // ],
        //     // expandContent: true,
        //     border: true,
        //     dark: false,
        //     title: "Current Task",
        //     // iconClickParentHandle: this.iconClickParentHandle(),
        // };
        return (
            // <MuiThemeProvider theme={theme}>
            <div className="currentTaskOperationCon">
                {/* <CardWithTitleAction 
                    className="task-card" 
                    {...opt}
                > */}
                
                {alarm !== "" && (currentTask.status === "open"? this.generateCurrentTask_open(): (currentTask.length > 0 && currentTask.status === "closed" ? this.generateCurrentTask_closed():this.generateCurrentTask()))}

            </div>
            // </MuiThemeProvider>
        );
    }
};

CurrentContentTask.propTypes = {
    onContentSubmit: PropTypes.func.isRequired,
    onChangeTask: PropTypes.func
};
// const mapDispatchToProps = (dispatch) =>{
//     return {
//         onContentSubmit:(identify, content) =>{
//             dispatch(taskSubmit(identify, content));
//         },
//         onChangeTask:(identify, value)=>{
//             dispatch(taskChange(identify, value));
//         },
//     };
// };
export default connect(null, null)(withStyles(styles)(CurrentContentTask));