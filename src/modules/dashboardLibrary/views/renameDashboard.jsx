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
 * @module RenameDashaboard
 * @author LUOJIA
 * @exports {
 *  RenameDashaboard
 * }
 */
import React from "react";
import Dialog from "./dialog";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { TextField, CircularProgress, Typography } from "@material-ui/core";
import { connect } from "react-redux";
import { getDahboardItem, editDashboardSave } from "../funcs/actions";
import { REDUCER_NAME as topoReducer } from "../funcs/constants";
import { I18n } from "react-i18nify";

// import Img from "./chart.png";

const styles = theme => ({
    RenameDashaboard: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "20px"
    },
    lineHeight: {
        lineHeight: "2.6em"
    },
    editItem: {
        width: "100%",
        marginBottom: "20px"
    },
    root: {
        padding: "20px 20px 0px",
        overflow: "hidden"
    },
    progress: {
        margin: theme.spacing.unit * 2,
        position: "absolute",
        top: "calc(50% - 25px)",
        left: "calc(50% - 25px)"
    }
});

class RenameDashaboard extends React.Component {
    static defaultProps = {
        mode: "",
        open: false
    };

    state = {
        loading: false,
        name: "",
        open: false
    };
    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };
    selectChange = event => {
        let newGroup = I18n.t("modal.modal.rename.label");
        if (~event.target.value.indexOf(newGroup)) {
            this.setState({
                NewGroupOpen: true,
                group: [newGroup]
            });
        } else {
            this.setState({
                NewGroup: "",
                NewGroupOpen: false,
                group: event.target.value
            });
        }
    };

    componentWillReceiveProps(nextProps) {
        const { pageKey, getDahboardItem } = nextProps;
        this.setState({
            mode: nextProps.mode,
            open: nextProps.open,
            title: nextProps.mode,
            loading: true
        });
        if (pageKey !== this.props.pageKey) {
            this.setState({
                title: nextProps.mode,
                subTitle: "",
                name: ""
            });
            getDahboardItem(pageKey);
        }
        if (nextProps.dashboardItem && nextProps.dashboardItem.pageKey) {
            const dashboardItem = nextProps.dashboardItem.configValue;
            this.setState({
                open: nextProps.open,
                title: this.props.mode + " '" + dashboardItem.title + "'",
                subTitle: "",
                name: dashboardItem.title,
                loading: false
            });
        }
    }

    cancle = () => {
        this.props.closeModalDialog("renameOpen");
    };

    submit = () => {
        this.props.closeModalDialog("renameOpen");
    };

    render() {
        const { classes } = this.props;
        const { title, subTitle, open, mode, loading } = this.state;
        const isLoading = loading && <CircularProgress className={classes.progress} size={50} />;
        return (
            <Dialog title={title} cancle={this.cancle} submit={this.submit} open={open} subTitle={subTitle} mode={mode}>
                {isLoading}
                <Typography className={classes.root}>
                    <TextField
                        label={I18n.t("modal.modal.rename.label")}
                        name="name"
                        margin="dense"
                        value={this.state.name}
                        onChange={this.handleChange}
                        className={classes.editItem}
                    />
                </Typography>
            </Dialog>
        );
    }
}

RenameDashaboard.propTypes = {
    open: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
    return {
        dashboardItem: state[topoReducer] && state[topoReducer].dashboardItem
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getDahboardItem: key => {
            dispatch(getDahboardItem(key));
        },
        editDashboardSave: (originData, editData) => {
            dispatch(editDashboardSave(originData, editData));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(RenameDashaboard));
