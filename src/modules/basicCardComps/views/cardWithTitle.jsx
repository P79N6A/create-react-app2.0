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
 * Created by KaiDi on 25/04/2018.
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { CardHeader as Header } from "modules/basicCardComps";
// import { MuiThemeProvider } from "@material-ui/core/styles";
// import theme from "commons/components/theme";
// import { theme } from "modules/theme";
import Paper from "@material-ui/core/Paper";
import classnames from "classnames";
import "../styles/cardWithTitle.less";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
    cardheader: {
        background: theme.palette.background.paper
    }
});

export class CardWithTitle extends Component {
    static defaultProps = {
        title: "",
        subtitle: "",
        padding: 0,
        avatar: "",
        border: false,
        menuOptions: [],
        icons: [],
        noHeader: false
    };
    static propTypes = {
        title: PropTypes.string.isRequired,
        subtitle: PropTypes.string.isRequired,
        padding: PropTypes.number,
        handleCloseClick: PropTypes.func,
        handleMenuClick: PropTypes.func,
        handleFilterClick: PropTypes.func,
        style: PropTypes.object,
        border: PropTypes.bool,
        menuOptions: PropTypes.array,
        icons: PropTypes.arrayOf(PropTypes.element),
        noHeader: PropTypes.bool
    };

    render() {
        let {
            title,
            subtitle,
            avatar,
            padding,
            style,
            border,
            menuOptions,
            icons,
            className,
            headProps,
            noHeader,
            classes
        } = this.props;
        return (
            <div
                style={Object.assign(
                    {},
                    {
                        padding: padding
                    },
                    style
                )}
                className={classnames(className, "cardWithTitle")}
            >
                <Paper className="cardWithTitle-paper" elevation={5}>
                    {(title || icons.length) && !noHeader ? (
                        <Header
                            avatar={avatar}
                            title={title}
                            subtitle={subtitle}
                            icons={icons}
                            borderBottom={border}
                            menuOptions={menuOptions}
                            handleCloseClick={this.props.handleCloseClick}
                            handleMenuClick={this.props.handleMenuClick}
                            // handleFilterClick={this.props.handleFilterClick}
                            expandContent={this.props.expandContent}
                            classes={{ card: classes.cardheader }}
                            {...headProps}
                        />
                    ) : null}
                    <div
                        className={classnames("cardWithTitle-content", "showScrollbar", classes.cardheader)}
                        style={{
                            height: (title || icons.length) && !noHeader ? "calc(100% - 72px)" : "100%"
                        }}
                    >
                        {this.props.children}
                    </div>
                </Paper>
            </div>
        );
    }
}

export default withStyles(styles)(CardWithTitle);
