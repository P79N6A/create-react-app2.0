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
 * Created by KaiDi on 08/10/2018.
 */

import _ from "lodash";
import PropTypes from "prop-types";
import { I18n } from "react-i18nify";
import React, { Component } from "react";
import { Select, InputLabel } from "modules/common";
import { FormControl, Switch, FormControlLabel, MenuItem } from "@material-ui/core";

const refreshOptions = [
        {
            label: "thirtySecOpt",
            value: 30000
        },
        {
            label: "sixtySecOpt",
            value: 60000
        },
        {
            label: "ninetySecOpt",
            value: 90000
        }
    ],
    langPath = "chart.editView.autoRefresh.";

class AutoRefresh extends React.Component {
    static propTypes = {
        isLoading: PropTypes.bool,
        autoRefreshTime: PropTypes.number,
        identify: PropTypes.string.isRequired,
        onChangeProperty: PropTypes.func.isRequired
    };
    state = { checked: false };
    componentWillReceiveProps(nextProps) {
        const { autoRefreshTime } = nextProps,
            checked = autoRefreshTime ? true : false;
        this.state.checked !== checked && this.handleSwitch();
    }
    handleSwitch = () => {
        const { checked } = this.state,
            { onChangeProperty, identify } = this.props;
        this.setState({ checked: !checked }, () => {
            onChangeProperty(identify, { autoRefreshTime: this.state.checked ? 90000 : undefined });
        });
    };
    onChange = value => {
        const { onChangeProperty, identify } = this.props;
        onChangeProperty(identify, { autoRefreshTime: value });
    };
    render() {
        const { isLoading, autoRefreshTime } = this.props,
            { checked } = this.state;
        return (
            <React.Fragment>
                <FormControlLabel
                    className="chart-plugin-switch"
                    control={
                        <Switch checked={checked} disabled={isLoading} onChange={this.handleSwitch} value="checked" />
                    }
                    label={I18n.t(langPath + "switchTitle")}
                />
                {checked && <TimeSelection isLoading={isLoading} value={autoRefreshTime} onChange={this.onChange} />}
            </React.Fragment>
        );
    }
}

class TimeSelection extends Component {
    static propTypes = {};

    render() {
        const { isLoading, value } = this.props;
        return (
            <FormControl disabled={isLoading} style={{ width: "100%" }}>
                <InputLabel htmlFor="refresh-helper">Auto Refresh Duration</InputLabel>
                <Select
                    value={value || ""}
                    onChange={event => {
                        event.nativeEvent.stopImmediatePropagation();
                        this.props.onChange(event.target.value);
                    }}
                    inputProps={{
                        name: "refresh",
                        id: "refresh-helper"
                    }}
                >
                    {_.map(refreshOptions, item => {
                        return (
                            <MenuItem key={item.value} value={item.value}>
                                {I18n.t(langPath + item.label)}
                            </MenuItem>
                        );
                    })}
                </Select>
            </FormControl>
        );
    }
}
export default AutoRefresh;
