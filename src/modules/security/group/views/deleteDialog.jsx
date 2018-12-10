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
 * Created by Jia Luo on 27/07/2018.
 */
import React from "react";
import PropTypes from "prop-types";
import { Typography } from "@material-ui/core";
import { Dialog } from "../../common/index";
import { I18n } from "react-i18nify";
import { withStyles } from "@material-ui/core/styles";
const styles = theme => ({
    root: {
        color: theme.palette.text.primary,
        fontSize: "0.875rem"
    }
});
/**
 * is delete groups ?
 * @example
 *
 * @param {string} open
 * @returns Component
 */
class DeleteDialog extends React.Component {
    static defaultProps = {};
    state = {
        open: false,
        name: ""
    };

    componentWillReceiveProps(nextProps) {
        const { pageKey, name, open } = nextProps;
        this.setState({
            pageKey: pageKey,
            name: name,
            open: open
        });
    }

    cancle = () => {
        this.props.onCancel("deleteBoard");
    };

    submit = () => {
        this.props.onSubmit();
    };

    render() {
        const { classes } = this.props;
        const { subTitle, name, open } = this.state;
        return (
            <Dialog
                title={I18n.t("modal.userGroupDelete.title")}
                cancle={this.cancle}
                open={open}
                submit={this.submit}
                subTitle={subTitle}
                submitText="DELETE"
                minWidth={"auto"}
            >
                <div className={classes.root}>
                    <Typography style={{ display: "inline-block", wordBraeak: "break-all" }}>
                        {I18n.t("modal.userGroupDelete.contentFront").replace("{0}", name)}
                    </Typography>
                    <Typography>{I18n.t("modal.userGroupDelete.go")}</Typography>
                </div>
            </Dialog>
        );
    }
}
DeleteDialog.propTypes = {
    classes: PropTypes.object.isRequired
};
DeleteDialog.defaultProps = {};
export default withStyles(styles)(DeleteDialog);
