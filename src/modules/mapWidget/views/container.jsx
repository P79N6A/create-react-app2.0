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
import "leaflet-providers/leaflet-providers";
import "leaflet.fullscreen/Control.FullScreen";
import "modules/mapAndPanelCommon/funcs/material-icon-label";
import AlarmView from "./mapView/alarm";
import ExportComponent from "./commonComponents/exportExcel";
import { REDUCER_NAME as mapReducer } from "./../funcs/constants";
import {
    mapGetAlarmList,
    mapGetInfoByAddress,
    mapChangeLoadingStatus,
    clearMapInfo
} from "./../funcs/actions";
import getTimeString from "commons/utils/isc8601Generator";
import DeviceView from "./mapView/device";
import BasicMap from "./mapView/basicMap";
import { map_ } from "modules/map";

import "leaflet/dist/leaflet.css";
import "leaflet.fullscreen/Control.FullScreen.css";
import "modules/mapAndPanelCommon/styles/leaflet.awesome-markers.css";
import "./../styles/style.less";

import {
    sagas as filterSagas,
    reducer as filterReducer,
    reducerName as filterReducerName
} from "./../searchAddress";
import store, { injectAsyncReducer, sagaMiddleware } from "commons/store";
sagaMiddleware.run(filterSagas);
injectAsyncReducer(store, filterReducerName, filterReducer);

class Container extends Component {
    constructor(props) {
        super(props);
        this.defaultMapData = null;
    }
    static defaultProps = {
        get: () => {}
    };
    componentWillMount() {
        this.defaultMapData = map_.getMapConfig();
        const { identify } = this.props;
        const data = this.props[`map${identify}`];
        if (data.editer && data.editer === "editing") {
            return;
        }
        this.getInitData();
    };
    componentDidMount() {
        this.props.get(this);
    };
    updateSize = () => {
        const { identify } = this.props;
        return identify;
    };
    getInitData = () => {
        const { identify } = this.props;
        const dataDetail = this.props[`map${identify}`];
        if (dataDetail && dataDetail.parameters !== "undefined") {
            const { type, dispatch } = this.props;
            dispatch(mapChangeLoadingStatus("loading", identify));
            const data = dataDetail.parameters;
            switch (type) {
                case "Alarm Locations":
                    if (data) {
                        dispatch(
                            mapGetAlarmList(
                                [getTimeString(data.timeArr[0])],
                                data.finallyData,
                                data,
                                identify
                            )
                        );
                    }
                    break;
                case "Device Locations":
                    if (data.topologyIds) {
                        dispatch(
                            mapGetInfoByAddress(
                                data.topologyIds,
                                data,
                                identify
                            )
                        );
                    } else {
                        dispatch(mapChangeLoadingStatus("loaded", identify));
                    }
                    break;
                default:
                    break;
            }
        }
    };
    componentWillUnmount() {
        const { dispatch, identify } = this.props;
        dispatch(clearMapInfo([], [], {}, identify));
    };
    render() {
        const { editer, identify } = this.props;
        const data = this.props[`map${identify}`];
        const currentMap = data ? data.type : "";
        const editStatus = (data && data.editer) ? data.editer : editer;
        return (
            <React.Fragment>
                {
                    currentMap === "Alarm Locations" ? (
                        <AlarmView
                            {...this.props}
                            editer={editStatus}
                            defaultMapData={this.defaultMapData}
                        />
                    ) : currentMap === "Device Locations" ? (
                        <DeviceView
                            {...this.props}
                            editer={editStatus}
                            defaultMapData={this.defaultMapData}
                        />
                    ) : currentMap === "Basic Map" ? (
                        <BasicMap
                            {...this.props}
                            editer={editStatus}
                            defaultMapData={this.defaultMapData}
                        />
                    ) : ""
                }
                {
                    editStatus === "edited" ? (
                        <ExportComponent identify={identify} />
                    ) : ""
                }
            </React.Fragment>
        );

    }
}

const getMap = state => {
    return state[mapReducer] || {};
};

export default connect(getMap)(Container);
