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
import BasicMapL from "./../map/basicMapL";
import { CardWithTitle } from "modules/basicCardComps";
import { connect } from "react-redux";
import { map_ } from "modules/map";
import { handleBasicMapMessage } from "./../../funcs/utils/basicMapUtil";
import { clearBasicMapData } from "./../../funcs/actions";

class BasicMapView extends Component {
    componentWillMount() {
        this.clearData();
    };
    clearData() {
        const { dispatch } = this.props;
        dispatch(clearBasicMapData({}));
    };
    componentWillUnmount() {
        this.clearData();
    };
    render() {
        const {
            identify,
            title,
            defaultMapData,
            basicMapMessage,
            storeData,
            editer
        } = this.props;
        const deviceLocationData = handleBasicMapMessage(basicMapMessage, storeData);
        const data = this.props[`map${identify}`];
        const mapTitle = (data && data.title) || title;
        return(
            <CardWithTitle
                title={mapTitle}
                icons={map_.fullScreen(this.props, editer)}
            >
                <BasicMapL
                    deviceLocationData={deviceLocationData}
                    defaultMapData={defaultMapData}
                    identify={`map${identify}`}
                />
            </CardWithTitle>
        );
    }
}

const getMap = state => {
    return {
        storeData: state || null
    };
};

export default connect(getMap)(BasicMapView);
