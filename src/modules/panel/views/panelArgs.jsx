/*
* =========================================================================
*  Copyright (C)2018 NCS Pte. Ltd. All Rights Reserved
*
*  This software is confidentifyential and proprietary to NCS Pte. Ltd. You shall
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
 * Created by Deng Xiaolong on 28/05/2018.
 */

import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import PanelDeviceReading from "./panelArguments/deviceReading";
import PanelArgsAlarm from "./panelArguments/alarm";
import PanelArgsEvent from "./panelArguments/event";
import PanelArgsDevice from "./panelArguments/device";
import { panelEditerStatus } from "./../funcs/actions";
import { REDUCER_NAME as panelReducer } from "./../funcs/constants";

class PanelArgs extends Component {
    static defaultProps = {
        get: () => {}
    };
    static propTypes = {
        get: PropTypes.func
    };
    state = {
        currentPanel: "Alarm Panel"
    };
    componentDidMount() {
        this.props.get(this);
    }
    getData = () => {
        const { dispatch ,identify } = this.props;
        const data = this.props[`panel${identify}`];
        if (data.tempData) {
            delete data.tempData;
        }
        if (data.loading) {
            delete data.loading;
        }
        if (data.editer) {
            data.editer = "edited";
        }
        dispatch(panelEditerStatus("edited", identify));
        console.log(data);
        return data;
    };
    render() {
        const { identify } = this.props;
        const currentPanel = this.props[`panel${identify}`] ? this.props[`panel${identify}`].type : "";
        // console.log(this.props);
        return (
            <div className="panel_arguments">
                {currentPanel === "Device Reading Panel" ? (
                    <PanelDeviceReading {...this.props} />
                ) : currentPanel === "Alarm Panel" ? (
                    <PanelArgsAlarm {...this.props} />
                ) : currentPanel === "Event Panel" ? (
                    <PanelArgsEvent {...this.props} />
                ) : currentPanel === "Device Panel" ? (
                    <PanelArgsDevice {...this.props} />
                ) : (
                    ""
                )}
            </div>
        );
    }
}
const getData = state => {
    return state[panelReducer] || {};
};
export default connect(getData)(PanelArgs);
