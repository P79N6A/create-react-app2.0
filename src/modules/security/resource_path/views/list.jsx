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
import { connect } from "react-redux";
import { Table, Search } from "../../common/index";
import { columnDatas } from "../funcs/constants";
// import { theme } from "modules/theme";
import * as actions from "../funcs/actions";
import { withStyles } from "@material-ui/core/styles";
import { REDUCER_NAME } from "../funcs/constants";
const styles = theme => ({});
/**
 * ApplicationsList component table component
 * @example
 *
 *
 * @param {array} groupDatas
 * @param {array} roleDatas
 * @param {array} userDatas
 * @returns Component
 */
class ApplicationsList extends React.Component {
    state = {
        roleList: [],
        page: 1,
        rowsPerPage: 20,
        count: 0,
        radioSelected: ""
    };
    searchHandle = value => {
        let postData = {
            grpname: value
        };
        this.props.getGroup(postData);
    };

    componentWillReceiveProps(nextProps) {
        const { roleList, pagination, radioSelected } = nextProps;
        const { currentpage, limit, totalrecords } = pagination;
        this.setState({
            roleList,
            page: currentpage - 1,
            rowsPerPage: limit,
            count: totalrecords,
            radioSelected
        });
    }
    getIcons = () => {
        return [
            {
                visible: !this.state.mode,
                content: () => {
                    return <Search key={"search"} searchHandle={this.searchHandle} />;
                }
            }
        ];
    };
    searchHandle = address => {
        const { searchData } = this.props;
        let postData = Object.assign({}, searchData, { address });
        this.props.reset({ searchData: postData });
        this.props.getResourcePath(postData);
    };
    handleChangePage = pageno => {
        const { searchData } = this.props;
        pageno = pageno + 1;
        let postData = Object.assign({}, searchData, { pageno });
        this.props.reset({ searchData: postData });
        this.props.getResourcePath(postData);
    };
    handleChangeRowsPerPage = limit => {
        const { searchData } = this.props;
        let postData = Object.assign({}, searchData, { limit });
        this.props.reset({ searchData: postData });
        this.props.getResourcePath(postData);
    };
    srot = (order, orderBy) => {
        const { searchData } = this.props;
        let orderby = orderBy + " " + order;
        let postData = Object.assign({}, searchData, { orderby });
        this.props.reset({ searchData: postData });
        this.props.getResourcePath(postData);
    };
    radioHandle = radioSelected => {
        this.props.radioSelectedFunc(radioSelected);
    };

    render() {
        const { roleList, page, rowsPerPage, count, radioSelected } = this.state;
        return (
            <div style={{ height: "calc(100%)", position: "relative", overflow: "hidden" }}>
                <div style={{ height: "100%" }}>
                    <Table
                        radioHandle={this.radioHandle}
                        radioSelected= {radioSelected}
                        select
                        selectType="radio"
                        selectField="address.iotTopologyId"
                        icons={this.getIcons()}
                        columnData={columnDatas}
                        tableData={roleList}
                        page={page}
                        rowsPerPage={rowsPerPage}
                        count={count}
                        handleChangePage={this.handleChangePage}
                        handleChangeRowsPerPage={this.handleChangeRowsPerPage}
                        srot={this.srot}
                        backendPagination
                    />
                </div>
            </div>
        );
    }
}
ApplicationsList.propTypes = {
    classes: PropTypes.object.isRequired
};
ApplicationsList.defaultProps = {};

const mapStateToProps = state => {
    return {
        roleList: state[REDUCER_NAME] && state[REDUCER_NAME].payload,
        pagination: state[REDUCER_NAME] && state[REDUCER_NAME].pagination,
        searchData: state[REDUCER_NAME] && state[REDUCER_NAME].searchData,
        radioSelected: state[REDUCER_NAME] && state[REDUCER_NAME].radioSelected
    };
};

const mapDispatchToProps = dispatch => {
    return {
        reset: reset => {
            dispatch(actions.reset(reset));
        },
        getResourcePath: (searchData, flag) => {
            dispatch(actions.getResourcePath(searchData, flag));
        },
        radioSelectedFunc: radioSelected => {
            dispatch(actions.radioSelected(radioSelected));
        }
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(ApplicationsList));
