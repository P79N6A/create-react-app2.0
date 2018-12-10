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
import "../styles/style.less";
import EnhanceFilter from "./enhanceHeaderFilter";
class TimelineFilterCont extends React.Component {
    componentWillMount() { }
    render() {
        return (
            <div className="timeline-filter">
                <EnhanceFilter
                    identify={this.props.identify}
                    title={this.props.title}
                    subTitle={this.props.subTitle}
                    onFullScreen={this.props.onFullScreen}
                    onFullScreenExit={this.props.onFullScreenExit}
                    full={this.props.full}
                    fullScreen={this.props.fullScreen}
                />
            </div>
        );
    }
}

TimelineFilterCont.propTypes = {
};

TimelineFilterCont.defaultProps = {};


export default TimelineFilterCont;
