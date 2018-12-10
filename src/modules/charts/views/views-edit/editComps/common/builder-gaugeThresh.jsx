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
import Slider from "rc-slider";
import Tooltip from "rc-tooltip";
import PropTypes from "prop-types";
import "rc-slider/assets/index.css";
import { I18n } from "react-i18nify";
import React, { Component } from "react";
import { ColorPicker } from "modules/common";
// import ColorPicker from "./common-colorPicker";
import FormHelperText from "@material-ui/core/FormHelperText";

const defaultValue = [[0.2, "#91c7ae"], [0.8, "#63869e"], [1, "#c23531"]],
    langPath = "chart.editView.gauge.";

const handle = props => {
    const { value, dragging, index, ...restProps } = props;
    return (
        <Tooltip
            prefixCls="rc-slider-tooltip"
            overlay={value + "%"}
            visible={dragging}
            placement="top"
            key={index}
            getTooltipContainer={() => document.getElementById("isc-chart-threshold")}
        >
            <Slider.Handle value={value} {...restProps} />
        </Tooltip>
    );
};

const ColorSelect = props => {
    const { colors } = props;
    return (
        <div className="isc-chart-colors">
            {_.map(colors, (color, index) => (
                <ColorPicker
                    key={index}
                    initColor={color}
                    onSelect={value => {
                        props.onColorSelect(value, index);
                    }}
                />
            ))}
        </div>
    );
};

class Thresholds extends Component {
    state = { threshold: [] };
    threshold = [];
    timer = null;
    componentWillMount() {
        const { gauge } = this.props,
            threshold = gauge && gauge.threshold ? gauge.threshold : _.cloneDeep(defaultValue);
        this.setState({ threshold });
    }
    onChangeproperty = pointer => {
        const { threshold } = pointer || this.state,
            { onChangeProperty, identify, gauge } = this.props;
        onChangeProperty(identify, { gauge: { ...gauge, threshold } });
    };
    onColorSelect = (value, index) => {
        let threshold = _.clone(this.state.threshold);
        threshold[index][1] = value;
        this.setState({ threshold }, () => {
            this.onChangeproperty();
        });
    };
    onValueChange = (value, evt) => {
        let flag = true;
        const threshold = this.state.threshold;
        let newThreshold = _.map(threshold, (t, index) => {
            flag = index === 2 && value[index] / 100 !== t[0] ? false : true;
            return index === 2 ? t : [value[index] / 100, t[1]];
        });
        if (flag) {
            this.threshold = newThreshold;
            this.setState({ threshold: newThreshold });
        }
    };
    onAfterChange = value => {
        this.onChangeproperty();
    };
    render() {
        const { threshold } = this.state;
        return (
            <div id="isc-chart-threshold">
                <FormHelperText className="chart-textlabel">{I18n.t(langPath + "thresholdTitle")}</FormHelperText>
                <Slider.Range
                    value={_.map(threshold, m => m[0] * 100)}
                    onChange={this.onValueChange}
                    onAfterChange={this.onAfterChange}
                    // trackStyle={[{ backgroundColor: 'red' }, { backgroundColor: 'green' }]}
                    trackStyle={_.map([threshold[1], threshold[2]], m => ({ backgroundColor: m[1] }))}
                    railStyle={{ backgroundColor: threshold[0][1] }}
                    allowCross={false}
                    handle={handle}
                    pushable={5}
                />
                <ColorSelect colors={_.map(threshold, m => m[1])} onColorSelect={this.onColorSelect} />
            </div>
        );
    }
}

Thresholds.propTypes = {
    gauge: PropTypes.object,
    identify: PropTypes.string.isRequired,
    onChangeProperty: PropTypes.func.isRequired
};

export default Thresholds;
