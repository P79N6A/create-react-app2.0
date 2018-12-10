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
 * Created by XiaoLong on 25/05/2018.
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { List, Checkbox, Pagination, Tooltip } from "antd";
import "./../styles/style.less";

const CheckboxGroup = Checkbox.Group;
export default class ListWithCheckbox extends Component {
    static defaultProps = {
        columns: [{}],
        dataSource: [{}],
        pagination: {},
        paginationChange: () => {}
    };
    static propTypes = {
        getCheckedList: PropTypes.func.isRequired,
        columns: PropTypes.arrayOf(PropTypes.object),
        dataSource: PropTypes.arrayOf(PropTypes.object),
        loading: PropTypes.bool.isRequired,
        pagination: PropTypes.object,
        paginationChange: PropTypes.func
    };
    state = {
        checkAll: false,
        checkedList: []
    };
    // change all status change
    checkAllChange = e => {
        const { dataSource } = this.props;
        const { checked } = e.target;
        this.setState(
            {
                checkAll: checked,
                checkedList: checked ? dataSource : []
            },
            () => {
                this.props.getCheckedList(this.state.checkedList);
            }
        );
    };
    // single change
    onChange = checkedList => {
        const { dataSource } = this.props;
        this.setState({
            checkedList,
            checkAll: checkedList.length === dataSource.length
        });
        this.props.getCheckedList(checkedList);
    };
    // pagination change
    paginationChange = (page, pageSize) => {
        this.props.paginationChange(page, pageSize);
    };
    render() {
        const { checkAll, checkedList } = this.state;
        const { dataSource, columns, loading, pagination } = this.props;
        return (
            <div className="list_checkbox_wrap">
                <div className="list_checkbox_title">
                    <Checkbox checked={checkAll} onChange={this.checkAllChange}>
                        {columns.map(item => (
                            <span key={item.key} className={item.className || ""}>
                                {item.title}
                            </span>
                        ))}
                    </Checkbox>
                </div>
                {dataSource ? (
                    <div className="list_checkbox_body">
                        <CheckboxGroup value={checkedList} onChange={this.onChange}>
                            <List
                                dataSource={dataSource}
                                loading={loading}
                                renderItem={(item, index) => (
                                    <List.Item key={item.id}>
                                        <Checkbox value={item} key={item.id}>
                                            {columns.map(items => (
                                                <Tooltip
                                                    title={item[items.dataIndex]}
                                                    placement="bottom"
                                                    key={items.key}
                                                >
                                                    <span key={items.key} className={items.className || ""}>
                                                        {item[items.dataIndex] || ""}
                                                    </span>
                                                </Tooltip>
                                            ))}
                                        </Checkbox>
                                    </List.Item>
                                )}
                            />
                        </CheckboxGroup>
                        {JSON.stringify(pagination) === "{}" ? (
                            ""
                        ) : (
                            <Pagination
                                total={pagination.total}
                                onChange={this.paginationChange}
                                pageSize={pagination.pageSize}
                            />
                        )}
                    </div>
                ) : (
                    "No Data"
                )}
            </div>
        );
    }
}
