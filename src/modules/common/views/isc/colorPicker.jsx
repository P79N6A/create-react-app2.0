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
// import { TextField } from "modules/common";
import { Button, Collapse, ClickAwayListener } from "@material-ui/core";
import MaterialColorPicker from "react-material-color-picker";
import { withStyles } from "@material-ui/core/styles";
import ReactDOM from "react-dom";

const colorPickerWidth = 400;
const colorPickerHeight = 168;

const styles = Theme => ({
    root: {
        minWidth: "20px",
        minHeight: "20px"
    }
});

const Content = props => {
    return null;
};

class ColorPicker extends Component {
    state = {
        open: false,
        top: 0,
        left: 0
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
            open: true,
            top,
            left
        });
    };
    onClose = () => {
        this.setState({
            open: false
        });
    };
    onSubmit = e => {
        this.props.onSelect(e.target.value);
        this.onClose();
    };
    onChange = e => {
        const { value } = e.target;
        this.props.onSelect(value);
    };
    render() {
        let { initColor, classes } = this.props;
        let { open, top, left } = this.state;
        return (
            <div
                style={{
                    display: "inline-flex",
                    alignItems: "center"
                }}
            >
                <Button
                    ref="colorPickerBtn"
                    style={{
                        margin: "0 10px",
                        backgroundColor: initColor
                    }}
                    onClick={this.handleOpen}
                    variant="contained"
                    classes={{
                        root: classes.root
                    }}
                >
                    <Content />
                </Button>
                <Color container={document.body} open={open} top={top} left={left} onClose={this.onClose} onSubmit={this.onSubmit} onChange={this.onChange} {...this.props} />
            </div>
        );
    }
}

const Color = props => {
    const { onClose, onSubmit, onChange, open, top, left, initColor, container } = props;
    return ReactDOM.createPortal(
        <ClickAwayListener onClickAway={onClose}>
            <Collapse in={open} style={{ position: "fixed", zIndex: 1201, top, left }}>
                <MaterialColorPicker
                    initColor={initColor}
                    onSubmit={onSubmit}
                    onReset={onChange}
                    style={{ width: colorPickerWidth, backgroundColor: "#c7c7c7" }}
                    submitLabel="Submit"
                    resetLabel="Reset"
                />
            </Collapse>
        </ClickAwayListener>,
        container
    );
};

ColorPicker.propTypes = {
    initColor: PropTypes.string,
    classes: PropTypes.object,
    onSelect: PropTypes.func
};

export default withStyles(styles)(ColorPicker);
