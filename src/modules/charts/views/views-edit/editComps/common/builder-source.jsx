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
import { MenuItem, FormControl } from "@material-ui/core";
import { queryBuilderOpt, defaultProps } from "modules/charts/funcs/constants";

const { sourceList } = queryBuilderOpt,
    langPath = "chart.editView.source.";

const Source = props => {
    const { identify, applyDefaultProps, source, isLoading } = props;
    return (
        <div className="chart-query">
            <FormControl disabled={isLoading}>
                <InputLabel htmlFor="source-helper">{I18n.t(langPath + "selectTitle")}</InputLabel>
                <Select
                    value={source || ""}
                    onChange={event => {
                        const value = event.target.value;
                        // onChangeProperty && onChangeProperty(identify, "source", value);
                        applyDefaultProps && applyDefaultProps(identify, { ...defaultProps, source: value });
                    }}
                    inputProps={{
                        name: "source",
                        id: "source-helper"
                    }}
                >
                    {_.map(sourceList || [], (item, i) => (
                        <MenuItem key={item} value={item}>
                            {item}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
};

Source.propTypes = {
    source: PropTypes.string,
    isLoading: PropTypes.bool,
    identify: PropTypes.string.isRequired,
    applyDefaultProps: PropTypes.func.isRequired
};

export default Source;
