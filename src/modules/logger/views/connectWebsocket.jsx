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
 * Created by Luo Jia on 25/05/2018.
 * Modified by Luo Jia on 25/05/2018.
 */
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as actions from "../funcs/action";
import { REDUCER_NAME } from "../funcs/constants";
class ConnectWebsocket extends React.Component {
    state = {};
    componentWillReceiveProps(nextProps) {
        const { paginations = {}, moduleChild, pushWebsocket = false } = nextProps;
        const { currentpage = 1, totalpages = -1, limit } = paginations;
        if (
            currentpage === totalpages &&
            totalpages !== -1 &&
            pushWebsocket
            // !_.isEqual(this.props.paginations, paginations) &&
            // totalpages !== -1 &&
            // !_.isEqual(this.props, nextProps) &&
            // criteria === "ALL"
            // this.props.moduleChild !== moduleChild &&
            // !_.isEqual(this.props.payload, payload)
            // this.props.module !== module
        ) {
            let postData = {
                logName: moduleChild,
                pageSize: +limit
            };
            this.props.reset({ pushWebsocket: false });
            this.props.publishMSG("ISC_LOGGER", "ISC_LOGGER", postData);
        }
    }
    render() {
        return null;
    }
}
ConnectWebsocket.propTypes = {
    classes: PropTypes.object
};
ConnectWebsocket.defaultProps = {};
const mapStateToProps = state => {
    return {
        // moduleList: state[REDUCER_NAME] && state[REDUCER_NAME].moduleList,
        // module: state[REDUCER_NAME] && state[REDUCER_NAME].module,
        // moduleChildList: state[REDUCER_NAME] && state[REDUCER_NAME].secondModuleList,
        moduleChild: state[REDUCER_NAME] && state[REDUCER_NAME].moduleChild,
        // criteria: state[REDUCER_NAME] && state[REDUCER_NAME].criteria,
        // payload: state[REDUCER_NAME] && state[REDUCER_NAME].payload,
        paginations: state[REDUCER_NAME] && state[REDUCER_NAME].paginations,
        pushWebsocket: state[REDUCER_NAME] && state[REDUCER_NAME].pushWebsocket
        // payload: state[REDUCER_NAME] && state[REDUCER_NAME].payload
    };
};

const mapDispatchToProps = dispatch => {
    return {
        reset: reset => {
            dispatch(actions.reset(reset));
        },
        publishMSG: (topic, category, args, streamid) => {
            dispatch(actions.publishMSG(topic, category, args, streamid));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectWebsocket);
