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
 * Created by DengXiaoLong on 25/05/2018.
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { DatePickers } from "modules/common";

export class RealDatePicker extends Component {
    static propTypes = {
        onChange: PropTypes.func.isRequired,
        mode: PropTypes.oneOf(["realTime", "dateTime"]).isRequired,
        defaultValue: PropTypes.array
    };
    static defaultProps = {
        mode: "realTime",
        defaultValue: []
    };
    state = {
        label: this.props.mode === "realTime" ? "Select Real Time" : "Select Date Time"
    };
    componentWillReceiveProps(nextProps) {
        const { mode } = nextProps;
        this.setState({
            label: mode === "realTime" ? "Select Real Time" : "Select Date Time",
        });
    };
    render() {
        const { label } = this.state;
        return (
            <div style={{marginTop: "8px"}}>
                <DatePickers {...this.props} label={label}/>
            </div>
        );
    }
}

export default RealDatePicker;
