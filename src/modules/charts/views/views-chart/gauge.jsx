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
import PropTypes from "prop-types";
import React, { Component } from "react";
import ReactEcharts from "echarts-for-react";
import { countName } from "modules/charts/funcs/constants";
import { gauge as originalOptions, toolbox } from "modules/charts/funcs/chartConfig";

export class GaugeChart extends Component {
    static propTypes = {
        data: PropTypes.object.isRequired,
        title: PropTypes.string,
        name: PropTypes.string,
        legend: PropTypes.array.isRequired
    };
    getProperData(data, legend, aggregation) {
        const tempData = _.map(data),
            group = Object.keys(tempData);
        let result = tempData[group[0]];
        switch (aggregation) {
            case "Max":
                result = _.maxBy(tempData, o => {
                    const num = o[legend] ? _.head(o[legend]) : 0;
                    return Number(num);
                });
                break;
            case "Min":
                result = _.minBy(tempData, o => {
                    const num = o[legend] ? _.head(o[legend]) : 0;
                    return Number(num);
                });
                break;
            case "Average":
                if (result && result[legend]) {
                    result[legend] = [
                        _.meanBy(tempData, o => {
                            return Number(o[legend] ? o[legend][0] : 0);
                        })
                    ];
                }
                break;
            default:
                break;
        }
        return result;
    }
    getData = props => {
        const { source, gauge } = props,
            { aggregation } = gauge || {};
        const countLabel = countName[source] || countName.default,
            legend = _.map(props.legend, item => {
                const name = item.displayName,
                    units = item.units ? "(" + item.units + ")" : "";
                return { name, units };
            }),
            globalLegend = legend[0] || {},
            data = this.getProperData(_.cloneDeep(props.data), globalLegend.name, aggregation),
            labelName = globalLegend.name + globalLegend.units;
        let value = data ? data[globalLegend.name] : null;
        value = _.toLength(value) > 5 ? _.ceil(value, 2) : value;
        return {
            name: labelName === countLabel.value ? countLabel.label : labelName,
            value: value
        };
    };

    getSeries = (series, props, textColor) => {
        const { iotIds, gauge } = props,
            { min, max, threshold } = gauge || {};
        const title = {
            offsetCenter: [0, "20%"],
            textStyle: {
                fontWeight: "bolder",
                fontStyle: "italic",
                color: textColor,
                shadowBlur: 10
            }
        };
        const name =
                _.isArray(iotIds) && !_.isEmpty(iotIds)
                    ? _.reduce(iotIds, (sum, n) => (sum ? sum + "," : "") + n.label, "")
                    : (iotIds && iotIds.label) || " ",
            axisLineColor = threshold ? _.cloneDeep(threshold) : series.axisLine.lineStyle.color,
            axisLine = { lineStyle: { ...series.axisLine.lineStyle, color: axisLineColor } },
            data = this.getData(props);
        return {
            ...series,
            name,
            title,
            data: [data],
            axisLine,
            min: min ? min : series.min,
            max: max ? max : series.max
        };
    };
    setOption = () => {
        const { MuiTheme, title } = this.props;
        let option = _.cloneDeep(originalOptions);
        const textColor = MuiTheme.typography.display1.color,
            backgroundColor = MuiTheme.palette.background.paper;
        option.toolbox = toolbox(backgroundColor, title || "isc-chart");
        option.series = this.getSeries(option.series, this.props, textColor);
        return option;
    };
    render() {
        let { theme } = this.props;
        return (
            <div className="chart-gauge">
                <ReactEcharts
                    option={this.setOption()}
                    notMerge
                    lazyUpdate
                    className="chart-allWh"
                    theme={theme === "default" ? "" : theme}
                />
            </div>
        );
    }
}

export default GaugeChart;
