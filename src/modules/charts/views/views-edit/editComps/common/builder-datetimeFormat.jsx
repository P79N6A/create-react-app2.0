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

import React from "react";
import PropTypes from "prop-types";
import { I18n } from "react-i18nify";
import TimeFormatPicker from "modules/charts/views/views-edit/timeFormatPicker";
// import FormHelperText from "@material-ui/core/FormHelperText";
const langPath = "chart.editView.timeFormat.";
const Format = props => {
    const { identify, onChangeProperty, timeFormat, isLoading, predicates } = props,
        { interval } = predicates || {};
    return (
        <div className="chart-query">
            {/* <FormHelperText className="chart-textlabel">Time Format</FormHelperText> */}
            <TimeFormatPicker
                identify={identify}
                label={I18n.t(langPath + "selectTitle")}
                disabled={isLoading}
                placeholder={I18n.t(langPath + "selectTitle")}
                value={timeFormat || []}
                type={interval}
                onChange={value => {
                    onChangeProperty(identify, { timeFormat: value });
                }}
            />
        </div>
    );
};

Format.propTypes = {
    isLoading: PropTypes.bool,
    timeFormat: PropTypes.array,
    identify: PropTypes.string.isRequired,
    onChangeProperty: PropTypes.func.isRequired
};

export default Format;
