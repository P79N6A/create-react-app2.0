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
import Dialog from "../../../components/views/dialog";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
// import { theme } from "modules/theme";
import { TextField } from "../../../../common/index";
import { connect } from "react-redux";
import * as actions from "../../funcs/actions";
import { REDUCER_NAME as topoReducer } from "../../funcs/constants";
import { CircularProgress } from "@material-ui/core";
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
        width: "100%"
    },
    root: {
        overflow: "hidden"
    },
    progress: {
        margin: theme.spacing.unit * 2,
        position: "absolute",
        top: "calc(50% - 25px)",
        left: "calc(50% - 25px)"
    }
});

const PageNameDesc = ({ pageName, desc, handleChange, classes }) => {
    return (
        <div>
            <TextField
                autoFocus
                error={!pageName}
                label={I18n.t("modal.add.name")}
                name="pageName"
                margin="dense"
                value={pageName}
                onChange={handleChange}
                className={classes.editItem}
            />
            <TextField
                error={!desc}
                label={I18n.t("modal.saveTemplate.desc")}
                name="desc"
                rows={2}
                rowsMax={4}
                multiline
                className={classes.editItem}
                value={desc}
                onChange={handleChange}
            />
        </div>
    );
};

class RenameDashaboard extends React.Component {
    static defaultProps = {
        mode: "",
        open: false,
        title: "",
        subTitle: ""
    };

    state = {
        loading: false,
        pageName: "",
        desc: "",
        open: false,
        pageKey: "",
        pageConfig: {}
    };
    handleChange = event => {
        let value = event.target.value.replace(/^\s+/g, "");
        this.setState({ [event.target.name]: value });
    };

    componentWillReceiveProps(nextProps) {
        const { pageKey, mode, open, pageName, pageConfig } = nextProps;
        this.setState({
            mode: mode,
            pageKey: pageKey,
            loading: true,
            open: open,
            pageName: pageName,
            desc: pageConfig ? pageConfig.desc : ""
        });
        if (nextProps.pageConfig) {
            this.setState({
                loading: false,
                pageConfig: nextProps.pageConfig
            });
        }
    }

    cancle = () => {
        this.props.onCancel("renameWidget");
    };

    submit = () => {
        let { pageConfig, pageName, desc } = this.state;
        this.setState({
            errorPageName: false,
            errorDesc: false
        });
        if (!desc || !pageName) return;
        const rootPageConfig = Object.assign({}, pageConfig, {
            desc: desc,
            configValue: {
                ...pageConfig.configValue,
                title: pageName
            }
        });
        this.props.updatePageConfig(rootPageConfig);
        this.props.updateReducerPageConfig(rootPageConfig);
        this.props.onSubmit("renameWidget");
    };

    render() {
        const { classes, title, subTitle } = this.props;
        const maintitle = title ? title : I18n.t("modal.rename.label");
        const { open, mode, loading, pageName, desc } = this.state;
        const isLoading = loading && <CircularProgress className={classes.progress} size={50} />;
        return (
            <Dialog
                title={maintitle}
                onCancle={this.cancle}
                onSubmit={this.submit}
                open={open}
                subTitle={subTitle}
                mode={mode}
            >
                {isLoading}
                <div className={classes.root}>
                    <PageNameDesc pageName={pageName} desc={desc} handleChange={this.handleChange} classes={classes} />
                </div>
            </Dialog>
        );
    }
}

RenameDashaboard.propTypes = {
    open: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
    return {
        pageConfig: state[topoReducer] && state[topoReducer].pageConfig
    };
};

const mapDispatchToProps = dispatch => {
    return {
        updatePageConfig: config => {
            dispatch(actions.updatePageConfig(config));
        },
        updateReducerPageConfig: config => {
            dispatch(actions.updateReducerPageConfig(config));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(RenameDashaboard));
