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

import {
    SelectIcon,
    SelectColor,
    SetTitle,
    SizeAndColorControl,
    SelectDeviceFilter,
    SingleSelect,
    AutoCallApiSet
} from "./../commonComponents";
import {
    getDeviceListData,
    changeCount,
    panelChangeLoadingStatus,
    panelEditerStatus
} from "./../../funcs/actions";
import {
    getDeviceChoosedCount,
    calcDeviceMultipleCount,
    getDataForFilter,
    handleDeviceForServer
} from "./../../funcs/utils/deviceUtils";

class PanelArgsDevice extends Component {
    state = {
        defaultRange: "realTime",
        typeFilter: false,
        device: "Device",
        choosedFilters: [],
        tempData: [],
        defaultTitle: "",
        choosedType: "All",
        dataForFilter: [],
        countSizeControlParameter: "L",
        titleSizeControlParameter: "L",
        iconSizeControlParameter: "L",
        iconName: "",
        iconColor: "",
        fontColor: "",
        backgroundColor: "",
        parameterOneColorValue: "",
        parameterOneSizeValue: "M",
        parameterTwoColorValue: "",
        parameterTwoSizeValue: "M",
        durationSwitch: false,
        durationTime: "30 seconds"
    };
    componentWillMount() {
        const { dispatch, identify, callLoading } = this.props;
        const dataDetail = this.props[`panel${identify}`];
        const data = dataDetail.parameters;
        callLoading(true);
        dispatch(panelEditerStatus("editing", identify));
        this.setState(
            {
                device: data.device || "Device",
                choosedFilters: data.choosedFilters || [],
                typeFilter: data.choosedType && data.choosedType !== "All",
                choosedType: data.choosedType || "All",
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
                durationSwitch: dataDetail.durationSwitch,
                durationTime: dataDetail.durationTime
            },
            () => {
                const { device, choosedFilters, choosedType } = this.state;
                if (JSON.stringify(data) === "{}") {
                    dispatch(getDeviceListData(
                        device,
                        { device, choosedFilters, choosedType },
                        identify
                    ));
                } else {
                    dispatch(
                        panelChangeLoadingStatus("loading", identify)
                    );
                    dispatch(getDeviceListData(data.device, data, identify));
                }
            }
        );
    };
    componentWillReceiveProps(nextProps) {
        const { identify, callLoading } = nextProps;
        const { device } = this.state;
        const dataDetail = nextProps[`panel${identify}`];
        const data = nextProps[`panel${identify}`].tempData;
        if (!dataDetail.loading) {
            callLoading(true);
        } else {
            callLoading(dataDetail.loading === "loading");
        }
        if (data && data.length && Object.keys(data[0]).length > 1) {
            this.setState({
                tempData: data,
                dataForFilter: getDataForFilter(data, device),
            });
        } else {
            this.setState({
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
            parameterTwoColorValue: dataDetail.parameterTwoColorValue,
        });
    };
    // select type
    selectType = e => {
        const { dispatch, identify } = this.props;
        this.setState({
            typeFilter: e !== "All",
            choosedType: e,
            dataForFilter: [],
            choosedFilters: []
        }, () => {
            const { choosedFilters } = this.state;
            this.setState({
                device: handleDeviceForServer(e)
            });
            dispatch(getDeviceListData(
                handleDeviceForServer(e),
                { device: handleDeviceForServer(e), choosedFilters, choosedType: e },
                identify
            ));
        });
        dispatch(
            panelChangeLoadingStatus("loading", identify)
        );
    };
    // type filter
    selectTypeFilter = e => {
        const { identify, dispatch } = this.props;
        const data = this.props[`panel${identify}`];
        const { device, tempData, choosedType } = this.state;
        if (data) {
            this.setState(
                {
                    choosedFilters: e
                },
                () => {
                    const count = calcDeviceMultipleCount(getDeviceChoosedCount(tempData, e, device));
                    if (!e.length) {
                        dispatch(changeCount(
                            count,
                            { device, choosedFilters: e, choosedType },
                            identify
                        ));
                        return;
                    }
                    dispatch(changeCount(
                        count,
                        { device, choosedFilters: e, choosedType },
                        identify
                    ));
                }
            );
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
            typeFilter,
            dataForFilter,
            defaultTitle,
            choosedType,
            choosedFilters,
            countSizeControlParameter,
            titleSizeControlParameter,
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
            <div>
                <SetTitle
                    panelTitle={defaultTitle}
                    identify={identify}
                />
                <SingleSelect
                    title="Type"
                    defaultValue={choosedType}
                    selctOptions={["All", "Device Type", "Device Status", "Application/Address"]}
                    onSelect={this.selectType}
                />
                {typeFilter ? (
                    <SelectDeviceFilter
                        label="Type Filter"
                        identify={identify}
                        defaultValue={choosedFilters}
                        selectOptions={dataForFilter}
                        onSelect={this.selectTypeFilter}
                        disabled={false}
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
                {/* device type control */}
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
                {/* device type filter control */}
                <SizeAndColorControl
                    defaultValue={parameterTwoSizeValue}
                    changeSizeTarget="parameterTwo"
                    label="Set filter Size"
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
                    defaultColor="#80deea"
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
export default connect()(PanelArgsDevice);
