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
 * Created by xulu on 25/05/2018.
 */
import React from "react";
import "../styles/style.less";
import { SearchSelect } from "modules/common";
import { connect } from "react-redux";
import { REDUCER_NAME as topoFloatTabReducer } from "../funcs/constants";
import { reducerName as topoReducerName } from "modules/topologyManagement/topologyMgmtGrid";
import _ from "lodash";
import { topoSearchAddress, topoSearchLocation } from "../funcs/actions";

class LiveSearchSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            schemaKey: this.props.schemaKey,
            liveSearch: "",
            limit: 20,
            pageno: 1
        };
        this.timer = {};
        this.init = false;
    }

    componentDidMount() {
        const { identify, liveSearch, schemaKey, topoSearchLocation, topoSearchAddress } = this.props;
        const { limit, pageno } = this.state;
        let obj = {
            label: this.props.locationName,
            value: this.props.locationId
        };
        this.setState({ liveSearch: obj });
        if (schemaKey === "devicelocation") {
            topoSearchLocation(identify, liveSearch, limit, pageno, true);
        } else if (schemaKey === "deviceapplication") {
            topoSearchAddress(identify, liveSearch, limit, pageno, true);
        }
    }

    componentWillReceiveProps(nextProps) {
        const {
            liveSearch,
            locationClearSearch,
            addressClearSearch,
            addressPagination,
            locationPagination,
            schemaKey
        } = nextProps;
        let pagination = schemaKey === "devicelocation" ? locationPagination : addressPagination;
        let clearLiveSearch = schemaKey === "devicelocation" ? locationClearSearch : addressClearSearch;
        let addressData = nextProps.addressData;
        let locationData = nextProps.locationData;
        if (_.isBoolean(clearLiveSearch) && !clearLiveSearch) {
            addressData = nextProps.addressData ? _.concat(this.state.addressData, nextProps.addressData) : undefined;
            locationData = nextProps.locationData
                ? _.concat(this.state.locationData, nextProps.locationData)
                : undefined;
        }
        if (pagination) {
            const { totalpages, currentpage } = pagination;
            this.setState({
                locationData: locationData ? locationData : this.state.locationData,
                addressData: addressData ? addressData : this.state.addressData,
                pageno: totalpages > currentpage ? currentpage + 1 : currentpage,
                loading: false
            });
        }
        if (this.props.liveSearch !== liveSearch) {
            this.init = false;
        }
        if (
            (this.props.locationId !== nextProps.locationId && this.props.locationName !== nextProps.locationName) ||
            (this.props.showFloatTab !== nextProps.showFloatTab && nextProps.showFloatTab)
        ) {
            let obj = {
                label: nextProps.locationName,
                value: nextProps.locationId
            };
            this.setState({ liveSearch: obj });
        }
        if (liveSearch && locationData && addressData && !this.init) {
            let data = [];
            if (schemaKey === "devicelocation") {
                data = locationData;
            } else if (schemaKey === "deviceapplication") {
                data = addressData;
            }
            if (!data.length) {
                return;
            }
            this.init = true;
            let id = "";
            for (let i = 0; i < data.length; i++) {
                if (data[i]["address.name"] === liveSearch) {
                    id = data[i]["address.iotTopologyId"];
                } else if (data[i]["location.name"] === liveSearch) {
                    id = data[i]["location.iotTopologyId"];
                }
            }
            let obj = {
                label: liveSearch,
                value: id
            };
            this.setState({ liveSearch: obj });
        }
    }

    handleLocationLiveSearch(value) {
        const { identify, schemaKey, topoSearchLocation, topoSearchAddress } = this.props;
        clearTimeout(this.timer[identify]);
        this.timer[identify] = setTimeout(() => {
            this.setState(
                {
                    pageno: 1,
                    loading: true
                },
                () => {
                    const { limit, pageno } = this.state;
                    if (schemaKey === "devicelocation") {
                        topoSearchLocation(identify, value, limit, pageno, true);
                    } else if (schemaKey === "deviceapplication") {
                        topoSearchAddress(identify, value, limit, pageno, true);
                    }
                }
            );
        }, 300);
    }

    handleScrollToBtm = () => {
        const { limit, pageno, value } = this.state;
        const {
            addressPagination,
            locationPagination,
            identify,
            schemaKey,
            topoSearchLocation,
            topoSearchAddress
        } = this.props;
        let pagination = schemaKey === "devicelocation" ? locationPagination : addressPagination;
        if ((pagination && pagination.currentpage >= pagination.totalpages) || !pagination) {
            return;
        }
        clearTimeout(this.timer[identify]);
        this.timer[identify] = setTimeout(() => {
            this.setState({ loading: true }, () => {
                if (schemaKey === "devicelocation") {
                    topoSearchLocation(identify, value, limit, pageno, false);
                } else if (schemaKey === "deviceapplication") {
                    topoSearchAddress(identify, value, limit, pageno, false);
                }
            });
        }, 300);
    };

    handleLocationFilterSelect(value) {
        const { limit, pageno } = this.state;
        const { identify, schemaKey, topoSearchLocation, topoSearchAddress, liveSearchSelectFunc } = this.props;
        this.setState({ liveSearch: value });
        if (schemaKey === "devicelocation") {
            topoSearchLocation(identify, undefined, limit, pageno, true);
        } else if (schemaKey === "deviceapplication") {
            topoSearchAddress(identify, undefined, limit, pageno, true);
        }
        liveSearchSelectFunc(schemaKey, value && value.value);
    }

    render() {
        const { placeholder, schemaKey, schema } = this.props;
        const { loading, addressData, locationData } = this.state;
        const { handleScrollToBtm } = this;
        let data = schemaKey === "deviceapplication" ? addressData : locationData;
        let opts = _.map(data, item => {
            if (schemaKey === "deviceapplication") {
                return { value: item["address.iotTopologyId"], label: item["address.name"], tooltip:item["address.displayName"] };
            } else {
                return { value: item["location.iotTopologyId"], label: item["location.name"], tooltip:item["location.displayName"] };
            }
        });
        return (
            <SearchSelect
                onInputChange={this.handleLocationLiveSearch.bind(this)}
                placeholder={placeholder}
                onChange={this.handleLocationFilterSelect.bind(this)}
                label={schema.displayname}
                defaultValue={this.state.liveSearch}
                required={schema.mandatory}
                tooltip={schema.default}
                options={opts}
                onMenuScrollToBottom={handleScrollToBtm}
                isLoading={loading}
            />
        );
    }
}

