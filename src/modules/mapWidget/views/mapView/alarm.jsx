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
import AlarmMapL from "./../map/alarmMapL";
import { CardWithTitle } from "modules/basicCardComps";
import { map_ } from "modules/map";

export default class AlarmView extends Component {
    static defaultProps = {
        tempData: []
    };
    render() {
        const {
            identify,
            title,
            tempData,
            icon,
            iconColor,
            zoom,
            loading,
            defaultMapData,
            editer
        } = this.props;
        const data = this.props[`map${identify}`];
        const mapTitle = (data && data.title) || title;
        const dataSource = (data && data.tempData) || tempData;
        const mapIcon = (data && data.icon) || icon;
        const mapIconColor = (data && data.iconColor) || iconColor;
        const mapLoading = (data && data.loading) || loading;
        return (
            <CardWithTitle
                title={mapTitle}
                icons={map_.fullScreen(this.props, editer)}
            >
                <AlarmMapL
                    dataSource={dataSource}
                    icon={mapIcon}
                    iconColor={mapIconColor}
                    identify={`map${identify}`}
                    zoom={zoom}
                    popup={true}
                    loading={mapLoading}
                    defaultMapData={defaultMapData}
                />
            </CardWithTitle>
        );
    }
}
