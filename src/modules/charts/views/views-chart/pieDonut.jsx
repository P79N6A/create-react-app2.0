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
import { pieDonut as originalOptions, legendMap, noDatagraphic, toolbox } from "modules/charts/funcs/chartConfig";

export class PieDonutChart extends Component {
    static propTypes = {
        data: PropTypes.object.isRequired,
        title: PropTypes.string,
        name: PropTypes.string,
        legend: PropTypes.array.isRequired,
        legendPosition: PropTypes.string
    };
    shouldComponentUpdate(nextProps, nextState) {
        return !_.isEqual(nextProps, this.props);
    }

    getLegend = (props, countLabel, legendPosition, textColor) => {
        return {
            type: "scroll",
            data: this.getLegendData(props, countLabel),
            textStyle: {
                color: textColor
            },
            pageTextStyle: {
                color: textColor
            },
            ...legendMap[legendPosition]
        };
    };

    getLegendData = (props, countLabel) => {
        const { data } = props;
        if (_.isEmpty(props.legend) || _.isEmpty(data)) {
            return [];
        }
        let legend = [];
        const ids = Object.keys(props.data);
        ids.forEach((id, index) => {
            legend = legend.concat(
                props.legend.map(item => {
                    const name = item.displayName;
                    const tempId = id === countLabel.value ? "" : id;
                    return name === countLabel.value ? tempId : (tempId ? tempId + "-" : "") + name;
                })
            );
        });
        return legend;
    };
    getSeries = (series, props, countLabel) => {
        const { iotIds } = props;
        return {
            ...series,
            radius: props.type === "donut" ? ["30%", "75%"] : "75%",
            data: this.getSeriesData(props, countLabel),
            name:
                _.isArray(iotIds) && !_.isEmpty(iotIds)
                    ? _.reduce(iotIds, (sum, n) => (sum ? sum + "," : "") + n.label, "")
                    : (iotIds && iotIds.label) || " "
        };
    };
    getSeriesData = (props, countLabel) => {
        let series = [];
        const { legend, data } = props;
        if (_.isEmpty(legend) || _.isEmpty(data)) {
            return [];
        }
        const ids = Object.keys(props.data);
        ids.forEach((id, index) => {
            const data = props.data[id];
            const itemKey = Object.keys(data);
            series = series.concat(
                itemKey.map((item, i) => {
                    const value = data[item];
                    const tempId = id === countLabel.value ? "" : id;
                    return {
                        name: item === countLabel.value ? tempId : tempId ? tempId + "-" + item : item,
                        value: this.getSumCount(value)
                    };
                })
            );
        });
        return series;
    };
    getSumCount = data => {
        let result;
        _.forEach(data, item => {
            result = result ? result + Number(item) : Number(item);
        });
        return result;
    };
    setOption = () => {
        let option = _.cloneDeep(originalOptions);
        const props = this.props;
        const { legendPosition, source, MuiTheme } = props;
        const countLabel = countName[source] || countName.default;
        const textColor = MuiTheme.typography.display1.color,
            backgroundColor = MuiTheme.palette.background.paper;
        option.legend = this.getLegend(props, countLabel, legendPosition, textColor);
        option.toolbox = toolbox(backgroundColor, props.title || "isc-chart");
        option.series = this.getSeries(option.series, props, countLabel);
        option.graphic = option.series.data.length ? undefined : noDatagraphic(textColor);
        return option;
    };
    render() {
        const { theme } = this.props;
        return (
            <div className="chart-pie-donut">
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

export default PieDonutChart;
