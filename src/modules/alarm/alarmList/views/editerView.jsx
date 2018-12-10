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
 * Created by SongCheng on 20/05/2018.
 */
import React, { Component } from "react";
import "../styles/style.less";
import { connect } from "react-redux";
import { editorControlProps, getItemsRequest, saveItemsData, requestParameters } from "../funcs/actions";
// import { reducerName as topoReducerName } from "modules/alarm/alarmList";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { TextField, InputLabel, Select } from "modules/common";
import CommonSelect from "./commonSelect";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import _ from "lodash";
import { handleDataForRequest } from "modules/alarm/alarmSearch/funcs/filter";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import FilterConfig from "./filterConfig";
import { actions as msg } from "modules/messageCenter";
// import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

const ITEM_HEIGHT = 48;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5
        }
    }
};
class EditerView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props,
            filterDataList: [
                {
                    filter: "Alarm Id",
                    parameterValue: "",
                    operator: "end with",
                    value: "",
                    dateTime: []
                }
            ]
        };
    }

    componentWillMount() {
        this.props.get && this.props.get(this);
        this.props.editorControlProps(this.state);
        this.setState({
            ...this.props
        });
    }

    //handle titlt and sub-title
    handleTitleInputChanged = (propertyType, event) => {
        this.setState(
            Object.assign(this.state, {
                [propertyType]: !event.target.value ? " " : event.target.value
            })
        );
        this.props.editorControlProps(this.state);
    };

    // handle sort and pageLimit
    handleInputSelectChanged(propertyType, event) {
        if (propertyType === "currentSortBy") {
            let currentSortBy = this.checkCurrentSortBy(event.target.value);
            this.setState(
                Object.assign(this.state, {
                    orderBy: currentSortBy,
                    orderDisplayName: event.target.value
                })
            );
        } else {
            this.setState(
                Object.assign(this.state, {
                    [propertyType]: event.target.value
                })
            );
        }

        if (propertyType === "pageLimit") {
            this.getItemsSearch(1, event.target.value, this.state.filterDataList);
        }

        let sorterData = [
            {
                ascending: this.state.order === "desc" ? false : true,
                sortfield: "capevent." + this.state.orderBy
            }
        ];
        this.setState(
            {
                sorterData
            },
            () => {
                this.props.editorControlProps(this.state);
            }
        );
    }
    checkCurrentSortBy(sortBy) {
        let sortLists = this.props.sortLists;
        let currentSortBy = "";
        _.forEach(sortLists, list => {
            if (list.displayName === sortBy) {
                currentSortBy = list.key;
            }
        });

        return currentSortBy;
    }
    matchOrderBy(val) {
        let sortLists = this.props.sortLists;
        let currentSortBy = "";
        _.forEach(sortLists, list => {
            if (list.key === val) {
                currentSortBy = list.sortName;
            }
        });

        return currentSortBy;
    }

    // handle columns
    handleColumnSelectChange(selectTypeName, selectValue) {
        if (selectTypeName === "Default Selected Columns") {
            var defaultColumns = this.state.columnConfig.slice(0);
            let columns = this.checkCurrentColumns(defaultColumns, selectValue);
            let selectedColumn = columns.filter(item => {
                return item.defaultSelect ? columns : null;
            });

            this.setState(
                {
                    columnConfig: columns,
                    columns: selectedColumn
                },
                () => {
                    this.props.editorControlProps(this.state);
                }
            );
        } else if (selectTypeName === "Available Columns") {
            let availableColumns = this.props.availableColumnsConfig.slice(0);
            let columns = this.checkCurrentColumns(availableColumns, selectValue);
            let columnConfig = this.prepareColumns(selectValue);
            let sortLists = this.prepareSortLists(selectValue);
            let selectedColumn = columnConfig.filter(item => {
                return item.defaultSelect ? columnConfig : null;
            });

            this.setState(
                {
                    availableColumnsConfig: columns,
                    columnConfig: columnConfig,
                    sortLists: sortLists,
                    columns: selectedColumn
                },
                () => {
                    this.props.editorControlProps(this.state);
                }
            );
        }
    }
    checkCurrentColumns(columns, selectValue) {
        _.forEach(columns, column => {
            column.defaultSelect = false;
            _.forEach(selectValue, value => {
                if (value === column.title) {
                    column.defaultSelect = true;
                }
            });
        });
        return columns;
    }
    getKey = value => {
        const { availableColumnsConfig } = this.state;
        let all = availableColumnsConfig.slice(0);
        let key = "";
        _.forEach(all, item => {
            if (value === item.title) {
                key = item.key;
            }
        });
        return key;
    };
    prepareColumns(selectValue) {
        const { columnConfig } = this.state;
        if (!selectValue.length) {
            return [];
        }
        let selectedColumns = columnConfig.slice(0);
        let columns = columnConfig.slice(0);

        _.forEach(selectValue, value => {
            let find = false;
            _.forEach(selectedColumns, column => {
                if (column.title === value) {
                    find = true;
                }
            });
            if (!find) {
                let newColumn = {
                    key: this.getKey(value),
                    title: value,
                    defaultSelect: false
                };
                columns.push(newColumn);
            }
        });
        _.forEach(selectedColumns, (column, index) => {
            let find = false;
            _.forEach(selectValue, value => {
                if (column.title === value) {
                    find = true;
                }
            });
            if (!find) {
                columns.splice(index, 1);
            }
        });

        return columns;
    }

    //set sort
    prepareSortLists(selectValue) {
        if (!selectValue.length) {
            return [];
        }
        const { sortListsConfig } = this.state;
        let currentSortLists = sortListsConfig.slice(0);
        let sortLists = [];
        _.forEach(selectValue, value => {
            _.forEach(currentSortLists, list => {
                if (list.displayName === value) {
                    sortLists.push(list);
                }
            });
        });
        return sortLists;
    }

    //save editData to ccms
    getData = () => {
        this.props.editorControlProps(this.state);
        return JSON.parse(JSON.stringify(this.state));
    };

    addFilterItem = () => {
        let fieldItems = {
            filter: "Alarm Id",
            severityAndState: "",
            parameterValue: "",
            operator: "end with",
            value: "",
            dateTime: []
        };
        // this.state.filterDataList.push(fieldItems);
        let filterDataList = _.cloneDeep(this.state.filterDataList);
        filterDataList.push(fieldItems);
        this.setState(
            {
                filterDataList: filterDataList
            },
            () => {
                this.isLock();
            }
        );
    };

    handleGetData = val => {
        this.getItemsSearch(this.state.pageNo, this.state.pageLimit, val);
    };

    getItemsSearch = (pageNo, pageLimit, itemsData) => {
        let arr = handleDataForRequest(itemsData);
        let paginator = {
            pageno: pageNo,
            limit: pageLimit
        };
        let predicate = {
            operator: "AND",
            predicates: arr
        };

        let applicationid = this.props.currentApplicationInfo ? this.props.currentApplicationInfo["address.name"] : "";
        this.props.handlItemsData(itemsData);
        this.props.handleSearchItems(paginator, predicate, applicationid);
    };

    removeFilterDataFunc = filterDataList => {
        if (!filterDataList.length) {
            this.getItemsSearch(this.state.pageNo, this.state.pageLimit, []);
        }
    };
    isLock = () => {
        const { lockSave } = this.props;
        let lock = false;
        let dataList = this.state.filterDataList;
        //if true, lock; if false, unlock
        for (let i = 0; i < dataList.length; i++) {
            if (
                (dataList[i].filter !== "Fields Item" &&
                    dataList[i].filter !== "Sent Datetime" &&
                    dataList[i].filter !== "Severity" &&
                    !dataList[i].value) ||
                (dataList[i].filter === "Sent Datetime" && dataList[i].dateTime.length === 0) ||
                (dataList[i].filter === "Parameters" && !dataList[i].parameterValue.trim())
            ) {
                lock = true;
            }
        }
        lockSave(lock);
    };

    render() {
        return (
            <div style={{ height: "100%" }}>
                <List>
                    <ListItem style={{ paddingLeft: 0, paddingRight: 0 }}>
                        <TextField
                            id="input-with-icon-textfield"
                            label="Title"
                            defaultValue={this.state.title}
                            onChange={this.handleTitleInputChanged.bind(this, "title")}
                            fullWidth
                        />
                    </ListItem>
                    <ListItem style={{ paddingLeft: 0, paddingRight: 0 }}>
                        <TextField
                            id="input-with-icon-textfield"
                            label="Sub-title"
                            defaultValue={this.state.subTitle}
                            onChange={this.handleTitleInputChanged.bind(this, "subTitle")}
                            fullWidth
                        />
                    </ListItem>
                    <ListItem style={{ paddingLeft: 0, paddingRight: 0 }}>
                        <FormControl style={{ width: "100%" }}>
                            <InputLabel htmlFor="select-multiple-checkbox">Default Page Size</InputLabel>
                            <Select
                                value={this.state.pageLimit}
                                onChange={this.handleInputSelectChanged.bind(this, "pageLimit")}
                            >
                                {this.props.pageSize &&
                                    this.props.pageSize.map(pageSize => (
                                        <MenuItem key={pageSize} value={pageSize}>
                                            <ListItemText primary={pageSize} />
                                        </MenuItem>
                                    ))}
                            </Select>
                        </FormControl>
                    </ListItem>
                    <ListItem style={{ paddingLeft: 0, paddingRight: 0 }}>
                        <FormControl style={{ width: "100%" }}>
                            <InputLabel htmlFor="select-multiple-checkbox">Default Mode</InputLabel>
                            <Select
                                value={this.state.topoDisplayType}
                                onChange={this.handleInputSelectChanged.bind(this, "topoDisplayType")}
                            >
                                {this.props.viewMode &&
                                    this.props.viewMode.map(viewMode => (
                                        <MenuItem key={viewMode} value={viewMode}>
                                            <ListItemText primary={viewMode} />
                                        </MenuItem>
                                    ))}
                            </Select>
                        </FormControl>
                    </ListItem>
                    <ListItem style={{ paddingLeft: 0, paddingRight: 0 }}>
                        <CommonSelect
                            selectTypeName="Available Columns"
                            selectItems={this.state.availableColumnsConfig}
                            handleColumnSelectChange={this.handleColumnSelectChange.bind(this)}
                        />
                    </ListItem>
                    <ListItem style={{ paddingLeft: 0, paddingRight: 0 }}>
                        <CommonSelect
                            selectTypeName="Default Selected Columns"
                            selectItems={this.state.columnConfig}
                            handleColumnSelectChange={this.handleColumnSelectChange.bind(this)}
                        />
                    </ListItem>
                    <ListItem style={{ paddingLeft: 0, paddingRight: 0 }}>
                        <FormControl style={{ width: "50%" }}>
                            <InputLabel htmlFor="select-multiple-checkbox">Default Sort</InputLabel>
                            <Select
                                value={this.state.orderDisplayName}
                                onChange={this.handleInputSelectChanged.bind(this, "currentSortBy")}
                                MenuProps={MenuProps}
                            >
                                {this.state.sortLists &&
                                    this.state.sortLists.map(sortList => (
                                        <MenuItem key={sortList.sortName} value={sortList.displayName}>
                                            <ListItemText primary={sortList.displayName} />
                                        </MenuItem>
                                    ))}
                            </Select>
                        </FormControl>
                        <FormControl style={{ width: "45%", marginLeft: "5%" }}>
                            <InputLabel htmlFor="select-multiple-checkbox">Default Asc</InputLabel>
                            <Select
                                value={this.state.order}
                                onChange={this.handleInputSelectChanged.bind(this, "order")}
                            >
                                {this.props.ascDesc &&
                                    this.props.ascDesc.map(ascDesc => (
                                        <MenuItem key={ascDesc.sortName} value={ascDesc.sortName}>
                                            <ListItemText primary={ascDesc.displayName} />
                                        </MenuItem>
                                    ))}
                            </Select>
                        </FormControl>
                    </ListItem>
                    <ListItem style={{ paddingLeft: 0, paddingRight: 0 }}>
                        <FormControl style={{ width: "90%" }}>
                            <ListItem style={{ paddingLeft: 0, paddingRight: 0 }}>
                                <ListItemText primary="Filter Config" style={{ padding: "0" }} />
                            </ListItem>
                        </FormControl>
                        <FormControl style={{ width: "11%" }}>
                            <Button onClick={this.addFilterItem.bind(this)}>
                                <Icon>add</Icon>
                            </Button>
                        </FormControl>
                    </ListItem>
                    <ListItem style={{ paddingLeft: 0, paddingRight: 0 }}>
                        <FormControl className="filterConfig">
                            <FilterConfig
                                style={{ width: "100%" }}
                                filterDataList={this.state.filterDataList}
                                onApplyFilter={this.handleGetData.bind(this)}
                                callReminder={this.props.callReminder.bind(this)}
                                removeFilterData={this.handleGetData.bind(this)}
                                parametersData={this.props.parametersData}
                                callParameters={this.props.callParameters.bind(this)}
                                isLock={this.isLock}
                            />
                        </FormControl>
                    </ListItem>
                </List>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    let identify = ownProps.identify;
    let data = state.alarm[identify];
    return { parametersData: data && data.parametersData };
    // return state[topoReducerName] || {};
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        editorControlProps: editorData => {
            dispatch(editorControlProps(editorData, props.identify));
        },
        handleSearchItems: (paginator, items, applicationid) => {
            dispatch(getItemsRequest(paginator, items, applicationid, props.identify));
        },
        handlItemsData: arr => {
            dispatch(saveItemsData(arr, props.identify));
        },
        callReminder: val => {
            dispatch(msg.warn(val, "Alarm - Config"));
        },
        callParameters: val => {
            dispatch(requestParameters(val, props.identify));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditerView);
