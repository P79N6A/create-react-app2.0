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
import { getDeviceCount } from "../funcs/analysisDatas";
import { changeUseState, topologyStaticRequest } from "../funcs/actions";
import { REDUCER_NAME as reducerName, defaultProps } from "../funcs/constants";

class View extends Component {
    static propTypes = {
        type: PropTypes.string,
        source: PropTypes.string,
        predicates: PropTypes.shape({
            keyList: PropTypes.array,
            grouping: PropTypes.string,
            dateRange: PropTypes.array,
            aggregation: PropTypes.string,
            iotIds: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.object), PropTypes.object])
        })
    };
    state = { xList: [], dataList: {}, keyList: [] };
    componentDidMount() {
        this.identify = this.props.identify;
        this.isNecessaryToCallApi(this.props, true);
    }

    componentWillReceiveProps(nextProps) {
        if (_.isEqual(nextProps, this.props)) {
            return;
        }
        this.isNecessaryToCallApi(nextProps, nextProps.refresh);
        this.isNecessaryToAnalysisData(nextProps);
    }

    isNecessaryToCallApi(nextProps, isNecessary) {
        if (nextProps.isLoading || (_.isEqual(nextProps.predicates, this.props.predicates) && !isNecessary)) {
            return;
        }
        const { identify } = this,
            { predicates, getTopologyStatic, onChangeProperty, currentApplicationInfo } = nextProps,
            { topologyResource } = predicates;
        if (topologyResource) {
            getTopologyStatic(identify, topologyResource, currentApplicationInfo["address.name"]);
            onChangeProperty(identify, { refresh: false });
        }
    }

    isNecessaryToAnalysisData(nextProps) {
        if (!nextProps.isNewData) {
            return;
        }
        const { data, predicates, source } = nextProps,
            { topologyResource } = predicates;
        const result = getDeviceCount(source, data, topologyResource);
        result &&
            this.setState({
                dataList: result.data,
                xList: result.xList ? result.xList : [],
                keyList: result.keyList ? result.keyList : []
            });
        this.props.changeUseState(this.identify, false);
    }

    render() {
        const { dataList, xList } = this.state,
            { type, timeFormat, legendPosition, title, theme, MuiTheme } = this.props,
            keyList = this.state.keyList.length ? this.state.keyList : this.props.predicates.keyList;
        const opt = {
            type,
            title,
            theme,
            MuiTheme,
            x: xList,
            timeFormat,
            data: dataList,
            legend: keyList || [],
            legendPosition
        };
        return <Chart {...this.props} options={opt} />;
    }
}
View.defaultProps = defaultProps;

const mapStateToProps = (state, ownProps) => {
    const identify = ownProps.identify,
        store = (state[reducerName] && state[reducerName][identify]) || {};
    return {
        data: store.data,
        type: store.type,
        theme: store.theme,
        title: store.title,
        refresh: store.refresh,
        isLoading: store.isLoading,
        isNewData: store.isNewData,
        predicates: store.predicates,
        timeFormat: store.timeFormat,
        legendPosition: store.legendPosition
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeUseState: (identify, state) => {
            dispatch(changeUseState(identify, state));
        },
        getTopologyStatic: (identify, resourceList, applicationInfo) => {
            dispatch(topologyStaticRequest(identify, resourceList, applicationInfo));
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(View);
