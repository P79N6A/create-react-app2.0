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

import { Component } from "react";
import {
    addWsData,
    changeCount,
    getAlarmListData,
    getDeviceListData,
    getEventListData,
    panelChangeLoadingStatus
} from "./../../funcs/actions";
import { calcMultipleCount } from "./../../funcs/utils/deviceReadingUtil";
import { handleTargetPanelProps } from "./../../funcs/utils";
import getTimeString from "commons/utils/isc8601Generator";
import { getAlarmTypeParameter } from "./../../funcs/utils/alarmUtils";
import { getEventTypeParameter } from "./../../funcs/utils/eventUtils";
import {
    wsConstKey,
    isDateMatch,
    isDeviceRefresh,
    isConditionMatch,
    isDeviceReadingRefresh
} from "./../../funcs/utils/autoRefresh";
import { c_ } from "modules/mapAndPanelCommon";

let eventTimer = null;
let alarmTimer = null;
let deviceTimer = null;

export default class AutoRefresh extends Component {
    constructor(props) {
        super(props);
        this.debounce = 4000;
    };

    componentWillReceiveProps(nextProps, nextContext) {
        const { identify, dispatch } = this.props;
        const { wsMessage } = nextProps;
        const data = nextProps[`panel${identify}`];

        // for device reading panel auto refresh
        if (isDeviceReadingRefresh(data, wsMessage)) {
            const deviceReadingArr = handleTargetPanelProps(nextProps, "Device Reading Panel");
            const wsParameters = wsMessage.data.parameters;
            const { deviceid } = wsParameters;
            deviceReadingArr.forEach(item => {
                let { deviceReadingDataWs, parameters, identify } = item;
                if (deviceReadingDataWs) {
                    const unit = parameters.units ? `(${parameters.units})` : "";
                    item.parameters.iotTopologyIds.forEach(innerItem => {
                        if (innerItem.value === deviceid) {
                            const { choosedParameters } = item.parameters;
                            if ((deviceReadingDataWs[deviceid] && wsParameters[choosedParameters]) || wsParameters[choosedParameters] === 0) {
                                deviceReadingDataWs[deviceid] = wsParameters[choosedParameters];
                                if (c_.JS(item.wsMessage) !== c_.JS(nextProps.wsMessage)) {
                                    deviceReadingArr.forEach(item => {
                                        dispatch(addWsData(nextProps.wsMessage, item.identify));
                                    });
                                    dispatch(changeCount(
                                        `${calcMultipleCount(Object.values(deviceReadingDataWs), parameters.aggregation)}${unit}`,
                                        parameters,
                                        identify
                                    ));
                                }
                            }
                        }
                    });
                }
            });
        }

        // for alarm panel auto refresh
        if (wsMessage && wsMessage[wsConstKey] && (wsMessage[wsConstKey] === "ISCAlarms")) {
            if (alarmTimer) {
                clearTimeout(alarmTimer);
            }
            alarmTimer = setTimeout(() => {
                if (data.editer === "edited") {
                    const alarmPanelArr = handleTargetPanelProps(nextProps, "Alarm Panel");
                    alarmPanelArr.forEach(forItem => {
                        if (c_.JS(forItem.wsMessage) !== c_.JS(wsMessage)) {
                            const { timeArr, mode } = forItem.parameters;
                            alarmPanelArr.forEach(item => {
                                dispatch(addWsData(nextProps.wsMessage, item.identify));
                            });
                            if (isDateMatch(timeArr, wsMessage.data.sentdatetime, mode) && isConditionMatch(forItem, wsMessage)) {
                                this.refreshAlarm(forItem);
                            }
                        }
                    });
                }
            }, this.debounce);
        }

        // for event panel auto refresh
        if (wsMessage && wsMessage[wsConstKey] && wsMessage[wsConstKey].toLowerCase().indexOf("iscevent") !== -1) {
            if (eventTimer) {
                clearTimeout(eventTimer);
            }
            eventTimer = setTimeout(() => {
                if (data.editer === "edited" && wsMessage && c_.JS(wsMessage) !== "{}") {
                    const eventPanelArr = handleTargetPanelProps(nextProps, "Event Panel");
                    eventPanelArr.forEach(forItem => {
                        if (c_.JS(forItem.wsMessage) !== c_.JS(wsMessage)) {
                            const { timeArr, mode } = forItem.parameters;
                            eventPanelArr.forEach(item => {
                                dispatch(addWsData(nextProps.wsMessage, item.identify));
                            });
                            if (isDateMatch(timeArr, wsMessage.data.sentdatetime, mode) && isConditionMatch(forItem, wsMessage)) {
                                this.refreshEvent(forItem);
                            }
                        }
                    });
                }
            }, this.debounce);
        }

        // for device panel auto refresh
        if (isDeviceRefresh(wsMessage)) {
            if (deviceTimer) {
                clearTimeout(deviceTimer);
            }
            deviceTimer = setTimeout(() => {
                if (data.editer === "edited" && wsMessage && c_.JS(wsMessage) !== "{}") {
                    const devicePanelArr = handleTargetPanelProps(nextProps, "Device Panel");
                    devicePanelArr.forEach(forItem => {
                        if (c_.JS(forItem.wsMessage) !== c_.JS(wsMessage)) {
                            devicePanelArr.forEach(item => {
                                dispatch(addWsData(nextProps.wsMessage, item.identify));
                            });
                            this.refreshDevice(forItem);
                        }
                    });
                }
            }, this.debounce);
        }
    };

    refreshAlarm = (props) => {
        const { parameters: data, identify } = props;
        if (props && props.parameters !== "undefined") {
            const { dispatch } = this.props;
            dispatch(panelChangeLoadingStatus("loading", identify));
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
        }
    };

    refreshEvent = (props) => {
        const { parameters, identify } = props;
        if (props && parameters !== "undefined") {
            const { dispatch } = this.props;
            dispatch(panelChangeLoadingStatus("loading", identify));
            if (!parameters.eventType) {
                return;
            }
            dispatch(
                getEventListData(
                    parameters.mode === "realTime" ? [getTimeString(parameters.timeArr[0])] : parameters.timeArr,
                    getEventTypeParameter(parameters.eventType),
                    parameters,
                    identify
                )
            );
        }
    };

    refreshDevice = (props) => {
        const { parameters, identify } = props;
        if (props && parameters !== "undefined") {
            const { dispatch } = this.props;
            dispatch(panelChangeLoadingStatus("loading", identify));
            dispatch(getDeviceListData(parameters.device, parameters, identify));
        }
    };

    render() {
        return null;
    };
}
