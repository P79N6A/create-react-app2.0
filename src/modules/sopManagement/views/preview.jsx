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
 * Created by chenling on 02/08/2018.
 */
import React, {Component} from "react";
// import PropTypes from "prop-types";
// import Bpmn from "bpmn-js";
import BpmViewer from "bpmn-js/lib/NavigatedViewer";
// import EmbeddedComments from "bpmn-js-embedded-comments";
import "../styles/sop.less";
// import {ReactSVGPanZoom} from "react-svg-pan-zoom";
import $ from "jquery";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
// import InputLabel from "@material-ui/core/InputLabel";
import classnames from "classnames";
// import Input from "@material-ui/core/Input";
// import Button from "@material-ui/core/Button";
// import InputAdornment from "@material-ui/core/InputAdornment";
// import CloudUploadIcon from "@material-ui/icons/CloudUpload";
// import "../styles/workflow.less";
// import { MuiThemeProvider } from "@material-ui/core/styles";
// import { CardWithTitle } from "modules/basicCardComps";
import {connect} from "react-redux";
import { getFlowFile } from "../funcs/actions";
// import {REDUCER_NAME as flowFileReducer} from "../funcs/constants";
// import Theme from "commons/components/theme";

import { withStyles } from "@material-ui/core/styles";
// import { WSAECANCELLED } from "constants";
const styles = theme => ({
    // button: {
    //     margin: theme.spacing.unit,
    //     marginLeft: 0
    //     // maxWidth: "30px"
    // },
    // rightIcon: {
    //     marginLeft: theme.spacing.unit,
    // },
    formControl: {
        width: "100%",
        margin: theme.spacing.unit,
    },
    label: {
        color: theme.palette.secondary.main + "!important"
    },
    dateLabel: {
        color: theme.palette.text.secondary,
        fontSize: "0.75rem",
        "&:focus": {
            color: theme.palette.secondary.main
        }
    },
    // djsOverlayContainer: {
    //     transform: `scale(${zoom})`
    // }
});
class Flow extends Component {
    constructor(props){
        super(props);
        this.Viewer = null;
        this.state = {
            xml: "",
            add: this.props.add,
            // view: this.props.view,
            // edit:  this.props.edit,
            isOpen: false,
            fileName: "",
            validate: false,
            helperText: "",
            width: 300,
            height: 150,
            mouseleft: "",
            mousetop: "",
            centerOffsetX: "",
            centerOffsetY: "",
            proportion: 1,
            oX: 0,
            oY: 0
            // zoomOpen: false
        };
        
        this.handleFile = this.handleFile.bind(this);
        this.openDiagram = this.openDiagram.bind(this);
        this.readFile = this.readFile.bind(this);
        // this.openFile = this.openFile.bind(this);
        // this.changFlow = this.changFlow.bind(this);
    };
    componentDidMount(){
        // this.Viewer.fitToViewer();
        window.addEventListener("scroll",(event)=>{
            let top =document.documentElement.scrollTop || document.body.scrollTop || window.pageXOffset;
            console.log(top);
        });
    }
    openDiagram=(xml)=> {
        this.setState({
            isOpen: false,
            // zoomOpen: true
        });
        $(".workflowGraph").empty();
        var viewer = new BpmViewer({ 
            container: ".workflowGraph",
            // additionalModules: [EmbeddedComments]
        });
        viewer.importXML(xml, function (err) {
            if (!err) {
                // console.log("success")
                viewer.get("canvas").zoom("fit-viewport");
                // let svg = document.querySelector(".djs-container .viewport").getBBox();
                // document.querySelector(".djs-container svg").setAttribute("viewBox",`20 110 ${svg.width} ${svg.height}`);
            } else {
                // console.log("something went wrong:", err)
            }
        });
        clearTimeout(this.timer);
        $("img").remove();
        this.timer = setTimeout(function(){
            $("textarea").remove();
        }, 400);
    };
    
