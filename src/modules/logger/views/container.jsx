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
import * as actions from "../funcs/action";
import { connect } from "react-redux";
import List from "./list";
import ConnectWebsocket from "./connectWebsocket";
import Download from "./download";
import { initState } from "../funcs/constants";
class Logger extends React.Component {
    state = {};
    componentDidMount() {
        this.props.getModules();
        this.props.autoRefreshInit("ISCLogger");
    }
    componentWillUnmount() {
        this.props.reset(Object.assign({}, initState));
    }
    render() {
        return (
            <div style={{ height: "100%", position: "relative" }}>
                <ConnectWebsocket reset={this.reset} />
                <Download />
                <List reset={this.reset} />
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getModules: () => {
            dispatch(actions.getModules());
        },
        autoRefreshInit: identify => {
            dispatch(actions.autoRefreshInit(identify));
        },
        reset: reset => {
            dispatch(actions.reset(reset));
        }
    };
};

Logger.propTypes = {
    classes: PropTypes.object
};
Logger.defaultProps = {};
export default connect(
    null,
    mapDispatchToProps
)(Logger);
