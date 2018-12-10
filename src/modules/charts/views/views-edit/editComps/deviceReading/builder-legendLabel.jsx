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
import PropTypes from "prop-types";
import React, { Component } from "react";
import { TextField } from "modules/common";
import InputAdornment from "@material-ui/core/InputAdornment";

// let { legendList } = basicOpt;

class LegendLabel extends Component {
    componentWillReceiveProps = nextProps => {
        if (_.isEqual(nextProps, this.props)) {
            return;
        }
        const { legendLabels, predicates, onChangeProperty, identify } = nextProps,
            { iotIds, keyList } = predicates,
            labels = legendLabels || [];
        if (!_.isEqual(iotIds, this.props.iotIds) && !_.isEqual(keyList, this.props.predicates.keyList)) {
            _.forEach(iotIds, id => {
                _.forEach(keyList, key => {
                    if (!_.filter(labels, ["key", id.label + "-" + key]).length) {
                        const value = { key: id.label + "-" + key, label: id.label + "-" + key };
                        labels.push(value);
                    }
                });
            });
            onChangeProperty(identify, { legendLabels: labels });
        }
    };
    render() {
        const { legendLabels, identify, onChangeProperty, isLoading } = this.props;
        let { timer } = this;
        return (
            <div className="chart-query">
                {_.map(legendLabels, item => {
                    return (
                        <TextField
                            disabled={isLoading}
                            className="chart-plugin"
                            defaultValue={item.label}
                            style={{ display: "flex" }}
                            key={item.label}
                            onChange={event => {
                                event.nativeEvent.stopImmediatePropagation();
                                const targetVal = event.target.value;
                                clearTimeout(timer);
                                timer = setTimeout(() => {
                                    const value = _.map(legendLabels, legend => {
                                        if (legend.key === item.key) {
                                            return { key: item.key, label: targetVal };
                                        } else {
                                            return legend;
                                        }
                                    });
                                    onChangeProperty(identify, { legendLabels: value });
                                }, 400);
                            }}
                            margin="normal"
                            InputProps={{
                                startAdornment: <InputAdornment position="start">{item.key}</InputAdornment>
                            }}
                        />
                    );
                })}
            </div>
        );
    }
}

LegendLabel.propTypes = {
    isLoading: PropTypes.bool,
    legendLabels: PropTypes.array,
    identify: PropTypes.string.isRequired,
    onChangeProperty: PropTypes.func.isRequired,
};

export default LegendLabel;
