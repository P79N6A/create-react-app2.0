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
import { REDUCER_NAME as FilterReducer } from "../funcs/constants";
import { topologyModelFilterSearchRequest } from "../funcs/actions";
import { SearchSelect } from "modules/common";
import _ from "lodash";

let timer = null;

class Filter extends Component {
    static defaultProps = {
        placeholder: "Select DeviceModel",
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
        value: undefined,
        pagenator: { limit: 10, pageno: 1 }
    };
    componentDidMount() {
        const { dispatch } = this.props;
        if (this.state.loading) {
            return;
        }
        this.setState(
            {
                loading: true
            },
            () => {
                dispatch(topologyModelFilterSearchRequest("", this.state.pagenator, true));
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
                    const pageinfo = this.state.pagenator;
                    dispatch(topologyModelFilterSearchRequest(value, pageinfo, true));
                }
            );
        }, 1000);
    };
    handleFilter = value => {
        clearTimeout(timer);
        this.props.getChoosedData(value);
    };
    componentWillReceiveProps(nextProps) {
        const { clear, arrayData, pagination } = nextProps;
        const { pagenator } = this.state;
        if (!pagination) {
            return;
        }
        if (
            !_.some(this.state.data, m => {
                return _.some(arrayData, d => d["devicemodel.iotTopologyId"] === m["devicemodel.iotTopologyId"]);
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
                dispatch(topologyModelFilterSearchRequest(value, pagenator, false));
            });
        }, 1000);
    };
    render() {
        const { loading, data } = this.state;
        const { handleScrollToBtm } = this;
        const { placeholder, defaultValue, identify, label,disabled,isMulti, value } = this.props;
        let opts = _.map(data, item => {
            return { value: item["devicemodel.iotTopologyId"], label: item["devicemodel.displayName"] };
        });
        return (
            <div id={`topology_model_filter${identify}`} style={{ width: "100%" }}>
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
