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
import { MenuItem, Checkbox, ListItemText, FormControl } from "@material-ui/core";
const styles = theme => ({
        chips: {
            display: "flex",
            flexWrap: "wrap"
        },
        chip: {
            margin: theme.spacing.unit / 4
        }
    }),
    langPath = "chart.editView.reading.";

// let propertyList = ["SO-DAT-SENSERTSTAUS-FDSAFDSA","SO-DAT-HUMIDITY-7162-SENSOR-VALUE","SO-DAT-WATER-4816-SENSOR-VALUE"]

const Parameter = props => {
    const { predicates, identify, onChangeProperty, classes, propertyList, isLoading } = props,
        { keyList, aggregation } = predicates;
    return aggregation !== "COUNT" ? (
        <div className="chart-query">
            <FormControl disabled={isLoading}>
                <InputLabel htmlFor="select-multiple-chip">{I18n.t(langPath + "selectTitle")}</InputLabel>
                <Select
                    multiple
                    value={_.map(keyList, m => m.displayName) || []}
                    renderValue={selected => (
                        <div className={classes.chips}>
                            {_.map(selected, value => (
                                <Chip
                                    key={value}
                                    label={value}
                                    className={classes.chip}
                                    onDelete={event => {
                                        const newSelects = _.filter(keyList, n => !_.isEqual(n.displayName, value));
                                        onChangeProperty(identify, {
                                            predicates: {
                                                ...predicates,
                                                keyList: newSelects
                                            }
                                        });
                                    }}
                                />
                            ))}
                        </div>
                    )}
                    onChange={event => {
                        const result = _.map(event.target.value, m => propertyList[m]);
                        onChangeProperty(identify, { predicates: { ...predicates, keyList: result } });
                    }}
                >
                    {_.map(propertyList || {}, (item, name) => {
                        // let flag = keyList && keyList.indexOf(name) > -1 ? true : false;
                        const flag = _.some(keyList, item);
                        return (
                            <MenuItem key={name} value={name}>
                                <Checkbox checked={flag} />
                                <ListItemText primary={name} />
                            </MenuItem>
                        );
                    })}
                </Select>
            </FormControl>
        </div>
    ) : null;
};

Parameter.propTypes = {
    isLoading: PropTypes.bool,
    classes: PropTypes.object,
    predicates: PropTypes.object,
    propertyList: PropTypes.object,
    identify: PropTypes.string.isRequired,
    onChangeProperty: PropTypes.func.isRequired
};

export default withStyles(styles, { withTheme: true })(Parameter);
