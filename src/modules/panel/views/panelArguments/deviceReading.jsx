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
 * Created by Xiaolong on 28/05/2018.
 */

import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
    getTopologyListData,
    changeCount,
    panelChangeLoadingStatus,
    panelEditerStatus,
    getTopologyListValue,
    dataDeviceReadingRequestSuccess,
    dataDeviceReadingAggreagtionRequestSuccess
} from "./../../funcs/actions";
import { Filter } from "modules/filter/topologyFilter";
import { REDUCER_NAME as panelReducer } from "./../../funcs/constants";
import {
    SingleSelect,
    SizeAndColorControl,
    SetTitle,
    SelectColor,
    SelectIcon
} from "./../commonComponents";
import { calcMultipleCount, getCommonData } from "./../../funcs/utils/deviceReadingUtil";
import AutoCallApiSet from "../commonComponents/AutoCallApiSet";

class PanelDeviceReading extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired
    };
    state = {
        showParameter: false,
        showFilter: false,
        mode: "realTime",
        aggregation: "MAX",
        paramaters: "",
        paramatersData: [],
        deviceIds: [],
        showAggregation: false,
        choosedData: [],
        defaultTitle: "",
        showAll: false,
        iotTopologyIds: [],
        choosedParameters: "",
        units: "",
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
        durationSwitch: false,
        durationTime: "30 seconds"
    };
    componentWillMount() {
        const { identify, dispatch, callLoading } = this.props;
        const data = this.props[`panel${identify}`];
        dispatch(panelEditerStatus("editing", identify));
        if (data) {
            this.setState({
                defaultTitle: data.title,
                countSizeControlParameter: data.countSizeValue,
                titleSizeControlParameter: data.titleSizeValue,
                iconSizeControlParameter: data.iconSizeValue,
                iconName: data.icon,
                iconColor: data.iconColor,
                countColor: data.countColor,
                titleColor: data.titleColor,
                backgroundColor: data.backgroundColor,
                parameterOneColorValue: data.parameterOneColorValue,
                parameterOneSizeValue: data.parameterOneSizeValue,
                parameterTwoColorValue: data.parameterTwoColorValue,
                parameterTwoSizeValue: data.parameterTwoSizeValue,
                durationSwitch: data.durationSwitch,
                durationTime: data.durationTime
            });
            dispatch(
                panelChangeLoadingStatus("loaded", identify)
            );
            if (JSON.stringify(data.parameters) !== "{}" && data.parameters.iotTopologyIds.length) {
                const { parameters } = data;
                this.setState({
                    showParameter: !!parameters.iotTopologyIds.length,
                    iotTopologyIds: parameters.iotTopologyIds || [],
                    showAggregation: parameters.iotTopologyIds.length > 1,
                    aggregation: parameters.aggregation || "MAX",
                    choosedParameters: parameters.choosedParameters || "",
                    units: parameters.units || ""
                });
                dispatch(
                    panelChangeLoadingStatus("loading", identify)
                );
                callLoading(true);
                dispatch(getTopologyListValue(
                    parameters.iotTopologyIds.map(item => item.value),
                    parameters,
                    parameters.choosedParameters,
                    parameters.units || "",
                    identify
                ));
                dispatch(getTopologyListData(
                    parameters.iotTopologyIds.map(item => item.devicemodel),
                    parameters,
                    identify
                ));
            }
        }
    };
    componentWillReceiveProps(nextProps) {
        const { identify, callLoading } = this.props;
        const data = nextProps[`panel${identify}`];
        callLoading(data.loading === "loading");
        if (data && data.deviceReadingData && data.deviceReadingData.length) {
            // console.log(data.deviceReadingData);
            this.setState({
                showAggregation: data.deviceReadingData.length > 1,
            });
        };

        if (data) {
            this.setState({
                iconName: data.icon,
                iconColor: data.iconColor,
                fontColor: data.fontColor,
                backgroundColor: data.backgroundColor,
                countColor: data.countColor,
                titleColor: data.titleColor,
                parameterOneColorValue: data.parameterOneColorValue,
                parameterTwoColorValue: data.parameterTwoColorValue,
            });
        }
    };
    // get topology search data
    getTopologyCoosedData = e => {
        const length = e.length;
        const { identify, dispatch } = this.props;
        const { aggregation, units } = this.state;
        this.setState({
            showParameter: !!length,
            iotTopologyIds: e,
            choosedParameters: "",
            showAggregation: false,
            aggregation: "MAX"
        }, () => {
            const { choosedParameters } = this.state;
            // devicemodel
            const ids = e.map(item => item.devicemodel);
            if (!length) {
                dispatch(changeCount(
                    0,
                    { iotTopologyIds: [], choosedParameters: [], aggregation: "MAX", units },
                    identify
                ));
                dispatch(
                    panelChangeLoadingStatus("loaded", identify)
                );
                dispatch(dataDeviceReadingAggreagtionRequestSuccess(
                    [],
                    { iotTopologyIds: [], choosedParameters: [], aggregation: "MAX", units },
                    identify
                ));
                dispatch(dataDeviceReadingRequestSuccess(
                    [],
                    { iotTopologyIds: [], choosedParameters: [], aggregation: "MAX", units },
                    identify
                ));
            } else {
                dispatch(
                    panelChangeLoadingStatus("loading", identify)
                );
                dispatch(
                    getTopologyListData(
                        ids,
                        { iotTopologyIds: e, choosedParameters, aggregation, units },
                        identify
                    )
                );
                dispatch(dataDeviceReadingAggreagtionRequestSuccess(
                    [],
                    { iotTopologyIds: e, choosedParameters, aggregation, units },
                    identify
                ));
                dispatch(dataDeviceReadingRequestSuccess(
                    [],
                    { iotTopologyIds: e, choosedParameters, aggregation: "MAX", units },
                    identify
                ));
            }
            dispatch(changeCount(0, { iotTopologyIds: e, choosedParameters, aggregation: e, units }, identify));
        });
    };
    // get topology parameter list
    getParametersList = () => {
        const { identify } = this.props;
        const data = this.props[`panel${identify}`];
        if (data.tempData && data.tempData.length) {
            const needData = [];
            getCommonData(data.tempData).forEach(item => {
                needData.push(Object.keys(item)[0]);
            });
            return needData;
        } else {
            return [];
        }
    };
    // topology parameter select
    selectedParameters = e => {
        const { iotTopologyIds, aggregation } = this.state;
        const { dispatch, identify } = this.props;
        const data = this.props[`panel${identify}`];
        const unitData = getCommonData(data.tempData).filter(item => item[e]);
        const units = (unitData && unitData[0]) ? unitData[0][e] : "";
        this.setState({
            choosedParameters: e,
            units
        });
        dispatch(
            panelChangeLoadingStatus("loading", identify)
        );
        dispatch(getTopologyListValue(
            iotTopologyIds.map(item => item.value),
            { iotTopologyIds, choosedParameters: e, aggregation, units },
            e,
            units,
            identify
        ));
    };
    // select aggregation
    selectAggregation = e => {
        const { choosedParameters, iotTopologyIds, units } = this.state;
        const { dispatch, identify } = this.props;
        const data = this.props[`panel${identify}`];
        this.setState({
            aggregation: e
        });
        const result = calcMultipleCount(data.deviceReadingData, e);
        const unit = units ? `(${units})` : "";
        if (choosedParameters) {
            dispatch(changeCount(
                `${result}${unit}`,
                { iotTopologyIds, choosedParameters, aggregation: e, units },
                identify
            ));
        }
    };
    // select time range
    selectedDataRange = e => {
        this.setState({
            mode: e
        });
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
            showParameter,
            showAggregation,
            defaultTitle,
            iotTopologyIds,
            aggregation,
            choosedParameters,
            titleSizeControlParameter,
            countSizeControlParameter,
            iconSizeControlParameter,
            iconName,
            iconColor,
            countColor,
            titleColor,
            backgroundColor,
            parameterOneColorValue,
            parameterOneSizeValue,
            parameterTwoColorValue,
            parameterTwoSizeValue,
            durationSwitch,
            durationTime
        } = this.state;
        return (
            <div className="panel_topology">
                <SetTitle
                    panelTitle={defaultTitle}
                    identify={identify}
                />
                <Filter
                    style={{marginTop: "10px"}}
                    defaultValue={iotTopologyIds}
                    getChoosedData={this.getTopologyCoosedData}
                    placeholder="Select"
                    identify={identify}
                    label="Search Device"
                />
                {showParameter ? (
                    <SingleSelect
                        title="Choose Parameters"
                        selctOptions={this.getParametersList()}
                        onSelect={this.selectedParameters}
                        defaultValue={choosedParameters}
                    />
                ) : (
                    ""
                )}
                {showAggregation ? (
                    <SingleSelect
                        title="Aggregation"
                        defaultValue={aggregation}
                        selctOptions={["MAX", "MIN", "AVG"]}
                        onSelect={this.selectAggregation}
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
                    title="Set Icon Color"
                    changeTarget="icon"
                    backgroundColor={iconColor}
                />
                {/* device reading device control */}
                <SizeAndColorControl
                    defaultValue={parameterOneSizeValue}
                    changeSizeTarget="parameterOne"
                    label="Set Device Size"
                    identify={identify}
                    changeTarget="parameterOne"
                    title=""
                    defaultColor="#ffffff"
                    backgroundColor={parameterOneColorValue}
                />
                {/* alarm date time control */}
                <SizeAndColorControl
                    defaultValue={parameterTwoSizeValue}
                    changeSizeTarget="parameterTwo"
                    label="Set Parameters Size"
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
                    title="Set Background Color"
                    identify={identify}
                    changeTarget="background"
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
            </div>
        );
    }
}

const getState = state => {
    return state[panelReducer] || {};
};

export default connect(getState)(PanelDeviceReading);
