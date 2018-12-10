import React, { Component } from "react";
import Timeline from "react-visjs-timeline";
import moment from "moment";
import { Button } from "modules/common";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import "../styles/style.less";
import { REDUCER_NAME as timelineName } from "../funcs/constants";
import { alarmSearchTimeline, storeDeviceLocation, changeStateRequest, alarmExport } from "../funcs/actions";
import ZoomInIcon from "@material-ui/icons/ZoomIn";
import ZoomOutIcon from "@material-ui/icons/ZoomOut";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { Refresh } from "./functions";
import classnames from "classnames";
// import Slider from "./slider";
import { actions as messageCenter } from "modules/messageCenter";
import _ from "lodash";
import * as msg from "commons/utils/messageBus";
import Store from "commons/store";
import ColumnConfig from "modules/timeline/columnConfig.json";
const styles = themes => ({
	 root: {
		 width: "100%",
		 height: "calc(100% - 72px)"
	 },
	 textColor: {
		 color: themes.palette.secondary.contrastText
	 },
	 backgroundColor: {
		 backgroundColor: "#343434",
		 border: "1px solid",
		 borderColor: "#343434"
	 },
	 "@global": {
		 ".vis-timeline": {
			 backgroundColor: "#303030",
			 height: "100%"
		 },
		 ".vis-timeline .vis-panel .vis-time-axis .vis-text": {
			 color: themes.palette.secondary.contrastText
		 },
		 "item-expand": {
			 display: "block"
		 },
	 }

});
// window.expandClick =  function(event, data) {
// 	// const classname = `.${data} .item-expand`;
// 	if(document.querySelector(".testexpand.item-expand")){
// 		document.querySelector(`.testexpand`).classList.remove("item-expand");
// 	}else{
// 		document.querySelector(`.testexpand`).classList.add("item-expand");
// 	}
// }

// let hidden = "";
// let state = "";
let visibilityChange = "";
if (typeof document.hidden !== "undefined") {
	 //  hidden = "hidden";
	 visibilityChange = "visibilitychange";
	 //  state = "visibilityState";
} else if (typeof document.mozHidden !== "undefined") {
	 //  hidden = "mozHidden";
	 visibilityChange = "mozvisibilitychange";
	 //  state = "mozVisibilityState";
} else if (typeof document.msHidden !== "undefined") {
	 //  hidden = "msHidden";
	 visibilityChange = "msvisibilitychange";
	 //  state = "msVisibilityState";
} else if (typeof document.webkitHidden !== "undefined") {
	 //  hidden = "webkitHidden";
	 visibilityChange = "webkitvisibilitychange";
	 //  state = "webkitVisibilityState";
}
let diffTime;
let changFlag = false;
document.addEventListener(visibilityChange, function () {
	 if (document.hidden) {
	 	sessionStorage.setItem("TIMELINE_DIFF", moment());
	 	changFlag = false;
	 } else {
	 	diffTime = moment().valueOf() - moment(sessionStorage.getItem("TIMELINE_DIFF")).valueOf();
	 	changFlag = true;
	 }
}, false);

class TimelineComp extends Component {
	 constructor(props) {
	 	super(props);
	 	this.timeline = React.createRef();
	 	this.state = {
	 		customTimes: { one: moment() },
	 		slidervalue: 0,
	 		basicOptions: {
	 			options: {
	 				start: moment().valueOf() - 1200000,
	 				end: moment().valueOf() + 1200000,
	 				showCurrentTime: true,
	 				showMajorLabels: true,
	 				showMinorLabels: true,
	 				width: "100%",
	 				height: "100%",
	 				zoomMax: 1000 * 60 * 60 * 24,
	 				zoomMin: 1000 * 60,
	 				showTooltips: true
	 			},
	 			items: [],
			 },
	 		currentSeverity: {}
		 };
		 this.currentItems = {};
		 this._timelineRunningTimer = {};
		 this.actionFlag = 0;
		 this.rangeChangedHandler = this.rangeChangedHandler.bind(this);
		 this.clickHandler = this.clickHandler.bind(this);
		 this.zoomLeft = this.zoomLeft.bind(this);
		 this.zoomRight = this.zoomRight.bind(this);
		 this.zoomIn = this.zoomIn.bind(this);
		 this.zoomOut = this.zoomOut.bind(this);
	 }

