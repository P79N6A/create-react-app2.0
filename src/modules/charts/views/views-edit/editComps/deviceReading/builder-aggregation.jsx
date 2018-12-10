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
import { Select, InputLabel } from "modules/common";
import { FormControl, MenuItem } from "@material-ui/core";
import { queryBuilderOpt } from "modules/charts/funcs/constants";

const { aggregationList } = queryBuilderOpt,
    langPath = "chart.editView.aggregation.";

const Aggregation = props => {
    const { predicates, identify, source, type, onChangeProperty, isLoading } = props,
        { aggregation, keyList, interval } = predicates,
        chartType = !_.isPlainObject(type) ? type : undefined;
    return (
        <div className="chart-query">
            <FormControl disabled={isLoading}>
                <InputLabel htmlFor="aggregation-helper">{I18n.t(langPath + "selectTitle")}</InputLabel>
                <Select
                    value={aggregation || ""}
                    onChange={event => {
                        const value = event.target.value,
                            flag = value === "COUNT",
                            opt = {
                                ...predicates,
                                aggregation: value,
                                keyList: flag ? [] : keyList,
                                interval: flag ? "" : interval,
                                grouping: value === "None" ? "" : "capevent.parameters.deviceid"
                            };
                        onChangeProperty(identify, { predicates: opt });
                    }}
                    inputProps={{
                        name: "aggregation",
                        id: "aggregation-helper"
                    }}
                >
                    {_.map(aggregationList[chartType] || aggregationList[source] || [], item => (
                        <MenuItem key={item.value} value={item.value}>
                            {I18n.t(langPath + item.label)}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
};

Aggregation.propTypes = {
    isLoading: PropTypes.bool,
    predicates: PropTypes.object,
    source: PropTypes.string.isRequired,
    identify: PropTypes.string.isRequired,
    onChangeProperty: PropTypes.func.isRequired,
    type: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
};

export default Aggregation;
