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
import { I18n } from "react-i18nify";
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
        application: "",
        searchValue: "",
        pagination: {
            totalrecords: 0,
            currentpage: 1,
            limit: 10
        }
    };
    componentDidMount() {
        const { editMode } = this.props;
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
        const { pagination } = this.state;
        let root = Object.assign({}, pagination, { currentpage: page + 1 });
        this.setState({
            pagination: root
        });
    };
    handleChangeRowsPerPage = event => {
        const { pagination } = this.state;
        let limit = +event.target.value;
        let root = Object.assign({}, pagination, { limit, currentpage: 1 });
        this.setState({
            pagination: root
        });
    };
    searchHandle = address => {
        const { pagination } = this.state;
        let root = Object.assign({}, pagination, { currentpage: 1 });
        this.setState({
            searchValue: address,
            pagination: root
        });
    };

    render() {
        const { checked, editMode, pagination = {}, searchValue } = this.state;
        const { classes, applicationidArr = [] } = this.props;
        const { currentpage = 1, limit = 10 } = pagination;
        var reg = new RegExp(searchValue);
        let data = applicationidArr.filter(n => reg.test(n.displayname));
        let renderData = data.slice((currentpage - 1) * limit, currentpage * limit);
        return (
            <React.Fragment>
                <div className={classes.search}>
                    <Search
                        key={"search"}
                        placeholder={I18n.t("security.userGroups.ApplicationName")}
                        searchHandle={this.searchHandle}
                    />
                </div>
                <div className={classes.listHeightSearch}>
                    <TabList
                        handleToggle={this.handleToggle}
                        checked={checked}
                        listData={renderData}
                        labelField={"displayname"}
                        valueField={"applicationid"}
                        editMode={editMode}
                        viewMode={"view"}
                        isSelected
                    >
                        <ListItem key={"value"} className={classes.listItem} onClick={() => {}}>
                            <ListItemText
                                classes={{ root: classes.root }}
                                primary={I18n.t("security.userGroups.ApplicationName")}
                            />
                            <ListItemText
                                classes={{ root: classes.root }}
                                primary={I18n.t("security.userGroups.Permissions")}
                            />
                        </ListItem>
                    </TabList>
                </div>
                <Pagination
                    count={data.length}
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