LiveSearchSelect.propTypes = {};

LiveSearchSelect.defaultProps = {};

const filterProps = (state, identify, reducerName, props) => {
    if (state[reducerName] && state[reducerName][identify]) {
        return state[reducerName][identify][props];
    }
};

const mapStateToProps = (state, ownProps) => {
    let identify = ownProps.identify;
    return {
        addressData: filterProps(state, identify, topoFloatTabReducer, "addressData"),
        locationData: filterProps(state, identify, topoFloatTabReducer, "locationData"),
        basicTypes: filterProps(state, identify, topoReducerName, "basicTypes"),
        locationClearSearch: filterProps(state, identify, topoFloatTabReducer, "locationClearSearch"),
        addressClearSearch: filterProps(state, identify, topoFloatTabReducer, "addressClearSearch"),
        addressPagination: filterProps(state, identify, topoFloatTabReducer, "addressPagination"),
        locationPagination: filterProps(state, identify, topoFloatTabReducer, "locationPagination")
    };
};

const mapDispatchToProps = dispatch => {
    return {
        topoSearchAddress: (identify, address, limit, pageno, clearLiveSearch) => {
            dispatch(topoSearchAddress(identify, address, limit, pageno, clearLiveSearch));
        },
        topoSearchLocation: (identify, location, limit, pageno, clearLiveSearch) => {
            dispatch(topoSearchLocation(identify, location, limit, pageno, clearLiveSearch));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LiveSearchSelect);
