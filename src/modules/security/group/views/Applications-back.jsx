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
import { ListItem, ListItemSecondaryAction, ListItemText } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import * as actions from "../funcs/actions";
import { REDUCER_NAME } from "../funcs/constants";
import {  Search } from "../../common/index";
// import Transfer from "./transfer";
import AddTransfer from "./transferView/addTransfer";
import EditTransfer from "./transferView/editTransfer";
// import Transfer from "./transfer";
const styles = theme => ({
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
        listData: [],
        allChecked: false,
        editMode: "",
        grpid: "",
        applications: [],
        application: ""
    };
    componentDidMount() {
        const {  editMode } = this.props;
        this.setState({
            editMode
        });
    }
    handleToggle = value => e => {
        const { checked } = this.state;
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        this.setState({
            checked: newChecked
        });
        let applicationidArr = newChecked.map(n => ({ applicationid: n }));
        this.props.applicationidFunc(applicationidArr);
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
        const {
            searchData,
            pagination = { totalrecords: 0, currentpage: 1, limit: 10 },
            applications = [],
            application,
            editMode,
            group
        } = nextProps;
        const { checked } = this.state;
        let { applications: currapplications, grpid } = group;
        if (!Array.isArray(currapplications)) {
            currapplications = [];
        }
        const { totalrecords = applications.length, currentpage = 1, limit = 10 } = pagination;
        if (editMode === "edit") {
            this.props.applicationidFunc(currapplications.map(n => ({ applicationid: n.applicationid })));
        }
        this.setState({
            editMode,
            grpid,
            application,
            applications: editMode === "view" ? currapplications : applications,
            searchData,
            totalrecords: editMode === "view" ? currapplications.length : totalrecords,
            page: editMode === "view" ? 1 : currentpage,
            rowsPerPage: limit,
            checked: editMode === "add" ? checked : currapplications.map(n => n.applicationid)
        });
    }
    render() {
        const { checked, editMode } = this.state;
        const { classes, group = {} } = this.props;
        const { applications = [] } = group;
        // const { totalrecords = applications.length, currentpage = 1, limit = 10 } = pagination;
        return (
            <React.Fragment>
                {editMode === "add" ? (
                    <AddTransfer editMode={editMode} />
                ) : editMode === "edit" ? (
                    <EditTransfer editMode={editMode} />
                ) : (
                    <React.Fragment>
                        <div className={classes.search}>
                            {editMode !== "view" && <Search key={"search"} searchHandle={this.searchHandle} />}
                        </div>
                        <div className={editMode === "view" ? classes.listHeight : classes.listHeightSearch}>
                            <TabList
                                handleToggle={this.handleToggle}
                                checked={checked}
                                listData={applications}
                                labelField={editMode === "view" ? "displayname" : "address.displayName"}
                                valueField={editMode === "view" ? "applicationid" : "address.iotTopologyId"}
                                editMode={editMode}
                            >
                                <ListItem key={"value"} className={classes.listItem} onClick={() => {}}>
                                    <ListItemText primary={"Application Name"} />
                                    <ListItemSecondaryAction classes={{ root: classes.actionRoot }}>
                                        {editMode === "view" ? "Group Access" : "Enable Access"}
                                    </ListItemSecondaryAction>
                                </ListItem>
                            </TabList>
                        </div>
                    </React.Fragment>
                )}

                {/* <Pagination
                    count={totalrecords}
                    rowsPerPage={limit}
                    page={currentpage - 1}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    rowsPerPageOptions={[10, 20, 30]}
                /> */}
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
        group: state[REDUCER_NAME] && state[REDUCER_NAME].group
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
