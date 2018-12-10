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
 * Created by @wplei on 28/05/18.
 */
import React, { Component } from "react";
import { Modal } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const styles = Theme => {
    return {};
};

class FullViewModal extends Component {
    state = {
        open: false
    };
    render = () => {
        const { open, component: C, props = {}, onExit } = this.props;
        return (
            <Modal open={open} disableAutoFocus={true}>
                {C ? <C {...props} onFullScreenExit={onExit} full /> : null}
            </Modal>
        );
    };
}

export default withStyles(styles)(FullViewModal);
