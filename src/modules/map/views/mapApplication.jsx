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
 * Created by xulu on 25/05/2018.
 * Modified by Deng Xiaolong on 25/05/2018.
 */
import React from "react";
import PropTypes from "prop-types";

import Button from "@material-ui/core/Button";
import _ from "lodash";
import { Input } from "modules/common";
import { withStyles } from "@material-ui/core/styles";
import L from "leaflet";
import "leaflet.fullscreen/Control.FullScreen";
import "leaflet-draw";
import "leaflet-providers/leaflet-providers";
import "modules/mapAndPanelCommon/funcs/material-icon-label";
import { map_ } from "./../funcs/utils/utils";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import defaultIcon from "./../images/default_location_status_offline.png";

import "modules/mapAndPanelCommon/styles/leaflet.awesome-markers.css";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet/dist/leaflet.css";
import "leaflet.fullscreen/Control.FullScreen.css";
import "../styles/style.less";

const styles = theme => ({
    disabled: {
        color: "rgba(255, 255, 255, 0.26) !important"
    },
    input_wrapper: {
        backgroundColor: theme.palette.background.default
    }
});

class MapApplication extends React.Component {
    constructor(props) {
        super(props);
        this.map = {};
        this.marker = null;
        this.defaultMapData = map_.getMapConfig();
    }

    static defaultProps = {
        settings: {
            width: "100%",
            height: "100%"
        },
        icon: "place",
        popup: false,
        iconColor: "red",
        dataSource: [],
        identify: `map_${Math.random()}`,
        getData: () => {
        },
        needToolBar: false,
        disableSave: true,
        getZoom: () => {
        },
        fullscreen: true,
        loading: false,
        _layer: null
    };
    static propTypes = {
        center: PropTypes.array,
        zoom: PropTypes.number,
        settings: PropTypes.object,
        icon: PropTypes.string,
        iconColor: PropTypes.string,
        popup: PropTypes.bool,
        dataSource: PropTypes.array,
        identify: PropTypes.string,
        getData: PropTypes.func,
        needToolBar: PropTypes.bool,
        disableSave: PropTypes.bool,
        getZoom: PropTypes.func,
        fullscreen: PropTypes.bool,
        loading: PropTypes.bool,
        _layer: PropTypes.string
    };
    state = {
        markMap: false,
        deleteActive: false,
        locationData: [],
        locationName: "",
        locationNameStatus: false,
        saveDisableStatus: true,
        zoom: map_.getMapConfig().zoom
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { zoom: defaultZoom, dataSource: prevDataSource } = prevProps;

        const { dataSource, iconColor, icon, center, zoom } = this.props;
        if (!_.isEqual(prevDataSource, dataSource)) {
            this.addMarker(dataSource, iconColor, icon);
        }
        if (this.props._layer) {
            if ((prevProps._layer && prevProps._layer !== this.props._layer) || !prevProps._layer) {
                this.setLayer(this.props._layer);
            }
        } else {
            const { layer } = this.defaultMapData;
            this.setLayer(layer);
        }
        if (center && center.length && dataSource.length) {
            if (zoom !== defaultZoom) {
                this.map.setView(map_.handleCoordinate(center), zoom || defaultZoom);
            } else {
                this.map.setView(map_.handleCoordinate(center));
            }
        }
    };

    initMap = () => {
        const {
            dataSource,
            iconColor,
            identify,
            fullscreen,
            _layer
        } = this.props;

        const { center, zoom, layer } = this.defaultMapData;
        this.map = L.map(identify, {
            center: map_.handleCoordinate(center),
            zoom,
            fullscreenControl: fullscreen
        });
        if (_layer) {
            this.setLayer(_layer);
        } else {
            this.setLayer(layer);
        }
        // L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(this.map);
        this.addEditLayer();
        this.addMarker(dataSource, iconColor);
    };

    setLayer = (_layer) => {
        const { layerConfig } = this.defaultMapData;
        L.tileLayer.provider(_layer, layerConfig).addTo(this.map);
    };

