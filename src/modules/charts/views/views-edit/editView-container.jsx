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
import classnames from "classnames";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { REDUCER_NAME as reducerName } from "modules/charts/funcs/constants";
import { changeProperty, applyDefaultProps, getServiceListRequest } from "modules/charts/funcs/actions";
import { FullQuery } from "./editView-allSources";
import * as queryList from "./editComps";

class EditView extends Component {
    static propTypes = {
        identify: PropTypes.string.isRequired,
        source: PropTypes.string,
        type: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
    };
    componentDidMount() {
        const { get } = this.props;
        get && get(this);
    }
    componentWillReceiveProps(nextProps) {
        const { onPropsChange } = this.props;
        onPropsChange && onPropsChange(nextProps);
    }
    getData() {
        return this.props;
    }
    render() {
        const { configList, isLoading } = this.props;
        return (
            <div className={classnames("chart-queryBuilder", { "chart-noControl": isLoading })}>
                {queryList && configList ? (
                    _.map(configList, (item, i) => {
                        const Result = queryList[item];
                        return Result ? <Result key={i} {...this.props} /> : null;
                    })
                ) : (
                    <FullQuery {...this.props} />
                )}
            </div>
        );
    }
}
// EditView.defaultProps = defaultProps;
const mapStateToProps = (state, ownProps) => {
    const identify = ownProps.identify,
        store = (state[reducerName] && state[reducerName][identify]) || {};
    return store;
};

const mapDispatchToProps = dispatch => {
    return {
        applyDefaultProps: (identify, props) => {
            dispatch(applyDefaultProps(identify, props));
        },
        onChangeProperty: (identify, object) => {
            dispatch(changeProperty(identify, object));
        },
        onGetServiceList: (identify, sitename) => {
            dispatch(getServiceListRequest(identify, sitename));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditView);
