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
import { connect } from "react-redux";
import Icon from "@material-ui/core/Icon";
import { withStyles } from "@material-ui/core/styles";
import { IconPicker } from "modules/panel";
import { changeIcon } from "./../../funcs/actions";
import icons from "modules/panel/funcs/icons";
import Typography from "@material-ui/core/Typography";

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

class PanelSelectIcon extends Component {
    static defaultProps = {
        title: "Select Icon",
        onSelect: () => {},
        iconColor: "red",
        iconType: "alarm"
    };
    static propTypes = {
        title: PropTypes.string,
        onSelect: PropTypes.func,
        iconColor: PropTypes.string,
        iconType: PropTypes.string
    };
    state = {
        choosedIcon: "",
        visible: false,
        searchValue: "",
        iconsArr: icons,
        open: false,

    };
    onSelect = (e) => {
        const { dispatch, identify } = this.props;
        dispatch(changeIcon(e, identify));
    };
    render() {
        const { title, iconColor, iconType } = this.props;
        return (
            <div
                className="map_icons_wrap"
            >
                <div className="map_color_wrapper">
                    <Typography className="remind" >{title}</Typography>
                    <div
                        className="mark_icon"
                    >
                        <IconPicker
                            onSelect={this.onSelect}
                        >
                            <Icon style={{color: iconColor}}>
                                {iconType}
                            </Icon>
                        </IconPicker>
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(connect()(PanelSelectIcon));
