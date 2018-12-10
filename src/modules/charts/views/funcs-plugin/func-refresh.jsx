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
 * Created by kaidi on 25/06/2018.
 */

import _ from "lodash";
import moment from "moment";
import { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import getTimeString from "commons/utils/isc8601Generator";
import { eventSuccess } from "modules/charts/funcs/actions";
import { REDUCER_NAME as reducerName, wsMap } from "modules/charts/funcs/constants";

class WsRefreshComps extends Component {
    static propTypes = {
        source: PropTypes.string,
        timeMode: PropTypes.string,
        wsMessage: PropTypes.object,
        predicates: PropTypes.object,
        autoRefreshTime: PropTypes.number,
        // refreshCount: PropTypes.number,
        // isLoading: PropTypes.bool.isRequired,
        type: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
        data: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
    };
    timer = null;
    autoRefresh = null;

    componentWillReceiveProps(nextProps) {
        if (_.isEqual(nextProps, this.props)) {
            return;
        }
        const { wsMessage } = nextProps;
        !_.isEqual(wsMessage, this.props.wsMessage) && this.wsMsg(nextProps);
        this.setAutoRefresh(nextProps);
        // !_.isEqual(refreshCount, this.props.refreshCount) && this.refreshData(nextProps);
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
        clearTimeout(this.autoRefresh);
    }

    setAutoRefresh = props => {
        const { autoRefreshTime, isLoading } = props;
        if (!autoRefreshTime) {
            return;
        }
        clearTimeout(this.autoRefresh);
        this.autoRefresh = setTimeout(() => {
            this.refreshData(props);
            !isLoading && this.setAutoRefresh(props);
        }, autoRefreshTime);
    };

    wsMsg(nextProps) {
        const { source, wsMessage } = nextProps,
            category = wsMessage ? wsMessage["header-category"] : "";
        if (category === "ISC" + wsMap[source]) {
            this.analysisWsData(nextProps);
        }
    }

    analysisWsData(nextProps) {
        const { wsMessage, predicates, source, timeMode, isLoading, type } = nextProps,
            { iotIds, keyList, aggregation } = predicates || {},
            { data } = wsMessage || {},
            { eventtype } = data;
        const updateCountList = ["create_device", "delete_device"];
        const haveDevice =
            data.parameters &&
            data.parameters.deviceid &&
            !_.isEmpty(iotIds) &&
            _.some(iotIds, dev => dev.value === data.parameters.deviceid || dev === data.parameters.deviceid);
        const haveKeys = data.parameters
            ? _.some(keyList, key => _.includes(_.keys(data.parameters), key.displayName))
            : false;

        const noAggregation = !aggregation || aggregation === "None",
            isTopoGauge = source === "topology" && type === "gauge",
            isDevReading = source === "event" && timeMode === "realTime",
            isAlarmCount = source === "alarm" && aggregation === "COUNT",
            isEvtCount = source === "event" && (haveDevice || aggregation === "COUNT"),
            isDevCount = source === "topologyStatic" && updateCountList.indexOf(eventtype) > -1;

        if (!isLoading && haveDevice && haveKeys && noAggregation && (isDevReading || isTopoGauge)) {
            this.insertData(nextProps);
        } else if (!isLoading && (isEvtCount || isAlarmCount || isDevCount)) {
            this.refreshData(nextProps);
        }
    }

    refreshData = ({ identify, onChangeProperty }) => {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            onChangeProperty(identify, { refresh: true });
        }, 4000);
    };

    insertData({ identify, source, wsMessage, predicates, data, insertData }) {
        const newData = wsMessage.data,
            { dateRange } = predicates,
            times = _.map(dateRange, time => getTimeString(time)),
            newTime = newData.statdatetime || newData.sentdatetime,
            flag = times.length > 1 ? moment(newTime).isBetween(...times) : moment(newTime).isAfter(...times);
        if (source !== "topology" && flag) {
            const brandNewData = _.filter(data, d => {
                const t = d.statdatetime || d.sentdatetime,
                    result = times.length > 1 ? moment(t).isBetween(...times) : moment(t).isAfter(...times);
                return result;
            });
            insertData(identify, [...brandNewData, newData]);
        } else if (source === "topology" && newData.parameters && newData.parameters.deviceid) {
            insertData(identify, { ...data, [newData.parameters.deviceid]: newData.parameters });
        }
    }

    render() {
        return null;
    }
}

const mapStateToProps = (state, ownProps) => {
    const identify = ownProps.identify,
        store = (state[reducerName] && state[reducerName][identify]) || {};
    return {
        type: store.type,
        data: store.data,
        source: store.source,
        timeMode: store.timeMode,
        isLoading: store.isLoading,
        predicates: store.predicates,
        autoRefreshTime: store.autoRefreshTime,
        // refreshCount: store.refreshCount,
        wsMessage: state[reducerName] && state[reducerName].wsMessage
    };
};

const mapDispatchToProps = dispatch => {
    return {
        insertData: (identify, data) => {
            dispatch(eventSuccess(identify, data));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WsRefreshComps);
