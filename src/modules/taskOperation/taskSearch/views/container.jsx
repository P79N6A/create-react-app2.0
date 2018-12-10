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
 * Created by ChenLing on 29/10/2018.
 */
import React, { Component } from "react";
import AlarmListColumns from "./columns";
import { connect } from "react-redux";
import {
    saveItemsData,
    saveSelectColumns,
    changeTopoDisplayType,
    requestParameters
} from "modules/alarm/alarmList/funcs/actions";
import "../styles/style.less";
import { withStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import FilterListIcon from "@material-ui/icons/FilterList";
import Card from "@material-ui/core/Card";
import ListIcon from "@material-ui/icons/FormatListBulleted";
import ViewStreamIcon from "@material-ui/icons/ViewStream";
import AlarmFilter from "./filter";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import { actions as msg } from "modules/messageCenter";
import { CardHeader } from "modules/common";
import RefreshIcon from "@material-ui/icons/Refresh";

const styles = theme => ({
    paper: {
        marginRight: theme.spacing.unit * 2
    }
});

class AlarmSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNo: 1,
            selectInitOptions: [],
            anchorEl: null,
            expanded: false
        };
    }

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

    handleGetData = val => {
        let identify = this.props.identify;
        let pageLimit = this.props[identify].pageLimit;
        this.props.getItemsSearch(this.state.pageNo, pageLimit, val);
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

    handleOpen = () => {
        this.setState({
            expanded: !this.state.expanded
        });
    };

    //toggle Search&Stream Mode
    handleToggleViewClick() {
        const { identify } = this.props;
        const identifyData = this.props[identify];
        let topoDisplayType = identifyData.topoDisplayType === "Search" ? "Stream" : "Search";

        if (this.state.expanded) {
            this.setState({
                expanded: !this.state.expanded
            });
        }
        this.props.changeTopoDisplayType(topoDisplayType);
    }

    //refresh
    handleRefresh = () => {
        const { page, rowsPerPage, itemsData } = this.props.preState;
        this.props.getItemsSearch(page, rowsPerPage, itemsData);
    };

    render() {
        const { identify, ccmsFilterDataList } = this.props;
        const { selectInitOptions } = this.state;
        const identifyData = this.props[identify];
        const columnConfigNew = (identifyData && identifyData.columnConfig) || this.props.columnConfig;
        const titleNew = (identifyData && identifyData.title) || this.props.title;
        const subTitleNew = (identifyData && identifyData.subTitle) || this.props.subTitle;
        const type = identifyData && identifyData.topoDisplayType;
        const toggleName = identifyData && identifyData.topoDisplayType === "Search" ? "Stream" : "Search";
        const { parametersData } = this.props.preState;

        return (
            <div className="searchWrap">
                <Card>
                    <CardHeader
                        action={
                            <div className="searchCriteria">
                                {type === "Search" ? (
                                    <div className="item">
                                        <Tooltip title="Refresh">
                                            <IconButton onClick={this.handleRefresh}>
                                                <RefreshIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </div>
                                ) : null}
                                {type === "Search" ? (
                                    <div className="item">
                                        <Tooltip title="Filter list">
                                            <IconButton onClick={this.handleOpen}>
                                                <FilterListIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </div>
                                ) : null}
                                <div className="item">
                                    <AlarmListColumns
                                        columnConfig={columnConfigNew}
                                        filtercolumns={selectInitOptions}
                                        handleSelectColumns={this.handleSelectColumns.bind(this)}
                                        saveSelectColumns={this.saveSelectColumns.bind(this)}
                                    />
                                </div>
                                <div className="item">
                                    <Tooltip title={`${toggleName} Mode`}>
                                        <IconButton
                                            aria-label={`${toggleName} Mode`}
                                            onClick={this.handleToggleViewClick.bind(this)}
                                        >
                                            {type === "Search" ? <ListIcon /> : <ViewStreamIcon />}
                                        </IconButton>
                                    </Tooltip>
                                </div>
                            </div>
                        }
                        title={titleNew}
                        subheader={subTitleNew}
                        titleTypographyProps={{ title: titleNew }}
                    />
                    <Fade
                        className="fadeBox"
                        in={this.state.expanded}
                        {...(this.state.expanded ? { style: { display: "block" } } : { style: { display: "none" } })}
                    >
                        <Paper>
                            <AlarmFilter
                                onApplyFilter={this.handleGetData.bind(this)}
                                callReminder={this.props.callReminder.bind(this)}
                                callParameters={this.props.callParameters.bind(this)}
                                ccmsFilterDataList={ccmsFilterDataList}
                                parametersData={parametersData}
                            />
                        </Paper>
                    </Fade>
                </Card>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        fieldstype: state.alarm && state.alarm.fieldstype,
        optiontype: state.alarm && state.alarm.optiontype
    };
};
const mapDispatchToProps = (dispatch, props) => {
    return {
        handlItemsData: arr => {
            dispatch(saveItemsData(arr, props.identify));
        },
        handleSaveSelectColumns: (selectedColumn, columnConfig) => {
            dispatch(saveSelectColumns(selectedColumn, columnConfig, props.identify));
        },
        changeTopoDisplayType: topoDisplayType => {
            dispatch(changeTopoDisplayType(topoDisplayType, props.identify));
        },
        callReminder: val => {
            dispatch(msg.warn(val));
        },
        callParameters: val => {
            dispatch(requestParameters(val, props.identify));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(AlarmSearch));
