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
import PropTypes from "prop-types";
import { connect } from "react-redux";
import PanelBox from "./panelBox";
import { REDUCER_NAME as panelReducer } from "./../funcs/constants";
import { getAlarmTypeParameter } from "./../funcs/utils/alarmUtils";
import { getEventTypeParameter } from "./../funcs/utils/eventUtils";
import { durationTimer } from "./../funcs/utils";
import getTimeString from "commons/utils/isc8601Generator";
import { ExportComps, AutoRefresh } from "./commonComponents";
import {
    getAlarmListData,
    getEventListData,
    getDeviceListData,
    getTopologyListValue,
    panelChangeLoadingStatus
} from "./../funcs/actions";
import "./../styles/style.less";

const getPanel = state => {
    const data = state[panelReducer] || {};
    return {
        ...data
    };
};

@connect(getPanel)
export default class PanelContainer extends Component {
    static propTypes = {
        identify: PropTypes.string.isRequired
    };

    componentWillMount() {
        const { identify } = this.props;
        const data = this.props[`panel${identify}`];
        if (data && data.editer === "editing") {
            return;
        }
        this.getInitData(data);
        let {
            durationTimer: durationTimeTimer,
            durationSwitch,
            durationTime
        } = data;
        if (durationSwitch) {
            this[durationTimeTimer] = setInterval(() => {
                // console.log(durationTimeTimer);
                this.getInitData(data);
            },
            // 5000
            durationTimer(durationTime)
            );
        }
    }

    getInitData = (props) => {
        const {
            parameters: data,
            type,
            identify,
        } = props;
        if (props && data) {
            const { dispatch } = this.props;
            dispatch(panelChangeLoadingStatus("loading", identify));
            switch (type) {
                case "Alarm Panel":
                    if (data.alarmType) {
                        dispatch(
                            getAlarmListData(
                                data.mode === "realTime" ? [getTimeString(data.timeArr[0])] : data.timeArr,
                                getAlarmTypeParameter(data.alarmType),
                                data,
                                identify
                            )
                        );
                    }
                    break;
                case "Event Panel":
                    if (!data.eventType) {
                        return;
                    }
                    dispatch(
                        getEventListData(
                            data.mode === "realTime" ? [getTimeString(data.timeArr[0])] : data.timeArr,
                            getEventTypeParameter(data.eventType),
                            data,
                            identify
                        )
                    );
                    break;
                case "Device Panel":
                    if (data.device) {
                        dispatch(getDeviceListData(data.device, data, identify));
                    }
                    break;
                case "Device Reading Panel":
                    if (data.iotTopologyIds && data.iotTopologyIds.length) {
                        dispatch(getTopologyListValue(
                            data.iotTopologyIds.map(item => item.value),
                            data,
                            data.choosedParameters,
                            data.units,
                            identify
                        ));
                    } else {
                        dispatch(panelChangeLoadingStatus("loaded", identify));
                    }
                    break;
                default:
                    break;
            }
        }
    };

    componentWillUnmount() {
        const { identify } = this.props;
        const data = this.props[`panel${identify}`];
        const { durationTimer } = data;
        // console.log(this[durationTimer]);
        if (this[durationTimer]) {
            clearInterval(this[durationTimer]);
        }
        if (data && data.editer === "editing") {
            return;
        }
    };

    render() {
        const { wsMessage, identify } = this.props;
        const data = this.props[`panel${identify}`];
        return (
            <div className="panel_container">
                <PanelBox {...this.props} />
                {data && data.editer === "edited" ? (
                    <ExportComps
                        identify={this.props.identify}
                        source="alarmList"
                    />
                ) : (
                    ""
                )}
                {(data && wsMessage && JSON.stringify(wsMessage) !== "{}" && data.editer === "edited") ? (
                    <AutoRefresh
                        {...this.props}
                    />
                ) : ""
                }
            </div>
        );
    }
}
