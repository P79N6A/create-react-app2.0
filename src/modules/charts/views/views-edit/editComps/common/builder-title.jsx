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

import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import { I18n } from "react-i18nify";
import { TextField } from "modules/common";

const langPath = "chart.editView.title.";
let timer;
class Title extends React.Component {
    state = { title: "" };
    componentWillMount() {
        this.setState({ title: this.props.title });
    }
    componentWillReceiveProps(nextProps) {
        const { title } = nextProps;
        if (_.isEqual(title, this.props.title)) {
            return;
        }
        this.setState({ title });
    }
    onChangeProperty = value => {
        const { identify, onChangeProperty } = this.props;
        clearTimeout(timer);
        timer = setTimeout(() => {
            onChangeProperty(identify, { title: value });
        }, 500);
    };
    onChange = value => {
        this.setState({ title: value }, () => {
            this.onChangeProperty(value);
        });
    };
    render() {
        const { isLoading } = this.props,
            { title } = this.state;
        return (
            <TextField
                disabled={isLoading}
                label={I18n.t(langPath + "inputTitle")}
                InputLabelProps={{ shrink: true }}
                className="chart-plugin"
                value={title || ""}
                style={{ display: "flex" }}
                margin="normal"
                onChange={event => {
                    event.nativeEvent.stopImmediatePropagation();
                    const value = event.target.value;
                    this.onChange(value);
                }}
            />
        );
    }
}

Title.propTypes = {
    title: PropTypes.string,
    isLoading: PropTypes.bool,
    identify: PropTypes.string.isRequired,
    onChangeProperty: PropTypes.func.isRequired
};

export default Title;
