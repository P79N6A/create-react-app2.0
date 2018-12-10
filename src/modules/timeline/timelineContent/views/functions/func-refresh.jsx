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
 * Modified by WangRui on 25/05/2018.
 */

import { Component } from "react";
import { connect } from "react-redux";
import { REDUCER_NAME as reducerName } from "../../funcs/constants";
import { saveStreamingData } from "../../funcs/actions";
import _ from "lodash";

class WsRefreshComps extends Component {
    static propTypes = {};
    constructor(props) {
        super(props);
        this.timer = {};
        this.state = {
            streamingData: []
        };
    }

    componentWillReceiveProps(nextProps, pre) {
        if (_.isEqual(nextProps, this.props)) {
            return;
        }
        let { wsMessage } = nextProps;
        !_.isEqual(wsMessage, this.props.wsMessage) && this.refreshData(nextProps);
    }

    refreshData = nextProps => {
        let identify = nextProps.identify;
        let streamArr = (nextProps[identify] && nextProps[identify].streamingData) || [];
        let wsData = nextProps.wsMessage.data;
        if (nextProps.wsMessage["header-category"] !== "ISCAlarms") {
            return;
        }
        this.setState(() => {
            const streamingData = streamArr;
            streamingData.unshift(wsData);
            if (streamingData.length > 58) {
                streamingData.length = 59;
            }
            clearTimeout(this.timer[identify]);
            this.timer[identify] = setTimeout(() => {
                this.props.handleStreamingData(streamingData, identify);
            }, 1500);
            return {
                streamingData: streamingData
            };
        });
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
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WsRefreshComps);
