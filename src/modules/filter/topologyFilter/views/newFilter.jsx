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
 * Created by Wangrui on 25/05/2018.
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// import { Select, Spin } from "antd";
import { REDUCER_NAME as FilterReducer } from "../funcs/constants";
import { topologyFilterSearchRequest } from "../funcs/actions";
import { SearchSelect } from "modules/common";
import _ from "lodash";
import { APPLICATION_INFO_KEY } from "commons/constants/const";
// const Option = Select.Option;

let timer = null;

class Filter extends Component {
    currentApplication = sessionStorage.getItem(APPLICATION_INFO_KEY) && JSON.parse(sessionStorage.getItem(APPLICATION_INFO_KEY))["address.resourcePath"];
    static defaultProps = {
        placeholder: "Select",
        defaultValue: [],
        identify: Math.random(),
        arrayData: []
    };
    static propTypes = {
        getChoosedData: PropTypes.func.isRequired,
        placeholder: PropTypes.string,
        identify: PropTypes.any
    };
    state = {
        loading: false,
        data: [],
        num: 0,
        value: undefined,
        pagenator: { limit: 10, pageno: 1 }
    };
    componentWillMount() {
        const { dispatch } = this.props;
        if (this.state.loading) {
            return;
        }
        this.setState(
            {
                loading: true
            },
            () => {
                dispatch(topologyFilterSearchRequest("", this.state.pagenator, true,this.currentApplication));
            }
        );
    }
    handleSearch = value => {
        const { dispatch } = this.props;
        const { pagenator } = this.state;
        timer && clearTimeout(timer);
        timer = setTimeout(() => {
            this.setState(
                {
                    data: [],
                    loading: true,
                    value,
                    pagenator: { ...pagenator, pageno: 1 }
                },
                () => {
                    let pageinfo = this.state.pagenator;
                    dispatch(topologyFilterSearchRequest(value, pageinfo, true,this.currentApplication));
                }
            );
        }, 1000);
    };
    handleFilter = value => {
        clearTimeout(timer);
        const {getChoosedData} = this.props;
        getChoosedData&&getChoosedData(value);
    };
    componentWillReceiveProps(nextProps) {
        const { pagenator } = this.state;
        const { clear, arrayData, pagination } = nextProps;
        if (!pagination) {
            return;
        }
        if (
            !_.some(this.state.data, m => {
                return _.some(arrayData, d => d["physical.iotTopologyId"] === m["physical.iotTopologyId"]);
            })
        ) {
            const { totalpages, currentpage } = pagination;
            this.setState({
                loading: nextProps.loading,
                data: _.isBoolean(clear) ? (clear ? arrayData : _.concat(this.state.data, arrayData)) : arrayData,
                pagenator: { ...pagenator, pageno: totalpages > currentpage ? currentpage + 1 : currentpage }
            });
        } else {
            this.setState({
                loading: nextProps.loading,
                data: this.state.data.length ? this.state.data : arrayData
            });
        }
    }
    handleScrollToBtm = () => {
        const { pagenator, value } = this.state;
        const { dispatch, pagination } = this.props;
        if ((pagination && pagination.currentpage >= pagination.totalpages) || !pagination) {
            return;
        }
        timer && clearTimeout(timer);
        timer = setTimeout(() => {
            this.setState({ loading: true }, () => {
                dispatch(topologyFilterSearchRequest(value, pagenator, false,this.currentApplication));
            });
        }, 1000);
    };
    render() {
        const { loading, data } = this.state;
        const { handleScrollToBtm } = this;
        const { placeholder, defaultValue, identify, label, style, disabled, isMulti, value } = this.props;
        let opts = _.map(data, item => {
            return {
                value: item["physical.iotTopologyId"],
                devicemodel: item["devicemodel.iotTopologyId"],
                label: item["physical.displayName"],
                tooltip:item["physical.name"]
            };
        });
        return (
            <div id={`topology_id_filter${identify}`} style={{ width: "100%", ...style }}>
                <SearchSelect
                    placeholder={placeholder}
                    onMenuScrollToBottom={handleScrollToBtm}
                    isLoading={loading}
                    isDisabled={disabled}
                    onInputChange={this.handleSearch}
                    onChange={this.handleFilter}
                    label={label}
                    defaultValue={defaultValue}
                    isMulti={_.isBoolean(isMulti)?isMulti:true}
                    options={opts}
                    value={value}
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return state[FilterReducer] || {};
};

export default connect(mapStateToProps)(Filter);