	renderTemplate = (item) => {
	 const content = `
		<div id="timeline-template" >
			<div class="template-icon"><i class="fa fa-exclamation-circle"></i></div>
			<div class="template-content">
				<div class="template-title">${item.alarmtype}</div>
				<div>${item.note}</div>
			</div> 
			<div class="template-down template-icon"><i class="fa fa-angle-down template-down"></i></div>
		</div>`;
	 return content;
	}
	renderTemplateShow = (item) => {
	 const content = `
		<div id="timeline-template" >
			<div class="template-icon"><i class="fa fa-exclamation-circle"></i></div>
			<div class="template-content">
				<div class="template-title">${item.alarmtype}</div>
				<div>${item.note}</div>
			</div> 
			<div class="template-up template-icon"><i class="fa fa-angle-up template-up"></i></div>
		</div>
		<div class="testexpand"><span class="item-detail item-style">DETAILS</span> <span class="item-location item-style">LOCATION</span> <span class="item-export item-style">EXPORT</span> <span class="item-acknowlage item-style">ACKNOWLAGE</span></div>
		`;
	 return content;
	}
	validateSeverity(data) {
		 let styleContent = "";
		 let severity = "";
		 switch (data) {
		 	case "1":
		 		styleContent = "background-color:#b7242a;";
		 		severity = "Critical";
		 		break;
		 	case "2":
		 		styleContent = "background-color:#c36913;";
		 		severity = "Major";
		 		break;
		 	case "3":
		 		styleContent = "background-color:#f1b002;";
		 		severity = "Minor";
		 		break;
		 	case "4":
		 		styleContent = "background-color:#00a6ac;";
		 		severity = "Info";
		 		break;
		 	case "5":
		 		styleContent = "background-color:#81cfe0;";
		 		severity = "Unknown";
		 		break;
		 	default:
		 		styleContent = "background-color:#81cfe0;";
		 		severity = "Unknown";
		 		break;
		 }
		 return { severity, styleContent };
	}
	generateItem(alarmData) {
	 let { basicOptions } = this.state;
	 basicOptions.items = [];
	 alarmData && alarmData.forEach(item => {
	 	let { styleContent } = this.validateSeverity(item.severity);
	 	basicOptions.items.push({
	 		id: item.id,
	 		content: this.renderTemplate(item),
	 		start: item.sentdatetime,
	 		type: "box",
	 		// title: severity,
	 		style: styleContent,
	 		note: item.note,
	 		alarmtype: item.alarmtype
	 	});
	 });
	 this.setState({ basicOptions });
	}
	componentDidMount() {
	 	const time = this.timeline.current.$el && this.timeline.current.$el.getWindow();
	 	this.props.alarmSearch(time.start.getTime(), time.end.getTime() + 600000, "", this.props.application, this.props.identify);
	 	this.initalTimeline();
	 	Store.dispatch(msg.subscribe("deviceLocInMap", "ISC_MSG_BUS", "deviceLocInMap"));
	}

	componentWillReceiveProps(nextProps) {
		 let identify = nextProps.identify;
		 const alarmData = (nextProps[identify] && nextProps[identify].alarmData) || [];
		 const streamingData = (nextProps[identify] && nextProps[identify].streamingData) || [];
		 const currentCheckColumns = (nextProps[identify] && nextProps[identify].currentCheckColumns) || [];
		 const alarmDataProps = (this.props[identify] && this.props[identify].alarmData) || [];
		 const streamingDataProps = (this.props[identify] && this.props[identify].streamingData) || [];
		 const oldCheckColumns = (this.props[identify] && this.props[identify].currentCheckColumns) || [];
 
		 if ((!_.isEqual(alarmDataProps, alarmData)) || (streamingData.length > 0 && !_.isEqual(streamingData, streamingDataProps))) {
		 	let filterAlarms = this.mappingSeverityAlarms(streamingData);
			 const resultArr = this.combindData(alarmData, filterAlarms);
		 	if (resultArr.length > 0) {
		 		this.generateItem(resultArr);
		 	} else {
		 		const { basicOptions } = this.state;
		 		basicOptions.items = [];
		 		this.setState({ basicOptions });
		 	}
		 }
		 if (currentCheckColumns !== oldCheckColumns) {
		 	this.setState({ currentSeverity: currentCheckColumns });
		 	let time = this.timeline.current && this.timeline.current.$el.getWindow();
		 	const start = time.start.getTime();
		 	const end = time.end.getTime();
		 	const endTime = end + 3540000 + 60000;
		 	this.props.alarmSearch(start, endTime, currentCheckColumns, this.props.application, this.props.identify);
		 }
	}

