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
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import { ColorPicker } from "modules/common";

class DeviceSelectIconColor extends Component {
    static defaultProps = {
        defaultColor: "rgba(0, 0, 0, 0.26)",
        onSelect: () => {},
        title: "Select Color",
        iconAndColor: {},
        needRemind: false
    };
    static propTypes = {
        onSelect: PropTypes.func.isRequired,
        typeName: PropTypes.string,
        defaultColor: PropTypes.string,
        title: PropTypes.string,
        iconAndColor: PropTypes.object,
        needRemind: PropTypes.bool,
    };
    actionLog = value => {
        const { typeName } = this.props;
        this.props.onColorSelect(value, typeName);
    };
    render() {
        const { title, typeName, iconAndColor, needRemind } = this.props;
        return (
            <div className="panel_color_select">
                <div className="map_color_wrapper">
                    {
                        needRemind ? (
                            <Typography className="remind" >
                                {`${title} For ${typeName}`}
                            </Typography>
                        ) : ""
                    }
                    <div
                        className="mark"
                    >
                        <ColorPicker
                            initColor={iconAndColor[typeName] ? (
                                iconAndColor[typeName].iconColor || "red"
                            ) : "red"}
                            onSelect={this.actionLog}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default DeviceSelectIconColor;
