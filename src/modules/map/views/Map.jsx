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
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import PropTypes from "prop-types";

import "./../styles/map.less";

export default class Map extends Component {
    static defaultProps = {
        identify: "map_container_"
    };
    static propTypes = {
        identify: PropTypes.string
    };
    constructor(props) {
        super(props);
        this.map = {};
    };
    componentDidMount() {
        const { identify } = this.props;
        this.map = L.map(identify, {
            center: {
                lat: 1.349133733693114,
                lng: 103.81805419921876
            },
            zoom: 12
        });
        L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(this.map);
    };

    render() {
        const { identify } = this.props;
        return (
            <div className="map_container_" id={identify}>
                123
            </div>
        );
    }
}
