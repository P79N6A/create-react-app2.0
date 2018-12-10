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

import React, { Component } from "react";
import PropTypes from "prop-types";
import { Cascader, RangePicker } from "modules/common";
import moment from "moment";

const showFormat = "YYYY-MM-DD";
const dateFormat = "YYYY-MM-DDTHH:mm:ss.SSSZZ";
const setFormat = [
    { hour: 0, minute: 0, second: 0, millisecond: 0 },
    { hour: 23, minute: 59, second: 59, millisecond: 999 }
];
function getOpt(loop) {
    let opt = [];
    for (let i = 1; i <= loop; i++) {
        opt.push({
            value: i,
            label: i
        });
    }
    return opt;
}

const options = [
    {
        value: "Last",
        label: "Last",
        children: [
            {
                value: "MT",
                label: "Minutes",
                children: getOpt(59)
            },
            {
                value: "HT",
                label: "Hours",
                children: getOpt(23)
            },
            {
                value: "D",
                label: "Days",
                children: getOpt(30)
            },
            {
                value: "M",
                label: "Months",
                children: getOpt(12)
            }
        ]
    }
];

export class DatePickers extends Component {
    static defaultProps = {
        mode: "realTime",
        defaultValue: []
        // mode:"dateTime",
        // defaultValue:["2018-02-03","2018-03-01"]
    };
    constructor(props) {
        super(props);
        this.displayRender = this.displayRender.bind(this);
        this.onChange = this.onChange.bind(this);
        this.extractIsotime = this.extractIsotime.bind(this);
    }
    displayRender(labels, selectedOptions) {
        let list = labels.map(item => <span key={item}>{item + " "}</span>);
        [list[1], list[2]] = [list[2], list[1]];
        return list;
    }
    disabledDate(current) {
        // Can not select days after today and today
        const thisday = moment().startOf("day");
        return current && (current.isAfter(thisday) || current.isSame(thisday));
    }
    getTime(value) {
        let result;
        switch (value) {
            case "MT":
                result = { second: 0, millisecond: 0 };
                break;
            case "HT":
                result = { minute: 0, second: 0, millisecond: 0 };
                break;
            case "D":
                result = { hour: 0, minute: 0, second: 0, millisecond: 0 };
                break;
            case "M":
                result = { date: 1, hour: 0, minute: 0, second: 0, millisecond: 0 };
                break;
            default:
                break;
        }
        return JSON.stringify(result);
    }
    onChange(log) {
        let { mode, onChange } = this.props;
        let result = [];
        if (mode === "realTime") {
            if (log.length < 3) {
                return;
            }
            let st = log[1].split("");
            const string = "P" + (st.length === 2 ? st[1] : "") + log[2] + st[0];
            // let time = st.length === 2 ? "" : "00:00:00";
            const times = this.getTime(log[1]);
            // const formatStr = format ? "(" + format + ")" : "";
            result.push("isc::{Today()(" + times + ")-iso8601::(" + string + ")}");
        } else if (mode === "dateTime") {
            result = log.map((item, i) =>
                moment(item)
                    .set(setFormat[i])
                    .utc()
                    .format(dateFormat)
            );
        }
        onChange && onChange(result);
    }
    extractIsotime(isoString) {
        const reg = /iso8601::\(P(.*?)\)/gi;
        let time = reg.exec(isoString);
        if (!time || !time[1]) {
            return;
        }
        let length = time[1].length;
        let number = time[1].replace(/[^0-9]/gi, "");
        let t = time[1].indexOf("T") > -1 ? "T" : "";
        return ["Last", time[1][length - 1] + t, Number(number)];
    }

    render() {
        let { defaultValue, mode, disabled, label } = this.props;
        return (
            <div className="time-selecter">
                {mode === "realTime" && (
                    <Cascader
                        label={label}
                        disabled={disabled}
                        options={options}
                        defaultValue={this.extractIsotime(defaultValue)}
                        displayRender={this.displayRender}
                        style={{ width: "100%" }}
                        onChange={this.onChange}
                        allowClear={false}
                    />
                )}
                {mode === "dateTime" && (
                    <RangePicker
                        id="chartdatetime"
                        disabled={disabled}
                        label={label}
                        defaultValue={
                            defaultValue && defaultValue.length === 2
                                ? defaultValue.map(item => (item ? moment(item, dateFormat) : moment()))
                                : []
                        }
                        disabledDate={this.disabledDate}
                        format={showFormat}
                        placeholder={["Start Time", "End Time"]}
                        onChange={this.onChange}
                        allowClear={false}
                    />
                )}
            </div>
        );
    }
}

DatePickers.propTypes = {
    defaultValue: PropTypes.array,
    mode: PropTypes.oneOf(["realTime", "dateTime"]).isRequired,
    onChange: PropTypes.func,
    disabled: PropTypes.bool
};

export default DatePickers;
