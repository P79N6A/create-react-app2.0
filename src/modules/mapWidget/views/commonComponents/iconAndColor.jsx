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
import SelectColor from "./selectColor";
import SelectIcon from "./selectIcon";

const styles = theme => ({
    wrapper: {
        display: "flex",
        alignItems: "center"
    },
    icon: {
        flex: 1
    }
});

class IconAndColor extends Component {
    render() {
        const {
            classes,
            iconType,
            identify,
            iconColor,
            title,
            defaultColor,
            backgroundColor
        } = this.props;
        return (
            <div className={classes.wrapper}>
                <div className={classes.icon}>
                    <SelectIcon
                        identify={identify}
                        iconType={iconType}
                        iconColor={iconColor}
                    />
                </div>
                <div className={classes.color}>
                    <SelectColor
                        identify={identify}
                        title={title}
                        defaultColor={defaultColor}
                        backgroundColor={backgroundColor}
                    />
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(IconAndColor);
