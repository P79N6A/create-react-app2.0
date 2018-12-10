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
 * Created by Xiaolong on 28/05/2018.
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import Icon from "@material-ui/core/Icon";
import { withStyles } from "@material-ui/core/styles";
import icons from "modules/panel/funcs/icons";
import Typography from "@material-ui/core/Typography";
import { IconPicker } from "modules/panel";

const styles = theme => {
    return {
        search_input: {
            width: "100%",
            backgroundColor: theme.palette.grey.A700,
        },
        close_icon: {
            cursor: "pointer"
        }
    };
};

class DeviceSelectIcon extends Component {
    static defaultProps = {
        title: "Select Icon",
        onSelect: () => {},
        iconAndColor: {}
    };
    static propTypes = {
        title: PropTypes.string,
        onSelect: PropTypes.func,
        typeName: PropTypes.string,
        iconAndColor: PropTypes.object
    };
    state = {
        choosedIcon: "",
        visible: false,
        searchValue: "",
        iconsArr: icons,
        open: false,
    };
    onSelect = (e) => {
        const { typeName } = this.props;
        this.props.onIconSelect(e, typeName);
    };
    render() {
        const { title, typeName, iconAndColor } = this.props;
        return (
            <div
                className="map_icons_wrap"
            >
                <div className="map_color_wrapper">
                    <Typography className="remind" >
                        {`${title} For ${typeName}`}
                    </Typography>
                    <div
                        className="mark_icon"
                    >
                        <IconPicker
                            onSelect={this.onSelect}
                        >
                            <Icon style={{
                                color: iconAndColor[typeName] ? (
                                    iconAndColor[typeName].iconColor || "red"
                                ) : "red"
                            }}>
                                {
                                    iconAndColor[typeName] ? (
                                        iconAndColor[typeName].icon || "place"
                                    ) : "place"
                                }
                            </Icon>
                        </IconPicker>
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(DeviceSelectIcon);
