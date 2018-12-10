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
import PropTypes from "prop-types";
// import { theme } from "modules/theme";
import { connect } from "react-redux";
import { resourcePathActions, resourcePathReducerName } from "../../resource_path/index";
import TabList from "./tabList";
import { ListItem, ListItemText } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import * as actions from "../funcs/actions";
import { REDUCER_NAME } from "../funcs/constants";
import { Search, Pagination } from "../../common/index";
import classnames from "classnames";
import { I18n } from "react-i18nify";
// import Transfer from "./transfer";
// import AddTransfer from "./transferView/addTransfer";
// import EditTransfer from "./transferView/editTransfer";
import _ from "lodash";
// import Transfer from "./transfer";
const styles = theme => ({
    root: {
        "&>span": {
            overflow: "hidden",
            textOverflow: "ellipsis"
        },
        padding: 0,
        width: "50%",
        flex: "none"
    },
    root2: {
        paddingLeft: 8
    },
    text: {
        textAlign: "right",
        padding: 0
    },
    listItem: {},
    actionRoot: {
        right: theme.spacing.unit * 2.5,
        fontSize: "1rem"
    },
    listHeight: {
        // height: "calc(100% - 56px)",
        height: "100%",
        overflowY: "auto",
        overflowX: "hidden"
    },
    listHeightSearch: {
        height: "calc(100% - 88px)",
        overflowY: "auto",
        overflowX: "hidden"
    },
    search: {
        textAlign: "right"
    }
});
/**
 * Applications Component
 * @example
 *
 * @returns Component
 */
