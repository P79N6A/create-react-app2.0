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
 * Created by DengXiaolong on 28/05/2018.
 */

import React, { Component } from "react";
import { connect } from "react-redux";
import {
    changeCount,
    getEventListData,
    panelChangeLoadingStatus,
    panelEditerStatus
} from "./../../funcs/actions";
import getTimeString from "commons/utils/isc8601Generator";
import { getEventTypeParameter } from "./../../funcs/utils/eventUtils";
import {
    SingleSelect,
    RealDatePicker,
    SelectIcon,
    SetTitle,
    SizeAndColorControl,
    SelectColor,
    SelectAlarmFilter,
    AutoCallApiSet
} from "./../commonComponents";
import { handleDataForSelect, calcMultipleCount } from "./../../funcs/utils";

class PanelEvent extends Component {
    state = {
        mode: "realTime",
        timeArr: ["isc::{Today(00:00:00) - iso8601::(P7D)}"],
        filterStatus: false,
        eventType: "All",
        choosedFilters: [],
        tempData: [],
        defaultTitle: "",
        iotTopologyIds: [],
        countSizeControlParameter: "L",
        titleSizeControlParameter: "L",
        iconSizeControlParameter: "L",
        iconName: "",
        iconColor: "",
        countColor: "",
        titleColor: "",
        backgroundColor: "",
        parameterOneColorValue: "",
        parameterOneSizeValue: "M",
        parameterTwoColorValue: "",
        parameterTwoSizeValue: "M",
        datePickLabel: "Select Real Time",
        durationSwitch: false,
        durationTime: "30 seconds"
    };

    componentWillMount() {
        const { identify, dispatch, callLoading } = this.props;
        const dataDetail = this.props[`panel${identify}`];
        const data = dataDetail.parameters;
        callLoading(true);
        dispatch(panelEditerStatus("editing", identify));
        this.setState(
            {
                eventType: data.eventType || "All",
                timeArr: data.timeArr || ["isc::{Today(00:00:00) - iso8601::(P7D)}"],
                filterStatus: data.eventType && data.eventType !== "All",
                mode: data.mode || "realTime",
                dateRangeDefaultValue: data.timeArr || this.props.dateRangeDefaultValue,
                choosedFilters: data.choosedFilters && data.choosedFilters.length ? data.choosedFilters : [],
                defaultTitle: dataDetail.title,
                countSizeControlParameter: dataDetail.countSizeValue,
                titleSizeControlParameter: dataDetail.titleSizeValue,
                iconSizeControlParameter: dataDetail.iconSizeValue,
                iconName: dataDetail.icon,
                iconColor: dataDetail.iconColor,
                countColor: dataDetail.countColor,
                titleColor: dataDetail.titleColor,
                backgroundColor: dataDetail.backgroundColor,
                parameterOneColorValue: dataDetail.parameterOneColorValue,
                parameterOneSizeValue: dataDetail.parameterOneSizeValue,
                parameterTwoColorValue: dataDetail.parameterTwoColorValue,
                parameterTwoSizeValue: dataDetail.parameterTwoSizeValue,
                datePickLabel: (data.mode || "realTime") === "realTime" ? "Select Real Time" : "Select Date Time",
                durationSwitch: dataDetail.durationSwitch,
                durationTime: dataDetail.durationTime
            }, () => {
                const { timeArr, mode, eventType, choosedFilters } = this.state;
                if (JSON.stringify(data) === "{}") {
                    dispatch(
                        getEventListData(
                            mode === "realTime" ? [getTimeString(this.state.timeArr[0])] : timeArr,
                            getEventTypeParameter(this.state.eventType),
                            { timeArr, eventType, mode, choosedFilters },
                            identify
                        )
                    );
                } else {
                    dispatch(
                        panelChangeLoadingStatus("loading", identify)
                    );
                    dispatch(
                        getEventListData(
                            data.mode === "realTime" ? [getTimeString(data.timeArr[0])] : data.timeArr,
                            getEventTypeParameter(data.eventType),
                            data,
                            identify
                        )
                    );
                }
            });
    };

