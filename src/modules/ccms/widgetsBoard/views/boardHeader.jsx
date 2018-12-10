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
 * Created by wplei on 25/05/18.
 */
// import { theme as themes } from "modules/theme";
import { Icon, IconButton, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Wrap from "commons/components/wrapComponent";
import store from "commons/store";
// import { mergeBase64image } from "../funcs/mergePageConfig";
import domtoimage from "dom-to-image";
import React from "react";
import { I18n } from "react-i18nify";
import { withRouter } from "react-router-dom";
import { passLoadingState } from "../funcs/actions";
import { checkBrowser } from "../funcs/utils";

const styles = Theme => {
    return {
        ccms_widgets_container_appbar: {
            width: "100%"
        },
        ccms_widgets_container_toolbar: {
            backgroundColor: Theme.palette.primary.dark,
            height: Theme.spacing.unit * 8,
            display: "flex",
            alignItems: "center",
            padding: "0 24px"
        },
        boardtitle: {
            marginLeft: Theme.spacing.unit
        },
        boardsubtitle: {
            marginLeft: Theme.spacing.unit * 3,
            flex: 1
        },
        headericon: {
            cursor: "pointer",
            color: Theme.palette.primary.contrastText
            // marginRight: Theme.spacing.unit,
            // marginLeft: Theme.spacing.unit
        },
        loading_root: {
            marginRight: Theme.spacing.unit
        }
    };
};
class BoardHeader extends React.Component {
    state = {};
    handleBoardEdit = () => {
        const { pageConfig } = this.props;
        this.props.onBoardEdit(pageConfig, true /*editMode*/);
    };
    handleBoardExit = () => {
        this.props.onBoardExit();
    };
    // handleExitEdit = () => {
    //     this.props.onExitEditMode();
    // };
    handleBoardSave = () => {
        // let { pageConfig } = this.props;
        store.dispatch(passLoadingState(true));
        const dom = document.body.querySelector(".ccms-layout");
        //dom-to-image did not support IE, skip snapping step current.
        if (checkBrowser() === "IE") {
            this.props.onBoardSave(false /*editMode*/);
        } else {
            domtoimage
                .toBlob(dom, {})
                .then(blob => {
                    this.props.onBoardSave(blob);
                })
                .catch(err => {
                    // message.warn("file", err);
                    this.props.onBoardSave(null);
                });
            // domtoimage
            //     .toPng(dom, { height: window.innerHeight, width: window.innerWidth, quality: 0.5 })
            //     .then(dataurl => {
            //         const pageconfig = mergeBase64image(pageConfig, dataurl);
            //         this.props.onBoardSave(pageconfig, false /*editMode*/);
            //     })
            //     .catch(error => {
            //         console.log(error);
            //     });
        }
    };
    handleSaveAsTemplate = () => {
        this.props.onSaveTemplate();
    };
    handleBoardLunch = () => {
        this.props.onBoardExport(true);
    };
    render = () => {
        const { classes, editMode, title, requestError } = this.props;
        return (
            // <MuiThemeProvider theme={themes}>
            <section className={classes.ccms_widgets_container_appbar}>
                <section className={classes.ccms_widgets_container_toolbar}>
                    <Typography variant="h6" className={classes.boardtitle}>
                        {title}
                    </Typography>
                    <Typography variant="subtitle1" className={classes.boardsubtitle}>
                        {""}
                    </Typography>
                    {!requestError ? (
                        !editMode ? (
                            <Wrap>
                                <IconButton onClick={this.handleBoardLunch}>
                                    <Icon title={I18n.t("ccms.boardHeader.download")} className={classes.headericon}>
                                        cloud_download
                                    </Icon>
                                </IconButton>
                                <IconButton onClick={this.handleSaveAsTemplate}>
                                    <Icon title={I18n.t("modal.saveTemplate.title")} className={classes.headericon}>
                                        add_to_queue
                                    </Icon>
                                </IconButton>
                                <IconButton onClick={this.handleBoardEdit}>
                                    <Icon className={classes.headericon} title={I18n.t("ccms.boardHeader.editBoard")}>
                                        edit
                                    </Icon>
                                </IconButton>
                            </Wrap>
                        ) : (
                            <IconButton onClick={this.handleBoardSave}>
                                <Icon className={classes.headericon} title={I18n.t("ccms.boardHeader.saveBarod")}>
                                    save
                                </Icon>
                            </IconButton>
                        )
                    ) : null}
                    <IconButton onClick={this.handleBoardExit}>
                        <Icon className={classes.headericon} title={I18n.t("ccms.boardHeader.exitBoard")}>
                            exit_to_app
                        </Icon>
                    </IconButton>
                </section>
            </section>
            // </MuiThemeProvider>
        );
    };
}

export default withStyles(styles)(withRouter(BoardHeader));
