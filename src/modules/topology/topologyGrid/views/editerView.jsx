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
import { connect } from "react-redux";
import "../styles/style.less";
import { editorControlProps } from "../funcs/actions";
import { TextField, InputLabel, Select } from "modules/common";
import CommonSelect from "./commonSelect";
// import { reducerName as topoReducerName } from "modules/topology/topologyGrid";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
// import Switch from "@material-ui/core/Switch";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import _ from "lodash";
import { reducerName as topoFilterReducerName } from "modules/topology/topologyEnhanceFilter";
// import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

class TopologyEditerView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.title,
            subTitle: this.props.subTitle,
            pageLimit: this.props.pageLimit,
            availableColumns: this.props.availableColumnsConfig,
            columnConfig: this.props.columnConfig,
            currentColumnSelect: [],
            orderDisplayName: this.props.orderDisplayName,
            currentOrderDirection: "",
            orderBy: "",
            orderDirection: this.props.orderDirection,
            multipleSelect: this.props.multipleSelect,
            sortLists: this.props.sortLists,
            filterConfig: _.cloneDeep(this.props.filterConfig),
            currentApplicationInfo: this.props.currentApplicationInfo
        };
        this.timer = {};
    }

    componentWillMount() {
        this.props.get && this.props.get(this);
        this.setState({
            ...this.props
        });
        let selectApplication = this.state.currentApplicationInfo;
        let selectAppRespath = (selectApplication && selectApplication["address.resourcePath"]) || "";
        let filterConfig = this.state.filterConfig.slice(0);

        _.forEach(filterConfig, filter => {
            if (filter.filterName === "Application ID") {
                filter.defaultValue = selectAppRespath;
            }
        });
        let currentSortBy = this.checkCurrentSortBy(this.state.orderDisplayName);
        this.setState(
            Object.assign(this.state, {
                orderBy: currentSortBy,
                filterConfig: filterConfig
            })
        );
        this.props.editorControlProps(this.props.identify, this.state);
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.topoTypeDatas) {
            return;
        }
        let filterConfig = _.cloneDeep(this.state.filterConfig);
        let topoTypeDatas = nextProps.topoTypeDatas;
        let topoTypes = [];
        _.forEach(topoTypeDatas, type => {
            topoTypes.push(type["devicemodel.name"]);
        });
        _.forEach(filterConfig, filter => {
            if (filter.filterName === "Device Type") {
                filter.values = topoTypes;
            }
        });
        this.setState(
            Object.assign(this.state, {
                filterConfig: filterConfig
            })
        );
    }

    checkCurrentSortBy(sortBy) {
        let sortLists = this.props.sortLists;
        let currentSortBy = "";
        _.forEach(sortLists, list => {
            if (list.displayName === sortBy) {
                currentSortBy = list.sortName;
            }
        });

        return currentSortBy;
    }

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
        this.props.editorControlProps(this.props.identify, this.state);
    }

    handleFilterChanged(selectTypeName, selectValue) {
        let filterConfig = _.cloneDeep(this.state.filterConfig);

        _.forEach(filterConfig, filter => {
            if (filter.filterName === selectTypeName && filter.filterType === "select") {
                filter.defaultValue = selectValue;
            } else if (filter.filterName === selectTypeName && filter.filterType === "input") {
                filter.defaultValue = selectValue.target.value;
            }
        });

        this.setState(
            Object.assign(this.state, {
                filterConfig: filterConfig
            })
        );

        let identify = this.props.identify;
        clearTimeout(this.timer[identify]);
        this.timer[identify] = setTimeout(() => {
            this.props.editorControlProps(this.props.identify, this.state);
        }, 500);
    }

    checkCurrentColumns(columns, selectValue) {
        _.forEach(columns, column => {
            column.defaultSelect = false;
            _.forEach(selectValue, value => {
                if (value === column.columnName) {
                    column.defaultSelect = true;
                }
            });
        });
        return columns;
    }

    handleColumnSelectChange(selectTypeName, selectValue) {
        if (selectTypeName === "Default Selected Columns") {
            var defaultColumns = this.state.columnConfig.slice(0);
            let columns = this.checkCurrentColumns(defaultColumns, selectValue);
            this.setState(
                Object.assign(this.state, {
                    columnConfig: columns
                })
            );
            this.props.editorControlProps(this.props.identify, this.state);
        } else if (selectTypeName === "Available Columns") {
            let availableColumns = this.props.availableColumnsConfig.slice(0);
            let columns = this.checkCurrentColumns(availableColumns, selectValue);
            let columnConfig = this.prepareColumns(selectValue);
            let sortLists = this.prepareSortLists(selectValue);

            this.setState(
                Object.assign(this.state, {
                    availableColumns: columns,
                    columnConfig: columnConfig,
                    sortLists: sortLists
                })
            );
            this.props.editorControlProps(this.props.identify, this.state);
        }
    }

    prepareColumns(selectValue) {
        // if (!selectValue.length) {
        //     return [];
        // }
        let selectedColumns = this.state.columnConfig.slice(0);
        let columns = this.state.columnConfig.slice(0);
        let availableColumns = this.props.availableColumnsConfig.slice(0);

        _.forEach(selectValue, value => {
            let find = false;
            let currentIndex = 0;
            _.forEach(selectedColumns, column => {
                if (column.columnName === value) {
                    find = true;
                }
            });
            if (!find) {
                _.forEach(availableColumns, (available, availabelIndex) => {
                    if (available.columnName === value) {
                        currentIndex = availabelIndex;
                    }
                });
                let newColumn = {
                    columnName: value,
                    defaultSelect: false
                };
                // columns.push(newColumn);
                columns.splice(currentIndex, 0, newColumn);
            }
        });
        _.forEach(selectedColumns, (column, index) => {
            let find = false;
            _.forEach(selectValue, value => {
                if (column.columnName === value) {
                    find = true;
                }
            });
            if (!find) {
                columns.splice(index, 1, null);
            }
        });

        let newCoumns = [];
        _.forEach(columns, newColumn => {
            if (newColumn) {
                newCoumns.push(newColumn);
            }
        });

        return newCoumns;
    }

    prepareSortLists(selectValue) {
        if (!selectValue.length) {
            return [];
        }
        let currentSortLists = this.props.sortListsConfig.slice(0);
        let availableColumns = this.props.availableColumnsConfig.slice(0);
        let sortLists = [];
        _.forEach(selectValue, value => {
            _.forEach(currentSortLists, list => {
                if (list.displayName.toLowerCase() === value.toLowerCase()) {
                    let currentIndex = 0;
                    _.forEach(availableColumns, (available, availabelIndex) => {
                        if (available.columnName === value) {
                            currentIndex = availabelIndex;
                        }
                    });
                    // sortLists.push(list);
                    sortLists.splice(currentIndex, 0, list);
                }
            });
        });
        return sortLists;
    }

    getData = () => {
        this.props.editorControlProps(this.state);
        return JSON.parse(JSON.stringify(this.state));
    };

    handleMultipleSelectChange(name, event) {
        let checked = event.target.checked || !this.state.multipleSelect;
        this.setState(
            Object.assign(this.state, {
                [name]: checked
            })
        );
        this.props.editorControlProps(this.props.identify, this.state);
    }

    render() {
        return (
            <List>
                <ListItem style={{ paddingLeft: 0, paddingRight: 0 }}>
                    <TextField
                        id="input-with-icon-textfield"
                        label="Title"
                        value={this.state.title}
                        onChange={this.handleInputSelectChanged.bind(this, "title")}
                        fullWidth
                    />
                </ListItem>
                <ListItem style={{ paddingLeft: 0, paddingRight: 0 }}>
                    <TextField
                        id="input-with-icon-textfield"
                        label="Sub-title"
                        value={this.state.subTitle}
                        onChange={this.handleInputSelectChanged.bind(this, "subTitle")}
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
                    <CommonSelect
                        selectTypeName="Available Columns"
                        selectItems={this.state.availableColumns}
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
                            value={this.state.orderDirection}
                            onChange={this.handleInputSelectChanged.bind(this, "orderDirection")}
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
                {this.state.filterConfig &&
                    this.state.filterConfig.map(filter => {
                        let isApplication = filter.filterName === "Application ID" ? true : false;
                        let filterValues = filter.values;
                        let defaultValues = filter.defaultValue;
                        let filterArray = [];
                        _.forEach(filterValues, value => {
                            let find = false;
                            _.forEach(defaultValues, defaultValue => {
                                if (value === defaultValue) {
                                    find = true;
                                }
                            });
                            let obj = {
                                columnName: value,
                                defaultSelect: find
                            };
                            filterArray.push(obj);
                        });
                        return (
                            <div>
                                {!isApplication ? (
                                    <ListItem style={{ paddingLeft: 0, paddingRight: 0 }}>
                                        {filter.filterType === "select" ? (
                                            <CommonSelect
                                                selectTypeName={filter.filterName}
                                                selectItems={filterArray}
                                                handleColumnSelectChange={this.handleFilterChanged.bind(this)}
                                            />
                                        ) : (
                                            <TextField
                                                id="input-with-icon-textfield"
                                                label={filter.filterName}
                                                value={filter.defaultValue}
                                                onChange={this.handleFilterChanged.bind(this, filter.filterName)}
                                                fullWidth
                                            />
                                        )}
                                    </ListItem>
                                ) : null}
                            </div>
                        );
                    })}
                {/* <ListItem
                        style={{ paddingLeft: 0, paddingRight: 0 }}
                        onClick={this.handleMultipleSelectChange.bind(this, "multipleSelect")}
                    >
                        <ListItemText primary="Multi-Selection" />
                        <ListItemSecondaryAction>
                            <Switch
                                checked={this.state.multipleSelect}
                                onChange={this.handleMultipleSelectChange.bind(this, "multipleSelect")}
                                value="multipleSelect"
                                color="secondary"
                            />
                        </ListItemSecondaryAction>
                    </ListItem> */}
            </List>
        );
    }
}

