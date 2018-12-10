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
// import PropTypes from "prop-types";
import moment from "moment";
import { DatePicker } from "antd";
import "../../styles/timeSelect.less";
// import { theme as themes } from "modules/theme";
const { RangePicker } = DatePicker;
const dateFormat = "HH:mm:ss YYYY-MMM-DD";
class TimeSelect extends React.Component {
    handleChange = (dates, dateStrings) => {
        this.props.handleDateChange(dateStrings);
    };
    render() {
        const { range } = this.props;
        let value;
        if(range.startDate && range.endDate){
            value = [moment(range.startDate, dateFormat),moment(range.endDate, dateFormat)];
        }else{
            value = null;
        }
        return (
            <div className="timeSelect">
                <RangePicker
                    defaultValue={value}
                    value={value}
                    showTime
                    format={dateFormat}
                    onChange={this.handleChange.bind(this)}
                />
            </div>
        );
    }
}

TimeSelect.propTypes = {
    // classes: PropTypes.object.isRequired,
};
export default TimeSelect;
// export default withStyles(styles, { withTheme: true })(TimeSelect);
