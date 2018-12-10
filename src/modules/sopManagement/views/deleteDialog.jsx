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
 * Created by chenling on 08/10/2018.
 */
import React from "react";
import "../styles/sop.less";
import { withStyles } from "@material-ui/core/styles";
import { I18n } from "react-i18nify";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";

const styles = {
    bakRoot: {
        position: "absolute"
    }
};

class DeleteDialog extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <Dialog
                open={this.props.open}
                onClose={this.handleClick}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                container={document.getElementById(this.props.identify)}
                classes={{ root: classes.bakRoot }}
                BackdropProps={{ classes: { root: classes.bakRoot } }}
            >
                <DialogTitle id="alert-dialog-title">{I18n.t("sop.dialog.title")}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {I18n.t("sop.dialog.deleteMsg")}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => {
                            this.props.onClick(true);
                        }}
                        color="secondary"
                    >
                        {I18n.t("sop.dialog.ok")}
                    </Button>
                    <Button
                        onClick={() => {
                            this.props.onClick(false);
                        }}
                        color="secondary"
                        autoFocus
                    >
                        {I18n.t("sop.dialog.cancel")}
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default withStyles(styles)(DeleteDialog);
