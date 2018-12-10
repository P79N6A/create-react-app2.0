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
import { Collapse, ClickAwayListener } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Input } from "modules/common";
import Icon from "@material-ui/core/Icon";
import ReactDOM from "react-dom";
import icons from "./../../funcs/icons";

const colorPickerWidth = 400;
const colorPickerHeight = 168;
let timer = null;

const styles = theme => ({
    root: {
        minWidth: "20px",
        minHeight: "20px"
    },
    search_input: {
        width: "100%",
        backgroundColor: theme.palette.grey.A700,
    },
    icon_wrapper: {
        backgroundColor: theme.palette.grey.A700,
    }
});


class IconPicker extends Component {
    state = {
        open: false,
        top: 0,
        left: 0,
        choosedIcon: "",
        visible: false,
        searchValue: "",
        iconsArr: icons,
    };
    handleOpen = () => {
        const btn = ReactDOM.findDOMNode(this.refs.colorPickerBtn);
        const client = btn.getBoundingClientRect();
        const right = window.innerWidth - client.left;
        const clientLeft = client.left + client.width;
        const left = right > colorPickerWidth ? clientLeft : clientLeft - colorPickerWidth;
        const bottom = window.innerHeight - client.bottom;
        const clientTop = client.top + client.height;
        const top = bottom > colorPickerHeight ? clientTop : clientTop - colorPickerHeight;
        this.setState({
            top,
            left,
            open: true
        });
    };
    onClose = () => {
        this.setState({
            open: false
        });
    };
    // input value change
    inputChange = (e) => {
        const { value } = e.target;
        this.setState({
            searchValue: value,
        });
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            let tempArr = [];
            if (value.trim().length) {
                icons.forEach(item => {
                    if(item.indexOf(value) !== -1) {
                        tempArr.push(item);
                    }
                });
                this.setState({
                    iconsArr: tempArr
                });
            } else {
                this.setState({
                    iconsArr: icons
                });
            }
        }, 400);
    };
    chooseIcon = (e) => {
        this.setState({
            choosedIcon: e,
        });
        this.onClose();
        this.props.onSelect(e);
    };
    render() {
        const { initColor, classes } = this.props;
        const { open, top, left, choosedIcon, searchValue, iconsArr } = this.state;
        const dataList = iconsArr.length ?
            iconsArr.map((icon) => (
                <div
                    className="panel_icon_item"
                    onClick={this.chooseIcon.bind(this, icon)}
                    key={icon}
                    title={icon}
                >
                    <Icon
                        className={choosedIcon === icon ? "icon_item_active" : ""}
                    >
                        {icon}
                    </Icon>
                </div>                            
            )) : (
                <div className="icon_not_found">Not Found</div>
            );
        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "center"
                }}
            >
                <div
                    ref="colorPickerBtn"
                    style={{
                        backgroundColor: initColor,
                        cursor: "pointer",
                        display: "flex",
                        justifyContent: "center"
                    }}
                    onClick={this.handleOpen}
                >
                    {this.props.children}
                </div>
                {
                    ReactDOM.createPortal(
                        <ClickAwayListener onClickAway={this.onClose}>
                            <Collapse in={open} style={{ position: "fixed", zIndex: 1201, top, left }}>
                                <div className={`panel_icons_box ${classes.icon_wrapper}`}>
                                    <Input
                                        className={classes.search_input}
                                        value={searchValue}
                                        onChange={this.inputChange}
                                        placeholder="search icons"
                                    />
                                    <div className="icons_box_content">
                                        {dataList}
                                    </div>
                                </div>
                            </Collapse>
                        </ClickAwayListener>, document.body
                    )
                }
                
            </div>
        );
    }
}

IconPicker.propTypes = {
    initColor: PropTypes.string,
    classes: PropTypes.object,
    onSelect:PropTypes.func
};

export default withStyles(styles)(IconPicker);
