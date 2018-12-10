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

import React from "react";
import PropTypes from "prop-types";
import { I18n } from "react-i18nify";
import { TextField } from "modules/common";
import NumberFormat from "react-number-format";
import { FormControl, FormHelperText } from "@material-ui/core";

const langPath = "chart.editView.gauge.";

const TextMaskCustom = props => {
    const { inputRef, ...other } = props;
    return <NumberFormat ref={inputRef} {...other} />;
};

class MinMaxValue extends React.Component {
    state = { min: null, max: null, error: false };
    timer = null;
    componentWillMount() {
        const { gauge } = this.props,
            { min, max } = gauge || {};
        this.setState({ min, max }, () => {
            this.checkInput(this.state.min, this.state.max);
        });
    }
    checkInput = (min, max) => {
        const { onChangeProperty, identify, gauge, lockSave } = this.props;
        if ((min || min === 0) && (max || max === 0) && Number(max) > Number(min)) {
            this.setState({ error: false }, () => {
                const value = { ...gauge, min, max };
                onChangeProperty(identify, { gauge: value });
                lockSave && lockSave(false);
            });
        } else {
            this.setState({ error: true }, () => {
                lockSave && lockSave(true);
            });
        }
    };
    onChange = (name, value) => {
        this.setState({ [name]: value }, () => {
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                this.checkInput(this.state.min, this.state.max);
            }, 500);
        });
    };
    render() {
        const { isLoading } = this.props,
            { min, max, error } = this.state;
        return (
            <React.Fragment>
                <div className="chart-halfpluginContainer">
                    <FormControl className="chart-halfplugin">
                        <TextField
                            disabled={isLoading}
                            label={I18n.t(langPath + "minValTitle")}
                            style={{ marginTop: 0 }}
                            // defaultValue={min}
                            error={error}
                            value={min}
                            onChange={event => {
                                event.nativeEvent.stopImmediatePropagation();
                                this.onChange("min", event.target.value);
                            }}
                            InputLabelProps={{
                                shrink: true
                            }}
                            margin="normal"
                            InputProps={{
                                inputComponent: TextMaskCustom
                            }}
                        />
                    </FormControl>
                    <FormControl className="chart-halfplugin">
                        <TextField
                            disabled={isLoading}
                            label={I18n.t(langPath + "maxValTitle")}
                            style={{ marginTop: 0 }}
                            // defaultValue={max}
                            value={max}
                            error={error}
                            onChange={event => {
                                event.nativeEvent.stopImmediatePropagation();
                                this.onChange("max", event.target.value);
                            }}
                            InputLabelProps={{
                                shrink: true
                            }}
                            margin="normal"
                            InputProps={{
                                inputComponent: TextMaskCustom
                            }}
                        />
                    </FormControl>
                </div>
                {error && <FormHelperText error={error}>{I18n.t(langPath + "minMaxError")}</FormHelperText>}
            </React.Fragment>
        );
    }
}

MinMaxValue.propTypes = {
    gauge: PropTypes.object,
    isLoading: PropTypes.bool,
    identify: PropTypes.string.isRequired,
    onChangeProperty: PropTypes.func.isRequired
};

export default MinMaxValue;