    componentWillReceiveProps(nextProps) {
        const { identify, callLoading } = nextProps;
        const dataDetail = nextProps[`panel${identify}`];
        const data = nextProps[`panel${identify}`].tempData;
        if (!dataDetail.loading) {
            callLoading(true);
        } else {
            callLoading(dataDetail.loading === "loading");
        }
        if (data && data.length && Object.keys(data[0]).length > 1) {
            this.setState({
                tempData: data
            });
        } else {
            this.setState({
                choosedFilters: [],
                tempData: []
            });
        }
        this.setState({
            iconName: dataDetail.icon,
            iconColor: dataDetail.iconColor,
            countColor: dataDetail.countColor,
            titleColor: dataDetail.titleColor,
            backgroundColor: dataDetail.backgroundColor,
            parameterOneColorValue: dataDetail.parameterOneColorValue,
            parameterTwoColorValue: dataDetail.parameterTwoColorValue
        });
    };

    // select time range
    selectedDataRange = e => {
        const { dispatch, identify } = this.props;
        const { eventType, choosedFilters } = this.state;
        this.setState({
            mode: e,
            dateRangeDefaultValue: []
        });
        dispatch(
            changeCount(
                0,
                { timeArr: "", eventType, mode: e, choosedFilters },
                identify
            )
        );
    };
    // date pick change
    datePickerChange = e => {
        const { dispatch, identify, today } = this.props;
        const { mode, eventType, choosedFilters } = this.state;
        let timeArr = ["", getTimeString(today)];
        dispatch(
            panelChangeLoadingStatus("loading", identify)
        );
        if (mode === "realTime") {
            this.setState({
                timeArr: e
            });
            dispatch(
                getEventListData(
                    [getTimeString(e[0])],
                    getEventTypeParameter(eventType),
                    { timeArr: e, eventType, mode, choosedFilters },
                    identify
                )
            );
        } else if (mode === "dateTime") {
            timeArr = e;
            this.setState({
                timeArr
            });
            dispatch(
                getEventListData(
                    timeArr,
                    getEventTypeParameter(eventType),
                    { timeArr, eventType, mode, choosedFilters },
                    identify
                )
            );
        }
    };
    // select type
    selectedType = e => {
        const { dispatch, identify } = this.props;
        const { timeArr, mode, choosedFilters } = this.state;
        this.setState({
            eventType: e,
            filterStatus: e !== "All"
        });
        if ("realTime" === mode) {
            dispatch(
                getEventListData(
                    [getTimeString(timeArr[0])],
                    getEventTypeParameter(e),
                    { timeArr, eventType: e, mode, choosedFilters },
                    identify
                )
            );
        } else if ("dateTime" === mode) {
            dispatch(
                getEventListData(
                    timeArr,
                    getEventTypeParameter(e),
                    { timeArr, eventType: e, mode, choosedFilters },
                    identify
                )
            );
        }
        dispatch(
            panelChangeLoadingStatus("loading", identify)
        );
    };
    // select filter
    selectFilter = e => {
        const { identify, dispatch } = this.props;
        const { timeArr, eventType, mode } = this.state;
        const data = this.props[`panel${identify}`];
        if (data) {
            let result = calcMultipleCount(e);
            this.setState({
                choosedFilters: handleDataForSelect(e)
            }, () => {
                if (!e.length) {
                    dispatch(
                        changeCount(
                            data.allCount,
                            { timeArr, eventType, mode, choosedFilters: handleDataForSelect(e) },
                            identify
                        )
                    );
                    return;
                }
                dispatch(
                    changeCount(result, { timeArr, eventType, mode, choosedFilters: handleDataForSelect(e) }, identify)
                );
            });
        }
    };

    // duration switch
    onSwitchSelect = (checked) => {
        this.setState({
            durationSwitch: checked
        });
    };

