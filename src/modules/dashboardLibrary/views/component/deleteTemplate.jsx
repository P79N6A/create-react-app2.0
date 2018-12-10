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
 * @module deleteDashaboard
 * @author LUOJIA
 * @exports {
 *  DeleteDashaboard
 * }
 */
import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import Dialog from "../dialog";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { connect } from "react-redux";
// import { deleteDashboardRequest } from "../../../../dashboardLibrary/funcs/actions";
// import { toggleEditMode } from "../../funcs/actions";
import { I18n } from "react-i18nify";

const styles = theme => ({});

class DeleteTemplate extends React.Component {
    static defaultProps = {};
    state = {
        group: "",
        open: false,
        title: "Are You Sure ?",
        pageKey: "",
        pageName: ""
    };

    componentWillReceiveProps(nextProps) {
        const { templateName, open } = nextProps;
        this.setState({
            templateName: templateName,
            open: open
        });
    }

    cancle = () => {
        this.props.onCancel("deleteOpen");
    };

    submit = () => {
        this.props.delete();
    };

    render() {
        const { classes } = this.props;
        const { subTitle, title, templateName, open } = this.state;
        return (
            <Dialog
                title={title}
                onCancle={this.cancle}
                open={open}
                subTitle={subTitle}
                submitText="DELETE"
                cancle={this.cancle}
                submit={this.submit}
            >
                <div className={classes.root}>
                    <Typography>{I18n.t("modal.dashboardDelete.contentFront").replace("{0}", templateName)}</Typography>
                </div>
            </Dialog>
        );
    }
}

DeleteTemplate.propTypes = {
    open: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
    return {};
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(withRouter(DeleteTemplate)));
