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
 * Created by LWP on 16/10/2018.
 */

import React from "react";
import PropTypes from "prop-types";
import { Modal, CircularProgress, Backdrop, Typography, Portal } from "@material-ui/core";

export const LoadingModal = ({ open, classes }) => {
    return (
        <Modal
            open={open}
            classes={{
                root: classes.modalRoot
            }}
        >
            <CircularProgress size={50} color="secondary" />
        </Modal>
    );
};

LoadingModal.defaultProps = {
    open: false
};

LoadingModal.propTypes = {
    open: PropTypes.bool
};

export const Empty = ({ open, classes }) => {
    return (
        <React.Fragment>
            <Backdrop
                classes={{
                    root: open ? classes.backDropRootShow : classes.backDropRootHide
                }}
                open={open}
                invisible={open}
                ref={ref => (this.container = ref)}
            />
            <Portal container={this.container}>
                <Typography
                    variant="subtitle1"
                    classes={{
                        colorSecondary: classes.typographyColorSecondary
                    }}
                    color="secondary"
                >
                    no applications
                </Typography>
                <Typography />
            </Portal>
        </React.Fragment>
    );
};

Empty.defaultProps = {
    open: false
};

Empty.propTypes = {
    open: PropTypes.bool.isRequired,
    classes: PropTypes.object.isRequired
};
