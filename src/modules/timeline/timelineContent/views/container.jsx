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
 * Created by wangrui on 22/06/2018.
 */
import React from "react";
// import PropTypes from "prop-types";
import { connect } from "react-redux";
import "../styles/style.less";
import Timeline from "./timeline";
import {
    ccmsControl,
    closeFloatTab,
    openFloatTab
} from "../funcs/actions";
import Card from "@material-ui/core/Card";
import { view as TimelineEnhanceFilter } from "modules/timeline/timelineEnhanceFilter";
import {view as FloatTab} from "modules/timeline/timelineFloatTab";
import { reducerName as timelineReducerName } from "modules/timeline/timelineContent";
import { Export } from "./functions";
class TimelineContainer extends React.Component {
    componentWillMount() {
        this.application = this.props.currentApplicationInfo && this.props.currentApplicationInfo["address.name"];
    }

    componentWillReceiveProps(nextProps) {
        this.props.ccmsControl(this.props.identify);
    }
    handleFloatTabClose() {
        this.props.closeFloatTab(this.props.identify);
    }
    handleFloatTabOpen(type, details) {
        this.props.openFloatTab(type, details, this.props.identify);
    }
    render() {
        return (
            <div className="timeline-container">
                <Export identify={this.props.identify} />
                <Card className="timeline-cont">
                    <TimelineEnhanceFilter
                        identify={this.props.identify}
                        title={this.props.title}
                        subTitle={this.props.subTitle}
                        onFullScreen={this.props.onFullScreen}
                        onFullScreenExit={this.props.onFullScreenExit}
                        full={this.props.full}
                        fullScreen={this.props.fullScreen}
                    />
                    <Timeline
                        identify={this.props.identify}
                        handleFloatTabOpen = {this.handleFloatTabOpen.bind(this)}
                        application={this.application}
                    />
                </Card>
                <FloatTab
                    identify={this.props.identify}
                    handleFloatTabClose = {this.handleFloatTabClose.bind(this)}
                />
            </div>
        );
    }
}

TimelineContainer.propTypes = {
};

TimelineContainer.defaultProps = {
    title: "Timeline",
    identify: "timeline",
};

const filterProps = (state, identify, reducerName, props) => {
    if (state[reducerName] && state[reducerName][identify]) {
        return state[reducerName][identify][props];
    }
};

const mapStateToProps = (state, ownProps) => {
    let identify = ownProps.identify || "timeline";
    return {
        title: filterProps(state, identify, timelineReducerName, "title") || ownProps.title,
        subTitle: filterProps(state, identify, timelineReducerName, "subTitle") || ownProps.subTitle,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        ccmsControl: (identify) => {
            dispatch(ccmsControl(identify));
        },
        closeFloatTab: identify => {
            dispatch(closeFloatTab(identify));
        },
        openFloatTab: (type, details, identify) => {
            dispatch(openFloatTab(type, details, identify));
        },
        // initAllRedux: identify => {
        //     dispatch(initAllRedux(identify));
        // }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TimelineContainer);
