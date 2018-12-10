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
 * Created by SongCheng on 31/08/2018.
 */
import React, { Component } from "react";
import AuditListColumns from "./columns";
import { connect } from "react-redux";
import { saveSelectColumns } from "modules/audit/auditList/funcs/actions";
import "../styles/style.less";
import { withStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import CardHeader from "@material-ui/core/CardHeader";
import FilterListIcon from "@material-ui/icons/FilterList";
import Card from "@material-ui/core/Card";
import { filterCondition } from "modules/audit/auditList/funcs/filterCondition";
import AuditFilter from "./filter";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
    paper: {
        marginRight: theme.spacing.unit * 2
    }
});

class AuditSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemArr: [],
            content: {},
            getItems: [],
            saveItems: [],
            pageNo: 1,
            pageLimit: 10,
            selectInitOptions: [],
            anchorEl: null,
            expanded: false
        };
    }

    handleSubmit = val => {
        let arr = [];
        this.setState(
            {
                getItems: Object.assign(this.state.getItems, this.state.content)
            },
            () => {
                let loop = this.state.getItems.length;
                for (let i = 0; i <= loop; i++) {
                    if (this.state.getItems[i] && this.state.getItems[i].option) {
                        let item = this.state.getItems[i];
                        arr.push(item);
                    }
                }
                let predicate = filterCondition(arr, this.props.currentTime);
                this.props.handlItemsData(predicate);
                if ("remove" === val) {
                    this.handleGetData(predicate);
                }
            }
        );
    };

    handleGetData = val => {
        let identify = this.props.identify;
        let pageLimit = this.props[identify].pageLimit;
        if (val) {
            let predicate = {
                operator: "AND",
                predicates: val
            };
            this.props.handlItemsData(predicate);
            this.props.getItemsSearch(this.state.pageNo, pageLimit, this.props.sorterData, predicate);
        } else {
            this.props.handlItemsData(val);
            this.props.getItemsSearch(this.state.pageNo, pageLimit, this.props.sorterData);
        }
    };

    //Temporarily store the selected item
    handleSelectColumns = (selectedColumn, columnConfig) => {
        this.setState(
            {
                selectInitOptions: selectedColumn
            },
            () => {
                this.props.handleSaveSelectColumns(this.state.selectInitOptions, columnConfig);
            }
        );
    };
    //Put into the global
    saveSelectColumns = () => {
        this.props.handleSaveSelectColumns(this.state.selectInitOptions);
    };

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };
    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    componentWillMount = () => {
        let columnConfig = this.props.columnConfig;
        let currentCheck = [];
        //handle selectInitOptions accroding to columnConfig
        for (let i = 0; i < columnConfig.length; i++) {
            if (columnConfig[i].defaultSelect) {
                currentCheck.push(columnConfig[i]);
            }
        }
        this.setState({
            selectInitOptions: currentCheck.map(item => item.title)
        });
        this.props.handleSaveSelectColumns(currentCheck);
    };
    handleOpen = () => {
        // this.setState({
        //     expanded: !this.state.expanded
        // });
    };

    render() {
        const { identify } = this.props;
        const { selectInitOptions } = this.state;
        const identifyData = this.props[identify];
        const columnConfigNew = (identifyData && identifyData.columnConfig) || this.props.columnConfig;
        const titleNew = (identifyData && identifyData.title) || this.props.title;
        const subTitleNew = (identifyData && identifyData.subTitle) || this.props.subTitle;

        return (
            <div className="searchWrap">
                <Card>
                    <CardHeader
                        action={
                            <div className="searchCriteria">
                                <div className="item">
                                    <Tooltip title="Filter list">
                                        <IconButton onClick={this.handleOpen}>
                                            <FilterListIcon />
                                        </IconButton>
                                    </Tooltip>
                                </div>
                                <div className="item">
                                    <AuditListColumns
                                        columnConfig={columnConfigNew}
                                        filtercolumns={selectInitOptions}
                                        handleSelectColumns={this.handleSelectColumns.bind(this)}
                                        saveSelectColumns={this.saveSelectColumns.bind(this)}
                                    />
                                </div>
                            </div>
                        }
                        title={titleNew}
                        subheader={subTitleNew}
                    />
                    <Fade
                        className="fadeBox"
                        in={this.state.expanded}
                        {...(this.state.expanded ? { style: { display: "block" } } : { style: { display: "none" } })}
                    >
                        <Paper>
                            <AuditFilter onApplyFilter={this.handleGetData.bind(this)} />
                        </Paper>
                    </Fade>
                </Card>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return state.audit || {};
};
const mapDispatchToProps = (dispatch, props) => {
    return {
        // handlItemsData: arr => {
        //     dispatch(saveItemsData(arr, props.identify));
        // },
        handleSaveSelectColumns: (selectedColumn, columnConfig) => {
            dispatch(saveSelectColumns(selectedColumn, columnConfig, props.identify));
        }
        // changeTopoDisplayType: topoDisplayType => {
        //     dispatch(changeTopoDisplayType(topoDisplayType, props.identify));
        // }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(AuditSearch));
