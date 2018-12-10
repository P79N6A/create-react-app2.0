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
 * @operator Header
 * @module SimpleCard
 * @author LUOJIA
 * @exports {
 *  OpHeader
 * }
 */
import React from "react";
import { withRouter } from "react-router";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
    Card,
    CardActions,
    CardMedia,
    Button,
    Icon,
    IconButton,
    Menu,
    MenuItem,
    CardHeader,
    Typography,
    CardContent
} from "@material-ui/core";
// import classnames from "classnames";
// import { fomaterUrl } from "../funcs/util";
// import { theme } from "modules/theme";
import Px from "./1px.png";
import classnames from "classnames";
import { I18n } from "react-i18nify";
import { connect } from "react-redux";
import { checkUserModify, updatePriority } from "../funcs/actions";
import { REDUCER_NAME as topoReducer, DASHBOARD_BLACK_LIST } from "../funcs/constants";
import { getFile } from "api/security";
import token from "commons/utils/tokenHelper";
import encode16Bit from "commons/utils/encode16bit";
// import { initialState } from "../funcs/constants";

const styles = Theme => {
    return {
        media: {
            height: "188px",
            // paddingTop: "46%", // 16:9
            backgroundPositionY: 0,
            // backgroundPositionX: "-4px",
            opacity: "0.9",
            position: "relative",
            backgroundColor: Theme.palette.primary.main,
            backgroundSize: "103% 110%",
            cursor: "pointer"
            // backgroundSize: "103% 111%"
        },
        mediaDialog: {
            width: "100%",
            height: "100%",
            // backgroundColor: "rgba(0,0,0,0.1)",
            position: "absolute",
            top: "0px",
            left: "0px"
        },
        actions: {
            display: "flex",
            width: "100%",
            // position: "absolute",
            bottom: "0px"
        },
        actionRight: {
            marginLeft: "auto"
        },
        whiteColor: {
            color: Theme.palette.text.primary
        },
        subheader: {
            color: Theme.palette.text.primary,
            width: "100%",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis"
        },
        headerContent: {
            width: "100%"
        },
        headerTitle: {
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            width: "100%"
        },
        currTitle: {
            marginTop: "-20px"
        },
        headerRoot: {
            height: "84px"
        },
        colorTextSecondary: {
            height: "40px",
            overflow: "hidden",
            wordWrap: "break-word"
        },
        paperRoot: {
            // minHeight: "390px",
            position: "relative",
            transform: "scale(1,1)",
            transition: "transform 250ms"
        },
        paperRootHover: {
            // border: `2px solid ${Theme.palette.secondary.main}`,
            position: "relative",
            transform: "scale(1.03,1.03)",
            transition: "transform 500ms",
            boxShadow: `0 0 0 2px ${Theme.palette.secondary.main}`
        },
        content: {
            paddingTop: "0px",
            paddingBottom: "0px"
        },
        disbled_button: {
            // color: "white"
        }
    };
};

/**
 * PoppingMenu button
 * @example
 *  <PoppingMenu anchorEl={anchorEl} handleClose={this.handleClose} clickItem={this.clickItem} />
 * @param {object} anchorEl
 * @param {function} handleClose
 * @param {function} clickItem
 * @returns Component List
 */
const PoppingMenu = ({ anchorEl, pageKey, pageName, handleClose, clickItem }) => {
    return (
        <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            PaperProps={{
                style: {
                    maxHeight: "atuo",
                    width: 200
                }
            }}
        >
            <MenuItem key={1} onClick={clickItem(pageKey, pageName)}>
                {I18n.t("simpleCard.flowMoveText")}
            </MenuItem>
            <MenuItem key={2} onClick={clickItem(pageKey, pageName)}>
                {I18n.t("simpleCard.flowDuplicateText")}
            </MenuItem>
        </Menu>
    );
};

/**
 *
 * @param {{func, bool}} param0
 */
