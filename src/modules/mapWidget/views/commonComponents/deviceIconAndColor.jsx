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
import { withStyles } from "@material-ui/core/styles";
import DeviceSelectIconColor from "./deviceSelectIconColor";
import DeviceSelectIcon from "./deviceSelecticon";

const styles = theme => ({
    wrapper: {
        display: "flex",
        alignItems: "center"
    },
    icon: {
        flex: 1
    }
});

class DeviceIconAndColor extends Component {
    iconSelect = (e, typeName) => {
        this.props.iconSelect(e, typeName);
    };
    iconColorSelect = (e, typeName) => {
        this.props.iconColorSelect(e, typeName);
    };
    render() {
        const {
            classes,
            identify,
            typeName,
            iconAndColor
        } = this.props;
        return (
            <div className={classes.wrapper}>
                <div className={classes.icon}>
                    <DeviceSelectIcon 
                        identify={identify}
                        typeName={typeName}
                        onIconSelect={this.iconSelect}
                        iconAndColor={iconAndColor}
                    />
                </div>
                <div className={classes.color}>
                    <DeviceSelectIconColor
                        identify={identify}
                        title="Select Icon Color"
                        defaultColor="#ffffff"
                        typeName={typeName}
                        onColorSelect={this.iconColorSelect}
                        iconAndColor={iconAndColor}
                    />
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(DeviceIconAndColor);