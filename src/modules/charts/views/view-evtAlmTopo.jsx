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
import "../styles/chart.less";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import React, { Component } from "react";
import Chart from "./views-chart/container";
import getTimeString from "commons/utils/isc8601Generator";
import { REDUCER_NAME as reducerName, defaultProps } from "../funcs/constants";

import { alarmRequest, eventRequest, topologyRequest } from "../funcs/actions";
import { changeUseState, deviceModelPropertyRequest } from "../funcs/actions";

import { getAggData, getCountData, getDetailData } from "../funcs/analysisDatas";
import { getPropertyData, getEvtAggWithoutInterval } from "../funcs/analysisDatas";

class View extends Component {
    static propTypes = {
        switchXY: PropTypes.bool,
        type: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
        source: PropTypes.string,
        markLines: PropTypes.array,
        enableDataZoom: PropTypes.bool,
        predicates: PropTypes.shape({
            keyList: PropTypes.array,
            dateRange: PropTypes.array,
            interval: PropTypes.string,
            grouping: PropTypes.string,
            aggregation: PropTypes.string,
            iotIds: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.object), PropTypes.object])
        })
    };

    state = { xList: [], dataList: {}, keyList: [] };

    componentDidMount() {
        const { identify } = this.props;
        this.identify = identify;
        this.isNecessaryToCallApi(this.props, true);
    }

    componentWillReceiveProps(nextProps) {
        if (_.isEqual(nextProps, this.props)) {
            return;
        }
        const { predicates } = nextProps,
            { iotIds } = predicates;
        if (!_.isEqual(iotIds, this.props.predicates.iotIds)) {
            const devicemodels = _.isPlainObject(iotIds) ? [iotIds.devicemodel] : _.map(iotIds, iot => iot.devicemodel);
            this.props.getDeviceProperty(this.identify, devicemodels);
            // this.props.getTopology(this.identify, iotIds);
        }
        this.isNecessaryToCallApi(nextProps, nextProps.refresh);
        this.isNecessaryToAnalysisData(nextProps);
    }

    checkCallAPICondition = props => {
        const { predicates, source } = props,
            { iotIds, keyList, interval, aggregation, dateRange } = predicates;

        const isDeviceEqual = _.isEmpty(iotIds) || _.isEqual(iotIds, this.props.predicates.iotIds),
            countCondition = aggregation === "COUNT" && (interval ? dateRange.length : true),
            notCountCondition = aggregation !== "COUNT" && !_.isEmpty(keyList) && (interval ? dateRange.length : true);

        return (
            (!_.isEmpty(keyList) && source === "topology") ||
            (source !== "topology" && (aggregation === "None" || countCondition || notCountCondition || !isDeviceEqual))
        );
    };

    isNecessaryToCallApi = (nextProps, isNecessary) => {
        const { identify } = this,
            { onChangeProperty, currentApplicationInfo } = nextProps,
            { predicates, getAlarm, getEvent, getTopology, source } = nextProps,
            { grouping, iotIds, keyList, interval, aggregation, dateRange } = predicates;

        const needCallAPI = this.checkCallAPICondition(nextProps);
        const appName = currentApplicationInfo ? currentApplicationInfo["address.name"] : "";
        const noChange = _.isEqual(predicates, this.props.predicates) && _.isEqual(source, this.props.source);
        if (nextProps.isLoading || !needCallAPI || (noChange && !isNecessary)) {
            return;
        }

        const src = {
            alarm: getAlarm,
            event: getEvent,
            topology: getTopology
        };

        const grp = grouping === "None" ? undefined : grouping,
            agg = aggregation === "None" ? undefined : aggregation,
            selectedKeys = _.map(keyList, n => n.displayName),
            date = dateRange && dateRange.length === 1 ? [getTimeString(dateRange[0])] : dateRange;

        src[source] && src[source](identify, appName, iotIds, date, selectedKeys, agg, interval, grp);
        onChangeProperty(identify, { refresh: false });
    };

    isNecessaryToAnalysisData = nextProps => {
        const { isNewData, data, predicates, source, customizeReading } = nextProps,
            { grouping, iotIds, keyList, interval, aggregation } = predicates;
        if (!isNewData && (_.isEmpty(customizeReading) || _.isEqual(customizeReading, this.props.customizeReading))) {
            return;
        }
        const result = this.analysisData({
            data,
            iotIds,
            interval,
            type: source,
            customizeReading,
            property: keyList,
            group: grouping === "None" ? undefined : grouping,
            aggregation: aggregation === "None" ? undefined : aggregation
        });
        result &&
            this.setState({
                dataList: result.data,
                xList: result.xList ? result.xList : [],
                keyList: result.keyList ? result.keyList : []
            });
        this.props.changeUseState(this.identify, false);
    };

    analysisData = options => {
        const that = this,
            { type } = options,
            { getEvtAlmData } = this,
            mappping = {
                topology: getPropertyData,
                alarm: getEvtAlmData.bind(that),
                event: getEvtAlmData.bind(that)
            };
        return mappping[type] && mappping[type](options);
    };
    getEvtAlmData = ({ data, property, iotIds, group, aggregation, interval, customizeReading, type }) => {
        if (!aggregation && property && property.length) {
            return getDetailData(data, property, customizeReading);
        } else if (aggregation) {
            if (aggregation === "COUNT") {
                return getCountData(type, data, interval, group, iotIds);
            } else if (property && property.length && interval) {
                return getAggData(data, property, iotIds);
            } else if (property && property.length && !interval) {
                return getEvtAggWithoutInterval(data, property, group, iotIds);
            }
        } else {
            return {
                data: {},
                xList: []
            };
        }
    };

    render() {
        const { dataList, xList } = this.state,
            { type, timeFormat, legendPosition, title, theme, gauge, switchXY, enableDataZoom } = this.props,
            { predicates, customizeReading, source, MuiTheme, readingLabel, combineYaxis } = this.props,
            iotIds = predicates.iotIds,
            keyList = this.state.keyList.length ? this.state.keyList : this.props.predicates.keyList;
        const opt = {
            type,
            title,
            theme,
            gauge,
            source,
            iotIds,
            switchXY,
            MuiTheme,
            x: xList,
            timeFormat,
            readingLabel,
            combineYaxis,
            enableDataZoom,
            data: dataList,
            customizeReading,
            legendPosition,
            legend: keyList || []
        };
        return <Chart {...this.props} options={opt} />;
    }
}
View.defaultProps = defaultProps;

