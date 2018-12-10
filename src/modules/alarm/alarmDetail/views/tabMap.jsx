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
 * Created by SongCheng on 09/08/2018.
 */
import React, { Component } from "react";
import "../styles/style.less";
import { AlarmMap } from "modules/mapWidget";
class TabFavourite extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { mapData, identify } = this.props;
        return (
            <div className="map" style={{ height: "100%" }}>
                <AlarmMap identify={identify} dataSource={mapData} zoom={12} popup={true} />
            </div>
        );
    }
}

export default TabFavourite;
