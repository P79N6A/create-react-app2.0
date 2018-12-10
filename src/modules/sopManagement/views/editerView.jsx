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
 * Created by ChenLing.
 */
import React from "react";
import { connect } from "react-redux";
import { theme as Theme } from "modules/theme";
import { MuiThemeProvider } from "@material-ui/core/styles";
import "../styles/sop.less";
import { getSopsInitData, editorControlProps, searchSopListQequest} from "../funcs/actions";
import { TextField, InputLabel, Select } from "modules/common";
import CommonSelect from "./common/select";
import { reducerName as sopReducerName } from "modules/sopManagement";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
// import Switch from "@material-ui/core/Switch";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { I18n } from "react-i18nify";
// import _ from "lodash";
// import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
class SopsEditerView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.title,
            subTitle: this.props.subTitle,
            ruleDisplayType: this.props.ruleDisplayType,
            pagination: this.props.pagination,
            pageLimit: this.props.pageLimit,
            rowsPerPageOptions: this.props.rowsPerPageOptions,
            columnDatas: this.props.columnDatas,
            columnConfig: this.props.columnConfig,
            multipleSelect: this.props.multipleSelect,
            sortorders:[
                {
                    "ascending": true,
                    "sortfield": "eventtype"
                },
                {
                    "ascending": false,
                    "sortfield": "sopkey"
                },
                {
                    "ascending": false,
                    "sortfield": "starttime"
                },
                {
                    "ascending": false,
                    "sortfield": "endtime"
                }
            ],
            // orderDisplayName: this.props.orderDisplayName,
            // sortLists: this.props.sortLists,
            // orderDirection: this.props.orderDirection,

        };
    }
    componentWillMount() {
        // console.log(this);
        this.props.get && this.props.get(this);
    }
    // componentDidMount() {
    //     console.log(this);
    //     this.props.get(this);
    // }
    getData = (state) => {
        // console.log(this.props);
        return this.props;
    };
    handleInputSelectChanged(propertyType, event){
        // console.log(propertyType);
        // console.log(event.target.value);
        // identify, keyWord, sortorders, sortLists, orderDirection, orderDisplayName, orderBy, pagination
        let {identify, keyWord, sortLists, orderDirection, orderDisplayName, orderBy} = this.props;
        let {sortorders} = this.state;
        if(propertyType === "pageLimit") {
            // console.log(event.target.value);
            let pagination = {
                ...this.props.pagination,
                limit: event.target.value
            };
            this.setState(
                Object.assign(this.state, {
                    pagination: pagination,
                })
            );
            this.props.searchSopList(identify, keyWord, sortorders, sortLists, orderDirection, orderDisplayName, orderBy, pagination);
        }
        if(propertyType === "orderDisplayName") {
            // console.log(event.target.value);
            let {sortLists, orderDirection, pagination} = this.props;
            let orderDisplayName = event.target.value;
            let {sortorders} = this.state;
            // console.log("sortLists:", sortLists);
            // console.log("displayName:", displayName);
            // console.log("orderDirection:", orderDirection);
            let orderBy = "";
            if(orderDirection === "asc"){
                sortLists.map(item=>{
                    if(item.displayName === orderDisplayName){
                        orderBy = item.sortfield;
                        item.ascending = true;
                        sortorders.map(orderItem=>{
                            if(orderItem.sortfield === item.sortfield){
                                orderItem.ascending = true;
                            }
                            return null;
                        });
                    }
                    return null;
                });
                this.setState(
                    Object.assign(this.state, {
                        sortLists: sortLists,
                        sortorders: sortorders,
                        orderBy: orderBy
                    })
                );
            }else{
                sortLists.map(item=>{
                    if(item.displayName === orderDisplayName){
                        orderBy = item.sortfield;
                        item.ascending = false;
                        sortorders.map(orderItem=>{
                            if(orderItem.sortfield === item.sortfield){
                                orderItem.ascending = false;
                            }
                            return null;
                        });
                    }
                    return null;
                });
                this.setState(
                    Object.assign(this.state, {
                        sortLists: sortLists,
                        sortorders: sortorders,
                        orderBy: orderBy
                    })
                );
            }
            // console.log(this.state);
            this.props.editorControlProps(this.props.identify, this.state);
            this.props.searchSopList(identify, keyWord, this.state.sortorders, sortLists, orderDirection, orderDisplayName, orderBy, pagination);
        }
        if(propertyType === "orderDirection") {
            // console.log(event.target.value);
            let {sortLists, orderDisplayName, pagination} = this.props;
            let orderDirection = event.target.value;
            let {sortorders} = this.state;
            // console.log("sortLists:", sortLists);
            // console.log("displayName:", displayName);
            // console.log("orderDirection:", orderDirection);
            if(orderDirection === "asc"){
                sortLists.map(item=>{
                    if(item.displayName === orderDisplayName){
                        item.ascending = true;
                        sortorders.map(orderItem=>{
                            if(orderItem.sortfield === item.sortfield){
                                orderItem.ascending = true;
                            }
                            return null;
                        });
                    }
                    return null;
                });
                this.setState(
                    Object.assign(this.state, {
                        sortLists: sortLists,
                        sortorders: sortorders
                    })
                );
            }else{
                sortLists.map(item=>{
                    if(item.displayName === orderDisplayName){
                        item.ascending = false;
                        sortorders.map(orderItem=>{
                            if(orderItem.sortfield === item.sortfield){
                                orderItem.ascending = false;
                            }
                            return null;
                        });
                    }
                    return null;
                });
                this.setState(
                    Object.assign(this.state, {
                        sortLists: sortLists,
                        sortorders: sortorders
                    })
                );
            }

            // console.log(this.state);
            this.props.editorControlProps(this.props.identify, this.state);
            this.props.searchSopList(identify, keyWord, this.state.sortorders, sortLists, orderDirection, orderDisplayName, orderBy, pagination);

        }
        this.setState(
            Object.assign(this.state, {
                pagination: this.props.pagination,
                [propertyType]: event.target.value,
            })
        );
        this.props.editorControlProps(this.props.identify, this.state);
    }
    handleColumnSelectChange(selectTypeName, keyWord, selectValue) {
        // console.log(selectTypeName);
        // console.log(selectValue);
        let columnConfig = this.state.columnConfig;
        // let selectValueType = typeof(selectValue);
        if(selectTypeName === "Available Columns"){
            // console.log("Available Columns");

            if(keyWord==="all"){
                columnConfig.map(n=>{
                    n.show = true;
                    return null;
                }); 
            } else if(keyWord==="clear"){
                columnConfig.map(n=>{
                    n.show = false;
                    return null;
                }); 
            } else if(keyWord==="delet"){
                columnConfig.map(n=>{

                    // console.log(n.label._find(selectValue));
                    if(n.label === selectValue){
                        n.show = false;
                    }
                    return null;
                }); 
            }
            let columnDatas = columnConfig;
            let newColumnDatas = [];
            columnDatas.map(n=>{
                if(n.show){
                    newColumnDatas.push(n);
                }
                return null;
            });
            // newColumnDatas.map(n=>{
            //     n.show = false;
            // });
            // console.log(newColumnDatas);
            this.setState(
                Object.assign(this.state, {
                    columnConfig: columnConfig,
                    columnDatas: newColumnDatas
                })
            );
            this.props.editorControlProps(this.props.identify, this.state);
            
        }else if(selectTypeName === "Default Selected Columns"){
            // console.log("Available Columns");
            let columnDatas = this.state.columnDatas;
            if(keyWord==="all"){
                columnDatas.map(n=>{
                    n.show = true;
                    return null;
                }); 
            } else if(keyWord==="clear"){
                columnDatas.map(n=>{
                    n.show = false;
                    return null;
                }); 
            } else if(keyWord==="delet"){
                columnConfig.map(n=>{

                    if(n.label === selectValue){
                        n.show = false;
                    }
                    return null;
                });
            } 
            let newColumnDatas = [];
            columnDatas.map(n=>{
                return newColumnDatas.push(n);
            });
            this.setState(
                Object.assign(this.state, {
                    // columnConfig: columnConfig,
                    columnDatas: newColumnDatas
                })
            );
            this.props.editorControlProps(this.props.identify, this.state);
        }
    }
    handlecolumnConfigSelectChange(selectTypeName,columnConfig){
        // console.log(selectTypeName);
        // console.log(columnConfig);
        if(selectTypeName === "Available Columns"){
            let columnDatas = columnConfig;
            let newColumnDatas = [];
            columnDatas.map(n=>{
                if(n.show){
                    newColumnDatas.push(n);
                }
                return true;
            });
            this.setState(
                Object.assign(this.state, {
                    columnConfig: columnConfig,
                    columnDatas: newColumnDatas
                })
            );
            this.props.editorControlProps(this.props.identify, this.state);
        }else if(selectTypeName === "Default Selected Columns"){
            let columnDatas = columnConfig;
            let newColumnDatas = [];
            columnDatas.map(n=>{
                // if(n.show){
                return newColumnDatas.push(n);
                // }
                // return true;
            });
            this.setState(
                Object.assign(this.state, {
                    columnDatas: newColumnDatas,
                })
            );
            this.props.editorControlProps(this.props.identify, this.state);
        }
    }
    handleMultipleSelectChange(name, event) {
        // console.log(name);
        let checked = event.target.checked || !this.state.multipleSelect;
        // console.log(checked);
        let columnConfig = this.props.columnConfig;
        columnConfig[0].show = checked;
        this.setState(
            Object.assign(this.state, {
                [name]: checked,
                columnConfig: columnConfig
            }),()=>{
                this.props.editorControlProps(this.props.identify, this.state);
            }
        );
        
    }
    render() {
        // console.log(this.props);
        return (
            <MuiThemeProvider theme={Theme}>
                <List>
                    <ListItem style={{ paddingLeft: 0, paddingRight: 0 }}>
                        <TextField
                            id="input-with-icon-textfield"
                            label={I18n.t("sop.ccms.Title")}
                            value={this.state.title}
                            onChange={this.handleInputSelectChanged.bind(this, "title")}
                            fullWidth
                        />
                    </ListItem>
                    <ListItem style={{ paddingLeft: 0, paddingRight: 0 }}>
                        <TextField
                            id="input-with-icon-textfield"
                            label={I18n.t("sop.ccms.SubTitle")}
                            value={this.state.subTitle}
                            onChange={this.handleInputSelectChanged.bind(this, "subTitle")}
                            fullWidth
                        />
                    </ListItem>
                    <ListItem style={{ paddingLeft: 0, paddingRight: 0 }}>
                        <FormControl style={{ width: "100%" }}>
                            <InputLabel htmlFor="select-multiple-checkbox">{I18n.t("sop.ccms.DefaultPageSize")}</InputLabel>
                            <Select
                                value={this.state.pageLimit}
                                onChange={this.handleInputSelectChanged.bind(this, "pageLimit")}
                            >
                                {this.props.rowsPerPageOptions &&
                                    this.props.rowsPerPageOptions.map(rowsPerPageOptions => (
                                        <MenuItem key={rowsPerPageOptions} value={rowsPerPageOptions}>
                                            <ListItemText primary={rowsPerPageOptions} />
                                        </MenuItem>
                                    ))}
                            </Select>
                        </FormControl>
                    </ListItem>
                    <ListItem style={{ paddingLeft: 0, paddingRight: 0 }}>
                        <CommonSelect
                            selectTypeName={I18n.t("sop.ccms.AvailableColumns")}
                            selectItems={this.state.columnConfig}
                            handleColumnSelectChange={this.handleColumnSelectChange.bind(this)}
                            handlecolumnConfigSelectChange={this.handlecolumnConfigSelectChange.bind(this)}
                        />
                    </ListItem>
                    <ListItem style={{ paddingLeft: 0, paddingRight: 0 }}>
                        <CommonSelect
                            selectTypeName={I18n.t("sop.ccms.DefaultSelectedColumns")}
                            selectItems={this.state.columnDatas}
                            handleColumnSelectChange={this.handleColumnSelectChange.bind(this)}
                            handlecolumnConfigSelectChange={this.handlecolumnConfigSelectChange.bind(this)}
                        />
                    </ListItem>
                    <ListItem style={{ paddingLeft: 0, paddingRight: 0 }}>
                        <FormControl style={{ width: "50%" }}>
                            <InputLabel htmlFor="select-multiple-checkbox">{I18n.t("sop.ccms.DefaultSort")}</InputLabel>
                            <Select
                                value={this.props.orderDisplayName}
                                onChange={this.handleInputSelectChanged.bind(this, "orderDisplayName")}
                            >
                                {this.props.sortLists &&
                                    this.props.sortLists.map(sortList => (
                                        <MenuItem key={sortList.sortfield} value={sortList.displayName}>
                                            <ListItemText primary={sortList.displayName} />
                                        </MenuItem>
                                    ))}
                            </Select>
                        </FormControl>
                        <FormControl style={{ width: "45%", marginLeft: "5%" }}>
                            <InputLabel htmlFor="select-multiple-checkbox">{I18n.t("sop.ccms.DefaultAsc")}</InputLabel>
                            <Select
                                value={this.props.orderDirection}
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
                </List>
            </MuiThemeProvider>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    // console.log(state);
    // console.log(ownProps);
    let {
        identify,
        title,
        subTitle,
        pagination,
        pageLimit,
        rowsPerPageOptions,
        columnDatas,
        columnConfig,
        multipleSelect,
        orderDisplayName,
        sortLists,
        orderDirection,
        ascDesc,
        orderBy
    } = ownProps;
    let store = (state[sopReducerName] && state[sopReducerName][identify]) || {};
    // console.log("store:", store);
    // console.log("ownProps:",ownProps);
    return {
        title: store && store.title === undefined ? title : store.title,
        subTitle: store && store.subTitle === undefined ? subTitle : store.subTitle,
        pagination: store && store.pagination === undefined ? pagination : store.pagination,
        pageLimit: store && store.pageLimit === undefined ? pageLimit : store.pageLimit,
        rowsPerPageOptions: store && store.rowsPerPageOptions === undefined ? rowsPerPageOptions : store.rowsPerPageOptions,
        columnDatas: store && store.columnDatas === undefined ? columnDatas : store.columnDatas,
        columnConfig: store && store.columnConfig === undefined ? columnConfig : store.columnConfig,
        multipleSelect: store && store.multipleSelect === undefined ? multipleSelect : store.multipleSelect,
        orderBy:  store && store.orderBy === undefined ? orderBy : store.orderBy,
        orderDisplayName:  store && store.orderDisplayName === undefined ? orderDisplayName : store.orderDisplayName,
        sortLists: store && store.sortLists === undefined ? sortLists : store.sortLists,
        orderDirection: store && store.orderDirection === undefined ? orderDirection : store.orderDirection,
        ascDesc: store && store.ascDesc === undefined ? ascDesc : store.ascDesc,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        editorControlProps: (identify, editorState) => {
            dispatch(editorControlProps(identify, editorState));
        },
        getSopsInitData: (identify, data) => {
            dispatch(getSopsInitData(identify, data));
        },
        searchSopList: (identify, keyWord, sortorders, sortLists, orderDirection, orderDisplayName, orderBy, pagination) => {
            // console.log(keyWord)
            // console.log(pagination)
            dispatch(searchSopListQequest(identify, keyWord, sortorders, sortLists, orderDirection, orderDisplayName, orderBy, pagination));
        },
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SopsEditerView);