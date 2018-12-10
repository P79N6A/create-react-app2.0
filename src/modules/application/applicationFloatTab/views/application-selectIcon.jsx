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
 * Created by xulu on 28/05/2018.
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import IconButton from "@material-ui/core/IconButton";
// import { changeIcon } from "./../funcs/actions";
import { Input } from "modules/common";
import Typography from "@material-ui/core/Typography";
import _ from "lodash";
import { allIconPath } from "modules/topologyManagement/topologyMgmtFloatTab/funcs/iconsNew";

let timer = null;

const styles = theme => {
    return {
        search_input: {
            width: "100%",
            backgroundColor: theme.palette.grey.A700
        },
        close_icon: {
            cursor: "pointer"
        }
    };
};

class PanelSelectIcon extends Component {
    static defaultProps = {
        title: "Select Icon",
        onSelect: () => {},
        iconType: "",
        iconColor: ""
    };
    static propTypes = {
        title: PropTypes.string,
        onSelect: PropTypes.func,
        iconType: PropTypes.string,
        iconColor: PropTypes.string
    };
    state = {
        choosedIcon: "",
        visible: false,
        searchValue: "",
        iconsArr: allIconPath(),
        open: false,
        allIconPath: allIconPath()
    };
    // icon select
    chooseIcon = e => {
        const { choosedIcon } = this.state;
        this.setState({
            choosedIcon: e
        });
        if (choosedIcon !== e) {
            this.props.onSelect(e);
            // dispatch(changeIcon(e, identify));
        }
        this.props.onChange &&
            this.props.onChange(e);
    };
    handleVisibleChange = visible => {
        this.setState({ visible });
    };
    // input value change
    inputChange = e => {
        const { value } = e.target;
        this.setState({
            searchValue: value
        });
        if (timer) {
            clearTimeout(timer);
        }
        clearTimeout(timer);
        timer = setTimeout(() => {
            let tempArr = [];
            if (value.trim().length) {
                this.state.allIconPath.forEach(item => {
                    if (item["title"].toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) !== -1) {
                        tempArr.push(item);
                    }
                });
                this.setState({
                    iconsArr: tempArr
                });
            } else {
                this.setState({
                    iconsArr: this.state.allIconPath
                });
            }
        }, 400);
    };

    handleIcons = () => {
        if (this.props.editMode) {
            this.setState({
                open: true
            });
        }
    };

    onClose = () => {
        this.setState({
            open: false
        });
    };

    render() {
        const { title, classes, iconType } = this.props;
        const { choosedIcon, searchValue, iconsArr, open, allIconPath } = this.state;
        let currentUri = null;
        _.forEach(allIconPath, icon => {
            if (icon.title === iconType) {
                currentUri = icon;
            }
        });
        let dataList = iconsArr.length ? (
            iconsArr.map(icon => (
                <div
                    className="panel_icon_item"
                    onClick={this.chooseIcon.bind(this, icon.title)}
                    key={icon.title}
                    title={icon.title}
                >
                    {/* <Icon className={choosedIcon === icon ? "icon_item_active" : ""}>{icon}</Icon> */}
                    <img
                        className={choosedIcon === icon.title ? "icon_item_active" : ""}
                        alt={icon.alt}
                        src={icon.uri}
                        width="48"
                        height="48"
                    />
                </div>
            ))
        ) : (
            <div className="icon_not_found">Not Found</div>
        );
        return (
            <div id="panel_icons_wrap" className="panel_icons_wrap">
                <Dialog className="panel_icons_choose_wrap" transitionDuration={0} onClose={this.onClose} open={open}>
                    <div className="panel_icons_box_picker">
                        <Input
                            className={classes.search_input}
                            value={searchValue}
                            onChange={this.inputChange}
                            placeholder="search icons"
                        />
                        <div className="icons_box_content">{dataList}</div>
                    </div>
                </Dialog>
                <div className="panel_color_wrapper">
                    <Typography className="remind">{title}</Typography>
                    {currentUri ? (
                        <img
                            className={choosedIcon === "default" ? "icon_item_active" : ""}
                            alt={currentUri.alt}
                            src={currentUri.uri}
                            width="36"
                            height="36"
                            onClick={this.handleIcons}
                        />
                    ) : (
                        <IconButton onClick={this.handleIcons} variant="contained" color="primary" className="mark_icon" />
                    )}
                </div>
            </div>
        );
    }
}

export default withStyles(styles)((PanelSelectIcon));
