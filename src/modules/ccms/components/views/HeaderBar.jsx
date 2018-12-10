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
 * Created by @luojia on 25/05/18.
 */
import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import Menu, { MenuItem } from "@material-ui/core/Menu";
import classnames from "classnames";
import { theme } from "modules/theme";

const styles = Theme => ({
    root: {
        flex: 1
    },
    flex: {
        flex: 1
        // overflow: "hidden",
        // whiteSpace: "nowrap",
        // textOverflow: "ellipsis"
    },
    padding: {
        // padding: "10px"
    },
    resetMinHeight: {
        // minHeight: "auto"
    },
    fontColor: {
        color: theme.palette.primary.contrastText
    },
    resetMargin: {
        // margin: "0px!important"
    },
    boxPadding: {
        // padding: theme.spacing.unit + "px " + theme.spacing.unit * 2 + "px"
    },
    borderBottom: {
        // borderBottom: "1px solid " + theme.palette.primary.contrastText
    },
    subtitle: {
        // fontSize: "12px",
        // color: "#ccc",
        // padding: "0px 16px",
        // position: "relative",
        // bottom: "6px"
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
            <div key={i}>
                <IconButton
                    className={classnames(classes.fontColor, classes.resetMargin)}
                    key={i}
                    size="small"
                    // key={i}
                    style={{ height: "32px", width: "32px", margin: "0 8px" }}
                >
                    <Icon
                        style={{ fontSize: fontSize ? fontSize : "auto" }}
                        onClick={item.func ? item.func : this.getBtnClick}
                    >
                        {item.name}
                    </Icon>
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
            </div>
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
        const { classes, dark, border, background, boxShadow, subTitle, padding } = this.props;
        return (
            <div className={classnames(classes.root, "HeadBar-drag")}>
                <AppBar
                    position="static"
                    style={{
                        boxShadow: boxShadow ? "auto" : "none",
                        background: dark
                            ? theme.palette.background.paper
                            : background
                                ? background
                                : theme.palette.primary.main,
                        padding: padding ? padding : ""
                    }}
                    className={border ? classes.borderBottom : ""}
                >
                    <Toolbar className={classnames(classes.boxPadding, classes.resetMinHeight)}>
                        <div variant="title" color="inherit" className={classes.flex}>
                            {this.props.title}
                        </div>
                        {this.getActionBtn()}
                    </Toolbar>
                    {subTitle ? (
                        <div variant="title" color="inherit" className={classes.subtitle}>
                            {subTitle}
                        </div>
                    ) : null}
                </AppBar>
            </div>
        );
    }
}

HeaderBar.propTypes = {
    classes: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired
};

export default withStyles(styles)(HeaderBar);
