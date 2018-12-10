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
import SetTitle from "../commonComponents/setTitle";
import RealDatePicker from "../commonComponents/datePicker";
import IconAndColor from "../commonComponents/iconAndColor";
import { MultipleSelect } from "modules/mapAndPanelCommon";
import SelectTypeState from "./../commonComponents/selectTypeState";
import SelectSeverity from "./../commonComponents/selectSeverity";
import { finallyData, choosedData, getAlarmTypeParameter } from "../../funcs/utils/alarmUtils";
import {
    mapGetAlarmList,
    mapGetAllKindsOfData,
    clearMapInfo,
    mapChangeLoadingStatus,
    mapChangeEditerStatus
} from "../../funcs/actions";
import getTimeString from "commons/utils/isc8601Generator";

class AlarmLocations extends Component {
    state = {
        mode: "realTime",
        alarmTypeStatus: false,
        alarmSeverityStatus: false,
        alarmStateStatus: false,
        typeData: [], 
        choosedType: [],
        choosedTypeData: [],
        choosedSeverityData: [],
        choosedStateData: [],
        finallyData: [],
        choosedData: {},
        forChooseType: [],
        forChooseSeverity: [],
        forChooseState: [],
        timeArr: ["isc::{Today(00:00:00)-iso8601::(P1D)}"],
        icon: "",
        iconColor: ""
    };
    componentWillMount() {
        const { dispatch, identify, callLoading } = this.props;
        const data = this.props[`map${identify}`];
        callLoading(true);
        dispatch(mapChangeLoadingStatus("loading", identify));
        dispatch(mapChangeEditerStatus("editing", identify));
        if (data && JSON.stringify(data.parameters) !== "{}" && data.parameters.choosedData) {
            const { parameters } = data;
            this.setState({
                timeArr: parameters.timeArr || ["isc::{Today(00:00:00)-iso8601::(P1D)}"],
                choosedData: parameters.choosedData || {},
                choosedTypeData: parameters.choosedData.type || [],
                choosedSeverityData: parameters.choosedData.severity,
                choosedStateData: parameters.choosedData.state,
                typeData: parameters.typeData || [],
                finallyData: parameters.finallyData,
                alarmTypeStatus: parameters.typeData.includes("Alarm Type"),
                alarmSeverityStatus: parameters.typeData.includes("Alarm Severity"),
                alarmStateStatus: parameters.typeData.includes("Alarm State"),
                icon: parameters.icon,
                iconColor: parameters.iconColor
            }, () => {
                if (data.parameters) {
                    const { timeArr } = this.state;
                    dispatch(mapGetAlarmList(
                        [getTimeString(timeArr[0])],
                        data.parameters.finallyData,
                        data.parameters,
                        identify
                    ));
                }
            });
        } else {
            this.setState({
                icon: data.icon,
                iconColor: data.iconColor
            });
        }
        if (data && JSON.stringify(data.parameters) === "{}") {
            const { timeArr } = this.state;
            dispatch(mapGetAlarmList(
                [getTimeString(timeArr[0])],
                [],
                {timeArr, finallyData: []},
                identify
            ));
        } else {
            if (data.parameters.typeData && data.parameters.typeData.length) {
                data.parameters.typeData.forEach(item => {
                    dispatch(mapGetAllKindsOfData(
                        getAlarmTypeParameter(item),
                        identify
                    ));
                });
            } else {
                const { timeArr } = data.parameters;
                dispatch(mapGetAlarmList(
                    [getTimeString(timeArr[0])],
                    [],
                    {timeArr, finallyData: []},
                    identify
                ));
            }
        }
    };
    componentWillReceiveProps(nextProps) {
        const { identify, callLoading } = this.props;
        const data = nextProps[`map${identify}`];
        callLoading(data.loading === "loading");
        if (data) {
            const { typeData, severityData, stateData } = data;
            if (typeData) {
                this.setState({
                    forChooseType: typeData
                });
            }
            if (severityData) {
                this.setState({
                    forChooseSeverity: severityData
                });
            }
            if (stateData) {
                this.setState({
                    forChooseState: stateData
                });
            }
            this.setState({
                icon: data.icon,
                iconColor: data.iconColor
            });
        }
    };
    selectedDataRange = e => {
        this.setState({
            mode: e
        });
    };
    // type select
    typeSelect = e => {
        // Alarm Type, Alarm Severity, Alarm State
        const { dispatch, identify } = this.props;
        const { timeArr, choosedData } = this.state;
        dispatch(mapChangeLoadingStatus("loading", identify));
        let data = {};
        if (JSON.stringify(choosedData) !== "{}") {
            if (e.includes("Alarm Type") && choosedData.type) {
                data = finallyData("type", choosedData.type);
            } else if (!e.includes("Alarm Type") && choosedData.type) {
                data = finallyData("type", []);
            }
            if (e.includes("Alarm Severity") && choosedData.severity) {
                data = finallyData("severity", choosedData.severity);
            } else if (!e.includes("Alarm Severity") && choosedData.severity) {
                data = finallyData("severity", []);
            }
            if (e.includes("Alarm State") && choosedData.state) {
                data = finallyData("state", choosedData.state);
            } else if (!e.includes("Alarm State") && choosedData.state) {
                data = finallyData("state", []);
            }
            dispatch(mapGetAlarmList(
                [getTimeString(timeArr[0])],
                data,
                {finallyData: data, typeData: e, choosedData: choosedData, timeArr},
                identify
            ));
        }
        this.setState({
            typeData: e,
            alarmTypeStatus: e.includes("Alarm Type"),
            alarmSeverityStatus: e.includes("Alarm Severity"),
            alarmStateStatus: e.includes("Alarm State")
        }, () => {
            if (e.length) {
                e.forEach(item => {
                    dispatch(mapGetAllKindsOfData(
                        getAlarmTypeParameter(item),
                        identify
                    ));
                });
            } else {
                this.setState({
                    finallyData: [],
                    choosedData: {}
                }, () => {
                    const { finallyData, typeData, choosedData } = this.state;
                    dispatch(clearMapInfo(
                        [], {timeArr}, identify
                    ));
                    dispatch(mapGetAlarmList(
                        [getTimeString(timeArr[0])],
                        [],
                        {finallyData, typeData, choosedData, timeArr},
                        identify
                    ));
                });
            }
        });
    };
    // alarm type select
    alarmTypeSelect = e => {
        const { identify, dispatch, callLoading } = this.props;
        const data = finallyData("type", e);
        callLoading(true);
        dispatch(mapChangeLoadingStatus("loading", identify));
        this.setState({
            finallyData: data,
            choosedData: choosedData(),
            choosedTypeData: e
        }, () => {
            const { typeData, choosedData, timeArr } = this.state;
            dispatch(mapGetAlarmList(
                [getTimeString(timeArr[0])],
                data,
                {finallyData: data, typeData, choosedData, timeArr},
                identify
            ));
        });
        
    };
    // alarm severdity select
    alarmSeveritySelect = e => {
        const { identify, dispatch, callLoading } = this.props;
        const { icon, iconColor } = this.state;
        const data = finallyData("severity", e);
        callLoading(true);
        dispatch(mapChangeLoadingStatus("loading", identify));
        this.setState(
            {
                finallyData: data,
                choosedData: choosedData(),
                choosedSeverityData: e
            },
            () => {
                const { typeData, choosedData, timeArr } = this.state;
                dispatch(mapGetAlarmList(
                    [getTimeString(timeArr[0])],
                    data,
                    {finallyData: data, typeData, choosedData, timeArr, icon, iconColor},
                    identify
                ));
            }
        );
    };
    // alarm state select
    alarmStateSelect = e => {
        const { identify, dispatch, callLoading } = this.props;
        const { icon, iconColor } = this.state;
        const data = finallyData("state", e);
        callLoading(true);
        dispatch(mapChangeLoadingStatus("loading", identify));
        this.setState(
            {
                finallyData: data,
                choosedData: choosedData(),
                choosedStateData: e
            },
            () => {
                const { typeData, choosedData, timeArr } = this.state;
                dispatch(mapGetAlarmList(
                    [getTimeString(timeArr[0])],
                    data,
                    {finallyData: data, typeData, choosedData, timeArr, icon, iconColor},
                    identify
                ));
            }
        );
    };
    datePickerChange = e => {
        const { dispatch, identify, callLoading } = this.props;
        const { mode, finallyData, typeData, choosedData, icon, iconColor } = this.state;
        callLoading(true);
        dispatch(mapChangeLoadingStatus("loading", identify));
        if (mode === "realTime") {
            this.setState({
                timeArr: e
            });
            dispatch(
                mapGetAlarmList(
                    [getTimeString(e[0])],
                    finallyData,
                    { timeArr: e, finallyData, typeData, choosedData, icon, iconColor },
                    identify
                )
            );
        }
    };
    render() {
        const { identify, title } = this.props;
        const {
            mode,
            alarmTypeStatus,
            alarmSeverityStatus,
            alarmStateStatus,
            timeArr,
            typeData,
            choosedTypeData,
            choosedSeverityData,
            choosedStateData,
            forChooseSeverity,
            forChooseState,
            forChooseType,
            icon,
            iconColor
        } = this.state;
        const data = this.props[`map${identify}`];
        const mapTitle = (data && data.title) || title; 
        return (
            <React.Fragment>
                <SetTitle panelTitle={mapTitle} identify={identify} />
                <div style={{marginTop: "8px"}}>
                    <MultipleSelect
                        selectOptions={["Alarm Type", "Alarm Severity", "Alarm State"]}
                        onSelect={this.typeSelect}
                        label="select conditions"
                        identify={identify}
                        defaultValue={typeData}
                    />
                </div>
                {alarmTypeStatus ? (
                    <SelectTypeState
                        selectOptions={forChooseType}
                        onSelect={this.alarmTypeSelect}
                        label="select for type"
                        defaultValue={choosedTypeData}
                        identify={identify}
                    />
                ) : (
                    ""
                )}
                {alarmSeverityStatus ? ( 
                    <SelectSeverity
                        selectOptions={forChooseSeverity}
                        onSelect={this.alarmSeveritySelect}
                        label="select for severity"
                        defaultValue={choosedSeverityData}
                        identify={identify}
                    />
                ) : (
                    ""
                )}
                {alarmStateStatus ? (
                    <SelectTypeState
                        selectOptions={forChooseState}
                        onSelect={this.alarmStateSelect}
                        label="select for state"
                        defaultValue={choosedStateData}
                        identify={identify}
                    />
                ) : (
                    ""
                )}
                <IconAndColor
                    identify={identify}
                    iconType={icon}
                    iconColor={iconColor}
                    title="Select Icon Color"
                    defaultColor="#ffffff"
                    backgroundColor={iconColor}
                />
                <RealDatePicker
                    mode={mode}
                    label="Date Range"
                    defaultValue={timeArr}
                    onChange={this.datePickerChange}
                />
            </React.Fragment>
        );
    }
}

export default connect()(AlarmLocations);
