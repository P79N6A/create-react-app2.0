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
 * Created by Jia Luo on 27/07/2018.
 */
import React from "react";
import { REDUCER_NAME, initialState } from "../funcs/constants";
import { REDUCER_NAME as roleReducer } from "../../role/funcs/constants";
import { REDUCER_NAME as groupReducer } from "../../group/funcs/constants";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import * as actions from "../funcs/actions";
import Header from "./header";
import { columnDatas } from "../funcs/constants";
import { Loading } from "../../common/index";
import _ from "lodash";
import Table from "./table";
import Dawer from "./dawer";
import DeleteDialog from "./deleteDialog";
import * as message from "modules/messageCenter/funcs/actions";
import "../styles/index.less";
// import AddUser from "./addUser";
const styles = theme => ({
    root: {
        width: "100%",
        height: "100%",
        // background: themes.palette.primary.main,
        backgroundColor: theme.palette.background.paper,
        position: "relative"
        // display: "flex"
    },
    management: { marginRight: theme.spacing.unit * 1.5, width: "80%" },
    details: {}
});
/**
 * user view component
 * @example
 * @returns Component
 */
class Container extends React.Component {
    state = {
        userDatas: [],
        search: "",
        userData: {},
        loading: false,
        checkColumn: columnDatas.map(n => n.label),
        columnDatas: columnDatas,
        editMode: ""
    };

    componentDidMount() {
        const { searchData } = initialState;
        let postData = Object.assign({}, searchData);
        this.props.getUser(postData);
        // this.props.getGroup({ limit: 1000, pageno: 1 });
    }
    editModeFunc = editMode => {
        this.setState({
            editMode
        });
    };
    componentWillReceiveProps(nextProps) {
        const { userDatas, userData, roleList, loading, currGroupData, userList } = nextProps;
        this.setState({ userDatas, userData, userList, groupList: [currGroupData], roleList, loading });
    }
    checkHandleClick = checked => {
        this.setState({
            columnDatas: _.cloneDeep(columnDatas).filter(n => ~checked.indexOf(n.label))
        });
    };
    searchHandle = value => {
        const { searchData } = this.props;
        this.props.combineSearchData(Object.assign({}, searchData, { likesearchuserid: value, pageno: 1 }));
        this.props.reset({ seachValue: value, openDrawer: false, currUserData: {}, avator: [] });
        this.props.getUser(Object.assign({}, this.props.searchData, { likesearchuserid: value, pageno: 1 }));
    };
    componentWillUnmount() {
        this.props.reset(initialState);
    }

    render() {
        // const { classes,  } = this.props;
        const { checkColumn, editMode, columnDatas } = this.state;
        const { classes, loading, ...removeClassesProps } = this.props;
        return (
            <div className={classes.root}>
                <Dawer {...removeClassesProps} editMode={editMode} />
                <DeleteDialog {...removeClassesProps} />
                {loading && <Loading />}
                <Header
                    searchHandle={this.searchHandle}
                    checkColumn={checkColumn}
                    checkHandleClick={this.checkHandleClick}
                    addHandleClick={this.addHandleClick}
                    editModeFunc={this.editModeFunc}
                    {...this.props}
                />
                {this.props.inset}
                <Table
                    {...removeClassesProps}
                    editModeFunc={this.editModeFunc}
                    columnDatas={columnDatas}
                    editMode={editMode}
                />
                {/* <List inset={this.props.inset} userDatas={userList} groupDatas={groupList} /> */}
            </div>
        );
    }
}
Container.propTypes = {
    // classes: PropTypes.object.isRequired
};

Container.defaultProps = {};

const mapStateToProps = state => {
    return {
        userList: state[REDUCER_NAME] && state[REDUCER_NAME].payload,
        currGroupData: state[groupReducer] && state[groupReducer].currGroupData,
        users: state[groupReducer] && state[groupReducer].users,
        roleList: state[roleReducer] && state[roleReducer].payload,
        searchData: state[REDUCER_NAME] && state[REDUCER_NAME].searchData,
        userData: state[REDUCER_NAME] && state[REDUCER_NAME].userData,
        currUserData: state[REDUCER_NAME] && state[REDUCER_NAME].currUserData,
        groups: state[REDUCER_NAME] && state[REDUCER_NAME].payload,
        loading: state[REDUCER_NAME] && state[REDUCER_NAME].loading,
        groupDatas: state[REDUCER_NAME] && state[REDUCER_NAME].groupAllList,
        pagination: state[REDUCER_NAME] && state[REDUCER_NAME].pagination,
        openDrawer: state[REDUCER_NAME] && state[REDUCER_NAME].openDrawer,
        drawerLoading: state[REDUCER_NAME] && state[REDUCER_NAME].drawerLoading,
        deleteOpen: state[REDUCER_NAME] && state[REDUCER_NAME].deleteOpen,
        deleteData: state[REDUCER_NAME] && state[REDUCER_NAME].deleteData
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getUser: searchData => {
            dispatch(actions.getUser(searchData));
        },
        getGroup: searchData => {
            dispatch(actions.getGroup(searchData));
        },
        selectUser: userData => {
            dispatch(actions.selectUser(userData));
        },
        addUser: (userData, groupData, searchData, fileObj) => {
            dispatch(actions.addUser(userData, groupData, searchData, fileObj));
        },
        updateUser: (userData, groupData, searchData, fileObj) => {
            dispatch(actions.updateUser(userData, groupData, searchData, fileObj));
        },
        deleteUser: (userIds, searchData) => {
            dispatch(actions.deleteUser(userIds, searchData));
        },
        combineSearchData: async searchData => {
            dispatch(actions.combineSearchData(searchData));
        },
        reset: reset => {
            dispatch(actions.reset(reset));
        },
        getUserFromId: userid => {
            dispatch(actions.getUserFromId(userid));
        },
        getAvator: mediaFileId => {
            dispatch(actions.getAvator(mediaFileId));
        },
        warn: msg => {
            dispatch(message.warn(msg));
        },
        sendEmailToUser: userid => {
            dispatch(actions.sendEmailToUser(userid));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(Container));
