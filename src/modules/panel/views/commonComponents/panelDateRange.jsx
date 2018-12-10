/*
* =========================================================================
*  Copyright (C)2018 NCS Pte. Ltd. All Rights Reserved
*
*  This software is confidentifyential and proprietary to NCS Pte. Ltd. You shall
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
 * Created by Deng Xiaolong on 28/05/2018.
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { DatePicker } from "modules/common";
import { SingleSelect } from "modules/mapAndPanelCommon";
import getTimeString from "commons/utils/isc8601Generator";

export default class PanelDateRange extends Component {
    static defaultProps = {
        defaultRange: "realTime", 
    };
    static propTypes = {
        onChange: PropTypes.func.isRequired,
        defaultRange: PropTypes.string,
    };
    state = {
        mode: "realTime",
        dateRangeDefaultValue: ["isc::{Today(00:00:00)-iso8601::(P7D)}"],
    };
    // date picker change
    selectedDataRange = (e) => {
        this.setState({
            mode: e,
        });
    };
    // date pick change
    datePickerChange = e => {
        const { mode } = this.state;
        let timeArr = ["", getTimeString("isc::{today()}")];
        if (mode === "realTime") {
            timeArr[0] = getTimeString(e[0]);
            timeArr[1] = getTimeString("isc::{today()}");
        } else if (mode === "dateTime") {
            timeArr = e;
        }
        this.props.onChange(timeArr);
    };
    render() {
        const { mode, dateRangeDefaultValue } = this.state;
        const { defaultRange } = this.props;
        return(
            <React.Fragment>
                <SingleSelect
                    title="Date range"
                    defaultValue={defaultRange}
                    selctOptions={["realTime", "dateTime"]}
                    onSelect={this.selectedDataRange}
                />
                <DatePicker
                    mode={mode}
                    defaultValue={dateRangeDefaultValue}
                    onChange={this.datePickerChange}
                />
            </React.Fragment>
        );
    }
}
