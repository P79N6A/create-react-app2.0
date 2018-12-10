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
import PropTypes from "prop-types";
import React, { Component } from "react";
import ReactEcharts from "echarts-for-react";
import {
    lineBar as originalOptions,
    legendMap,
    noDatagraphic,
    automaticMin,
    toolbox
} from "modules/charts/funcs/chartConfig";
import { countName } from "modules/charts/funcs/constants";

export class LineBarChart extends Component {
    static propTypes = {
        switchXY: PropTypes.bool,
        legend: PropTypes.arrayOf(PropTypes.object),
        x: PropTypes.arrayOf(PropTypes.string),
        data: PropTypes.object.isRequired,
        type: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
        timeFormat: PropTypes.array,
        legendPosition: PropTypes.string
    };
    shouldComponentUpdate(nextProps) {
        return !_.isEqual(nextProps, this.props);
    }
    checkCustomizeReading(readings) {
        return _.every(readings, m => {
            return m.label ? true : false;
        });
    }

    getChartType(type, name) {
        let result;
        if (_.isPlainObject(type)) {
            result = type[name] || "line";
        } else {
            result = type === "area" ? "line" : type;
        }
        return result;
    }

    getSeries = (props, countLabel) => {
        let series = [],
            ys = [];
        if (_.isEmpty(props.legend) && _.isEmpty(props.data)) {
            return { series, ys };
        }
        const ids = Object.keys(props.data),
            { markLines, combineYaxis, customizeReading } = props;
        ids.forEach((id, index) => {
            const data = props.data[id],
                itemKey = Object.keys(data),
                args = { id, data, props, itemKey, markLines, combineYaxis, customizeReading, countLabel };
            ys = ys.concat(itemKey);
            series = _.isEmpty(combineYaxis)
                ? series.concat(this.getNormalSeriesDetail(args))
                : series.concat(this.getCombinedSeriesDetail(args));
        });
        ys = Array.from(new Set(ys));
        return { series, ys };
    };

    getCombinedSeriesDetail = ({ id, data, props, combineYaxis, countLabel, customizeReading }) => {
        const { markLines } = props;
        let count = 0;
        let result = _.reduce(
            combineYaxis,
            (sum, items) => {
                const newArr = _.map(items.readings, m => {
                    const name = m.displayName,
                        value = data[name];
                    return this.getSeriesDetail(props, id, name, value, count, countLabel, markLines);
                });
                count++;
                return sum ? _.concat(sum, newArr) : newArr;
            },
            undefined
        );
        const cusReading = _.map(customizeReading, item => {
            const { name } = item,
                value = data[name],
                res = this.getSeriesDetail(props, id, name, value, count, countLabel, markLines);
            count++;
            return res;
        });
        result = _.isEmpty(cusReading) ? result : _.concat(result, cusReading);
        return result;
    };

    getNormalSeriesDetail = ({ id, data, props, itemKey, markLines, countLabel }) => {
        return itemKey.map((item, i) => {
            const value = data[item];
            return this.getSeriesDetail(props, id, item, value, i, countLabel, markLines);
        });
    };

    getSeriesDetail = (props, id, name, value, count, countLabel, markLines) => {
        const { switchXY } = props,
            axiaName = switchXY ? "xAxisIndex" : "yAxisIndex";
        return {
            name: name === countLabel.value ? id + "-" + countLabel.label : id + "-" + name,
            type: this.getChartType(props.type, name),
            [axiaName]: count,
            data: this.insertTimeIntoSeriesData(props.x, value, switchXY),
            connectNulls: true,
            markLine: {
                data: this.getMarkLine(markLines, name, switchXY),
                symbol: "none"
            },
            areaStyle: props.type === "area" ? {} : undefined
        };
    };

