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
import moment from "moment";
import PropTypes from "prop-types";
import { I18n } from "react-i18nify";
import { Select, InputLabel } from "modules/common";
import getTimeString from "commons/utils/isc8601Generator";
import { FormControl, MenuItem } from "@material-ui/core";
import { queryBuilderOpt } from "modules/charts/funcs/constants";

const { intervalList } = queryBuilderOpt,
    typeOpts = ["line", "bar", "area"],
    langPath = "chart.editView.interval.";

const Interval = props => {
    const { predicates, identify, onChangeProperty, type, isLoading } = props,
        { interval, aggregation, dateRange } = predicates,
        times =
            dateRange.length === 1 ? [moment(getTimeString(dateRange[0])), moment()] : _.map(dateRange, d => moment(d));
    //filter interval list, not allow to select interval which is greater than selected date
    const list = !_.isEmpty(times)
        ? _.filter(intervalList, int => {
            const t = Math.ceil(times[1].diff(times[0], int.name, true));
            return t > 1 && t < 1000;
        })
        : intervalList;
    return (
        <div>
            {(typeOpts.indexOf(type) > -1 || _.isPlainObject(type)) && aggregation && aggregation !== "None" && (
                <div className="chart-query">
                    <FormControl disabled={isLoading}>
                        <InputLabel htmlFor="Interval-helper">{I18n.t(langPath + "selectTitle")}</InputLabel>
                        <Select
                            value={interval || ""}
                            onChange={event => {
                                const value = event.target.value;
                                onChangeProperty(identify, {
                                    predicates: { ...predicates, interval: value },
                                    timeFormat: []
                                });
                            }}
                            inputProps={{
                                name: "Interval",
                                id: "Interval-helper"
                            }}
                        >
                            {_.map(list || [], (item, i) => (
                                <MenuItem key={item.value} value={item.value}>
                                    {I18n.t(langPath + item.label)}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
            )}
        </div>
    );
};

Interval.propTypes = {
    isLoading: PropTypes.bool,
    predicates: PropTypes.object,
    identify: PropTypes.string.isRequired,
    onChangeProperty: PropTypes.func.isRequired,
    type: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired
};

export default Interval;
