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
import { connect } from "react-redux";
import React, { Component } from "react";
import Chart from "./views-chart/container";
import { ISC_ACCOUNT_INFO } from "commons/constants/const";
import { REDUCER_NAME as reducerName } from "../funcs/constants";
import { changeUseState, kpiPreviewRequest, kpiServiceRequest } from "../funcs/actions";

class ViewForKpi extends Component {
    static propTypes = {
        // data:PropTypes.array,
        title: PropTypes.string,
        refresh: PropTypes.bool,
        theme: PropTypes.string,
        timeFormat: PropTypes.array,
        yParameter: PropTypes.array,
        xParameter: PropTypes.string,
        kpiPredicate: PropTypes.object,
        identify: PropTypes.string.isRequired,
        changeUseState: PropTypes.func.isRequired,
        onChangeProperty: PropTypes.func.isRequired,
        getKpiServiceData: PropTypes.func.isRequired,
        type: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
    };

    state = { dataList: {}, xList: [] };
    siteName =
        sessionStorage.getItem(ISC_ACCOUNT_INFO) && JSON.parse(sessionStorage.getItem(ISC_ACCOUNT_INFO)).displayname;

    componentWillMount() {
        this.isNecessaryToCallKpi(this.props, true);
    }
    shouldComponentUpdate(newProps, newState) {
        const { dataList, xList, legend } = newState,
            result = dataList && xList && legend ? true : false;
        return result;
    }
    componentWillReceiveProps(nextProps) {
        if (_.isEqual(nextProps, this.props)) {
            return;
        }
        this.isNecessaryToCallKpi(nextProps, nextProps.refresh);
        this.isNecessaryToAnalysisData(nextProps);
    }

    isNecessaryToCallKpi(nextProps, isNecessary) {
        const { identify, kpiPredicate, getKpiServiceData, onChangeProperty, currentApplicationInfo } = nextProps;
        if ((_.isEqual(kpiPredicate, this.props.kpiPredicate) || !_.every(kpiPredicate)) && !isNecessary) {
            return;
        }
        const kpiName = kpiPredicate.configname;
        kpiName && getKpiServiceData(identify, kpiName, currentApplicationInfo["address.name"]);
        kpiName && onChangeProperty(identify, { refresh: false });
    }

    // isNecessaryToCallKpi(nextProps, isNecessary) {
    //     const { identify, kpiPredicate, getKpiPreview, onChangeProperty } = nextProps;
    //     if ((_.isEqual(kpiPredicate, this.props.kpiPredicate) || !_.every(kpiPredicate)) && !isNecessary) {
    //         return;
    //     }
    //     const predicate = kpiPredicate.configvals ? JSON.parse(kpiPredicate.configvals[0].configval) : {};
    //     const { Type, format, kpiQuery } = predicate;
    //     if (Type && format && kpiQuery) {
    //         getKpiPreview(identify, Type, format, kpiQuery, this.siteName);
    //         onChangeProperty(identify, { refresh: false });
    //     }
    // }

    isNecessaryToAnalysisData(nextProps) {
        const { xParameter, yParameter, data, identify } = nextProps;
        if (xParameter && yParameter && data) {
            const legend = yParameter;
            let dataList = { All: {} };
            _(legend).forEach(item => {
                dataList.All[item] = data[item];
            });
            const xList = data[xParameter];

            this.setState({ dataList, xList, legend });
            this.props.changeUseState(identify, false);
            // this.props.changeUseState(nextProps.identify, false);
        }
    }

    render() {
        const { type, timeFormat, legendPosition, title, theme, MuiTheme } = this.props,
            { dataList, xList, legend } = this.state;
        const opt = {
            type,
            title,
            theme,
            x: xList,
            MuiTheme,
            timeFormat,
            data: dataList,
            legend: legend || [],
            legendPosition
        };
        return <Chart {...this.props} options={opt} />;
    }
}
const mapStateToProps = (state, ownProps) => {
    const identify = ownProps.identify,
        store = (state[reducerName] && state[reducerName][identify]) || {};
    return {
        data: store.data,
        type: store.type,
        title: store.title,
        theme: store.theme,
        refresh: store.refresh,
        isNewData: store.isNewData,
        timeFormat: store.timeFormat,
        kpiObjectId: store.kpiObjectId,
        kpiPredicate: store.kpiPredicate,
        xParameter: store.xParameter,
        yParameter: store.yParameter,
        legendPosition: store.legendPosition
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeUseState: (identify, state) => {
            dispatch(changeUseState(identify, state));
        },
        getKpiServiceData: (identify, kpiName, sitename) => {
            dispatch(kpiServiceRequest(identify, kpiName, sitename));
        },
        getKpiPreview: (identify, serviceType, format, kpiQuery, sitename) => {
            dispatch(kpiPreviewRequest(identify, serviceType, format, kpiQuery, sitename));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ViewForKpi);
