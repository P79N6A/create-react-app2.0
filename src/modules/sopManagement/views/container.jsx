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
 * Created by chenling on 02/08/2018.
 */
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Search } from "./common/index";
// import { Paper } from "@material-ui/core";
// import { Compose } from "../funcs/util";
import {
    searchWordChang,
    searchSopListQequest,
    addNewSops,
    editSops,
    changeAdd,
    columnsChanged,
    getSopManagmentSchema
} from "../funcs/actions";
import { success, error } from "modules/messageCenter/funcs/actions";
import Header from "./sopsHeader";
import SopList from "./sopList";
// import SopDialog from "./sopDialog";
import AddSops from "./addSops";
import { REDUCER_NAME as sopListReducer } from "../funcs/constants";
// import { theme } from "modules/theme";
import Card from "@material-ui/core/Card";
import "../styles/sop.less";
import { withStyles } from "@material-ui/core/styles";
import moment from "moment";
import { I18n } from "react-i18nify";
import { ISC_ACCOUNT_INFO } from "commons/constants/const";
// import _ from "lodash";
const styles = Theme => ({
    // sopAll: {
    //     // ...Theme.mixins.gutters(),
    //     backgroundColor: Theme.palette.background.paper,
    //     color: Theme.palette.text.primary,
    //     height:" 100%"
    // }
});

class SopPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            identify: "",
            open: false,
            add: false,
            view: false,
            // title: this.props.title,
            soptitle: I18n.t("sop.common.AddSop"),
            cancleText: I18n.t("common.Cancel"),
            submitText: I18n.t("common.Save"),
            edit: false,
            isDisabled: false,
            mode: false,
            file: {},
            fromData: {},
            search: "",
            selectSopList: {
                starttime: moment().format("YYYY-MM-DD HH:mm:ss"),
                endtime: moment().format("YYYY-MM-DD HH:mm:ss"),
                alarmtype: "",
                sopdescription: "",
                processdefinitionid: ""
            },
            sortorders: [
                {
                    ascending: true,
                    sortfield: "eventtype"
                },
                {
                    ascending: false,
                    sortfield: "sopkey"
                },
                {
                    ascending: false,
                    sortfield: "starttime"
                },
                {
                    ascending: false,
                    sortfield: "endtime"
                }
            ],
            // sortorders: this.props.sortorders,
            columnData: this.props.columnData,
            checkBoxConfiger: [],
            keyWord: "",
            refresh: this.props.refresh
            // message: this.props.message
            // datas: this.props.datas
        };
        this.addSopsAction = this.addSopsAction.bind(this);
        this.close = this.close.bind(this);
        this.handle = this.handle.bind(this);
        this.getFormData = this.getFormData.bind(this);
    }
    getSopManagmentSchema = () => {
        const identify = this.props.identify;
        const siteName =
            sessionStorage.getItem(ISC_ACCOUNT_INFO) &&
            JSON.parse(sessionStorage.getItem(ISC_ACCOUNT_INFO)).displayname;
        this.props.getSopManagmentSchema(identify, siteName, "sopManagmentSchema");
    };
    componentDidMount() {
        // console.log(this.props);
        let { identify, orderDirection, orderDisplayName, orderBy, sortLists, pagination } = this.props;
        let { sortorders } = this.state;
        // if(sortorders === undefined){
        //     sortorders = this.state.sortordersDefault;
        // }
        // let {sortorders} = this.props || this.state.sortorders;
        let { keyWord } = this.state;
        this.setState({
            refresh: true
        });
        // console.log(sortorders);
        this.props.getSopList(
            identify,
            keyWord,
            sortorders,
            sortLists,
            orderDirection,
            orderDisplayName,
            orderBy,
            pagination
        );
        this.getSopManagmentSchema();
    }
    componentWillReceiveProps(nextProps) {
        // console.log(nextProps);
        // console.log(this.props);
        // if(nextProps.sortorders !== undefined){
        //     this.setState({
        //         sortorders: nextProps.sortorders
        //     });
        // }
        // if(nextProps.sortorders !== undefined){
        //     this.setState({
        //         sortorders: nextProps.sortorders
        //     });
        // }
        if (nextProps.refresh !== undefined) {
            this.setState({
                refresh: nextProps.refresh
            });
        }

        if (nextProps.selectSopList !== undefined) {
            this.setState({
                // selectSopList: nextProps.selectSopList,
                columnData: nextProps.columnDatas
            });
        }
        if (nextProps.message !== undefined && nextProps.message !== this.props.message) {
            if (nextProps.message.type === "success") {
                this.props.changeSuccessMessageBox(nextProps.message.message);
            } else if (nextProps.message.type === "error") {
                this.props.changeErrorMessageBox(nextProps.message.message);
            }
        }
    }
    addSopsAction() {
        // console.log("addSopsAction");
        this.setState(
            {
                open: true,
                add: true,
                edit: false,
                soptitle: I18n.t("sop.common.AddSop"),
                selectSopList: {
                    starttime: moment().format("YYYY-MM-DD HH:mm:ss"),
                    endtime: moment().format("YYYY-MM-DD HH:mm:ss"),
                    alarmtype: "",
                    sopdescription: "",
                    processdefinitionid: ""
                },
                submitText: I18n.t("common.Save"),
                cancleText: I18n.t("common.Cancel")
            },
            () => {
                // this.props.changeAdd(this.state.identify);
            }
        );
    }
    close = () => {
        // console.log("close", this.state)
        this.setState({
            open: false,
            soptitle: "",
            cancleText: I18n.t("common.Cancel"),
            submitText: I18n.t("common.Save"),
            selectSopList: {
                starttime: moment().format("YYYY-MM-DD HH:mm:ss"),
                endtime: moment().format("YYYY-MM-DD HH:mm:ss"),
                alarmtype: "",
                sopdescription: "",
                processdefinitionid: ""
            },
            add: false,
            edit: false,
            view: false,
            isDisabled: false,
            fromData: {}
        });
        // console.log("close", this.state)
    };
    handle = () => {
        const { identify, sortLists, orderDirection, order, orderByName, pagination } = this.props;

        const { keyWord, sortorders } = this.state;
        // console.log("handle", this.props);
        // let changType = this.state.submitText;

        // let seletedData = this.state.fromData;
        let fromData = this.state.fromData;
        // console.log(seletedData);
        fromData.starttime = moment(fromData.starttime).format("YYYY-MM-DDTHH:mm:ss.000+0800");
        fromData.endtime = moment(fromData.endtime).format("YYYY-MM-DDTHH:mm:ss.000+0800");
        // var selectSopList = this.state.selectSopList;
        // var pagination = this.props.pagination;
        var postData = {
            fromData: fromData,
            identify,
            keyWord,
            sortorders: sortorders,
            sortLists: sortLists,
            orderDirection,
            orderDisplayName: order,
            orderBy: orderByName,
            pagination: pagination
        };
        // console.log("selectSopList:", postData);
        // console.log(this.state);
        this.setState({
            open: false
        });
        let { add, edit } = this.state;
        if (edit) {
            let fromData = this.state.selectSopList;
            // console.log(this.state);
            fromData.starttime = moment(fromData.starttime).format("YYYY-MM-DDTHH:mm:ss.000+0800");
            fromData.endtime = moment(fromData.endtime).format("YYYY-MM-DDTHH:mm:ss.000+0800");

            postData.fromData = fromData;
            // console.log("postData:", postData);
        }
        // console.log(postData);
        if (
            Object.keys(postData.fromData).length === 0 ||
            postData.fromData.alarmtype === "" ||
            postData.fromData.starttime === "" ||
            postData.fromData.starttime === ""
        ) {
            let message = "alarmtype、starttime and starttime value not exist!";
            this.props.changeErrorMessageBox(message);
            return false;
        }
        // console.log("handle:", postData);
        if (add) {
            return this.props.submitAddNewSops(identify, postData);
        } else if (edit) {
            // console.log("postData:", postData);
            return this.props.submitEditSops(identify, postData);
        }
        this.setState({
            soptitle: "",
            cancleText: "",
            submitText: "",
            add: false,
            edit: false,
            view: false,
            isDisabled: false,
            open: false
            // refresh: true
        });
    };
    handleChange = event => {
        this.setState({
            keyWord: event.target.value
        });
    };
    keydownHandle = e => {
        if (e.keyCode === 13) {
            this.search();
        }
    };
    searchHandle = () => {
        this.search();
    };
    search = () => {
        const { identify, sortLists, orderDirection, orderDisplayName, orderBy } = this.props;

        const { keyWord, sortorders } = this.state;
        this.setState({
            refresh: true
        });
        // let postData = {
        //     username: search
        // };
        // this.props.searchSopList(postData);
        let pageLimit = this.props.pageLimit;
        let pagination = {
            ...this.props.pagination,
            limit: pageLimit
        };
        // console.log("props", this.props);
        // console.log("state", this.state);
        // let orderBy = orderByName;
        // identify, keyWord, sortorders, sortList, orderDirection, orderDisplayName, orderBy, pagination
        this.props.searchSopList(
            identify,
            keyWord,
            sortorders,
            sortLists,
            orderDirection,
            orderDisplayName,
            orderBy,
            pagination
        );
        this.props.searchWordChang(identify, keyWord);
    };
    refresh = () => {
        // console.log("refresh");
        this.setState(
            {
                keyWord: ""
            },
            () => {
                this.search();
            }
        );
    };
    listShow = () => {
        console.log("listShow");
    };
    getFormData(data) {
        // console.log(data);
        this.setState(
            {
                fromData: { ...data },
                selectSopList: data
            },
            () => {
                // console.log(this.state)
            }
        );
    }
    getIcons = classes => {
        return [
            {
                visible: !this.state.mode,
                content: () => {
                    return (
                        <Search
                            key={I18n.t("sop.common.Search")}
                            classes={classes}
                            handleChange={this.handleChange}
                            search={this.state.keyWord}
                            keydownHandle={this.keydownHandle}
                            searchHandle={this.searchHandle}
                        />
                    );
                }
            },
            {
                name: "add",
                func: () => {
                    this.addSopsAction();
                }
            }
        ];
    };
    editSops = (event, item) => {
        // console.log("editSops:", item);
        event.stopPropagation();
        // event.nativeEvent.stopImmediatePropagation();
        this.setState({
            add: false,
            open: true,
            edit: true,
            soptitle: I18n.t("sop.common.EditSop"),
            submitText: I18n.t("common.Save"),
            selectSopList: item
        });
    };
    columnsChanged = data => {
        // console.log(data);
        let identify = this.props.identify;
        // console.log("columnsChanged");
        let columnDatas = data;
        this.setState({
            refresh: true
        });
        this.props.columnsChanged(identify, columnDatas);
        this.search();
    };
    onRequestSort = (event, property) => {
        const { pagination, sortLists, identify, orderDirection } = this.props;
        let { keyWord } = this.state;
        let orderDisplayName = property;
        // console.log(property);
        let orderBy = sortLists.filter(item => {
            if (item.displayName === property) {
                return item.sortfield;
            }
            return null;
        })[0].sortfield;
        // console.log(orderBy);
        let sortList = sortLists;
        sortList.map(item => {
            if (item.displayName === property) {
                item.ascending = !item.ascending;
            }
            return null;
        });
        // console.log(sortList);
        // console.log(orderDirection);
        if (orderDirection === "asc") {
            let sortorders = [];
            let sortLists = this.props.sortLists;
            sortLists.map(item => {
                if (item.displayName === property) {
                    item.ascending = false;
                }
                let newItem = {
                    sortfield: item.sortfield,
                    ascending: item.ascending
                };
                sortorders.push(newItem);
                return null;
            });
            let orderDirection = "desc";
            this.setState({
                refresh: true,
                sortorders: sortorders
            });
            // console.log(sortorders);
            this.props.getSopList(
                identify,
                keyWord,
                sortorders,
                sortList,
                orderDirection,
                orderDisplayName,
                orderBy,
                pagination
            );
        } else {
            // console.log(datas);
            let sortorders = [];
            let sortLists = this.props.sortLists;
            sortLists.map(item => {
                if (item.displayName === property) {
                    item.ascending = true;
                }
                let newItem = {
                    sortfield: item.sortfield,
                    ascending: item.ascending
                };
                sortorders.push(newItem);
                return null;
            });
            let orderDirection = "asc";
            this.setState({
                refresh: true,
                sortorders: sortorders
            });
            // console.log(sortorders);
            this.props.getSopList(
                identify,
                keyWord,
                sortorders,
                sortList,
                orderDirection,
                orderDisplayName,
                orderBy,
                pagination
            );
        }
    };
    openFloatTab = sopData => {
        this.setState({
            add: false,
            open: true,
            edit: false,
            view: true,
            soptitle: I18n.t("sop.common.ViewSop"),
            submitText: I18n.t("common.Save"),
            selectSopList: sopData
        });
    };
    render() {
        // console.log(this.props);
        const {
            subTitle,
            title,
            pagination,
            rowsPerPageOptions,
            classes,
            identify,
            datas,
            columnData,
            orderBy,
            orderDirection,
            orderDisplayName,
            sortLists
        } = this.props;
        // console.log(columnData);
        const { open, add, edit, view, soptitle, submitText, selectSopList, refresh, keyWord } = this.state;
        // console.log(this.state);
        return (
            // <Paper className={classes.sopAll}>
            <div className="sops-container">
                <Card className="sops-cont">
                    <Header
                        title={title}
                        subTitle={subTitle}
                        identify={identify}
                        classes={classes}
                        icons={this.getIcons(classes)}
                        listShow={this.listShow}
                        refresh={this.refresh}
                        columnConfig={columnData}
                        columnsChanged={this.columnsChanged}
                    />
                    {/* <div style={{ height: "calc(100% - 64px)", color: "azure" }} > */}
                    <SopList
                        keyWord={keyWord}
                        orderBy={orderBy}
                        orderDirection={orderDirection}
                        orderDisplayName={orderDisplayName}
                        sortLists={sortLists}
                        sortorders={this.state.sortorders}
                        style={{ width: "100%", height: "100%" }}
                        refresh={refresh}
                        identify={identify}
                        datas={datas}
                        pagination={pagination}
                        columnData={columnData}
                        editSops={this.editSops}
                        rowsPerPageOptions={rowsPerPageOptions}
                        multipleSelect={this.props.multipleSelect}
                        onRequestSort={this.onRequestSort}
                        openFloatTab={this.openFloatTab}
                        classes={classes}
                    />
                </Card>
                <AddSops
                    identify={identify}
                    add={add}
                    view={view}
                    toggleDrawerShow={open}
                    title={soptitle}
                    // handleFloatTabClose = {this.close.bind(this)}
                    edit={edit}
                    itemInfo={selectSopList}
                    getFormData={this.getFormData}
                    submitHandle={this.handle.bind(this)}
                    submitText={submitText}
                    handleClose={this.close.bind(this)}
                    sopManagmentSchema={this.props.sopManagmentSchema}
                    classes={classes}
                    // cancleText = {cancleText}
                />
            </div>
            // </Paper>
        );
    }
}
SopPage.propTypes = {
    classes: PropTypes.object.isRequired
};
const filterProps = (state, identify, reducerName, props) => {
    // console.log(state);
    // console.log(identify);
    // console.log(props);
    if (state[reducerName] && state[reducerName][identify]) {
        return state[reducerName][identify][props];
    }
};
const mapStateToProps = (state, ownProps) => {
    let identify = ownProps.identify;
    // console.log("ownProps:", ownProps);
    // console.log("state:", state[sopListReducer]);
    return {
        identify: identify,
        subTitle: filterProps(state, identify, sopListReducer, "subTitle") || ownProps.subTitle || "",
        title: filterProps(state, identify, sopListReducer, "title") || ownProps.title || I18n.t("sop.title"),
        columnData: filterProps(state, identify, sopListReducer, "columnDatas") || ownProps.columnDatas,
        orderDisplayName: filterProps(state, identify, sopListReducer, "orderDisplayName") || ownProps.orderDisplayName,
        orderBy: filterProps(state, identify, sopListReducer, "orderBy") || ownProps.orderBy,
        orderDirection: filterProps(state, identify, sopListReducer, "orderDirection") || ownProps.orderDirection,
        pagination: filterProps(state, identify, sopListReducer, "pagination") || ownProps.pagination,
        rowsPerPageOptions:
            filterProps(state, identify, sopListReducer, "rowsPerPageOptions") || ownProps.rowsPerPageOptions,
        datas: filterProps(state, identify, sopListReducer, "sops") || [],
        pageLimit: filterProps(state, identify, sopListReducer, "pageLimit") || ownProps.pageLimit,
        refresh:
            state[sopListReducer] !== undefined
                ? state[sopListReducer][identify] !== undefined
                    ? state[sopListReducer][identify].refresh !== undefined
                        ? state[sopListReducer][identify].refresh
                        : true
                    : true
                : true,
        multipleSelect: filterProps(state, identify, sopListReducer, "multipleSelect") || ownProps.multipleSelect,
        message:
            state[sopListReducer] !== undefined
                ? state[sopListReducer][identify] !== undefined
                    ? state[sopListReducer][identify].message !== ""
                        ? state[sopListReducer][identify].message
                        : ""
                    : ""
                : "",
        sortLists: filterProps(state, identify, sopListReducer, "sortLists") || ownProps.sortLists,
        sortorders: filterProps(state, identify, sopListReducer, "sortorders") || ownProps.sortorders,
        sopManagmentSchema: filterProps(state, identify, sopListReducer, "sopManagmentSchema")
    };
};
const mapDispatchToProps = dispatch => {
    return {
        searchSopList: (
            identify,
            keyWord,
            sortorders,
            sortLists,
            orderDirection,
            orderDisplayName,
            orderBy,
            pagination
        ) => {
            dispatch(
                searchSopListQequest(
                    identify,
                    keyWord,
                    sortorders,
                    sortLists,
                    orderDirection,
                    orderDisplayName,
                    orderBy,
                    pagination
                )
            );
        },
        searchWordChang: (identify, keyWord) => {
            dispatch(searchWordChang(identify, keyWord));
        },
        submitAddNewSops: (identify, item) => {
            dispatch(addNewSops(identify, item));
        },
        submitEditSops: (identify, item) => {
            dispatch(editSops(identify, item));
        },
        changeAdd: identify => {
            dispatch(changeAdd(identify));
        },
        getSopList: (
            identify,
            keyWord,
            sortorders,
            sortLists,
            orderDirection,
            orderDisplayName,
            orderBy,
            pagination
        ) => {
            dispatch(
                searchSopListQequest(
                    identify,
                    keyWord,
                    sortorders,
                    sortLists,
                    orderDirection,
                    orderDisplayName,
                    orderBy,
                    pagination
                )
            );
        },
        columnsChanged: (identify, currentCheck) => {
            dispatch(columnsChanged(identify, currentCheck));
        },
        changeErrorMessageBox: message => {
            dispatch(error(message));
        },
        changeSuccessMessageBox: message => {
            dispatch(success(message));
        },
        getSopManagmentSchema: (identify, siteName, schemaType) => {
            dispatch(getSopManagmentSchema(identify, siteName, schemaType));
        }
        // sortChange: (identify, orderDirection, orderDisplayName, orderBy, pagination)=>{
        //     dispatch(sortChange(identify, orderDirection, orderDisplayName, orderBy, pagination));
        // }
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(SopPage));
