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
import { Select, Spin } from "antd";
import { REDUCER_NAME as FilterReducer } from "../funcs/constants";
import { topologyModelFilterSearchRequest } from "../funcs/actions";
const Option = Select.Option;

class Filter extends Component {
    static defaultProps = {
        placeholder: "Select",
        defaultValue: undefined,
        identify: Math.random(),
        arrayData: []
    }
    static propTypes = {
        getChoosedData: PropTypes.func.isRequired, 
        placeholder: PropTypes.string,
        identify: PropTypes.any
    }
    state = {
        loading: false,
        data: [],
    };
    // handleSearch = (value) => {
    //     const { dispatch } = this.props;
    //     if (timer) {
    //         clearTimeout(timer);
    //     }
    //     timer = setTimeout(() => {
    //         dispatch(topologyModelFilterSearchRequest(value));
    //     }, 300);
    // };
    handleFilter = (value) => {
        // this.setState({
        //     data: [],
        //     fetching: false
        // });
        this.props.getChoosedData(value);
    };
    componentWillMount(){
        const { dispatch } = this.props;
        dispatch(topologyModelFilterSearchRequest());
    }
    componentWillReceiveProps(nextProps) {
        // console.log(nextProps.arrayData);
        this.setState({
            loading: nextProps.loading,
            data: nextProps.arrayData
        });
    };
    render() {
        const { loading, data } = this.state;
        const { placeholder, defaultValue, identify } = this.props;
        return (
            <div id={`topology_model_filter${identify}`} style={{width: "100%"}}> 
                <Select
                    // mode="multiple"
                    multiple={false}
                    allowClear={true}
                    defaultValue ={defaultValue}
                    labelInValue
                    placeholder={placeholder}
                    notFoundContent={loading ? <Spin size="small" /> : null}
                    filterOption={false}
                    // onSearch={this.handleSearch}
                    onChange={this.handleFilter}
                    style={{width: "100%"}}
                >
                    { 
                        data.length > 0 ? data.map(item => {
                            return(
                                <Option key={item["devicemodel.iotTopologyId"]}>
                                    {item["devicemodel.displayName"]}
                                </Option>
                            );
                        }):defaultValue && defaultValue.map(item => {
                            return(
                                <Option key={item.key}>
                                    {item.label}
                                </Option>
                            );
                        }) 
                    }
                </Select>
            </div>            
        );
    }
}

const mapStateToProps = state => {
    return state[FilterReducer] || {};
};


export default connect(mapStateToProps)(Filter);
