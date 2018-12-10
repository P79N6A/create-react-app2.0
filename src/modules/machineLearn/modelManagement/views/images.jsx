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
import CommonTable from "./common/commonTable";

const styles = {
    table: {}
};

class Images extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    id: 1,
                    name: "image",
                    version: "1.0",
                    description: "bbb",
                    createdOn: "2018-11-20 09:46:30"
                }
            ],
            //currentCheck: [],
            order: "name",
            orderBy: "desc",
            //selected: [],
            pagination: {
                page: 1,
                rowsPerPage: 10,
                totalrecords: 12
            }
        };
    }

    // handleClickCheckbox = (event, id) => {
    //     event.preventDefault();
    //     event.stopPropagation();
    //     const { selected } = this.state;
    //     const selectedIndex = selected.indexOf(id);
    //     let newSelected = [];

    //     if (selectedIndex === -1) {
    //         newSelected = newSelected.concat(selected, id);
    //     } else if (selectedIndex === 0) {
    //         newSelected = newSelected.concat(selected.slice(1));
    //     } else if (selectedIndex === selected.length - 1) {
    //         newSelected = newSelected.concat(selected.slice(0, -1));
    //     } else if (selectedIndex > 0) {
    //         newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    //     }

    //     this.setState({ selected: newSelected });
    // };

    // handleSelectColumns = selectedColumn => {
    //     this.setState(
    //         Object.assign(this.state, {
    //             currentCheck: selectedColumn
    //         })
    //     );
    // };

    searchMachineFunc = (currentPage, rowsPerPage) => {
        this.setState({
            pagination: {
                page: currentPage,
                rowsPerPage: rowsPerPage,
                totalrecords: 12
            }
        });
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    render() {
        const { order, orderBy, selected, data, pagination } = this.state;
        return (
            <CommonTable
                {...this.props}
                identify={this.props.identify}
                data={data}
                order={order}
                orderBy={orderBy}
                selected={selected}
                rowsPerPage={pagination.rowsPerPage}
                searchMachineFunc={this.searchMachineFunc.bind(this)}
                pagination={pagination}
            />
        );
    }
}

Images.propTypes = {
    classes: PropTypes.object.isRequired
};

Images.defaultProps = {
    pagination: {
        page: 1,
        rowsPerPage: 10,
        totalrecords: 12
    }
};

export default withStyles(styles)(Images);
