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
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import classnames from "classnames";
import Collapse from "@material-ui/core/Collapse";
import { CardTab } from "modules/basicCardComps";
import Button from "@material-ui/core/Button";
import "../styles/cardFoot.less";

const styles = theme => ({
    expand: {
        transform: "rotate(0deg)",
        transition: theme.transitions.create("transform", { duration: theme.transitions.duration.shortest })

        // marginLeft: 'auto',
    },
    expandOpen: {
        transform: "rotate(180deg)"
    },
    action: {
        justifyContent: "flex-end"
        // padding: '6px 12px'
    },
    sButton: {
        // width: '36px',
        // height: '36px'
    },
    borderTop: {
        borderTop: "1px solid " + theme.palette.primary.main
    },
    cardContent: {
        backgroundColor: theme.palette.background.paper
    }
});

export class CardFoot extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false
        };
        this.handleExpandClick = this.handleExpandClick.bind(this);
    }
    handleExpandClick() {
        this.setState({
            expanded: !this.state.expanded
        });
        this.props.handleExpandClick && this.props.handleExpandClick(this.state.expanded);
    }

    iconClick(icon) {
        this.props.iconClickParentHandle && this.props.iconClickParentHandle(icon);
    }
    render() {
        let { classes } = this.props;
        return (
            <div
                className={classnames("basicCardComps-foot", {
                    [classes.borderTop]: this.props.borderTop
                })}
            >
                <CardActions disableActionSpacing className={classnames(classes.action, "basicCardComps-foot-action")}>
                    {this.props.icons &&
                        this.props.icons.map((icon, i) => (
                            <IconButton
                                key={i}
                                aria-label={icon.label}
                                className={classes.sButton}
                                onClick={this.iconClick.bind(this, icon)}
                            >
                                <Icon>{icon.name}</Icon>
                            </IconButton>
                        ))}
                    {this.props.btns &&
                        this.props.btns.map((btn, i) => (
                            <Button
                                key={i}
                                variant={btn.variant ? btn.variant : "raised"}
                                color={btn.color ? btn.color : "primary"}
                                onClick={this.iconClick.bind(this, btn)}
                            >
                                {btn.name}
                            </Button>
                        ))}
                    {(this.props.expand || this.props.expandBtn) && (
                        <IconButton
                            ref="expandicon"
                            className={classnames(classes.expand, classes.sButton, {
                                [classes.expandOpen]: this.state.expanded
                            })}
                            onClick={this.handleExpandClick}
                            aria-expanded={this.state.expanded}
                            aria-label="Show more"
                        >
                            <Icon className="arrow_down">keyboard_arrow_down</Icon>
                        </IconButton>
                    )}
                </CardActions>
                {this.props.expand && (
                    <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                        {/* <CardContent style={{background:theme.palette.secondary.dark}}>
                {this.props.children}
            </CardContent> */}
                        {this.props.children instanceof Array ? (
                            <CardTab items={this.props.children} />
                        ) : (
                            <CardContent classes={{ root: classes.cardContent }}>{this.props.children}</CardContent>
                        )}
                    </Collapse>
                )}
            </div>
        );
    }
}

CardFoot.propTypes = {
    icons: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
            handleClick: PropTypes.func
        })
    ),
    expand: PropTypes.bool.isRequired,
    classes: PropTypes.object.isRequired,
    handleExpandClick: PropTypes.func
};
CardFoot.defaultProps = {
    expand: false
};

export default withStyles(styles)(CardFoot);
