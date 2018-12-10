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
 * Created by wplei on 25/05/18.
 */
import React, { Component } from "react";
// import PropTypes from "prop-types";
import Dialog from "../../dashboardLibrary/views/dialog";
import { withStyles } from "@material-ui/core/styles";
import style from "../styles/settingStyle";

class CommonSettings extends Component {
    state = {
        isOpen: false,
        title: "",
        mode: ""
    };
    static defaultProps = {
        title: "Settings"
    };
    static propTypes = {};
    static getDrivedStateFromProps = () => {};
    handleDialogState = name => {
        this.props.onToggleDialogState(name);
    };
    render = () => {
        const { /*classes,*/ title, open } = this.props;
        const { mode /* isOpen*/ } = this.state;
        return (
            <Dialog
                open={open}
                title={title}
                cancle={() => this.handleDialogState("settingOpen")}
                submit={() => this.handleDialogState("settingOpen")}
                mode={mode}
            >
                {"123123123123123"}
            </Dialog>
        );
    };
}

export default withStyles(style)(CommonSettings);