TopologyEditerView.defaultProps = {
    sortListsConfig: [
        {
            displayName: "Device Name",
            sortName: "physical.name"
        },
        {
            displayName: "Real World Resource Name",
            sortName: "physical.displayName"
        },
        {
            displayName: "Status",
            sortName: "logical.sensorstatus"
        },
        {
            displayName: "Device Type Name",
            sortName: "devicemodel.name"
        },
        {
            displayName: "Location",
            sortName: "location.name"
        },
        {
            displayName: "Application ID",
            sortName: "address.name"
        },
        {
            displayName: "ResourcePath",
            sortName: "physical.resourcePath"
        },
        {
            displayName: "System Resource ID",
            sortName: "physical.iotTopologyId"
        }
    ]
};

const filterProps = (state, identify, reducerName, props) => {
    if (state[reducerName] && state[reducerName][identify]) {
        return state[reducerName][identify][props];
    }
};

const mapStateToProps = (state, ownProps) => {
    let { identify } = ownProps;
    return {
        topoTypeDatas: filterProps(state, identify, topoFilterReducerName, "topoTypeDatas")
        // title: store && store.title === undefined ? title : store.title,
        // subTitle: store && store.subTitle === undefined ? subTitle : store.subTitle,
        // pageLimit: store && store.pageLimit === undefined ? pageLimit : store.pageLimit,
        // availableColumnsConfig:
        //     store && store.availableColumns === undefined ? availableColumnsConfig : store.availableColumns,
        // columnConfig: store && store.columnConfig === undefined ? columnConfig : store.columnConfig,
        // multipleSelect: store && store.multipleSelect === undefined ? multipleSelect : store.multipleSelect,
        // sortLists: store && store.sortLists === undefined ? sortLists : store.sortLists,
        // orderBy: store && store.orderBy === undefined ? orderBy : store.orderBy,
        // orderDisplayName: store && store.orderDisplayName === undefined ? orderDisplayName : store.orderDisplayName,
        // orderDirection: store && store.orderDirection === undefined ? orderDirection : store.orderDirection
    };
};

const mapDispatchToProps = dispatch => {
    return {
        editorControlProps: (identify, editorState) => {
            dispatch(editorControlProps(identify, editorState));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TopologyEditerView);