// const FavouriteIcon = ({ onIconClick, isFavourite }) => (
//     <div
//         style={{
//             flex: 1,
//             display: "flex",
//             justifyContent: "flex-end"
//         }}
//     >
//         <IconButton onClick={onIconClick}>
//             <Icon
//                 style={{
//                     color: isFavourite && theme.palette.secondary.dark
//                 }}
//             >
//                 flag
//             </Icon>
//         </IconButton>
//     </div>
// );
/**
 *
 *
 * @class FavouriteIcon
 * @extends {React.Component}
 */
class FavouriteIcon extends React.Component {
    state = {
        clickable: true
    };
    static propTypes = {};
    static defaultProps = {};
    onIconClick = () => {
        const { clickable } = this.state;
        if (clickable) {
            this.setState(
                {
                    clickable: false
                },
                () => {
                    this.props.onIconClick();
                    this.timer = setTimeout(() => {
                        this.setState({
                            clickable: true
                        });
                    }, 2000);
                }
            );
        }
    };
    componentWillUnmount = () => {
        clearInterval(this.timer);
    };
    render = () => {
        const { clickable } = this.state;
        const { isFavourite, classes } = this.props;
        return (
            <div
                style={{
                    flex: 1,
                    display: "flex",
                    justifyContent: "flex-end"
                }}
            >
                <IconButton onClick={this.onIconClick} disabled={!clickable}>
                    <Icon
                        color={!isFavourite ? "disabled" : "secondary"}
                        classes={{
                            colorDisabled: classes.disbled_button
                        }}
                    >
                        flag
                    </Icon>
                </IconButton>
            </div>
        );
    };
}

/**
 * card bottom content
 * @example
 *  <PoppingMenu anchorEl={anchorEl} handleClose={this.handleClose} clickItem={this.clickItem} />
 * @param {object} anchorEl
 * @param {function} handleClose
 * @param {function} clickItem
 * @param {function} getBtnClick
 * @param {object} classes
 * @returns Component List
 */
const CardBottom = ({
    classes,
    getBtnClick,
    dashboardItem,
    turnToDetail,
    anchorEl,
    handleClose,
    clickItem,
    onfavClick,
    isFavourite
}) => {
    let groups = dashboardItem.groups || [];
    let pageKey = dashboardItem.pageKey || "";
    let pageName = dashboardItem.name || "";
    let pageId = dashboardItem.pageId || "";
    return (
        <CardActions className={classes.actions} disableActionSpacing>
            <Button onClick={turnToDetail(pageId)} size="large" color="secondary">
                {I18n.t("simpleCard.btnText")}
            </Button>
            {!groups.includes(DASHBOARD_BLACK_LIST) && [
                <FavouriteIcon key="like" onIconClick={onfavClick} isFavourite={isFavourite} classes={classes} />,
                <IconButton
                    key="more"
                    color="primary"
                    classes={{
                        root: classes.whiteColor
                    }}
                    className={classes.actionRight}
                    onClick={getBtnClick}
                >
                    <Icon>more_vert</Icon>
                </IconButton>
            ]}
            <PoppingMenu
                anchorEl={anchorEl}
                pageKey={pageKey}
                pageName={pageName}
                handleClose={handleClose}
                classes={classes}
                clickItem={clickItem}
            />
        </CardActions>
    );
};

class SimpleCard extends React.Component {
    static defaultProps = {
        key: 0,
        title: "",
        subtitle: "subtitle",
        content: "",
        handlerClick: () => {},
        dashboardItem: {},
        isFavourite: false
    };
    state = {
        anchorEl: null,
        horving: false
    };
    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    getBtnClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    turnToDetail = pageId => () => {
        // if (pageId) {
        //     let urlobj = {
        //         page: pageId
        //     };
        //     this.props.history.replace("/ccms?" + fomaterUrl(urlobj));
        // }
        // pageId && this.props.checkUserModify(pageId);
        window.location.hash = "/ccms?page=" + pageId;
    };

