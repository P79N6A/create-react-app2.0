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
// import { MuiThemeProvider } from "@material-ui/core/styles";
// import theme from "commons/components/theme";
// import { theme } from "modules/theme";
import Paper from "@material-ui/core/Paper";
import { CardFoot } from "modules/basicCardComps/";
import Card, { CardContent } from "@material-ui/core/Card";
import Collapse from "@material-ui/core/Collapse";
import { CardTab } from "modules/basicCardComps";
import "../styles/cardWithAction.less";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
    cardContent: {
        background: theme.palette.background.paper
    }
});

export class CardWithAction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false
        };
        this.handleExpandClick = this.handleExpandClick.bind(this);
    }
    static propTypes = {
        icons: PropTypes.arrayOf(
            PropTypes.shape({ name: PropTypes.string.isRequired, label: PropTypes.string.isRequired })
        ),
        buttons: PropTypes.arrayOf(
            PropTypes.shape({ name: PropTypes.string, variant: PropTypes.string, color: PropTypes.string })
        ),
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
        iconClickParentHandle: PropTypes.func,
        left: PropTypes.element,
        border: PropTypes.bool
    };
    handleExpandClick(state) {
        this.setState({ expanded: state });
    }

    render() {
        const { icons, buttons, expandContent, border, classes } = this.props;
        return (
            <Paper className="cardWithAction">
                <div className="cardWithAction-content">
                    {this.props.left && <div className="cardWithAction-left">{this.props.left}</div>}
                    <Card
                        className="cardWithAction-right"
                        style={{
                            width: this.props.left ? "60%" : "100%"
                        }}
                    >
                        <CardContent>{this.props.children}</CardContent>
                        <CardFoot
                            icons={icons}
                            btns={buttons}
                            expandBtn={expandContent ? true : false}
                            borderTop={border ? border : false}
                            iconClickParentHandle={this.props.iconClickParentHandle}
                            handleExpandClick={this.handleExpandClick}
                        />
                    </Card>
                </div>
                <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                    {expandContent instanceof Array ? (
                        <CardTab items={expandContent} />
                    ) : (
                        <CardContent classes={{ root: classes.cardContent }}>{expandContent}</CardContent>
                    )}
                </Collapse>
            </Paper>
        );
    }
}

export default withStyles(styles)(CardWithAction);
