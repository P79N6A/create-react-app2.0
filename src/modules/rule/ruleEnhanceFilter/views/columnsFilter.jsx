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
 * Created by wangrui on 22/06/2018.
 */
import React from "react";
import "../styles/style.less";
import { columnsChanged } from "../funcs/actions";
import { connect } from "react-redux";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import ViewColumnIcon from "@material-ui/icons/ViewColumn";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import { withStyles } from "@material-ui/core/styles";
import { I18n } from "react-i18nify";  

const styles = theme => ({
    dark: {
        color: theme.palette.secondary.dark
    }
});
const ITEM_HEIGHT = 48;
class ColumnsFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            currentCheck: [],
            columnConfig: this.props.columnConfig,
            activeColor: true
        };
    }

    componentWillMount() {
        this.componentWillReceiveProps(this.props);
    }

    componentWillReceiveProps(nextProps) {
        let columnConfig = nextProps.columnConfig;
        if (!columnConfig) {
            return;
        }
        let currentCheck = [];
        for (let i = 0; i < columnConfig.length; i++) {
            if (columnConfig[i].defaultSelect) {
                currentCheck.push(columnConfig[i].columnName);
            }
        }
        this.setState(
            Object.assign(this.state, {
                currentCheck: currentCheck
            })
        );
        this.props.columnsChanged(nextProps.identify, JSON.stringify(columnConfig));
    }

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    handleChange = column => {
        let currentCheck = this.state.currentCheck;
        let columnConfig = this.state.columnConfig;
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
        this.handleColumnsChange(columnConfig, currentCheck);
    };

    handleAllClearClick(event) {
        let keyWord = event.target.getAttribute("data-key");
        let columnConfig = this.state.columnConfig;
        let currentCheck = [];
        if (!this.props.columnConfig) {
            return;
        }
        if (keyWord === "all") {
            for (let i = 0; i < columnConfig.length; i++) {
                currentCheck.push(columnConfig[i].columnName);
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
                if (currentCheck[j] === columnConfig[i].columnName) {
                    columnConfig[i].defaultSelect = true;
                    isSelect = true;
                }
            }
            if (!isSelect) {
                columnConfig[i].defaultSelect = false;
            }
        }
        this.props.columnsChanged(this.props.identify, JSON.stringify(columnConfig));
    }

    render() {
        const { classes } = this.props;
        const { anchorEl, columnConfig, activeColor } = this.state;
        const active = activeColor ? classes.dark.color : "";
        const inactive = activeColor ? "" : classes.dark.color;
        return (
            <div className="columns-filter" style={{ display: "inline-block" }}>
                <Tooltip title={I18n.t("rule.common.columns")}>
                    <IconButton
                        aria-label={I18n.t("rule.common.columns")}
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
                            width: 200
                        }
                    }}
                >
                    <MenuItem key="all-clear" value="all-clear" onClick={this.handleAllClearClick.bind(this)}>
                        <ListItemText style={{ textAlign: "center" }}>
                            <span data-key="all" style={{ color: active }}>
                                {I18n.t("common.selectAll")}
                            </span>
                            <span>&nbsp;-&nbsp;</span>
                            <span data-key="clear" style={{ color: inactive }}>
                                {I18n.t("rule.common.clear")}
                            </span>
                        </ListItemText>
                    </MenuItem>
                    {columnConfig &&
                        columnConfig.map(column => (
                            <MenuItem key={column.columnName} value={column.columnName}>
                                <Checkbox
                                    onChange={this.handleChange.bind(this, column.columnName)}
                                    checked={this.state.currentCheck.indexOf(column.columnName) > -1}
                                />
                                <ListItemText primary={column.columnName} onClick={this.handleChange.bind(this, column.columnName)}/>
                            </MenuItem>
                        ))}
                </Menu>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        columnsChanged: (identify, currentCheck) => {
            dispatch(columnsChanged(identify, currentCheck));
        }
    };
};

export default connect(
    null,
    mapDispatchToProps
)(withStyles(styles)(ColumnsFilter));
