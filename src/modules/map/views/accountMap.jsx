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
 * Modified by LuoJia on 25/05/2018.
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import MapApplication from "./mapApplication";
import { SingleSelect } from "modules/mapAndPanelCommon";
import { getMapConfig, getCountryList, calacCenter } from "./../funcs/utils/utils";
import _ from "lodash";

let defaultMapData = getMapConfig();
export default class AccountMap extends Component {
    static defaultProps = {
        editOrAdd: "add",
        zoom: defaultMapData.zoom,
        getZoom: () => {},
        getLayer: () => {}
    };
    static propTypes = {
        editOrAdd: PropTypes.string,
        getZoom: PropTypes.func,
        getLayer: PropTypes.func
    };

    state = {
        defaultValue: defaultMapData.country,
        center: defaultMapData.center,
        checked: false,
        dataSource: [
            {
                center: defaultMapData.center,
                id: `a_${new Date().getTime()}`
            }
        ],
        layerList: defaultMapData.layerList,
        layer: defaultMapData.layer
    };

    componentWillReceiveProps(nextProps, nextContext) {
        const { center, layer } = nextProps;
        const { layer: layer2 } = this.state;
        if ((center && center.length && !_.isEqual(center, this.props.center)) || !_.isEqual(layer, this.props.layer)) {
            this.setState({
                layer: layer ? layer : layer2,
                center,
                dataSource: [
                    {
                        center: center,
                        id: `a_${new Date().getTime()}`
                    }
                ]
            });
        }
    }

    componentDidMount() {
        const { center, zoom, layer } = defaultMapData;
        this.props.getData(center);
        this.props.getZoom(zoom);
        this.props.getLayer(layer);
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        const { center, layer } = nextState;
        return center.join(",") !== this.state.center.join(",") || layer !== this.state.layer;
    }

    getData = e => {
        this.props.getData(e.locationData);
        this.setState({
            center: e.locationData,
            dataSource: [
                {
                    center: e.locationData,
                    id: `a_${new Date().getTime()}`
                }
            ]
        });
    };

    getZoom = zoom => {
        this.props.getZoom(zoom);
    };

    onCountrySelect = e => {
        this.setState({
            defaultValue: e,
            center: calacCenter(e),
            dataSource: [
                {
                    center: calacCenter(e),
                    id: `a_${new Date().getTime()}`
                }
            ]
        });
        this.props.getData(calacCenter(e));
    };

    onLayerSelect = layer => {
        this.setState({
            layer
        });
        this.props.getLayer(layer);
    };

    render() {
        const { defaultValue, center, dataSource, layer, layerList } = this.state;
        const { zoom, editOrAdd } = this.props;
        return (
            <div style={{ margin: "8px 0px 16px" }}>
                {editOrAdd === "add" ? (
                    <SingleSelect
                        title="Set Center"
                        selctOptions={getCountryList()}
                        defaultValue={defaultValue}
                        onSelect={this.onCountrySelect}
                    />
                ) : (
                    ""
                )}
                <SingleSelect
                    title="Set Layer"
                    selctOptions={layerList}
                    defaultValue={layer}
                    onSelect={this.onLayerSelect}
                />
                <div style={{ height: 300 }}>
                    <MapApplication
                        needToolBar
                        getData={this.getData}
                        getZoom={this.getZoom}
                        fullscreen
                        center={center}
                        zoom={zoom}
                        dataSource={dataSource}
                        _layer={layer}
                    />
                </div>
            </div>
        );
    }
}
