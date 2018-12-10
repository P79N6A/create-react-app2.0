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
import "../styles/style.less";

import Theme from "commons/components/theme";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";

import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import ViewColumnIcon from "@material-ui/icons/ViewColumn";

const ITEM_HEIGHT = 48;

class AuditListColumns extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentCheck: this.props.filtercolumns,
            columnConfig: this.props.columnConfig,
            anchorEl: null,
            activeColor: true
        };
    }

    componentWillMount = () => {
        let columnConfig = this.props.columnConfig;
        if (!columnConfig) {
            return;
        }
        this.setState(
            {
                columnConfig
            },
            () => {
                let currentCheck = [];
                for (let i = 0; i < columnConfig.length; i++) {
                    if (columnConfig[i].defaultSelect) {
                        currentCheck.push(columnConfig[i].title);
                    }
                }
                this.handleCurrentColumns(currentCheck);
                this.setState({
                    currentCheck: currentCheck
                });
            }
        );
    };

    //filter columns
    handleChange = column => {
        let currentCheck = this.state.currentCheck;
        let isChecked = false;
        for (let i = 0; i < currentCheck.length; i++) {
            if (currentCheck[i] === column) {
                isChecked = true;
                currentCheck.splice(i, 1);
            }
        }
        if (!isChecked) {
            currentCheck.push(column);
        }
        this.setState({ currentCheck: currentCheck });
        this.handleCurrentColumns(currentCheck);
    };
    handleCurrentColumns = arr => {
        let columnConfig = this.state.columnConfig;

        for (let i = 0; i < columnConfig.length; i++) {
            columnConfig[i].defaultSelect = false;
            for (let j = 0; j < arr.length; j++) {
                if (arr[j] === columnConfig[i].title) {
                    columnConfig[i].defaultSelect = true;
                }
            }
        }

        let selectedColumn = columnConfig.filter(item => {
            return ~arr.indexOf(item.title);
        });

        this.props.handleSelectColumns(selectedColumn, columnConfig);
    };

    //columns menus open or close
    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };
    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    //columns select all or clear all
    handleAllClearClick(event) {
        let keyWord = event.target.getAttribute("data-key");
        let columnConfig = this.state.columnConfig;
        let currentCheck = [];
        if (!this.props.columnConfig) {
            return;
        }
        if (keyWord === "all") {
            for (let i = 0; i < columnConfig.length; i++) {
                currentCheck.push(columnConfig[i].title);
            }
            this.handleColumnsChange(columnConfig, currentCheck);
            this.setState(
                Object.assign(this.state, {
                    activeColor: true,
                    currentCheck: currentCheck
                })
            );
        } else if (keyWord === "clear") {
            this.handleColumnsChange(columnConfig, currentCheck);
            this.setState(
                Object.assign(this.state, {
                    activeColor: false,
                    currentCheck: currentCheck
                })
            );
        }
    }
    handleColumnsChange(columnConfig, currentCheck) {
        for (let i = 0; i < columnConfig.length; i++) {
            let isSelect = false;
            for (let j = 0; j < currentCheck.length; j++) {
                if (currentCheck[j] === columnConfig[i].title) {
                    columnConfig[i].defaultSelect = true;
                    isSelect = true;
                }
            }
            if (!isSelect) {
                columnConfig[i].defaultSelect = false;
            }
        }

        let selectedColumn = columnConfig.filter(item => {
            return ~currentCheck.indexOf(item.title);
        });
        this.props.handleSelectColumns(selectedColumn, columnConfig);
    }

    render() {
        const { anchorEl, columnConfig, currentCheck, activeColor } = this.state;
        const active = activeColor ? Theme.palette.secondary.dark : "";
        const inactive = activeColor ? "" : Theme.palette.secondary.dark;
        return (
            <div id="columnsDropdown">
                <Tooltip title="Columns">
                    <IconButton
                        aria-label="Columns"
                        aria-owns={anchorEl ? "long-menu" : null}
                        aria-haspopup="true"
                        onClick={this.handleClick.bind(this)}
                    >
                        <ViewColumnIcon />
                    </IconButton>
                </Tooltip>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose.bind(this)}
                    PaperProps={{
                        style: {
                            maxHeight: ITEM_HEIGHT * 4.5,
                            width: 220
                        }
                    }}
                >
                    <MenuItem key="all-clear" value="all-clear" onClick={this.handleAllClearClick.bind(this)}>
                        <ListItemText style={{ textAlign: "center" }}>
                            <span data-key="all" style={{ color: active }}>
                                Select All
                            </span>
                            <span>&nbsp;-&nbsp;</span>
                            <span data-key="clear" style={{ color: inactive }}>
                                Clear
                            </span>
                        </ListItemText>
                    </MenuItem>
                    {columnConfig &&
                        columnConfig.map(item => (
                            <MenuItem key={item.title} value={item.title}>
                                <Checkbox
                                    onChange={this.handleChange.bind(this, item.title)}
                                    checked={currentCheck.indexOf(item.title) > -1}
                                />
                                <ListItemText primary={item.title} onClick={this.handleChange.bind(this, item.title)} />
                            </MenuItem>
                        ))}
                </Menu>
            </div>
        );
    }
}

export default AuditListColumns;
