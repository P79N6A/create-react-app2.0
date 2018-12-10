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
import $ from "jquery";
import L from "leaflet";
import CircularProgress from "@material-ui/core/CircularProgress";
import { map_ } from "modules/map";
import { calcCenter } from "../../funcs/utils/utlils";

let resetTimer = null;

export default class AlarmMapL extends Component {
    constructor(props) {
        super(props);
        this.map = {};
        this.markerGroup = null;
    };

    static defaultProps = {
        identify: `_${Math.random()}`,
        settings: {}
    };
    static propTypes = {
        identify: PropTypes.string,
        settings: PropTypes.object
    };

    componentDidMount() {
        const { defaultMapData, identify } = this.props;
        const { center, zoom, layer, layerConfig } = defaultMapData;
        this.map = L.map(identify, {
            center: map_.handleCoordinate(center),
            zoom,
            fullscreenControl: true
        });
        L.tileLayer.provider(layer, layerConfig).addTo(this.map);
        $.subscribe("WIDGET-RESIZE", () => {
            if (resetTimer) {
                clearTimeout(resetTimer);
            }
            resetTimer = setTimeout(() => {
                this.map.invalidateSize(true);
            }, 100);
        });
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { dataSource, iconColor, icon, defaultMapData } = this.props;
        const { center } = defaultMapData;
        this.addOrRemoveMarker(dataSource, icon, iconColor, center);
    };

    addOrRemoveMarker = (dataSource, icon, iconColor, center) => {
        let markerGroup = [];
        if (dataSource && dataSource.length) {
            this.removerMarker();
            dataSource.forEach((item) => {
                markerGroup.push(
                    L.marker(
                        map_.handleCoordinate(item.center),
                        map_.addMarker(icon, iconColor, item.label, "icon", "")
                    ).bindPopup(map_.setPopupInner(item.information))
                );
            });
            this.markerGroup = L.layerGroup(markerGroup);
            this.markerGroup.addTo(this.map);
            this.map.panTo(map_.handleCoordinate(calcCenter(dataSource)));
        }
        if (dataSource && dataSource.length === 0) {
            this.removerMarker();
            this.map.panTo(map_.handleCoordinate(center));
        }
    };

    removerMarker() {
        if (this.markerGroup) {
            this.markerGroup.clearLayers();
            this.markerGroup = null;
        }
    };

    render() {
        const { identify, settings, loading } = this.props;
        return (
            <div className="map_widget_wrapper">
                <div
                    id={identify}
                    style={settings}
                    className="map_container"
                />
                {
                    loading === "loading" ? (
                        <div className="map_loading">
                            <CircularProgress color="secondary" size={50}/>
                        </div>
                    ) : ""
                }
            </div>
        );
    }
}
