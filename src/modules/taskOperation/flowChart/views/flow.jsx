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
// import bpmn from "bpmn-js";
// import { withStyles } from "@material-ui/core/styles";
import BpmViewer from "bpmn-js/lib/NavigatedViewer";
import EmbeddedComments from "bpmn-js-embedded-comments";
import "../styles/workflow.less";
// import { MuiThemeProvider } from "@material-ui/core/styles";
// import { CardWithTitle } from "modules/basicCardComps";
import {connect} from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
// import { getWorkflowGraph } from "../funcs/actions";
// import {REDUCER_NAME as workflowReducer} from "../funcs/constants";
import $ from "jquery";
// import CircularProgress from "@material-ui/core/CircularProgress";
// import _ from "lodash";
// import Theme from "commons/components/theme";
// let flowClassName;
// const styles = Theme => ({
//     "@global": {
//         flowClassName: flowClassName,
//         ".@{flowClassName}": {
//             width:"100%",
//             height: "100%",
//             textAlign: "center",
//             overflow: "auto",
//             // margin: 0 auto;
//             color: "rgba(255, 255, 255, 0.8)",
//             // min-height: 250px;
//             position: "relative",
//         },
//         ".@{flowClassName} .bjs-container": {
//             cursor: "pointer",
//         }
//     }
// });
class Flow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            request: true,
            mouseleft: "",
            mousetop: "",
            centerOffsetX: "",
            centerOffsetY: "",
            proportion: 0.6,
            oX: 0,
            oY: 0,
            x: 0,
            y: 0
        };
        // console.log(this.state);
    };
    removeWorkFlowChart = () => {
        let elem=document.getElementsByClassName("bjs-container"); 
        // console.log(elem);
        if(elem.length > 0) {
            elem[0].parentNode.removeChild(elem[0]);
        }
    }
    componentDidMount() {
        // console.log("componentDidMount");
        // console.log(this.props);
        this.removeWorkFlowChart();
        if (this.props.list !== undefined && this.props.list.length > 0 && this.props.xml !== undefined) {
            // let checkTask = this.props.workData;
            // // console.log(id);
            // this.getWorkflowGraph(checkTask);
            this.RenderingXml(this.props.list, this.props.xml);
        }
    };
    componentWillReceiveProps(nextProps){
        // console.log("nextProps", nextProps);
        // console.log("this.props", this.props);
        if(nextProps.list !==undefined  && nextProps.list === this.props.list){
            this.setState({
                request: false
            });
        }else {
            this.setState({
                request: true,
                mouseleft: "",
                mousetop: "",
                centerOffsetX: "",
                centerOffsetY: "",
                proportion: 0.6,
                oX: 0,
                oY: 0
            });
            this.RenderingXml(nextProps.list, nextProps.xml);
        }
        // if(nextProps.alarm === ""){
        //     // $(".workflowGraph").empty();
        //     // this.setState({
        //     //     request: false
        //     // });
        //     this.removeWorkFlowChart();
        // }
    }
    RenderingXml =(list, xml)=>{

        this.removeWorkFlowChart();
        if(!this.state.request) return false;
        
        // if (list === undefined || list.length === 0) return false;
        // let flowClassName = this.props.flowClassName;
        // console.log(flowClassName);
        // console.log($(`.${flowClassName}`));
        this.setState({
            loading: true
        });
        let that = this;

        // clearTimeout(this.timer);
        // this.timer = setTimeout(function(){
        var viewer = new BpmViewer({ 
            container: ".workflowGraph",
            additionalModules: [EmbeddedComments]
        });
        
        viewer.importXML(xml, function (err) {
            if (!err) {
                // console.log("success");
                viewer.get("canvas").zoom("fit-viewport");
                that.removeWorkFlowChartA();
                // console.log("RenderingXml");
                that.xmlStyle(list);
            } else {
                // console.log("something went wrong:", err);
            }
        });
        // }, 500);
        // this.removeWorkFlowChartA();
    };
    removeWorkFlowChartA = () =>{
        $(".djs-overlay-container").remove();
        $("img").remove();
    }
    xmlStyle=(list)=>{
        this.removeWorkFlowChartA();
        if(list.length === 0) return;
        let currentTask = list && list[list.length - 1];
        let number =  currentTask && currentTask.taskdefinitionkey &&currentTask.taskdefinitionkey.split("userTask")[1];
        let lastTask = number === 1 ? undefined : "userTask"+ number;

        // console.log(document.querySelector(".djs-container .viewport"));
        if(document.querySelector(".djs-container .viewport") === null) return false;
        // clearTimeout(this.timer);
        // this.timer = setTimeout(function(){
        // let svg = document.querySelector(".djs-container .viewport").getBBox();
        // document.querySelector(".djs-container svg").setAttribute("viewBox",`0 0 ${svg.width} ${svg.height}`);
        // let alarmDetail = this.props.alarmDetail;
        let svgTranslate = -60;
        // if(!alarmDetail){
        //     svgTranslate = 0;
        // }
        let proportion = this.state.proportion;

        // let x = this.state.x;
        // let y = this.state.y;
        // console.log(x, y);

        if(proportion > 0.5 && proportion < 3){
           
            document.querySelector(".djs-container svg .viewport").setAttribute("transform", `translate(100, ${svgTranslate}), scale(${proportion})`);

            // let svg = document.querySelector(".djs-container .viewport").getBBox();
            // document.querySelector(".djs-container svg").setAttribute("viewBox",`0 0 ${svg.width} ${svg.height}`);
            // document.querySelector(".djs-container svg .viewport").setAttribute("transform-origin", "20% 40%");
        }
        // clearTimeout(this.timer);
        // this.timer = setTimeout(function(){
        let all = document.querySelectorAll(".djs-group .djs-visual rect, polygon");
        let line = document.querySelectorAll(".djs-group .djs-visual path");
        let mark = document.querySelectorAll("marker path");
        let circle = document.querySelectorAll(".djs-group .djs-visual circle");
        let tspan = document.querySelectorAll(".djs-group .djs-visual tspan");
        all.forEach(item=>{
            item.style.stroke = "#b7b7b7";
            item.style.fillOpacity = "0";
        });
        line.forEach(item=>{
            item.style.stroke = "#b7b7b7";
            item.style.fill = "none";
        });
        mark.forEach(item=>{
            item.style.fill = "#b7b7b7";
            item.style.stroke = "#FFF";
        });
        circle.forEach(item=>{
            item.style.stroke = "#FFF";
            item.style.fillOpacity = "0";
        });
        tspan.forEach(item=>{
            item.style.fill = "#FFF";
        });
        // document.querySelector("[data-element-id=startEvent] .djs-visual circle").style.stroke="#ff6600";
        // console.log(list);
        list.map((item, i)=>{
            if(item.status ==="open"){
                // return(
                document.querySelector(`[data-element-id=${item.taskdefinitionkey}] .djs-visual rect`).style.fill="#f7941d";
                document.querySelector(`[data-element-id=${item.taskdefinitionkey}] .djs-visual rect`).style.stroke="#f7941d";
                document.querySelector(`[data-element-id=${item.taskdefinitionkey}] .djs-visual rect`).style.fillOpacity="1";
                document.querySelector(`[data-element-id=${item.taskdefinitionkey}] .djs-visual text tspan`).style.fill="#fff";
                // )
                this.setState({
                    loading: false
                });
                return true;
            }else{
                // return(
                if(document.querySelector(`[data-element-id=${item.taskdefinitionkey}] .djs-visual rect`).style === null) return false;
                document.querySelector(`[data-element-id=${item.taskdefinitionkey}] .djs-visual rect`).style.fill="rgb(150, 150, 150)";
                document.querySelector(`[data-element-id=${item.taskdefinitionkey}] .djs-visual rect`).style.fillOpacity="1";
                document.querySelector(`[data-element-id=${item.taskdefinitionkey}] .djs-visual text tspan`).style.fill="#fff";
                // );
                this.setState({
                    loading: false
                });
                return true;
            }
        });
        if(currentTask.status !== undefined){
            if(currentTask.status === "open" && lastTask){
                document.querySelector(`[data-element-id=${lastTask}] .djs-visual rect`).style.fill="bule";
                // document.querySelector("[data-element-id="+currentTask+"] .djs-visual rect").style.fill="red";
            }
            this.setState({
                loading: false
            });
        }
        // }, 100);
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
    handleWheel=(event)=>{
        // console.log("handleWheel");
        this.getDjsContainer();
        let e = event || window.event;
        // var e = event || window.event;
        // console.log('x', e.clientX);
        // console.log('y', e.clientY);
        this.setState({
            x: e.screenX,
            y: e.screenY
        });
        let deta = e.deltaY;
        // console.log(deta);
        let proportion = this.state.proportion;
        this.getCount(deta, proportion);
    }
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
        // const {list, xml} = this.props;
        // flowClassName = this.props.flowClassName;
        // console.log(this.props);
        const { loading } = this.state;

        // console.log(this.state);
        return (
            
            <div className="canvas">

                <div 
                    onWheel={this.handleWheel}
                    className="workflowGraph"
                >
                    {/* {request &&
                        this.RenderingXml(list, xml) 
                    } */}
                </div>
                {
                    loading && 
                        <div className="progress-cont">
                            <CircularProgress color="secondary" />
                        </div>
                }

            </div>   
        );
    }
};

export default connect(null, null)(Flow);