const mapStateToProps = (state, ownProps) => {
    const identify = ownProps.identify;
    const store = (state[reducerName] && state[reducerName][identify]) || {};
    return {
        data: store.data,
        type: store.type,
        theme: store.theme,
        title: store.title,
        gauge: store.gauge,
        source: store.source,
        refresh: store.refresh,
        switchXY: store.switchXY,
        isNewData: store.isNewData,
        isLoading: store.isLoading,
        markLines: store.markLines,
        predicates: store.predicates,
        timeFormat: store.timeFormat,
        combineYaxis: store.combineYaxis,
        readingLabel: store.readingLabel,
        enableDataZoom: store.enableDataZoom,
        legendPosition: store.legendPosition,
        customizeReading: store.customizeReading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeUseState: (identify, state) => {
            dispatch(changeUseState(identify, state));
        },
        getDeviceProperty: (identify, devicemodels) => {
            dispatch(deviceModelPropertyRequest(identify, devicemodels));
        },
        getTopology: (identify, application, iotIds) => {
            dispatch(topologyRequest(identify, application, iotIds));
        },
        getAlarm: (identify, application, iotIds, dateRange, keyList, aggregation, interval, group) => {
            dispatch(alarmRequest(identify, application, iotIds, dateRange, keyList, aggregation, interval, group));
        },
        getEvent: (identify, application, iotIds, dateRange, keyList, aggregation, interval, group) => {
            dispatch(eventRequest(identify, application, iotIds, dateRange, keyList, aggregation, interval, group));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(View);
