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
 * Created by kaidi on 25/06/2018.
 * Modified by SongCheng on 25/05/2018.
 */

import { Component } from "react";
import { connect } from "react-redux";
import { REDUCER_NAME as reducerName } from "modules/event/eventList/funcs/constants";
import { saveStreamingData, closeWsLock } from "modules/event/eventList/funcs/actions";
import _ from "lodash";
import { actions as msg } from "modules/messageCenter";
// import { I18n } from "react-i18nify";
import moment from "moment";

class WsRefreshComps extends Component {
    static propTypes = {};
    constructor(props) {
        super(props);
        this.timer = {};
        this.state = {
            streamingData: []
        };
    }

    componentWillReceiveProps(nextProps) {
        if (_.isEqual(nextProps, this.props)) {
            return;
        }
        let { wsMessage, refreshCount } = nextProps;
        !_.isEqual(wsMessage, this.props.wsMessage) && this.refreshData(nextProps);
        !_.isEqual(refreshCount, this.props.refreshCount) && this.props.handleStreamRequest();
    }

    refreshData = nextProps => {
        let identify = nextProps.identify;
        let streamArr = nextProps[identify].streamingData || [];
        let wsData = nextProps.wsMessage.data;
        let topoDisplayType = nextProps[identify].topoDisplayType;

        //ISCEvents
        if (nextProps.wsMessage["header-category"] !== "ISCEvents") {
            return;
        }
        this.setState(() => {
            const streamingData = streamArr;
            streamingData.unshift(wsData);
            if (streamingData.length > 198) {
                streamingData.length = 199;
            }
            clearTimeout(this.timer[identify]);
            this.timer[identify] = setTimeout(() => {
                let newStre = this.sortListData(streamingData, "sentdatetime", "desc");
                this.props.closeWsLock(true);
                if (topoDisplayType === "Stream") {
                    this.props.handleStreamingData(newStre, identify);
                }
            }, 1500);
            return {
                streamingData: streamingData
            };
        });
    };

    // handle ws list according to time
    sortListData = (original, orderBy, order) => {
        original.map(item => {
            item.timestamp = moment(item.sentdatetime).valueOf();
            return item;
        });
        let orderByNew = orderBy === "sentdatetime" ? "timestamp" : orderBy;
        let newData = _.orderBy(original, orderByNew, order);
        return newData;
    };

    render() {
        return null;
    }
}

const mapStateToProps = (state, ownProps) => {
    return state[reducerName] || {};
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        handleStreamingData: (data, identify) => {
            dispatch(saveStreamingData(data, identify));
        },
        callReminder: val => {
            dispatch(msg.error(val));
        },
        closeWsLock: val => {
            dispatch(closeWsLock(val, props.identify));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WsRefreshComps);
