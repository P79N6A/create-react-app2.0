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
 * Created by HuLin on 03/08/2018.
 */

import React from "react";
//import classNames from "classnames";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { REDUCER_NAME } from "../funcs/constants";
import { setReFreshModel, setDeviceBasicType } from "../funcs/actions";

import CommonTable from "./common/commonTable";
import { ISC_ACCOUNT_INFO } from "commons/constants/const";

const sitename = sessionStorage.getItem(ISC_ACCOUNT_INFO) && JSON.parse(sessionStorage.getItem(ISC_ACCOUNT_INFO)).displayname;

const styles = {
    table: {}
};

class Models extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentCheck: [],
            selected: [],
            orderBy: this.props.pagination.orderBy,
            order: this.props.pagination.order,
            pagination: {}
        };
    }

    componentWillMount = () => {
        const { pagination } = this.props;
        this.props.onSetReFreshModel(pagination.page, pagination.rowsPerpage, pagination.orderBy, pagination.order);
        //get device basic type
        this.props.onSetDeviceBasicType(sitename);
    };

    handleSelectAllClick = event => {
        if (event.target.checked) {
            this.setState(state => ({ selected: state.data.map(n => n.id) }));
            return;
        }
        this.setState({ selected: [] });
    };

    handleClickCheckbox = (event, id) => {
        event.preventDefault();
        event.stopPropagation();
        const { selected } = this.state;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }

        this.setState({ selected: newSelected });
    };

    handleRequestCommonSort = (orderBy, order) => {
        const { pagination } = this.props;
        this.setState({
            orderBy: orderBy,
            order: order
        });

        this.props.onSetReFreshModel(pagination.page, pagination.rowsPerpage, orderBy, order);
    };

    searchMachineFunc = (page, rowsPerpage) => {
        const { orderBy, order } = this.state;
        this.setState({
            data: [],
            selected: []
        });
        this.props.onSetReFreshModel(page, rowsPerpage, orderBy, order);
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    handleClearData = () => {
        const { pagination } = this.props;
        setTimeout(() => {
            this.props.onSetReFreshModel(1, pagination.rowsPerpage, pagination.orderBy, pagination.order);
        }, 1000);
    };

    render() {
        const { selected } = this.state;
        const { data, pagination, ...other } = this.props;
        return (
            <div className="table-root">
                <CommonTable
                    {...other}
                    identify={this.props.identify}
                    data={data}
                    selected={selected}
                    searchMachineFunc={this.searchMachineFunc.bind(this)}
                    handleRequestCommonSort={this.handleRequestCommonSort.bind(this)}
                    pagination={pagination}
                    handleClearData={this.handleClearData.bind(this)}
                />
            </div>
        );
    }
}

Models.propTypes = {
    classes: PropTypes.object.isRequired
};

Models.defaultProps = {
    data: [],
    pagination: {
        page: 1,
        rowsPerpage: 20,
        orderBy: "modelName",
        order: "desc",
        totalNum: 0
    }
};

const mapStateToProps = (state, ownProps) => {
    if (state[REDUCER_NAME] && state[REDUCER_NAME].model) {
        return {
            pagination: state[REDUCER_NAME].model.pagination,
            data: state[REDUCER_NAME].model.modelTable || []
        };
    } else {
        return {
            data: []
        };
    }
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onSetReFreshModel: (page, rowsPerPage, orderBy, order) => {
            dispatch(setReFreshModel(page, rowsPerPage, orderBy, order, props.identify));
        },
        onSetDeviceBasicType: (sitename)=> {
            dispatch(setDeviceBasicType(sitename, props.identify));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(Models));
