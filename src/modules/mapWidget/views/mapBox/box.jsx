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
import Map from "modules/map/views/container";
import { CardWithTitle } from "modules/basicCardComps";
import { FullScreenButton } from "modules/ccms/components";

export default class MapBox extends Component {
    static defaultProps = {
        tempData: []
    };
    render() {
        const { identify, title, tempData, icon, iconColor, zoom, loading } = this.props;
        const data = this.props[`map${identify}`];
        const mapTitle = (data && data.title) || title;
        const dataSource = (data && data.tempData) || tempData;
        const mapIcon = (data && data.icon) || icon;
        const mapIconColor = (data && data.iconColor) || iconColor;
        const mapLoading = (data && data.loading) || loading;
        return (
            <div style={{ height: "100%", width: "100%" }}>
                <CardWithTitle title={mapTitle} actions={<FullScreenButton  {...this.props} />}>
                    <Map
                        dataSource={dataSource}
                        icon={mapIcon}
                        iconColor={mapIconColor}
                        identify={identify}
                        zoom={zoom}
                        popup={true}
                        loading={mapLoading}
                    />
                </CardWithTitle>
            </div>
        );
    }
}
