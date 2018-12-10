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
import { resourceReducerName, resourceActions } from "../../resource/index";
import * as actions from "../funcs/actions";
import TabList from "./tabList";
import { ListItem, ListItemSecondaryAction, ListItemText } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Pagination } from "../../common/index";
import { REDUCER_NAME } from "../funcs/constants";
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
    paginationRoot: {
        width: "562px"
    },
    listHeight: {
        height: "calc(100% - 56px)",
        overflowY: "auto",
        overflowX: "hidden"
    }
});

/**
 * Visualizations Component
 * @example
 *
 * @returns Component
 */
class Visualizations extends React.Component {
    state = {
        checked: [],
        listData: [],
        allChecked: false,
        page: 1,
        rowsPerPage: 20,
        totalrecords: 0,
        searchData: {},
        resourceDatas: [],
        grpid: "",
        editMode: ""
    };

    componentDidMount() {
        const { editMode, searchData } = this.props;
        if (editMode === "view") {
            // this.props.getResource(Object.assign({}, searchData, { grpid, pageno: 1 }));
        } else if (editMode === "edit") {
            const { grpid, ...otherData } = searchData;
            this.props.getResource(Object.assign({}, otherData));
        } else if (editMode === "add") {
            const { grpid, ...otherData } = searchData;
            this.props.visualizations([]);
            this.props.getResource(Object.assign({}, otherData, { pageno: 1 }));
        }
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
        let visualizationsArr = newChecked.map(n => ({ visualizationid: n }));
        this.props.visualizations(visualizationsArr);
    };
    clickAllHandle = () => {
        const { allChecked, listData } = this.state;
        this.setState({
            allChecked: !allChecked,
            checked: allChecked ? listData.map(n => n.id) : []
        });
    };
    handleChangePage = (event, page) => {
        const { grpid } = this.props.currGroupData;
        const { editMode } = this.state;
        let searchData = Object.assign({}, this.props.searchData, {
            pageno: page + 1,
            grpid: editMode !== "view" ? "" : grpid
        });
        this.props.reset({ searchData });
        this.props.getResource(searchData);
    };
    handleChangeRowsPerPage = event => {
        const { grpid } = this.props.currGroupData;
        const { editMode } = this.state;
        let limit = +event.target.value;
        let searchData = Object.assign({}, this.props.searchData, {
            limit,
            grpid: editMode !== "view" ? "" : grpid
        });
        this.props.reset({ searchData });
        this.props.getResource(searchData);
    };
    componentWillReceiveProps(nextProps) {
        const { searchData, resourceDatas, pagination, currGroupData, editMode, group } = nextProps;
        const { visualizations = [] } = group;
        const { totalrecords, currentpage, limit } = pagination;
        const { grpid } = currGroupData;
        const { checked } = this.state;
        if (editMode === "edit") {
            this.props.visualizations(visualizations.map(n => ({ visualizationid: n.visualizationid })));
        }
        this.setState({
            editMode,
            grpid,
            resourceDatas: editMode === "view" ? visualizations : resourceDatas,
            searchData,
            totalrecords,
            page: currentpage,
            rowsPerPage: limit,
            checked: editMode === "add" ? checked : visualizations.map(n => n.visualizationid)
        });
    }

    render() {
        const { checked, editMode, resourceDatas } = this.state;
        const { pagination, classes } = this.props;
        const { totalrecords = resourceDatas.length, currentpage = 1, limit = 10 } = pagination;
        return (
            <React.Fragment>
                <div className={classes.listHeight}>
                    <TabList
                        handleToggle={this.handleToggle}
                        checked={checked}
                        listData={resourceDatas}
                        labelField="displayname"
                        valueField="visualizationid"
                        editMode={editMode}
                    >
                        <ListItem key={"value"} className={classes.listItem} onClick={() => {}}>
                            <ListItemText primary={"Dashboard Name"} />
                            <ListItemSecondaryAction classes={{ root: classes.actionRoot }}>
                                {editMode === "view" ? "Group Access" : "Enable Access"}
                            </ListItemSecondaryAction>
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
Visualizations.propTypes = {
    classes: PropTypes.object.isRequired
};
Visualizations.defaultProps = {};

const mapStateToProps = state => {
    return {
        currGroupData: state[REDUCER_NAME] && state[REDUCER_NAME].currGroupData,
        group: state[REDUCER_NAME] && state[REDUCER_NAME].group,
        currList: state[resourceReducerName] && state[resourceReducerName].currList,
        resourceDatas: state[resourceReducerName] && state[resourceReducerName].payload,
        searchData: state[resourceReducerName] && state[resourceReducerName].searchData,
        pagination: state[resourceReducerName] && state[resourceReducerName].pagination
    };
};

const mapDispatchToProps = dispatch => {
    return {
        reset: reset => {
            dispatch(resourceActions.reset(reset));
        },
        getResource: (searchData, flag) => {
            dispatch(resourceActions.getResource(searchData, flag));
        },
        getGrpIdResource: (searchData, grpid) => {
            dispatch(resourceActions.getGrpIdResource(searchData, grpid));
        },
        visualizations: visualizations => {
            dispatch(actions.visualizations(visualizations));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(Visualizations));