    readFile=(file, done)=>{
        if(!file){
            return done(new Error("no file chosen"));
        }
        var reader = new FileReader();
        reader.onload = function(event){
            let ev = event || window.event;
            // console.log(ev);
            done(null, ev.target.result);
        };
        reader.readAsText(file);
    };
    handleFile = (event) =>{
        // console.log("handleFile")
        $(".workflowGraph").empty();
        this.setState({
            // validate: false,
            helperText: "",
            isOpen: true
        });
        let e = event || window.event;
        let file = e.currentTarget.files;
        // let identify = this.props.identify;
        // // console.log(identify);
        // var that = this;
        // console.log(file);
        if(file.length === 0) return;
        this.setState({
            fileName: file[0].name === undefined ? null : file[0].name
        });
        this.regFile(file);
    };
    // changFlow(e){
    //     console.log(e);
    // };
    selectFile=()=>{
        $("#path").trigger("click");
    };
    regFile=(file)=>{
        // console.log(file);
        let identify = this.props.identify;
        // console.log(identify);
        var that = this;
        let validateFlag = true;
        let value = file[0].name;
        // console.log(value);
        let valueregex = this.props.sysconfigDeviceSchema.valueregex;
        let reg = new RegExp(valueregex);
        // console.log(reg);
        validateFlag = reg.test(value);
        // console.log(validateFlag);
        this.setState({
            validate: !validateFlag,
            helperText: 
                `only support ${valueregex}`
        },()=>{
            let validate = this.state.validate;
            // console.log(validate);
            if(!validate) {
                this.readFile(file[0], function(err, xml){
                    if (err){
                        return console.error("could not read file", err);
                    }
                    // this.setState({
                    //     xml: xml
                    // })
                    that.openDiagram(xml);
                });
                this.props.getFile(identify, file[0]);
            }
        });
        // console.log(validateFlag);
        this.props.buttonValidate(validateFlag);
    };
    getCount = (delta, num) => {
        if (delta > 0) {
            num = num / 1.15;
        } else {
            num = num * 1.15;
        }
        this.setState({
            proportion: num,
            centerOffsetX: (num - 1) * this.state.mouseleft,
            centerOffsetY: (num - 1) * this.state.mousetop,    
        });
        // return num;
    };
    handleWheel = (event) => {
        // console.log(event);
        // console.log(window.event);
        this.getDjsContainer();
        let e = event || window.event;
        let deta = e.deltaY;
        // let {width, height} = this.state;
        // let svg = document.querySelector(".djs-container .viewport").getBBox();
        // document.querySelector(".djs-container svg").setAttribute("viewBox",`20 10 ${svg.width} ${svg.height}`);
        // console.log(width);
        // let delta = 0;
        // if (!event) 
        //     event = window.event;
        // if (deta < 0) {
        //     console.log(deta);
        //     // delta = event.wheelDelta / 120;
        //     // alert(delta);
        // } else if (deta > 0) {
        //     console.log("event.detail:", deta);
        //     // delta = - event.detail / 3;
        // }
        let proportion = this.state.proportion;
        this.getCount(deta, proportion);
        // console.log(this.state);
        this.setState({
            // proportion: this.state.proportion,
            // centerOffsetX: (this.state.proportion - 1) * this.state.mouseleft,
            // centerOffsetY: (this.state.proportion - 1) * this.state.mousetop,
        },()=>{
            // console.log(this.state);
            // document.querySelector(".djs-container svg .viewport").setAttribute("transform", `translate(${this.state.oX - this.state.centerOffsetX} ,${this.state.oY - this.state.centerOffsetY}), scale(${this.state.proportion})`);
            if(this.state.proportion > 0.5 && this.state.proportion < 3){
                document.querySelector(".djs-container svg .viewport").setAttribute("transform", `translate(-20, -200), scale(${this.state.proportion})`);
            }
            // document.querySelector(".djs-container svg .viewport").setAttribute("transform",  `scale(${this.state.proportion})`);
        });
    };
    getDjsContainer = () =>{
        let that = this;
        $(".djs-container").mousemove(function(event) {
            var ev = event || window.event;
            that.setState({
                mouseleft: ev.offsetX ? ev.offsetX : ev.originalEvent.layerX,
                mousetop: ev.offsetY ? ev.offsetY : ev.originalEvent.layerY
            });
            // console.log(that.state);
            // that.mouseleft = ev.offsetX ? ev.offsetX : ev.originalEvent.layerX;
            // that.mousetop = ev.offsetY ? ev.offsetY : ev.originalEvent.layerY;
        });
    }
    render() {
        // let opt = {
        //     border: true,
        //     title: "Workflow"
        // };
        const { add, classes ,disabled, required, sysconfigDeviceSchema} = this.props;
        // const { width } = this.state;
        // console.log(sysconfigDeviceSchema);
        return (
            <div className="preview">
                <FormControl 
                    className={classes.formControl} 
                    required={required} 
                    disabled={disabled} 
                    error = {this.state.validate}
                    aria-describedby="name-error-text"
                >
                    <div className="bpm-file">
                        <label required={required} className={classnames(classes.dateLabel, this.state.isOpen ? classes.label : "")}>{
                            required ? [`${sysconfigDeviceSchema.displayname}*`] : sysconfigDeviceSchema.displayname}
                        </label>
                        <i className="material-icons"
                            onClick={this.selectFile.bind(this)}
                        >
                            cloud_upload
                            <input 
                                style={{display:"none"}}
                                id="path"
                                type="file"
                                accept="text/xml" 
                                name="file" 
                                // data-open-file 
                                onChange={this.handleFile}
                            />
                        </i>  
                    </div>
                    
                    {/* <Button 
                        variant="contained" color="default" 
                        className={classes.button}
                        size="small"
                        onClick={this.selectFile.bind(this)}
                    >
                        {sysconfigDeviceSchema.buttonname}
                        <CloudUploadIcon className={classes.rightIcon} />
                        <input 
                            style={{display:"none"}}
                            id="path"
                            type="file" data-open-file 
                            onChange={this.handleFile}
                        />
                    </Button> */}
                    {!this.state.validate ?
                        <span className="entry">{this.state.fileName}</span> : null
                    }
                    {
                        this.state.validate ? <FormHelperText id="name-error-text">{this.state.helperText} </FormHelperText> : null
                    }
                    
                </FormControl>
                {add ? 
                    <div className="canvas" >
                        {/* <div className={classes.djsOverlayContainer}> */}
                        <div onWheel={this.handleWheel}   className="workflowGraph" 
                            // style={{width: `${width}px`, height: "auto"}}
                        >
                        </div>
                    </div>
                    // </div>
                    : null
                }
            </div>
            // </div>
        );
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        getFile: (identify, file) => {
            // console.log(file)
            dispatch(getFlowFile(identify, file));
        }
    };
};
export default connect(null, mapDispatchToProps)(withStyles(styles)(Flow));
