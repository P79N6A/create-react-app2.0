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
 * Created by SongCheng on 21/11/2018.
 */
import React from "react";
import { withStyles } from "@material-ui/core/styles";
import TablePagination from "@material-ui/core/TablePagination";
import _ from "lodash";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import LastPageIcon from "@material-ui/icons/LastPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import { Input } from "modules/common";

class TablePaginationActions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 1
        };
    }
    componentWillReceiveProps = nextProps => {
        let nextPage = nextProps.page;
        !_.isEqual(nextPage, this.props.page) && this.setPage(nextPage);
    };
    setPage = value => {
        this.setState({
            value: value + 1
        });
    };
    handleFirstPageButtonClick = event => {
        this.props.onChangePage(event, 0);
    };

    handleBackButtonClick = event => {
        this.props.onChangePage(event, this.props.page - 1);
    };

    handleNextButtonClick = event => {
        this.props.onChangePage(event, this.props.page + 1);
    };

    handleLastPageButtonClick = event => {
        this.props.onChangePage(event, Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1));
    };
    handleJumpTo = event => {
        this.setState({ value: event.target.value });
    };
    handleInputKeyUp = event => {
        let maxNum = Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage));
        let isNum = /(^[1-9]\d*$)/.test(event.target.value);
        let value = event.target.value;
        if (event.keyCode === 13 && isNum) {
            let deviation = maxNum - value;
            if (deviation >= 0) {
                this.props.onChangePage(event, parseInt(value - 1, 10));
            }
        }
    };

    render() {
        const { classes, count, page, rowsPerPage, theme } = this.props;
        return (
            <div className={classes.root}>
                <span>Goto</span>
                <Input
                    value={this.state.value}
                    className={classes.input}
                    onChange={this.handleJumpTo}
                    onKeyUp={this.handleInputKeyUp}
                />
                <IconButton onClick={this.handleFirstPageButtonClick} disabled={page === 0} aria-label="First Page">
                    {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
                </IconButton>
                <IconButton onClick={this.handleBackButtonClick} disabled={page === 0} aria-label="Previous Page">
                    {theme.direction === "rtl" ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                </IconButton>
                <IconButton
                    onClick={this.handleNextButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="Next Page"
                >
                    {theme.direction === "rtl" ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                </IconButton>
                <IconButton
                    onClick={this.handleLastPageButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="Last Page"
                >
                    {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
                </IconButton>
            </div>
        );
    }
}

const actionsStyles = theme => ({
    root: {
        flexShrink: 0,
        color: theme.palette.text.secondary,
        marginLeft: theme.spacing.unit * 2.5,
        display: "flex",
        alignItems: "center"
    },
    input: {
        width: "20px",
        marginLeft: "5px",
        fontSize: "inherit",
        "& input": {
            padding: 0,
            textAlign: "center"
        }
    }
});

const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(TablePaginationActions);

const TablePaginations = props => {
    return <TablePagination {...props} ActionsComponent={TablePaginationActionsWrapped} />;
};

export default TablePaginations;
