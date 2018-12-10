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
import { MenuItem, FormControl } from "@material-ui/core";
import { queryBuilderOpt } from "modules/charts/funcs/constants";
import { Select, InputLabel, DatePickers } from "modules/common";
// import FormHelperText from "@material-ui/core/FormHelperText";

const { timeModeList } = queryBuilderOpt,
    langPath = "chart.editView.timeMode.";

const Time = props => {
    const { timeMode, identify, predicates, onChangeProperty, isLoading } = props,
        { dateRange } = predicates;
    return (
        <div>
            <div className="chart-query">
                <FormControl disabled={isLoading}>
                    <InputLabel htmlFor="Timemode-helper">{I18n.t(langPath + "selectTitle")}</InputLabel>
                    <Select
                        value={timeMode || ""}
                        onChange={event => {
                            const value = event.target.value;
                            onChangeProperty(identify, { timeMode: value });
                        }}
                        inputProps={{
                            name: "Timemode",
                            id: "Timemode-helper"
                        }}
                    >
                        {_.map(timeModeList || [], item => (
                            <MenuItem key={item.value} value={item.value}>
                                {I18n.t(langPath + item.label)}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
            <div className="chart-query">
                {/* <FormHelperText className="chart-textlabel">Date Range</FormHelperText> */}
                <DatePickers
                    label="Time Range"
                    disabled={isLoading}
                    defaultValue={dateRange}
                    onChange={value => {
                        onChangeProperty(identify, { predicates: { ...predicates, dateRange: value, interval: "" } });
                    }}
                    mode={timeMode}
                />
            </div>
        </div>
    );
};

Time.propTypes = {
    isLoading: PropTypes.bool,
    timeMode: PropTypes.string,
    predicates: PropTypes.object,
    identify: PropTypes.string.isRequired,
    onChangeProperty: PropTypes.func.isRequired
};

export default Time;
