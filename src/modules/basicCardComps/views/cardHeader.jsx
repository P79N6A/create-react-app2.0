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
 * Created by KaiDi on 25/05/2018.
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
// import theme from "commons/components/theme";
// import { theme } from "modules/theme";
// import Menu, {MenuItem} from '@material-ui/core/Menu';
import Avatar from "@material-ui/core/Avatar";
import { Paper, Collapse, Icon, IconButton, Typography } from "@material-ui/core";
import { CardHeader } from "modules/common";
import { Menus } from "modules/basicCardComps";
// import {FilterCard} from "comps/cards";
import classnames from "classnames";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
    // boxPadding: {
    //     padding: theme.cardHeader.paddingTB + " " + theme.cardHeader.paddingLR
    // },
    borderBottom: {
        borderBottom: "1px solid " + theme.palette.primary.main
    },
    // titleButton: {
    //     width: theme.cardHeader.btnWidth,
    //     height: theme.cardHeader.btnHeight
    // },
    inlineflex: {
        display: "inline-flex"
    },
    card: {
        background: theme.palette.background.paper
    }
});

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPaper: false,
            anchorEl: null
        };
        this.getActionBtn = this.getActionBtn.bind(this);
        this.handleFltClk = this.handleFltClk.bind(this);
        this.handleMenuClick = this.handleMenuClick.bind(this);
        this.handleIconClick = this.handleIconClick.bind(this);
    }
    getActionBtn() {
        let { classes } = this.props;
        let that = this;
        let { handleCloseClick, icons } = this.props;
        let handleFltClk = this.handleFltClk;
        let handleMenuClick = this.handleMenuClick;
        let mapping = [
            {
                func: handleMenuClick,
                name: "more_vert",
                status: this.props.handleMenuClick ? true : false
            },
            {
                func: handleCloseClick,
                name: "clear",
                status: true
            },
            {
                func: handleFltClk,
                name: "filter_none",
                status: that.props.expandContent
            }
        ];
        icons = icons || [];
        let iconList = icons.map((element, i) => (
            <div key={i} className={classnames(classes.inlineflex)}>
                {element}
            </div>
        ));
        return iconList.concat(
            mapping.map(
                (item, i) =>
                    item.func &&
                    item.status && (
                        <div
                            key={icons && icons.length ? icons.length + i : i}
                            className={classnames(classes.inlineflex)}
                        >
                            <IconButton
                                size="small"
                                // className={classnames(classes.titleButton)}
                            >
                                <Icon onClick={item.func}>{item.name}</Icon>
                            </IconButton>
                            {item.name === "more_vert" ? (
                                <Menus
                                    anchorEl={this.state.anchorEl}
                                    handleClick={this.handleIconClick}
                                    options={this.props.menuOptions}
                                />
                            ) : null}
                        </div>
                    )
            )
        );
    }

    handleFltClk() {
        this.setState({
            showPaper: !this.state.showPaper
        });
        // this.props.handleFilterClick&&this.props.handleFilterClick();
    }
    handleMenuClick(event) {
        this.setState({ anchorEl: event.currentTarget });
    }
    handleIconClick(item) {
        this.props.handleMenuClick && this.props.handleMenuClick(item);
    }

    // getAvatar(){     if(!this.props.avatar){         return;     }     if(typeof
    // this.props.avatar === "string"){         return (             <Avatar
    // aria-label="Recipe">               {this.props.avatar}             </Avatar>
    //         )     }else {         return this.props.avatar;     } }

    render() {
        let { classes, expandContent } = this.props;
        return (
            <div>
                <CardHeader
                    style={this.props.style}
                    className={classnames({
                        [classes.borderBottom]: this.props.borderBottom
                    })}
                    avatar={this.props.avatar && <Avatar aria-label="Recipe">{this.props.avatar}</Avatar>}
                    action={this.getActionBtn()}
                    title={this.props.title && <Typography variant="h6">{this.props.title}</Typography>}
                    subheader={this.props.subtitle && <Typography>{this.props.subtitle}</Typography>}
                />
                <Collapse in={this.state.showPaper}>
                    <Paper classes={{ root: classes.card }}>{expandContent}</Paper>
                </Collapse>
            </div>
        );
    }
}
Header.propTypes = {
    avatar: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    handleMenuClick: PropTypes.func,
    handleCloseClick: PropTypes.func,
    style: PropTypes.object,
    menuOptions: PropTypes.array,
    filter: PropTypes.bool,
    icons: PropTypes.arrayOf(PropTypes.element)
};
Header.defautProps = {
    filter: false,
    borderBottom: true
};

export default withStyles(styles)(Header);
