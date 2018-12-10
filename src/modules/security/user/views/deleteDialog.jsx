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
 * delete user diolog component
 * @example
 *
 * @param {boolean} open
 * @returns Component
 */
class DeleteDialog extends React.Component {
    static defaultProps = {};
    state = {
        open: false,
        name: ""
    };

    cancle = () => {
        this.props.reset({ deleteOpen: false });
        // deleteData: selected
    };

    submit = () => {
        // this.props.onSubmit();
        const { deleteData = [] } = this.props;
        const { searchData } = this.props;
        if (!deleteData.length) return;
        this.props.deleteUser(deleteData.map(n => ({ userid: n })), searchData);
        this.props.reset({ deleteOpen: false, deleteData: [] });
        // this.setState({
        //     currUser: {},
        //     deleteOpen: false
        // });
    };

    render() {
        const { deleteData = [], deleteOpen, classes } = this.props;
        const { subTitle } = this.state;
        // let rootname = userList
        //     .filter(n => ~deleteData.indexOf(n.userid))
        //     .map(n => n.username)
        //     .join(", ");
        let rootname = deleteData.join(", ");
        return (
            <Dialog
                title={I18n.t("modal.userDelete.title")}
                cancle={this.cancle}
                open={deleteOpen}
                submit={this.submit}
                subTitle={subTitle}
                submitText="DELETE"
                minWidth={"auto"}
            >
                <div className={classes.root}>
                    <Typography style={{ display: "inline-block", wordBreak: "break-all" }}>
                        {I18n.t("modal.userDelete.contentFront").replace("{0}", rootname)}
                    </Typography>
                    <Typography>{I18n.t("modal.userDelete.go")}</Typography>
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
