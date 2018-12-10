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
 * Created by KaiDi on 25/10/2018.
 */
import React from "react";
import PropTypes from "prop-types";
import { I18n } from "react-i18nify";
import { withStyles } from "@material-ui/core/styles";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";

const styles = {
    bakRoot: {
        position: "absolute"
    }
};

class DeleteDialog extends React.Component {
    static propTypes = {
        title: PropTypes.string,
        content: PropTypes.string,
        onClick: PropTypes.func,
        container: PropTypes.object,
        open: PropTypes.bool
    };
    render() {
        const { classes, title, container, open, content } = this.props;
        return (
            <Dialog
                open={open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                container={container}
                classes={{ root: classes.bakRoot }}
                BackdropProps={{ classes: { root: classes.bakRoot } }}
            >
                <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">{content}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => {
                            this.props.onClick(false);
                        }}
                        color="secondary"
                        autoFocus
                    >
                        {I18n.t("common.Cancel")}
                    </Button>
                    <Button
                        onClick={() => {
                            this.props.onClick(true);
                        }}
                        color="secondary"
                    >
                        {I18n.t("common.Yes")}
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default withStyles(styles)(DeleteDialog);
