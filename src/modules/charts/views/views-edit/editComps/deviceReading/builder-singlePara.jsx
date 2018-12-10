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
import { MenuItem, ListItemText, FormControl } from "@material-ui/core";

const langPath = "chart.editView.reading.";
const Parameter = props => {
    const { predicates, identify, onChangeProperty, propertyList, isLoading } = props,
        { keyList, aggregation } = predicates;
    return aggregation !== "COUNT" ? (
        <div className="chart-query">
            <FormControl disabled={isLoading}>
                <InputLabel htmlFor="select-chip">{I18n.t(langPath + "selectTitle")}</InputLabel>
                <Select
                    value={_.map(keyList, m => m.displayName) || []}
                    renderValue={selected => `${selected}`}
                    onChange={event => {
                        const value = _.map([event.target.value], m => propertyList[m]);
                        onChangeProperty(identify, { predicates: { ...predicates, keyList: value } });
                    }}
                >
                    {_.map(propertyList || {}, (item, name) => (
                        <MenuItem key={name} value={name}>
                            <ListItemText primary={name} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    ) : null;
};

Parameter.propTypes = {
    isLoading: PropTypes.bool,
    predicates: PropTypes.object,
    propertyList: PropTypes.object,
    identify: PropTypes.string.isRequired,
    onChangeProperty: PropTypes.func.isRequired
};

export default Parameter;
