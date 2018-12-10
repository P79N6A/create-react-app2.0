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
 * Created by Deng Xiaolong on 28/05/2018.
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Icon from "@material-ui/core/Icon";
import { withStyles } from "@material-ui/core/styles";
import IconPicker from "./iconPicker";
import { changeIcon } from "./../../funcs/actions";
import Typography from "@material-ui/core/Typography";

const styles = theme => {
    return {
        close_icon: {
            cursor: "pointer"
        }
    };
};

class PanelSelectIcon extends Component {
    static defaultProps = {
        title: "Select Icon",
        onSelect: () => {},
        iconType: "",
        iconColor: ""
    };
    static propTypes = {
        title: PropTypes.string,
        onSelect: PropTypes.func,
        iconType: PropTypes.string,
        iconColor: PropTypes.string,
    };
    onSelect = (e) => {
        const { dispatch, identify } = this.props;
        dispatch(changeIcon(e, identify));
    };
    render() {
        const { title, iconColor, iconType } = this.props;
        return (
            <div
                id="panel_icons_wrap"
                className="panel_icons_wrap"
            >
                <div className="panel_color_wrapper">
                    <Typography className="remind" >{title}</Typography>
                    <div
                        className="mark_icon"
                    >
                        <IconPicker
                            onSelect={this.onSelect}
                        >
                            <Icon style={{color: iconColor, marginTop: "8px"}}>
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
