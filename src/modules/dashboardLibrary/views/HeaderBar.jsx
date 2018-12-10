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
 * @module HeaderBar
 * @author LUOJIA
 * @exports {
 *  HeaderBar
 * }
 */
import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, IconButton, Icon, Menu, MenuItem } from "@material-ui/core";
import classnames from "classnames";
// import { theme } from "modules/theme";

const styles = Theme => ({
    root: {
        flexGrow: 1
    },
    flex: {
        flex: 1,
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis"
    },
    padding: {
        padding: "10px"
    },
    resetMinHeight: {
        minHeight: "auto"
    },
    fontColor: {
        color: Theme.palette.primary.contrastText
    },
    resetMargin: {
        margin: "0px!important"
    },
    boxPadding: {
        padding: Theme.spacing.unit * 3 + "px " + Theme.spacing.unit * 2 + "px 0px"
    },
    borderBottom: {
        borderBottom: "1px solid " + Theme.palette.primary.contrastText
    },
    subtitle: {
        fontSize: "12px",
        color: "#ccc",
        position: "relative",
        bottom: "6px",
        margin: "0px"
    },
    appbar_root: {
        background: Theme.palette.background.paper
    }
});
class HeaderBar extends React.Component {
    static defaultProps = {
        options: ["Null"],
        icons: [],
        getBtnClick: () => {},
        fontSize: "",
        boxShadow: false,
        subTitle: "",
        padding: "",
        className: ""
    };

    state = {
        anchorEl: null
    };

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    getBtnClick = event => {
        this.setState({ anchorEl: event.currentTarget }, () => {
            this.props.getBtnClick(this.state.anchorEl);
        });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    getActionBtn() {
        let { classes, icons, fontSize } = this.props;
        let { anchorEl } = this.state;
        const btnAction = icons.map((item, i) => (
            <Typography key={i}>
                <IconButton
                    className={classnames(classes.fontColor, classes.resetMargin)}
                    key={i}
                    size="small"
                    style={{ height: "32px", width: "32px", margin: "0 8px" }}
                    onClick={item.func ? item.func : this.getBtnClick}
                >
                    <Icon style={{ fontSize: fontSize ? fontSize : "auto" }}>{item.name}</Icon>
                </IconButton>
                {item.options && item.options.length > 0 ? (
                    <Menu
                        id="long-menu"
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={this.handleClose}
                        PaperProps={{
                            style: {
                                maxHeight: "atuo",
                                width: 200
                            }
                        }}
                    >
                        {item.options.map((el, index) => (
                            <MenuItem key={index} onClick={el.func}>
                                {el.action}
                            </MenuItem>
                        ))}
                    </Menu>
                ) : null}
            </Typography>
        ));
        return btnAction;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.closeList) {
            this.setState({
                anchorEl: null
            });
        } else if (nextProps.anchorEl) {
            this.setState({
                anchorEl: nextProps.anchorEl
            });
        }
    }

    render() {
        const { classes, border, boxShadow, subTitle, padding } = this.props;
        return (
            <Typography className={classnames(classes.root, "HeadBar-drag")}>
                <AppBar
                    position="static"
                    classes={{
                        root: classes.appbar_root
                    }}
                    style={{
                        boxShadow: boxShadow ? "none" : "auto",
                        // background: theme.palette.background.paper,
                        padding: padding ? padding : ""
                    }}
                    className={border ? classes.borderBottom : ""}
                >
                    <Toolbar className={classnames(classes.boxPadding, classes.resetMinHeight)}>
                        <Typography variant="h6" color="inherit" className={classes.flex}>
                            {this.props.title}
                            <Typography className={classes.subtitle}>{subTitle}</Typography>
                        </Typography>
                        {this.getActionBtn()}
                    </Toolbar>
                </AppBar>
            </Typography>
        );
    }
}

HeaderBar.propTypes = {
    classes: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    subTitle: PropTypes.string,
    padding: PropTypes.string,
    className: PropTypes.string,
    fontSize: PropTypes.string,
    boxShadow: PropTypes.bool,
    icons: PropTypes.array
};
export default withStyles(styles)(HeaderBar);
