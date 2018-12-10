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
 * Created by Luo Jia on 25/05/2018.
 * Modified by Luo Jia on 25/05/2018.
 */
import React from "react";
import PropTypes from "prop-types";
import { SearchSelect } from "../../common/index";
import * as actions from "../../funcs/actions";
import store from "commons/store";
import _ from "lodash";
let timers = null;
class SearchSelects extends React.Component {
    componentDidMount() {
        const { groupSearchData, getAccountGroupList } = this.props;
        getAccountGroupList(groupSearchData, true);
    }
    state = {
        groupvalue: null
    };
    componentWillReceiveProps(nextProps) {
        const { account } = nextProps;
        if (_.isEqual(account, this.props.account) || !account.id) return;
        this.setState({
            groupvalue: { value: account.group, label: account.group }
        });
        this.handleFilter({ label: account.group, value: account.group });
        this.props.getGroupValue(account.group);
    }
    componentDidUpdate(nextProps, nextState) {
        if (_.isEqual(nextProps.opts, this.props.opts) && _.isEqual(nextState, this.state)) return false;
        return true;
    }
    handleSearch = grpname => {
        let groupSearchData = Object.assign({}, this.props.groupSearchData, { grpname, pageno: 1 });
        timers && clearTimeout(timers);
        this.setState({
            data: [],
            loading: true,
            disabled: true
        });
        timers = setTimeout(() => {
            store.dispatch(actions.reset({ groupSearchData }));
            store.dispatch(actions.getAccountGroupList(groupSearchData, true));
        }, 1000);
    };
    handleFilter = selected => {
        clearTimeout(timers);
        let value = selected ? selected.value : "";
        this.setState(
            {
                groupvalue: { label: value, value: value }
            },
            () => {
                this.props.getGroupValue(value);
            }
        );
    };
    handleScrollToBtm = () => {
        const { pageno = 1, totalpages = 1 } = this.props.groupSearchData;
        if (totalpages < pageno + 1) return;
        let groupSearchData = Object.assign({}, this.props.groupSearchData, { pageno: pageno + 1 });
        timers && clearTimeout(timers);
        timers = setTimeout(() => {
            this.setState(
                {
                    loading: true,
                    disabled: true
                },
                () => {
                    store.dispatch(actions.reset({ groupSearchData }));
                    store.dispatch(actions.getAccountGroupList(groupSearchData, true));
                }
            );
        }, 1000);
    };
    render() {
        const { label = "Account Group", placeholder, opts = [], drawerLoading = false } = this.props;
        const { groupvalue } = this.state;
        let options = opts.map(n => {
            if (typeof n === "string") {
                return {
                    label: n,
                    value: n
                };
            } else {
                return {
                    label: n.configname,
                    value: n.configname
                };
            }
        });
        options = _.uniq(options.concat(groupvalue ? groupvalue : []).map(n => JSON.stringify(n))).map(n =>
            JSON.parse(n)
        );
        return (
            <div style={{ marginTop: 16, marginBottom: 16 }}>
                <SearchSelect
                    placeholder={placeholder}
                    onMenuScrollToBottom={this.handleScrollToBtm}
                    isLoading={drawerLoading}
                    // isDisabled={disabled}
                    onInputChange={this.handleSearch}
                    onChange={this.handleFilter}
                    label={label}
                    value={groupvalue}
                    options={options}
                    isMulti={false}
                    required
                    // onSearch={this.handleSearch}
                    // placeholder={placeholder}
                    // onChange={this.handleFilter}
                    // label={label}
                    // value={groupvalue}
                    // selectProps={{
                    //     isLoading: drawerLoading,
                    //     multi: false,
                    //     openOnFocus: true,
                    //     autoBlur: true,
                    //     // disabled: disabled,
                    //     onMenuScrollToBottom: this.handleScrollToBtm
                    //     // onFocus: this.handleFocus
                    // }}
                    // options={options}
                    // required
                />
            </div>
        );
    }
}
SearchSelects.defaultProps = {};
SearchSelects.propTypes = {
    classes: PropTypes.object
};
export default SearchSelects;
