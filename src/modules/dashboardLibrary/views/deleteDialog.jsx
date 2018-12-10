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
import { withRouter } from "react-router";
import PropTypes from "prop-types";
import Dialog from "./dialog";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { connect } from "react-redux";
import { getDahboardItem, restDashboardItem, deleteDashboardRequest } from "../funcs/actions";
import { REDUCER_NAME as topoReducer } from "../funcs/constants";
import { I18n } from "react-i18nify";
import { formatter } from "../funcs/util";

const styles = theme => ({
    root: {
        // padding: "20px 20px 0px",
        // color: "#fff"
    }
});

class DeleteDashaboard extends React.Component {
    state = {
        pageKey: "",
        name: "",
        group: "",
        open: false,
        title: I18n.t("modal.groupManage.title"),
        subTitle: ""
    };
    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    componentWillReceiveProps(nextProps) {
        this.setState({
            open: nextProps.open,
            name: nextProps.name,
            subTitle: formatter(I18n.t("modal.groupManage.title"), nextProps.mode),
            mode: nextProps.mode
        });
        if (nextProps.pageKey) {
            this.setState({
                pageKey: nextProps
            });
        }
        if (this.props.isDeletePageKey === this.state.pageKey) {
            this.props.history.replace("/ccms");
        }
    }

    cancle = () => {
        // this.props.closeDialog("deleteOpen");
    };

    submit = () => {
        const { mode, pageKey } = this.state;
        if (mode === "Dashboard") {
            this.props.deleteDashboardRequest(pageKey);
        }
        // this.props.closeDialog("deleteOpen");
    };

    render() {
        const { classes } = this.props;
        const { title, subTitle, name, open } = this.state;
        return (
            <Dialog
                title={title}
                cancle={this.cancle}
                submit={this.submit}
                open={open}
                subTitle={subTitle}
                submitText="DELETE"
            >
                <Typography className={classes.root}>
                    <Typography component="span" style={{ fontWeight: "bold" }}>
                        {I18n.t("modal.groupManage.deleteFirst").replace("{0}", name)}
                    </Typography>
                </Typography>
            </Dialog>
        );
    }
}

DeleteDashaboard.propTypes = {
    open: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
    return {
        isDeletePageKey: state[topoReducer] && state[topoReducer].isDeletePageKey
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getDahboardItem: key => {
            dispatch(getDahboardItem(key));
        },
        restDashboardItem: () => {
            dispatch(restDashboardItem());
        },
        deleteDashboardRequest: key => {
            dispatch(deleteDashboardRequest(key));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(withRouter(DeleteDashaboard)));
