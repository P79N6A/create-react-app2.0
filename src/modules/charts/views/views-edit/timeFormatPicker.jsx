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
// import { Cascader } from "antd";
import { Cascader } from "modules/common";
import { dateFormats } from "modules/charts/funcs/constants";
import _ from "lodash";

// const { dateFormatList, timeFormatList } = dateFormats;

// const options = dateFormatList.map(item => ({
//     value: item === "None" ? "" : item,
//     label: item,
//     children: timeFormatList.map(time => ({
//         value: time === "None" ? "" : time,
//         label: time
//     }))
// }));

export class TimeFormatPicker extends Component {
    static propTypes = {};
    state = {
        options:[]
    };
    displayRender(labels, selectedOptions) {
        let list = labels.map(item => <span key={item}>{item + " "}</span>);
        // [list[1], list[2]] = [list[2], list[1]];
        return list;
    }
    generateList(props){
        const {type} = props;
        const list = dateFormats[type]||dateFormats.defaultList;
        const dateFormat = list.dateFormat;
        const timeFormat = list.timeFormat;
        const options = _.map(dateFormat,item => ({
            value: item === "None" ? "" : item,
            label: item,
            children:timeFormat&& _.map(timeFormat,time => ({
                value: time === "None" ? "" : time,
                label: time
            }))
        }));
        this.setState({options});
    }
    componentWillMount(){
        this.generateList(this.props);
    }
    componentWillReceiveProps(nextProps){
        this.generateList(nextProps);
    }
    render() {
        let { onChange, placeholder, defaultValue,value, disabled, label, identify } = this.props;
        return (
            <Cascader
                id={identify+"timeformat"}
                label={label}
                disabled={disabled}
                value={value}
                displayRender={this.displayRender}
                defaultValue={defaultValue}
                options={this.state.options}
                placeholder={placeholder}
                onChange={value => {
                    onChange && onChange(value);
                }}
                expandTrigger="hover"
                style={{ width: "100%" }}
                allowClear={false}
            />
        );
    }
}

TimeFormatPicker.propTypes = {
    defaultValue: PropTypes.array,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    disabled: PropTypes.bool
};

export default TimeFormatPicker;