    addEditLayer = () => {
        const { needToolBar } = this.props;
        const editableLayers = new L.FeatureGroup();
        this.map.addLayer(editableLayers);
        const options = {
            position: "topright",
            edit: false,
            draw: {
                polygon: false,
                polyline: false,
                marker: needToolBar,
                circlemarker: false,
                rectangle: false,
                circle: false,
                delete: false
            }
        };
        const drawControl = new L.Control.Draw(options);
        this.map.addControl(drawControl);
        this.map.on(L.Draw.Event.CREATED, (event) => {
            const layer = event.layer;
            const coordinate = layer.getLatLng();
            this.removeMarker();
            let icon = "place";
            let iconColor = "red";
            let label = "";
            let iconImg = "saticImg";
            let imgPath = defaultIcon;
            if (this.props.dataSource && this.props.dataSource.length) {
                const { dataSource } = this.props;
                icon = dataSource[0].icon || "place";
                iconColor = dataSource[0].iconColor || "red";
                label = dataSource[0].lable || "";
                iconImg = dataSource[0].iconImg || "saticImg";
                imgPath = dataSource[0].imgPath || defaultIcon;
            }
            this.marker = L.marker(coordinate, map_.addMarker(icon, iconColor, label, iconImg, imgPath));
            this.marker.addTo(this.map);
            this.setState({
                locationData: Object.values(coordinate).reverse(),
                saveDisableStatus: false
            }, () => {
                this.map.panTo(map_.handleCoordinate(this.state.locationData));
            });
        });
    };

    removeMarker = () => {
        if (this.marker) {
            this.map.removeLayer(this.marker);
        }
    };

    addMarker = (dataSource, iconColor) => {
        if (dataSource && dataSource.length) {
            dataSource.forEach(item => {
                const {
                    center,
                    lable: labelInfo,
                    icon,
                    iconImg = "saticImg",
                    imgPath = defaultIcon
                } = item;
                this.removeMarker();
                if (center && center.length) {
                    this.marker = L.marker(map_.handleCoordinate(center), map_.addMarker(icon, iconColor, labelInfo, iconImg, imgPath));
                    this.marker.addTo(this.map);
                }
            });
        }
    };

    componentDidMount() {
        const { center } = this.props;
        this.props.getZoom(this.defaultMapData.zoom);
        this.initMap();
        this.map.on("zoomend", (event) => {
            this.props.getZoom(event.target.getZoom());
        });
        if (center && center.length) {
            this.map.setView(map_.handleCoordinate(center));
        }
    };

    handleSaveFinalData = () => {
        const { locationData } = this.state;
        if (locationData.length) {
            this.props.getData({
                locationData
            });
            this.setState({
                saveDisableStatus: true
            });
        }
    };

    render() {
        const {
            identify,
            settings,
            needToolBar,
            dataSource,
            classes,
            disableSave,
            loading
        } = this.props;
        const {
            locationData,
            saveDisableStatus
        } = this.state;
        const geoJson = dataSource && dataSource.length ? (dataSource[0].center).join(",") :
            (locationData.length ? locationData.join(",") : "");
        const shouldDisable = !!(disableSave && saveDisableStatus);
        return (
            <div className="map_widget_wrapper">
                <div id={identify} style={settings} className="map_container"/>
                <div className={`bottom_tool_bar ${classes.input_wrapper}`}>
                    <div className="input_wrapper">
                        <Input
                            className="geo_input"
                            value={geoJson}
                            title={geoJson}
                            placeholder="Coordinate"
                            disabled
                            inputProps={{
                                style: {
                                    textOverflow: "ellipsis"
                                }
                            }}
                        />
                    </div>
                    {
                        needToolBar ? (
                            <div className="tool_btn_wrapper">
                                <Button
                                    color="secondary"
                                    variant="contained"
                                    size="small"
                                    className="geo-button"
                                    onClick={this.handleSaveFinalData}
                                    disabled={shouldDisable}
                                    classes={{ disabled: classes.disabled }}
                                >Save</Button>
                            </div>
                        ) : ""
                    }
                </div>
                {
                    loading === true ? (
                        <div className="map_loading">
                            <CircularProgress color="secondary" size={50}/>
                        </div>
                    ) : ""
                }
            </div>
        );
    }
}

export default withStyles(styles)(MapApplication);
