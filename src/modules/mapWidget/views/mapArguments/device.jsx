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
import SetTitle from "./../commonComponents/setTitle";
import {
    mapGetInfoByAddress,
    clearMapInfo,
    mapDeviceChangeIconAndColor,
    mapChangeLoadingStatus,
    mapChangeEditerStatus
} from "./../../funcs/actions";
import SearchDevice from "./../../searchAddress/views/filter";
import DeviceIconAndColor from "./../commonComponents/deviceIconAndColor";

class MapDevice extends Component {
    state = {
        topologyIds: [],
        choosedParameters: [],
        icon: "",
        iconColor: "",
        tempData: [],
        iconAndColor: {}
    };

    componentWillMount() {
        const { dispatch, identify, callLoading } = this.props;
        const data = this.props[`map${identify}`];
        dispatch(mapChangeLoadingStatus("loaded", identify));
        dispatch(mapChangeEditerStatus("editing", identify));
        if (data && JSON.stringify(data.parameters) !== "{}") {
            const { parameters } = data;
            this.setState({
                choosedParameters: parameters.choosedParameters.length ? parameters.choosedParameters : [],
                topologyIds: parameters.topologyIds,
                icon: parameters.icon,
                iconColor: parameters.iconColor,
                iconAndColor: parameters.iconAndColor
            }, () => {
                const { topologyIds, choosedParameters, iconAndColor } = this.state;
                if (parameters.topologyIds.length) {
                    dispatch(mapGetInfoByAddress(parameters.topologyIds, {
                        topologyIds,
                        choosedParameters,
                        iconAndColor
                    }, identify));
                    dispatch(mapChangeLoadingStatus("loading", identify));
                    callLoading(true);
                }
            });
        } else {
            this.setState({
                icon: data.icon,
                iconColor: data.iconColor
            });
        }
    };

    componentWillReceiveProps(nextProps) {
        const { identify, callLoading } = this.props;
        const data = nextProps[`map${identify}`];
        callLoading(data.loading === "loading");
        if (data) {
            this.setState({
                tempData: data.tempData
            });
        }
    };

    getChoosedData = e => {
        const { identify, dispatch, callLoading } = this.props;
        const ids = e.map(item => item.label);
        const { iconAndColor } = this.state;
        callLoading(true);
        dispatch(mapChangeLoadingStatus("loading", identify));
        this.setState({
            topologyIds: ids,
            choosedParameters: e
        });
        if (!e.length) {
            dispatch(mapChangeLoadingStatus("loaded", identify));
            callLoading(true);
            dispatch(clearMapInfo([], [], {}, identify));
            return;
        }
        dispatch(
            mapGetInfoByAddress(
                ids,
                { topologyIds: ids, choosedParameters: e, iconAndColor },
                identify
            )
        );
    };
    // icon select
    iconSelect = (icon, typeName) => {
        const { dispatch, identify } = this.props;
        const { topologyIds, choosedParameters } = this.state;
        this.setState((prevState) => {
            const tempData = prevState.tempData.map(item => {
                if (item.type === typeName) {
                    item.deviceIcon = icon;
                }
                return item;
            });
            if (prevState.iconAndColor[typeName]) {
                prevState.iconAndColor[typeName].icon = icon;
            } else {
                prevState.iconAndColor[typeName] = { icon };
            }
            const iconAndColor = prevState.iconAndColor;
            dispatch(
                mapDeviceChangeIconAndColor(
                    tempData,
                    { topologyIds, choosedParameters, iconAndColor },
                    identify
                )
            );
            return {
                tempData,
                iconAndColor
            };
        });
    };
    // icon color select
    iconColorSelect = (iconColor, typeName) => {
        const { dispatch, identify } = this.props;
        const { topologyIds, choosedParameters } = this.state;
        this.setState((prevState) => {
            const tempData = prevState.tempData.map(item => {
                if (item.type === typeName) {
                    item.deviceIconColor = iconColor;
                }
                return item;
            });
            if (prevState.iconAndColor[typeName]) {
                prevState.iconAndColor[typeName].iconColor = iconColor;
            } else {
                prevState.iconAndColor[typeName] = { iconColor };
            }
            const iconAndColor = prevState.iconAndColor;
            dispatch(
                mapDeviceChangeIconAndColor(
                    tempData,
                    { topologyIds, choosedParameters, iconAndColor }, identify
                )
            );
            return {
                tempData,
                iconAndColor
            };
        });
    };

    render() {
        const { identify, title, deviceTypeData } = this.props;
        const { choosedParameters, iconAndColor } = this.state;
        const data = this.props[`map${identify}`];
        const mapTitle = (data && data.title) || title;
        const mapDeviceType = (data && data.deviceTypeData) || deviceTypeData;
        return (
            <React.Fragment>
                <SetTitle
                    panelTitle={mapTitle}
                    identify={identify}
                />
                <SearchDevice
                    style={{ marginTop: "10px" }}
                    getChoosedData={this.getChoosedData}
                    placeholder="Select"
                    defaultValue={choosedParameters}
                    identify={identify}
                    label="Search Application"
                />
                {
                    false && mapDeviceType.map((item) => (
                        <DeviceIconAndColor
                            identify={identify}
                            typeName={item}
                            key={item}
                            iconSelect={this.iconSelect}
                            iconAndColor={iconAndColor}
                            title="Select Icon Color"
                            defaultColor="#ffffff"
                            iconColorSelect={this.iconColorSelect}
                        />
                    ))
                }
            </React.Fragment>
        );
    }
}

export default connect()(MapDevice);
