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
 * Created by Deng XiaoLong on 25/05/2018.
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { REDUCER_NAME as FilterReducer } from "../funcs/constants";
import { topologyFilterSearchRequest } from "../funcs/actions";
import { SearchSelect } from "modules/common";
import _ from "lodash";

let timer = null;

class Filter extends Component {
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
        num:0
    };
    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(topologyFilterSearchRequest(""));
    }
    handleSearch = value => {
        const { dispatch } = this.props;
        if (timer) {
            clearTimeout(timer);
        }
        this.setState({
            data: [],
            loading: true
        });
        timer = setTimeout(() => {
            dispatch(topologyFilterSearchRequest(value));
        }, 1000);
    };
    handleFilter = value => {
        clearTimeout(timer);
        this.props.getChoosedData(value);
    };
    componentWillReceiveProps(nextProps) {
        this.setState({
            loading: nextProps.loading,
            data: nextProps.arrayData
        });
    }
    render() {
        const { loading, data } = this.state;
        const { placeholder, defaultValue, identify, label, style, } = this.props;
        let opts = _.map(data, item => {
            return {
                value: item["address.iotTopologyId"],
                label: item["address.resourcePath"]
            };
        });
        return (
            <div id={`topology_id_filter${identify}`} style={{width: "100%", ...style}}>
                <SearchSelect
                    // onMenuScrollToBottom={handleScrollToBtm}
                    isLoading={loading}
                    isMulti
                    onInputChange={this.handleSearch}
                    placeholder={placeholder}
                    onChange={this.handleFilter}
                    label={label}
                    defaultValue={defaultValue}
                    options={opts}
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return state[FilterReducer] || {};
};

export default connect(mapStateToProps)(Filter);
