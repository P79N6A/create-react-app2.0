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

import ViewForKpi from "./view-kpi";
import ViewForEvtAlmTopo from "./view-evtAlmTopo";
import ViewForTopoStatistic from "./view-topoStatistic";

import { Export, Refresh } from "./funcs-plugin";
import { REDUCER_NAME as reducerName, defaultProps } from "../funcs/constants";
import { applyDefaultProps, changeProperty, autoRefreshInit } from "../funcs/actions";

const Chart = props => {
    const viewMapping = {
        kpi: <ViewForKpi {...props} />,
        alarm: <ViewForEvtAlmTopo {...props} />,
        event: <ViewForEvtAlmTopo {...props} />,
        topology: <ViewForEvtAlmTopo {...props} />,
        topologyStatic: <ViewForTopoStatistic {...props} />
    };
    return viewMapping[props.source] ? viewMapping[props.source] : <ViewForEvtAlmTopo {...props} />;
};

class View extends Component {
    static propTypes = {
        identify: PropTypes.string.isRequired,
        autoRefreshInit: PropTypes.func.isRequired,
        applyDefaultProps: PropTypes.func.isRequired
    };
    componentWillMount() {
        const { identify, applyDefaultProps, autoRefreshInit } = this.props;
        applyDefaultProps(identify, this.props);
        autoRefreshInit(identify);
    }
    componentWillReceiveProps(nextProps) {
        if (!_.isEqual(nextProps, this.props)) {
            this.props.applyDefaultProps(nextProps.identify, nextProps);
        }
    }
    render() {
        const { identify, onChangeProperty, currentApplicationInfo, isLoading } = this.props;
        return (
            <div className="chart-allWh">
                <Chart {...this.props} />
                <Export
                    identify={identify}
                    onChangeProperty={onChangeProperty}
                    currentApplicationInfo={currentApplicationInfo}
                />
                <Refresh identify={identify} onChangeProperty={onChangeProperty} isLoading={isLoading} />
            </div>
        );
    }
}
View.defaultProps = defaultProps;

const mapStateToProps = (state, ownProps) => {
    const { identify } = ownProps,
        store = (state[reducerName] && state[reducerName][identify]) || {};
    return {
        source: store.source || ownProps.source
    };
};

const mapDispatchToProps = dispatch => {
    return {
        applyDefaultProps: (identify, props) => {
            dispatch(applyDefaultProps(identify, props));
        },
        onChangeProperty: (identify, object) => {
            dispatch(changeProperty(identify, object));
        },
        autoRefreshInit: (identify, timer) => {
            dispatch(autoRefreshInit(identify, timer));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(View);
