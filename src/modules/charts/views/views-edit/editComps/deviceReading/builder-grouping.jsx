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

const { groupList } = queryBuilderOpt,
    langPath = "chart.editView.grouping.";

const Grouping = props => {
    const { predicates, identify, onChangeProperty, source, isLoading } = props,
        { grouping, aggregation } = predicates;
    return (
        <div className="chart-query">
            <FormControl disabled={isLoading}>
                <InputLabel htmlFor="grouping-helper">{I18n.t(langPath + "selectTitle")}</InputLabel>
                <Select
                    value={grouping || ""}
                    onChange={event => {
                        const value = event.target.value;
                        onChangeProperty(identify, { predicates: { ...predicates, grouping: value } });
                    }}
                    inputProps={{
                        name: "grouping",
                        id: "grouping-helper"
                    }}
                >
                    {_.map(groupList[aggregation] || groupList[source] || groupList.default, (item, i) => (
                        <MenuItem key={item.value} value={item.value}>
                            {I18n.t(langPath + item.label)}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
};

Grouping.propTypes = {
    isLoading: PropTypes.bool,
    predicates: PropTypes.object,
    source: PropTypes.string.isRequired,
    identify: PropTypes.string.isRequired,
    onChangeProperty: PropTypes.func.isRequired
};

export default Grouping;
