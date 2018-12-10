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
import $ from "jquery";
import L from "leaflet";
import _ from "lodash";
import store from "commons/store";
import MiniMap from "leaflet-minimap";
import * as msg from "commons/utils/messageBus";
import { actions as msgCenter } from "modules/messageCenter";
import { formatCoordinate } from "./../../funcs/utils/basicMapUtil";
import { map_ } from "modules/map";
import { saveMapDrawData } from "./../../funcs/actions";
import { REDUCER_NAME } from "./../../funcs/constants";
import "leaflet-draw";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet-minimap/dist/Control.MiniMap.min.css";


let resetTimer = null;

class BasicMapL extends Component {
    constructor(props) {
        super(props);
        this.map = null;
        this.marker = null;
    };

    state = {
        currentZoom: this.props.defaultMapData.zoom,
        drawLayers: []
    };
    componentWillMount() {
        const { identify } = this.props;
        const container = L.DomUtil.get(identify);
        if(container !== null){
            container._leaflet_id = null;
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        const { deviceLocationData: prevDeviceLocationData } = prevProps;
        const { deviceLocationData } = this.props;
        if (deviceLocationData) {
            if (deviceLocationData && !prevDeviceLocationData) {
                this.addMarker(deviceLocationData[0]);
            } else {
                if (prevDeviceLocationData && prevDeviceLocationData[0] && deviceLocationData[0]) {
                    if (!_.isEqual(prevDeviceLocationData[0].coordinates, deviceLocationData[0].coordinates)) {
                        this.removeMarker();
                        this.addMarker(deviceLocationData[0]);
                    }
                }
            }
        }
    };

    componentDidMount() {
        const { defaultMapData, dispatch, identify } = this.props;
        const { center, zoom, layer, layerConfig } = defaultMapData;

        this.map = L.map(identify, {
            center: map_.handleCoordinate(center),
            zoom,
            fullscreenControl: true
        });
        store.dispatch(msg.subscribe("mapDrawForTopology", "ISC_MSG_BUS", "mapDrawForTopology"));
        L.tileLayer.provider(layer, layerConfig).addTo(this.map);

        const osmUrl = "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
        const osmAttrib = "Map data &copy; OpenStreetMap contributors";
        const osm = L.tileLayer(osmUrl, { minZoom: 5, maxZoom: 18, attribution: osmAttrib });
        new MiniMap(osm, {
            toggleDisplay: true,
            position: "bottomleft",
            minimized: true
        }).addTo(this.map);

        const drawnItems = L.featureGroup().addTo(this.map);
        const editableLayers = new L.FeatureGroup();
        this.map.addLayer(editableLayers);
        const options = {
            position: "topright",
            edit: {
                featureGroup: drawnItems,
                poly: {
                    allowIntersection: false
                }
            },
            draw: {
                polygon: {
                    allowIntersection: false,
                    showArea: false
                },
                polyline: false,
                marker: false,
                circlemarker: false
            }
        };
        const drawControl = new L.Control.Draw(options);
        this.map.addControl(drawControl);
        this.map.on(L.Draw.Event.CREATED, (event) => {
            const layer = event.layer;
            this.setState({
                drawLayers: formatCoordinate(layer)
            });
            drawnItems.addLayer(layer);
            const drawData = [formatCoordinate(layer)];
            dispatch(saveMapDrawData(drawData, identify));
            this.messageBusForTopology(drawData);
        });

        this.map.on(L.Draw.Event.EDITED, (event) => {
            let layers = event.layers;
            let data = [];
            layers.eachLayer((layer) => {
                data.push(formatCoordinate(layer));
            });
            this.setState({
                drawLayers: [data[0]]
            });
            const drawData = [data[0]];
            dispatch(saveMapDrawData(drawData, identify));
            this.messageBusForTopology(drawData);
        });

        this.map.on(L.Draw.Event.DELETED, () => {
            this.setState({
                drawLayers: []
            });
            this.messageBusForTopology([]);
            dispatch(saveMapDrawData([], identify));
        });

        this.map.on("zoomend", (event) => {
            this.setState({ currentZoom: event.target.getZoom() });
        });

        $.subscribe("WIDGET-RESIZE", () => {
            if (resetTimer) {
                clearTimeout(resetTimer);
            }
            resetTimer = setTimeout(() => {
                this.map.invalidateSize(true);
            }, 100);
        });
    };

    messageBusForTopology = (mapDrawForTopologyData) => {
        const { dispatch, identify } = this.props;
        dispatch(msg.publish(
            "mapDrawForTopology",
            "ISC_MSG_BUS",
            [{
                mapDrawForTopologyData,
                identify: `map${identify}`,
                reducerName: REDUCER_NAME,
                mapDrawForTopologyDataKey: "mapDrawData"
            }],
            "mapDrawForTopology"
        ));
    };

    addMarker = (data) => {
        if (data && data.coordinates && data.coordinates.length) {
            const { deviceName, icon, iconImg, imgPath, popupDetails } = data;
            const marker = L.marker(
                map_.handleCoordinate(data.coordinates),
                map_.addMarker(icon, "red", deviceName, iconImg, imgPath)
            );
            if (popupDetails && _.isArray(popupDetails) && popupDetails.length) {
                this.marker = marker.bindPopup(map_.setPopupInner(popupDetails));
            } else {
                this.marker = marker;
            }
            this.map.setView(map_.handleCoordinate(data.coordinates));
            this.marker.addTo(this.map);
        } else {
            if (this.marker) {
                this.map.removeLayer(this.marker);
                this.marker = null;
            }
            this.props.dispatch(msgCenter.info("This piece of data doesn't contain coordinate information!"));
        }
    };
    removeMarker = () => {
        if (this.marker) {
            this.map.removeLayer(this.marker);
        }
    };

    render() {
        const { identify } = this.props;
        return (
            <div className="map_widget_wrapper">
                <div
                    className="map_container"
                    id={identify}
                />
            </div>
        );
    }
}

export default connect()(BasicMapL);
