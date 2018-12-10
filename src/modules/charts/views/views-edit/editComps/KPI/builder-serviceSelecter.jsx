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

// let { resourceList } = queryBuilderOpt;
const langPath = "chart.editView.kpi.";

const ServiceList = props => {
    const { identify, onChangeProperty, kpiPredicate, serviceList, isLoading } = props;
    return (
        <div className="chart-query">
            <FormControl disabled={isLoading}>
                <InputLabel htmlFor="Service-helper">{I18n.t(langPath + "serviceTitle")}</InputLabel>
                <Select
                    value={kpiPredicate ? kpiPredicate.configname : ""}
                    className="chart-plugin"
                    onChange={event => {
                        const value = event.target.value;
                        let val = {};
                        _.some(serviceList, item => {
                            if (item.configname === value) {
                                val = item;
                                return true;
                            }
                        });
                        onChangeProperty(identify, { kpiPredicate: val });
                    }}
                    inputProps={{
                        name: "Service",
                        id: "Service-helper"
                    }}
                >
                    {_.map(serviceList || [], (item, i) => (
                        <MenuItem key={i} value={item.configname}>
                            {item.configname}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
};

ServiceList.propTypes = {
    isLoading: PropTypes.bool,
    serviceList: PropTypes.array,
    // kpiPredicate:PropTypes.object,
    identify: PropTypes.string.isRequired,
    onChangeProperty: PropTypes.func.isRequired,
};

export default ServiceList;
