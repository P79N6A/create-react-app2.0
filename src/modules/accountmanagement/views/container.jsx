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
import Header from "./header";
import Table from "./table";
import { connect } from "react-redux";
import * as actions from "../funcs/actions";
import { REDUCER_NAME, initState, columnDatas } from "../funcs/constant";
import Drawer from "./drawer";
import Loading from "./loading";
import DeleteDialog from "./deleteDialog";
import _ from "lodash";
import "../styles/index.less";
import { withStyles } from "@material-ui/core";
import { actions as themeActions } from "modules/theme/index";
const styles = theme => ({
    bgcolors: {
        height: "100%",
        position: "relative",
        backgroundColor: theme.palette.background.paper
    }
});
class SystemConfiguration extends React.Component {
    state = { checkColumn: columnDatas.map(n => n.label), columnDatas: columnDatas, editMode: "" };
    componentDidMount() {
        const { searchData } = initState;
        this.props.getAcountList(searchData);
    }
    checkHandleClick = checked => {
        this.setState({
            columnDatas: _.cloneDeep(columnDatas).filter(n => ~checked.indexOf(n.label))
        });
    };
    closeHandle = () => {
        this.props.reset({ drawerOpen: false, account: {} });
    };
    editModeFunc = editMode => {
        this.setState({
            editMode
        });
    };
    searchHandle = value => {
        const { searchData } = this.props;
        let rootData = Object.assign({}, searchData, { displayname: value, pageno: 1 });
        this.props.reset({ searchData: rootData });
        this.props.getAcountList(rootData);
    };
    componentWillUnmount() {
        this.props.reset(initState);
    }
    render() {
        const { checkColumn, editMode, columnDatas } = this.state;
        const { drawerOpen = false, isLoading = false } = this.props;
        const { classes, ...otherProps } = this.props;
        return (
            <div className={classes.bgcolors}>
                {isLoading && <Loading />}
                <DeleteDialog {...otherProps} />
                <Drawer {...otherProps} open={drawerOpen} closeHandle={this.closeHandle} editMode={editMode} />
                <Header
                    checkColumn={checkColumn}
                    checkHandleClick={this.checkHandleClick}
                    addHandleClick={this.addHandleClick}
                    editModeFunc={this.editModeFunc}
                    searchHandle={this.searchHandle}
                    {...otherProps}
                />
                <Table {...otherProps} editModeFunc={this.editModeFunc} columnDatas={columnDatas} editMode={editMode} />
            </div>
        );
    }
}
SystemConfiguration.propTypes = {
    classes: PropTypes.object
};
SystemConfiguration.defaultProps = {};
SystemConfiguration.defaultProps = {};
const mapStateToProps = state => {
    return {
        searchData: state[REDUCER_NAME] && state[REDUCER_NAME].searchData,
        accountList: state[REDUCER_NAME] && state[REDUCER_NAME].payload,
        paginations: state[REDUCER_NAME] && state[REDUCER_NAME].paginations,
        drawerOpen: state[REDUCER_NAME] && state[REDUCER_NAME].drawerOpen,
        isLoading: state[REDUCER_NAME] && state[REDUCER_NAME].isLoading,
        deleteOpen: state[REDUCER_NAME] && state[REDUCER_NAME].deleteOpen,
        drawerLoading: state[REDUCER_NAME] && state[REDUCER_NAME].drawerLoading,
        deleteData: state[REDUCER_NAME] && state[REDUCER_NAME].deleteData,
        account: state[REDUCER_NAME] && state[REDUCER_NAME].account,
        accountGroupDatas: state[REDUCER_NAME] && state[REDUCER_NAME].accountGroupDatas,
        groupSearchData: state[REDUCER_NAME] && state[REDUCER_NAME].groupSearchData,
        logo: state[REDUCER_NAME] && state[REDUCER_NAME].logo,
        accountInfo: state["identify"] && state["identify"].accountinfo
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getAcountList: searchData => {
            dispatch(actions.getAcountList(searchData));
        },
        reset: reset => {
            dispatch(actions.reset(reset));
        },
        getAccountFromID: accountid => {
            dispatch(actions.getAccountFromID(accountid));
        },
        saveAccount: (accountData, searchData, groupData, fileObj) => {
            dispatch(actions.saveAccount(accountData, searchData, groupData, fileObj));
        },
        updateAccount: (accountData, searchData, groupData, fileObj) => {
            dispatch(actions.updateAccount(accountData, searchData, groupData, fileObj));
        },
        deleteAccount: (accountids, searchData) => {
            dispatch(actions.deleteAccount(accountids, searchData));
        },
        getAccountGroupList: (searchData, flag) => {
            dispatch(actions.getAccountGroupList(searchData, flag));
        },
        getLogo: id => {
            dispatch(actions.getLogo(id));
        },
        resetTheme: reset => {
            dispatch(themeActions.reset(reset));
        }
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(SystemConfiguration));
