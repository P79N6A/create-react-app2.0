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
 * Created by SongCheng on 20/05/2018.
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import EventTabs from "./eventTabs";
import "../styles/style.less";
import { connect } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";

class EventDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: null
        };
    }

    render() {
        const { identify, detail, dateStyle } = this.props;
        const identifyData = this.props[identify];
        const dateStyleNew = (identifyData && identifyData.dateStyle) || dateStyle;

        return (
            <div className="detailBox">
                {!detail ? (
                    <div className="loading">
                        <CircularProgress color="secondary" />
                    </div>
                ) : (
                    <EventTabs {...this.props} dateStyle={dateStyleNew} detailData={detail} />
                )}
            </div>
        );
    }
}

EventDetail.propTypes = {
    classes: PropTypes.object.isRequired
};
EventDetail.defaultProps = {
    defaultValue: 0,
    tabTypes: ["Favourite", "Detail"]
};

const mapStateToProps = (state, ownProps) => {
    return state.event || {};
};

export default connect(
    mapStateToProps,
    null
)(EventDetail);
