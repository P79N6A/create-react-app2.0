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
// import Card, {CardContent, CardMedia} from '@material-ui/core/Card';
import { CardFoot } from "modules/basicCardComps";
import { CardHeader as Header } from "modules/basicCardComps";
import "../styles/cardWithTitleAction.less";
import Paper from "@material-ui/core/Paper";
import classnames from "classnames";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
    paper: {
        background: theme.palette.background.paper
    }
});

export class CardWithTitleAction extends Component {
    static defaultProps = {
        icons: [],
        title: "",
        subtitle: "",
        avatar: "",
        border: false,
        menuOptions: []
    };
    static propTypes = {
        icons: PropTypes.arrayOf(
            PropTypes.shape({ name: PropTypes.string.isRequired, label: PropTypes.string.isRequired })
        ),
        buttons: PropTypes.arrayOf(
            PropTypes.shape({ name: PropTypes.string, variant: PropTypes.string, color: PropTypes.string })
        ),
        avatar: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
        title: PropTypes.string.isRequired,
        subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
        handleMenuClick: PropTypes.func,
        expandContent: PropTypes.oneOfType([
            PropTypes.element,
            PropTypes.arrayOf(
                PropTypes.shape({
                    label: PropTypes.string,
                    icon: PropTypes.element,
                    content: PropTypes.element.isRequired
                })
            )
        ]),
        border: PropTypes.bool,
        menuOptions: PropTypes.array
    };

    render() {
        let { avatar, title, subtitle, icons, buttons, expandContent, border, menuOptions,classes } = this.props;
        return (
            <div className="basicCardComps-container">
                <Paper
                    classes={{root:classes.paper}}
                    className={classnames(this.props.className, "cardWitchTitleAction-paper")}
                >
                    <Header
                        avatar={avatar}
                        title={title}
                        subtitle={subtitle}
                        options={menuOptions}
                        borderBottom={border}
                        handleMenuClick={this.props.handleMenuClick}
                    />
                    <div className="cardWitchTitleAction-content showScrollbar">{this.props.children}</div>
                    {((icons && icons.length) || (buttons && buttons.length) || expandContent) && (
                        <CardFoot
                            icons={icons}
                            btns={buttons}
                            expand={expandContent ? true : false}
                            borderTop={border}
                            iconClickParentHandle={this.props.iconClickParentHandle}
                            handleExpandClick={this.props.handleExpandClick}
                        >
                            {expandContent}
                        </CardFoot>
                    )}
                </Paper>
            </div>
        );
    }
}

export default withStyles(styles)(CardWithTitleAction);