class Applications extends React.Component {
    state = {
        checked: [],
        subChecked: [],
        listData: [],
        allChecked: false,
        editMode: "",
        grpid: "",
        applications: [],
        application: ""
    };
    componentDidMount() {
        const { editMode, searchData } = this.props;
        const { grpid, ...otherData } = searchData;
        this.props.applicationidFunc([]);
        this.props.getResourcePath(Object.assign({}, otherData, { pageno: 1, address: "" }));
        this.setState({
            editMode,
            targetKeys: [],
            tempData: []
        });
    }
    handleToggle = value => e => {
        const { checked, subChecked } = this.state;
        const { applicationidArr, applications = [] } = this.props;
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];
        let root, rootSub;
        if (currentIndex === -1) {
            newChecked.push(value);
            let displayname = applications.find(n => n["address.iotTopologyId"] === value) || {};
            root = applicationidArr.concat([
                { applicationid: value, readwrite: 1, displayname: displayname["address.displayName"] || "None" }
            ]);
            rootSub = subChecked;
        } else {
            root = applicationidArr.filter(n => n.applicationid !== value);
            newChecked.splice(currentIndex, 1);
            rootSub = subChecked.filter(n => n !== value);
        }
        this.setState({
            checked: newChecked,
            subChecked: rootSub
        });
        this.props.applicationidFunc(root);
    };
    subHandleToggle = value => e => {
        const { subChecked } = this.state;
        const { applicationidArr } = this.props;
        const currentIndex = subChecked.indexOf(value);
        const newChecked = [...subChecked];
        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        this.setState({
            subChecked: newChecked
        });
        let rootApplicationid = applicationidArr.map(n => {
            if (newChecked.includes(n.applicationid)) {
                n.readwrite = 0;
            } else {
                n.readwrite = 1;
            }
            return n;
        });
        this.props.reset({ applicationidArr: rootApplicationid });
    };
    clickAllHandle = () => {
        const { allChecked, listData } = this.state;
        this.setState({
            allChecked: !allChecked,
            checked: allChecked ? listData.map(n => n.id) : []
        });
    };
    handleChangePage = (event, page) => {
        const { editMode } = this.state;
        if (editMode === "view") {
        } else {
            let searchData = Object.assign({}, this.props.searchData, { pageno: page + 1 }, { searchFlag: false });
            this.props.reset({ applicationSearchData: searchData });
            this.props.getResourcePath(searchData);
        }
    };
    handleChangeRowsPerPage = event => {
        const { editMode } = this.state;
        let limit = +event.target.value;
        if (editMode === "view") {
        } else {
            let searchData = Object.assign({}, this.props.searchData, { limit }, { searchFlag: false });
            this.props.reset({ applicationSearchData: searchData });
            this.props.getResourcePath(searchData);
        }
    };
    searchHandle = address => {
        const { searchData } = this.props;
        let rootData = Object.assign({}, searchData, { address }, { searchFlag: false });
        this.props.reset({ applicationSearchData: rootData });
        this.props.getResourcePath(rootData);
    };
    componentWillReceiveProps(nextProps) {
        const { editMode, group } = nextProps;
        let { applications = [] } = group;
        if (!_.isEqual(group, this.props.group)) {
            let checked = applications.map(n => n.applicationid);
            let subChecked = applications.filter(n => n.readwrite === 0).map(n => n.applicationid);
            this.setState({
                checked,
                subChecked
            });
        }
        this.setState({
            editMode
        });
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (_.isEqual(nextProps, this.props) && _.isEqual(nextState, this.state)) return false;
        return true;
    }
    render() {
        const { checked, editMode, subChecked = [] } = this.state;
        const { classes, pagination = {} } = this.props;
        const { applications = [] } = this.props;
        const { totalrecords = applications.length, currentpage = 1, limit = 10 } = pagination;
        return (
            <React.Fragment>
                <div className={classes.search}>
                    <Search key={"search"} placeholder={I18n.t("security.userGroups.ApplicationName")} searchHandle={this.searchHandle} />
                </div>
                <div className={editMode === "view" ? classes.listHeight : classes.listHeightSearch}>
                    <TabList
                        handleToggle={this.handleToggle}
                        subHandleToggle={this.subHandleToggle}
                        checked={checked}
                        subChecked={subChecked}
                        listData={applications}
                        labelField={editMode === "view" ? "displayname" : "address.displayName"}
                        valueField={editMode === "view" ? "applicationid" : "address.iotTopologyId"}
                        editMode={editMode}
                    >
                        <ListItem key={"value"} className={classes.listItem} onClick={() => {}}>
                            <ListItemText classes={{ root: classes.root }} primary={I18n.t("security.userGroups.ApplicationName")} />
                            <ListItemText
                                classes={{ root: classnames(classes.root, classes.root2) }}
                                primary={I18n.t("security.userGroups.Permissions")}
                            />
                        </ListItem>
                    </TabList>
                </div>
                <Pagination
                    count={totalrecords}
                    rowsPerPage={limit}
                    page={currentpage - 1}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    rowsPerPageOptions={[10, 20, 30]}
                />
            </React.Fragment>
        );
    }
}
Applications.propTypes = {
    classes: PropTypes.object.isRequired
};
Applications.defaultProps = {};

const mapStateToProps = state => {
    return {
        searchData: state[REDUCER_NAME] && state[REDUCER_NAME].applicationSearchData,
        pagination: state[resourcePathReducerName] && state[resourcePathReducerName].pagination,
        application: state[REDUCER_NAME] && state[REDUCER_NAME].application,
        applications: state[resourcePathReducerName] && state[resourcePathReducerName].payload,
        currGroupData: state[REDUCER_NAME] && state[REDUCER_NAME].currGroupData,
        group: state[REDUCER_NAME] && state[REDUCER_NAME].group,
        applicationidArr: state[REDUCER_NAME] && state[REDUCER_NAME].applicationidArr
    };
};

const mapDispatchToProps = dispatch => {
    return {
        reset: reset => {
            dispatch(actions.reset(reset));
        },
        getResourcePath: (searchData, flag) => {
            dispatch(resourcePathActions.getResourcePath(searchData, flag));
        },
        coverApplications: applications => {
            dispatch(resourcePathActions.coverApplications(applications));
        },
        getApplicationFromGrpId: searchData => {
            dispatch(actions.getApplicationFromGrpId(searchData));
        },
        applicationidFunc: visualizations => {
            dispatch(actions.applicationidFunc(visualizations));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(Applications));