    insertTimeIntoSeriesData = (time, data, switchXY) => {
        return _.map(data, (item, index) => (switchXY ? [item, time[index]] : [time[index], item]));
    };

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
        let legends = [];
        if (_.isEmpty(props.legend) && _.isEmpty(props.data)) {
            return legends;
        }
        const { legend, customizeReading } = props,
            ids = Object.keys(props.data);
        ids.forEach((id, index) => {
            legends = legends.concat(
                legend.map(item => {
                    const name = item.displayName;
                    return name === countLabel.value ? id + "-" + countLabel.label : id + "-" + name;
                })
            );
            legends = legends.concat(
                _.map(customizeReading, item => {
                    return id + "-" + item.name;
                })
            );
        });
        return legends;
    };

    getYaxis = (ys, props, countLabel, textColor) => {
        const axisLine = { lineStyle: { color: textColor } },
            { legend, combineYaxis, customizeReading, readingLabel } = props,
            args = { ys, legend, combineYaxis, readingLabel, countLabel, textColor, axisLine, customizeReading },
            result = _.isEmpty(combineYaxis) ? this.getNomalYaxis(args) : this.getCombinedYaxis(args);

        return _.isEmpty(ys) && _.isEmpty(combineYaxis) ? { axisLine } : result;
    };

    getCombinedYaxis = ({ combineYaxis, customizeReading, readingLabel, countLabel, axisLine }) => {
        const isEmpCustomize = _.isEmpty(customizeReading),
            countValue = countLabel.value,
            countName = countLabel.label,
            // numberOfYaxis = isEmpCustomize?combineYaxis.length:combineYaxis.length+customizeReading.length,
            combineList = isEmpCustomize ? combineYaxis : [...combineYaxis, ...customizeReading];
        const result = _.map(combineList, (item,i) => {
            const itemLabel = _.find(readingLabel, it => it.reading === item.name),
                name = !_.isEmpty(itemLabel) ? itemLabel.label : item.name === countValue ? countName : item.name;
            return {
                type: "value",
                name,
                offset: i > 1 ? 90 * (i - 1) : 0,
                splitLine: {
                    show: false
                },
                min: automaticMin,
                axisLabel: {
                    formatter: "{value}" + (item.units ? item.units : "")
                },
                axisLine
            };
        });
        return result;
    };

    getNomalYaxis = ({ ys, legend, readingLabel, countLabel, axisLine }) => {
        const result = ys.map((item, i) => {
            const currentLegend = _.find(legend, legend => legend.displayName === item),
                { units } = currentLegend || {};

            const itemLabel = _.find(readingLabel, it => it.reading === item),
                name = !_.isEmpty(itemLabel) ? itemLabel.label : item === countLabel.value ? countLabel.label : item;
            return {
                type: "value",
                name,
                offset: i > 1 ? 90 * (i - 1) : 0,
                splitLine: {
                    show: false
                },
                min: automaticMin,
                axisLabel: {
                    formatter: "{value}" + (units ? units : "")
                },
                axisLine
            };
        });
        return result;
    };

    getXaxis = (props, textColor) => {
        const format = props.timeFormat.join(" "),
            isValidTime = _.every(props.x, item => moment(item).isValid());
        // const xValues = _.map(props.x, item => {
        //     const value = moment(item).format(format);
        //     return format && value !== "Invalid date" ? value : item;
        // });
        return {
            type: isValidTime ? "time" : "category",
            data: props.x,
            axisLabel: {
                formatter: function(value) {
                    return isValidTime ? moment(value).format(format) : value;
                }
            },
            bottom: 10,
            axisLine: {
                lineStyle: {
                    color: textColor
                }
            }
        };
    };

    getMarkLine = (markLines, reading, switchXY) => {
        const axis = switchXY ? "xAxis" : "yAxis";
        return _.map(_.filter(markLines, value => value.reading === reading), val => {
            return {
                name: val.name,
                [axis]: val.value,
                label: {
                    normal: {
                        position: "end",
                        formatter: val.name,
                        fontWeight: "bold"
                    }
                },
                lineStyle: {
                    type: "solid",
                    width: 3,
                    color: val.color
                }
            };
        });
    };

    getYaxisCount = props => {
        const { legend, customizeReading, combineYaxis } = props,
            count = _.isEmpty(combineYaxis) ? legend : combineYaxis;
        return count ? count.length + (customizeReading ? customizeReading.length : 0) : 0;
    };

    getGrid = (switchXY, legendLen, timeFormat) => {
        const margin = legendLen > 2 ? (legendLen - 2) * 160 : "10%",
            format = timeFormat ? timeFormat.join(" ") : undefined;
        return {
            left: switchXY && timeFormat && format.length > 10 ? format.length * 8 : "10%",
            right: switchXY ? "10%" : margin,
            bottom: switchXY ? margin : 70
        };
    };

    dataZoom = (index, switchXY, textColor) => {
        const name = switchXY ? "yAxisIndex" : "xAxisIndex";
        return [
            {
                type: "inside",
                [name]: index,
                start: 0,
                end: 100
            },
            {
                show: true,
                [name]: index,
                type: "slider",
                bottom: switchXY ? "10%" : 15,
                right: switchXY ? 15 : "10%",
                start: 0,
                end: 100,
                textStyle: {
                    color: textColor
                }
            }
        ];
    };

    setOption = () => {
        const props = this.props,
            option = _.cloneDeep(originalOptions),
            { legendPosition, source, MuiTheme, switchXY, timeFormat, enableDataZoom } = props;
        const textColor = MuiTheme.typography.display1.color,
            backgroundColor = MuiTheme.palette.background.paper,
            countLabel = countName[source] || countName.default,
            newSeries = this.getSeries(props, countLabel),
            xAxis = this.getXaxis(props, textColor),
            yAxis = this.getYaxis(newSeries.ys, props, countLabel, textColor),
            legendLength = this.getYaxisCount(props);
        option.yAxis = switchXY ? xAxis : yAxis;
        option.xAxis = switchXY ? yAxis : xAxis;
        option.series = newSeries.series;
        option.legend = this.getLegend(props, countLabel, legendPosition, textColor);
        option.grid = this.getGrid(switchXY, legendLength, timeFormat);
        option.graphic = newSeries.series.length ? undefined : noDatagraphic(textColor);
        option.nameTextStyle = { color: textColor };
        option.dataZoom = enableDataZoom && this.dataZoom([0], switchXY, textColor);
        option.toolbox = toolbox(backgroundColor, props.title || "isc-chart", switchXY);
        return option;
    };

    render() {
        const { theme } = this.props;
        return (
            <div className="chart-line-bar">
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

export default LineBarChart;
