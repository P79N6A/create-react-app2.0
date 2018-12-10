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
import Dialog from "../../../components/views/dialog";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { connect } from "react-redux";
import { deleteDashboardRequest } from "../../../../dashboardLibrary/funcs/actions";
import { toggleEditMode, deleteresource } from "../../funcs/actions";
import { I18n } from "react-i18nify";
// import { theme } from "modules/theme";

const styles = theme => ({
    root: {
        fontSize: "1rem",
        color: theme.palette.text.primary
    },
    typographyRoot: {
        color: theme.palette.text.primary,
        display: "inline-block"
    }
});

class DeleteDashaboard extends React.Component {
    static defaultProps = {};
    state = {
        name: "Alerms Dashboard",
        group: "",
        open: false,
        title: "Are You Sure ?",
        subTitle: "Delete Dashboard Confirmation",
        pageKey: "",
        pageName: "pageName"
    };
    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    componentWillReceiveProps(nextProps) {
        const { pageKey, pageName, open, materialKey } = nextProps;
        this.setState({
            open: open,
            materialKey,
            pageKey: pageKey,
            pageName: pageName
        });
    }

    cancle = () => {
        this.props.onCancel("deleteBoard");
    };

    submit = () => {
        const { pageKey, materialKey } = this.state;
        this.props.onSubmit("deleteBoard");
        this.props.deleteResource(materialKey);
        this.props.changeWidgetBoardEditMode(false);
        this.props.deleteDashboardRequest(pageKey, this.goBack);
    };

    goBack = () => {
        this.props.history.replace("/dashboards");
    };

    render() {
        const { classes } = this.props;
        const { subTitle, title, pageName, open } = this.state;
        return (
            <Dialog
                title={title}
                onCancle={this.cancle}
                open={open}
                onSubmit={this.submit}
                subTitle={subTitle}
                submitText="DELETE"
                minWidth={"auto"}
            >
                <div className={classes.root}>
                    <Typography
                        classes={{
                            root: classes.typographyRoot
                        }}
                    >
                        {I18n.t("modal.dashboardDelete.contentFront").replace("{0}", pageName)}
                        {", "}
                        {I18n.t("modal.dashboardDelete.go")}
                    </Typography>
                </div>
            </Dialog>
        );
    }
}

DeleteDashaboard.propTypes = {
    open: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
    return {};
};

const mapDispatchToProps = dispatch => {
    return {
        deleteDashboardRequest: (key, goBack) => {
            dispatch(deleteDashboardRequest(key, goBack));
        },
        changeWidgetBoardEditMode: flag => {
            dispatch(toggleEditMode(flag));
        },
        deleteResource: resourceId => {
            dispatch(deleteresource(resourceId));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(withRouter(DeleteDashaboard)));
