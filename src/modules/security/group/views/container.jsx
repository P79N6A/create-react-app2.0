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
import React, { Component } from "react";
import * as actions from "../funcs/actions";
import { connect } from "react-redux";
import { REDUCER_NAME, initialState } from "../funcs/constants";
import { REDUCER_NAME as roleReducer } from "../../role/funcs/constants";
import { REDUCER_NAME as userReducer } from "../../user/funcs/constants";
import { REDUCER_NAME as ResourcePath_ReducerName } from "../../resource_path/funcs/constants";
// import GroupList from "./list";
import Header from "./header";
import Dawer from "./dawer";
import Table from "./table";
import { Loading } from "../../common/index";
import { columnDatas } from "../funcs/constants";
import * as UserActions from "../../user/funcs/actions";
import _ from "lodash";

/**
 * group view component
 * @example
 * @returns Component
 */
class View extends Component {
    state = {
        columnDatas: _.cloneDeep(columnDatas),
        groupList: [],
        userList: [],
        roleList: [],
        editMode: ""
    };
    componentDidMount() {
        const { searchData } = initialState;
        this.props.reset(initialState);
        this.props.getGroup(searchData);
    }
    componentWillReceiveProps(nextProps) {
        const { groupList, roleList, userList, loading } = nextProps;
        this.setState({
            groupList,
            userList,
            roleList,
            loading
        });
    }
    componentWillUnmount() {
        this.props.reset(initialState);
    }
    changeMode = editMode => {
        this.setState({
            editMode
        });
    };
    checkClick = checked => {
        this.setState({
            columnDatas: columnDatas.filter(n => ~checked.indexOf(n.label))
        });
    };
    render() {
        const { loading, editMode, columnDatas } = this.state;
        return (
            <div style={{ height: "calc(100%)", position: "relative", overflow: "hidden" }}>
                {loading && <Loading />}
                {/* <DeleteDialog name={groupName} open={deleteOpen} onCancel={this.onCancel} onSubmit={this.onSubmit} /> */}
                <Dawer {...this.props} editMode={editMode} />
                <Header {...this.props} checkClick={this.checkClick} changeMode={this.changeMode} />
                {this.props.inset}
                <Table {...this.props} editMode={editMode} changeMode={this.changeMode} columnDatas={columnDatas} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        groupList: state[REDUCER_NAME] && state[REDUCER_NAME].payload,
        userList: state[userReducer] && state[userReducer].payload,
        roleList: state[roleReducer] && state[roleReducer].payload,
        loading: state[REDUCER_NAME] && state[REDUCER_NAME].loading,
        currGroupData: state[REDUCER_NAME] && state[REDUCER_NAME].currGroupData,
        visualizations: state[REDUCER_NAME] && state[REDUCER_NAME].visualizations,
        editApplication: state[REDUCER_NAME] && state[REDUCER_NAME].editApplication,
        radioSelected: state[ResourcePath_ReducerName] && state[ResourcePath_ReducerName].radioSelected,
        applicationidArr: state[REDUCER_NAME] && state[REDUCER_NAME].applicationidArr,
        pagination: state[REDUCER_NAME] && state[REDUCER_NAME].pagination,
        searchData: state[REDUCER_NAME] && state[REDUCER_NAME].searchData,
        userSearchData: state[REDUCER_NAME] && state[REDUCER_NAME].userSearchData,
        drawerOpen: state[REDUCER_NAME] && state[REDUCER_NAME].drawerOpen,
        drawerLoading: state[REDUCER_NAME] && state[REDUCER_NAME].drawerLoading
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getGroup: (searchData, flag) => {
            dispatch(actions.getGroup(searchData, flag));
        },
        reset: reset => {
            dispatch(actions.reset(reset));
        },
        getUser: (searchData, flag) => {
            dispatch(UserActions.getUser(searchData, flag));
        },
        addGroup: (group, searchData) => {
            dispatch(actions.addGroup(group, searchData));
        },
        updateGroup: (group, searchData) => {
            dispatch(actions.updateGroup(group, searchData));
        },
        deleteGroup: (groupId, searchData) => {
            dispatch(actions.deleteGroup(groupId, searchData));
        },
        getGroupFromId: grpid => {
            dispatch(actions.getGroupFromId(grpid));
        },
        getUserFromGrpId: userSearchData => {
            dispatch(actions.getUserFromGrpId(userSearchData));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(View);
