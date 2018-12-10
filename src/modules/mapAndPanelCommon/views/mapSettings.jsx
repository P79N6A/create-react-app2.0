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

import { Component } from "react";
import PropTypes from "prop-types";

let timer = null;
export default class MapSetting extends Component {
    static defaultProps = {
        getZoom: () => {}
    };
    static propTypes = {
        getZoom: PropTypes.func
    };
    componentDidUpdate() {
        const { map } = this.props;
        map.getView().on("change:resolution", () => {
            if (timer) {
                clearTimeout(timer);
            }
            timer = setTimeout(() => {
                this.checkZoom();
            }, 400);
        });
    };
    // get zoom
    checkZoom = (e) => {
        const { getZoom, map } = this.props;
        // console.log(map.getView().getZoom());
        getZoom(map.getView().getZoom());
    };
    render() {
        return null;
    }
}
