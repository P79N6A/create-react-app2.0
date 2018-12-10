import React from "react";
import PropTypes from "prop-types";
// import { theme } from "modules/theme";
import { withStyles } from "@material-ui/core/styles";
import { usersColumnDatas } from "../funcs/constants";
import { Table, Search } from "../../common/index";
import { connect } from "react-redux";
import { REDUCER_NAME } from "../funcs/constants";
import { REDUCER_NAME as userReducerName } from "../../user/funcs/constants";
import * as actions from "../funcs/actions";
import _ from "lodash";
import { I18n } from "react-i18nify";
const styles = theme => ({
    button: { width: 32, height: 32 },
    users: { height: "100%" },
    search: { textAlign: "right" },
    table: {
        height: "calc(100% - 32px)"
    },
    tableHeight: {
        height: "calc(100% - 56px)"
    }
});
class Users extends React.Component {
    state = { originUsers: [], users: [], grpid: "", search: "", editMode: "view", flag: false };
    actionContent = () => {
        const { originUsers, search } = this.state;
        const { groupSeachValue, userSearchData } = this.props;
        const { grpid } = userSearchData;
        return [
            {
                icon: "delete",
                func: n => () => {
                    let postData = [
                        {
                            userid: n.userid,
                            updatetype: "delete",
                            groups: [{ grpid: grpid }]
                        }
                    ];
                    this.props.reset({ drawerLoading: true });
                    this.props.updateUsreGroup(postData, { grpname: groupSeachValue }, userSearchData);
                    let root = originUsers.filter(m => m.userid !== n.userid);
                    let users = root.filter(m => ~m.username.indexOf(search));
                    this.setState({
                        originUsers: root,
                        users: users,
                        flag: true
                    });
                }
            }
        ];
    };
    searchHandle = value => {
        let searchData = Object.assign({}, this.props.userSearchData, { username: value });
        this.props.reset({ userSearchData: searchData });
        this.props.getUserFromGrpId(searchData);
    };
    handleChangePage = page => {
        let searchData = Object.assign({}, this.props.userSearchData, { pageno: page + 1 });
        this.props.reset({ userSearchData: searchData });
        this.props.getUserFromGrpId(searchData);
    };
    handleChangeRowsPerPage = event => {
        let limit = +event;
        let searchData = Object.assign({}, this.props.userSearchData, { limit, pageno: 1 });
        this.props.reset({ userSearchData: searchData });
        this.props.getUserFromGrpId(searchData);
    };
    shouldComponentUpdate(nextProps) {
        if (_.isEqual(nextProps, this.props)) return false;
        return true;
    }
    render() {
        const { classes, userPagination = {}, users = [], editMode } = this.props;
        const { totalrecords = 0, limit = 10, currentpage = 1 } = userPagination;
        const action = editMode === "edit" ? true : false;
        return (
            <div className={classes.users}>
                <div className={classes.search}>
                    <Search
                        key={"search"}
                        placeholder={I18n.t("security.userGroups.UserName")}
                        searchHandle={this.searchHandle}
                    />
                </div>
                <div className={classes.table}>
                    <Table
                        // icons={this.getIcons()}
                        page={currentpage - 1}
                        rowsPerPage={limit}
                        count={totalrecords}
                        columnData={usersColumnDatas}
                        tableData={users}
                        clickRow={this.clickRow}
                        action={action}
                        actionContent={this.actionContent()}
                        handleChangePage={this.handleChangePage}
                        handleChangeRowsPerPage={this.handleChangeRowsPerPage}
                        rowsPerPageOptions={[10, 20, 30]}
                        backendPagination={true}
                        // isPagination={false}
                    />
                </div>
            </div>
        );
    }
}
Users.propTypes = {
    classes: PropTypes.object
};
Users.defaultProps = {
    searchHandle: () => () => {}
};

const mapStateToProps = state => {
    return {
        currGroupData: state[REDUCER_NAME] && state[REDUCER_NAME].currGroupData,
        users: state[REDUCER_NAME] && state[REDUCER_NAME].users,
        group: state[REDUCER_NAME] && state[REDUCER_NAME].group,
        groupSeachValue: state[REDUCER_NAME] && state[REDUCER_NAME].seachValue,
        userPagination: state[REDUCER_NAME] && state[REDUCER_NAME].userPagination,
        userSearchData: state[REDUCER_NAME] && state[REDUCER_NAME].userSearchData,
        userSeachValue: state[userReducerName] && state[userReducerName].seachValue
    };
};

const mapDispatchToProps = dispatch => {
    return {
        updateUsreGroup: (groupData, groupSearchData, userSearchData) => {
            dispatch(actions.updateUsreGroup(groupData, groupSearchData, userSearchData));
        },
        getUserFromGrpId: userSearchData => {
            dispatch(actions.getUserFromGrpId(userSearchData));
        },
        reset: reset => {
            dispatch(actions.reset(reset));
        }
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(Users));
