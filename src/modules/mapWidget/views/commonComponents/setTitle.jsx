/*
* =========================================================================
*  Copyright (C)2018 NCS Pte. Ltd. All Rights Reserved
*
*  This software is confidentifyential and proprietary to NCS Pte. Ltd. You shall
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
 * Created by Deng Xiaolong on 28/05/2018.
 */

import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { changeTitle } from "./../../funcs/actions";
import { TextField } from "modules/common";
let timer = null;

class PanelSetTitle extends Component {
    static defaultProps = {
        onChange: () => {},
    };
    static propTypes = {
        panelTitle: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
    };
    state = {
        setValue: ""
    };
    componentWillMount() {
        this.setState({
            setValue: this.props.panelTitle
        });
    }
    // clear input value
    emitEmpty = () => {
        const { dispatch, identify, panelTitle } = this.props;
        this.setState({
            setValue: ""
        });
        dispatch(changeTitle(panelTitle, identify));
    };
    handleChange = (e) => {
        const { value } = e.target;
        const { dispatch, identify } = this.props;
        // panelTitle
        this.setState({
            setValue: value,
        });
        if (timer && value.trim().length) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            this.props.onChange(value);
            if (!value.trim().length) {
                dispatch(changeTitle(" ", identify));
            } else {
                dispatch(changeTitle(value, identify));
            }
        }, 400);
    };
    render() {
        const { setValue } = this.state;
        return (
            <div className="panel_title_set">
                <TextField
                    label="Title"
                    style={{width: "100%"}}
                    onChange={this.handleChange}
                    defaultValue={setValue.trim()}
                />
            </div>
        );
    }
}

export default connect()(PanelSetTitle);