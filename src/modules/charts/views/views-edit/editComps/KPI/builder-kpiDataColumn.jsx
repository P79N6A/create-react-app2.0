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
import { withStyles } from "@material-ui/core/styles";
import { Select, InputLabel, Chip } from "modules/common";
import { Checkbox, MenuItem, ListItemText, FormControl } from "@material-ui/core";

// let { intervalList } = queryBuilderOpt;
const styles = theme => ({
        chips: {
            display: "flex",
            flexWrap: "wrap"
        },
        chip: {
            margin: theme.spacing.unit / 4
        }
    }),
    langPath = "chart.editView.kpi.";

const SelectXdata = props => {
    const { identify, onChangeProperty, xParameter, propertyList, isLoading } = props;
    return (
        <div className="chart-query">
            <FormControl disabled={isLoading}>
                <InputLabel htmlFor="xParameter-helper">{I18n.t(langPath + "xAxisTitle")}</InputLabel>
                <Select
                    value={xParameter || ""}
                    onChange={event => {
                        const value = event.target.value;
                        onChangeProperty(identify, { xParameter: value });
                    }}
                    inputProps={{
                        name: "xParameter",
                        id: "xParameter-helper"
                    }}
                >
                    {_.map(propertyList || [], (item, i) => (
                        <MenuItem key={i} value={item}>
                            {item}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
};

SelectXdata.propTypes = {
    identify: PropTypes.string.isRequired,
    xParameter: PropTypes.string,
    propertyList: PropTypes.array,
    onChangeProperty: PropTypes.func.isRequired,
    isLoading: PropTypes.boolean
};

const SelectY = props => {
    const { yParameter, propertyList, onChangeProperty, identify, classes, isLoading } = props;
    return (
        <div className="chart-query">
            <FormControl disabled={isLoading}>
                <InputLabel htmlFor="select-multiple-chip">{I18n.t(langPath + "yAxisTitle")}</InputLabel>
                <Select
                    multiple
                    value={yParameter || []}
                    renderValue={selected => (
                        <div className={classes.chips}>
                            {selected.map(value => (
                                <Chip
                                    key={value}
                                    label={value}
                                    className={classes.chip}
                                    onDelete={event => {
                                        const newSelects = _.filter(yParameter, n => !_.isEqual(n, value));
                                        onChangeProperty(identify, { yParameter: newSelects });
                                    }}
                                />
                            ))}
                        </div>
                    )}
                    onChange={event => {
                        const value = event.target.value;
                        onChangeProperty(identify, { yParameter: value });
                    }}
                >
                    {_.map(propertyList || [], (name, i) => {
                        const flag = _.some(yParameter, n => n === name);
                        return (
                            <MenuItem key={i} value={name}>
                                <Checkbox checked={flag} />
                                <ListItemText primary={name} />
                            </MenuItem>
                        );
                    })}
                </Select>
            </FormControl>
        </div>
    );
};

SelectY.propTypes = {
    identify: PropTypes.string.isRequired,
    yParameter: PropTypes.array,
    propertyList: PropTypes.array,
    classes: PropTypes.object,
    onChangeProperty: PropTypes.func.isRequired,
    isLoading: PropTypes.bool
};
const SelectYdata = withStyles(styles, { withTheme: true })(SelectY);
export { SelectXdata, SelectYdata };
