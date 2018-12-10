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
// import { theme } from "modules/theme";
import { withStyles } from "@material-ui/core/styles";
import { IconButton, Icon, CardHeader, Divider, Button, Paper, Slide } from "@material-ui/core";
import { multipleShadow, Loading } from "./index";
import classnames from "classnames";
import { I18n } from "react-i18nify";
import LeftIcon from "@material-ui/icons/ArrowLeft";
import RightIcon from "@material-ui/icons/ArrowRight";

const drawerWidth = 400;
const styles = theme => ({
    root: {
        position: "absolute",
        width: drawerWidth,
        height: "100%",
        // overflow: "hidden",
        right: 0,
        top: 0,
        zIndex: 2,
        boxShadow: theme.shadows[multipleShadow]
    },
    button: {
        margin: theme.spacing.unit,
        marginLeft: "auto"
    },
    drawer: {
        height: "calc(100% - 64px)",
        position: "relative",
        right: 0,
        top: 0
    },
    content: {
        padding: theme.spacing.unit * 2,
        height: "calc(100% - 128px)",
        overflowY: "auto"
    },
    footer: {
        textAlign: "right"
    },
    loading: {
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.2)"
    },
    arrow: {
        width: 0,
        height: 0,
        borderWidth: "50px 40px 50px 0",
        borderStyle: "solid",
        borderColor: `transparent ${theme.palette.primary.light} transparent transparent`,
        position: "absolute",
        left: "-40px",
        top: "48%",
        display: "flex",
        alignItems: "center",
        color: theme.palette.text.primary,
        cursor: "pointer"
    },
    icon: {
        fontSize: "55px"
    }
});

/**
 * Darwers is a side slide component
 * @example
 *
 *
 * @param {func} onClickHandle
 * @param {func} closeHandle
 * @param {boolean} open
 * @param {boolean} disabled
 * @param {number} width
 * @param {string} formTitle
 * @param {string} footerTitle
 * @param {boolean} readOnly
 * @returns Component
 */
class Darwers extends React.Component {
    state = {
        shouldWidth2X: false
    };
    componentWillReceiveProps(nextProps) {
        if (this.props.open !== nextProps.open && nextProps.open) {
            this.setState({
                shouldWidth2X: false
            });
        }
    }
    handleWidthChangeFunc = () => {
        this.setState({
            shouldWidth2X: !this.state.shouldWidth2X
        });
    };
    render() {
        const {
            classes,
            children,
            onClickHandle,
            open,
            closeHandle,
            formTitle,
            footerTitle,
            readOnly,
            width,
            disabled,
            saveButton,
            isLoading,
            ...otherProps
        } = this.props;
        const { shouldWidth2X = false } = this.state;
        return (
            <Slide direction="left" in={open} mountOnEnter unmountOnExit>
                <Paper
                    className={classnames(classes.root, otherProps.root)}
                    style={{ width: shouldWidth2X ? 1.5 * width : width }}
                    elevation={1}
                >
                    {isLoading && <Loading />}
                    {open ? (
                        <div className={classes.arrow} onClick={this.handleWidthChangeFunc}>
                            {shouldWidth2X ? (
                                <RightIcon className={classes.icon} />
                            ) : (
                                <LeftIcon className={classes.icon} />
                            )}
                        </div>
                    ) : null}
                    <CardHeader
                        action={
                            <IconButton onClick={closeHandle}>
                                <Icon>close</Icon>
                            </IconButton>
                        }
                        title={formTitle}
                        subheader=""
                    />
                    <Divider />
                    <div className={classes.content}>{children}</div>
                    <div className={classes.footer}>
                        <Button onClick={closeHandle} variant="contained" color="secondary" className={classes.button}>
                            {I18n.t("common.Cancel")}
                        </Button>
                        {saveButton && (
                            <Button
                                disabled={readOnly ? false : disabled}
                                onClick={onClickHandle}
                                variant="contained"
                                color="secondary"
                                className={classes.button}
                            >
                                {footerTitle || I18n.t("common.Save")}
                            </Button>
                        )}
                    </div>
                </Paper>
            </Slide>
        );
    }
}

Darwers.propTypes = {
    onClickHandle: PropTypes.func,
    closeHandle: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired
};

Darwers.defaultProps = {
    width: 400,
    saveButton: true,
    isLoading: false
};

export default withStyles(styles)(Darwers);
