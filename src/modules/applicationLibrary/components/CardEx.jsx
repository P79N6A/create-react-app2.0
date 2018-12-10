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
 * Created by LWP on 18/10/2018.
 */

import React from "react";
import PropsTypes from "prop-types";
import {
    Card,
    CardMedia,
    CardActions,
    CardContent,
    Typography,
    Button,
    IconButton,
    Icon,
    MenuItem,
    Menu,
    Divider
} from "@material-ui/core";
import LOGO from "modules/img/images/surf-logo-400.png";
import { withStyles } from "@material-ui/core/styles";
import token from "commons/utils/tokenHelper";
import encode16Bit from "commons/utils/encode16bit";
import { getFile } from "api/security";
import _ from "lodash";

const styles = Theme => {
    return {
        cardActionRoot: {
            justifyContent: "space-between",
            padding: "8px 4px"
        },
        actionMediaRoot: {
            height: 188,
            background: Theme.palette.primary.dark,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center"
        },
        cardHover: {
            // border: `2px solid ${Theme.palette.secondary.main}`,
            transform: "scale(1.03, 1.03)",
            boxShadow: `0 0 0 2px ${Theme.palette.secondary.main}`,
            transition: "transform 500ms cubic-bezier(0.4, 0, 0.2, 1) 0ms"
            // margin: 8,
            // width: "calc(20% - 16px)"
        },
        cardRoot: {
            transform: "scale(1,1)",
            transition: "transform 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms"
            // margin: 8,
            // width: "calc(20% - 16px)"
        }
    };
};

const propTypes = {
    title: PropsTypes.string,
    subTitle: PropsTypes.string,
    id: PropsTypes.string,
    actions: PropsTypes.array,
    state: PropsTypes.number,
    media: PropsTypes.string,
    classes: PropsTypes.object,
    subTitle2: PropsTypes.string,
    disabled: PropsTypes.bool
};

const defaultProps = {
    title: "",
    subTitle: "",
    subTitle2: "",
    id: "",
    actions: [],
    state: 1,
    media: "",
    disabled: false
};

/**
 *
 * @param (title: string): title
 * @param (subTitle: string): subtitle
 * @param (id: string): card id
 * @param (actions: string): actions apply to cardAction
 * @param (state: string): card state (control button display)
 * @param (media: string): meida handler (images|mediaId)
 * @param (onActions: string): action handler
 *
 */

class CardEx extends React.Component {
    state = {
        anchor: null,
        imgUrl: "",
        horving: false
    };
    handleMenuClick = (type, event) => {
        switch (type) {
            case "more":
                this.setState({
                    anchor: event.currentTarget
                });
                break;
            case "close":
                this.setState({
                    anchor: null
                });
                break;
            default:
                break;
        }
    };
    componentWillMount = () => {
        this.unmonut = false;
    };
    componentDidMount = async () => {
        const { media } = this.props;
        if (!media) return;
        // const url = media + encode16Bit.ascii2hex(token.get());
        // const file = await getFile(url);
        const urlCreator = window.URL || window.webkitURL,
            url = media + encode16Bit.ascii2hex(token.get()),
            file = await getFile(url),
            imageUrl = file && file[0] ? urlCreator.createObjectURL(file[0]) : undefined;
        if (this.unmonut) return;
        this.setState({
            imgUrl: imageUrl
        });
    };
    shouldComponentUpdate = (nextProps, nextState) => {
        // console.count();
        const { props, state } = this;
        if (_.isEqual(nextProps, props) && _.isEqual(nextState, state)) return false;
        return true;
    };
    componentWillUnmount = () => {
        this.unmonut = true;
    };
    handleMouseEvent = (event, flag) => {
        event.stopPropagation();
        event.preventDefault();
        this.setState({
            horving: flag
        });
    };
    render = () => {
        const { anchor, imgUrl, horving } = this.state;
        const {
            id,
            app,
            state,
            title,
            classes,
            actions,
            priority,
            disabled,
            subTitle,
            onActions,
            subTitle2
        } = this.props;
        return (
            <Card
                onMouseOver={event => this.handleMouseEvent(event, true)}
                onMouseLeave={event => this.handleMouseEvent(event, false)}
                classes={{
                    root: horving ? classes.cardHover : classes.cardRoot
                }}
            >
                <CardMedia
                    classes={{
                        root: classes.actionMediaRoot
                    }}
                    image={imgUrl || LOGO}
                />
                <CardContent>
                    <Typography noWrap variant="h5" title={title} style={{ height: 32 }}>
                        {title}
                    </Typography>
                    <Divider
                        style={{
                            height: 8,
                            background: "transparent"
                        }}
                    />
                    <Typography
                        noWrap
                        variany="subtitle2"
                        style={{
                            height: 24
                        }}
                        title={subTitle2}
                    >
                        {subTitle2}
                    </Typography>
                    <Divider
                        style={{
                            height: 16,
                            background: "transparent"
                        }}
                    />
                    <Typography
                        noWrap
                        variany="h6"
                        style={{
                            height: 24
                        }}
                        title={subTitle}
                    >
                        {subTitle}
                    </Typography>
                </CardContent>
                <CardActions
                    classes={{
                        root: classes.cardActionRoot
                    }}
                >
                    <Button
                        size="large"
                        color="secondary"
                        onClick={() =>
                            onActions(actions[0].id, {
                                id,
                                app,
                                title,
                                trigger: actions[0].trigger,
                            })
                        }
                    >
                        {(actions[0] && actions[0].text) || ""}
                    </Button>
                    <CardActions>
                        {actions &&
                            actions.reduce((sumArr, curr, i, arr) => {
                                return (i !== 0 && curr.state === state) ||
                                    (i !== 0 && Array.isArray(curr.state) && curr.state.includes(state))
                                    ? sumArr.concat([
                                        <React.Fragment key={i}>
                                            <IconButton
                                                disabled={disabled}
                                                title={curr.tooltip}
                                                onClick={event => {
                                                    onActions(curr.id, { event, cardId: id, ...curr, priority });
                                                    this.handleMenuClick(curr.id, event);
                                                }}
                                            >
                                                <Icon
                                                    color={i === 1 && priority === "high" ? "secondary" : "inherit"}
                                                >
                                                    {curr.icon}
                                                </Icon>
                                            </IconButton>
                                            {curr && curr.menus && Array.isArray(curr.menus) && (
                                                <Menu
                                                    anchorEl={anchor}
                                                    PaperProps={{
                                                        style: {
                                                            minWidth: 150
                                                        }
                                                    }}
                                                    open={Boolean(anchor)}
                                                    onClose={() => {
                                                        this.handleMenuClick("close");
                                                    }}
                                                >
                                                    {curr.menus.map(item => {
                                                        return (
                                                            <MenuItem
                                                                onClick={() => {
                                                                    onActions(item.id, {
                                                                        cardId: id,
                                                                        title,
                                                                        ...item
                                                                    });
                                                                    this.handleMenuClick("close");
                                                                }}
                                                                key={item.id}
                                                            >
                                                                {item.tooltip}
                                                            </MenuItem>
                                                        );
                                                    })}
                                                </Menu>
                                            )}
                                        </React.Fragment>
                                    ])
                                    : sumArr.concat([null]);
                            }, [])}
                    </CardActions>
                </CardActions>
            </Card>
        );
    };
}

CardEx.defaultProps = defaultProps;
CardEx.propTypes = propTypes;

export default withStyles(styles)(CardEx);