    clickItem = (pagekey, pageName) => ev => {
        this.setState({
            anchorEl: null
        });
        let clickText = ev.currentTarget.innerText.replace(/(^\s*)|(\s*$)/g, "");
        this.props.handlerClick(pagekey, clickText, pageName);
    };

    handleFavClick = () => {
        let { dashboardItem, searchData } = this.props;
        let { priority } = dashboardItem;
        priority = priority === "high" ? "default" : "high";
        dashboardItem = Object.assign({
            ...dashboardItem,
            priority
        });
        this.props.updatePriority(dashboardItem, searchData);
        // this.props.updatePageConfig(dashboardItem);
    };

    componentWillMount = () => {
        this.unmount = false;
    };

    componentDidMount = async () => {
        const { dashboardItem } = this.props;
        let { thumbnail } = dashboardItem;
        if (thumbnail === "" || thumbnail.length > 200) return;
        // const url = thumbnail + encode16Bit.ascii2hex(token.get());
        // const mediaUrl = await getFile(url);
        const urlCreator = window.URL || window.webkitURL,
            url = thumbnail + encode16Bit.ascii2hex(token.get()),
            file = await getFile(url),
            imageUrl = file && file[0] ? urlCreator.createObjectURL(file[0]) : undefined;
        if (this.unmount) return;
        this.setState({
            mediaUrl: imageUrl
        });
    };

    componentWillUnmount = () => {
        this.unmount = true;
    };

    handleMouseEvent = (event, flag) => {
        event.stopPropagation();
        event.preventDefault();
        this.setState({
            horving: flag
        });
    };

    render() {
        const { classes, title, subtitle, dashboardItem } = this.props;
        let { anchorEl, isFavourite, mediaUrl, horving } = this.state;
        isFavourite = dashboardItem.priority === "high" || false;
        return (
            // <MuiThemeProvider theme={theme}>
            <Card
                classes={{ root: horving ? classes.paperRootHover : classes.paperRoot }}
                title={title}
                onMouseOver={event => this.handleMouseEvent(event, true)}
                onMouseLeave={event => this.handleMouseEvent(event, false)}
            >
                <CardMedia
                    className={classes.media}
                    image={
                        dashboardItem && dashboardItem.thumbnail && mediaUrl ? mediaUrl : Px || dashboardItem.thumbnail
                    }
                    title={title}
                    onClick={this.turnToDetail(dashboardItem.pageId)}
                >
                    <div className={classes.mediaDialog} />
                </CardMedia>
                <CardHeader
                    title={title}
                    avatar={null}
                    action={null}
                    subheader={subtitle}
                    classes={{
                        content: classes.headerContent,
                        title: classnames(classes.headerTitle, !subtitle ? classes.currTitle : ""),
                        root: classes.headerRoot,
                        subheader: classes.subheader
                    }}
                />
                <CardContent classes={{ root: classes.content }}>
                    <Typography color="textSecondary" classes={{ colorTextSecondary: classes.colorTextSecondary }}>
                        {dashboardItem.desc}
                    </Typography>
                </CardContent>
                <CardBottom
                    turnToDetail={this.turnToDetail}
                    anchorEl={anchorEl}
                    handleClose={this.handleClose}
                    clickItem={this.clickItem}
                    classes={classes}
                    dashboardItem={dashboardItem}
                    getBtnClick={this.getBtnClick}
                    isFavourite={isFavourite}
                    onfavClick={this.handleFavClick}
                />
            </Card>
            // </MuiThemeProvider>
        );
    }
}

SimpleCard.propTypes = {
    classes: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    content: PropTypes.string
};

const mapStateToProps = (state, ownedProps) => {
    return {
        searchData: state && state[topoReducer] && state[topoReducer].searchData
    };
};

const mapDispatchToProps = dispatch => {
    return {
        checkUserModify: pageKey => {
            dispatch(checkUserModify(pageKey));
        },
        updatePriority: (config, searchData) => {
            dispatch(updatePriority(config, searchData));
        }
        // getThumbnail
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(withRouter(SimpleCard)));
