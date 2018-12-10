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
import { connect } from "react-redux";
import {
    changeBgColor,
    changeIconColor,
    panelSetTitleColor,
    changeCountColor,
    panelParameterOneColorControl,
    panelParameterTwoColorControl,
} from "./../../funcs/actions";
import Typography from "@material-ui/core/Typography";
import { ColorPicker } from "modules/common";

class PanelSelectBgColor extends Component {
    static defaultProps = {
        onSelect: () => {},
        title: "Select Color",
        needRemind: false
    };
    static propTypes = {
        onSelect: PropTypes.func.isRequired,
        defaultColor: PropTypes.string,
        title: PropTypes.string,
        changeTarget: PropTypes.string.isRequired,
        backgroundColor: PropTypes.string.isRequired,
        needRemind: PropTypes.bool
    };
    state = {
        open: false
    };
    actionLog = value => {
        const { dispatch, identify, changeTarget } = this.props;
        this.props.onSelect(value);
        switch(changeTarget) {
            case "count":
                dispatch(changeCountColor(value, identify));
                break;
            case "background":
                dispatch(changeBgColor(value, identify));
                break;
            case "icon":
                dispatch(changeIconColor(value, identify));
                break;
            case "title":
                dispatch(panelSetTitleColor(value, identify));
                break;
            case "parameterOne":
                dispatch(panelParameterOneColorControl(value, identify));
                break;
            case "parameterTwo":
                dispatch(panelParameterTwoColorControl(value, identify));
                break;
            default:
                break;
        }
    };
    render() {
        const { title, backgroundColor, needRemind } = this.props;
        return (
            <div className="panel_color_select">
                <div className="panel_color_wrapper">
                    {
                        needRemind ? (
                            <Typography className="remind" >{title}</Typography>
                        ) : ""
                    }
                    <div
                        className="mark_icon"
                    >
                        <ColorPicker
                            initColor={backgroundColor}
                            onSelect={this.actionLog}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default connect()(PanelSelectBgColor);
