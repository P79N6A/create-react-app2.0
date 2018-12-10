/*
* =========================================================================
*  Copyright (C)2015 NCS Pte. Ltd. All Rights Reserved
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
 * Created by @Luo Jia alex on 29/05/15.
 */

/**
 * @fileOverview Here need the description for this file
 * @module ExitReminder
 * @author LEI
 * @exports {
 *  ExitReminder
 * }
 */
import React from "react";
import PropTypes from "prop-types";
import Dialog from "../../../components/views/dialog";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
// import { I18n } from "react-i18nify";
// import { theme } from "modules/theme";
import { I18n } from "react-i18nify";

const styles = theme => ({
    root: {
        color: theme.palette.text.secondary
    }
});

class ExitReminder extends React.Component {
    static defaultProps = {};
    state = {
        name: I18n.t("ccms.exitRemider.name"),
        group: I18n.t("ccms.exitRemider.group"),
        open: I18n.t("ccms.exitRemider.open"),
        title: I18n.t("ccms.exitRemider.title"),
        subTitle: I18n.t("ccms.exitRemider.subTitle"),
        pageKey: I18n.t("ccms.exitRemider.pageKey"),
        pageName: I18n.t("ccms.exitRemider.pageName"),
        cancelText: I18n.t("ccms.exitRemider.cancelText"),
        submitText: I18n.t("ccms.exitRemider.submitText"),
        content: I18n.t("ccms.exitRemider.content")
    };

    cancle = () => {
        this.props.onCancel("exitBoard");
    };

    submit = () => {
        this.props.onSubmit("exitBoard");
    };

    render() {
        const { classes, open } = this.props;
        const { subTitle, title, cancelText, submitText, content } = this.state;
        return (
            <Dialog
                open={open}
                title={title}
                onCancle={this.cancle}
                onSubmit={this.submit}
                subTitle={subTitle}
                submitText={submitText}
                cancleText={cancelText}
            >
                <div className={classes.root}>
                    <Typography>{content}</Typography>
                </div>
            </Dialog>
        );
    }
}

ExitReminder.propTypes = {
    open: PropTypes.bool.isRequired
};

export default withStyles(styles)(ExitReminder);
