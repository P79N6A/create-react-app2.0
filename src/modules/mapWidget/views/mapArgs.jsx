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
import AlarmLocations from "./mapArguments/alarm";
import MapDevice from "./mapArguments/device";
import BasicMapArgs from "./mapArguments/basicMap";
import { connect } from "react-redux";
import { REDUCER_NAME as mapReducer } from "../funcs/constants";

class MapArguments extends Component {
    static defaultProps = {
        get: () => {}
    };
    selectedType = e => {
        this.setState({
            mapType: e
        });
    };
    componentDidMount() {
        this.props.get(this);
    }
    getData = () => {
        const { identify } = this.props;
        const data = this.props[`map${identify}`];
        if(data.tempData) {
            delete data.tempData;
        }
        if(data.loading) {
            delete data.loading;
        }
        if (data.editer) {
            data.editer = "edited";
        }
        console.log(data);
        return data;
    };
    render() {
        const { identify } = this.props;
        const currentMap = this.props[`map${identify}`] ? this.props[`map${identify}`].type : "";
        return (
            <div className="map_arguments">
                {
                    currentMap === "Alarm Locations" ? (
                        <AlarmLocations {...this.props} />
                    ) : currentMap === "Device Locations" ? (
                        <MapDevice {...this.props} />
                    ) : currentMap === "Basic Map" ? (
                        <BasicMapArgs {...this.props} />
                    ) : ""
                }
            </div>
        );
    }
}
const getMap = state => {
    return state[mapReducer] || {};
};
export default connect(getMap)(MapArguments);