	mappingSeverityAlarms = (streamingData) => {
		 let { currentSeverity } = this.state;
		 let filterAlarms;
		 //  const severityMapping = { "1": "Critical", "2": "Major", "3": "Minor", "4": "Info", "5": "Unknown" };
		 currentSeverity = currentSeverity && Object.keys(currentSeverity).length > 0 && JSON.parse(currentSeverity);
		 let severityFlag = false;
		 if(currentSeverity){
			 currentSeverity && currentSeverity.forEach(element => {
			 	if (!element.defaultSelect) {
					 severityFlag = true;
			 	}
			 });
		 }
		 if (severityFlag) {
			 let severity = [];
			 filterAlarms = [];
		 	 severityFlag =currentSeverity.forEach(element => {
		 		if (element.defaultSelect) {
		 			severity.push(element.columnName);
		 		}
		 	});
		 	for (let item in streamingData) {
		 		if (severity.includes(item.severity)) {
		 			filterAlarms.push(streamingData[item]);
		 		}
		 	}
		 }
		 return filterAlarms ? filterAlarms : streamingData;
	}
	setCustomTimeLine(start, end, custime) {
		 const { basicOptions } = this.state;
		 if (custime > moment().valueOf()) {
			 clearTimeout(this._timelineRunningTimer[this.props.identify]);
		 	 custime = moment().valueOf();
		 	 let range = (end - start) / 2;
		 	 start = custime - range;
			 end = custime + range;
			 this._timelineRunning(500);
		 }
		 basicOptions.options = Object.assign({}, basicOptions.options, { start, end });
		 this.setState({ customTimes: { one: custime }, basicOptions });
	}
	move = (percentage) => {
		 clearTimeout(this._timelineRunningTimer[this.props.identify]);
		 const time = this.timeline.current.$el && this.timeline.current.$el.getWindow();
		 var interval = time.end.getTime() - time.start.getTime();
		 var start = time.start.getTime() - interval * percentage;
		 var end = time.end.getTime() - interval * percentage;
		 let customTime = start + interval / 2;
		 this.setCustomTimeLine(start, end, customTime);
		 this._timelineRunning(500);
		 const { currentSeverity } = this.state;
		 const endTime = end + 3540000 + 60000;
		 this.props.alarmSearch(start, endTime, currentSeverity, this.props.application, this.props.identify);
	}
	combindData(arr1, arr2) {
		 let sumArr = [...arr1, ...arr2];
		 let finalResult = [];
		 const result = this.unique(sumArr);
		 this.currentItems = result;
		 for (let item in result) {
			 finalResult.push(result[item]);
		 }
		 return finalResult;
	}
	unique(sumArr) {
		 let result = {};
		 sumArr && sumArr.forEach(item => {
		 	result[item.id] = item;
		 });
		 return result;
	}
	initalTimeline() {
		 if (!(this.timeline && this.timeline.current && this.timeline.current.$el) || this.timeline.current.$el === null) {
		 	return;
		 }
		 //  const itemInital = [{
		 //  	id: new Date().getTime(),
		 //  	sentdatetime: new Date().toISOString(),
		 //  	severity: 2,
		 //  	alarmtype: "evet",
		 //  	note:"ettete"
		 //  }];
		 //  this.generateItem(itemInital);
		 setInterval(() => {
		 	if (!(this.timeline && this.timeline.current && this.timeline.current.$el) || this.timeline.current.$el === null) {
		 		return;
		 	}
		 	let time = this.timeline.current && this.timeline.current.$el.getWindow();
		 	const { currentSeverity } = this.state;
		 	const start = time.start.getTime();
		 	const end = time.end.getTime();
		 	const endTime = end + 3540000 + 60000;
		 	this.props.alarmSearch(start, endTime, currentSeverity, this.props.application, this.props.identify);
		 }, 3540000);
		 this._timelineRunning(500);
	}
	_timelineMoveByRate = (rate) => {
		 if (!(this.timeline && this.timeline.current && this.timeline.current.$el) || this.timeline.current.$el === null) {
		 	return;
		 }
		 let { customTimes } = this.state;
		 let time = this.timeline.current.$el.getWindow();
		 let start = time.start.getTime() + rate;
		 let end = time.end.getTime() + rate;
		 let custime = customTimes.one.valueOf() + rate;
		 if(moment().valueOf() - custime < 500){
			 custime = moment().valueOf();
		 }
		 if (changFlag) {
		 	start = start + diffTime;
		 	end = end + diffTime;
		 	custime = custime + diffTime;
		 	changFlag = false;
		 }
		 // const range = (end - start)/2;
		 this.setCustomTimeLine(start, end, custime);
	};
	_timelineRunning(rate) {
		 clearTimeout(this._timelineRunningTimer[this.props.identify]);
		 this._timelineRunningTimer[this.props.identify] = setTimeout(() => {
		 	this._timelineMoveByRate(rate);
		 	this._timelineRunning(rate);
		 }, rate);
	}
	rangeChangedHandler(e) {
		 if (!(this.timeline && this.timeline.current && this.timeline.current.$el) || this.timeline.current.$el === null) {
		 	return;
		 }
		 if (e.byUser) {
		 	// clearTimeout(this._timelineRunningTimer[this.props.identify]);
		 	let time = this.timeline.current.$el.getWindow();
		 	const start = time.start.getTime();
		 	const end = time.end.getTime();
		 	const range = (end - start) / 2;
		 	let custime = start + range;
		 	const endTime = end + 3540000 + 60000;
		 	const { currentSeverity } = this.state;
		 	this.props.alarmSearch(start, endTime, currentSeverity, this.props.application, this.props.identify);
		 	this.setCustomTimeLine(start, end, custime);
		 	// this._timelineRunning(500);
		 }

	}