    // duration time select
    onTimeSelect = (duration) => {
        this.setState({
            durationTime: duration
        });
    };

    render() {
        const { identify } = this.props;
        const {
            mode,
            filterStatus,
            eventType,
            dateRangeDefaultValue,
            choosedFilters,
            tempData,
            defaultTitle,
            countSizeControlParameter,
            titleSizeControlParameter,
            iconSizeControlParameter,
            iconName,
            iconColor,
            countColor,
            titleColor,
            backgroundColor,
            datePickLabel,
            parameterOneColorValue,
            parameterOneSizeValue,
            parameterTwoColorValue,
            parameterTwoSizeValue,
            durationSwitch,
            durationTime
        } = this.state;
        return (
            <div className="panel_topology">
                <SetTitle panelTitle={defaultTitle} identify={identify}/>
                <SingleSelect
                    title="Type"
                    defaultValue={eventType}
                    selctOptions={["All", "Event Type"]}
                    onSelect={this.selectedType}
                />
                {filterStatus ? (
                    <SelectAlarmFilter
                        onSelect={this.selectFilter}
                        label="Type Filter"
                        selectOptions={tempData}
                        identify={identify}
                        defaultValue={choosedFilters}
                    />
                ) : (
                    ""
                )}
                <SizeAndColorControl
                    defaultValue={countSizeControlParameter}
                    changeSizeTarget="countSize"
                    label="Set Count Size"
                    identify={identify}
                    changeTarget="count"
                    title="Set Count Color"
                    defaultColor="#ffff00"
                    backgroundColor={countColor}
                />
                <SizeAndColorControl
                    defaultValue={titleSizeControlParameter}
                    changeSizeTarget="titleSize"
                    label="Set Title Size"
                    identify={identify}
                    title="Set Title Color"
                    changeTarget="title"
                    backgroundColor={titleColor}
                />
                <SizeAndColorControl
                    defaultValue={iconSizeControlParameter}
                    changeSizeTarget="iconSize"
                    label="Set Icon Size"
                    identify={identify}
                    changeTarget="icon"
                    title="Set Icon Color"
                    defaultColor="#ffffff"
                    backgroundColor={iconColor}
                />
                {/* event type control */}
                <SizeAndColorControl
                    defaultValue={parameterOneSizeValue}
                    changeSizeTarget="parameterOne"
                    label="Set Type Size"
                    identify={identify}
                    changeTarget="parameterOne"
                    title=""
                    defaultColor="#ffffff"
                    backgroundColor={parameterOneColorValue}
                />
                {/* event date time control */}
                <SizeAndColorControl
                    defaultValue={parameterTwoSizeValue}
                    changeSizeTarget="parameterTwo"
                    label="Set Date Size"
                    identify={identify}
                    changeTarget="parameterTwo"
                    title=""
                    defaultColor="#ffffff"
                    backgroundColor={parameterTwoColorValue}
                />
                <SelectIcon
                    identify={identify}
                    iconType={iconName}
                    iconColor={iconColor}
                />
                <SelectColor
                    identify={identify}
                    changeTarget="background"
                    title="Set Background Color"
                    defaultColor="#01579b"
                    backgroundColor={backgroundColor}
                    needRemind
                />
                <AutoCallApiSet
                    onSwitchSelect={this.onSwitchSelect}
                    onTimeSelect={this.onTimeSelect}
                    checked={durationSwitch}
                    defaultValue={durationTime}
                    identify={identify}
                />
                <SingleSelect
                    title="Date range"
                    defaultValue={mode}
                    selctOptions={["realTime", "dateTime"]}
                    onSelect={this.selectedDataRange}
                />
                <RealDatePicker
                    mode={mode}
                    defaultValue={dateRangeDefaultValue}
                    onChange={this.datePickerChange}
                    label={datePickLabel}
                />
            </div>
        );
    }
}


export default connect()(PanelEvent);
