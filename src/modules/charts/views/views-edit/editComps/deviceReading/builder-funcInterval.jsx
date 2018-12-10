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
import moment from "moment";
import { Component } from "react";
import PropTypes from "prop-types";
import getTimeString from "commons/utils/isc8601Generator";
const mapping = {
    MT: "minute",
    HT: "hour",
    D: "day",
    M: "day"
};

class Interval extends Component {
    componentWillReceiveProps(nextProps) {
        if (_.isEqual(nextProps, this.props) || nextProps.isLoading) {
            return;
        }
        const { predicates, identify, timeMode, onChangeProperty } = nextProps,
            { interval, aggregation, dateRange } = predicates;
        let value = aggregation && aggregation !== "None" ? interval : undefined;
        // let date = dateRange && dateRange.length === 1 ? [getTimeString(dateRange[0])] : dateRange;
        if (timeMode === "realTime" && dateRange[0]) {
            const time = this.extractIsotime(dateRange[0]),
                type = mapping[time[0]];
            value = type
                ? Math.round(moment().diff(moment(getTimeString(dateRange[0])), type + "s", true)) + type
                : value;
            // value = mapping[time[0]]?time[1]+mapping[time[0]]:time[0]==="M"?moment(getTimeString(dateRange[0])).diff(moment(),'days')+'day':value;
        } else if (timeMode === "dateTime") {
            value = Math.round(moment(dateRange[1]).diff(moment(getTimeString(dateRange[0])), "days", true)) + "day";
        }
        value !== interval && onChangeProperty(identify, { predicates: { ...predicates, interval: value } });
    }
    render() {
        return null;
    }
    extractIsotime(isoString) {
        const reg = /iso8601::\(P(.*?)\)/gi,
            time = reg.exec(isoString);
        if (!time || !time[1]) {
            return;
        }
        const length = time[1].length,
            number = time[1].replace(/[^0-9]/gi, ""),
            t = time[1].indexOf("T") > -1 ? "T" : "";
        return [time[1][length - 1] + t, Number(number)];
    }
}

Interval.propTypes = {
    predicates: PropTypes.object,
    identify: PropTypes.string.isRequired,
    timeMode: PropTypes.string.isRequired,
    onChangeProperty: PropTypes.func.isRequired
};

export default Interval;