	// timeChangedHandler() {
	// 	// this.setCustomTimeLine();
	// }
	zoomIn() {
	 //  const {slidervalue} = this.state;
	 //  if(slidervalue === 0){
	 // 	 return;
	 //  }
		 this.timeline && this.timeline.current && this.timeline.current.$el && this.timeline.current.$el.zoomIn(0.2, { animation: false }, () => {
		 	let time = this.timeline.current.$el.getWindow();
		 	const start = time.start.getTime();
		 	const end = time.end.getTime();
		 	const endTime = end + 3540000 + 60000;
			 const { currentSeverity } = this.state;
		   //  this.setState({slidervalue : slidervalue-20>0 ? slidervalue-20 : 0});
		 	this.props.alarmSearch(start, endTime, currentSeverity, this.props.application, this.props.identify);
		 });

	}
	zoomOut() {
		 //  const {slidervalue} = this.state;
		 //  if(slidervalue === 100){
		 //  	return;
		 //  }
		 this.timeline && this.timeline.current && this.timeline.current.$el && this.timeline.current.$el.zoomOut(0.2, { animation: false }, () => {
		 	let time = this.timeline.current.$el.getWindow();
		 	const start = time.start.getTime();
		 	const end = time.end.getTime();
		 	const endTime = end + 3540000 + 60000;
			 const { currentSeverity } = this.state;
			 //  this.setState({slidervalue : slidervalue+20<100 ? slidervalue+20 : 100});
		 	this.props.alarmSearch(start, endTime, currentSeverity, this.props.application, this.props.identify);
		 });
	}
	zoomLeft() {
		 this.move(0.5);
	}
	zoomRight() {
		 this.move(-0.5);
	}
	handleShowLocationFunc(currentAlarm) {
		 //  let locateData = {
		 //     deviceName: currentAlarm.infos[0].parameters.deviceName,
		 //     coordinates: currentAlarm.infos[0].areas[0].features[0].geometry.coordinates,
		 //     icon: "computer",
		 //     identify: this.props.identify,
		 //     reducerName: timelineName,
		 //     nodeName: "deviceLocation"
		 //  };
		 let locateData = {"deviceName":"IPCAM-OD-A-1-13","coordinates":[103.74943256378174,1.3225763556778443],"icon":"computer","identify":"Timeline","reducerName":"timeline","nodeName":"deviceLocation"};
		 this.props.storeDeviceLocation(this.props.identify, locateData);
		 this.props.showDeviceLocationInMap(locateData);
	}
	handleAcknowledge = (currentAlarm) => {
		 let owner = currentAlarm.owner;
		 let id = currentAlarm.id;
		 if (currentAlarm.state !== "unowned") {
			 this.props.callReminder("Unable to modify alarm state.");
		 } else {
		 	owner = !owner ? Store.getState().identify.userid : owner;
			 this.props.changeState(id, owner, "owned", this.props.identify);
		 }
	};
	handleExport = (currentAlarm) =>{
		 let fileinfo = {
			 "fileinfo":{
		 		"filename":ColumnConfig.filename,
      	 		"timezone":-8,
		 		"format":ColumnConfig.format,
		 		"columninfos": ColumnConfig.columninfos,
			 },
			 "filter":{  
			    "type":"alarms",
			    "format":"filter",
			    "predicate":{  
			       "field":"capevent.id",
			       "operator":"EQ",
			       "value":currentAlarm.id
			    }
			 }
		 };
		 this.props.alarmExport(fileinfo, this.props.identify);
	}
	handleSliderChange(slidervalue) {
		 if(slidervalue === 0){
			 return;
		 }
		 this.setState({ slidervalue }, () => {
		 	this.timeline && this.timeline.current && this.timeline.current.$el && this.timeline.current.$el.zoomIn(slidervalue / 100);
		 });
	}
	clickHandler(e) {
		 let { basicOptions } = this.state;
		 e.event.preventDefault();
		 e.event.stopPropagation();
		 if(this.actionFlag === 1){
			 this.actionFlag = 0;
			 return;
		 }
		 this.actionFlag++;
		 if (e.event.firstTarget.className.includes("template-down")) {
		 	basicOptions.items.forEach((item, i) => {
		 		if (item.id === e.items[0]) {
		 			basicOptions.items[i]["content"] = this.renderTemplateShow(item);
		 		}
		 	});
		 	this.setState({ basicOptions });
		 	return;
		 } else if (e.event.firstTarget.className.includes("template-up")) {
		 	basicOptions.items.forEach((item, i) => {
		 		if (item.id === e.items[0]) {
		 			basicOptions.items[i]["content"] = this.renderTemplate(item);
		 		}
		 	});
		 	this.setState({ basicOptions });
		 	return;
		 } else if (e.event.firstTarget.className.includes("item-detail")) {
			 this.props.handleFloatTabOpen(e.items && e.items[0], this.currentItems[e.items && e.items[0]]);
		 } else if (e.event.firstTarget.className.includes("item-location")) {
		 	this.handleShowLocationFunc(this.currentItems[e.items && e.items[0]]);
		 }  else if (e.event.firstTarget.className.includes("item-export")) {
			 this.handleExport(this.currentItems[e.items && e.items[0]]);
		 } else if (e.event.firstTarget.className.includes("item-acknowlage")) {
		 	this.handleAcknowledge(this.currentItems[e.items && e.items[0]]);
		 }
	}
	render() {
		 const { basicOptions, customTimes } = this.state;
		 const { classes } = this.props;
		 return (
		 	<div className="timeline">
		 		<Refresh identify={this.props.identify} {...this.props} />
		 		<div className={`timeline-date ${classes.backgroundColor} ${classes.textColor}`}>{moment(customTimes["one"]).format("dddd DD MMMM YYYY")}</div>
		 		<Timeline className="timeline" {...basicOptions} customTimes={customTimes} rangechangedHandler={this.rangeChangedHandler} ref={this.timeline} selectHandler={this.clickHandler} />
		 		<div className={classnames("bottom-action", classes.backgroundColor)}>
		 			 <Button color="secondary" onClick={this.zoomLeft}><ChevronLeftIcon color="action" /></Button>
		 			 <Button color="secondary" onClick={this.zoomRight}><ChevronRightIcon color="action" /></Button>
		 			 <Button color="secondary" onClick={this.zoomIn}><ZoomOutIcon color="action" /></Button>
					 {/* <Slider value={slidervalue} handleSliderChange={this.handleSliderChange.bind(this)} /> */}
					 <Button color="secondary" onClick={this.zoomOut}><ZoomInIcon color="action" /></Button>
		 		</div>
		 	</div>
		 );
	}

}
const mapStateToProps = (state) => {
	 // let identify = ownProps.identify;
	 // const streamingData =  filterProps(state, identify, "streamingData");
	 // console.log("mapStateToProps");
	 // console.log(streamingData);
	 // return {
	 // 	alarmData: filterProps(state, identify, "alarmData"),
	 // 	streamingData: filterProps(state, identify, "streamingData")
	 // };
	 return state[timelineName] || {};
};

const mapDispatchToProps = dispatch => {
	 return {
	 	alarmSearch: (startTime, endTime, severity, application, identify) => {
	 		dispatch(alarmSearchTimeline(startTime, endTime, severity, application, identify));
		 },
		 showDeviceLocationInMap: locateData => {
            dispatch(msg.publish("deviceLocInMap", "ISC_MSG_BUS", [{ locateData: locateData }], "deviceLocInMap"));
        },
        storeDeviceLocation: (identify, locateData) => {
            dispatch(storeDeviceLocation(identify, locateData));
		 },
        changeState: (id, owner, state, identify) => {
            dispatch(changeStateRequest(id, owner, state, identify));
		 },
		 alarmExport: (filterConfig, identify) =>{
			 dispatch(alarmExport(filterConfig, identify));
		 },
		 callReminder: val => {
            dispatch(messageCenter.warn(val, "Timeline"));
        }
	 };
};

export default withStyles(styles)(
	 connect(
	 	mapStateToProps,
	 	mapDispatchToProps
	 )(TimelineComp)
);

